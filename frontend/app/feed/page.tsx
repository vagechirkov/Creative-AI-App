import { nanoid } from 'nanoid'

import FeedImage from "../../components/FeedImage";


export default function Feed() {
    const userId: string = nanoid();
    return (
        <main>
            <FeedImage wsUrl={`ws://localhost:8000/ws/${userId}`}/>
        </main>
    )
}