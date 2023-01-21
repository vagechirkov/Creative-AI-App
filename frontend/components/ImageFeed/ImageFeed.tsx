'use client';

import ImageWithInfo, {ImageCardProps} from "../ImageCard/ImageWithInfo";
import {FC, useCallback, useEffect, useRef, useState} from "react";
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

export const background = {
    "Up": "i like it\t\t\t".repeat(300),
    "Left": "it inspires me\t\t\t".repeat(300),
    "Right": "it surprises me\t\t\t".repeat(300),
    "Down": "it terrifies me\t\t\t".repeat(300),
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


    return (
        <div>
            {/* TODO: add sticky header*/}
            {/* background text on reaction */}
            <span
                className="font-six_caps pb-5 text-6xl underline leading-[76px] break-words tracking-wide overflow-hidden"
                style={{opacity: dragState.magnitude}}
            >
                {dragState.backgroundText}
            </span>
            <div
                className="snap-y snap-mandatory overflow-x-hidden h-full w-full pb-[160px] flex flex-col justify-start">
                {/* history */}
                {dragState.magnitude === 0 && feedHistory.map((imageCard, index) => (
                    <div key={`card-${index}`} className="snap-center py-4 flex justify-center">
                        <ImageWithInfo {...imageCard} />
                    </div>
                ))}

                {/* current image */}

                <ImageDraggable onReactions={(state) => setDragState(state)}>
                    {dragState.magnitude === 0 ? (
                        <div className="cursor-move snap-center py-4 flex justify-center">
                            <ImageWithInfo {...currentImage} />
                        </div>
                    ) : (
                        <div className="absolute top-1/2 inset-x-0 cursor-move w-fit">
                            <ImageWithReactions {...currentImage} />
                        </div>
                    )}
                </ImageDraggable>

            </div>
            <div ref={feedEndRef}>

            </div>
            {/* TODO: add input field*/}
        </div>
    );
};

export default ImageFeed;