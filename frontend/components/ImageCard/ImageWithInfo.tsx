'use client';

import {FC} from "react";
import Image from 'next/image';
import {ImageInfo} from "./ImageInfo";
import {FeedImageType} from "../FeedContext/FeedContext";
import {MdOutlineSwipe} from "react-icons/md";


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
            <div className="object-none overflow-hidden h-[300px] w-[300px]">
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
            {showTutorial &&
                <div
                    className="
                    absolute h-full
                    flex flex-col justify-center items-center
                    inset-x-0 bottom-0 px-4 py-2 max-w-sm
                    bg-gradient-to-b from-transparent to-black"
                >
                    <span className="font-jura uppercase text-l text-white text-center w-[150px] pb-5">
                        hold and swipe to interact with the artwork
                    </span>
                    <span className="text-white text-4xl animate-bounce">
                        <MdOutlineSwipe/>
                    </span>

                    {/*<div className="container flex flex-row items-center">*/}
                    {/*    <MdOutlineSwipe/>*/}
                    {/*</div>*/}
                </div>

            }


        </div>

    );
};

export default ImageWithInfo;