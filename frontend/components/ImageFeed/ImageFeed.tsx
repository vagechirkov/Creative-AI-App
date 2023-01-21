'use client';

import ImageWithInfo, {ImageCardProps} from "../ImageCard/ImageWithInfo";
import {FC, useState} from "react";
import ImageDraggable from "../ImageHover";
import ImageWithReactions from "../ImageWithReaction";

interface ImageFeedProps {
    feedHistory: ImageCardProps[];
    currentImage: ImageCardProps;
}

export type DragState = {
    direction: string;
    magnitude: number;
    backgroundText: string;
}

export const initialDragState: DragState = {direction: '', magnitude: 0, backgroundText: ''};


const ImageFeed: FC<ImageFeedProps> = ({feedHistory, currentImage}) => {
    const [dragState, setDragState] = useState<DragState>(initialDragState);

    return (
        <div className="snap-y snap-mandatory overflow-x-hidden h-screen w-full py-[160px]">

            {feedHistory.map((imageCard, index) => (
                <div key={`card-${index}`} className="snap-center py-4 flex justify-center">
                    <ImageWithInfo {...imageCard} />
                </div>
            ))}

            <div key="card-current" className="snap-center py-4 flex justify-center">
                <ImageDraggable onReactions={(state) => setDragState(state)}>
                    {dragState.magnitude === 0 ? (
                        <ImageWithInfo {...currentImage} />
                    ) : (
                        <ImageWithReactions {...currentImage} />
                    )}
                </ImageDraggable>
            </div>
        </div>
    );
};

export default ImageFeed;