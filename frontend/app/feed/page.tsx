import { nanoid } from 'nanoid'

import FeedImages from "../../components/FeedImages";


export default function Feed() {
    const userId: string = nanoid();
    return (
        <main>
            <FeedImages wsUrl={`ws://localhost:8000/ws/${userId}`}/>
        </main>
    )
}