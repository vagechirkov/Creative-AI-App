'use client';

import ViewerCount from "./ViewerCount";
import ReactionsCount from "./ReactionsCount";
import {FC} from "react";
import {FeedImageType} from "../FeedContext/FeedContext";

interface ImageInfoProps {
    reactions: FeedImageType['reactions'];
    altText?: string;
    artist?: string;
    activeUsers?: number;
    isVisible?: boolean;
}

export const ImageInfo: FC<ImageInfoProps> = (props) => {
    const {artist, altText, reactions, activeUsers, isVisible=true} = props;

    return (
        <div className="text-white" style={{opacity: isVisible ? 1 : 0}}>
            <div className="absolute top-0 right-0 pt-2 pr-2">
                <ViewerCount count={activeUsers ? activeUsers : 0}/>
            </div>
            <div
                className="
                    absolute h-2/3
                    flex flex-col justify-end
                    inset-x-0 bottom-0 px-4 py-2 max-w-sm
                    bg-gradient-to-b from-transparent to-black"
            >
                <p className="font-plex font-bold uppercase text-sm">
                    {artist ? artist : 'anonymous'}
                </p>
                <p className="font-inter font-light text-xs pb-4">
                    {altText? altText : ''}
                </p>
                <div className="flex grid justify-between grid-cols-2 gap-1">
                    <ReactionsCount text={"love it"} count={reactions[0]?.count ? reactions[0].count : 0}/>
                    <ReactionsCount text={"curious"} count={reactions[1]?.count ? reactions[1].count : 0}/>
                    <ReactionsCount text={"indifferent"} count={reactions[2]?.count ? reactions[2].count : 0}/>
                    <ReactionsCount text={"makes me sad"} count={reactions[3]?.count ? reactions[3].count : 0}/>
                </div>
            </div>
        </div>
    );
}