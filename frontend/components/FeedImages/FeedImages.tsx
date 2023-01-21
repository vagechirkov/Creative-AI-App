'use client';

import ImageWithInfo from "../ImageCard";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {Grid} from "@mui/material";
import FeedSpeedDial from "../FeedSpeedDial";


interface FeedImageProps {
    wsUrl: string;

    feedId?: number;
}

export type FeedImageType = {
    id: number;
    url: string;
    alt_text: string;
    // list of emojis and their counts
    reactions: { emoji: string, count: number }[];
    active_users: number;
}


const FeedImages: FC<FeedImageProps> = (props) => {
    const {wsUrl, feedId = 0} = props;

    const [feedImage, setFeedImage] = useState<FeedImageType | null>(null);
    const [feedHistory, setFeedHistory] = useState<FeedImageType[]>([]);
    const [feed, setFeed] = useState<number>(feedId);
    const feedEndRef = useRef<null | HTMLDivElement>(null);

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`${wsUrl}/${feed}`);

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
        }, [feedImage])

    const scrollToCurrentImage = useCallback(
        () => {
            if (feedEndRef.current) {
                feedEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: 'center',
                });
            }
        }, [])

    const handleSpeedDialClick = (actionId: string) => {
        // TODO: avoid hardcoding feed ids
        if (actionId === 'nextFeed') {
            if (feed === 3) {
                setFeed(0);
            } else {
                setFeed(feed + 1);
            }
        } else if (actionId === 'preciousFeed') {
            if (feed > 0) {
                setFeed(feed - 1);
            } else {
                setFeed(3);
            }
        } else if (actionId === 'scrollDown') {
            scrollToCurrentImage();
        }
    }


    useEffect(() => {
        if (readyState === ReadyState.OPEN && lastJsonMessage) {
            const data = lastJsonMessage as FeedImageType;
            setFeedImage(data);

            const index = feedHistory.findIndex((image) => image.id === data.id);
            if (index !== -1) {
                // update existing image
                setFeedHistory([...feedHistory.slice(0, -1), data]);
            } else {
                // remove the oldest image if we have more than 10
                if (feedHistory.length > 10) {
                    feedHistory.shift();
                }
                setFeedHistory([...feedHistory, data]);
            }

        }
    }, [lastJsonMessage]);

    useEffect(() => {
        scrollToCurrentImage();
    }, [feedImage?.url])

    useEffect(() => {
        setFeedHistory([]);
        setFeedImage(null);

    }, [feed])


    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
            >
                {/* show all without the current image */}
                {feedHistory.slice(0, -1).map((value, index) => (
                    <Grid item key={`${index}-${value.url}`}>
                        <ImageWithInfo
                            imageUrl={value.url}
                            altText={value.alt_text}
                            reactions={value.reactions}
                        />

                    </Grid>
                ))
                }
                {feedImage &&
                    <Grid item>
                        <div ref={feedEndRef}>

                            <ImageWithInfo
                                imageUrl={feedImage.url}
                                altText={feedImage.alt_text}
                                reactions={feedImage.reactions}
                                activeUsers={feedImage.active_users}
                            />
                        </div>
                    </Grid>
                }
            </Grid>
            <FeedSpeedDial handleClick={handleSpeedDialClick}/>

        </>
    )
}

export default FeedImages;
