'use client';

import {FC, useState} from "react";
import {ImageWithActions} from "./ImageWithActions";
import {SwipeEventData, useSwipeable} from "react-swipeable";

interface ImageHoverProps {
    imageUrl: string;
    onReactions: (direction: string) => void;
    altText?: string;
}


const swipeConfig = {
    trackMouse: true,
    preventScrollOnSwipe: true,
}

const ImageHover: FC<ImageHoverProps> = (props) => {
    const {imageUrl, altText, onReactions} = props;

    const handlers = useSwipeable({
            onSwiped: (eventData) => handleSwipe(eventData),
            onSwiping: (eventData) => changeBackground(eventData),
            onSwipeStart: (eventData) => handleSwipeStart(eventData),
            ...swipeConfig
        },
    );

    const handleSwipeStart = (eventData: SwipeEventData) => {
        // setShowActions(true);
        // console.log("Swipe start");
    }

    const changeBackground = (eventData: SwipeEventData) => {

    }

    const handleSwipe = (eventData: SwipeEventData) => {
        onReactions(eventData.dir);
    }


    return (
        <div className="fixed h-full w-full flex items-center justify-center  bg-white">
            <div {...handlers} className="z-10 cursor-pointer">
                <ImageWithActions imageUrl={imageUrl} altText={altText}/>
            </div>
        </div>

    );
};

export default ImageHover;