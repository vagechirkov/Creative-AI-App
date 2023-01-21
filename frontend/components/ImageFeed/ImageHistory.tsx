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
        <div className="">
            {feedHistory.map((imageCard, index) => (
                <div
                    key={`card-${index}`}
                    className="snap-center py-4 flex justify-center"
                >
                    <ImageCard {...imageCard}  />
                </div>
            ))}

            <div
                key="card-current"
                onClick={() => setShowActions()}
                onTouchStart={() => setShowActions()}
                className="snap-center py-4 flex justify-center"

            >
                <ImageCard
                    {...currentImage}
                />
            </div>
        </div>
    );
}