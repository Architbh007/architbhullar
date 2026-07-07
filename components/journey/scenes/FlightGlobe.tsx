'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const R = 1

function latLng(lat: number, lng: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

function cityCluster(lat: number, lng: number, count: number, spread: number) {
  const pts: number[] = []
  for (let i = 0; i < count; i++) {
    const dLat = (Math.random() - 0.5) * spread
    const dLng = (Math.random() - 0.5) * spread * 1.6
    const v = latLng(lat + dLat, lng + dLng, R * 1.002)
    pts.push(v.x, v.y, v.z)
  }
  return new Float32Array(pts)
}

function GlobeScene({ pr }: { pr: { v: number } }) {
  const group = useRef<THREE.Group>(null)
  const plane = useRef<THREE.Mesh>(null)

  const { curve, bright, dim, origin, dest, clusterA, clusterB } = useMemo(() => {
    const a = latLng(31.63, 74.87, R * 1.01)
    const b = latLng(-37.81, 144.96, R * 1.01)
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.5)
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const points = curve.getPoints(160)

    const dim = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.5 }),
    )
    const brightGeo = new THREE.BufferGeometry().setFromPoints(points)
    brightGeo.setDrawRange(0, 0)
    const bright = new THREE.Line(
      brightGeo,
      new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.95 }),
    )

    const mkCluster = (arr: Float32Array, color: number) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(arr, 3))
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color, size: 0.012, transparent: true, opacity: 0.85, sizeAttenuation: true }),
      )
    }
    return {
      curve,
      bright,
      dim,
      origin: a,
      dest: b,
      clusterA: mkCluster(cityCluster(31.63, 74.87, 90, 14), 0xf59e0b),
      clusterB: mkCluster(cityCluster(-37.81, 144.96, 90, 14), 0x7dd3fc),
    }
  }, [])

  useFrame((state) => {
    const t = Math.min(1, Math.max(0, pr.v))
    if (group.current) {
      group.current.rotation.y = 0.85 - t * 1.55
      group.current.rotation.x = -0.15 + t * 0.35
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
    bright.geometry.setDrawRange(0, Math.max(1, Math.floor(t * 160)))
    if (plane.current) {
      plane.current.position.copy(curve.getPoint(t))
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15
      plane.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color="#070b16" />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.001, 28, 20]} />
        <meshBasicMaterial color="#16233f" wireframe transparent opacity={0.35} />
      </mesh>
      <primitive object={dim} />
      <primitive object={bright} />
      <primitive object={clusterA} />
      <primitive object={clusterB} />
      <mesh position={origin}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <mesh position={dest}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color="#7dd3fc" />
      </mesh>
      <mesh ref={plane}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
    </group>
  )
}

export default function FlightGlobe({ pr }: { pr: { v: number } }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.1], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <GlobeScene pr={pr} />
    </Canvas>
  )
}
