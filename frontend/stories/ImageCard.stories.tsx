import {ComponentStory, ComponentMeta} from '@storybook/react';

import ImageWithInfo from '../components/ImageCard';


export default {
    title: 'ImageCard',
    component: ImageWithInfo
} as ComponentMeta<typeof ImageWithInfo>;

const Template: ComponentStory<typeof ImageWithInfo> = (args) => {
    return (
        <div className="flex flex-col w-screen h-screen justify-center">
            <div className="grid grid-cols-12 gap-0 justify-items-center">
                <div className="col-span-12 bg-black">
                    <ImageWithInfo {...args}/>
                </div>
            </div>
        </div>
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

export const ActiveLongImage = Template.bind({});

ActiveLongImage.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/9a263e16-c4df-465a-92ff-ea3473880f27",
    altText: "Poster art by tomokazu matsuyama, featured on pixiv, space art, 2d game art, cosmic horror, official art",
    reactions: [
        {emoji: "1", count: 330},
        {emoji: "2", count: 2},
        {emoji: "3", count: 130},
    ],
    artist: "Tomokazu Matsuyama",
    activeUsers: 1
}

export const ActiveShortImage = Template.bind({});

ActiveShortImage.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4aade2e1-6a7d-43ae-a05c-d3587bf78a44",
    altText: "A realistic san-francisco cityscape, from the roof, tall terrace, hills, golden gate, houses, parks, and hell bursting in style of wayne thiebaud and bosch",
    reactions: [
        {emoji: "1", count: 330},
        {emoji: "2", count: 2},
        {emoji: "3", count: 130},
    ],
    activeUsers: 4
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