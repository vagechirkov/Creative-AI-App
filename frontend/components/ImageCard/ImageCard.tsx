'use client'
import {FC, useState} from "react";

interface ImageCardProps {
    imageUrl: string;
    onReaction?: (emoji: string) => void;
}

const ImageCard: FC<ImageCardProps> = ({imageUrl, onReaction}) => {

    const [emojiClicks, setEmojiClicks] = useState({'😄': 0, '😍': 0, '😎': 0, '😜': 0, '😡': 0, '🤮': 0});

    const handleReaction = (emoji: string) => {
        // Update the number of clicks for the selected emoji
        setEmojiClicks((prevState: any) => ({...prevState, [emoji]: prevState[emoji] + 1,}));
    };

    return (
        <div className="relative rounded-lg overflow-hidden">
            {/* <Image src={imageUrl} alt="Content" width="350" height="500" className="object-cover"/>*/}
            <img src={imageUrl} alt="Content" className="w-350 h-500 object-cover"/>
            <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-white flex justify-between">
                <button onClick={() => handleReaction('😄')} className="text-2xl">😄{emojiClicks['😄'] >= 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😄']}</span>}</button>
                <button onClick={() => handleReaction('😍')} className="text-2xl">😍{emojiClicks['😍'] >= 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😍']}</span>}</button>
                <button onClick={() => handleReaction('😎')} className="text-2xl">😎{emojiClicks['😎'] >= 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😎']}</span>}</button>
                <button onClick={() => handleReaction('😜')} className="text-2xl">😜{emojiClicks['😜'] >= 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😜']}</span>}</button>
                <button onClick={() => handleReaction('😡')} className="text-2xl">😡{emojiClicks['😡'] >= 0 && <span
                    className="bg-red-500 rounded-full px-3 py-1 text-xs font-bold text-white">{emojiClicks['😡']}</span>}</button>
            </div>
        </div>
    );
};

export default ImageCard;