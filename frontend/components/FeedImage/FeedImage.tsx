'use client';

import ImageCard from "../ImageCard";
import {FC, useEffect, useState} from "react";
import useWebSocket, {ReadyState} from 'react-use-websocket';


interface FeedImageProps {
    wsUrl: string;
}

export type FeedImageType = {
    id: number;
    url: string;
    // list of emojis and their counts
    reactions: { emoji: string, count: number }[];
}


const FeedImage: FC<FeedImageProps> = ({wsUrl}) => {
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(wsUrl);

    const [feedImage, setFeedImage] = useState<FeedImageType | null>(null);


    useEffect(() => {
        if (readyState === ReadyState.OPEN && lastJsonMessage) {
            setFeedImage(lastJsonMessage as FeedImageType);
        }
    }, [lastJsonMessage]);

    return (
        <>
            {feedImage && <ImageCard imageUrl={feedImage.url} reactions={feedImage.reactions}/>}
        </>
    )
}

export default FeedImage;
