import React from 'react';

const Share = () => {
    return (
        <div className=' flex flex-col  gap-10 items-center justify-center p-5'>
            <div className=' w-full flex flex-col'>
                <span className=' text-[2rem] font-bold'>Facebook</span>
                <div className=' max-h-[500px] max-w-[700px]'>
                    <img className='w-full h-full bg-cover' src="https://d1plm5vzjawxy7.cloudfront.net/referralFB.png" alt="" sizes="" />
                </div>
            </div>
            <div className=' w-full flex flex-col'>
                <span className=' text-[2rem] font-bold'>Whatsapp</span>
                <div className=' max-h-[500px] max-w-[700px]'>
                    <img className=' ' src="https://d1plm5vzjawxy7.cloudfront.net/whatsApp.png" alt="" sizes="" />
                </div>
            </div>
            <div className=' w-full flex flex-col'>
                <span className=' text-[2rem] font-bold'>LinkedIn</span>
                <div className=' max-h-[500px] max-w-[700px]'>
                    <img className='w-full h-full bg-cover ' src="https://d1plm5vzjawxy7.cloudfront.net/RefferalLinkedIn.png" alt="" sizes="" />
                </div>
            </div>

            <div className=' w-full flex flex-col'>
                <span className=' text-[2rem] font-bold'>Twitter</span>
                <div className='  flex gap-5 items-center'>
                    <div className=' flex-1 max-h-[500px] max-w-[700px]'>
                        <span className=' text-[1.5rem] font-medium'>fresh link</span>
                        <img src="https://d1plm5vzjawxy7.cloudfront.net/fresh_liki_twitter.png" alt="" sizes="" />
                    </div>
                    <div className=' flex-1 max-h-[500px] max-w-[700px]'>
                        <span className=' text-[1.5rem] font-medium'>cached link</span>
                        <img src="https://d1plm5vzjawxy7.cloudfront.net/cached_liki_twitter.png" alt="" sizes="" />
                    </div>
                    <div className=' flex-1 max-h-[500px] max-w-[700px]'>
                        <span className=' text-[1.5rem] font-medium'>Posted link</span>
                        <img src="https://d1plm5vzjawxy7.cloudfront.net/twitter_posted.png" alt="" sizes="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Share;