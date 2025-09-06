import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-6 text-center">
      {/* Logo / Name */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        🚀 The Coin Cartel Community
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
        Your trusted gateway to crypto insights.
        <br />Live data, alpha calls, and wallet-secured VIP access — launching soon.
      </p>

      {/* Countdown or Coming Soon Tag */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 shadow-xl mb-8">
        <span className="text-2xl md:text-3xl font-semibold">
          ⏳ Coming Soon
        </span>
      </div>

      {/* Footer / Trust */}
      <div className="mt-10 text-sm text-gray-500">
        🔑 Wallet-secured • 🛡 No spam • 💎 Only signal
      </div>
    </main>
  );
}


// #fe6d4c
// #161932
// #f59b50