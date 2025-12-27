# Premium 3D Hero Animation Guidelines

**Research Date:** 2025-12-25
**Purpose:** Technical guidelines for implementing a premium 3D hero section using React Three Fiber

---

## 1. Animation Timing & Easing

### Duration Standards (Premium vs Cheap)

| Animation Type | Premium Range | Cheap (Avoid) | Notes |
|----------------|---------------|---------------|-------|
| **Enter animations** | 200-500ms | <150ms or >800ms | Ease-out curve |
| **Morphing/transitions** | 200-240ms | <100ms or >600ms | Ease-in-out curve |
| **Bounce/elastic effects** | 800-1200ms | <500ms or >2000ms | Use sparingly |
| **Continuous loop (idle)** | 3000-8000ms | <2000ms | Very subtle, slow |
| **Mouse interaction response** | 120-180ms | Instant or >300ms | Quick start, slow end |

### Easing Functions (What Feels Premium)

**BEST CHOICES:**
- **Enter animations:** `ease-out` (quick start, slow end) - feels responsive
- **Position changes:** `ease-in-out` - feels natural for on-screen elements
- **Button/hover:** Custom cubic with slight overshoot - feels crisp
- **Continuous motion:** Custom sine/cosine curves - feels organic

**AVOID:**
- Linear easing (feels mechanical and cheap)
- Default `ease` (too generic)
- Over-exaggerated bounce (feels toy-like)

**Code Example:**
```typescript
// Premium button scale
const scaleUp = {
  duration: 120,
  ease: [0.34, 1.56, 0.64, 1] // Slight overshoot
}

// Premium camera movement
const cameraEase = {
  duration: 200,
  ease: [0.25, 0.46, 0.45, 0.94] // Smooth deceleration
}

// Idle/ambient animation
const idleEase = {
  duration: 5000,
  ease: "linear", // But applied to sine wave for organic feel
  repeat: Infinity
}
```

---

## 2. Opacity Ranges for Depth

### Layer Opacity Strategy

Premium 3D heroes use subtle opacity gradients to create depth WITHOUT overwhelming the content:

| Layer | Opacity Range | Purpose |
|-------|---------------|---------|
| **Foreground particles** | 0.1 - 0.3 | Depth cue, shouldn't distract |
| **Mid-ground elements** | 0.3 - 0.6 | Main visual interest |
| **Background gradients** | 0.05 - 0.15 | Atmospheric depth |
| **Text overlay backgrounds** | 0.7 - 0.9 | Ensure readability |

**CRITICAL RULE:** Never use opacity >0.7 for decorative 3D elements. They should enhance, not compete with content.

### Common Opacity Mistakes

**AVOID:**
- Fully opaque (1.0) decorative elements - looks flat
- Rapid opacity transitions - feels jarring
- Uniform opacity across all layers - no depth perception
- Opacity <0.05 - wastes GPU, invisible anyway

**BEST PRACTICE:**
```typescript
// Layered depth using opacity
const depthLayers = {
  particles: { opacity: 0.2, zIndex: 3 },
  shapes: { opacity: 0.45, zIndex: 2 },
  gradient: { opacity: 0.08, zIndex: 1 }
}

// Smooth fade-in on scroll
const fadeIn = useSpring({
  opacity: inView ? 0.35 : 0,
  config: { duration: 800 }
})
```

---

## 3. Camera Movement & Mouse Parallax

### Rotation Limits (Prevent Nausea)

| Parameter | Premium Range | Avoid | Rationale |
|-----------|---------------|-------|-----------|
| **Horizontal rotation (azimuth)** | ±5-15° | >±20° | Prevents disorientation |
| **Vertical rotation (polar)** | ±3-10° | >±15° or allowing flip | Gimbal lock, weird inversions |
| **Mouse sensitivity** | 0.3-0.7 multiplier | 1.0+ | Too responsive feels jittery |
| **Easing/damping** | 0.05-0.15 lerp factor | <0.02 or >0.25 | Too slow or too instant |

**Implementation:**
```typescript
// Normalized mouse position (-0.5 to 0.5)
const mouseX = (clientX / window.innerWidth) - 0.5
const mouseY = -((clientY / window.innerHeight) - 0.5) // Inverted

// Camera rotation with limits
const targetRotationY = mouseX * Math.PI * 0.1 // Max ±18°
const targetRotationX = mouseY * Math.PI * 0.06 // Max ±10.8°

// Smooth lerp (easing)
useFrame(() => {
  camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.08
  camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.08
})
```

