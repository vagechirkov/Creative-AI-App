'use client';

import {FC, useState, ReactNode} from "react";
import Draggable from 'react-draggable';
import {background} from "./background";
import {DragState, initialDragState} from "../ImageFeed/ImageFeed";

interface ImageDraggableProps {
    onReactions: (state: DragState) => void;
    children: ReactNode;
}


const ImageDraggable: FC<ImageDraggableProps> = ({onReactions, children}) => {

    const handleDrag = (event: any, data: any) => {
        const direction = handleResponseDirection({x: data.x, y: data.y});
        const magnitude = handleResponseMagnitude({x: data.x, y: data.y, maxMagnitude: 200});

        switch (direction) {
            case 'Left':
                onReactions({backgroundText: background.Left, magnitude: magnitude, direction: direction});
                break;
            case 'Right':
                onReactions({backgroundText: background.Right, magnitude: magnitude, direction: direction});
                break;
            case 'Up':
                onReactions({backgroundText: background.Up, magnitude: magnitude, direction: direction});
                break;
            case 'Down':
                onReactions({backgroundText: background.Down, magnitude: magnitude, direction: direction});
                break;
            default:
                onReactions(initialDragState);
        }
    }

    return (

        // <div className={`fixed h-full w-full flex`}>
        //
        //     {/* repeat it to fill the screen*/}
        //     <span
        //         className="font-six_caps pb-5 text-6xl underline leading-[76px] break-words tracking-wide"
        //         style={{opacity: bgState.opacity}}
        //     >
        //         {bgState.backgroundText}
        //     </span>
        //
        //     {/* image with actions */}
        //     <div className="fixed h-full w-full flex items-center justify-center">
        <Draggable
            position={{x: 0, y: 0}}
            allowAnyClick={true}
            onStop={() => onReactions(initialDragState)}
            onDrag={handleDrag}
        >
            <div className="cursor-move">
                {/*<ImageWithActions*/}
                {/*    imageUrl={imageUrl}*/}
                {/*    altText={altText}*/}
                {/*    actionsOpacity={bgState.opacity > 0.2 ? 0 : 1}*/}
                {/*/>*/}
                {children}
            </div>
        </Draggable>
        //     </div>
        // </div>

    );
};


const handleResponseDirection = ({x, y}: { x: number, y: number }) => {
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

const handleResponseMagnitude = ({x, y, maxMagnitude = 200}: { x: number, y: number, maxMagnitude: number }) => {
    let magnitude = Math.sqrt(x * x + y * y);

    // normalize magnitude to [0, 1]
    if (magnitude > maxMagnitude) magnitude = 1;
    else magnitude /= maxMagnitude;

    return magnitude;
}

export default ImageDraggable;