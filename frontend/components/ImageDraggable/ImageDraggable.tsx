'use client';

import {FC, ReactNode, useEffect, useRef, useState} from "react";
import Draggable from 'react-draggable';

export type DragState = {
    direction: string;
    magnitude: number;
    backgroundText: string;
    isDragging: boolean;
}

interface ImageDraggableProps {
    onReactions: (direction: string, magnitude: number, isDragging: boolean) => void;
    children: ReactNode;
    onDisable: () => void;
    isLiveFeedState?: boolean;
}

const DRAG_THRESHOLD: number = 2;
const COUNTER_THRESHOLD: number = 50;// 100 * 10ms = 1000ms

const ImageDraggable: FC<ImageDraggableProps> = (props) => {
    const {onReactions, children, onDisable, isLiveFeedState = false} = props;
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const nodeRef = useRef<null | HTMLDivElement>(null);
    const intervalIsDisablesRef = useRef<any>(null);
    const intervalCounterRef = useRef<any>(null);


    // enable the drag after 1000 ms
    useEffect(() => {
        if (isDisabled) {
            console.log("resetting isDisabled");
            stopCounter();
            onDisable();
            if (intervalIsDisablesRef.current) {
                clearInterval(intervalIsDisablesRef.current);
                intervalIsDisablesRef.current = null;
            }
            intervalIsDisablesRef.current = setInterval(() => {
                setIsDisabled(false);
            }, 500);
        }
    }, [isDisabled]);


    const handleDragStart = () => {
        startCounter();
        console.log("drag start");
    }

    const handleDrag = (event: any, data: any) => {
        const direction = responseDirection({x: data.x, y: data.y}) as string;
        const magnitude = responseMagnitude({x: data.x, y: data.y, maxMagnitude: 200});
        const dist = responseDist({dx: data.deltaX, dy: data.deltaY});

        if (dist > DRAG_THRESHOLD && counter < COUNTER_THRESHOLD) {
            setIsDisabled(true);
            return;
        }

        if (counter > COUNTER_THRESHOLD) {
            onReactions(direction, magnitude, true);
        }
    }

    const handleDragStop = (event: any, data: any) => {
        console.log("drag stop");
        const direction = responseDirection({x: data.x, y: data.y}) as string;
        const magnitude = responseMagnitude({x: data.x, y: data.y, maxMagnitude: 200});
        stopCounter();
        onReactions(direction, magnitude, false);
    }

    const startCounter = () => {
        console.log("start counter");
        if (intervalCounterRef.current) return;
        intervalCounterRef.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 10);
    };

    const stopCounter = () => {
        if (intervalCounterRef.current) {
            clearInterval(intervalCounterRef.current);
            intervalCounterRef.current = null;
        }
        setCounter(0);
    };

    return (
        <>
            {isDisabled ?
                (
                    <div>
                        {children}
                        <div>{counter}</div>
                    </div>
                ) : (
                    <Draggable
                        position={{x: 0, y: 0}}
                        allowAnyClick={true}
                        onStart={handleDragStart}
                        onDrag={handleDrag}
                        onStop={handleDragStop}
                        nodeRef={nodeRef}
                        disabled={!isLiveFeedState}
                    >
                        <div
                            ref={nodeRef}
                            className={counter < COUNTER_THRESHOLD ?
                                "cursor-default" : "cursor-move drop-shadow-2xl"}
                        >
                            {children}
                            <div>{counter}</div>
                        </div>
                    </Draggable>
                )
            }
        </>
    );
};


const responseDirection = ({x, y}: { x: number, y: number }) => {
    // range (-PI, PI]
    let theta = Math.atan2(x, y);

    // rads to degrees, range (-180, 180]
    theta *= 180 / Math.PI;

    // range [0, 360); NOTE: 0 is at the bottom
    if (theta < 0) theta = 360 + theta;

    // estimate direction
    if (theta >= 45 && theta < 135) return 'Right';
    if (theta >= 135 && theta < 225) return 'Up';
    if (theta >= 225 && theta < 315) return 'Left';
    if (theta >= 315 || theta < 45) return 'Down';
}

const responseMagnitude = ({x, y, maxMagnitude = 200}: { x: number, y: number, maxMagnitude: number }) => {
    let magnitude = Math.sqrt(x * x + y * y);

    // normalize magnitude to [0, 1]
    if (magnitude > maxMagnitude) magnitude = 1;
    else magnitude /= maxMagnitude;

    return magnitude;
}

const responseDist = ({dx, dy}: { dx: number, dy: number }) => {
    let dist = Math.sqrt(dx * dx + dy * dy);
    console.log(dist);
    return dist;
}

export default ImageDraggable;