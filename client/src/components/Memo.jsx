import React from 'react'
import { ethers} from "ethers";
import { useState, useEffect} from 'react';

export default  function Memo({state}) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <>
      <p className='text-center'>Messages</p>
      <div className='w-full mt-4 text-lg  flex flex-col flex-nowrap'>  
      {memos.map((memo) => {
        return (
          <div className='mt-4 w-full flex memo-div' key={memo.timestamp}>
            <p className='inline p-2 td-1 bg-red-200 border-r-2 border-red-800 '>{memo.name}</p>
            <p className='inline p-2 td-2 bg-red-200 border-r-2 border-red-800'>{new Date(memo.timestamp * 1000).toLocaleString()}</p>
            <p className='inline p-2 td-3 bg-red-200 border-r-2 border-red-800 break-normal'>{memo.message}</p>
            <p className='inline p-2 td-4 bg-red-200 break-all'>{memo.from}</p>
          </div>
        )})}
      </div>
        </>
  )
  }