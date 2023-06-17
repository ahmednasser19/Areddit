"use client"
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

interface CredentialFormProps {

}

const CredentialForm: FC<CredentialFormProps> = ({ }) => {
    const router = useRouter()
    const { toast } = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: true
            })

        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }

    }

    return <div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label className='text-sm' htmlFor="email">Email</label>
            <input className='border-[1px] min-h-[30px] rounded-[10px] px-2 py-1 text-sm' onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="email" id="email" />
            <label className='text-sm' htmlFor="password">Password</label>
            <input className='border-[1px] min-h-[30px] rounded-[10px] px-2 py-1 text-sm' onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
            <Button isLoading={isLoading} type="submit">Sign in</Button>
        </form>

    </div>
}
export default CredentialForm