import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const actions = [
    {icon: <KeyboardArrowDownIcon/>, name: 'Scroll To Bottom'},
    {icon: <SaveIcon/>, name: 'Next Feed Room'},
    {icon: <PrintIcon/>, name: 'Print'},
    {icon: <ShareIcon/>, name: 'Share'},
];

export default function FeedSpeedDial() {
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
                />
            ))}
        </SpeedDial>
    );
}