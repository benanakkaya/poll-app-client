import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {

    const navigate = useNavigate();

    //Kayıt için geçerli son tarihin seçimi (Min 10 Yaş Şeklinde)
    const today = new Date().getFullYear() - 10 + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            password2: "",
            email: "",
            gender: "",
            birthday: ""
        },
        onSubmit: async (values) => {
            await axios.post("http://localhost:5000/users/register",
                {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    gender: values.gender,
                    birthday: values.birthday
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
                    navigate("/login")
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
            username: yup.string().min(3, "Kullanıcı adı çok kısa!").max(13, "Kullanıcı adı çok uzun!").required("Lütfen bir kullanıcı adı giriniz!."),
            email: yup.string().email("Lütfen geçerli bir e-mail adresi girin!").required("Lütfen e-mail adresinizi giriniz!"),
            password: yup.string().min(6, "Parolanız çok kısa").max(15, "Parolanız çok uzun!").required("Lütfen parolanızı giriniz!"),
            password2: yup.string().required("Lütfen doğrulama parolasını giriniz!").oneOf([yup.ref("password"), null], "Parolalar eşleşmiyor!"),
            gender: yup.string().required("Lütfen cinsiyetinizi seçin!"),
            birthday: yup.date("Lütfen geçerli bir tarih girin").min('1940-01-01').max(today).required("Lütfen doğum tarihinizi seçin!")
        })
    })


    return (
        <div className='container flex justify-center py-12 items-center '>
            <div className='flex flex-col items-center justify-start gap-y-5 outline p-4 outline-primary'>
                <h1 className='text-2xl text-primary'>KAYIT OL</h1>
                <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-start gap-y-3 w-max' >
                    <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
                        Kullanıcı Adı
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="username" placeholder='username' className='outline-none flex-1 text-dark' />
                    </label>
                    <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
                        Parola
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" placeholder='**********' type="password" className='outline-none flex-1 text-dark' />
                    </label>
                    <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
                        Parola (Tekrar)
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="password2" placeholder='**********' type="password" className='outline-none flex-1 text-dark' />
                    </label>
                    <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
                        E-mail
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" placeholder='name@mail.com' type="email" className='outline-none flex-1 text-dark' />
                    </label>
                    <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
                        Cinsiyet
                        <div className='flex justify-center items-center flex-1 text-dark'>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="gender" value="Kadın" type="radio" className='outline-none flex-1 accent-primary ' /> Kadın
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="gender" value="Erkek" type="radio" className='outline-none flex-1 accent-primary' /> Erkek
                        </div>
                    </label>
                    <label className='flex gap-x-2 outline outline-primary py-1 px-3 text-primary w-full'>
                        Doğum Tarihi
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="birthday" type="date" className='outline-none flex-1 text-dark' />
                    </label>
                    {/* Error Messages */}
                    {formik.touched.username && formik.errors.username ?
                        <small className='text-red-400'>{formik.errors.username}</small> :
                        formik.touched.password && formik.errors.password ?
                            <small className='text-red-400'>{formik.errors.password}</small> :
                            formik.touched.password2 && formik.errors.password2 ?
                                <small className='text-red-400'>{formik.errors.password2}</small> :
                                formik.touched.email && formik.errors.email ?
                                    <small className='text-red-400'>{formik.errors.email}</small> :
                                    formik.touched.gender && formik.errors.gender ?
                                        <small className='text-red-400'>{formik.errors.gender}</small> :
                                        formik.touched.birthday && formik.errors.birthday ?
                                            <small className='text-red-400'>{formik.errors.birthday}</small> : null}
                    <button type='submit' className='bg-primary text-secondary py-2 w-full'>Kayıt Ol</button>
                    <small>Zaten Üye Misin? <span><Link className="text-primary" to="/login">Giriş Yap</Link></span></small>
                </form>
            </div>
        </div>
    )
}
