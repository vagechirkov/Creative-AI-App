'use client';

import useFeedContext from "../FeedContext";
import ImageFeed from "../ImageFeed";
import {FC, useEffect, useState} from "react";
import FeedHeader from "./FeedHeader";
import BackgroundText from "./BackgroundText";
import FeedFooter from "./FeedFooter";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {FEED_ACTIONS} from "../FeedContext/FeedReducer";
import {FeedImageType} from "../FeedContext/FeedContext";


interface FeedPageProps {
    feedId: number;
    wsUrl: string;
}

const FeedPage: FC<FeedPageProps> = ({wsUrl, feedId = 0}) => {
    const [newImageArrived, setNewImageArrived] = useState<boolean>(false);
    const {feedState, feedDispatch} = useFeedContext();

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`${wsUrl}/${feedId}`);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && lastJsonMessage as FeedImageType) {
            if (!lastJsonMessage) return;

            // Parse lastJsonMessage as {prompt: string}
            const messagePrompt = lastJsonMessage as { prompt: string };

            if (messagePrompt?.prompt) {

                feedDispatch({
                    type: FEED_ACTIONS.ADD_PROMPT_TO_HISTORY,
                    payload: {userPrompt: messagePrompt.prompt}
                });
                return;
            }

            // Parse lastJsonMessage as FeedImageType
            const messageImage = lastJsonMessage as FeedImageType;
            if (messageImage?.id) {
                const newImage = lastJsonMessage as FeedImageType;

                // show transition effect if the image is updated
                if (feedState?.currentImage?.id !== newImage.id && !feedState?.dragState?.isDragging) {
                    setNewImageArrived(true);
                    setTimeout(() => {
                        setNewImageArrived(false);
                    }, 300);
                }

                feedDispatch({
                    type: FEED_ACTIONS.SET_CURRENT_IMAGE,
                    payload: {currentImage: newImage}
                });
            }

        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN &&
            feedState?.userReaction &&
            feedState?.currentImage &&
            feedState?.currentImage.id === feedState.userReaction.imageId) {

            sendJsonMessage({
                emoji: feedState.userReaction.reaction,
                count: 1,
                image_id: feedState.userReaction.imageId
            });

            // clear user reaction
            feedDispatch({type: FEED_ACTIONS.CLEAR_USER_REACTION});
        }

    }, [feedState?.userReaction]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN &&
            feedState?.userPrompt) {
            sendJsonMessage({
                emoji: '',
                count: 1,
                image_id: -1,
                new_prompt: feedState.userPrompt
            });
        }
    }, [feedState?.userPrompt]);


    return (
        <>
            {readyState === ReadyState.OPEN && feedState?.currentImage &&
                <>
                    <FeedHeader/>
                    <BackgroundText/>
                    <ImageFeed isCurrentImageUpdated={newImageArrived}/>
                    <FeedFooter/>
                </>
            }

        </>
    );

}

export default FeedPage;