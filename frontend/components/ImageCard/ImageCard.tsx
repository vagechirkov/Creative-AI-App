'use client'
import {FC, useState} from "react";
import {FeedImageType} from "../FeedImage/FeedImage";


interface ImageCardProps {
    imageUrl?: string;
    reactions?: FeedImageType['reactions'];
    onReaction?: (emoji: string) => void;
}

const ImageCard: FC<ImageCardProps> = ({imageUrl, reactions, onReaction}) => {

    const [emojiClicks, setEmojiClicks] = useState(reactions);

    const handleReaction = (emoji: string) => {
        // Update the number of clicks for the selected emoji
        setEmojiClicks((prevState: any) => ({...prevState, [emoji]: prevState[emoji] + 1,}));

        // Call the onReaction callback prop
        onReaction && onReaction(emoji);
    };

    return (
        <div className="relative rounded-lg overflow-hidden">
            {/* <Image src={imageUrl} alt="Content" width="350" height="500" className="object-cover"/>*/}
            <img src={imageUrl} alt="Content" className="w-350 h-500 object-cover"/>
            <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-white flex justify-between">
                {emojiClicks &&
                    Object.entries(emojiClicks).map(([emoji, count]) => (
                            <button onClick={() => handleReaction(emoji)} key={emoji} className="text-2xl">
                                {emoji}{<span
                                className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">count</span>}
                            </button>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default ImageCard;