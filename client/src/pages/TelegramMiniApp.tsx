import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Zap, TrendingUp, MessageCircle, Users, CheckCircle, ArrowUpRight } from 'lucide-react';

const DEPOSIT_WALLET = 'EBKJbyijywbTFqcZBb6BsZdZ6LAyFDcy8cNzWNEbprR4';

interface BotState {
  currentStep: 'menu' | 'increase_holders' | 'increase_volume' | 'support' | 'awaiting_ca' | 'awaiting_speed' | 'awaiting_amount' | 'confirmation';
  mode?: 'holders' | 'volume';
  tokenCA?: string;
  speed?: 'fast' | 'medium' | 'slow' | 'ultra';
  amount?: number;
}

export default function TelegramMiniApp() {
  const [state, setState] = useState<BotState>({ currentStep: 'menu' });
  const [input, setInput] = useState('');
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setBackgroundColor('#0a0a0a');
      tg.setHeaderColor('#0a0a0a');
    }
  }, []);

  const handleMenuSelection = (mode: 'holders' | 'volume' | 'support') => {
    setInput('');
    
    if (mode === 'support') {
      setState({ currentStep: 'support' });
    } else {
      setState({ 
        currentStep: 'awaiting_ca',
        mode 
      });
    }
  };

  const handleCASubmit = () => {
    const ca = input.trim();
    if (!ca || ca.length < 30 || ca.length > 50) {
      setShowMessage(false);
      setTimeout(() => setShowMessage(true), 2000);
      return;
    }
    
    setState(prev => ({ ...prev, currentStep: 'awaiting_speed', tokenCA: ca }));
    setInput('');
  };

  const handleSpeedSelection = (speed: 'fast' | 'medium' | 'slow' | 'ultra') => {
    setState(prev => ({ ...prev, currentStep: 'awaiting_amount', speed }));
    setInput('');
  };

  const handleAmountSubmit = () => {
    const amount = parseFloat(input);
    
    if (isNaN(amount) || amount < 0.1 || amount > 100) {
      setShowMessage(false);
      setTimeout(() => setShowMessage(true), 2000);
      return;
    }
    
    setState(prev => ({ ...prev, currentStep: 'confirmation', amount }));
    setInput('');
  };

  const handleConfirmOrder = () => {
    // Order confirmed - show success and reset
    setState({ currentStep: 'menu' });
    setInput('');
  };

  const goBackToMenu = () => {
    setState({ currentStep: 'menu' });
    setInput('');
  };

  const speedNames: Record<string, { label: string; emoji: string; time: string }> = {
    fast: { label: 'Fast', emoji: '⚡', time: '1-2h' },
    medium: { label: 'Medium', emoji: '🦎', time: '4-6h' },
    slow: { label: 'Slow', emoji: '🐢', time: '12-14h' },
    ultra: { label: 'Ultra Slow', emoji: '🦥', time: '22-24h' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-cyan-500/20 px-4 py-4">
        <div className="flex items-center justify-between">
          {state.currentStep !== 'menu' && (
            <button
              onClick={goBackToMenu}
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              ←
            </button>
          )}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-cyan-400">🚀 Solana Volume Bot</h1>
          </div>
          <div className="w-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {/* Menu State */}
        {state.currentStep === 'menu' && (
          <>
            <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30 text-center">
              <p className="text-cyan-400 text-sm mb-2">🚀 Solana Volume Booster Bot</p>
              <p className="text-slate-300 text-sm">Automated volume boosting until funds are depleted.</p>
              <p className="text-slate-400 text-xs mt-3">Choose:</p>
            </Card>

            <div className="space-y-3">
              <button
                onClick={() => handleMenuSelection('holders')}
                className="w-full p-4 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 hover:from-cyan-600/30 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-cyan-300">👥 Increase Holders</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-cyan-400 ml-auto" />
                </div>
              </button>

              <button
                onClick={() => handleMenuSelection('volume')}
                className="w-full p-4 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 hover:from-cyan-600/30 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-cyan-300">📈 Increase Volume</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-cyan-400 ml-auto" />
                </div>
              </button>

              <button
                onClick={() => handleMenuSelection('support')}
                className="w-full p-4 bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600/40 rounded-lg hover:border-slate-500/60 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-semibold text-slate-300">💬 Support</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 ml-auto" />
                </div>
              </button>
            </div>
          </>
        )}

        {/* Support State */}
        {state.currentStep === 'support' && (
          <>
            <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600/30">
              <p className="text-slate-300 text-sm mb-4">💬 Support</p>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <p className="text-slate-400 text-xs mb-1">📧 Email:</p>
                  <p className="text-cyan-400">support@dexsolana.com</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">💬 Telegram:</p>
                  <p className="text-cyan-400">@DexSolanaSupport</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">📚 Documentation:</p>
                  <p className="text-cyan-400">docs.dexsolana.com</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* CA Input State */}
        {state.currentStep === 'awaiting_ca' && (
          <>
            <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30">
              <p className="text-cyan-400 text-sm mb-3">📋 Send Token Contract Address (CA):</p>
              <p className="text-slate-400 text-xs mb-3">Example:</p>
              <code className="text-xs bg-slate-950 p-2 rounded text-cyan-300 block mb-3 break-all">
                EPjFWaJsKqSo3jvyPboL5SykxKHc5epnH8qB2BVXx5N
              </code>
            </Card>

            <Input
              type="text"
              placeholder="Paste contract address..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-slate-800 border-cyan-500/30 text-white placeholder:text-slate-500"
            />

            <Button
              onClick={handleCASubmit}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirm Address
            </Button>
          </>
        )}

        {/* Speed Selection State */}
        {state.currentStep === 'awaiting_speed' && (
          <>
            <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30">
              <p className="text-cyan-400 text-sm mb-2">✅ Token accepted!</p>
              <p className="text-slate-400 text-xs mb-4">Decimals: 6</p>
              <p className="text-cyan-400 text-sm">Select speed:</p>
            </Card>

            <div className="space-y-2">
              <button
                onClick={() => handleSpeedSelection('fast')}
                className="w-full p-3 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 transition text-left text-sm font-medium text-cyan-300"
              >
                <span className="text-lg">⚡</span> Fast (1-2h)
              </button>
              <button
                onClick={() => handleSpeedSelection('medium')}
                className="w-full p-3 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 transition text-left text-sm font-medium text-cyan-300"
              >
                <span className="text-lg">🦎</span> Medium (4-6h)
              </button>
              <button
                onClick={() => handleSpeedSelection('slow')}
                className="w-full p-3 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 transition text-left text-sm font-medium text-cyan-300"
              >
                <span className="text-lg">🐢</span> Slow (12-14h)
              </button>
              <button
                onClick={() => handleSpeedSelection('ultra')}
                className="w-full p-3 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border border-cyan-500/40 rounded-lg hover:border-cyan-400/60 transition text-left text-sm font-medium text-cyan-300"
              >
                <span className="text-lg">🦥</span> Ultra Slow (22-24h)
              </button>
            </div>
          </>
        )}

        {/* Amount Input State */}
        {state.currentStep === 'awaiting_amount' && (
          <>
            <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30">
              <p className="text-cyan-400 text-sm mb-3">💰 Send Amount in SOL:</p>
              <p className="text-slate-400 text-xs mb-2">Minimum: 0.1 SOL</p>
              <p className="text-slate-400 text-xs">Maximum: 100 SOL</p>
            </Card>

            <Input
              type="number"
              placeholder="Enter amount..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              min="0.1"
              max="100"
              step="0.1"
              className="bg-slate-800 border-cyan-500/30 text-white placeholder:text-slate-500"
            />

            <Button
              onClick={handleAmountSubmit}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirm Amount
            </Button>
          </>
        )}

        {/* Confirmation State */}
        {state.currentStep === 'confirmation' && (
          <>
            <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30">
              <p className="text-cyan-400 text-sm mb-4">📊 Order Summary:</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded border border-slate-700/50">
                  <span className="text-slate-400">💰 Amount:</span>
                  <span className="text-cyan-300 font-mono">{state.amount} SOL</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded border border-slate-700/50">
                  <span className="text-slate-400">⚡ Speed:</span>
                  <span className="text-cyan-300">
                    {state.speed && speedNames[state.speed]?.emoji} {state.speed && speedNames[state.speed]?.label} ({state.speed && speedNames[state.speed]?.time})
                  </span>
                </div>
                
                <div className="flex justify-between items-start p-3 bg-slate-950/50 rounded border border-slate-700/50">
                  <span className="text-slate-400">📍 Deposit:</span>
                  <span className="text-cyan-300 font-mono text-xs text-right break-all">{DEPOSIT_WALLET}</span>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleConfirmOrder}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-3"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              ✅ Confirm & Pay
            </Button>

            <Card className="p-4 bg-green-950/30 border-green-600/30">
              <p className="text-green-400 text-sm">✅ Order Confirmed!</p>
              <p className="text-slate-300 text-xs mt-2">Send {state.amount} SOL to the deposit address above.</p>
              <p className="text-slate-400 text-xs mt-2">Transaction will be processed automatically.</p>
            </Card>
          </>
        )}
      </div>

      {/* Footer - Deposit Address */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent p-4 border-t border-cyan-500/20">
        <div className="text-center">
          <p className="text-slate-500 text-xs mb-2">💰 Deposit Address</p>
          <code className="text-xs bg-slate-900 px-3 py-2 rounded border border-cyan-500/30 text-cyan-300 block break-all font-mono">
            {DEPOSIT_WALLET}
          </code>
        </div>
      </div>
    </div>
  );
}
