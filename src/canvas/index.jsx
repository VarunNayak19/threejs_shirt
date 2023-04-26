import React, { useEffect, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from './Shirt';
import BackDrop from './BackDrop';
import CameraRig from './CameraRig';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
import { AnimatePresence, motion } from 'framer-motion';
import { slideAnimation } from '../config/motion';
import styled from 'styled-components';
import Slider, { SliderThumb } from "@mui/material/Slider";
import { getContrastingColor } from '../config/helpers';
const CanvasModel = () => {
    const snap = useSnapshot(state);
    //slider

    const [shirtSize, setShirtSize] = useState(25);
    const [alert, setAlert] = useState(false)

    const changeShirtSizeFn = (e) => {
        setShirtSize(e.target.value);
        localStorage.setItem("shirtSizeLS", 120 - e.target.value)
        setTimeout(alertFn, 2000)
    }

    const alertFn = () => {
        setAlert(true);

    }

    const shirtSizeLS = localStorage.getItem("shirtSizeLS")


    useEffect(() => {
        setShirtSize(100 - localStorage.getItem("shirtSizeLS"))
    }, [])
    console.log("shirtSize", snap.color)

    const PrettoSlider = styled(Slider)({
        color: "#ffffff",
        height: 12,
        "& .MuiSlider-track": {
            color: snap.color,
            borderRadius: "4px",
            border: `1px solid ${getContrastingColor(snap.color)}}`,
        },
        "& .MuiSlider-thumb": {
            height: 24,
            width: 24,
            backgroundColor: snap.color,
            border: `2px solid ${getContrastingColor(snap.color)}}`,
            "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                boxShadow: "inherit"
            },
            "&:before": {
                display: "none"
            }
        },
        "& .MuiSlider-valueLabel": {
            lineHeight: 1.2,
            fontSize: 12,
            background: "unset",
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: "50% 50% 50% 0",
            backgroundColor: snap.color,
            color: getContrastingColor(snap.color),
            transformOrigin: "bottom left",
            transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
            "&:before": { display: "none" },
            "&.MuiSlider-valueLabelOpen": {
                transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
            },
            "& > *": {
                transform: "rotate(45deg)"
            }
        }
    });

    return (
        <>
            <Canvas
                shadows
                camera={{ position: [0, 0, 0], fov: shirtSizeLS }}
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
            <AnimatePresence>
                <motion.div {...slideAnimation("up")}>
                    <div className='z-20 w-60 h-auto p-3 glassmorphism absolute bottom-2 right-2 rounded-sm flex justify-center items-center'>

                        {/* 
                        <input type="range" name="size" id="size" value={shirtSize} min={1} max={100} step={1} className='slider'
                            onChange={(e) => changeShirtSizeFn(e)}
                        /> */}
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={shirtSize + 20}
                            onChange={(e) => changeShirtSizeFn(e)}
                            min={1} max={100} step={1}
                        />

                        {/* <StyledSlider type="range" name="size" id="size" value={shirtSize} min={1} max={100} step={1} onChange={(e) => changeShirtSizeFn(e)} /> */}
                    </div>
                </motion.div>
                {
                    alert &&
                    <motion.div key="custom"
                        className="absolute top-5 m-auto items-center justify-center z-10  w-full flex h-auto"
                        {...slideAnimation('down')}>
                        <div className=' w-1/4 h-full glassmorphism flex justify-start gap-4 items-center p-3' style={{ minWidth: "24rem" }}>
                            <span className="material-symbols-outlined rotation-css" onClick={() => { window.location.reload() }}>
                                autorenew
                            </span>
                            <span className=' text-center'>Please press the refresh button to see the changes...</span>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default CanvasModel;