import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from 'react';
import { UsersContext } from '../contexts/Users';

export default function Navbar() {

    const { isLoginned, loginnedUser, setIsLoginned, setLoginnedUser } = useContext(UsersContext);

    const handleLogout = () => {
        setIsLoginned(false);
        setLoginnedUser({});
    }

    return (
        <div className='flex justify-between items-center py-6 px-6 md:px-12 bg-primary text-secondary'>
            <div>
                <Link className='text-3xl' to="/">PollApp</Link>
            </div>

            <div className='hidden md:flex items-center justify-center gap-x-1 md:gap-x-2 lg:gap-x-4'>
                {isLoginned === true ? <Link className='hover:text-yellow-300' to="/add-poll">Yeni Anket</Link> : null}
                <Link className='hover:text-yellow-300' to="/poll-archive">Anketlere Gözat</Link>
                {isLoginned === false ?
                    <>
                        <Link className='hover:text-yellow-300' to="/register">Kayıt Ol</Link>
                        <Link className='hover:text-yellow-300' to="/login">Giriş Yap</Link>
                    </>
                    :
                    <>
                        <small>Hoşgeldin {loginnedUser.username}</small>
                        <button className='hover:text-yellow-300' onClick={handleLogout} >Çıkış Yap</button>
                    </>
                }
            </div>
            <div className='block md:hidden cursor-pointer border-2 border-solid border-white rounded-md p-1'>
                <AiOutlineMenu className='text-xl' />
            </div>
        </div>
    )
}
