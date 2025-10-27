'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, PerspectiveCamera, Grid } from '@react-three/drei'
import * as THREE from 'three'

// T038: Full-featured 3D model viewer
interface ModelProps {
  url: string
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url)
  const meshRef = useRef<THREE.Group>(null)

  // Center and scale the model
  const box = new THREE.Box3().setFromObject(scene)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 2 / maxDim

  return (
    <group ref={meshRef}>
      <primitive
        object={scene}
        scale={scale}
        position={[-center.x * scale, -center.y * scale, -center.z * scale]}
      />
    </group>
  )
}

interface ModelViewerProps {
  modelUrl: string
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-sm text-muted">Loading 3D model...</p>
          </div>
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setIsLoading(false)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />

        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.5} castShadow />

        {/* Environment for realistic reflections */}
        <Environment preset="studio" />

        {/* Optional grid */}
        <Grid
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#555555"
          sectionSize={1}
          sectionThickness={1}
          sectionColor="#888888"
          fadeDistance={25}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
          position={[0, -1, 0]}
        />

        {/* Model */}
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>

        {/* Interactive controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          makeDefault
        />
      </Canvas>
    </div>
  )
}
