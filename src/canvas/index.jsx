import React, { useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from './Shirt';
import BackDrop from './BackDrop';
import CameraRig from './CameraRig';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
const CanvasModel = () => {
    const snap = useSnapshot(state);
    const [shirtSize, setShirtSize] = useState(40);
    console.log("shirtSize", shirtSize)
    return (
        <>

            <Canvas
                shadows
                camera={{ position: [0, 0, 0], fov: shirtSize }}
                gl={{ preserveDrawingBuffer: true }}
                className='w-full max-w-full h-full transition-all ease-in'
            >
                <ambientLight intensity={0.5} />
                <Environment preset="city" />
                <CameraRig>
                    <BackDrop />
                    <Center>
                        <Shirt />
                    </Center>
                </CameraRig>
            </Canvas>
        </>
    )
}

export default CanvasModel;