import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL =
  "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/model.glb";
const TEXTURE_URL =
  "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/baked.jpg";

const Diorama = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(10, 1, 0.1, 100);
    camera.position.set(8, 4, 15);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 21;
    controls.maxDistance = 50;
    controls.minPolarAngle = Math.PI / 5;
    controls.maxPolarAngle = Math.PI / 2;

    const textureLoader = new THREE.TextureLoader();
    const bakedTexture = textureLoader.load(TEXTURE_URL);
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      gltf => {
        gltf.scene.traverse(child => {
          if (child.isMesh) child.material = bakedMaterial;
        });
        scene.add(gltf.scene);
        scene.position.set(0, 0.2, 0);
        setIsLoading(false);
      },
      undefined,
      error => {
        console.error("Failed to load diorama", error);
        setIsLoading(false);
      }
    );

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const minPan = new THREE.Vector3(-2, -0.5, -2);
    const maxPan = new THREE.Vector3(2, 0.5, 2);

    let animationFrame;
    const tick = () => {
      animationFrame = requestAnimationFrame(tick);
      controls.update();
      controls.target.clamp(minPan, maxPan);
      renderer.render(scene, camera);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      controls.dispose();
      renderer.dispose();
      scene.traverse(object => {
        if (object.isMesh) {
          object.geometry?.dispose?.();
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose?.());
          } else {
            object.material?.dispose?.();
          }
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="diorama-wrapper">
      {isLoading && (
        <div className="diorama-loader">
          <p>Loading…</p>
        </div>
      )}
      <canvas ref={canvasRef} className="diorama-canvas" />
    </div>
  );
};

export default Diorama;
