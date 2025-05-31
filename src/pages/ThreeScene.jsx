import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Function to create text texture
    const createTextTexture = (text) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 512;
      canvas.height = 256;

      // Background color
      ctx.fillStyle = "#c17e02"; // Light blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text settings
      ctx.fillStyle = "white"; // Text color
      ctx.font = "40px Satoshi";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      return new THREE.CanvasTexture(canvas);
    };

    // Create sphere material with text texture
    const material = new THREE.MeshBasicMaterial({
      map: createTextTexture("MESS CONNECT"),
    });

    // Create sphere
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Animation loop
    const animate = () => {
      sphere.rotation.y += 0.01; // Rotate sphere
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pt-28 z-0" />;
};

export default ThreeScene;
