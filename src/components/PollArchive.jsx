import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import { UsersContext } from '../contexts/Users';
import Poll from './Poll';


export default function Homepage() {

    const [lastPolls, setLastPolls] = useState([]);


    const { votedPolls } = useContext(UsersContext);

    const fetchAllPolls = async () => {
        const res = await axios.get("https://difficult-red-binturong.cyclic.app/polls/fetchAllPolls");
        setLastPolls(res.data.polls)
        return res.data.polls;
    }

    useEffect(() => {
        fetchAllPolls();
    }, [])

    const handleNoVotedFilter = async (e) => {
        if (e) {
            const newPollList = lastPolls.filter((poll) => (!votedPolls.includes(poll._id)));
            setLastPolls(newPollList);
        } else {
            let newList = await fetchAllPolls();
            const categoryValue = document.getElementById("category").value;
            if (categoryValue !== "All") {
                newList = newList.filter((poll) => (poll.category === categoryValue));
            }
            setLastPolls(newList);
        }
    }

    const handleCategoryFilter = async (e) => {
        let newPList = await fetchAllPolls();
        const noVoteFilterState = document.getElementById("noVoted").checked;
        if (e.target.value === "All") {
            if (noVoteFilterState === true) {
                newPList = newPList.filter((poll) => (!votedPolls.includes(poll._id)));
            }
            setLastPolls(newPList);
        } else {

            if (noVoteFilterState === true) {
                newPList = newPList.filter((poll) => (!votedPolls.includes(poll._id)));
            }
            const newPollList = newPList.filter((poll) => (poll.category === e.target.value));
            setLastPolls(newPollList);

        }
    }


    return (
        <div className='container py-8  px-4 lg:px-0'>
            <h3 className='text-2xl p-2 lg:p-1 underline'>Güncel Anketler</h3>

            <div className='py-2 px-3 bg-orange-100'>
                <form className='flex flex-col  items-start justify-center md:flex-row md:justify-start gap-y-4  md: gap-x-10'>
                    <label className='flex items-center w-full md:w-auto gap-x-4'>
                        Kategori :
                        <select className='flex-1 md:flex-auto' id="category" onChange={(e) => handleCategoryFilter(e)} name='categoryFilter'>
                            <option value="All">Tüm Kategoriler</option>
                            <option value="Spor">Spor</option>
                            <option value="Müzik">Müzik</option>
                            <option value="Sanat">Sanat</option>
                            <option value="Sinema">Sinema</option>
                            <option value="Sosyal">Sosyal</option>
                            <option value="İş Dünyası">İş Dünyası</option>
                            <option value="Siyaset">Siyaset</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                    </label>
                    <label className='flex items-center gap-x-4'>
                        Sadece Oylanmamış Anketleri Göster :
                        <input onChange={(e) => handleNoVotedFilter(e.target.checked)} type="checkbox" id="noVoted" name='noVoted' />
                    </label>
                </form>
            </div>

            <div className='grid grid-cols-1 p-2 lg:p-1 lg:grid-cols-3 gap-3 my-3'>
                {lastPolls.map((poll) => (
                    <Poll key={poll._id} poll={poll} />
                ))}
            </div>


        </div>
    )
}
