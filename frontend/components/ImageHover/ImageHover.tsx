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
            onSwipeStart: (eventData) => handleSwipeStart(eventData),
            ...swipeConfig
        },
    );

    const handleSwipeStart = (eventData: SwipeEventData) => {
        // setShowActions(true);
        // console.log("Swipe start");
    }

    const handleSwipe = (eventData: SwipeEventData) => {
        onReactions(eventData.dir);
    }


    return (
        <div {...handlers} className="cursor-pointer w-fit">
            <ImageWithActions imageUrl={imageUrl} altText={altText}/>
        </div>

    );
};

export default ImageHover;