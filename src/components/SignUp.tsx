import { FC } from 'react'
import { Icons } from './Icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'
import CredentialForm from './CredentialForm'
import CredentialRegistrationForm from './CredentialRegistrationForm'



const SignUp: FC = () => {
    return <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:space-y-2 sm:w-[400px] '>
        <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className='w-6 h-6 mx-auto' />
            <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
            <p className=' text-[10px]  mg:text-sm max-w-xs mx-auto '>
                By continuing, you are setting up Areddit account and agree to our user agreement and privacy police. </p>
        </div>
        <CredentialRegistrationForm />
        <p className='px-8 text-center text-sm text-zinc-700 ' > Already a  Areddittor ?{' '} <Link href={'/sign-in'} className='hover:text-zinc-800 text-sm underline underline-offset-4'  > Sign In</Link></p>
        <p className='px-8 mt-2 text-center text-sm text-zinc-800 ' >or Sign Up with google</p>
        <UserAuthForm className='' />
    </div>
}

export default SignUp