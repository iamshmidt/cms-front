'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { OrbitControls, MeshWobbleMaterial, AsciiRenderer } from '@react-three/drei'
import LoaderFull from '../loader-full'
// import {Model} from './model'
function Torusknot(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef()
  const viewport = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 2
      ref.current.rotation.y += delta / 2
    }
  })

  return (
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

const CanvasIntro = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Set a timeout for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    {loading ? <LoaderFull /> : 
    // <LoaderFull />
    <Canvas className="canvas" frameloop="demand">
      <color attach="background" args={['black']} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Torusknot />
      <AsciiRenderer fgColor="white" bgColor="transparent" />
    </Canvas>
    }
    </>

  )
}

export default CanvasIntro
