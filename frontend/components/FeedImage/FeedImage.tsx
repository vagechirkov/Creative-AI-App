'use client';

import ImageCard from "../ImageCard";
import {FC, useCallback, useEffect, useState} from "react";
import useWebSocket, {ReadyState} from 'react-use-websocket';


interface FeedImageProps {
    wsUrl: string;
}

export type FeedImageType = {
    id: number;
    url: string;
    // list of emojis and their counts
    reactions: { emoji: string, count: number }[];
    users_count: number;
}


const FeedImage: FC<FeedImageProps> = ({wsUrl}) => {
    const [feedImage, setFeedImage] = useState<FeedImageType | null>(null);
    const [feedHistory, setFeedHistory] = useState<FeedImageType[]>([]);

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(wsUrl);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && lastJsonMessage) {
            setFeedImage(lastJsonMessage as FeedImageType);
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (feedImage) {
            // remove the oldest image if the history is longer than 10
            if (feedHistory.length > 10) {
                feedHistory.shift();
            }
            setFeedHistory([...feedHistory, feedImage]);
            console.log(feedHistory);
        }
    }, [feedImage]);

    const updateReactions = useCallback(
        (emoji: string) => {
            const reactions = feedImage?.reactions;
            if (reactions) {

                const reaction = reactions.find((value) => value.emoji === emoji);
                if (reaction) {
                    reaction.count++;
                    sendJsonMessage(reaction);
                }
            }
        }
        , [feedImage])


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="container max-w-sm h-full bg-gray-50">
                <div className="flex items-center justify-center h-screen">
                    {feedImage &&
                        <>
                            {/* add the number of watchers */}
                            <div className="absolute top-0 right-0 m-4 text-gray-500">
                                {feedImage.users_count}
                            </div>
                            <ImageCard
                                imageUrl={feedImage.url}
                                reactions={feedImage.reactions}
                                onReaction={updateReactions}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default FeedImage;
