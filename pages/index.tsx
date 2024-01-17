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
  const [Result, setResult] = useState<string>("");
  const [filterOption, setFilterOption] = useState<any>(10); 

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

  const handleSearch = (e:any) => {
    setResult(e.target.value);
  }

  const handleFilter = (e:any) => {
    setFilterOption(Number(e.target.value));
    // console.log("testtsetsetest", data.length)
  }

  return (
    <main className="bg-black">
      <div className='flex justify-center h-10'>
        {/* SearchBar */}
        <input type="text" placeholder="Search.."
        onChange={handleSearch}
        className='w-1/4 text-black text-center'
        ></input>

        {/* DropdownBar */}
        <select name="test" id="test"
        onChange={handleFilter}
        className='w-28 bg-red-500 text-center'
        >
          <option value={10}>10</option>
          {/* test */}
          <option value={1}>1</option>
          <option value={5}>5</option>
          {/* test */}
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={data ? data.length : "All"}>All</option>
        </select>
      </div>
       
      <div className='text-white flex flex-wrap'>
        {/* {data?.map((item:any,index:number) => ( */}
        {data?.filter((word:any) => word.title.includes(Result)).slice(0, Number(filterOption)).map((item:any,index:number) => (
            <div key={item.id} className="w-1/3 p-4 cursor-pointer"
              onClick={() => handleItemClick(item.id)}
              >
                <div style={{height:'350px'}}>
                  <img style={{height:'350px'}} 
                  src={item.img} 
                  alt={item.img} 
                  className="w-full pb-4 object-cover"/>
                </div>

                <div className='h-52 p-4 border-2 border-pink-300 border-t-black'>
                  <div className="pb-4 font-bold text-3xl">{item.title}</div>
                  <div className='text-xl'>{item.short_description}</div>
                </div>       
            </div>
          ))}

      </div>
    </main>
  )
}
