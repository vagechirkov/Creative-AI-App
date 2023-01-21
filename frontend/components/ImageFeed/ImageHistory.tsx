import ImageWithInfo from "../ImageCard";
import {ImageCardProps} from "../ImageCard/ImageWithInfo";
import {FC} from "react";

interface ImageHistoryProps {
    feedHistory: ImageCardProps[];
    currentImage: ImageCardProps;
    setShowActions: () => void;
}

export const ImageHistory: FC<ImageHistoryProps> = ({feedHistory, currentImage, setShowActions}) => {
    return (
        <div className="">
            {feedHistory.map((imageCard, index) => (
                <div
                    key={`card-${index}`}
                    className="snap-center py-4 flex justify-center"
                >
                    <ImageWithInfo {...imageCard}  />
                </div>
            ))}

            <div
                key="card-current"
                onClick={() => setShowActions()}
                onTouchStart={() => setShowActions()}
                className="snap-center py-4 flex justify-center"

            >
                <ImageWithInfo
                    {...currentImage}
                />
            </div>
        </div>
    );
}