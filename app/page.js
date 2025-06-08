'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
export default function Home() {
 const { data: session ,status } = useSession()
  const router = useRouter();

  useEffect(()=>{
    AOS.init({
      duration: 1000,
      once: true,})
  },[])

   useEffect(() => {
    if (status === 'loading') return;
    if(!session){
      router.push('/login')
    }

  }, [status]);

  function handlestart(){  
     if(!session){
      router.push("/login")
     }else{
      router.push(`/${session?.user?.name}`)
     }
  }
  return (
  
    <div className="text-text-col">
        {status === 'loading' ? <Loading /> : <>
         <div data-aos="fade-up" className="header h-[92vh] flex flex-col items-center gap-3 justify-center">
        <div className="text-center font-extrabold text-5xl md:text-8xl text-secondary">By Me a Chai</div>
        <div className="text-center text-2xl md:text-md font-bold">A Platform for creators,<br />Get Started now</div>
        <div className="flex gap-2">
          <button onClick={handlestart} className="bg-secondary px-3 py-2 text-primary hover:bg-secondary-dark rounded-full font-bold">Start Now</button>
          <button className="bg-secondary px-3 py-2 text-primary hover:bg-secondary-dark rounded-full font-bold">Read More</button>
        </div>
      </div>
      <div className="bg-primary-dark py-10 lg:py-0 lg:h-[100vh] flex flex-col items-center justify-center lg:flex-row lg:justify-around gap-10 ">
        <div data-aos="fade-up" className="flex flex-col items-center">
          <div className="text-secondary font-extrabold text-4xl text-center">Your fans can <br /> buy you a coffee</div>
          <div className="text-text-col text-center text-xl mt-4 text-cent font-bold ">Support your favorite creators by <br /> buying them a coffee or chai.</div>
          <span><img src="/cup.png" className="w-20 mt-5" alt="" /></span>
        </div>
        <div data-aos="fade-up" className="flex flex-col items-center mt-10 lg:mt-0">
          <div className="text-secondary font-extrabold text-4xl text-center">Your fans can <br /> buy you a coffee</div>
          <div className="text-text-col text-center text-xl mt-4 text-cent font-bold ">Support your favorite creators by <br /> buying them a coffee or chai.</div>
          <span><img src="/cup.png" className="w-20 mt-5" alt="" /></span>
        </div>
        <div data-aos="fade-up" className="flex flex-col items-center mt-10 lg:mt-0">
          <div className="text-secondary font-extrabold text-4xl text-center">Your fans can <br /> buy you a coffee</div>
          <div className="text-text-col text-center text-xl mt-4 text-cent font-bold ">Support your favorite creators by <br /> buying them a coffee or chai.</div>
          <span><img src="/cup.png" className="w-20 mt-5" alt="" /></span>
        </div>
      </div>
      </>}
    </div>
  );
}
