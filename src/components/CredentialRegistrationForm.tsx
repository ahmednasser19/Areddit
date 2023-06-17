"use client"
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
interface CredentialFormProps {

}

const CredentialRegistrationForm: FC<CredentialFormProps> = ({ }) => {
    const router = useRouter()
    const { toast } = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        axios.post("/api/register", { name, email, password }).then((res) => {

            toast({
                title: 'Success',
                description: "User created successfully",
                variant: "default",
            })

            router.push('/sign-in')

        }).catch((err) => {
            toast({
                title: 'Error',
                description: err?.response?.data,
                variant: 'destructive',
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return <div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label className='text-sm' htmlFor="name">Name</label>
            <input className='border-[1px] min-h-[30px] rounded-[10px] px-2 py-2 text-sm' onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" id="name" />
            <label className='text-sm' htmlFor="email">Email</label>
            <input className='border-[1px] min-h-[30px] rounded-[10px] px-2 py-2 text-sm' onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="email" id="email" />
            <label className='text-sm' htmlFor="password">Password</label>
            <input className='border-[1px] min-h-[30px] rounded-[10px] px-2 py-2 text-sm' onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
            <Button isLoading={isLoading} type="submit">Sign Up</Button>
        </form>

    </div>
}
export default CredentialRegistrationForm