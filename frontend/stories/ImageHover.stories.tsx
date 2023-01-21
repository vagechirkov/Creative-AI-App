import {ComponentStory, ComponentMeta} from '@storybook/react';

import ImageHover from '../components/ImageHover';
import {background} from "../components/ImageHover/background";


export default {
    title: 'ImageHover',
    component: ImageHover
} as ComponentMeta<typeof ImageHover>;

const Template: ComponentStory<typeof ImageHover> = (args) => {
    return (
        <ImageHover {...args}/>
    )
};

export const Default = Template.bind({});

Default.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/250eac75-7fb3-4484-944e-4b11dd9535c4",
    altText: "Smiling monster made of food",
    onReactions: (direction: string) => console.log(direction),
}

export const WithBackground = Template.bind({});

WithBackground.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/250eac75-7fb3-4484-944e-4b11dd9535c4",
    altText: "Smiling monster made of food",
    onReactions: (direction: string) => console.log(direction),
    initialBackground: {
        backgroundText: background.Down,
        opacity: 1
    }
}
