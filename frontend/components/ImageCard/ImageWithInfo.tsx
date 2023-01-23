'use client';

import {FC} from "react";
import Image from 'next/image';
import {ImageInfo} from "./ImageInfo";
import {FeedImageType} from "../FeedContext/FeedContext";


export interface ImageWithInfoProps {
    imageUrl: string;
    altText: string;
    reactions: FeedImageType['reactions'];
    activeUsers?: number;
    artist?: string;
    showTutorial?: boolean;
    showInfo?: boolean;
}

const ImageWithInfo: FC<ImageWithInfoProps> = (props) => {
    const {imageUrl, altText, reactions, activeUsers, artist, showTutorial = false, showInfo = true} = props;

    return (

        <div className="relative max-w-sm max-h-sm min-w-max min-h-max">
            <div className="object-none h-[300px] w-[300px] overflow-hidden">
            <Image
                src={imageUrl} alt={altText}
                width={300} height={300}
                className="border-black border-2 "
                draggable="false"
            />
            </div>

            {/* hide info when there is tutorial */}
            <ImageInfo
                artist={artist}
                altText={altText}
                reactions={reactions}
                activeUsers={activeUsers}
                isVisible={!showTutorial && showInfo}
            />

        </div>

    );
};

export default ImageWithInfo;