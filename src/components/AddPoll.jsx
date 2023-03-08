import React, { useState } from 'react'
import { MdRemoveCircle } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai"
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from "yup";
import axios from 'axios';

export default function AddPoll() {

  const [choices, setChoices] = useState([{ text: "" }, { text: "" }]);
  const [pollTimer, setPollTimer] = useState(false);


  const formik = useFormik({
    initialValues: {
      title: "",
      category: "Spor",
      expiresDate: null
    },
    onSubmit: async (values) => {
      await axios.post("https://difficult-red-binturong.cyclic.app/polls/addPoll",
        {
          title: values.title,
          category: values.category,
          expiresDate: values.expiresDate,
          choices: choices
        }).then(() => {
          toast.success('Anket başarıyla oluşturuldu!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Lütfen bir anket başlığı girin!").min(8, "Anket başlığı çok kısa!").max(45, "Anket başlığı çok uzun!"),
      category: yup.string(),

    })
  })

  const updateChoices = (e) => {
    const updatedChoices = choices.map((choice, ind) => {
      if (ind === Number(e.target.name)) {
        return { text: e.target.value }
      }
      else {
        return choice
      }
    })
    setChoices(updatedChoices);
  }

  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { text: "" }])
    }
    else {
      toast.error('Bir anket en fazla 6 şık içerebilir!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  const deleteChoice = (index) => {
    if (choices.length > 2) {
      const updatedChoices = choices.filter((choice, ind) => (ind !== index));
      setChoices(updatedChoices)
    }
    else {
      toast.error('Bir ankette en az 2 şık olmalıdır!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className='container py-8 px-4 lg:px-0'>
      <h3 className='text-2xl p-2 lg:p-1 underline mb-4'>Yeni Anket Ekle</h3>
      <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center items-start md:items-center outline  outline-primary p-4 gap-y-6 '>

        <div className='flex flex-col gap-y-3 w-full md:w-auto'>
          <label>Başlık:</label>
          <input onChange={formik.handleChange} placeholder='Başlık' name='title' className='border-2 border-primary py-1 px-2 outline-none md:w-96' type="text" />
        </div>
        <div className='flex flex-col gap-y-3 w-full md:w-auto'>
          <label>Kategori</label>
          <select onChange={formik.handleChange} className='border-2 border-primary p-1 outline-none w-full md:w-96' name="category">
            <option value="Spor">Spor</option>
            <option value="Müzik">Müzik</option>
            <option value="Sanat">Sanat</option>
            <option value="Sinema">Sinema</option>
            <option value="Sosyal">Sosyal</option>
            <option value="İş Dünyası">İş Dünyası</option>
            <option value="Siyaset">Siyaset</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>

        <div className='flex flex-col gap-y-3 w-full md:w-auto'>
          <label>Anket Tipi:</label>
          <div className='flex justify-center items-center gap-x-4 border-2 md:w-96 border-primary py-1 px-2'>
            <label onChange={() => setPollTimer(false)} className='flex items-center gap-x-4'>Süresiz Anket<input name='pollTimer' value={false} type="radio" /></label>
            <label onChange={() => setPollTimer(true)} className='flex items-center gap-x-4'>Süreli Anket<input name='pollTimer' value={true} type="radio" /></label>
          </div>
        </div>
        {pollTimer === true ?
          <div className='flex flex-col gap-y-3 w-full md:w-auto'>
            <label>Sonlanma Tarihi:</label>
            <div className='flex items-center gap-x-4 border-2 md:w-96 border-primary py-1 px-2'>
              <input onChange={formik.handleChange} name='expiresDate' className='outline-none flex-1' type="date" />
            </div>
          </div>
          : null}
        <div className='flex flex-col gap-y-3 w-full md:w-auto'>
          <label>Seçenekler:</label>
          {choices.map((choice, ind) => (
            <div className='flex items-center gap-x-4 border-2 md:w-96 border-primary py-1 px-2'>
              <input onChange={(e) => updateChoices(e)} name={ind} placeholder={`Seçenek ${ind + 1}`} className='outline-none flex-1' type="text" />
              <button onClick={() => deleteChoice(ind)} className='text-red-600'><MdRemoveCircle /></button>
            </div>
          ))}
          <div className='flex items-center gap-x-4 border-2 w-full md:w-96 border-primary py-1 px-2'>
            <input onClick={addChoice} placeholder='Yeni Seçenek Ekle' className='outline-none flex-1 cursor-pointer' type="text" />
            <button onClick={addChoice} className='text-green-600'><AiFillPlusCircle /></button>
          </div>
          <button type='submit' className='bg-primary text-secondary py-1 w-full md:w-96 '>Anketi Oluştur</button>
        </div>

      </form>
    </div>
  )
}
