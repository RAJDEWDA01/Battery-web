import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

function BatteryGLTF() {
  // Load the restored 87KB GLB file containing the actual texture branding
  const { scene } = useGLTF('/premium_two_wheeler_battery.glb');
  
  // The original model's brand is facing down.
  // We rotate it -90 degrees around X to make the brand face the camera and the top face up.
  return <primitive object={scene} rotation={[-Math.PI / 2, 0, 0]} />;
}

// Preload the model for faster rendering
useGLTF.preload('/premium_two_wheeler_battery.glb');

export default function BatteryModel() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }} style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Suspense fallback={null}>
        {/* Stage automatically handles centering, scaling, and beautiful lighting/shadows */}
        <Stage
          environment="city"
          intensity={0.8}
          contactShadow={{ opacity: 0.6, blur: 2 }}
          adjustCamera={1.5} // Auto-frames the camera to perfectly fit the model!
        >
          <BatteryGLTF />
        </Stage>
      </Suspense>
      {/* makeDefault allows Stage to take over the camera, autoRotate spins it centered */}
      <OrbitControls makeDefault autoRotate={true} autoRotateSpeed={2} enableZoom={false} />
    </Canvas>
  );
}
