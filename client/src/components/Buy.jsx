import React from 'react';
import { ethers} from "ethers";

export default function Buy({state}) {

  const buyCoffee =  async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);

    const amount = { value: ethers.utils.parseEther("0.0001") };

    const transaction = await contract.buyCoffee(name, message, amount);
    await transaction.wait();
    
    console.log("Transaction is done");
  };
  return (
    <div className='container mx-auto'>
        <form  onSubmit={buyCoffee}>

          <div className='mb-4'>
            <label className='block'>Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className='border-2 border-red-800 rounded w-2/4 h-10 p-2'
            />
          </div>

          <div className='mb-4'>
            <label className='block'>Message</label>
            <input
              type="text"
              id="message"
              maxLength="100"
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
