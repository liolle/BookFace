'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, forwardRef } from 'react';

interface NavButtonProps {
    route?:string,
    text?:string,
    children?:ReactNode,
    action?:Function
}

const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>((props, ref) => {
    const router = useRouter();

    const execute = () => {
        if (props.action) return props.action();
        if (props.route) return router.push(props.route);
    };

    return (
        <button
            ref={ref} 
            className="bg-primary-white hover:bg-secondary-green text-primary-green hover:text-white font-bold py-2 px-4 rounded border-2 border-primary-green"
            onClick={()=>execute()}
        >
            {props.children}
        </button>
    );
});

export default NavButton;