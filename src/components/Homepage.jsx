import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Poll from './Poll';


export default function Homepage() {

    const [lastPolls,setLastPolls] = useState([]);

    const fetchLastPolls = async () => {
        const res = await axios.get("https://difficult-red-binturong.cyclic.app/polls/fetchLastPolls");
        setLastPolls(res.data.polls)
    }

    useEffect(() => {
        fetchLastPolls();
    }, [])


    return (
        <div className='container py-8 px-4 lg:px-0'>
            <h3 className='text-2xl p-2 lg:p-1 underline'>Son Eklenen Anketler</h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 p-2 lg:p-1 lg:grid-cols-3 gap-3 my-3'>
            {lastPolls.map((poll) => (
                <Poll key={poll._id} poll={poll} />
            ))}
            </div>
    

        </div>
    )
}
