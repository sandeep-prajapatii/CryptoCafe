import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from "./contract/cafe.json"
import './App.css'
import Buy from './components/Buy'
import Memo from './components/Memo'
import profile from '../src/assets/1.jpg'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async() => {
      const contractAddress = "0x1Dce9cc59701115dDf2015b2B50150Bf07091aa2"
      const myabi = abi.abi;

      try{
        const {ethereum} = window;

        if (ethereum){
          const account = await ethereum.request({method: "eth_requestAccounts"});

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, myabi, signer)
        setAccount(account);
        setState({provider, signer, contract});
      } else {
        alert("Please install metamask");
      }
      } catch(error){
        console.log(error)
      }
    }
    connectWallet();
  }, []);

  return (
    <div className='App'>

    <div className='bg-red-800 h-52 flex justify-center items-center banner-div'>
      <p className='text-white text-center text-5xl font-black banner'>Fueling dreams, <span className='whitespace-nowrap'>0ne cup at a time</span></p>
    </div>

    <img src={profile}  alt='profile' className='h-40 rounded-full mx-auto  relative bottom-8 border-solid border-2 border-red-800'/>
    <a href='https://github.com/sandeep-prajapatii/CryptoCafe/blob/main/README.md' target="_blank"><i className="fa-regular fa-circle-question text-red-800 help"/></a>

    <div className='container mx-auto text-center'>
      <p className='text-2xl mb-2'>Sandeep Prajapati</p>
      <p>A Computer Science Student / Blockchain Developer / Frontend Developer</p>
    </div>

    <div className='p-4'>
    <Buy state={state} account={account} />

    <div className='container mx-auto my-4'>
      <p className='text-slate-500 break-all'>Connected Account: {account}</p>
    </div>

    <Memo state={state}/>
    </div>

    <footer className='flex flex-col bg-red-800 p-3'>
      <div className="flex justify-evenly">
        <a href='https://github.com/sandeep-prajapatii' target="_blank"><i className="fa-brands fa-square-github"/></a>
        <a href="mailto:sandeeprajapati18@gmail.com" target="_blank"><i className="fa-solid fa-envelope"/></a>
        <a href='https://www.linkedin.com/in/sandeep-prajapatii/' target="_blank"><i className="fa-brands fa-linkedin"/></a>
      </div>
    </footer>
    
    </div>
  )
}

export default App
