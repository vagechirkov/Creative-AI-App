'use client'
import React, {FC, useContext, useState} from "react";

interface ImageCardProps {
    imageUrl: string;
    onReaction?: (emoji: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({imageUrl, onReaction}) => {
    // const {image, reactions} = useContext(ImageCardContext) as IImageCardContext;

    const [emojiClicks, setEmojiClicks] = useState({
        '😄': 0,
        '😍': 0,
        '😎': 0,
        '😜': 0,
        '😡': 0,
    });

    const handleReaction = (emoji: string) => {
        // Update the number of clicks for the selected emoji
        // array of strings type
        setEmojiClicks((prevState: any) => ({
            ...prevState,
            [emoji]: prevState[emoji] + 1,
        }));

        // Call the onReaction prop function
        // onReaction(emoji);
    };

    return (
        <div className="relative rounded-lg overflow-hidden">
            <img src={imageUrl} alt="Content" className="w-full h-64 object-cover"/>
            <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-white flex justify-between">
                <button onClick={() => handleReaction('😄')} className="text-2xl">😄{emojiClicks['😄'] > 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😄']}</span>}</button>
                <button onClick={() => handleReaction('😍')} className="text-2xl">😍{emojiClicks['😍'] > 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😍']}</span>}</button>
                <button onClick={() => handleReaction('😎')} className="text-2xl">😎{emojiClicks['😎'] > 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😎']}</span>}</button>
                <button onClick={() => handleReaction('😜')} className="text-2xl">😜{emojiClicks['😜'] > 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😜']}</span>}</button>
                <button onClick={() => handleReaction('😡')} className="text-2xl">😡{emojiClicks['😡'] > 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😡']}</span>}</button>
            </div>
        </div>
    );
};

export default ImageCard;