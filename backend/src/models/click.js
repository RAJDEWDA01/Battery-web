const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    product: {
      type: String,
      default: null,
      maxlength: 80,
    },
    category: {
      type: String,
      required: true,
      enum: ['product', 'cta'],
      default: 'cta',
    },
    userAgent: {
      type: String,
      default: '',
      maxlength: 500,
    },
    referrer: {
      type: String,
      default: '',
      maxlength: 500,
    },
    ipAddress: {
      type: String,
      default: '',
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

clickSchema.index({ createdAt: -1 });
clickSchema.index({ label: 1 });
clickSchema.index({ product: 1, createdAt: -1 });

module.exports = mongoose.model('Click', clickSchema);
