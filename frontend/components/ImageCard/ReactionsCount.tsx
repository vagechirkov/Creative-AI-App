'use client';

interface ReactionsCountProps {
    text: string;
    count: number;
}


const ReactionsCount = (props: ReactionsCountProps) => {
    const {text, count} = props;
    return (
        <div className="container flex flex-row">
            <span className="pr-2 font-plex font-bold uppercase"> {text} </span>
            <span className=""> {count} </span>
        </div>
    )
}


export default ReactionsCount;