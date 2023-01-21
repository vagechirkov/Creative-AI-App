'use client';

import {FC, useState} from "react";
import {ImageWithActions} from "./ImageWithActions";
import {SwipeEventData, useSwipeable} from "react-swipeable";
import {background} from "./background";

type backgroundState = {
    backgroundText: string;
    opacity: number;
}

interface ImageHoverProps {
    imageUrl: string;
    onReactions: (direction: string) => void;
    altText?: string;
    initialBackground?: backgroundState;
}

const swipeConfig = {
    trackMouse: true,
    preventScrollOnSwipe: true,
}

const ImageHover: FC<ImageHoverProps> = (props) => {
    const {imageUrl, altText, onReactions, initialBackground = {backgroundText: '', opacity: 0}} = props;
    const [bgState, setBgState] = useState<backgroundState>(initialBackground);

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
                setBgState({backgroundText: background.Left, opacity: 1});
                break;
            case 'Right':
                setBgState({backgroundText: background.Right, opacity: 1});
                break;
            case 'Up':
                setBgState({backgroundText: background.Up, opacity: 1});
                break;
            case 'Down':
                setBgState({backgroundText: background.Down, opacity: 1});
                break;
            default:
                setBgState(initialBackground);
        }
    }

    const handleSwipe = (eventData: SwipeEventData) => {
        onReactions(eventData.dir);
    }


    return (

        <div className={`fixed h-full w-full flex`}>

            {/* repeat it to fill the screen*/}
            <span className="font-six-caps text-4xl uppercase leading-[76px]">
                {bgState.backgroundText}
            </span>

            {/* image with actions */}
            <div className="fixed h-full w-full flex items-center justify-center">
                <div {...handlers} className="z-10 cursor-pointer">
                    <ImageWithActions imageUrl={imageUrl} altText={altText}/>
                </div>
            </div>
        </div>

    );
};

export default ImageHover;