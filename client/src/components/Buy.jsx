import React from 'react';
import { useState } from 'react';
import { ethers} from "ethers";

export default function Buy({state}) {

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleMsgChange = (event) => {
    setMsg(event.target.value);
  };

  const buyCoffee =  async (event) => {
    event.preventDefault();
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.0001") };
    const transaction = await contract.buyCoffee(name, msg, amount);
    setName("")
    setMsg("")
    await transaction.wait();
    window.location.reload();
    console.log("Transaction is done");
  };

  return (
    <div className='container mx-auto'>
        <form  onSubmit={buyCoffee}>

          <div className='mb-4'>
            <label className='block'>Name</label>
            <input
              type="text"
              onChange={handleNameChange}
              placeholder="Enter Your Name"
              className='border-2 border-red-800 rounded w-2/4 h-10 p-2'
            />
          </div>

          <div className='mb-4'>
            <label className='block'>Message</label>
            <input
              type="text"
              maxLength="100"
              onChange={handleMsgChange}
              placeholder="Enter Your Message"
              className='border-2 border-red-800 rounded w-full h-10 p-2'
            />
          </div>
          
          <button type="submit" disabled={!state.contract} className='bg-red-800 text-white p-2 rounded w-14'>
            Pay
          </button>
        </form>
    </div>
  )
}
