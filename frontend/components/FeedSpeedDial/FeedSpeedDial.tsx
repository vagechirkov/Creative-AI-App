import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";

const actions = [
    {icon: <KeyboardArrowDownIcon/>, name: 'Scroll To Bottom', id: 'scrollDown'},
    {icon: <NavigateNext />, name: 'Next Feed Room', id: 'nextFeed'},
    {icon: <NavigateBefore />, name: 'Previous Feed Room', id: 'preciousFeed'},
];

interface FeedSpeedDialProps {
    handleClick: (actionId: string) => void;
}

export default function FeedSpeedDial({handleClick}: FeedSpeedDialProps) {
    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            sx={{position: 'fixed', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleClick(action.id)}
                />
            ))}
        </SpeedDial>
    );
}