'use client';

import {FC} from "react";
import Image from 'next/image';
import {FeedImageType} from "../FeedImages/FeedImages";
import {ImageInfo} from "./ImageInfo";


export interface ImageCardProps {
    imageUrl: string;
    altText: string;
    reactions: FeedImageType['reactions'];
    activeUsers?: number;
    artist?: string;
    showTutorial?: boolean;
}

const ImageCard: FC<ImageCardProps> = (props) => {
    const {imageUrl, altText, reactions, activeUsers, artist, showTutorial = false} = props;

    return (

        <div className="relative max-w-sm max-h-sm min-w-max min-h-max">
            <Image
                src={imageUrl} alt={altText}
                width={384} height={384}
                className="border-black border-2"
            />

            {/* Show info when there is tutorial */}
            {!showTutorial &&
                <ImageInfo
                    artist={artist}
                    altText={altText}
                    reactions={reactions}
                    activeUsers={activeUsers}
                />
            }

        </div>

    );
};

export default ImageCard;