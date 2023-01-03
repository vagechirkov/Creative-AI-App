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
    active_users: number;
}


const FeedImage: FC<FeedImageProps> = ({wsUrl}) => {
    const [feedImage, setFeedImage] = useState<FeedImageType | null>(null);
    const [feedHistory, setFeedHistory] = useState<FeedImageType[]>([]);

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(wsUrl);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && lastJsonMessage) {
            const data = lastJsonMessage as FeedImageType;
            setFeedImage(data);
            // find the image in the history and update it

            const index = feedHistory.findIndex((image) => image.id === data.id);
            if (index !== -1) {
                feedHistory[index] = data;
            } else {
                feedHistory.push(data);
            }
        }
    }, [lastJsonMessage]);

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
                <div className="grid grid-flow-row items-center justify-center h-screen gap-5">
                    {/* show all without the current image */}
                    {feedHistory.slice(0, -1).map((value, index) => (
                        <ImageCard
                            imageUrl={value.url}
                            reactions={value.reactions}
                            onReaction={(emoji) => null}
                            key={`${index}-${value.url}`}
                        />))
                    }
                    {feedImage &&

                        <ImageCard
                            imageUrl={feedImage.url}
                            reactions={feedImage.reactions}
                            onReaction={updateReactions}
                        />

                    }

                </div>
            </div>
        </div>
    )
}

export default FeedImage;
