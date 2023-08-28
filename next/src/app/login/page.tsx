'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../../../components/loading/loading';
import { useSession } from 'next-auth/react';

export default function Login() {

    const router = useRouter()
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== 'authenticated') return router.replace('/api/auth/signin');
        router.push('/home');
    }, [status])

    return (
        <div className='h-screen flex justify-center items-center bg-main-background bg-cover p-10'>
            <Loading />
        </div>
    )

}
