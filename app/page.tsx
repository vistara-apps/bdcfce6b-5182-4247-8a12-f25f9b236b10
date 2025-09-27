import Link from 'next/link';
import { ArrowRight, Video, Coins, TrendingUp, Shield, Zap } from 'lucide-react';
import { designSystem } from './lib/design-system';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br from-[${designSystem.colors.primary}]/10 to-[${designSystem.colors.accent}]/10 py-20`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className={`text-5xl md:text-6xl font-bold text-[${designSystem.colors.text}] mb-6`}>
            Generate & Tokenize
            <br />
            <span className={`text-[${designSystem.colors.primary}]`}>Real Estate Video Tours</span>
            <br />
            Instantly
          </h1>
          <p className={`text-xl text-[${designSystem.colors.muted}] mb-8 max-w-3xl mx-auto`}>
            Enable real estate professionals to quickly generate branded video tours with tokenized asset integration for fractional ownership promotion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-video">
              <Button size="lg" className="flex items-center space-x-2">
                <Video className="w-5 h-5" />
                <span>Create Video Tour</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-[${designSystem.colors.text}] mb-4`}>
              Revolutionary Real Estate Marketing
            </h2>
            <p className={`text-lg text-[${designSystem.colors.muted}] max-w-2xl mx-auto`}>
              Transform how you showcase properties with AI-powered video generation and blockchain-based tokenization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className={`w-16 h-16 bg-[${designSystem.colors.primary}]/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Video className={`w-8 h-8 text-[${designSystem.colors.primary}]`} />
                </div>
                <CardTitle>Automated Video Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-[${designSystem.colors.muted}]`}>
                  Upload property data and select from professional templates to create stunning video tours in minutes, not hours.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className={`w-16 h-16 bg-[${designSystem.colors.accent}]/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Coins className={`w-8 h-8 text-[${designSystem.colors.accent}]`} />
                </div>
                <CardTitle>Tokenized Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-[${designSystem.colors.muted}]`}>
                  Embed clickable tokens representing fractional ownership directly in your videos, opening new investment opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className={`w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Cross-Promotion Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-[${designSystem.colors.muted}]`}>
                  Share videos across decentralized networks and social platforms to reach investors and buyers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`bg-[${designSystem.colors.bg}] py-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-[${designSystem.colors.text}] mb-4`}>
              How It Works
            </h2>
            <p className={`text-lg text-[${designSystem.colors.muted}]`}>
              Get started in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`w-12 h-12 bg-[${designSystem.colors.primary}] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                1
              </div>
              <h3 className={`text-xl font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Connect Wallet
              </h3>
              <p className={`text-[${designSystem.colors.muted}]`}>
                Connect your Base network wallet to get started.
              </p>
            </div>

            <div className="text-center">
              <div className={`w-12 h-12 bg-[${designSystem.colors.primary}] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                2
              </div>
              <h3 className={`text-xl font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Upload Property Data
              </h3>
              <p className={`text-[${designSystem.colors.muted}]`}>
                Add property details, images, and floor plans.
              </p>
            </div>

            <div className="text-center">
              <div className={`w-12 h-12 bg-[${designSystem.colors.primary}] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                3
              </div>
              <h3 className={`text-xl font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Generate Video
              </h3>
              <p className={`text-[${designSystem.colors.muted}]`}>
                Choose a template and let AI create your video tour.
              </p>
            </div>

            <div className="text-center">
              <div className={`w-12 h-12 bg-[${designSystem.colors.primary}] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                4
              </div>
              <h3 className={`text-xl font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Tokenize & Share
              </h3>
              <p className={`text-[${designSystem.colors.muted}]`}>
                Tokenize the property and share across networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-[${designSystem.colors.text}] mb-4`}>
              Why Choose TokenProp Tours?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <Shield className={`w-12 h-12 text-[${designSystem.colors.primary}] mx-auto mb-4`} />
              <h3 className={`text-lg font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Secure & Decentralized
              </h3>
              <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                Built on Base network with decentralized storage for maximum security.
              </p>
            </div>

            <div className="text-center p-6">
              <Zap className={`w-12 h-12 text-[${designSystem.colors.accent}] mx-auto mb-4`} />
              <h3 className={`text-lg font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Lightning Fast
              </h3>
              <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                Generate professional video tours in minutes with AI-powered automation.
              </p>
            </div>

            <div className="text-center p-6">
              <TrendingUp className={`w-12 h-12 text-green-600 mx-auto mb-4`} />
              <h3 className={`text-lg font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Increase Sales
              </h3>
              <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                Reach more buyers and investors with tokenized fractional ownership.
              </p>
            </div>

            <div className="text-center p-6">
              <Coins className={`w-12 h-12 text-[${designSystem.colors.primary}] mx-auto mb-4`} />
              <h3 className={`text-lg font-semibold text-[${designSystem.colors.text}] mb-2`}>
                Revenue Share
              </h3>
              <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                Earn from successful token sales through our revenue sharing model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`bg-[${designSystem.colors.primary}] py-20`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4`}>
            Ready to Transform Your Real Estate Marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the future of property marketing with TokenProp Tours.
          </p>
          <Link href="/create-video">
            <Button size="lg" variant="secondary" className="flex items-center space-x-2 mx-auto">
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

