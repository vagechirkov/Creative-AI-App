'use client';

import ImageCard from "../ImageCard";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {Fab, Grid, LinearProgress} from "@mui/material";
import ScrollBottom from "../ScrollBottom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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


const FeedImages: FC<FeedImageProps> = ({wsUrl}) => {
    const [feedImage, setFeedImage] = useState<FeedImageType | null>(null);
    const [feedHistory, setFeedHistory] = useState<FeedImageType[]>([]);
    const feedEndRef = useRef<null | HTMLDivElement>(null);

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
                // remove the oldest image if we have more than 10
                if (feedHistory.length > 10) {
                    feedHistory.shift();
                }
            }
            setFeedHistory([...feedHistory]);
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
        }, [feedImage])

    const scrollToCurrentImage = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (feedEndRef.current) {
                feedEndRef.current.scrollIntoView({
                    block: 'center',
                });
            }
        }, [])


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
                        <ImageCard
                            imageUrl={value.url}
                            reactions={value.reactions}
                            onReaction={(emoji) => null}
                            interactive={false}
                        />

                    </Grid>
                ))
                }
                {feedImage &&
                    <Grid item>
                        <div ref={feedEndRef}>
                            <ImageCard
                                imageUrl={feedImage.url}
                                reactions={feedImage.reactions}
                                interactive={true}
                                onReaction={updateReactions}

                            />
                        </div>
                    </Grid>
                }
                <Grid item>
                    <LinearProgress/>
                </Grid>
                <ScrollBottom clickHandler={scrollToCurrentImage}>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowDownIcon/>
                    </Fab>
                </ScrollBottom>

            </Grid>

        </>
    )
}

export default FeedImages;
