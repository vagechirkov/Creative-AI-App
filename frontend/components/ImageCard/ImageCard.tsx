'use client';

import {FC} from "react";
import Image from 'next/image';
import {Avatar, Badge, Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Tooltip} from "@mui/material";
import {red} from "@mui/material/colors";
import {FeedImageType} from "../FeedImages/FeedImages";
import {People} from "@mui/icons-material";
import ReactionsCount from "./ReactionsCount";


interface ImageCardProps {
    imageUrl: string;
    altText: string;
    reactions: FeedImageType['reactions'];
    onReaction: (emoji: string) => void;
    interactive?: boolean;
    activeUsers?: number;
}

const ImageCard: FC<ImageCardProps> = (props) => {
    const {imageUrl, altText, reactions, onReaction, interactive = true, activeUsers} = props;
    const artist = "Osburn Lyell";

    return (
        <>
            <div className="relative max-w-sm max-h-sm min-w-max text-white">
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={384}
                    height={384}
                    className={"feed-image"}
                />
                <div
                    className="
                    absolute h-2/3
                    flex flex-col justify-end
                    inset-x-0
                    bottom-0 px-4 py-2 max-w-sm
                    bg-gradient-to-b from-transparent to-black"
                >
                    <p className="font-plex font-bold uppercase text-sm">
                        {artist}
                    </p>
                    <p className="font-inter text-xs">
                        {altText}
                    </p>
                    <div className="flex grid justify-between grid-cols-2 gap-1">
                        <ReactionsCount text={"love it"} count={100}/>
                        <ReactionsCount text={"curious"} count={100}/>
                        <ReactionsCount text={"indifferent"} count={100}/>
                        <ReactionsCount text={"makes me sad"} count={100}/>
                    </div>
                </div>
            </div>

        </>
    );

    // return (
    // <Card sx={{width: 300}}>
    //     <CardHeader
    //         avatar={
    //             <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
    //                 A
    //             </Avatar>
    //         }
    //         action={
    //             interactive &&
    //
    //             <Badge badgeContent={activeUsers} color="error" overlap="circular">
    //                 <Tooltip title={"Active users"} placement="left">
    //                     <span>
    //                         <IconButton disabled size="small">
    //                             <People/>
    //                         </IconButton>
    //                     </span>
    //                 </Tooltip>
    //             </Badge> || null
    //         }
    //         title="Artist 1"
    //     />
    //     <CardMedia
    //         component="img"
    //         height="500"
    //         src={imageUrl}
    //         alt={altText}
    //         loading="lazy"
    //     />
    //     <CardContent>
    //         <Stack direction="row" spacing={1}>
    //             {reactions &&
    //                 reactions.map((value, index) => (
    //                         <IconButton
    //                             onClick={() => onReaction(value.emoji)}
    //                             key={`${index}-${imageUrl}`}
    //                             disabled={!interactive}
    //                             size="small"
    //                             color="primary"
    //                         >
    //                             {value.emoji} {value.count}
    //                         </IconButton>
    //                     )
    //                 )
    //             }
    //         </Stack>
    //     </CardContent>
    // </Card>
    // );
};

export default ImageCard;