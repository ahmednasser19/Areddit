import { FC } from 'react'
import { Button } from './ui/Button'

interface SubscribeLeaveToggleProps {

}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({ }) => {
    const isSubscribed = false
    return isSubscribed ? (<Button>Leave community</Button>) : (<Button>Join to post</Button>)
}

export default SubscribeLeaveToggle