'use client'
import ImageCard from "../ImageCard";
import {FC, useEffect, useState} from "react";


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
    // Declare a state variable to store the WebSocket connection
    const [ws, setWs] = useState<WebSocket | null>(null);

    const [feedImage, setFeedImage] = useState<FeedImageType | null>(null);


    useEffect(() => {
        // Connect to the WebSocket server
        const socket = new WebSocket(wsUrl);

        // Set the state variable when the connection is opened
        socket.onopen = () => setWs(socket);

        // Set the state variable to null when the connection is closed
        socket.onclose = () => setWs(null);

        // Update the emoji count and image URL state variables when a message is received
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setFeedImage(data);
        };

        // Disconnect from the WebSocket server when the component unmounts
        return () => socket.close();
    }, [wsUrl]);

    return (
        <ImageCard imageUrl={feedImage?.url} reactions={feedImage?.reactions}/>
    )
}

export default FeedImage;
