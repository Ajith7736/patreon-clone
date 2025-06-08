'use client'

import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { fetchuser } from '@/actions/useractions';
import { fetchpayments, initiate } from '@/actions/useractions';
import { useState } from "react";
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';


function page({ params }) {
  let username = params.username.replaceAll("%20"," ")
  const [notfound, setnotfound] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter();
  const [paymentform, setpaymentform] = useState({name:"",message:"",amount:""})
  const [currentuser, setcurrentuser] = useState({})
  const [payment, setpayment] = useState([])
  const searchparams = useSearchParams()

  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }



  useEffect(() => {
    document.title = `${username}`
    if(searchparams.get("paymentdone") == "true"){
      toast.success("Thanks for your donation")
      router.replace(`/${username}`)
    }
  }, [])
  

  
  useEffect(() => {
    getdata()
    getpayments()
  }, [])



  useEffect(() => {
    if (status === 'loading' || notfound === false) return;
    if (!session) {
      router.push('/login');
    }
  }, [session, status]);

  const getdata = async () => {
    let u = await fetchuser(username)
    if(u.Error){
      setnotfound(true)
    }else{
      setcurrentuser(u)
    }
  }

  if(notfound){
    return (
    <div className='h-[90vh] flex justify-center items-center bg-primary'>
      <div className="text-center p-10">
      <h1 className="text-4xl text-text-col font-bold">404 - User Not Found</h1>
      <p className="mt-4 text-text-col-light">The page you are looking for does not exist.</p>
    </div>
    </div>
  )
  }

  const getpayments = async () => {
    let dbpayments = await fetchpayments(username)
    let truepayments = await dbpayments?.filter((item)=>{
      if(item.done == true){
        return item
      }
    })
   setpayment(truepayments)
  }


  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderid = a.id;
    var options = {
      "key": currentuser.razorid,
      "amount": amount,
      "currency": "INR",
      "name": "Get me a chai",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000",
      }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  return (
    <>
      {status === 'loading' ? <Loading /> : <>
        <>
          <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        </>
        <div className=' w-full h-[60vh] relative flex flex-col items-center text-text-col'>
          <img className='object-cover w-full h-[60vh]' src={session?.user?.coverimg} alt="" />
          <img className='absolute bottom-[-60px] w-[140px] rounded-full' src={session?.user?.image} alt="" />
        </div>
        <div className='my-20 text-text-col text-2xl text-center font-bold'>
          @{session?.user.username}
          <div className='text-xl'>Hey there my name is {username}</div>
          <div className='text-sm text-text-col-light'>{payment.length} Payments - ₹{payment.reduce((a,b)=> a + b.amount , 0)} Raised</div>
        </div>
        <div className='bg-primary pb-10 payment p-4 text-text-col flex flex-col gap-5 lg:flex-row'>
          <div className='bg-primary-dark border border-border-col overflow-y-auto no-scrollbar w-full h-[60vh] py-9 px-2 gap-4 flex flex-col  rounded-lg'>
            <div className='text-2xl font-extrabold text-center'>Supporters</div>
            <ul className='flex flex-col gap-3'>
              <div className='font-bold'>{payment.length == 0 && "No payments yet"}</div>
              {payment.map((item) => {
                return <li key={item._id} className='bg-primary p-2 border border-border-col rounded-lg flex items-center gap-3'>
                  <div className="relative min-[310px]:w-6 min-[310px]:h-6 w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute min-[310px]:w-8 min-[310px]:h-8 w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                  <div className='text-xs lg:text-base'>{item.name} donated ₹{item.amount} with a message "{item.message}"</div>
                </li>

              })}


            </ul>
          </div>
          <div className=' bg-primary-dark border border-border-col  py-9 gap-4 flex flex-col px-3 w-full rounded-lg'>
            <div className='text-2xl font-extrabold text-center'>Make Payment</div>
            <input onChange={handlechange} name='name' value={paymentform.name ? paymentform.name : ""} type="text" className='bg-primary border border-border-col  w-full focus:outline-none p-1 rounded-md' placeholder='Enter Name' />
            <input onChange={handlechange} name='message' value={paymentform.message ? paymentform.message : ""} type="text" className='bg-primary border border-border-col  w-full focus:outline-none p-1 rounded-md' placeholder='Enter Message' />
            <input onChange={handlechange} name='amount' value={paymentform.amount ? paymentform.amount : ""} type="text" className='bg-primary border border-border-col  w-full focus:outline-none p-1 rounded-md' placeholder='Enter Amount' />
            <button className=' bg-secondary text-primary p-2 rounded-md text-center hover:bg-secondary-dark md:text-base font-bold disabled:bg-primary-dark disabled:text-text-col disabled:border disabled:border-gray-400' onClick={() => pay(paymentform.amount * 100)} disabled={paymentform?.name?.length<3 || paymentform?.message?.length<4 || paymentform?.amount?.length<1}>Pay</button>
            <div className='flex gap-3'>
              <button className=' bg-primary text-texl-col border border-border-col p-2 rounded-md text-center  md:text-base font-bold' onClick={() => { setpaymentform({ ...paymentform, amount: 20 }) }}>Pay ₹20</button>
              <button className=' bg-primary text-texl-col border border-border-col p-2 rounded-md text-center  md:text-base font-bold' onClick={() => { setpaymentform({ ...paymentform, amount: 50 }) }}>Pay ₹50</button>
              <button className=' bg-primary text-texl-col border border-border-col p-2 rounded-md text-center  md:text-base font-bold' onClick={() => { setpaymentform({ ...paymentform, amount: 100 }) }}>Pay ₹100</button>
            </div>
          </div>
        </div>

      </>}
    </>
  )
}

export default page;
