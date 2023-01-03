'use client';

import {FC} from "react";
import {FeedImageType} from "../FeedImage/FeedImage";


interface ImageCardProps {
    imageUrl: string;
    reactions: FeedImageType['reactions'];
    onReaction: (emoji: string) => void;
}

const ImageCard: FC<ImageCardProps> = ({imageUrl, reactions, onReaction}) => {
    return (
        <div className="container max-w-xs">
            <img src={imageUrl} alt="Content" className="object-center object-cover"/>
            <div className="grid grid-flow-col auto-cols-max justify-around">
                {reactions &&
                    reactions.map((value, index) => (
                            <button
                                onClick={() => onReaction(value.emoji)}
                                key={`${index}-${imageUrl}`}
                                className="text-2xl">
                                    <span
                                        className="bg-gray-200 rounded-full px-3 py-1 text-base font-bold text-black"
                                    >
                                    {value.emoji} {value.count}
                                </span>
                            </button>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default ImageCard;