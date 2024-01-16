import Image from 'next/image'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { link } from 'fs';


const inter = Inter({ subsets: ['latin'] })

// interface test {
//   id : string
//   name : string;
// }

export default function Home() {
  const [data, setData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    axios.get('https://api.pulse-clinic.com/menus/Search?txt=covid&lang=en').then((response) => {
        console.log(response)
        setData(response.data)
        // setTimeout(() => {
        //   setData(response.data)
        //   console.log(data)
        // }, );
    });

  }, []);
  
    const handleItemClick = (itemId:string) => {
      router.push(`https://www.pulse-clinic.com/${itemId}`);
    };

  // console.log(data)
  return (
    <main className="bg-black text-white flex flex-wrap ">
       {/* {data?.map((item:any,index:number) => ( */}
        {data?.filter((word:any) => word.title.includes('Sex')).map((item:any,index:number) => (
            <div key={item.id} className="w-1/3 p-4 cursor-pointer"
            onClick={() => handleItemClick(item.id)}
            >
              <div style={{height:'350px'}}>
                <img style={{height:'350px'}} src={item.img} alt={item.img} className="w-full pb-4 object-cover"/>

              </div>

              <div className='h-52 p-4 border-2 border-pink-300 border-t-black'>
                <div className="pb-4 font-bold text-3xl">{item.title}</div>
                <div className='text-xl'>{item.short_description}</div>
              </div>       
            </div>
        ))}
    </main>
  )
}
