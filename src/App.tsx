import { useState } from 'react';
import { Web3Modal } from '@web3modal/react';
import ChatInterface from './components/ChatInterface';

export default function App() {
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting:', error);
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CDP Agent Demo</h1>
            <p className="text-sm text-gray-500">xAI Powered Blockchain Assistant</p>
          </div>
          {address ? (
            <div className="text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4">
        {address ? (
          <ChatInterface userAddress={address} />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500">Please connect your wallet to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
}
