"use client"

import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps {
    subredditId: string
    isSubscribed: boolean
    subredditName: string
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({ subredditId, subredditName, isSubscribed }) => {


    const { loginToast } = useCustomToasts()
    const router = useRouter()
    const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {

                subredditId
            }
            const { data } = await axios.post('/api/subreddit/subscribe', payload)
            return data as string;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
                return toast({
                    title: "There was a problem",
                    description: "We couldn't subscribe you to this community. Please try again later.",
                    variant: "destructive"
                })
            }
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh()
            })
            return toast({
                title: "Subscribed",
                description: `You are now subscribed to r/${subredditName}`,
                variant: "default"
            })
        }
    })



    const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }

            const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
            return data as string
        },
        onError: (err: AxiosError) => {
            toast({
                title: 'Error',
                description: err.response?.data as string,
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                // Refresh the current route and fetch new data from the server without
                // losing client-side browser or React state.
                router.refresh()
            })
            toast({
                title: 'Unsubscribed!',
                description: `You are now unsubscribed from/${subredditName}`,
            })
        },
    })

    return isSubscribed ? (<Button onClick={() => unsubscribe()} isLoading={isUnsubLoading} className='w-full mt-1 mb-4'>Leave community</Button>) : (<Button onClick={() => subscribe()} isLoading={isSubLoading} className='w-full mt-1 mb-4'>Join to post</Button>)
}

export default SubscribeLeaveToggle