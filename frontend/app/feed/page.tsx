const {v4: uuidv4} = require('uuid');

import FeedImage from "../../components/FeedImage";


export default function Feed() {
    const userId = uuidv4();
    return (
        <main>
            <FeedImage wsUrl={`ws://localhost:8000/ws/${userId}`}/>
        </main>
    )
}