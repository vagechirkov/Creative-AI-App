import {ComponentStory, ComponentMeta} from '@storybook/react';

import ImageDraggable from '../components/ImageDraggable';
import {background} from "../components/ImageDraggable/background";


export default {
    title: 'ImageHover',
    component: ImageDraggable
} as ComponentMeta<typeof ImageDraggable>;

const Template: ComponentStory<typeof ImageDraggable> = (args) => {
    return (
        <ImageDraggable {...args}/>
    )
};

export const Default = Template.bind({});

Default.args = {
    imageUrl: "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/250eac75-7fb3-4484-944e-4b11dd9535c4",
    altText: "Smiling monster made of food",
    onReactions: (direction: string) => console.log(direction),
}
