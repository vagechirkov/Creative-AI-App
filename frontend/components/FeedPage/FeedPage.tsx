'use client';

import useFeedContext from "../FeedContext";
import ImageFeed from "../ImageFeed";
import {FC, useEffect} from "react";
import FeedHeader from "../FeedImages/FeedHeader";
import BackgroundText from "../FeedImages/BackgroundText";
import FeedFooter from "../FeedImages/FeedFooter";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";


interface FeedPageProps {
    feedId: number;
    wsUrl: string;
}

const FeedPage: FC<FeedPageProps> = ({wsUrl, feedId = 0}) => {
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
            } else {
                // Update history
            }

        }
    }, [lastJsonMessage]);

    return (
        <>
            {readyState === ReadyState.OPEN && feedState?.currentImage &&
                <>
                    <FeedHeader/>
                    <BackgroundText/>
                    <ImageFeed/>
                </>
            }
            {/*<FeedFooter/>*/}

        </>
    );

}

export default FeedPage;