**CRITICAL:** Apply parallax to a Camera Group, not the camera directly, to avoid conflicts with other controls.

### Parallax Depth Layers

For multi-layer parallax (not just camera):

```typescript
// Different speeds create depth
const layers = [
  { depth: 0.05, elements: ['background-shapes'] },
  { depth: 0.15, elements: ['mid-particles'] },
  { depth: 0.30, elements: ['foreground-accents'] }
]

// Apply mouse offset scaled by depth
layers.forEach(layer => {
  layer.position.x = mouseX * layer.depth * 50 // Adjust multiplier to taste
  layer.position.y = mouseY * layer.depth * 50
})
```

---

## 4. Motion Patterns (Premium vs Cheap)

### Creating Depth Without Distraction

**PREMIUM PATTERNS:**

1. **Slow, continuous rotation** - Objects rotate at 0.1-0.3 RPM (barely perceptible)
2. **Floating motion** - Sine wave vertical movement, amplitude 5-15px, period 4-8s
3. **Breathing scale** - Subtle scale pulse 0.98-1.02, period 3-6s
4. **Staggered entry** - Elements appear with 80-150ms delays
5. **Particle drift** - Very slow horizontal drift with Perlin noise

**CHEAP PATTERNS (AVOID):**

1. **Fast spinning** - Anything >1 RPM looks like a loading spinner
2. **Bouncing** - Constant up/down motion screams "low effort"
3. **Pulsing glow** - Opacity changes >0.3 feel like ads
4. **Random motion** - Pure random() looks chaotic, not organic
5. **Synchronized movement** - Everything moving in lockstep feels robotic

### Code Example (Premium Floating Motion)

```typescript
const FloatingShape = () => {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Subtle floating (organic motion)
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3
    meshRef.current.position.x = Math.cos(t * 0.3) * 0.2

    // Very slow rotation
    meshRef.current.rotation.z = t * 0.05

    // Subtle breathing scale
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02)
  })

  return <mesh ref={meshRef}>...</mesh>
}
```

---

## 5. Performance Optimization (Critical)

### Canvas Configuration (2025 Best Practice)

```typescript
<Canvas
  gl={{
    powerPreference: "high-performance",
    alpha: true,            // For transparent background
    antialias: false,       // Use FXAA post-processing instead
    stencil: false,         // Disable if not using stencil buffer
    depth: true             // Keep for 3D depth testing
  }}
  dpr={[1, 2]}             // Limit pixel ratio (mobile = 1, desktop = 2)
  frameloop="demand"       // Only render when needed (optional)
>
```

### Draw Call Limits

| Target | Max Draw Calls | Notes |
|--------|----------------|-------|
| **Hero section** | 20-50 | Keep it simple, hero is just one section |
| **Full page** | 100-200 | Absolute max before perf issues |
| **Mobile** | <50 | Low-end devices struggle |

**Optimization tactics:**
- **Instancing** - Render 1000s of particles in 1 draw call
- **Merged geometries** - Combine static meshes
- **Shared materials** - Reuse materials across objects
- **Level of Detail (LOD)** - Simpler meshes when camera is far

### Lazy Loading Pattern

```typescript
// DON'T load Three.js on initial page load
const HeroScene = lazy(() => import('./HeroScene'))

// Load when hero scrolls into view
const Hero = () => {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShouldLoad(true)
    })
    observer.observe(heroRef.current)
  }, [])

  return shouldLoad ? <Suspense><HeroScene /></Suspense> : <Placeholder />
}
```

---

## 6. Common Mistakes to AVOID

### Visual Mistakes

| Mistake | Why It's Cheap | Fix |
|---------|----------------|-----|
| **Everything moves at once** | Feels robotic, overwhelming | Stagger animations 80-150ms |
| **High contrast colors** | Screams "amateur 3D" | Muted pastels, gradients |
| **Harsh shadows** | Unrealistic, harsh | Soft shadows, ambient occlusion |
| **Linear motion** | Mechanical, unnatural | Always use easing curves |
| **Overuse of bloom** | Looks like 2010 Flash | Subtle glow, <0.3 intensity |
| **Perfect geometric shapes** | Too clean, sterile | Add noise, imperfections |
| **Centered composition** | Static, boring | Off-center, rule of thirds |

