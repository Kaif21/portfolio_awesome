'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingNodeProps {
  position: [number, number, number]
  color: string
  label: string
  size?: number
  onHover?: (id: number | null) => void
  id: number
}

export function FloatingNode({ position, color, label, size = 0.5, onHover, id }: FloatingNodeProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.4
      const target = hovered ? size * 1.5 : size
      mesh.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12)
    }
    if (ring.current) {
      ring.current.rotation.z = -t * (hovered ? 1.6 : 0.5)
      const s = hovered ? 2.1 : 1.5
      ring.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover?.(id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          onHover?.(null)
          document.body.style.cursor = 'auto'
        }}
      >
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.55}
          roughness={0.3}
          metalness={0.55}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[size * 1.6, 0.015, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.9 : 0.35} />
      </mesh>

      {/* Point light accent on hover */}
      <pointLight color={color} intensity={hovered ? 1.5 : 0} distance={4} />
    </group>
  )
}
