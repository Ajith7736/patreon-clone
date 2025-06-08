'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { fetchuser, updateuser } from '@/actions/useractions';
import toast from 'react-hot-toast';

function page() {
  const [form, setform] = useState({})
  const { data: session, status, update } = useSession()
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard"
  }, [])
  

  useEffect(() => {
    if(status == "loading") return;
    getuserdetails()
    if (!session) {
      router.replace('/login');
    }

  }, [session, status, router]);


  const handlechange = (e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }
  
  const getuserdetails = async ()=>{
     let u = await fetchuser(session?.user?.name);
     setform(u)
  }

  const handleSubmit = async ()=>{
    update()
    console.log(session)
    let a = await updateuser(form,session?.user?.username,session?.user?.name)
    if(a){
      alert(a.error)
    }else{
      toast.success("User updated successfully")
    }
  }
  return (
    <div>
      {status === 'loading' ? <Loading /> : <>
       <div className='my-10 mx-4 text-text-col'>
        <div className=' bg-primary-dark border border-border-col  py-9 gap-4 flex flex-col px-3 w-full lg:w-[80vh] lg:mx-auto rounded-lg'>
            <div className='text-2xl font-extrabold text-center'>Welcome to your Dashboard</div>
            <input type="text" name='name' value={form.name?form.name:""} onChange={handlechange} className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Name' />
            <input type="text" name='email' value={form.email?form.email:""} onChange={handlechange} className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Email' />
            <input type="text" name='username' value={form.username?form.username:""} onChange={handlechange}  className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Username' />
            <input type="text" name='profilepic' value={form.profilepic?form.profilepic:""} onChange={handlechange} className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Profile Picture' />
            <input type="text" name='coverpic' value={form.coverpic?form.coverpic:""} onChange={handlechange} className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Cover Picture' />
            <input type="text" name='razorid' value={form.razorid?form.razorid:""} onChange={handlechange} className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Razor Pay Id' />
            <input type="password" name='razorsecret' value={form.razorsecret?form.razorsecret:""} onChange={handlechange} className='bg-primary border border-border-col  w-full focus:outline-none p-3 rounded-md' placeholder='Enter Razor Pay Secret' />
            <button className=' bg-secondary text-primary p-2 rounded-md text-center hover:bg-secondary-dark md:text-base font-bold' onClick={handleSubmit}>Save</button>
          </div>
       </div>
          
      </>}
    </div>
  )
}

export default page
