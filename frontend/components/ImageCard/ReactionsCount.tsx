'use client';

interface ReactionsCountProps {
    text: string;
    count: number;
}


const ReactionsCount = ({text, count}: ReactionsCountProps) => {
    return (
        <div className="container flex flex-row items-center">
            <span className="pr-3 font-plex font-bold uppercase text-sm"> {text} </span>
            <span className="font-jura font-bold text-xs"> {count} </span>
        </div>
    )
}


export default ReactionsCount;