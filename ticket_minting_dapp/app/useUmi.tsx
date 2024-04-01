import { BLOCKCHAIN_CONFIG } from "@/lib/blockhain.config";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

function useUmi() {
  const wallet = useWallet();

  const umi = createUmi(BLOCKCHAIN_CONFIG.rpc)
    .use(walletAdapterIdentity(wallet))
    .use(mplToolbox());

  return umi;
}

export default useUmi;
