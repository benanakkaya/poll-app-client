import React from 'react'
import { json, Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {toast} from "react-toastify"
import { useContext } from 'react';
import { UsersContext } from '../contexts/Users';

export default function Login() {

  const navigate = useNavigate();
  const {setIsLoginned,setLoginnedUser} = useContext(UsersContext);


  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async (values) => {
      await axios.post("http://localhost:5000/users/login",
        {
          username: values.username,
          password: values.password
        }).then((res) => {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoginned(true);
          setLoginnedUser(res.data.user);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/")
        })
        .catch((err) => {
          toast.error(`${err.response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
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
      username: yup.string().required("Lütfen kullanıcı adınızı giriniz!."),
      password: yup.string().required("Lütfen parolanızı giriniz!"),
    })
  })

  return (
    <div className='container flex justify-center py-12 items-center '>
      <div className='flex flex-col items-center justify-start gap-y-5 outline p-4 outline-primary'>
        <h1 className='text-2xl text-primary'>GİRİŞ YAP </h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-start gap-y-3 w-max' >
          <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
            Kullanıcı Adı
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="username" placeholder='Kullanıcı Adı / Email' className='outline-none flex-1 text-dark' />
          </label>
          <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
            Parola
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" placeholder='*********' type="password" className='outline-none flex-1 text-dark' />
          </label>
          {/* Error Messages */}
          {formik.touched.username && formik.errors.username ?
            <small className='text-red-400'>{formik.errors.username}</small> :
            formik.touched.password && formik.errors.password ?
              <small className='text-red-400'>{formik.errors.password}</small> : null}
          <button type='submit' className='bg-primary text-secondary py-2 w-full'>Giriş Yap</button>
          <small>Henüz üye değil misin? <span><Link className="text-primary" to="/register">Kayıt Ol</Link></span></small>
        </form>
      </div>
    </div>
  )
}
