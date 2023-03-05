import React, { useState } from 'react';
import { useFormik } from 'formik';
import PollResults from './PollResults';
import * as yup from "yup"
import axios from 'axios';
import { useContext } from 'react';
import { UsersContext } from '../contexts/Users';
import { useEffect } from 'react';

export default function Poll({ poll }) {

    const {votedPolls,setVotedPolls} = useContext(UsersContext);

    const [voted, setVoted] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if(votedPolls.includes(poll._id)){
            //Eğer varsa, tekrardan oy kullanamıyor sadece sonuçları görebiliyor
            setVoted(true);
        }
    },[votedPolls])

    const formik = useFormik({
        initialValues: {
            choiceID: null
        },
        onSubmit: async (values) => {
            await axios.post("http://localhost:5000/polls/votePoll", { pollID: poll._id, choiceID: values.choiceID })
            setVoted(true);
            const newVotedPolls = [...votedPolls,poll._id];
            setVotedPolls(newVotedPolls);
            localStorage.setItem("votedPolls", JSON.stringify(newVotedPolls) );    
        },
        validationSchema: yup.object().shape({
            choiceID: yup.string().required("Lütfen önce seçiminizi yapın!")
        })
    })

    return (
        <form onSubmit={formik.handleSubmit} className='p-2 outline outline-primary flex flex-col justify-between h-72 rounded-sm'>
            <h4 className="flex items-center justify-between px-1 font-bold border-b pt-2 pb-3 border-primary">{poll.title} <span className='text-red-300'><small>#{poll.category}</small></span></h4>

            {voted === false ?
                <div className='flex flex-col p-2'>
                    {poll.choices.map((choice) => (
                        <div key={choice._id} className='flex gap-x-4'>
                            <input onChange={formik.handleChange} type="radio" name='choiceID' value={choice._id} />
                            <label>{choice.text} </label>
                        </div>
                    ))}
                </div>
                :
                <PollResults showResult={showResult} setShowResult={setShowResult} poll={poll} />
            }
            {formik.errors.choiceID ? <small className='text-red-400'>{formik.errors.choiceID}</small> : null}
            <button
                disabled={voted === true ? true : false}
                type='submit'
                className={showResult === true ? "hidden" : `${voted === true ? 'bg-green-600' : 'bg-primary'} text-secondary`}>
                {voted === true ? "Oyunuzu Kullandınız" : "OYLA"}
            </button>

        </form>
    )
}
