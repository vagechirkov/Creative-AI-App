import {FC} from "react";
import Image from "next/image";

interface ImageHoverProps {
    imageUrl: string;
    altText?: string;
    onReactions?: (direction: string) => void;
}


const ImageHover: FC<ImageHoverProps> = (props) => {
    const {imageUrl, altText} = props;

    return (

        <div className="relative max-w-sm max-h-sm min-w-max min-h-max">
            <Image
                src={imageUrl} alt={altText ? altText : "Image"}
                width={384} height={384}
                className="border-black border-2"
            />


        </div>

    );
};

export default ImageHover;