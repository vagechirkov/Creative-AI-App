import {ComponentStory, ComponentMeta} from '@storybook/react';

import useFeedContext, {FeedContextProvider,} from "../components/FeedContext/FeedContext";
import {useEffect} from "react";
import ImageFeed from "../components/ImageFeed/ImageFeed";
import FeedHeader from "../components/FeedPage/FeedHeader";
import BackgroundText from "../components/FeedPage/BackgroundText";
import {FEED_ACTIONS} from "../components/FeedContext/FeedReducer";
import FeedFooter from "../components/FeedPage/FeedFooter";

const feedHistory = [
    {
        url: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4e49ae42-4659-4f05-9ae7-ba5dfecda4d6",
        alt_text: "Smiling monster made of food",
        reactions: [
            {emoji: "1", count: 10},
            {emoji: "2", count: 2},
            {emoji: "3", count: 10},
            {emoji: "4", count: 10},
        ],
        artist: "Osburn Lyell"
    },
    "high quality 2d illustration), (closeup of carrot character), (",
    "Smiling monster made of foo",
    {
        url: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/ccc12d51-5cb1-4c4c-9355-71a35188b0dd",
        alt_text: "(high quality 2d illustration), (closeup of carrot character), (laughing opened mouth), matt furie",
        reactions: [
            {emoji: "1", count: 330},
            {emoji: "2", count: 2},
            {emoji: "3", count: 130},
        ],
        artist: "Osburn Lyell",
        activeUsers: 10
    },
    {
        url: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4aade2e1-6a7d-43ae-a05c-d3587bf78a44",
        alt_text: "A realistic san-francisco cityscape, from the roof, tall terrace, hills, golden gate, houses, parks, and hell bursting in style of wayne thiebaud and bosch",
        reactions: [
            {emoji: "1", count: 10},
            {emoji: "2", count: 2},
            {emoji: "3", count: 10},
            {emoji: "4", count: 10},
        ],
    },
    'A realistic san-francisco cityscape, from the roof, tall terrace, hills, golden gate, houses, parks, and hell bursting in style of wayne thiebaud and bosch'
];


const currentImage = {
    url: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/250eac75-7fb3-4484-944e-4b11dd9535c4",
    alt_text: "Smiling monster made of food",
    reactions: [
        {emoji: "1", count: 330},
        {emoji: "2", count: 2},
        {emoji: "3", count: 130},
    ],
    artist: "Osburn Lyell",
    active_users: 10
}

export default {
    title: 'Feed',
    component: ImageFeed,
    decorators: [
        (ComponentStory) => {
            return (
                <FeedContextProvider>
                    <ComponentStory/>
                </FeedContextProvider>
            );
        },
    ]
} as ComponentMeta<typeof ImageFeed>;

const Template: ComponentStory<typeof ImageFeed> = (args) => {
    const {feedState, feedDispatch} = useFeedContext();


    useEffect(() => {
        if (!feedState?.feedHistory) {
            feedDispatch({
                type: FEED_ACTIONS.SET_HISTORY_AND_CURRENT_IMAGE,
                payload: {feedHistory: feedHistory, currentImage: currentImage}
            });
        }

    }, [])

    return (
        <>
            <FeedHeader/>
            <BackgroundText/>
            <ImageFeed {...args}/>
            <FeedFooter/>
        </>
    )
};

export const Default = Template.bind({});

Default.args = {
    isCurrentImageUpdated: false,
};


