import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile, screenWidth }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Dynamic scaling based on screen width
  const getScale = () => {
    if (screenWidth <= 480) return 0.35; // Very small phones
    if (screenWidth <= 768) return 0.45; // Tablets/phones
    if (screenWidth <= 1024) return 0.65; // Small laptops
    return 0.85; // Desktop
  };

  // Auto-rotate for mobile
  useFrame((state) => {
    if (isMobile && computer.scene) {
      computer.scene.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={getScale()}
        position={isMobile ? [0, -2.50, -1.8] : [0, -7.80, -1.5]}
        rotation={isMobile ? [-0.00, 0, -0.1] : [-0.00, -0.2, -0.1]}
      />
    </mesh>
  );
};

const HandController = ({ handPosition, controlsRef }) => {
  useFrame(({ camera }) => {
    if (controlsRef.current) {
      // Map hand position to camera rotation
      const x = (handPosition.x - 0.5) * 2; // -1 to 1
      const y = (handPosition.y - 0.5) * 2; // -1 to 1
      controlsRef.current.target.set(x * 5, y * 5, 0);
      controlsRef.current.update();
    }
  });
  return null;
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const controlsRef = useRef();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Handle window resize for dynamic scaling
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Remove the listeners when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const initHandTracking = async () => {
      const videoElement = document.createElement('video');
      videoElement.style.display = 'none';
      document.body.appendChild(videoElement);

      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const landmarks = results.multiHandLandmarks[0];
          const wrist = landmarks[0];
          setHandPosition({ x: wrist.x, y: wrist.y });
        }
      });

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
        initHandTracking();
      }).catch((err) => {
        console.error('Camera access denied:', err);
      });
    }
  }, []);

  return (
    <Canvas
      frameloop={isMobile ? 'always' : 'demand'}
      shadows
      dpr={[1, 2]}
      camera={{
        position: isMobile ? [20, 3, 5] : [20, 3, 5],
        fov: isMobile ? 35 : 25
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}
        {!isMobile && <HandController handPosition={handPosition} controlsRef={controlsRef} />}
        <Computers isMobile={isMobile} screenWidth={screenWidth} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
