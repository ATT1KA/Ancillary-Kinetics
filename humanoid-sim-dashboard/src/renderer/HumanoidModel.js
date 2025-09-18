import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMUtils } from '@pixiv/three-vrm';
import { useFrame } from '@react-three/fiber';
export const HumanoidModel = ({ morphInfluences }) => {
    const ref = useRef(null);
    const vrmRef = useRef(null);
    useEffect(() => {
        const loader = new GLTFLoader();
        loader.loadAsync('/base-humanoid.vrm').then((gltf) => {
            VRM.from(gltf.scene).then((vrm) => {
                VRMUtils.removeUnnecessaryJoints(vrm.scene);
                vrmRef.current = vrm;
                if (ref.current)
                    ref.current.add(vrm.scene);
            }).catch((error) => console.error('VRM creation error:', error));
        }).catch((error) => console.error('GLTF loading error:', error));
        return () => {
            if (vrmRef.current) {
                // Dispose of VRM resources
                vrmRef.current.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.geometry.dispose();
                        if (child.material instanceof THREE.Material)
                            child.material.dispose();
                    }
                });
            }
        };
    }, []);
    useFrame(() => {
        if (vrmRef.current && ref.current) {
            // Apply morph targets (assumes mesh named 'body' has morphs)
            const meshes = ref.current.children.filter((c) => c instanceof THREE.SkinnedMesh);
            meshes.forEach((mesh) => {
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
    return _jsx("primitive", { ref: ref, object: new THREE.Group(), scale: [0.01, 0.01, 0.01] }); // Placeholder until VRM loads
};
