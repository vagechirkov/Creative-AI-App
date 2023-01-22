'use client';

import {FC, ReactNode} from "react";
import Draggable from 'react-draggable';
import {background, DragState, initialDragState} from "../ImageFeed/ImageFeed";

interface ImageDraggableProps {
    onReactions: (state: DragState) => void;
    children: ReactNode;
}


const ImageDraggable: FC<ImageDraggableProps> = ({onReactions, children}) => {

    const handleDrag = (event: any, data: any) => {
        const direction = handleResponseDirection({x: data.x, y: data.y}) as keyof typeof background;
        const magnitude = handleResponseMagnitude({x: data.x, y: data.y, maxMagnitude: 200});
        let backgroundText = background[direction];

        onReactions({
                backgroundText: backgroundText,
                magnitude: magnitude,
                direction: direction,
                isDragging: true
            }
        );
    }

    return (
        <Draggable
            position={{x: 0, y: 0}}
            allowAnyClick={true}
            onStop={() => onReactions(initialDragState)}
            onDrag={handleDrag}
        >
            <span>
                {children}
            </span>
        </Draggable>
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