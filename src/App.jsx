/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'

const store = [
  { name: 'entrance', color: 'lightblue', position: [15, 0, 0], url: '/1-Entrance.jpeg', link: 0 },
  { name: 'window-table-2', color: 'lightblue', position: [15, 0, 0], url: '/3-Window Table 2.jpeg', link: 2 },
  { name: 'window-table', color: 'lightblue', position: [-15, 0, 0], url: '/2-Window Table.jpeg', link: 1 },
  { name: 'corner', color: 'lightblue', position: [15, 0, 0], url: '/4-Corner.jpeg', link: 3 },
  // ...
]

function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

export default function App() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
      <Suspense fallback={null}>
        <Preload all />
        <Portals />
      </Suspense>
    </Canvas>
  )
}