### Technical Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| **No alpha testing** | Transparency sorting issues | Use `alphaTest` for cutouts |
| **Too many lights** | Shader recompilation, slow | Max 2-3 lights, bake lighting |
| **Unoptimized textures** | Memory bloat, slow load | Compress, use power-of-2 sizes |
| **No error boundaries** | White screen if WebGL fails | Fallback to 2D version |
| **Blocking main thread** | Janky scrolling | Use `useFrame` not `useEffect` |
| **Recreating geometries** | Memory leaks, GC pauses | `useMemo` for geometries/materials |
| **No mobile detection** | Overheats phones | Reduce quality on mobile |

### Interaction Mistakes

| Mistake | Why Bad | Better Approach |
|---------|---------|-----------------|
| **Instant camera snap** | Jarring, disorienting | Smooth lerp/spring |
| **Following cursor exactly** | Feels like crosshair | Damped parallax |
| **No interaction cues** | Users don't know it's interactive | Subtle auto-rotation |
| **Parallax on scroll AND mouse** | Overwhelming, conflicting | Choose one primary interaction |

---

## 7. Current Trends (2024-2025)

### What's Hot in Premium WebGL

1. **Bento grid with 3D insets** - Modular sections with embedded 3D scenes
2. **Shader-based gradients** - Animated noise/gradient backgrounds
3. **Glass morphism in 3D** - Translucent layered shapes
4. **Particle fields with depth** - Subtle ambient particles, not snow
5. **Scrollytelling 2.0** - 3D scenes that morph based on scroll
6. **Physics-based interactions** - Rapier/Cannon for realistic motion
7. **AI-personalized animations** - Different on each visit (advanced)
8. **Minimalist 3D** - Less is more, 1-3 hero objects max

### What's Out (Avoid)

1. **Isometric grids** - Feels 2018
2. **Low-poly everything** - Overdone
3. **Neon wireframes** - Tron aesthetic is dated
4. **Aggressive bloom** - Early WebGL vibes
5. **Spinning logos** - Corporate website cliché
6. **Starfield backgrounds** - Space.com energy

---

## 8. Drei Helpers for Hero Sections

### Must-Use Drei Components

```typescript
import {
  Environment,        // HDR lighting, reflections
  ContactShadows,     // Realistic ground shadows
  Float,              // Built-in floating animation
  MeshTransmissionMaterial, // Glass/translucency
  useGLTF,           // Load 3D models
  OrbitControls,     // Camera controls (optional)
  PerspectiveCamera, // Custom camera setup
  useTexture,        // Texture loading
  Sparkles           // Particle effects (use sparingly)
} from '@react-three/drei'

// Premium glass shape
<mesh>
  <torusKnotGeometry args={[1, 0.3, 128, 16]} />
  <MeshTransmissionMaterial
    transmission={0.9}
    thickness={0.5}
    roughness={0.2}
    chromaticAberration={0.02}
  />
</mesh>

// Subtle floating
<Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
  <YourMesh />
</Float>
```

---

## 9. Recommended Animation Architecture

### React Three Fiber + Framer Motion Pattern

```typescript
// Orchestrate camera + 3D with Framer Motion state
const Hero3D = () => {
  const [stage, setStage] = useState(0)
  const cameraSpring = useSpring({
    position: stages[stage].cameraPosition,
    config: { mass: 1, tension: 170, friction: 26 }
  })

  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={cameraSpring.position}
      />
      <YourScene stage={stage} />
    </Canvas>
  )
}

// Use GSAP for shader uniform animations
useEffect(() => {
  gsap.to(materialRef.current.uniforms.uTime, {
    value: 10,
    duration: 5,
    repeat: -1,
    ease: "none"
  })
}, [])
```

### State Machine for Complex Interactions

```typescript
// Idle -> Hover -> Active -> Exit states
const states = {
  idle: { rotation: 0, scale: 1 },
  hover: { rotation: 0.2, scale: 1.05 },
  active: { rotation: 0.5, scale: 1.1 },
  exit: { rotation: 0, scale: 0.95 }
}

const [currentState, setCurrentState] = useState('idle')
const spring = useSpring(states[currentState])
```

---

## 10. Testing Checklist

Before launching your premium 3D hero:

**Performance:**
- [ ] FPS >60 on mid-range laptop (use r3f-perf)
- [ ] FPS >30 on mobile (test on real device)
- [ ] Total JS bundle <500kb (lazy load Three.js)
- [ ] First Contentful Paint <2s
- [ ] No jank during scroll

**Visual Quality:**
- [ ] Animations feel smooth, not linear
- [ ] Opacity creates depth without distraction
- [ ] Colors are muted/premium, not saturated
- [ ] Shadows are soft and subtle
- [ ] Works with both light/dark mode

