import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMUtils } from '@pixiv/three-vrm';
import { useFrame } from '@react-three/fiber';

interface Props { morphInfluences: number[] }

export const HumanoidModel: React.FC<Props> = ({ morphInfluences }) => {
  const ref = useRef<THREE.Group>(null);
  const vrmRef = useRef<VRM | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.loadAsync('/base-humanoid.vrm').then((gltf) => {
      (VRM as any).from(gltf.scene).then((vrm: VRM) => {
        VRMUtils.removeUnnecessaryJoints(vrm.scene);
        vrmRef.current = vrm;
        if (ref.current) ref.current.add(vrm.scene);
      }).catch((error: Error) => console.error('VRM creation error:', error));
    }).catch((error: Error) => console.error('GLTF loading error:', error));

    return () => {
      if (vrmRef.current) {
        // Dispose of VRM resources
        vrmRef.current.scene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material instanceof THREE.Material) child.material.dispose();
          }
        });
      }
    };
  }, []);

  useFrame(() => {
    if (vrmRef.current && ref.current) {
      // Apply morph targets (assumes mesh named 'body' has morphs)
      const meshes = ref.current.children.filter((c: THREE.Object3D) => c instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
      meshes.forEach((mesh: THREE.SkinnedMesh) => {
        if (mesh.morphTargetInfluences && mesh.morphTargetInfluences.length === morphInfluences.length) {
          mesh.morphTargetInfluences = morphInfluences;
        }
      });
      // Scale bones (e.g., hips for height)
      const hips = vrmRef.current.humanoid?.getNormalizedBoneNode('hips');
      if (hips && morphInfluences[0] !== undefined && morphInfluences[0] > -1) {
        hips.scale.setScalar(Math.max(0.1, 1 + morphInfluences[0]));
      }
    }
  });

  return <primitive ref={ref} object={new THREE.Group()} scale={[0.01, 0.01, 0.01]} />; // Placeholder until VRM loads
};
