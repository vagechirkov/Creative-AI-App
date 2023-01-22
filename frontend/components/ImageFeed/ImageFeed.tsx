'use client';

import {FC, useCallback, useEffect, useRef, useState} from "react";
import ImageDraggable from "../ImageDraggable";
import ImageWithReactions from "../ImageCard/ImageWithReactions";
import useFeedContext from "../FeedContext";


const ImageFeed: FC = () => {
    const {feedState, feedDispatch} = useFeedContext();
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
    }, [feedState?.currentImage]);

    const handleDrag = (direction: string, magnitude: number, isDragging: boolean) => {
        // scrollToCurrentImage();
        // setDragState(state);
        feedDispatch({
            type: 'SET_DRAG_STATE',
            payload: {direction: direction, magnitude: magnitude, isDragging: isDragging,}
        });
    }

    return (
        <div
            className="min-h-screen min-w-screen flex justify-center justify-items-center items-end"
            style={{overflow: feedState?.dragState && feedState.dragState.isDragging ? 'hidden' : 'auto',}}
        >
            <div className="absolute -bottom-52 inset-x-0 " style={{opacity: feedState?.dragState &&  feedState.dragState.magnitude}}>
                <div className="font-six_caps text-justify text-6xl underline leading-[76px] break-all ">
                    {feedState?.dragState && feedState.dragState.backgroundText}
                </div>
            </div>

            <div
                className="snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-transparent flex flex-col w-full">
                {/* history */}
                {feedState?.feedHistory && !feedState.dragState.isDragging &&
                    feedState.feedHistory.map((imageCard, index) => (
                    <div key={`card-${index}`} className="snap-center flex justify-center bg-gray-200">
                        <ImageWithReactions imageProps={imageCard}/>
                    </div>
                ))}

                {/* current image */}
                <div key={`card-current`} className="snap-center pb-[160px] flex justify-center bg-green-200">
                    {feedState?.currentImage &&
                        <ImageDraggable onReactions={handleDrag} dragState={feedState.dragState}>
                            <div className="cursor-move w-fit">
                                <ImageWithReactions imageProps={feedState.currentImage}
                                                    dragMagnitude={feedState.dragState.magnitude}/>
                            </div>
                        </ImageDraggable>
                    }

                </div>
            </div>
            <div ref={feedEndRef}>
            </div>
        </div>
    );
};

export default ImageFeed;