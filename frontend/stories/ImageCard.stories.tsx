import {ComponentStory, ComponentMeta} from '@storybook/react';

import ImageCard from '../components/ImageCard';


export default {
    title: 'ImageCard',
    component: ImageCard
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => {
    return (
        <ImageCard {...args}/>
    )
};

export const Active = Template.bind({});

Active.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/2117aa24-a983-42e9-a910-912e6ac5ce1f",
    altText: "Image 1",
    reactions: [
        { emoji: "🤔", count: 10 },
        { emoji: "😍", count: 2 },
        { emoji: "🤪", count: 10 }],
    onReaction: (emoji: string) => console.log(emoji),
    interactive: true,
}

export const Hoover = Template.bind({});

Hoover.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/250eac75-7fb3-4484-944e-4b11dd9535c4",
    altText: "Image 1",
    reactions: [
        { emoji: "🤔", count: 10 },
        { emoji: "😍", count: 2 },
        { emoji: "🤪", count: 10 }],
    onReaction: (emoji: string) => console.log(emoji),
    interactive: true,
}


export const Tutorial = Template.bind({});

Tutorial.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4e49ae42-4659-4f05-9ae7-ba5dfecda4d6",
    altText: "Image 1",
    reactions: [
        { emoji: "🤔", count: 10 },
        { emoji: "😍", count: 2 },
        { emoji: "🤪", count: 10 }],
    onReaction: (emoji: string) => console.log(emoji),
    interactive: true,
}