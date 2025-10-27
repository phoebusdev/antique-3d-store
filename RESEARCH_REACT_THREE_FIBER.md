# React Three Fiber & Three.js E-Commerce 3D Viewer Research

**Research Date:** October 2025
**Focus:** Product viewer implementation for e-commerce applications

---

## Table of Contents

1. [React Three Fiber Setup & Canvas Configuration](#1-react-three-fiber-setup--canvas-configuration)
2. [@react-three/drei Helper Components](#2-react-threedrei-helper-components)
3. [3D Model Optimization](#3-3d-model-optimization)
4. [Lighting Best Practices](#4-lighting-best-practices)
5. [Performance Optimization](#5-performance-optimization)
6. [Loading States & Error Handling](#6-loading-states--error-handling)
7. [Accessibility](#7-accessibility)
8. [Complete E-Commerce Product Viewer Example](#8-complete-e-commerce-product-viewer-example)

---

## 1. React Three Fiber Setup & Canvas Configuration

### Latest Version & Installation

**Current Version (2025):** React Three Fiber v9+ with WebGPU support

```bash
npm install three @react-three/fiber @react-three/drei
```

### Basic Canvas Setup

The `Canvas` component is the entry point for all React Three Fiber applications. It automatically sets up a Scene, Camera, and renders the scene every frame.

```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      shadows="soft"
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={null}>
        {/* 3D content here */}
      </Suspense>
    </Canvas>
  )
}
```

### Canvas Configuration Options

| Property | Purpose | Recommended Value for E-Commerce |
|----------|---------|-----------------------------------|
| `camera` | Camera position, FOV, near/far planes | `{ position: [0, 0, 3], fov: 50 }` |
| `shadows` | Enable shadow rendering | `"soft"` or `true` |
| `dpr` | Device pixel ratio range | `[1, 2]` (limits max to 2 for performance) |
| `gl` | WebGL renderer configuration | See performance settings below |
| `frameloop` | Rendering mode | `"always"` (default) or `"demand"` |
| `linear` | Disable sRGB color conversion | `false` (default, keep enabled) |
| `fallback` | WebGL unsupported fallback | Custom React component |

### Optimized GL Settings for Product Viewers

```jsx
<Canvas
  gl={{
    powerPreference: "high-performance",
    alpha: false,              // Opaque background = better performance
    antialias: false,          // Let post-processing handle AA
    stencil: false,           // Disable if not using stencil buffers
    depth: true               // Keep enabled for proper depth testing
  }}
>
```

### Camera Configuration

**Perspective Camera (Default):**
```jsx
camera={{
  fov: 50,                    // Field of view (35-50 for product shots)
  near: 0.1,
  far: 1000,
  position: [0, 0, 5]
}}
```

**Custom Camera Setup:**
```jsx
import { PerspectiveCamera } from '@react-three/drei'

<PerspectiveCamera makeDefault position={[2, 1, 2]} fov={45} />
```

### Render Modes

**Continuous Rendering (Default):**
```jsx
<Canvas frameloop="always">
```

**On-Demand Rendering (Better Performance):**
```jsx
<Canvas frameloop="demand">
  {/* Only renders when scene changes */}
</Canvas>
```

### WebGL Fallback

```jsx
<Canvas fallback={
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <p>WebGL is not supported on your device. Please try a different browser.</p>
  </div>
}>
```

---

## 2. @react-three/drei Helper Components

### Installation

```bash
npm install @react-three/drei
```

### OrbitControls

Enables mouse/touch interaction for rotating, zooming, and panning the 3D scene.

```jsx
import { OrbitControls } from '@react-three/drei'

<OrbitControls
  enableDamping={true}        // Smooth camera movement
  dampingFactor={0.05}
  autoRotate={true}           // Auto-rotate product
  autoRotateSpeed={0.5}
  enableZoom={true}
  enablePan={false}           // Disable panning for product viewers
  minDistance={2}             // Minimum zoom distance
  maxDistance={10}            // Maximum zoom distance
  minPolarAngle={Math.PI / 4} // Limit vertical rotation (top)
  maxPolarAngle={Math.PI / 2} // Limit vertical rotation (bottom)
/>
```

**Manual Invalidation for On-Demand Rendering:**
```jsx
const { invalidate } = useThree()

<OrbitControls
  onChange={invalidate}  // Trigger render on camera change
/>
```

### useGLTF - Loading 3D Models

The `useGLTF` hook loads GLB/GLTF models with automatic caching and Suspense support.

**Basic Usage:**
```jsx
import { useGLTF } from '@react-three/drei'

function Model() {
  const { scene, nodes, materials } = useGLTF('/models/product.glb')
  return <primitive object={scene} scale={1} />
}

// Preload model
useGLTF.preload('/models/product.glb')
```

**With Draco Compression:**
```jsx
// Automatic CDN loading (default)
const gltf = useGLTF('/models/product-draco.glb')

// Custom Draco decoder path
const gltf = useGLTF('/models/product-draco.glb', '/draco-gltf')

// Global decoder path
useGLTF.setDecoderPath('/draco-gltf/')
```

**Prefetch Draco Binaries for Faster Loading:**

Add to your HTML `<head>`:
```html
<link rel="prefetch" href="https://www.gstatic.com/draco/v1/decoders/draco_wasm_wrapper.js" as="script" />
<link rel="prefetch" href="https://www.gstatic.com/draco/v1/decoders/draco_decoder.wasm" as="fetch" crossorigin="anonymous" />
```

**Advanced: Accessing Individual Nodes and Materials:**
```jsx
function Product() {
  const { nodes, materials } = useGLTF('/models/product.glb')

  return (
    <group>
      <mesh geometry={nodes.Body.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Glass.geometry} material={materials.Glass} />
    </group>
  )
}
```

**Using the Gltf Component:**
```jsx
import { Gltf } from '@react-three/drei'

<Gltf src="/models/product.glb" />
```

### Environment - HDRI Lighting

The `Environment` component provides realistic lighting using HDRI environment maps.

**Using Presets (Quick Setup):**
```jsx
import { Environment } from '@react-three/drei'

<Environment
  preset="studio"             // Options: apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse
  background={false}          // Don't show as background
/>
```

**Available Presets:**
- `apartment` - Indoor residential lighting
- `city` - Urban outdoor lighting
- `dawn` - Soft morning light
- `forest` - Natural outdoor lighting
- `lobby` - Indoor architectural lighting
- `night` - Low-light environment
- `park` - Bright outdoor daylight
- `studio` - Neutral photography studio lighting (recommended for products)
- `sunset` - Warm golden hour lighting
- `warehouse` - Industrial indoor lighting

**Custom HDRI Files (Production Recommended):**
```jsx
<Environment
  files="/hdri/photo_studio_01_1k.hdr"
  background={true}
  backgroundBlurriness={0.5}
/>
```

**Important Notes:**
- Download HDR format (not EXR) to avoid loading errors
- For lighting only: 256x256 to 512x512 px HDR is sufficient
- For metallic reflections: Use at least 1024x1024 px
- For high-quality backgrounds: 2k-4k resolution

**With Environment Maps, You May Not Need Additional Lights:**

When using PBR materials (`MeshStandardMaterial`, `MeshPhysicalMaterial`), the environment map provides adequate illumination:

```jsx
<Canvas>
  <Environment preset="studio" />
  {/* No additional lights needed! */}
  <Model />
</Canvas>
```

### PerspectiveCamera

```jsx
import { PerspectiveCamera } from '@react-three/drei'

<PerspectiveCamera
  makeDefault
  position={[2, 1, 2]}
  fov={45}
/>
```

### Other Useful Drei Helpers

**ContactShadows (Realistic Ground Shadows):**
```jsx
import { ContactShadows } from '@react-three/drei'

<ContactShadows
  position={[0, -1, 0]}
  opacity={0.5}
  scale={10}
  blur={2}
  far={4}
/>
```

**Center (Auto-Center Models):**
```jsx
import { Center } from '@react-three/drei'

<Center>
  <Model />
</Center>
```

**Bounds (Fit Camera to Model):**
```jsx
import { Bounds, useBounds } from '@react-three/drei'

<Bounds fit clip observe damping={6} margin={1.2}>
  <Model />
</Bounds>
```

**Html (Product Annotations):**
```jsx
import { Html } from '@react-three/drei'

<Html
  position={[1, 0.5, 0]}
  distanceFactor={0.25}
  occlude                     // Hide when behind geometry
>
  <div className="annotation">
    <h3>Premium Leather</h3>
    <p>$149.99</p>
  </div>
</Html>
```

---

## 3. 3D Model Optimization

### File Format: GLB (Recommended)

GLB (binary glTF) is the optimal format for web-based 3D:
- Compact binary format
- Embeds textures and geometry
- Wide browser support
- Optimized for streaming

### Target File Sizes

| Model Complexity | Target Size | Notes |
|------------------|-------------|-------|
| Simple products | < 1 MB | Minimal geometry, compressed textures |
| Medium products | 1-3 MB | Moderate detail, optimized materials |
| Complex products | 3-10 MB | High detail, use LOD strategies |
| Maximum | < 15 MB | Consider progressive loading |

### Optimization Techniques

#### 1. Geometry Simplification

**Polygon Count Guidelines:**
- Desktop: 50k-200k triangles
- Mobile: 10k-50k triangles
- Low-end devices: < 10k triangles

**Tools:**
- Blender: Decimate modifier
- MeshLab: Simplification filters
- gltfpack: Automatic mesh optimization

#### 2. Texture Optimization

**Resolution Guidelines:**
```
Desktop:  2048x2048 max
Mobile:   1024x1024 max
Low-end:   512x512 max
```

**Texture Compression:**
- Use WebP or Basis Universal for textures
- Power-of-two dimensions (256, 512, 1024, 2048)
- Combine multiple textures into texture atlases

**Blender Export Settings:**
```
Format: glTF Binary (.glb)
Include: Selected Objects
Transform: +Y Up
Geometry:
  - Apply Modifiers: ON
  - UVs: ON
  - Normals: ON
  - Tangents: OFF (auto-generated)
  - Vertex Colors: OFF (if unused)
Compression:
  - Draco mesh compression: ON
  - Compression level: 6
```

#### 3. Draco Compression

Draco reduces geometry size by 90-97% with minimal quality loss.

**Command-line compression:**
```bash
# Using gltf-pipeline
npm install -g gltf-pipeline
gltf-pipeline -i model.glb -o model-draco.glb -d

# Using gltf-transform
npm install -g @gltf-transform/cli
gltf-transform optimize model.glb model-optimized.glb --compress draco
```

**Performance Results:**
- File size: 31.19MB → 732KB (97% reduction)
- Lighthouse score: 39 → 97
- LCP (Largest Contentful Paint): 10.3s → 1.0s

#### 4. Level of Detail (LOD)

Dynamically swap model quality based on distance or device performance.

**Manual LOD Implementation:**
```jsx
import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function LODModel({ cameraDistanceRef }) {
  const [lod, setLod] = useState('high')

  useFrame(({ camera }) => {
    const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
    cameraDistanceRef.current = distance

    if (distance < 5) setLod('high')
    else if (distance < 10) setLod('medium')
    else setLod('low')
  })

  return (
    <>
      {lod === 'high' && <Model path="/models/product-high.glb" />}
      {lod === 'medium' && <Model path="/models/product-med.glb" />}
      {lod === 'low' && <Model path="/models/product-low.glb" />}
    </>
  )
}
```

**Using Drei's Detailed Component:**
```jsx
import { Detailed } from '@react-three/drei'

<Detailed distances={[0, 10, 20]}>
  <Model path="/high.glb" />  {/* 0-10 units */}
  <Model path="/med.glb" />   {/* 10-20 units */}
  <Model path="/low.glb" />   {/* 20+ units */}
</Detailed>
```

**LOD Creation Guidelines:**
- LOD0 (High): 100% vertices (close-up views)
- LOD1: 50% vertices
- LOD2: 25% vertices
- LOD3: 12% vertices
- LOD4+: Continue reducing by ~50%

#### 5. Material Optimization

**Reduce Material Count:**
- Batch similar materials
- Use texture atlases
- Target < 20 draw calls per frame

**Use Efficient Materials:**
```jsx
// Avoid expensive materials on mobile
<meshStandardMaterial />     // Good: PBR, reasonable performance
<meshPhysicalMaterial />     // Expensive: Use selectively
<meshLambertMaterial />      // Lightweight: No reflections
<meshBasicMaterial />        // Cheapest: No lighting
```

### Optimization Tools

| Tool | Purpose | URL |
|------|---------|-----|
| gltfpack | CLI compression & optimization | https://github.com/zeux/meshoptimizer |
| gltf-transform | Node.js GLB processing | https://gltf-transform.dev/ |
| Blender | 3D modeling & export | https://www.blender.org/ |
| glTF Report | Analyze GLB files | https://github.khronos.org/glTF-Validator/ |
| Three.js Editor | Online GLB viewer/optimizer | https://threejs.org/editor/ |

**Example gltf-transform workflow:**
```bash
# Install
npm install -g @gltf-transform/cli

# Full optimization pipeline
gltf-transform optimize input.glb output.glb \
  --compress draco \
  --texture-compress webp \
  --simplify 0.5 \
  --prune
```

---

## 4. Lighting Best Practices

### HDRI Environment Maps (Recommended for Products)

HDRI (High Dynamic Range Imaging) provides realistic, physically-accurate lighting with minimal setup.

#### Why HDRI for E-Commerce?

- Realistic reflections on metallic/glossy surfaces
- Natural lighting that matches photography studios
- No need to manually position multiple lights
- Consistent lighting across different products
- One-click setup with Environment component

#### Recommended HDRI Sources (Free)

**Poly Haven (Primary Source):**
- URL: https://polyhaven.com/hdris
- License: CC0 (public domain)
- Resolutions: Up to 16K unclipped
- Categories: Studio, Indoor, Outdoor, Artificial Light

**Recommended Studio HDRIs for Products:**

1. **Photo Studio 01**
   - Resolution: 16K
   - Lighting: Cool fluorescent studio lighting
   - Contrast: Medium
   - Best for: General product photography
   - URL: https://polyhaven.com/a/photo_studio_01

2. **Poly Haven Studio**
   - Resolution: 24K
   - Lighting: Bright home office with natural daylight + downlights
   - Best for: Warm, natural product shots
   - URL: https://polyhaven.com/a/poly_haven_studio

3. **Studio Small 08**
   - Resolution: 16K
   - Lighting: Soft, low-contrast with large softboxes
   - Best for: Jewelry, reflective products
   - URL: https://polyhaven.com/a/studio_small_08

**Other HDRI Resources:**
- HDRI Haven: https://hdrihaven.com/ (now part of Poly Haven)
- Blender Kit: https://www.blenderkit.com/
- iHDRI: Free and paid studio HDRIs

#### HDRI Resolution Guidelines

| Use Case | Resolution | File Size | Notes |
|----------|------------|-----------|-------|
| Lighting only | 256-512px | < 1MB | Fast loading, sufficient for lighting |
| Reflections | 1024px | 2-5MB | Good quality reflections |
| High quality | 2048px | 10-20MB | Best reflections, slower loading |
| Background | 4096px+ | 50MB+ | Use only if HDRI shown as background |

**Optimization Tip:** Use lower resolution HDRIs for lighting and higher resolution only for visible backgrounds.

### HDRI Implementation

**Basic Setup:**
```jsx
import { Environment } from '@react-three/drei'

<Environment
  files="/hdri/photo_studio_01_1k.hdr"
  background={false}
/>
```

**With Background:**
```jsx
<Environment
  files="/hdri/studio_small_08_2k.hdr"
  background={true}
  backgroundBlurriness={0.5}  // Blur background for depth of field effect
/>
```

**Dynamic Environment Switching:**
```jsx
const [envPreset, setEnvPreset] = useState('studio')

<Environment preset={envPreset} />

<button onClick={() => setEnvPreset('sunset')}>
  Change Lighting
</button>
```

### Traditional Lighting Setup (Alternative)

If not using HDRI, use this three-point lighting setup:

```jsx
function ThreePointLighting() {
  return (
    <>
      {/* Key Light - Main light source */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light - Softens shadows */}
      <pointLight
        position={[-5, 3, 0]}
        intensity={0.5}
      />

      {/* Back Light - Edge definition */}
      <pointLight
        position={[0, 3, -5]}
        intensity={0.3}
      />

      {/* Ambient Light - Base illumination */}
      <ambientLight intensity={0.3} />
    </>
  )
}
```

### Material Considerations for Lighting

**PBR Materials (Recommended):**
```jsx
<meshStandardMaterial
  metalness={0.8}           // 0 = non-metal, 1 = full metal
  roughness={0.2}           // 0 = mirror, 1 = matte
  envMapIntensity={1.0}     // Control environment reflection strength
/>
```

**Advanced PBR:**
```jsx
<meshPhysicalMaterial
  metalness={0.9}
  roughness={0.1}
  clearcoat={1.0}           // Clear coat layer
  clearcoatRoughness={0.1}
  transmission={0.95}       // Glass-like transparency
  thickness={0.5}
/>
```

### Lighting Performance Tips

- Use environment maps instead of multiple real-time lights
- Limit real-time shadows to 1-2 lights maximum
- Use `ContactShadows` from drei for performant ground shadows
- Bake lighting into textures for static scenes
- Use lower shadow map resolutions on mobile (512x512 instead of 2048x2048)

---

## 5. Performance Optimization

### Target Performance Metrics

| Device Type | Target FPS | Triangle Budget | Texture Memory |
|-------------|-----------|----------------|----------------|
| Desktop GPU | 60 FPS | 200k triangles | 512 MB |
| Mobile High-End | 60 FPS | 50k triangles | 256 MB |
| Mobile Mid-Range | 30-60 FPS | 20k triangles | 128 MB |
| Mobile Low-End | 30 FPS | 10k triangles | 64 MB |

### On-Demand Rendering (Biggest Performance Win)

Switch from continuous 60fps rendering to only rendering when needed:

```jsx
<Canvas frameloop="demand">
  {/* Only renders when scene changes */}
</Canvas>
```

**Manual Frame Invalidation:**
```jsx
import { useThree } from '@react-three/fiber'

function Scene() {
  const invalidate = useThree((state) => state.invalidate)

  return (
    <>
      <OrbitControls onChange={invalidate} />
      <mesh onClick={invalidate}>
        {/* ... */}
      </mesh>
    </>
  )
}
```

**Benefits:**
- Dramatically reduces battery drain
- Eliminates unnecessary GPU load
- Same visual quality as continuous rendering

### Device Pixel Ratio (DPR) Limiting

Modern mobile devices can have DPR of 3-5, which exponentially increases render cost.

```jsx
<Canvas
  dpr={[1, 2]}  // Min 1, max 2 (prevents 3x-5x rendering cost)
>
```

**Dynamic DPR Based on Performance:**
```jsx
import { PerformanceMonitor } from '@react-three/drei'

function App() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas dpr={dpr}>
      <PerformanceMonitor
        onIncline={() => setDpr(2)}    // Performance good, increase quality
        onDecline={() => setDpr(1)}    // Performance poor, reduce quality
      >
        {/* Scene content */}
      </PerformanceMonitor>
    </Canvas>
  )
}
```

### PerformanceMonitor (Adaptive Quality)

Automatically adjusts scene quality based on FPS:

```jsx
import { PerformanceMonitor } from '@react-three/drei'

function AdaptiveQuality() {
  const [dpr, setDpr] = useState(1.5)
  const [shadows, setShadows] = useState(true)

  return (
    <Canvas dpr={dpr} shadows={shadows}>
      <PerformanceMonitor
        onIncline={() => {
          setDpr(2)
          setShadows(true)
        }}
        onDecline={() => {
          setDpr(1)
          setShadows(false)
        }}
        onFallback={() => {
          // Extreme fallback for very poor performance
          setDpr(1)
          setShadows(false)
        }}
        flipflops={3}              // Trigger fallback after 3 performance flips
        factor={1}                 // Sensitivity (1 = default)
        averageFrames={15}         // Sample window
      >
        <Scene />
      </PerformanceMonitor>
    </Canvas>
  )
}
```

**Movement Regression Pattern:**

Temporarily reduce quality during camera movement, restore during idle:

```jsx
import { useThree } from '@react-three/fiber'

function AdaptiveControls() {
  const regress = useThree((state) => state.performance.regress)
  const performanceCurrent = useThree((state) => state.performance.current)

  return (
    <OrbitControls
      onChange={() => regress()}  // Reduce quality during movement
    />
  )
}

// In your scene component
function Model() {
  const performanceCurrent = useThree((state) => state.performance.current)

  return (
    <mesh>
      <sphereGeometry args={[1, performanceCurrent === 1 ? 64 : 16, performanceCurrent === 1 ? 64 : 16]} />
    </mesh>
  )
}
```

### GPU Optimization

**Reduce Draw Calls:**
```jsx
// Bad: Each mesh = separate draw call
<group>
  <mesh geometry={geo1} material={mat1} />
  <mesh geometry={geo2} material={mat1} />
  <mesh geometry={geo3} material={mat1} />
</group>

// Good: Merge geometries, one draw call
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

const merged = mergeGeometries([geo1, geo2, geo3])
<mesh geometry={merged} material={mat1} />
```

**Instancing for Repeated Objects:**
```jsx
import { Instances, Instance } from '@react-three/drei'

<Instances limit={1000} geometry={geometry} material={material}>
  <Instance position={[0, 0, 0]} />
  <Instance position={[1, 0, 0]} />
  {/* ... hundreds more instances */}
</Instances>
```

**Frustum Culling (Automatic):**
Three.js automatically culls objects outside the camera view. Ensure models have proper bounding boxes.

### Mobile-Specific Optimizations

**GL Configuration for Mobile:**
```jsx
<Canvas
  dpr={[1, 2]}
  gl={{
    powerPreference: "high-performance",
    antialias: false,          // Expensive on mobile
    stencil: false,
    depth: true
  }}
>
```

**Detect Mobile and Adjust:**
```jsx
import { isMobile } from 'react-device-detect'

<Canvas
  dpr={isMobile ? [1, 1.5] : [1, 2]}
  shadows={!isMobile}
>
  <Environment
    files={isMobile ? "/hdri/studio_512.hdr" : "/hdri/studio_2k.hdr"}
  />
</Canvas>
```

### WebGL Fallback Strategies

**WebGL 2 / WebGPU Detection:**
```jsx
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

function App() {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    setWebglSupported(!!gl)
  }, [])

  if (!webglSupported) {
    return (
      <div className="fallback">
        <img src="/product-fallback.jpg" alt="Product" />
        <p>Your browser doesn't support 3D viewing. Here's a photo instead.</p>
      </div>
    )
  }

  return <Canvas>{/* ... */}</Canvas>
}
```

**Progressive Enhancement:**
```jsx
<Canvas
  fallback={
    <div className="fallback-viewer">
      <img src="/product-360-fallback.jpg" alt="Product" />
      <p>Interactive 3D view requires WebGL support.</p>
    </div>
  }
>
  <Scene />
</Canvas>
```

### Resource Reuse and Caching

**Global Resource Creation:**
```jsx
// Create once, reuse everywhere
const material = new THREE.MeshStandardMaterial({ color: 'red' })
const geometry = new THREE.SphereGeometry(1, 32, 32)

function Product1() {
  return <mesh geometry={geometry} material={material} />
}

function Product2() {
  return <mesh geometry={geometry} material={material} />
}
```

**Automatic Caching with useLoader:**
```jsx
// First load: fetches from network
const texture1 = useLoader(THREE.TextureLoader, '/texture.jpg')

// Second load: uses cache
const texture2 = useLoader(THREE.TextureLoader, '/texture.jpg')
```

### Performance Monitoring

**React DevTools Profiler:**
Use React DevTools to identify unnecessary re-renders.

**Three.js Stats:**
```jsx
import { Stats } from '@react-three/drei'

<Canvas>
  <Stats />  {/* Shows FPS, render time, memory */}
  <Scene />
</Canvas>
```

**Custom Performance Logging:**
```jsx
import { useFrame } from '@react-three/fiber'

function PerformanceLogger() {
  useFrame((state) => {
    console.log('FPS:', Math.round(1 / state.clock.getDelta()))
    console.log('Draw calls:', state.gl.info.render.calls)
    console.log('Triangles:', state.gl.info.render.triangles)
  })
  return null
}
```

### 2025 Performance Expectations

- **60fps on mid-range mobile** is the baseline expectation
- WebGPU adoption can enhance rendering speed by **up to 30%** vs WebGL
- React 18 Concurrent Features allow maintaining 60fps even with 500+ complex objects
- Users expect **instant loading** (<2 seconds to interactive)

---

## 6. Loading States & Error Handling

### Suspense for Loading States

React Suspense works seamlessly with React Three Fiber's loaders:

```jsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/models/product.glb')  // Suspends during loading
  return <primitive object={scene} />
}

function App() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  )
}
```

### Loading Progress with useProgress

```jsx
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()

  return (
    <Html center>
      <div className="loader">
        <div className="spinner" />
        <p>{Math.round(progress)}% loaded</p>
        <p>{loaded} / {total} items</p>
      </div>
    </Html>
  )
}
```

### Progressive Loading (Wireframe to Solid)

Show a low-quality version immediately while high-quality loads:

```jsx
import { Suspense } from 'react'

function ProgressiveModel() {
  return (
    <Suspense fallback={<LowQualityModel />}>
      <HighQualityModel />
    </Suspense>
  )
}

function LowQualityModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe color="#cccccc" />
    </mesh>
  )
}

function HighQualityModel() {
  const { scene } = useGLTF('/models/product-high.glb')
  return <primitive object={scene} />
}
```

### Nested Suspense for Multi-Stage Loading

```jsx
<Suspense fallback={<InitialLoader />}>
  <LowResModel />
  <Suspense fallback={null}>
    <HighResModel />
  </Suspense>
</Suspense>
```

### Preloading Models

**Manual Preloading:**
```jsx
import { useGLTF } from '@react-three/drei'

// Preload in a parent component or on mount
useEffect(() => {
  useGLTF.preload('/models/product1.glb')
  useGLTF.preload('/models/product2.glb')
  useGLTF.preload('/models/product3.glb')
}, [])
```

**Preload on User Intent:**
```jsx
function ProductThumbnail({ modelPath }) {
  const handleMouseEnter = () => {
    useGLTF.preload(modelPath)  // Preload when user hovers
  }

  return (
    <div onMouseEnter={handleMouseEnter}>
      <img src="/thumbnail.jpg" />
    </div>
  )
}
```

### Precompile Scene to GPU

Prevent first-frame stuttering by uploading assets to GPU before showing:

```jsx
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

function PrecompiledModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  const [ready, setReady] = useState(false)
  const { gl, scene: threeScene, camera } = useThree()

  useEffect(() => {
    // Upload to GPU
    gl.compile(threeScene, camera)
    setReady(true)
  }, [gl, threeScene, camera])

  if (!ready) return null

  return <primitive object={scene} />
}
```

### Error Boundaries for WebGL Failures

```jsx
import { Component } from 'react'

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error:', error, errorInfo)
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Unable to load 3D viewer</h2>
          <p>Your device may not support WebGL or 3D graphics.</p>
          <img src="/product-fallback.jpg" alt="Product" />
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage
<WebGLErrorBoundary>
  <Canvas>
    <Suspense fallback={<Loader />}>
      <Scene />
    </Suspense>
  </Canvas>
</WebGLErrorBoundary>
```

### Graceful Degradation

```jsx
function ProductViewer({ modelPath }) {
  const [view3D, setView3D] = useState(true)
  const [modelError, setModelError] = useState(false)

  if (modelError || !view3D) {
    return (
      <div className="fallback-viewer">
        <img src="/product-photo.jpg" alt="Product" />
        <button onClick={() => setView3D(true)}>Try 3D View</button>
      </div>
    )
  }

  return (
    <WebGLErrorBoundary>
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Model
            path={modelPath}
            onError={() => setModelError(true)}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  )
}
```

### Canvas Freeze Prevention

Large models can freeze the canvas during loading. Use preloading and GPU compilation:

```jsx
// Preload and compile before showing
const [ready, setReady] = useState(false)

useEffect(() => {
  const loadAndCompile = async () => {
    const gltf = await useGLTF.preload('/large-model.glb')
    gl.compile(scene, camera)
    setReady(true)
  }
  loadAndCompile()
}, [])
```

### Loading State Best Practices

1. **Show Progress:** Always display loading percentage
2. **Fallback Content:** Provide low-res or wireframe preview
3. **Preload Smart:** Preload on user intent (hover, click)
4. **Error Recovery:** Allow retry and fallback to images
5. **GPU Compile:** Upload to GPU before showing to prevent stutter
6. **Cache Assets:** useLoader automatically caches by URL

---

## 7. Accessibility

### Why 3D Accessibility Matters

- 3D content rendered to `<canvas>` is invisible to screen readers
- Keyboard users cannot focus or interact with 3D objects
- Users with motion sensitivity may need reduced motion
- Color contrast and visual indicators must be accessible

### @react-three/a11y Library

**Installation:**
```bash
npm install @react-three/a11y
```

**Setup:**
```jsx
import { Canvas } from '@react-three/fiber'
import { A11y, A11yAnnouncer } from '@react-three/a11y'

function App() {
  return (
    <>
      <Canvas>
        <A11y role="button" description="Wooden chair" actionCall={() => console.log('clicked')}>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </A11y>
      </Canvas>
      <A11yAnnouncer />  {/* Required: Must be placed outside Canvas */}
    </>
  )
}
```

### A11y Component Roles

**1. Content (Default):**
```jsx
<A11y role="content" description="Antique wooden chair with carved details">
  <Model />
</A11y>
```
- Default cursor
- Provides information to screen readers
- No interaction expected

**2. Button:**
```jsx
<A11y
  role="button"
  description="View product details"
  actionCall={() => setShowDetails(true)}
  activationMsg="Viewing product details"
>
  <InfoHotspot />
</A11y>
```
- Pointer cursor
- Triggers action on click or Enter key
- Announces `activationMsg` to screen readers

**3. Toggle Button:**
```jsx
<A11y
  role="togglebutton"
  description="Toggle wireframe view"
  actionCall={() => setWireframe(!wireframe)}
  activationMsg="Wireframe enabled"
  deactivationMsg="Wireframe disabled"
  pressed={wireframe}
>
  <Button />
</A11y>
```
- Uses `aria-pressed` attribute
- Two-state button with state announcements

**4. Link:**
```jsx
<A11y
  role="link"
  href="/products/chair-123"
  description="Go to product page"
  actionCall={() => router.push('/products/chair-123')}
>
  <LinkButton />
</A11y>
```
- Pointer cursor
- `href` is for assistive tech only (doesn't navigate automatically)
- Use `actionCall` for actual navigation

### Keyboard Navigation

The library automatically enables:
- **Tab** navigation between focusable 3D objects
- **Enter** key for button activation
- **Space** for toggle buttons
- Focus indicators (customizable via CSS)

**Custom Tab Index:**
```jsx
<A11y role="button" description="Primary action" tabIndex={0}>
  <PrimaryButton />
</A11y>

<A11y role="button" description="Secondary action" tabIndex={-1}>
  <SecondaryButton />
</A11y>
```

### Screen Reader Support

**Descriptions:**
```jsx
<A11y
  role="content"
  description="Antique oak dining chair with ornate backrest and velvet cushion. Circa 1890."
>
  <Model />
</A11y>
```

**A11ySection for Complex UI:**
```jsx
import { A11ySection } from '@react-three/a11y'

<A11ySection
  label="Product customization controls"
  description="Use the following controls to customize your product"
>
  <ColorPicker />
  <MaterialSelector />
  <SizeOptions />
</A11ySection>
```

### Visual Alt Text (Optional)

Show descriptions on hover for all users:

```jsx
<A11y
  role="content"
  description="Hand-carved armrest detail"
  showAltText={true}  // Shows description on hover
>
  <DetailHighlight />
</A11y>
```

### User Preferences

**Respect System Settings:**
```jsx
import { A11yUserPreferences } from '@react-three/a11y'

function Scene() {
  return (
    <A11yUserPreferences>
      {(preferences) => (
        <>
          {!preferences.reducedMotion && <RotatingModel />}
          {preferences.reducedMotion && <StaticModel />}
        </>
      )}
    </A11yUserPreferences>
  )
}
```

**Detect Prefers-Reduced-Motion:**
```jsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<OrbitControls
  autoRotate={!prefersReducedMotion}
  enableDamping={!prefersReducedMotion}
/>
```

### Accessible OrbitControls

```jsx
<OrbitControls
  makeDefault
  // Announce camera movements
  onChange={(e) => {
    if (e?.target) {
      announceToScreenReader(`Camera moved to ${e.target.object.position}`)
    }
  }}
/>
```

### ARIA Labels for Canvas Container

```jsx
<div role="region" aria-label="3D Product Viewer" aria-describedby="viewer-instructions">
  <Canvas>
    {/* ... */}
  </Canvas>
</div>

<div id="viewer-instructions" className="sr-only">
  Use mouse to rotate the product. Scroll to zoom. Tab to focus interactive elements.
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
```

### Focus Management

**Focus Trap for Modal Viewers:**
```jsx
import { useEffect, useRef } from 'react'

function ProductModal({ isOpen, onClose }) {
  const modalRef = useRef()

  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement
      modalRef.current?.focus()

      return () => {
        previousFocus?.focus()  // Restore focus on close
      }
    }
  }, [isOpen])

  return (
    <div ref={modalRef} tabIndex={-1} role="dialog" aria-label="3D Product Viewer">
      <Canvas>{/* ... */}</Canvas>
      <button onClick={onClose} aria-label="Close viewer">Close</button>
    </div>
  )
}
```

### Accessibility Best Practices

1. **Always include A11yAnnouncer** outside Canvas
2. **Provide meaningful descriptions** for all interactive elements
3. **Use semantic roles** (button, link, content)
4. **Respect prefers-reduced-motion** for animations
5. **Ensure keyboard navigation** works for all features
6. **Test with screen readers** (NVDA, JAWS, VoiceOver)
7. **Provide alternative content** for users who can't access WebGL
8. **Use sufficient color contrast** for UI overlays
9. **Include skip links** for keyboard users
10. **Document keyboard shortcuts** in help text

### Testing Accessibility

**Screen Reader Testing:**
- Windows: NVDA (free) or JAWS
- macOS: VoiceOver (built-in)
- Linux: Orca

**Keyboard Testing:**
- Tab through all interactive elements
- Verify Enter/Space activate buttons
- Ensure focus is visible
- Test Escape key for modals

**Automated Testing:**
```bash
npm install -D @axe-core/react
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import axe from '@axe-core/react'

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000)
}
```

---

## 8. Complete E-Commerce Product Viewer Example

Here's a production-ready e-commerce 3D product viewer incorporating all best practices:

```jsx
// ProductViewer.jsx
import { Suspense, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Html,
  useProgress,
  PerformanceMonitor
} from '@react-three/drei'
import { A11y, A11yAnnouncer } from '@react-three/a11y'
import { isMobile } from 'react-device-detect'

// Preload models
useGLTF.preload('/models/antique-chair.glb')

// Loading component with progress
function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="loader">
        <div className="spinner" />
        <p>{Math.round(progress)}% loaded</p>
      </div>
    </Html>
  )
}

// Main 3D model component
function Model({ modelPath, onLoaded }) {
  const { scene, nodes, materials } = useGLTF(modelPath)
  const { gl, scene: threeScene, camera } = useThree()

  useEffect(() => {
    // Precompile to GPU to prevent first-frame stutter
    gl.compile(threeScene, camera)
    onLoaded?.()
  }, [gl, threeScene, camera, onLoaded])

  return (
    <A11y
      role="content"
      description="Antique wooden dining chair with carved details and velvet cushion, circa 1890"
    >
      <primitive object={scene} scale={1} position={[0, -0.5, 0]} />
    </A11y>
  )
}

// Hotspot annotation component
function Hotspot({ position, title, description, onClick }) {
  return (
    <A11y
      role="button"
      description={`${title}: ${description}`}
      actionCall={onClick}
      activationMsg={`Viewing details about ${title}`}
    >
      <Html position={position} distanceFactor={0.25} occlude>
        <div className="hotspot" onClick={onClick}>
          <div className="hotspot-pulse" />
          <div className="hotspot-label">
            <strong>{title}</strong>
            <p>{description}</p>
          </div>
        </div>
      </Html>
    </A11y>
  )
}

// Lighting setup
function Lighting() {
  return (
    <>
      <Environment
        files="/hdri/photo_studio_01_1k.hdr"
        background={false}
      />
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  )
}

// Main scene
function Scene({ modelPath, hotspots, onHotspotClick }) {
  const { invalidate } = useThree()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      <Lighting />

      <PerspectiveCamera
        makeDefault
        position={[0, 1, 3]}
        fov={50}
      />

      <OrbitControls
        enableDamping={!prefersReducedMotion}
        dampingFactor={0.05}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.5}
        enablePan={false}
        minDistance={1.5}
        maxDistance={5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        onChange={invalidate}
      />

      <Suspense fallback={<Loader />}>
        <Model modelPath={modelPath} />

        {hotspots?.map((hotspot, index) => (
          <Hotspot
            key={index}
            position={hotspot.position}
            title={hotspot.title}
            description={hotspot.description}
            onClick={() => onHotspotClick(hotspot)}
          />
        ))}
      </Suspense>
    </>
  )
}

// Main product viewer component
export default function ProductViewer({
  modelPath = '/models/antique-chair.glb',
  hotspots = [],
  onHotspotClick = () => {}
}) {
  const [dpr, setDpr] = useState(isMobile ? 1.5 : 2)
  const [shadows, setShadows] = useState(!isMobile)
  const [webglSupported, setWebglSupported] = useState(true)
  const [error, setError] = useState(false)

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    setWebglSupported(!!gl)
  }, [])

  // Fallback for unsupported browsers
  if (!webglSupported || error) {
    return (
      <div className="fallback-viewer">
        <img src="/product-fallback.jpg" alt="Antique wooden chair" />
        <p>3D viewer requires WebGL support. Here's a photo instead.</p>
        {error && (
          <button onClick={() => setError(false)}>Try Again</button>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        role="region"
        aria-label="3D Product Viewer"
        aria-describedby="viewer-instructions"
        className="product-viewer-container"
      >
        <Canvas
          dpr={dpr}
          shadows={shadows}
          frameloop="demand"
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            alpha: false
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.0
          }}
          fallback={
            <div className="canvas-fallback">
              <p>Unable to initialize 3D viewer</p>
            </div>
          }
        >
          <PerformanceMonitor
            onIncline={() => {
              setDpr(2)
              setShadows(true)
            }}
            onDecline={() => {
              setDpr(1)
              setShadows(false)
            }}
            onFallback={() => {
              setError(true)
            }}
          >
            <Scene
              modelPath={modelPath}
              hotspots={hotspots}
              onHotspotClick={onHotspotClick}
            />
          </PerformanceMonitor>
        </Canvas>

        <A11yAnnouncer />
      </div>

      <div id="viewer-instructions" className="sr-only">
        Use your mouse or touch to rotate the product. Scroll or pinch to zoom.
        Tab key to focus interactive hotspots. Press Enter to activate.
      </div>
    </>
  )
}

// Usage example
function ProductPage() {
  const hotspots = [
    {
      position: [0.3, 0.5, 0],
      title: "Hand-Carved Backrest",
      description: "Intricate floral patterns carved by master craftsmen"
    },
    {
      position: [-0.3, 0.2, 0.2],
      title: "Velvet Cushion",
      description: "Original burgundy velvet in excellent condition"
    }
  ]

  const handleHotspotClick = (hotspot) => {
    console.log('Hotspot clicked:', hotspot)
    // Open modal, show details, etc.
  }

  return (
    <div className="product-page">
      <div className="product-viewer">
        <ProductViewer
          modelPath="/models/antique-chair.glb"
          hotspots={hotspots}
          onHotspotClick={handleHotspotClick}
        />
      </div>

      <div className="product-info">
        <h1>Antique Victorian Dining Chair</h1>
        <p className="price">$450</p>
        <button className="btn-primary">Add to Cart</button>
      </div>
    </div>
  )
}
```

### CSS Styles

```css
/* ProductViewer.css */
.product-viewer-container {
  width: 100%;
  height: 600px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}

@media (max-width: 768px) {
  .product-viewer-container {
    height: 400px;
  }
}

/* Loader styles */
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: sans-serif;
  color: #333;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Hotspot styles */
.hotspot {
  position: relative;
  cursor: pointer;
  pointer-events: all;
}

.hotspot-pulse {
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #333;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.hotspot-label {
  display: none;
  position: absolute;
  top: -10px;
  left: 40px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  min-width: 200px;
  pointer-events: none;
}

.hotspot:hover .hotspot-label,
.hotspot:focus .hotspot-label {
  display: block;
}

.hotspot-label strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.hotspot-label p {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
}

/* Fallback viewer */
.fallback-viewer {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.fallback-viewer img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.fallback-viewer button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Product page layout */
.product-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .product-page {
    grid-template-columns: 1fr;
  }
}

.product-info {
  padding: 2rem;
}

.product-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c5f2d;
  margin: 1rem 0;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  background: #2c5f2d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #1e4620;
}

.btn-primary:focus {
  outline: 2px solid #2c5f2d;
  outline-offset: 2px;
}
```

### Key Features of This Implementation

1. **Performance Optimizations:**
   - On-demand rendering (frameloop="demand")
   - Dynamic DPR based on device
   - PerformanceMonitor for adaptive quality
   - Mobile-specific optimizations
   - GPU precompilation

2. **Loading States:**
   - Suspense with progress indicator
   - Preloading for faster perceived performance
   - Graceful fallback for loading errors

3. **Accessibility:**
   - Full @react-three/a11y integration
   - Keyboard navigation support
   - Screen reader announcements
   - Respect for prefers-reduced-motion
   - ARIA labels and descriptions

4. **User Experience:**
   - Interactive hotspots with product details
   - Smooth camera controls
   - Auto-rotation (respects motion preferences)
   - Touch and mouse support
   - Responsive design

5. **Error Handling:**
   - WebGL support detection
   - Fallback to static images
   - Error boundary pattern
   - Retry functionality

6. **Production Ready:**
   - TypeScript compatible (add types as needed)
   - Optimized for e-commerce
   - HDRI lighting for realistic rendering
   - Mobile-first approach

---

## Additional Resources

### Official Documentation

- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **@react-three/drei:** https://drei.docs.pmnd.rs/
- **Three.js:** https://threejs.org/docs/
- **@react-three/a11y:** https://github.com/pmndrs/react-three-a11y

### Learning Resources

- **React Three Fiber Tutorials (sbcode.net):** https://sbcode.net/react-three-fiber/
- **Poimandres (pmndrs) Examples:** https://docs.pmnd.rs/react-three-fiber/getting-started/examples
- **Three.js Journey:** https://threejs-journey.com/
- **Discover Three.js:** https://discoverthreejs.com/

### 3D Asset Resources

- **Poly Haven (HDRI, Textures, Models):** https://polyhaven.com/ (CC0)
- **Sketchfab (3D Models):** https://sketchfab.com/
- **Blender:** https://www.blender.org/ (Free 3D modeling software)

### Tools

- **gltf-transform:** https://gltf-transform.dev/ (GLB optimization CLI)
- **gltfpack:** https://github.com/zeux/meshoptimizer (Mesh compression)
- **glTF Report:** https://github.khronos.org/glTF-Validator/ (Validate GLB files)
- **gltfjsx:** https://gltf.pmnd.rs/ (Convert GLB to React components)

### Performance Testing

- **Lighthouse:** Chrome DevTools > Audits (Performance scoring)
- **WebGL Report:** https://webglreport.com/ (Check WebGL capabilities)
- **Three.js Stats:** https://github.com/mrdoob/stats.js/ (FPS, render time monitoring)

---

## Summary Checklist

When building an e-commerce 3D product viewer with React Three Fiber:

- [ ] Use `@react-three/fiber` v9+ with `@react-three/drei` for helpers
- [ ] Configure Canvas with appropriate camera settings (fov: 50, position: [0, 0, 3])
- [ ] Implement OrbitControls with sensible limits (disable pan, limit zoom)
- [ ] Use HDRI environment maps for realistic lighting (Poly Haven free resources)
- [ ] Optimize GLB models: < 3MB, use Draco compression, target < 50k triangles
- [ ] Enable on-demand rendering (frameloop="demand") for better performance
- [ ] Limit DPR to [1, 2] to prevent excessive rendering on high-DPI displays
- [ ] Use PerformanceMonitor for adaptive quality based on device performance
- [ ] Implement Suspense with useProgress for loading states
- [ ] Preload models with useGLTF.preload() for faster perceived load times
- [ ] Add @react-three/a11y for screen reader and keyboard accessibility
- [ ] Respect prefers-reduced-motion for animations
- [ ] Provide WebGL fallback with static images for unsupported browsers
- [ ] Use Html component from drei for product annotations/hotspots
- [ ] Test on mobile devices and optimize accordingly
- [ ] Implement error boundaries for graceful failure handling
- [ ] Add ARIA labels and instructions for keyboard/screen reader users

---

**End of Research Document**
