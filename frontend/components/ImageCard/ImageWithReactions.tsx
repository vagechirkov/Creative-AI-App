'use client';

import {FC, ReactNode} from "react";
import ImageWithInfo, {ImageWithInfoProps} from "../ImageCard/ImageWithInfo";

interface ImageContainerProps {
    imageProps: ImageWithInfoProps;
    dragMagnitude?: number;
    dragMagnitudeThreshold?: number;
}


export const ImageWithReactions: FC<ImageContainerProps> = (props) => {
    const {dragMagnitude = 0, dragMagnitudeThreshold = 0.1} = props;
    return (
        <div className="max-w-sm max-h-sm min-w-max min-h-max">
            <div className="grid grid-cols-12 gap-0">
                {/* row 1 */}
                <div className="col-span-12 text-center">
                    <ActionsLabel opacity={dragMagnitude} threshold={dragMagnitudeThreshold}>
                        i like it
                    </ActionsLabel>
                </div>

                {/* row 2 */}
                <div className="text-center col-start-1 col-span-1 transform rotate-180 [writing-mode:vertical-lr]">
                    <ActionsLabel opacity={dragMagnitude} threshold={dragMagnitudeThreshold}>
                        it inspires me
                    </ActionsLabel>
                </div>

                <div className="col-start-2 col-end-12" style={{opacity: 1}}>
                    <ImageWithInfo {...props.imageProps} showInfo={dragMagnitude < 0.01}/>
                </div>

                <div className="text-center col-start-12 col-span-1 transform rotate-360 [writing-mode:vertical-lr]">
                    <ActionsLabel opacity={dragMagnitude} threshold={dragMagnitudeThreshold}>
                        it surprises me
                    </ActionsLabel>
                </div>

                {/* row 3 */}
                <div className="col-span-12 text-center">
                    <ActionsLabel opacity={dragMagnitude} threshold={dragMagnitudeThreshold}>
                        it terrifies me
                    </ActionsLabel>
                </div>
            </div>
        </div>
    );
}


const ActionsLabel = ({children, opacity, threshold}: { children: ReactNode, opacity: number, threshold: number }) => {
    return (
        <span
            className="inline-block font-jura font-bold uppercase text-lg text-center"
            style={{opacity: opacity > threshold || opacity === 0 ? 0 : 1}}
        >
            {children}
        </span>
    )
}

export default ImageWithReactions;

