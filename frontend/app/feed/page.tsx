import {nanoid} from 'nanoid'

import FeedImages from "../../components/FeedImages";


export default async function Feed() {
    // Read environment variable from .env file or build.env file when deployed
    const WSBasePath = process.env.NEXT_PUBLIC_BACKEND_API;
    const userId: string = nanoid();
    return (
        <main>
            <FeedImages wsUrl={`${WSBasePath}${userId}`}/>
        </main>
    )
}