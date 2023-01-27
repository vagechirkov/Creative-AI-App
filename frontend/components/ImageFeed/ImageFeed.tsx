'use client';

import {FC, useCallback, useEffect, useRef} from "react";
import ImageDraggable from "../ImageDraggable";
import ImageWithReactions from "../ImageCard/ImageWithReactions";
import useFeedContext from "../FeedContext";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";
import {FeedImageType} from "../FeedContext/FeedContext";

interface ImageFeedProps {
    isCurrentImageUpdated?: boolean;
}

const ImageFeed: FC<ImageFeedProps> = ({isCurrentImageUpdated = false}) => {
    const {feedState, feedDispatch} = useFeedContext();
    const feedEndRef = useRef<null | HTMLDivElement>(null);

    // const scrollToCurrentImage = useCallback(
    //     () => {
    //         if (feedEndRef.current) feedEndRef.current.scrollIntoView({behavior: "smooth", block: 'center',});
    //     }, [])
    // useEffect(() => {
    //     scrollToCurrentImage();
    // }, [feedState?.currentImage?.id]);

    const handleDrag = (direction: string, magnitude: number, isDragging: boolean) => {
        feedDispatch({
            type: FEED_ACTIONS.SET_DRAG_STATE,
            payload: {direction: direction, magnitude: magnitude, isDragging: isDragging,}
        });
    }

    const handleDragDisabled = () => {
        feedDispatch({
            type: FEED_ACTIONS.SET_FEED_TYPE,
            payload: {feedType: "scrolling",}
        });
    }

    return (
        <div className="min-h-screen min-w-screen flex justify-center">
            <div className={feedState?.feedType === "scrolling" ? "feed-container-history" : "feed-container-live"}>
                {/* NOTE: the order is reversed */}
                <div ref={feedEndRef}/>
                {/* current image */}
                <div key={`card-current`} className="snap-center flex justify-center mt-auto">
                    <span
                        className={`transition-all duration-200 ${isCurrentImageUpdated ? "opacity-0" : "opacity-100"}`}
                    >
                    {feedState?.currentImage &&
                        <ImageDraggable
                            onReactions={handleDrag}
                            onDisable={handleDragDisabled}
                            isLiveFeedState={feedState.feedType === "live"}
                        >
                            <div className="w-fit">
                                <ImageWithReactions
                                    imageUrl={isCurrentImageUpdated ? '/images/black_square.png' : feedState.currentImage.url}
                                    altText={feedState.currentImage.alt_text}
                                    reactions={feedState.currentImage.reactions}
                                    activeUsers={feedState.currentImage.active_users}
                                    artist={feedState.currentImage.artist}
                                    showTutorial={feedState.tutorial}
                                    dragMagnitude={feedState.dragState.magnitude}
                                    dragMagnitudeActionLabelsThreshold={0.5}
                                />
                            </div>
                        </ImageDraggable>
                    }
                    </span>

                </div>

                {/* history (NOTE: the last one is the duplicate of the current image)*/}
                {feedState?.feedHistory && !feedState.dragState.isDragging &&
                    (
                        // NOTE: the order is reversed; we want to make a shallow copy of the array to avoid mutating
                        // the original array
                        [...feedState.feedHistory].reverse().map((imageCard, index) => (
                                <div key={`card-${index}`} className="snap-center flex justify-center bg-transparent">
                                    <HistoryItem imageCard={imageCard} index={index}/>
                                </div>
                            )
                        )
                    )
                }

            </div>

        </div>
    );
};


const HistoryItem = ({imageCard, index}: { imageCard: FeedImageType | string, index: number }) => {
    // if the imageCard is a string, it means it's a prompt
    if (typeof imageCard === 'string') {
        return (
            <div className="relative max-w-xs max-h-xs min-w-max min-h-max bg-black my-2">
                <div className="text-center text-xs w-[300px] text-white py-2">
                    <span className="font-bold font-inter pr-1">
                        Prompt:
                    </span>
                    <span className="font-inter font-light">
                    {imageCard}
                    </span>
                </div>
            </div>
        )
    } else {
        return (
            <ImageWithReactions imageUrl={imageCard.url} altText={imageCard.alt_text} reactions={imageCard.reactions}
                                activeUsers={imageCard.active_users} artist={imageCard.artist}
            />

        );
    }
}

export default ImageFeed;