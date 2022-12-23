import React, {FC, useContext} from "react";
import {Avatar, Badge, Card, CardActions, CardHeader, CardMedia, IconButton} from "@mui/material";
import {red} from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IImageCardContext, ImageCardContext} from "../../contexts/ImageContext";


const ImageCard: FC = () => {
    const {image, reactions} = useContext(ImageCardContext) as IImageCardContext;

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
                src={image.src}
                alt={image.alt}
                loading="lazy"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Badge badgeContent={reactions.likes} color="primary">
                        <FavoriteIcon/>
                    </Badge>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ImageCard;