# Bruno Simon's 3D Web Design Principles & Techniques

Research conducted: 2025-12-25
Based on: bruno-simon.com portfolio, Three.js Journey course, interviews, and case studies

## Core Design Philosophy

### 1. Purposeful Fun
- "The best game you can build is the one you spend too much time playing on"
- 3D should enhance user experience, not hinder it
- Design for enjoyment first, technical showcase second
- If a project will take time, make sure you have fun building it

### 2. Immersion Over Interface
- Minimize or eliminate traditional UI elements
- Everything should exist within the 3D world
- Guide users through environmental design, not instructions
- Create experiences where "browsing" and "visiting" take on new meaning

### 3. Progressive Understanding
- Design for discoverability
- Strategic placement guides behavior (e.g., car positioned to bump title text first)
- Use visual paths (tiles, roads) to suggest direction
- Layer complexity: surface simplicity with hidden depth

### 4. Physics as Play
- Physics engines underutilized on the web but highly engaging
- Make elements "bump-able" and interactive
- Low-poly visible models paired with primitive physics meshes for performance
- Gamification through vehicle mechanics (WASD, boost, jump, brake)

## Visual Design Principles

### 1. The "No Lights" Illusion
**Core Technique:** Use MatCap materials instead of real-time lighting

**Why:**
- Dramatically better performance (no lighting calculations)
- Pre-baked shadows and highlights encoded in texture
- Consistent look across devices
- Full artistic control over appearance

**How MatCaps Work:**
- Uses image of a sphere as view-space environment map
- Material looks up colors based on surface normals relative to camera
- Creates illusion of complex lighting, reflections, and material properties
- Does not respond to Three.js lights (lighting is "baked in")

**Benefits:**
- Perfect for mobile, large scenes, and maintaining specific visual style
- Achieves complex looks (metal, clay, plastic, ceramic) without shader complexity
- Can simulate various material types by swapping matcap texture

### 2. Warm Color Palette
**Bruno's Portfolio Colors:**
- Primary: #DF6C4F (warm coral/terracotta orange)
- Secondary: #ECD06F (warm golden yellow)

**Design Choices:**
- Huge light flare on left matching sun orientation
- Creates "warm and good feeling"
- Reinforces playful, approachable aesthetic
- Contrasts against neutral/cool environment tones

### 3. Stylized Over Photorealistic
- Low-poly geometry
- Custom shaders for specific aesthetic control
- Toon/cel-shaded approaches when appropriate
- Focus on cohesive art direction rather than realism

### 4. Strategic Post-Processing
**Minimal but Effective:**
- Simple blur on top/bottom of screen to "simulate smallness"
- Sun flare for warmth and realism
- Avoid heavy post-processing that tanks performance
- Each effect must serve specific purpose

## Technical Implementation Principles

### 1. Performance First
**Optimization Techniques:**
- MatCap materials (no lighting calculations)
- Low-poly visible models
- Separate primitive meshes for physics (cubes, cylinders, spheres)
- VAO (Vertex Array Object) to reduce WebGL calls
- Quality toggles for different device capabilities

**Memory Management:**
- Users see detailed models
- Physics engine processes simplified primitives
- Dual model approach: visual fidelity + physics efficiency

### 2. Custom Shaders for Control
- Most materials are custom-made using shaders
- Programs sent to GPU controlling vertex positions and pixel colors
- Full control over visual aspect and optimizations
- Mix standard Three.js materials with custom shaders as needed

