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
    const [bgColor, setBgColor] = useState('bg-gray-100');

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
        console.log(eventData.dir);
        switch (eventData.dir) {
            case 'Left':
                setBgColor('bg-red-100');
                break;
            case 'Right':
                setBgColor('bg-green-100');
                break;
            case 'Up':
                setBgColor('bg-blue-100');
                break;
            case 'Down':
                setBgColor('bg-yellow-100');
                break;
            default:
                setBgColor('bg-gray-100');
        }
    }

    const handleSwipe = (eventData: SwipeEventData) => {
        onReactions(eventData.dir);
    }


    return (
        <div className={`fixed h-full w-full flex ${bgColor}`}>
            {/* repeat it to fill the screen*/}
            <div className="fixed h-full w-full flex items-center justify-center">
                <div {...handlers} className="z-10 cursor-pointer">
                    <ImageWithActions imageUrl={imageUrl} altText={altText}/>
                </div>
            </div>
        </div>

    );
};

export default ImageHover;