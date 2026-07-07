'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GRID = 12
const SPACING = 1.15

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Building {
  x: number
  z: number
  h: number
  delay: number
}

function City({ pr }: { pr: { v: number } }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { buildings, geometry, highways, arcs } = useMemo(() => {
    const rand = mulberry32(7)
    const buildings: Building[] = []
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        if (rand() < 0.18) continue
        const cx = (i - GRID / 2 + 0.5) * SPACING
        const cz = (j - GRID / 2 + 0.5) * SPACING
        const dist = Math.sqrt(cx * cx + cz * cz)
        const h = 0.4 + rand() * rand() * (4.2 - dist * 0.28)
        buildings.push({ x: cx, z: cz, h: Math.max(0.3, h), delay: dist * 0.06 + rand() * 0.15 })
      }
    }
    const geometry = new THREE.BoxGeometry(0.62, 1, 0.62)
    geometry.translate(0, 0.5, 0)

    const mkLine = (pts: THREE.Vector3[], color: number, opacity: number) =>
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
      )

    const ext = (GRID / 2) * SPACING + 2
    const highways: THREE.Line[] = []
    for (const lane of [-2.5, 0.5, 3.5]) {
      highways.push(mkLine([new THREE.Vector3(-ext, 0.03, lane * SPACING), new THREE.Vector3(ext, 0.03, lane * SPACING)], 0x8b7cf5, 0.65))
      highways.push(mkLine([new THREE.Vector3(lane * SPACING, 0.03, -ext), new THREE.Vector3(lane * SPACING, 0.03, ext)], 0x8b7cf5, 0.4))
    }

    const arc = (a: THREE.Vector3, b: THREE.Vector3) => {
      const mid = a.clone().add(b).multiplyScalar(0.5)
      mid.y = 5.2
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      return mkLine(curve.getPoints(50), 0xf87171, 0.85)
    }
    const arcs = [
      arc(new THREE.Vector3(-3.4, 1.5, -2.2), new THREE.Vector3(2.8, 2.2, 3.1)),
      arc(new THREE.Vector3(3.9, 1.2, -3.5), new THREE.Vector3(-2.1, 1.8, 2.6)),
    ]

    return { buildings, geometry, highways, arcs }
  }, [])

  const colors = useMemo(() => {
    const rand = mulberry32(21)
    return buildings.map(() => {
      const c = new THREE.Color()
      const t = rand()
      if (t < 0.12) c.setHex(0x8b7cf5)
      else if (t < 0.4) c.setHex(0x38445f)
      else c.setHex(0x232b3f)
      return c
    })
  }, [buildings])

  useFrame((state) => {
    const m = mesh.current
    if (!m) return
    const t = Math.min(1, Math.max(0, pr.v))
    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i]
      const local = Math.min(1, Math.max(0, (t * 1.5 - b.delay) / 0.6))
      const eased = 1 - Math.pow(1 - local, 3)
      dummy.position.set(b.x, 0, b.z)
      dummy.scale.set(1, Math.max(0.001, b.h * eased), 1)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      if (m.instanceColor === null || state.clock.elapsedTime < 0.1) m.setColorAt(i, colors[i])
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true

    const cam = state.camera
    cam.position.set(
      Math.sin(state.clock.elapsedTime * 0.05) * 2,
      7.5 - t * 2.4,
      15.5 - t * 5.2,
    )
    cam.lookAt(0, 1.2, 0)

    for (const a of arcs) {
      const mat = a.material as THREE.LineBasicMaterial
      mat.opacity = t > 0.6 ? 0.45 + Math.sin(state.clock.elapsedTime * 2.4) * 0.35 : 0
    }
  })

  return (
    <>
      <fog attach="fog" args={['#06070c', 9, 26]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 12, 4]} intensity={1.1} color="#c7d2fe" />
      <instancedMesh ref={mesh} args={[geometry, undefined, buildings.length]}>
        <meshStandardMaterial roughness={0.8} metalness={0.1} />
      </instancedMesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#07080d" />
      </mesh>
      {highways.map((h, i) => (
        <primitive key={`h${i}`} object={h} />
      ))}
      {arcs.map((a, i) => (
        <primitive key={`a${i}`} object={a} />
      ))}
    </>
  )
}

export default function CityScene({ pr }: { pr: { v: number } }) {
  return (
    <Canvas camera={{ position: [0, 7.5, 15.5], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <City pr={pr} />
    </Canvas>
  )
}
