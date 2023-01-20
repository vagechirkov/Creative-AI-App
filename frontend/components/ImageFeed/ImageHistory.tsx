import ImageCard from "../ImageCard";
import {ImageCardProps} from "../ImageCard/ImageCard";
import {FC} from "react";

interface ImageHistoryProps {
    feedHistory: ImageCardProps[];
    currentImage: ImageCardProps;
    setShowActions: () => void;
}

export const ImageHistory: FC<ImageHistoryProps> = ({feedHistory, currentImage, setShowActions}) => {
    return (
        <div className="grid grid-flow-row auto-rows-max gap-4 w-fit">
            {feedHistory.map((imageCard, index) => (
                <span key={`card-${index}`}>
                    <ImageCard {...imageCard}  />
                </span>
            ))}

            <span
                key="card-current"
                onClick={() => setShowActions()}
                onTouchStart={() => setShowActions()}
            >
                <ImageCard
                    {...currentImage}

                />
            </span>
        </div>
    );
}