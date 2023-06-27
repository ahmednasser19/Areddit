import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import { FC } from 'react'
import PostFeed from './PostFeed';
import { getAuthSession } from '@/lib/auth';

interface GeneralFeedProps {

}

const GeneralFeed = async () => {
    const session = await getAuthSession()

    const fellowedCommunities = await db.subscription.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            subreddit: true
        }
    })



    const posts = await db.post.findMany({
        where: {
            subreddit: {
                name: {
                    in: fellowedCommunities.map(({ subreddit }) => subreddit.id)
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            subreddit: true
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS
    })
    return <PostFeed initialPosts={posts} />
}

export default GeneralFeed