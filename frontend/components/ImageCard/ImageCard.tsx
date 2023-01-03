'use client';

import {FC} from "react";
import {FeedImageType} from "../FeedImage/FeedImage";
import {Card, CardFooter, CardHeader} from "@material-tailwind/react";


interface ImageCardProps {
    imageUrl: string;
    reactions: FeedImageType['reactions'];
    onReaction: (emoji: string) => void;
    interactive?: boolean;
}

const ImageCard: FC<ImageCardProps> = (props) => {
    const {imageUrl, reactions, onReaction, interactive=true} = props;
    return (
        <Card className="w-300 ">
            <CardHeader floated={false} className="h-500">
                <img src={imageUrl} alt="Content"/>
            </CardHeader>

            <CardFooter className="grid grid-flow-col auto-cols-max justify-around">
                {reactions &&
                    reactions.map((value, index) => (
                            <button
                                onClick={() => onReaction(value.emoji)}
                                key={`${index}-${imageUrl}`}
                                className="text-2xl"
                                disabled={!interactive}
                            >
                                    <span
                                        className="bg-gray-200 rounded-full px-3 py-1 text-base font-bold text-black"
                                    >
                                    {value.emoji} {value.count}
                                </span>
                            </button>
                        )
                    )
                }
            </CardFooter>
        </Card>
    );
};

export default ImageCard;