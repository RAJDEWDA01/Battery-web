const { randomUUID } = require('crypto');

const Click = require('../models/click');
const { isDatabaseConnected } = require('../config/database');

const BRAND_NAMES = ['VK Power', 'MK Gold'];
const GENERAL_BUCKET = 'General CTA';
const MAX_IN_MEMORY_CLICKS = 1000;

const inMemoryClicks = [];

function normalizeLabel(rawValue) {
  if (typeof rawValue !== 'string') {
    return '';
  }

  return rawValue.trim().replace(/\s+/g, ' ').slice(0, 120);
}

function normalizeMetaValue(rawValue, maxLength) {
  if (typeof rawValue !== 'string') {
    return '';
  }

  return rawValue.trim().slice(0, maxLength);
}

function inferProduct(label) {
  const lowerCasedLabel = label.toLowerCase();

  return BRAND_NAMES.find((brand) => lowerCasedLabel.includes(brand.toLowerCase())) || null;
}

function inferCategory(label) {
  return BRAND_NAMES.some((brand) => label.toLowerCase() === brand.toLowerCase())
    ? 'product'
    : 'cta';
}

function formatClickRecord(record, storage) {
  const id = record._id?.toString?.() || record.id;
  const timestamp = record.createdAt || record.timestamp || new Date();

  return {
    id,
    label: record.label,
    product: record.product,
    category: record.category,
    userAgent: record.userAgent || '',
    referrer: record.referrer || '',
    ipAddress: record.ipAddress || '',
    timestamp: new Date(timestamp).toISOString(),
    storage,
  };
}

function addToInMemoryStore(record) {
  inMemoryClicks.unshift(record);

  if (inMemoryClicks.length > MAX_IN_MEMORY_CLICKS) {
    inMemoryClicks.length = MAX_IN_MEMORY_CLICKS;
  }
}

async function createClickEntry({ label, userAgent, referrer, ipAddress }) {
  const clickPayload = {
    label,
    product: inferProduct(label),
    category: inferCategory(label),
    userAgent: normalizeMetaValue(userAgent, 500),
    referrer: normalizeMetaValue(referrer, 500),
    ipAddress: normalizeMetaValue(ipAddress, 100),
  };

  if (isDatabaseConnected()) {
    const createdClick = await Click.create(clickPayload);
    return formatClickRecord(createdClick.toObject(), 'mongodb');
  }

  const createdAt = new Date();
  const memoryRecord = {
    _id: randomUUID(),
    ...clickPayload,
    createdAt,
  };

  addToInMemoryStore(memoryRecord);

  return formatClickRecord(memoryRecord, 'memory');
}

function sortCountsDescending(countEntries) {
  return countEntries.sort((left, right) => {
    if (right.clicks !== left.clicks) {
      return right.clicks - left.clicks;
    }

    return left.label.localeCompare(right.label);
  });
}

function getUtcStartOfDay(date = new Date()) {
  const normalizedDate = new Date(date);
  normalizedDate.setUTCHours(0, 0, 0, 0);
  return normalizedDate;
}

function formatUtcDateKey(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function createDateBuckets(days) {
  const bucketMap = new Map();
  const buckets = [];
  const today = getUtcStartOfDay();

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const bucketDate = new Date(today);
    bucketDate.setUTCDate(today.getUTCDate() - offset);

    const key = formatUtcDateKey(bucketDate);
    const bucket = { date: key, clicks: 0 };

    bucketMap.set(key, bucket);
    buckets.push(bucket);
  }

  return { bucketMap, buckets };
}

function buildAnalyticsFromRecords(records, { days, fromDate, limit, storage }) {
  const clicksByLabelMap = new Map();
  const clicksByProductMap = new Map();
  const { bucketMap, buckets } = createDateBuckets(days);

  for (const record of records) {
    const labelCount = clicksByLabelMap.get(record.label) || 0;
    clicksByLabelMap.set(record.label, labelCount + 1);

    const productKey = record.product || GENERAL_BUCKET;
    const productCount = clicksByProductMap.get(productKey) || 0;
    clicksByProductMap.set(productKey, productCount + 1);

    const dateKey = formatUtcDateKey(record.createdAt);
    const bucket = bucketMap.get(dateKey);

    if (bucket) {
      bucket.clicks += 1;
    }
  }

  const clicksByLabel = sortCountsDescending(
    Array.from(clicksByLabelMap.entries()).map(([label, clicks]) => ({
      label,
      clicks,
    })),
  );

  const clicksByProduct = Array.from(clicksByProductMap.entries())
    .map(([product, clicks]) => ({
      product,
      clicks,
    }))
    .sort((left, right) => {
      if (right.clicks !== left.clicks) {
        return right.clicks - left.clicks;
      }

      return left.product.localeCompare(right.product);
    });

  const recentClicks = records
    .slice(0, limit)
    .map((record) => formatClickRecord(record, storage));

  return {
    range: {
      days,
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
    },
    storage,
    totalClicks: records.length,
    clicksByProduct,
    clicksByLabel,
    dailyClicks: buckets,
    recentClicks,
  };
}

async function getAnalyticsSnapshot({ days, limit }) {
  const fromDate = getUtcStartOfDay();
  fromDate.setUTCDate(fromDate.getUTCDate() - (days - 1));

  if (isDatabaseConnected()) {
    const records = await Click.find({
      createdAt: {
        $gte: fromDate,
      },
    })
      .sort({ createdAt: -1 })
      .lean();

    return buildAnalyticsFromRecords(records, {
      days,
      fromDate,
      limit,
      storage: 'mongodb',
    });
  }

  const records = inMemoryClicks.filter((record) => record.createdAt >= fromDate);

  return buildAnalyticsFromRecords(records, {
    days,
    fromDate,
    limit,
    storage: 'memory',
  });
}

module.exports = {
  createClickEntry,
  getAnalyticsSnapshot,
  normalizeLabel,
};
