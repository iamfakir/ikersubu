'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ImageSphereProps {
  images: string[];
  radius?: number;
}

const ImageSphere = ({ images, radius = 5 }: ImageSphereProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  
  // Create points on a sphere
  const points = useRef<THREE.Vector3[]>([]);
  
  useEffect(() => {
    // Generate points on a sphere using the Fibonacci sphere algorithm
    const numPoints = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = 2 * Math.PI * i / goldenRatio;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      points.current.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
    }
  }, [images.length]);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {points.current.map((point, index) => {
        // Create a quaternion that makes the plane face the center
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          point.clone().normalize()
        );
        
        return (
          <mesh
            key={index}
            position={point}
            quaternion={quaternion}
            onPointerOver={() => setHovered(index)}
            onPointerOut={() => setHovered(null)}
            onClick={() => setActive(active === index ? null : index)}
            scale={active === index ? 1.5 : hovered === index ? 1.2 : 1}
          >
            <planeGeometry args={[2.5, 1.5]} />
            <meshBasicMaterial 
              side={THREE.DoubleSide}
              map={new THREE.TextureLoader().load(images[index])}
            />
          </mesh>
        );
      })}
    </group>
  );
};

interface GlobeCarouselProps {
  images: string[];
  className?: string;
}

const GlobeCarousel = ({ 
  images = [
    '/assets/images/works/optimized/53.webp',
    '/assets/images/works/optimized/54.webp',
    '/assets/images/works/optimized/55.webp',
    '/assets/images/works/optimized/56.webp',
  ],
  className = '' 
}: GlobeCarouselProps) => {
  return (
    <div className={`w-full h-[500px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ImageSphere images={images} radius={5} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default GlobeCarousel;
