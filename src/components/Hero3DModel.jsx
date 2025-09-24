import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Configure DRACO loader globally
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/'); // Path to DRACO decoder files

// Log DRACO configuration
console.log('DRACO loader configured for 3D models');

/**
 * 3D Model Component for Hero Section
 * Loads and displays the GLB/GLTF scene with animations and lighting using DRACO compression
 */
function Model({ url, ...props }) {
    // DRACO loader is configured and passed to useGLTF
    const { scene } = useGLTF(url, '/draco/');
    const modelRef = useRef();

    // Auto-rotate the model
    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005; // Slow rotation
        }
    });

    useEffect(() => {
        if (scene) {
            // Set up any initial transformations
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={[1.5, 1.5, 1.5]}
            position={[0, 0, 0]}
            {...props}
        />
    );
}

/**
 * Loading fallback component
 */
function ModelLoader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#333" wireframe />
        </mesh>
    );
}

/**
 * Hero 3D Model Component
 * Renders the 3D scene with the GLTF model
 */
const Hero3DModel = ({
    className = '',
    style = {},
    modelScale = 1,
    autoRotate = true,
    enableControls = false,
    ...props
}) => {
    return (
        <div
            className={`hero-3d-model ${className}`}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                pointerEvents: enableControls ? 'auto' : 'none',
                border: 'none', // Explicitly remove border
                outline: 'none', // Remove outline
                ...style
            }}
            {...props}
        >
            <Canvas
                camera={{
                    position: [0, 0, 8], // Moved camera back for better view when zoomed out
                    fov: 45, // Slightly reduced field of view for better framing
                    near: 0.1,
                    far: 1000
                }}
                style={{
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    border: 'none', // Explicitly remove border
                    outline: 'none', // Remove outline
                    boxShadow: 'none', // Remove any box shadow
                }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
            >
                {/* Lighting setup - Enhanced for transparent background */}
                <ambientLight intensity={0.6} /> {/* Increased ambient light */}
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.2} // Increased intensity
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" /> {/* Added white light */}
                <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff4444" /> {/* Subtle red accent */}

                {/* Environment for reflections */}
                <Environment preset="night" />

                {/* 3D Model */}
                <Suspense fallback={<ModelLoader />}>
                    <Model
                        url="/assets/model.glb"
                        scale={[modelScale, modelScale, modelScale]}
                    />
                </Suspense>

                {/* Controls (optional) */}
                {enableControls && (
                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        enableRotate={true}
                        autoRotate={autoRotate}
                        autoRotateSpeed={0.5}
                    />
                )}
            </Canvas>
        </div>
    );
};

// Model is already preloaded with DRACO support at the top of the file
// Preload the GLB model with DRACO compression support
useGLTF.preload('/assets/model.glb', '/draco/');

export default Hero3DModel;
