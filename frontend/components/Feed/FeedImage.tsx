'use client'
import ImageCard from "../ImageCard";
import {FC} from "react";


const FeedImage: FC = () => {

    const url = 'https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840';

    return (
        <ImageCard imageUrl={url}/>
    )
}

export default FeedImage;
