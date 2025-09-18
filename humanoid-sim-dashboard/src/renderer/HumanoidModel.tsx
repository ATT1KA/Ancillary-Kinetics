import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { VRM, VRMUtils } from '@pixiv/three-vrm';
import { useFrame } from '@react-three/fiber';

interface Props { morphInfluences: number[] }

export const HumanoidModel: React.FC<Props> = ({ morphInfluences }) => {
  const gltf = useGLTF('/base-humanoid.vrm');
  const ref = useRef<THREE.Group>(null);
  const vrmRef = useRef<VRM | null>(null);

  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene);
    VRM.from(gltf.scene).then((vrm) => {
      vrmRef.current = vrm;
      if (ref.current) ref.current.add(vrm.scene);
    });
  }, [gltf.scene]);

  useFrame(() => {
    if (vrmRef.current && ref.current) {
      // Apply morph targets (assumes mesh named 'body' has morphs)
      const meshes = ref.current.children.filter((c) => c instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
      meshes.forEach((mesh) => {
        mesh.morphTargetInfluences = morphInfluences;
      });
      // Scale bones (e.g., hips for height)
      const hips = vrmRef.current.humanoid?.getNormalizedBoneNode('hips');
      if (hips && morphInfluences[0]) hips.scale.setScalar(1 + morphInfluences[0]);
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={[0.01, 0.01, 0.01]} />; // VRM scale tweak
};