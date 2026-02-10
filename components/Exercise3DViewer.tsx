import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// Required for Three.js side-effects in Metro (expo-three)
if (typeof global !== 'undefined') {
  (global as any).THREE = THREE;
}

type Exercise3DViewerProps = {
  /** require('./path/to/model.glb') - when set, shows 3D model with animation */
  source: number | null;
  style?: object;
  /** Height of the GL view (default 260) */
  height?: number;
};

export default function Exercise3DViewer({ source, style, height = 260 }: Exercise3DViewerProps) {
  const rafRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cleanupRef.current?.();
    };
  }, []);

  if (source == null) {
    return (
      <View style={[styles.placeholder, style, { height }]}>
        <Text style={styles.placeholderTitle}>3D demo</Text>
        <Text style={styles.placeholderText}>
          Add a .glb model to this exercise to see an animated 3D demo here. Use Mixamo or export from Blender.
        </Text>
      </View>
    );
  }

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x1a1a1a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 2.5);
    camera.lookAt(0, 0.6, 0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 4, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    try {
      const [asset] = await Asset.loadAsync(source);
      const uri = asset.localUri ?? asset.uri;
      if (!uri) throw new Error('No URI for GLB asset');

      const response = await fetch(uri);
      if (!response.ok) throw new Error(`Failed to fetch model: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();

      const loader = new GLTFLoader();
      loader.parse(
        arrayBuffer,
        '',
        (result) => {
          const model = result.scene;
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).castShadow = true;
              (child as THREE.Mesh).receiveShadow = true;
            }
          });

          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 1.5 / maxDim;
          model.scale.setScalar(scale);
          model.position.sub(center.multiplyScalar(scale));
          scene.add(model);

          if (result.animations?.length) {
            mixer = new THREE.AnimationMixer(model);
            const clip = result.animations[0];
            mixer.clipAction(clip).setLoop(THREE.LoopRepeat).play();
          }
        },
        (err) => console.error('GLTF parse error', err)
      );

      const render = () => {
        rafRef.current = requestAnimationFrame(render);
        const dt = clock.getDelta();
        if (mixer) mixer.update(dt);
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
      cleanupRef.current = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    } catch (e) {
      console.error('Exercise3DViewer load error', e);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.placeholder, style, { height }]}>
        <Text style={styles.placeholderText}>3D viewer runs on native (iOS/Android). Use a device or simulator with WebGL.</Text>
      </View>
    );
  }

  return (
    <GLView
      style={[styles.glView, style, { height }]}
      onContextCreate={onContextCreate}
    />
  );
}

const styles = StyleSheet.create({
  glView: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  placeholder: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: 'rgba(26,26,26,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.2)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    color: '#C9A84C',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  placeholderText: {
    color: 'rgba(245,240,232,0.6)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
