'use client';

import Image from "next/image";
import React, {FC} from "react";

interface ImageContainerProps {
    imageUrl: string;
    altText?: string;
}


export const ImageWithActions: FC<ImageContainerProps> = ({imageUrl, altText}) => {

    return (
        <div className="grid max-w-sm max-h-sm min-w-max min-h-max grid-cols-12 justify-items-stretch">
            {/* row 1 */}
            <div className="col-span-12 text-center">
                <ActionsLabel> i like it </ActionsLabel>
            </div>

            {/* row 2 */}
            <div className="text-center col-start-1 col-span-1 transform rotate-180 [writing-mode:vertical-lr]">
                <ActionsLabel> it inspires me </ActionsLabel>
            </div>

            <div className="col-start-2 col-end-11">
                <Image
                    src={imageUrl} alt={altText ? altText : "Image"}
                    width={300} height={300}
                    className="border-black border-2 "
                />
            </div>

            <div className="text-center col-start-11 col-span-1 transform rotate-360 [writing-mode:vertical-lr]">
                <ActionsLabel> it surprises me </ActionsLabel>
            </div>

            {/* row 3 */}
            <div className="col-span-12 text-center">
                <ActionsLabel> it terrifies me </ActionsLabel>
            </div>

        </div>
    );
}


const ActionsLabel = ({children}: { children: React.ReactNode }) => {
    return (
        <span className="inline-block font-jura font-bold uppercase text-base text-center">
            {children}
        </span>
    )
}

