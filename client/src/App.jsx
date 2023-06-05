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
    <div className='bg-red-800 h-52 flex justify-center items-center'>
      <p className='text-white text-center text-5xl font-black'>Fueling dreams, <span className='whitespace-nowrap'>0ne cup at a time</span></p>
    </div>
    <img src={profile}  alt='profile' className='h-40 rounded-full mx-auto  relative bottom-8 border-solid border-2 border-red-500'/>
    <div className='p-4'>
    <Buy state={state} />
    <Memo state={state}/>
    </div>
    {/* <p>Connected Account: {account}</p> */}
    <footer>
      <div className="flex justify-evenly">
        <i class="fa-brands fa-square-github"></i>
        <i class="fa-solid fa-envelope"></i>
        <i class="fa-brands fa-linkedin"></i>
      </div>
    </footer>
    </div>
  )
}

export default App
