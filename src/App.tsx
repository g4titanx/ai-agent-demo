import { useState } from 'react';
import { ethers } from 'ethers';
import ChatInterface from './components/ChatInterface';

export default function App() {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">CDP Agent Demo</h1>
          <p className="text-sm text-gray-500">Proof of Concept - Static Version</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4">
        {!isConnected ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Connect Your Wallet</h2>
            <button
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <ChatInterface userAddress={address} />
        )}
      </main>
    </div>
  );
}