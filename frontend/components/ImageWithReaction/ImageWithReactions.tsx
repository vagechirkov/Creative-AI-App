'use client';

import Image from "next/image";
import {FC, ReactNode} from "react";

interface ImageContainerProps {
    imageUrl: string;
    altText?: string;
    actionsOpacity?: number;
}


export const ImageWithReactions: FC<ImageContainerProps> = (props) => {
    const {imageUrl, altText, actionsOpacity = 1} = props;
    return (
        <div className="max-w-sm max-h-sm min-w-max min-h-max">
            <div className="grid grid-cols-12 gap-0">
                {/* row 1 */}
                <div className="col-span-12 text-center">
                    <ActionsLabel opacity={actionsOpacity}> i like it </ActionsLabel>
                </div>

                {/* row 2 */}
                <div className="text-center col-start-1 col-span-1 transform rotate-180 [writing-mode:vertical-lr]">
                    <ActionsLabel opacity={actionsOpacity}> it inspires me </ActionsLabel>
                </div>

                <div
                    className="col-start-2 col-end-12 w-320 h-320 bg-black"
                    style={{opacity: 1}}
                >
                    <Image
                        src={imageUrl} alt={altText ? altText : "Image"}
                        width={320} height={320}
                        className="border-black border-2 "
                        draggable="false"
                    />
                </div>

                <div className="text-center col-start-12 col-span-1 transform rotate-360 [writing-mode:vertical-lr]">
                    <ActionsLabel opacity={actionsOpacity}> it surprises me </ActionsLabel>
                </div>

                {/* row 3 */}
                <div className="col-span-12 text-center">
                    <ActionsLabel opacity={actionsOpacity}> it terrifies me </ActionsLabel>
                </div>
            </div>
        </div>
    );
}


const ActionsLabel = ({children, opacity}: { children: ReactNode, opacity: number }) => {
    return (
        <span
            className="inline-block font-jura font-bold uppercase text-lg text-center"
            style={{opacity: opacity}}
        >
            {children}
        </span>
    )
}

export default ImageWithReactions;

