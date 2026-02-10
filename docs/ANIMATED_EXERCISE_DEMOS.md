# Animated Exercise Demos (AI-style / 3D Human)

You want in-app demos with a 3D human figure in motion and muscle highlighting, like in the reference screens. Here are practical ways to do it in Expo/React Native.

---

## 1. **Pre-rendered video (easiest, works today)**

- **What:** Each exercise has a short video (MP4/WebM) of a 3D human performing the movement. You can generate these in Blender, Unity, or a service.
- **In the app:** Use `expo-video` (or `expo-av`) on the exercise detail screen. Same place you already show a video/gif; just swap the asset for a 3D-rendered clip.
- **Pros:** No 3D engine in the app, works on all devices, full control over “AI-style” look and muscle highlight in the video.
- **Cons:** One video per exercise (or per angle), larger bundle or streaming.

---

## 2. **3D in the app with Expo + Three.js (real 3D, motion)**

- **What:** A 3D human model (e.g. GLB) with a skeleton, plus animation clips per exercise. The app plays the clip so the figure moves.
- **Libraries:** `expo-gl` + `expo-three` (or a React Native Three.js wrapper). Load a GLB, run an animation clip, optionally highlight mesh regions for “target muscle.”
- **Assets:**  
  - Human rig: Mixamo, Ready Player Me, or a custom rig.  
  - Animations: Mixamo (free exercise motions), or custom in Blender.  
  - Export as GLB/GLTF and (if needed) separate clips.
- **Pros:** Real 3D, one model, many exercises, can rotate camera, can drive muscle highlight from the same rig.
- **Cons:** More setup, larger app size, need to manage GL context and performance (especially on low-end devices).

---

## 3. **Lottie / JSON animations (2D “motion”)**

- **What:** Design 2D or 2.5D “AI-style” characters in After Effects, export as Lottie JSON. Play in app with `lottie-react-native`.
- **Pros:** Small files, smooth, no 3D engine. Good for stylized, branded demos.
- **Cons:** Not true 3D; harder to do full-body rotation and muscle highlight the same way as a 3D human.

---

## 4. **External / embedded services**

- **What:** Use a third-party exercise demo API or SDK (e.g. some fitness APIs provide embeddable demos or thumbnails). Or embed a **WebView** that loads a web page with a Three.js/Babylon 3D viewer.
- **Pros:** Less in-house 3D work if the provider has the content.
- **Cons:** Depends on their pricing, availability, and whether they support “3D human + motion + muscle highlight” the way you want.

---

## Recommended path for “motion and everything”

- **Short term:** Use **pre-rendered 3D videos** (option 1). Create or buy clips of a 3D human doing each exercise (with optional muscle highlight baked in). Drop them into your existing exercise detail screen next to instructions. No new 3D runtime in the app.
- **Long term:** If you want interactive 3D (rotate, tap to highlight muscle), invest in **expo-gl + Three.js + GLB human + Mixamo-style clips** (option 2). Start with one exercise and one device to validate performance, then scale.

---

## In-app 3D (implemented)

The app now has an **in-app 3D** path wired up:

1. **Dependencies:** `expo-gl`, `expo-three`, `three` (see `package.json`). Run:
   ```bash
   npm install
   ```
2. **Metro:** `metro.config.js` adds `glb` and `gltf` to `assetExts` so GLB models are bundled.
3. **Component:** `components/Exercise3DViewer.tsx` uses `GLView` + Three.js to load a GLB, add it to a scene, and play the first animation clip in a loop. When no model is provided, it shows a placeholder.
4. **Exercise detail:** `app/exercise/[id].tsx` shows the 3D viewer when the exercise has a `glb` in `constants/exerciseMedia.ts`; otherwise it falls back to video or image.

**How to add a 3D demo for an exercise**

- Export a rigged human + animation as **GLB** (e.g. from Mixamo or Blender).
- Put the file in the app, e.g. `assets/models/alternate-lateral-pulldown.glb`.
- In `constants/exerciseMedia.ts`, add a `glb` field for that exercise ID:
  ```ts
  '0007': {
    image: require('../assets/images/exercises/alternate-lateral-pulldown.jpg'),
    video: require('../assets/videos/alternate-lateral-pulldown.mp4'),
    glb: require('../assets/models/alternate-lateral-pulldown.glb'),
  },
  ```
- Rebuild/run on a **physical device** (Three.js + Expo GL is unreliable in iOS Simulator / Android emulator).

The viewer plays the first animation clip in the GLB on loop and lights the model so it’s visible on a dark background.
