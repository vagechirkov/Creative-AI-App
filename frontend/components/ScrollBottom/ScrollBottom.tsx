import {Box, Fade} from "@mui/material";

interface Props {
    children: React.ReactElement;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ScrollBottom = (props: Props) => {
    const {children, clickHandler} = props;
    // import {useScrollTrigger} from "@mui/material";
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    // const trigger = useScrollTrigger({
    //     disableHysteresis: true,
    //     threshold: 4000,
    // });

    return (
        <Fade in={true}>
            <Box
                onClick={clickHandler}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default ScrollBottom;