### 3. Physics Libraries
**Cannon.js (Bruno's portfolio):**
- Pre-built vehicle classes
- Good 3D physics with simplified primitives
- Parallel "physics universe" that updates visible universe

**Rapier (newer work):**
- Modern physics engine
- Better performance characteristics
- Consider for new projects

### 4. Modern Rendering Stack
**Three.js with TSL (Three Shading Language):**
- Enables both WebGL and WebGPU
- Future-proof while maintaining WebGL compatibility
- WebGPU is "more modern" and "more optimized" than WebGL
- Allows progressive enhancement

## Interaction Design Principles

### 1. Game Mechanics as Navigation
**Vehicle Controls Transform Exploration:**
- Keyboard: WASD movement, SHIFT boost, SPACE jump, CTRL brake
- Gamepad: Full controller support with joystick steering
- Mobile: Touch gestures (single and two-finger)
- Creates memorable, unique experience

**Why This Works:**
- Familiar gaming controls reduce learning curve
- Adds playfulness to mundane portfolio browsing
- Creates stories users want to share
- Transforms passive viewing into active play

### 2. Environmental Storytelling
- Hide secrets throughout the world
- Achievement/unlock systems for engagement
- Tiles/paths guide without explicit instruction
- Objects placed to teach mechanics organically

### 3. Accessibility Considerations
- Multiple input methods (keyboard, gamepad, touch)
- Quality settings for various devices
- Respawn mechanics prevent frustration
- Spatial audio with Howler.js for orientation

## Composition & Visual Hierarchy

### 1. Photography Principles in 3D
- Rule of thirds applied to 3D scenes
- Works from multiple camera angles
- Leading lines guide user's gaze through environment
- Focal points along virtual gridlines

### 2. Color Theory Application
**Purpose Beyond Aesthetics:**
- Colors tell stories and evoke emotions
- Warm palettes create approachable, friendly spaces
- Use color to guide users on immersive journeys
- Consistent palette creates visual cohesion

### 3. Depth and Atmosphere
- Blur effects simulate miniature scale
- Sun flares add environmental context
- Strategic emptiness makes key elements stand out
- Balance detail-rich areas with breathing room

## Learning & Iteration Philosophy

### 1. Embrace Difficulty
- "If it's hard to learn, it's valuable knowledge"
- Struggle long enough to see if you enjoy it
- Hard skills mean less competition
- Don't avoid complexity if it serves the vision

### 2. Build What You Love
- Not about project requirements
- Do it because you genuinely like it
- Personal passion shows in final quality
- More likely to finish and iterate

### 3. Open Source Mindset
- Portfolio code available on GitHub (MIT license)
- Even Blender files shared publicly
- Teaching through Three.js Journey
- Community-first approach builds reputation

## Cohesive Experience Creation

### 1. Unified Interaction Paradigm
- Everything explored through same controls
- Consistent physics behavior across all objects
- No mode switching or context changes
- Single mental model for entire experience

### 2. Art Direction Consistency
**Every Element Serves the Vision:**
- MatCaps provide consistent material look
- Custom shaders maintain artistic control
- Color palette applied throughout
- Post-processing enhances, doesn't dominate

### 3. Performance as UX
- Smooth framerate is non-negotiable
- Optimization techniques invisible to users
- Graceful degradation on lower-end devices
- Loading times and responsiveness matter

## Specific Techniques to Apply

### Lighting Illusion (MatCap)
```javascript
// Instead of complex lighting setup:
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture // Pre-baked lighting/shading
});
// No lights needed in scene
// Consistent look, better performance
```

### Warm Atmosphere
- Color palette: Terracotta orange (#DF6C4F) + Golden yellow (#ECD06F)
- Add directional sun flare (left side typical)
- Use warm ambient colors in environment
- Balance with cooler neutrals for contrast

### Physics Integration
```javascript
// Visual model (detailed, low-poly)
const visualMesh = new THREE.Mesh(detailedGeometry, material);

// Physics model (simplified primitives)
const physicsBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(1, 0.5, 2))
});

// Update loop syncs them
physicsBody.addEventListener('collide', handleCollision);
```

### Custom Shaders for Control
- Use ShaderMaterial for unique effects
- Start with MatCap, customize as needed
- Keep performance in mind (GPU calculations)
- Test on mobile early and often

### Environmental Guidance
- Use visual paths (tiles, roads, glowing trails)
- Strategic object placement teaches mechanics
- No tutorial text if environment can teach
- First interaction should reveal system

## Tools & Workflow

### 3D Modeling
- **Blender** (preferred since 2.8 update)
- Create low-poly visual models
- Export separate primitive collision meshes
- Organize with clear naming conventions

### Libraries
- **Three.js**: Core rendering (close to WebGL, easy to optimize)
- **Cannon.js** or **Rapier**: Physics simulation
- **Howler.js**: Spatial audio
- **Blender**: 3D modeling

### Development Approach
- Start with core mechanic (e.g., vehicle controls)
- Build physics first, visuals second
- Iterate on feel before adding content
- Test on target devices early

## Key Takeaways

1. **Purposeful 3D**: Every 3D element must enhance experience, not just look cool
2. **Performance = UX**: Smooth framerate through clever techniques (MatCaps, simplified physics)
3. **Playful Interaction**: Game mechanics make boring tasks fun (portfolio browsing → car driving)
4. **Visual Cohesion**: Consistent materials, colors, and lighting create unified world
5. **Environmental Design**: Guide through placement and visuals, not UI/text
6. **Custom Shaders**: Control appearance while maintaining performance
7. **Physics Engagement**: Make things bump-able, interactive, physics-driven
8. **Warm & Approachable**: Color choices and lighting create emotional tone
9. **No Traditional Lights**: MatCaps simulate complex lighting without performance cost
10. **Open & Educational**: Share knowledge, build community, inspire others

## Application to Landing Pages

### When to Use Bruno's Approach:
- Product showcases needing "wow" factor
- Interactive demos or configurators
- Portfolios for creative/technical work
- Brand experiences emphasizing innovation
- Educational/exploratory content

### When to Simplify:
- Content-heavy sites (text readability)
- E-commerce (conversion over exploration)
- Accessibility-critical applications
- Bandwidth-constrained audiences
- Quick information retrieval needs

### Hybrid Approach:
- 3D hero sections with 2D content below
- Interactive product viewers within traditional layout
- 3D backgrounds with 2D UI overlays
- Progressive enhancement (3D for capable devices)

---

## Sources

### Primary Sources:
- [Bruno Simon Portfolio](https://bruno-simon.com/) - Interactive 3D portfolio with drivable car
- [Bruno Simon Portfolio Case Study (Medium)](https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b) - Technical deep-dive
- [Three.js Journey](https://threejs-journey.com/) - Bruno's comprehensive Three.js course
- [3D Web Development Chat with Bruno Simon (Mux)](https://www.mux.com/blog/3d-web-development-and-beyond-a-chat-with-bruno-simon) - Philosophy and approach

### Technical Resources:
- [MeshMatcapMaterial - Three.js Docs](https://threejs.org/docs/api/en/materials/MeshMatcapMaterial.html)
- [Three.js MatCap Example](https://threejs.org/examples/webgl_materials_matcap.html)
- [Custom Toon Shader Tutorial](https://www.maya-ndljk.com/blog/threejs-basic-toon-shader)
- [Three.js Materials Lesson](https://threejs-journey.com/lessons/materials)

### Recognition & Analysis:
- [Bruno Simon - Awwwards SOTD](https://www.awwwards.com/sites/bruno-simon-portfolio)
- [Bruno Simon - CSS Design Awards](https://www.cssdesignawards.com/sites/bruno-simon-portfolio/36090)
- [Awwwards Interview](https://www.awwwards.com/bruno-simon-portfolio-wins-site-of-the-month-november.html)
- [Three.js Learning Resources](https://threejsresources.com/tool/threejs-journey)
