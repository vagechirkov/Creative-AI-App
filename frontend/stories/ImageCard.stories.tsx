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

export const DefaultImageCard = Template.bind({});

DefaultImageCard.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/2d9b748e-754a-47a9-ad42-5496fd9a9941",
    altText: "Image 1",
    reactions: [
        { emoji: "🤔", count: 10 },
        { emoji: "😍", count: 2 },
        { emoji: "🤪", count: 10 }],
    onReaction: (emoji: string) => console.log(emoji),
    interactive: true,
}
