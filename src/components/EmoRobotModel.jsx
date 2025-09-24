
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import PropTypes from 'prop-types'

export const Model = React.forwardRef(function Model({ targetSize = 3, rotationY = Math.PI, onReady, ...props }, ref) {
  const { scene } = useGLTF('/assets/emo_robot-transformed.glb')
  const groupRef = useRef()
  const [ready, setReady] = useState(false)
  const [computed, setComputed] = useState({ center: [0, 0, 0], scale: 1 })

  useEffect(() => {
    if (!scene) return

    // Apply a rotation so the model faces the camera (rotate around Y)
    // Do this before computing the bounding box so centering accounts for the rotation
    scene.rotation.y = rotationY

    // Compute bounding box of the whole scene
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())

    // The largest dimension to fit into targetSize
    const maxDim = Math.max(size.x, size.y, size.z)
    // Compute base scale then apply a small reduction multiplier so model is a bit smaller
    const baseScale = maxDim > 0 ? targetSize / maxDim : 1
    const scale = baseScale * 0.8 // reduce size by 20%

    // Recenter the scene around origin by shifting it by -center
    scene.position.x -= center.x
    scene.position.y -= center.y
    scene.position.z -= center.z

    setComputed({ center: [center.x, center.y, center.z], scale })
    setReady(true)
    if (typeof onReady === 'function') onReady()
  }, [scene, targetSize, rotationY])

  // While computing, render nothing (or a small loader later)
  if (!ready) return null

  // Apply a small downward translation so the model sits a bit lower on the screen
  const yOffset = -0.3

  // Attach forwarded ref to the group so parent components (e.g. GSAP) can animate it
  const assignRef = (el) => {
    groupRef.current = el
    if (!ref) return
    if (typeof ref === 'function') ref(el)
    else ref.current = el
  }

  return (
    <group ref={assignRef} {...props}>
      <primitive object={scene} scale={computed.scale} position={[0, yOffset, 0]} />
    </group>
  )
});

Model.propTypes = {
  rotationY: PropTypes.number,
};

useGLTF.preload('/assets/emo_robot-transformed.glb');
