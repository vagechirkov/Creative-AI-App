import {ComponentStory, ComponentMeta} from '@storybook/react';

import ImageFeed from '../components/ImageFeed';


export default {
    title: 'ImageFeed',
    component: ImageFeed
} as ComponentMeta<typeof ImageFeed>;

const Template: ComponentStory<typeof ImageFeed> = (args) => {
    return (
        <ImageFeed {...args}/>
    )
};

export const Default = Template.bind({});

Default.args = {
    feedHistory: [
        {
            imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/ccc12d51-5cb1-4c4c-9355-71a35188b0dd",
            altText: "(high quality 2d illustration), (closeup of carrot character), (laughing opened mouth), matt furie",
            reactions: [
                {emoji: "1", count: 330},
                {emoji: "2", count: 2},
                {emoji: "3", count: 130},
            ],
            artist: "Osburn Lyell",
            activeUsers: 10
        },
        {
            imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4e49ae42-4659-4f05-9ae7-ba5dfecda4d6",
            altText: "Smiling monster made of food",
            reactions: [
                {emoji: "1", count: 10},
                {emoji: "2", count: 2},
                {emoji: "3", count: 10},
                {emoji: "4", count: 10},
            ],
            artist: "Osburn Lyell"
        }
    ],
    currentImage: {
        imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/250eac75-7fb3-4484-944e-4b11dd9535c4",
        altText: "Smiling monster made of food",
        reactions: [
            {emoji: "1", count: 330},
            {emoji: "2", count: 2},
            {emoji: "3", count: 130},
        ],
        artist: "Osburn Lyell",
        activeUsers: 10
    }

}