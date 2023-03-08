import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BiSmile } from "react-icons/bi";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(
    ArcElement,
    Tooltip,
    Legend
);


export default function PollResults({ poll, showResult, setShowResult }) {

    const [updatedPoll, setUpdatedPoll] = useState([]);

    //Graphic Settings

    const data = {
        labels: updatedPoll.choices?.map((choice) => choice.text ),
        datasets: [{
            label: "Oy Sayısı",
            data: updatedPoll.choices?.map((choice) => choice.voteCount ),
            backgroundColor: ["rgba(255,174,201)", "rgba(239,228,176)","rgba(198,236,81)","rgba(153,217,234)","rgba(112,146,190)","rgba(200,191,231)"],
            borderColor: ["rgba(255,174,201)", "rgba(239,228,176)","rgba(198,236,81)","rgba(153,217,234)","rgba(112,146,190)","rgba(200,191,231)"]
        }],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
            display: true,
            position: "right",
            labels : {
                boxHeight: 8,
                boxWidth: 8
            }
        },
        datalabels: {
            formatter: (value) =>  {
                return value + "%"
            }
        }
    }
        
    };

    const fetchPollResult = async (pollID) => {
        const res = await axios.post("https://difficult-red-binturong.cyclic.app/polls/fetchPollResult", { pollID });
        setUpdatedPoll(res.data.results)
    }


    useEffect(() => {
        fetchPollResult(poll._id);
    }, [showResult])

    return (
        <div className='flex flex-col items-center justify-center gap-y-2'>
            {showResult === false ?
                <>
                    <BiSmile className='text-green-600 text-4xl' />
                    <h5>Tebrikler, oyunuzu başarılı bir şekilde verdiniz!</h5>
                    <button onClick={() => setShowResult(true)} className='text-primary'>Sonuçları Göster</button>
                </>
                :
                <div>
                    <Doughnut className='w-64' data={data} options={options} />
                </div>
            }
        </div>
    )
}
