'use client';

import useFeedContext from "../FeedContext";
import ImageFeed from "../ImageFeed";
import {FC, useEffect, useState} from "react";
import FeedHeader from "./FeedHeader";
import BackgroundText from "./BackgroundText";
import FeedFooter from "./FeedFooter";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";


interface FeedPageProps {
    feedId: number;
    wsUrl: string;
}

const FeedPage: FC<FeedPageProps> = ({wsUrl, feedId = 0}) => {
    const [newImageArrived, setNewImageArrived] = useState<boolean>(false);
    const {feedState, feedDispatch} = useFeedContext();

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`${wsUrl}/${feedId}`);

    useEffect(() => {
        // console.log("FeedPage: useEffect: lastJsonMessage", lastJsonMessage);
        if (readyState === ReadyState.OPEN && lastJsonMessage) {
            if (!feedState?.dragState.isDragging)
            {
                feedDispatch({
                    type: FEED_ACTIONS.SET_CURRENT_IMAGE,
                    payload: {currentImage: lastJsonMessage}
                });
                setNewImageArrived(true);
                setTimeout(() => {
                    setNewImageArrived(false);
                }, 300);
            } else {
                // Update history
            }
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && feedState?.userReaction) {
            sendJsonMessage({emoji: feedState.userReaction, count: 1});
        }

    }, [feedState?.userReaction]);


    return (
        <>
            {readyState === ReadyState.OPEN && feedState?.currentImage &&
                <>
                    <FeedHeader/>
                    <BackgroundText/>
                    <ImageFeed isCurrentImageUpdated={newImageArrived}/>
                </>
            }
            {/*<FeedFooter/>*/}

        </>
    );

}

export default FeedPage;