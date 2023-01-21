import {ComponentStory, ComponentMeta} from '@storybook/react';

import ImageWithInfo from '../components/ImageCard';


export default {
    title: 'ImageCard',
    component: ImageWithInfo
} as ComponentMeta<typeof ImageWithInfo>;

const Template: ComponentStory<typeof ImageWithInfo> = (args) => {
    return (
        <ImageWithInfo {...args}/>
    )
};

export const Active = Template.bind({});

Active.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/ccc12d51-5cb1-4c4c-9355-71a35188b0dd",
    altText: "(high quality 2d illustration), (closeup of carrot character), (laughing opened mouth), matt furie",
    reactions: [
        {emoji: "1", count: 330},
        {emoji: "2", count: 2},
        {emoji: "3", count: 130},
    ],
    artist: "Osburn Lyell",
    activeUsers: 10
}

export const Tutorial = Template.bind({});

Tutorial.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4e49ae42-4659-4f05-9ae7-ba5dfecda4d6",
    altText: "Smiling monster made of food",
    reactions: [
        {emoji: "1", count: 10},
        {emoji: "2", count: 2},
        {emoji: "3", count: 10},
        {emoji: "4", count: 10},
    ],
    artist: "Osburn Lyell",
    showTutorial: true
}