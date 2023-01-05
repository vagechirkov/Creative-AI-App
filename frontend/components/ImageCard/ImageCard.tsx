'use client';

import {FC} from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Stack
} from "@mui/material";
import {red} from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {FeedImageType} from "../FeedImages/FeedImages";


interface ImageCardProps {
    imageUrl: string;
    altText: string;
    reactions: FeedImageType['reactions'];
    onReaction: (emoji: string) => void;
    interactive?: boolean;
}

const ImageCard: FC<ImageCardProps> = (props) => {
    const {imageUrl, altText, reactions, onReaction, interactive = true} = props;
    return (

        <Card sx={{width: 300}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        A
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Artist 1"
            />
            <CardMedia
                component="img"
                height="500"
                src={imageUrl}
                alt={altText}
                loading="lazy"
            />
            <CardContent>
                <Stack direction="row" spacing={1}>
                    {reactions &&
                        reactions.map((value, index) => (
                                <IconButton
                                    onClick={() => onReaction(value.emoji)}
                                    key={`${index}-${imageUrl}`}
                                    disabled={!interactive}
                                    size="small"
                                    color="primary"
                                >
                                    {value.emoji} {value.count}
                                </IconButton>
                            )
                        )
                    }
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ImageCard;