'use client';

import {ImageCardProps} from "../ImageCard/ImageCard";
import {FC, useState} from "react";
import {ImageHistory} from "./ImageHistory";
import ImageHover from "../ImageHover";

interface ImageFeedProps {
    feedHistory: ImageCardProps[];
    currentImage: ImageCardProps;
}

const ImageFeed: FC<ImageFeedProps> = ({feedHistory, currentImage}) => {
    const [showActions, setShowActions] = useState<boolean>(false);

    return (
        <>
            {!showActions &&
                <ImageHistory
                    feedHistory={feedHistory}
                    currentImage={currentImage}
                    setShowActions={() => setShowActions(true)}
                />
            }
            {/* ImageHover */}
            {showActions &&
                <div className="absolute bottom-0 left-0 w-full h-full bg-white">
                    <ImageHover
                        imageUrl={currentImage.imageUrl}
                        onReactions={(direction) => {
                            console.log(direction)
                            setShowActions(false);
                        }}
                    />
                </div>
            }
        </>
    );
};

export default ImageFeed;