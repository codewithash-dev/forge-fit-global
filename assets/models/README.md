# 3D exercise models (GLB)

Place rigged, animated **.glb** files here for in-app 3D demos.

- **Format:** GLB (or GLTF) with optional skeletal animations.
- **Source ideas:** [Mixamo](https://www.mixamo.com/) (free rigged characters + motions), Blender export.
- **Usage:** In `constants/exerciseMedia.ts`, add e.g. `glb: require('../assets/models/your-exercise.glb')` for the exercise ID.

The first animation clip in the file is played on loop in the exercise detail screen.
