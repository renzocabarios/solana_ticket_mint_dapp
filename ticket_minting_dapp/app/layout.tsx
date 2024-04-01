"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { BLOCKCHAIN_CONFIG } from "@/lib/blockhain.config";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    setmounted(true);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={BLOCKCHAIN_CONFIG.rpc}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton />
              <WalletDisconnectButton />
              {mounted && children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
