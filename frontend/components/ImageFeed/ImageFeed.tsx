'use client';

import ImageWithInfo, {ImageWithInfoProps} from "../ImageCard/ImageWithInfo";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import ImageDraggable from "../ImageHover";
import ImageWithReactions from "../ImageWithReaction";
import {ImageCard} from "../ImageCard/ImageCard";

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
        <div>
            {/*className="flex h-screen justify-center"*/}
            {/* TODO: add sticky header*/}
            {/* background text on reaction */}
            <span className="absolute top-1/2 inset-x-0" style={{opacity: dragState.magnitude}}>
                <span
                    className="font-six_caps pb-5 text-6xl underline leading-[76px] break-all"
                >
                    {dragState.backgroundText}
                </span>
            </span>
            <div className="snap-y snap-mandatory overflow-x-hidden h-full w-full py-[160px] bg-transparent">
                {/* history */}
                {feedHistory.map((imageCard, index) => (
                    <ImageCard key={`card-${index}`} imageProps={imageCard}/>
                ))}

                {/* current image */}
                <div key={`card-current`} className="snap-center py-4 flex justify-center">
                    <ImageDraggable onReactions={handleDrag}>
                        <div className="cursor-move w-fit">
                        <ImageWithReactions
                            imageProps={currentImage}
                            dragMagnitude={dragState.magnitude}
                        />
                        </div>
                    </ImageDraggable>
                </div>


            </div>
            <div ref={feedEndRef}>

            </div>
            {/* TODO: add input field*/}
        </div>
    );
};

export default ImageFeed;