'use client';

import {ImageWithInfoProps} from "../ImageCard/ImageWithInfo";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import ImageDraggable from "../ImageDraggable";
import ImageWithReactions from "../ImageCard/ImageWithReactions";

interface ImageFeedProps {
    feedHistory: ImageWithInfoProps[];
    currentImage: ImageWithInfoProps;
}

export type DragState = {
    direction: string;
    magnitude: number;
    backgroundText: string;
    isDragging: boolean;
}

export const initialDragState: DragState = {direction: '', magnitude: 0, backgroundText: '', isDragging: false};

export const background = {
    "Up": "i like it\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Left": "it inspires me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Right": "it surprises me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
    "Down": "it terrifies me\u00A0\u00A0\u00A0\u00A0\u00A0".repeat(300),
}


const ImageFeed: FC<ImageFeedProps> = ({feedHistory, currentImage}) => {
    const [dragState, setDragState] = useState<DragState>(initialDragState);
    const feedEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToCurrentImage = useCallback(
        () => {
            if (feedEndRef.current) {
                feedEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: 'center',
                });
            }
        }, [])

    useEffect(() => {
        scrollToCurrentImage();
    }, [currentImage]);

    const handleDrag = (state: DragState) => {
        // scrollToCurrentImage();
        setDragState(state);
    }

    return (
        <div
            className="min-h-screen w-full flex justify-center justify-items-center items-end"
            style={{overflow: dragState.isDragging  ? 'hidden' : 'auto'}}
        >
            <div className="absolute -bottom-52 inset-x-0 " style={{opacity: dragState.magnitude}}>
                <div className="font-six_caps text-justify text-6xl underline leading-[76px] break-all ">
                    {dragState.backgroundText}
                </div>
            </div>

            <div
                className="snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-transparent flex flex-col w-full">
                {/* history */}
                {!dragState.isDragging && feedHistory.map((imageCard, index) => (
                    <div key={`card-${index}`} className="snap-center py-4 flex justify-center">
                        <ImageWithReactions imageProps={imageCard}/>
                    </div>
                ))}

                {/* current image */}
                <div key={`card-current`} className="snap-center pt-4 pb-[160px] flex justify-center">
                    <ImageDraggable onReactions={handleDrag}>
                        <div className="cursor-move w-fit">
                            <ImageWithReactions imageProps={currentImage} dragMagnitude={dragState.magnitude}/>
                        </div>
                    </ImageDraggable>
                </div>
            </div>
            <div ref={feedEndRef}>
            </div>
        </div>
    );
};

export default ImageFeed;