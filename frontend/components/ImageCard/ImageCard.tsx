import ImageWithInfo, {ImageWithInfoProps} from "./ImageWithInfo";
import ImageWithReactions from "../ImageWithReaction";
import Image from "next/image";


interface ImageCardInterface {
    imageProps: ImageWithInfoProps;
    key?: string;
    isTutorial?: boolean;
    isCurrentImage?: boolean;
    isDragged?: boolean;
    hideActions?: boolean;

}

export const ImageCard = (props: ImageCardInterface) => {
    const {
        isTutorial = false,
        isCurrentImage = false,
        isDragged = false,
        hideActions = false,
        imageProps,
        key = ''
    } = props;

    if (!isDragged && !isCurrentImage) {
        return (
            <div key={key} className="snap-center py-4 flex justify-center">
                <ImageWithInfo {...imageProps} />
            </div>
        )
    } else if (isCurrentImage && !isDragged) {
        return (
            <div key={key} className="cursor-move w-fit">
                <ImageWithReactions imageProps={imageProps} dragMagnitude={0}/>
                {/* mock image */}
                {/*<div className="relative max-w-sm max-h-sm min-w-max min-h-max w-96 h-96 bg-blue-200 flex items-center justify-center">*/}
                {/*    1*/}
                {/*</div>*/}

            </div>
        )
    } else if (isDragged) {
        return (
            <div key={key} className="cursor-move w-fit">
                <ImageWithReactions imageProps={imageProps} dragMagnitude={hideActions ? 0 : 1}/>
                {/* mock image */}
                {/*<div className="relative max-w-sm max-h-sm min-w-max min-h-max w-96 h-96 bg-green-200 flex items-center justify-center">*/}
                {/*2*/}
                {/*</div>*/}

            </div>
        )
    } else {
        return (
            <div key={key} className="snap-center py-4 flex justify-center">
                <ImageWithInfo {...imageProps} />
            </div>
        )
    }
}



