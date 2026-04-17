import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Zap, Shield, Cpu, Lock, TrendingUp, Rocket, Code, Wallet, ArrowRight, CheckCircle } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const tools = [
    { icon: Zap, title: 'Solana Holder Maker', desc: 'Create token holders instantly' },
    { icon: TrendingUp, title: 'Volume Bot', desc: 'Boost trading volume automatically' },
    { icon: Lock, title: 'Burn Tokens', desc: 'Permanently remove tokens from supply' },
    { icon: Code, title: 'Create Token', desc: 'Launch Solana tokens in seconds' },
    { icon: Wallet, title: 'Bulk Sender', desc: 'Send tokens to multiple wallets' },
    { icon: Rocket, title: 'Liquidity Pool', desc: 'Manage Raydium liquidity seamlessly' },
    { icon: Shield, title: 'Revoke Authority', desc: 'Secure your token mint & freeze' },
    { icon: Cpu, title: 'Update Metadata', desc: 'Modify token information anytime' },
  ];

  const features = [
    { icon: Shield, title: 'Secure', desc: 'Bank-grade security for your assets' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Instant transactions on Solana' },
    { icon: Lock, title: 'Non-Custodial', desc: 'You control your private keys' },
    { icon: TrendingUp, title: 'Advanced Analytics', desc: 'Real-time market insights' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Site Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-32 border-b border-border/40">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full border border-accent/30">
                <span className="text-sm font-semibold text-accent">🚀 Web3 Infrastructure</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
                DexSolana Volume Bot
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Professional Solana tools for token creators, traders, and developers. Manage your Web3 assets with enterprise-grade infrastructure.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg blur-3xl" />
              <Card className="relative border-accent/30 bg-card/50 p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-sm">Instant Token Creation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-sm">Advanced Volume Control</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-sm">Liquidity Management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">10K+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">$500M+</div>
              <p className="text-muted-foreground">Volume Processed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">0ms</div>
              <p className="text-muted-foreground">Latency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-b border-border/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DexSolana?</h2>
            <p className="text-lg text-muted-foreground">Enterprise-grade tools for Web3 professionals</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="p-6 border-border/40 hover:border-accent/50 transition">
                  <Icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 bg-card/30 border-b border-border/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solana Tools Suite</h2>
            <p className="text-lg text-muted-foreground">Complete toolkit for token management and trading</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Card key={i} className="p-6 border-border/40 hover:border-accent/50 hover:bg-accent/5 transition cursor-pointer">
                  <Icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-secondary/10 border-b border-border/40">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground">Get the latest updates on new tools and features</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Subscribe
            </Button>
          </form>
          {subscribed && (
            <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg text-center text-accent">
              ✅ Thanks for subscribing!
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-b border-border/40">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of users managing their Solana assets</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Rocket className="mr-2 h-5 w-5" />
              Launch App
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Features</a></li>
                <li><a href="#" className="hover:text-accent transition">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition">Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">About</a></li>
                <li><a href="#" className="hover:text-accent transition">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Privacy</a></li>
                <li><a href="#" className="hover:text-accent transition">Terms</a></li>
                <li><a href="#" className="hover:text-accent transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://t.me/DexSolanavolumebot" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">Telegram</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">Twitter</a></li>
                <li><a href="https://github.com/DexSolanavolumebot" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2026 DexSolanavolumebot. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-4 md:mt-0">
              💰 Deposit: <code className="bg-background/50 px-1.5 py-0.5 rounded">EBKJbyijywbTFqcZBb6BsZdZ6LAyFDcy8cNzWNEbprR4</code>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