**Interaction:**
- [ ] Mouse parallax is subtle (max ±15°)
- [ ] Camera movement has easing/damping
- [ ] No gimbal lock or weird flips
- [ ] Touch works on mobile (no mouse-only)
- [ ] Keyboard accessible (can skip animation)

**Fallbacks:**
- [ ] Graceful degradation if WebGL unavailable
- [ ] Static image fallback for low-end devices
- [ ] Reduced motion respects `prefers-reduced-motion`
- [ ] Works without JavaScript (progressive enhancement)

---

## 11. Recommended Libraries & Tools

### Core Stack (2025)

```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.96.0",
  "@react-three/postprocessing": "^2.16.0",
  "three": "^0.160.0",
  "framer-motion": "^11.0.0",
  "gsap": "^3.12.0"
}
```

### Dev Tools

- **r3f-perf** - Real-time performance stats
- **spector.js** - Chrome extension for WebGL debugging
- **Leva** - GUI controls for tweaking parameters
- **gltfjsx** - Convert GLTF to React components

### Asset Optimization

- **Draco compression** - Reduce GLTF file size 80%+
- **KTX2/Basis textures** - GPU-compressed textures
- **gltf-transform** - CLI for optimizing 3D models
- **Squoosh** - Image compression for textures

---

## 12. Example: Premium Hero Code Snippet

```typescript
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/three'

const HeroShape = ({ mouse }) => {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Organic floating motion
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.3
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1

    // Smooth mouse parallax (damped)
    meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.x += (mouse.y * 0.2 - meshRef.current.rotation.x) * 0.05
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.8}
          roughness={0.1}
          chromaticAberration={0.03}
          anisotropy={0.5}
        />
      </mesh>
    </Float>
  )
}

export const PremiumHero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMouse({
      x: (e.clientX / window.innerWidth) - 0.5,
      y: -((e.clientY / window.innerHeight) - 0.5)
    })
  }

  return (
    <div className="hero" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: false
        }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <HeroShape mouse={mouse} />
      </Canvas>

      <div className="hero-content">
        <h1>Your Premium Content</h1>
      </div>
    </div>
  )
}
```

**CSS:**
```css
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.hero canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Allow clicks through to content */
  opacity: 0.8; /* Keep it subtle */
}

.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
```

---

## Summary: The Premium Formula

1. **Slow & subtle** - If in doubt, reduce speed by 50%
2. **Easing everything** - No linear motion, ever
3. **Depth through opacity** - Layers at 0.1-0.6 opacity
4. **Limited parallax** - Max ±15° rotation, damped movement
5. **Performance first** - Lazy load, optimize, measure FPS
6. **Less is more** - 1-3 hero objects, not a scene
7. **Avoid clichés** - No spinning logos, starfields, neon wireframes

**When something feels cheap, 90% of the time it's:**
- Too fast
- Too linear (no easing)
- Too opaque/bright
- Too many things moving

**The secret to premium 3D:**
> "Make it so subtle users almost don't notice it's 3D, then they'll be impressed by how polished it feels."

---

## References & Further Reading

### Official Docs
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers GitHub](https://github.com/pmndrs/drei)
- [Three.js Manual](https://threejs.org/manual/)
- [Three.js Journey Course](https://threejs-journey.com/)

### Tutorials & Inspiration
- [Codrops WebGL Tutorials](https://tympanus.net/codrops/tag/webgl/)
- [Building Efficient Three.js Scenes (2025)](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/)
- [Lusion.co Projects](https://lusion.co/projects/)
- [Active Theory Case Studies](https://medium.com/active-theory)
- [Awwwards WebGL Collection](https://www.awwwards.com/awwwards/collections/webgl/)

### Performance Tools
- [r3f-perf](https://github.com/utsuboco/r3f-perf)
- [Spector.js](https://spector.babylonjs.com/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

### Easing & Animation
- [Easings.net Cheat Sheet](https://easings.net/)
- [The Easing Blueprint](https://animations.dev/learn/animation-theory/the-easing-blueprint)
- [GSAP + WebGL Shaders Tutorial](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/)

### Agencies/Studios for Inspiration
- [Lusion](https://lusion.co)
- [Active Theory](https://activetheory.net)
- [Codrops](https://tympanus.net/codrops)
- [Awwwards Winners](https://www.awwwards.com/websites/webgl/)

---

**Document Version:** 1.0
**Last Updated:** 2025-12-25
**Research Sources:** React Three Fiber docs, Codrops tutorials, Three.js Journey, Agency case studies (Lusion, Active Theory), WebGL fundamentals
