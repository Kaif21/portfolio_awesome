'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Html } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { FloatingNode } from './floating-node'

// Brand palette — Deep Cyber Charcoal
const ACCENT = '#FF5A1F'
const CORAL = '#FF8A5B'
const WHITE = '#FFFFFF'

const NODES = [
  { id: 1, position: [-3, 1.2, -1] as [number, number, number], color: ACCENT, label: 'Webhook Trigger', size: 0.5 },
  { id: 2, position: [0, 2.2, 0] as [number, number, number], color: CORAL, label: 'n8n Engine', size: 0.62 },
  { id: 3, position: [3, 1.2, -1] as [number, number, number], color: ACCENT, label: 'Odoo CRM', size: 0.5 },
  { id: 4, position: [-2.2, -1.2, 1] as [number, number, number], color: CORAL, label: 'Zapier', size: 0.44 },
  { id: 5, position: [2.2, -1.2, 1] as [number, number, number], color: ACCENT, label: 'API Layer', size: 0.44 },
  { id: 6, position: [0, 0, -2.6] as [number, number, number], color: WHITE, label: 'Database', size: 0.4 },
  { id: 7, position: [0, -2.2, 0.6] as [number, number, number], color: CORAL, label: 'Alerts', size: 0.36 },
]

// node-pair connections forming the workflow graph
const EDGES: Array<[number, number]> = [
  [1, 2], [2, 3], [2, 4], [2, 5], [2, 6], [4, 6], [5, 6], [3, 5], [4, 7], [5, 7],
]

function DataPulse({
  from,
  to,
  color,
  speed,
  offset,
}: {
  from: [number, number, number]
  to: [number, number, number]
  color: string
  speed: number
  offset: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const a = useMemo(() => new THREE.Vector3(...from), [from])
  const b = useMemo(() => new THREE.Vector3(...to), [to])

  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime * speed + offset) % 1
    ref.current.position.lerpVectors(a, b, t)
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.sin(t * Math.PI) * 0.95
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

function ConnectionLine({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const lineObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...from),
      new THREE.Vector3(...to),
    ])
    const material = new THREE.LineBasicMaterial({ color: WHITE, transparent: true, opacity: 0.18 })
    return new THREE.Line(geometry, material)
  }, [from, to])

  useEffect(() => {
    return () => {
      lineObject.geometry.dispose()
      ;(lineObject.material as THREE.Material).dispose()
    }
  }, [lineObject])

  return <primitive object={lineObject} />
}

function AutomationScene() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const nodeById = useMemo(() => new Map(NODES.map((n) => [n.id, n])), [])

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[10, 10, 10]} intensity={1.0} color={ACCENT} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={CORAL} />

      <Stars radius={90} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />

      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.55}>
        {NODES.map((node) => (
          <FloatingNode
            key={node.id}
            id={node.id}
            position={node.position}
            color={node.color}
            label={node.label}
            size={node.size}
            onHover={setHoveredNode}
          />
        ))}

        {EDGES.map(([aId, bId], i) => {
          const a = nodeById.get(aId)!
          const b = nodeById.get(bId)!
          return (
            <group key={`edge-${i}`}>
              <ConnectionLine from={a.position} to={b.position} />
              <DataPulse
                from={a.position}
                to={b.position}
                color={i % 3 === 0 ? ACCENT : i % 3 === 1 ? CORAL : WHITE}
                speed={0.18 + (i % 5) * 0.045}
                offset={(i * 0.37) % 1}
              />
            </group>
          )
        })}
      </Float>

      {/* Hover tooltip */}
      {hoveredNode !== null && (
        <Html position={nodeById.get(hoveredNode)!.position} center distanceFactor={9}>
          <div className="pointer-events-none px-3 py-1.5 rounded-md bg-base-deep/90 border border-accent/40 whitespace-nowrap">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
              {nodeById.get(hoveredNode)!.label}
            </span>
          </div>
        </Html>
      )}

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
    </>
  )
}

export function AutomationNetwork() {
  return (
    <div className="relative w-full h-[380px] lg:h-[560px]" role="img" aria-label="Interactive 3D automation workflow network">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <AutomationScene />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent-soft/70">
          Live Workflow Network — hover the nodes
        </p>
      </div>
    </div>
  )
}
