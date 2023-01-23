'use client';

import {FC, useCallback, useEffect, useRef} from "react";
import ImageDraggable from "../ImageDraggable";
import ImageWithReactions from "../ImageCard/ImageWithReactions";
import useFeedContext from "../FeedContext";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";

interface ImageFeedProps {
    isCurrentImageUpdated?: boolean;
}

const ImageFeed: FC<ImageFeedProps> = ({isCurrentImageUpdated=false}) => {
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
        feedDispatch({
            type: FEED_ACTIONS.SET_DRAG_STATE,
            payload: {direction: direction, magnitude: magnitude, isDragging: isDragging,}
        });
    }

    return (
        <div className="min-h-screen min-w-screen flex justify-center">
            <div
                className="snap-y snap-mandatory overflow-auto flex flex-col h-screen w-screen pt-20">
                {/* history (NOTE: the last one is the duplicate of the current image)*/}
                {feedState?.feedHistory && !feedState.dragState.isDragging &&
                    feedState.feedHistory.map((imageCard, index) => (
                    <div key={`card-${index}`} className="snap-center flex justify-center bg-transparent">
                        <ImageWithReactions imageProps={{
                            imageUrl: imageCard.url,
                            altText: imageCard.alt_text,
                            reactions: imageCard.reactions,
                            activeUsers: imageCard.active_users,
                        }}
                        />
                    </div>
                ))}

                {/* current image */}
                <div key={`card-current`} className="snap-center pb-[160px] flex justify-center mt-auto">
                    <span
                        className={`${isCurrentImageUpdated ? 
                            "transform translate-y-full opacity-0" : 
                            "transition-all duration-200 opacity-100 transform translate-y-0"}`}>
                    {feedState?.currentImage &&
                        <ImageDraggable onReactions={handleDrag} dragState={feedState.dragState}>
                            <div className="cursor-move w-fit">
                                <ImageWithReactions
                                    imageProps={{
                                        imageUrl: feedState.currentImage.url,
                                        altText: feedState.currentImage.alt_text,
                                        reactions: feedState.currentImage.reactions}}

                                    dragMagnitude={feedState.dragState.magnitude}
                                />
                            </div>
                        </ImageDraggable>
                    }
                    </span>

                </div>
            </div>
            <div ref={feedEndRef}>
            </div>
        </div>
    );
};

export default ImageFeed;