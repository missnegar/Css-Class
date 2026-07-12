import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';
import QrCodeIcon from './icons/QrCodeIcon';
import CopyIcon from './icons/CopyIcon';
import EthereumIcon from './icons/EthereumIcon';
import PolygonIcon from './icons/PolygonIcon';
import SolanaIcon from './icons/SolanaIcon';
import { CiCoffeeCup } from "react-icons/ci";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MainTab = 'rial' | 'fiat' | 'crypto';
type CryptoTab = 'ethereum' | 'polygon' | 'solana';

const MainTabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`flex-1 p-3 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-indigo-500 ${active ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
        {children}
    </button>
);

const CryptoTabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${active ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
        {children}
    </button>
);

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [mainTab, setMainTab] = useState<MainTab>('rial');
  const [cryptoTab, setCryptoTab] = useState<CryptoTab>('ethereum');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-scale-up relative" onClick={e => e.stopPropagation()}>
            <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">حمایت از CSS CLASS</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <XIcon className="w-5 h-5 text-slate-500" />
                </button>
            </header>
            
            <div className="p-4 shrink-0">
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    <MainTabButton active={mainTab === 'rial'} onClick={() => setMainTab('rial')}>حمایت ریالی</MainTabButton>
                    <MainTabButton active={mainTab === 'fiat'} onClick={() => setMainTab('fiat')}>حمایت ارزی</MainTabButton>
                    <MainTabButton active={mainTab === 'crypto'} onClick={() => setMainTab('crypto')}>ارز دیجیتال</MainTabButton>
                </div>
            </div>

            <main className="p-6 pt-2 flex-grow overflow-y-auto no-scrollbar">
                {mainTab === 'rial' && (
                    <div className="text-center space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">می‌توانید از طریق روش‌های زیر از ما حمایت کنید.</p>
                         <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-md flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-right">
                                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                                <div>
                                    <div className="font-mono text-sm md:text-base text-slate-800 dark:text-slate-200 tracking-wider">6219-8618-1742-2628</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">بلو بانک | نگار کاظم نژاد</div>
                                </div>
                            </div>
                            <button onClick={() => handleCopy('6219861817422628')} className="p-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0">
                                <CopyIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <a 
                            href="https://www.coffeebede.com/negarkzn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-md w-full"
                        >
                            <CiCoffeeCup className="w-6 h-6" />
                            <span>کافی بده</span>
                        </a>
                    </div>
                )}
                {mainTab === 'fiat' && (
                     <div className="text-center space-y-4">
                        <div className="space-y-4 filter blur-sm opacity-50 cursor-not-allowed">
                            <p className="text-slate-600 dark:text-slate-400">برای حمایت ارزی می‌توانید از سرویس‌های زیر استفاده کنید.</p>
                            <div className="block p-4 bg-blue-500 text-white font-bold rounded-lg text-center">PayPal</div>
                            <div className="block p-4 bg-yellow-400 text-black font-bold rounded-lg text-center">Buy Me a Coffee</div>
                        </div>
                        <p className="text-center text-slate-500 dark:text-slate-400 mt-4 font-semibold">بزودی فعال میشه...</p>
                    </div>
                )}
                {mainTab === 'crypto' && (
                    <div>
                        <div className="flex justify-center gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg mb-4 flex-wrap">
                            <CryptoTabButton active={cryptoTab === 'ethereum'} onClick={() => setCryptoTab('ethereum')}><EthereumIcon className="w-5 h-5" /> اتریوم</CryptoTabButton>
                            <CryptoTabButton active={cryptoTab === 'polygon'} onClick={() => setCryptoTab('polygon')}><PolygonIcon className="w-5 h-5" /> پولیگان</CryptoTabButton>
                            <CryptoTabButton active={cryptoTab === 'solana'} onClick={() => setCryptoTab('solana')}><SolanaIcon className="w-5 h-5" /> سولانا</CryptoTabButton>
                        </div>
                        <div className="text-center">
                            {cryptoTab === 'ethereum' && (
                                <div>
                                    <h4 className="font-bold">شبکه Ethereum (ERC20)</h4>
                                     <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-md flex items-center justify-between gap-4">
                                        <code className="text-xs md:text-sm text-slate-600 dark:text-slate-300 break-all">0x4aF946cDbAd2a6F1556d90B744C51ffdb2015181</code>
                                        <button onClick={() => handleCopy('0x4aF946cDbAd2a6F1556d90B744C51ffdb2015181')} className="p-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0">
                                            <CopyIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                             {cryptoTab === 'polygon' && (
                                <div>
                                    <h4 className="font-bold">شبکه Polygon (Matic)</h4>
                                    <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-md flex items-center justify-between gap-4">
                                        <code className="text-xs md:text-sm text-slate-600 dark:text-slate-300 break-all">0x4aF946cDbAd2a6F1556d90B744C51ffdb2015181</code>
                                        <button onClick={() => handleCopy('0x4aF946cDbAd2a6F1556d90B744C51ffdb2015181')} className="p-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0">
                                            <CopyIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                             {cryptoTab === 'solana' && (
                                <div>
                                    <h4 className="font-bold">شبکه Solana</h4>
                                     <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-md flex items-center justify-between gap-4">
                                        <code className="text-xs md:text-sm text-slate-600 dark:text-slate-300 break-all">AwG2EE4bNrJjQeHGCo6UoY9QKrSFFS7VQ4TQHqLHRnip</code>
                                        <button onClick={() => handleCopy('AwG2EE4bNrJjQeHGCo6UoY9QKrSFFS7VQ4TQHqLHRnip')} className="p-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0">
                                            <CopyIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
            {copySuccess && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg">
                کپی شد!
              </div>
            )}
        </div>
        <style>{`
          @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes scale-up { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
          .animate-fade-in { animation: fade-in 0.2s ease-out; }
          .animate-scale-up { animation: scale-up 0.2s ease-out; }
        `}</style>
    </div>
  );
};

export default DonationModal;