'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../../../components/loading/loading';

const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        console.log(session);
        
        if (status === 'unauthenticated') {
            setTimeout(()=>{
                router.push('/api/auth/signin');
            },2000)
            return
        }

    }, [status])

    return (
        
        <div className=' flex flex-col md:flex-row justify-center overflow-y-scroll bg-main-background bg-cover h-screen'>

            {
                status === 'loading' &&
                <Loading/>
                
            }
            {
                status === 'authenticated' &&
                <span className=' text-secondary-green'>  authenticated </span>

            }

        </div>
    );
};

export default page;