import ImageWithInfo, {ImageWithInfoProps} from "./ImageWithInfo";
import ImageWithReactions from "../ImageWithReaction";


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
                <ImageWithInfo {...imageProps} />
            </div>
        )
    } else if (isDragged) {
        return (
            <div key={key} className="cursor-move w-fit">
                <ImageWithReactions {...imageProps} actionsOpacity={hideActions ? 0 : 1}/>
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



