import {FC, useContext} from "react";
import {Avatar, Card, CardActions, CardHeader, CardMedia, IconButton} from "@mui/material";
import {red} from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IImageCardContext, ImageCardContext} from "../../contexts/ImageContext";


const ImageCard: FC = () => {
    const {image, likes } = useContext(ImageCardContext) as IImageCardContext;

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
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ImageCard;