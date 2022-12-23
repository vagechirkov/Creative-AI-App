import {FC} from "react";
import {Avatar, Card, CardActions, CardHeader, CardMedia, IconButton} from "@mui/material";
import {red} from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ImageCard: FC = () => {
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
                src={"https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840"}
                alt="Adorably cute 🐈‍⬛, artstation winner by victo ngai, kilian eng and by jake parker, swirly vibrant color lines, winning-award masterpiece, fantastically gaudy, aesthetic octane render, 8k hd resolution"
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