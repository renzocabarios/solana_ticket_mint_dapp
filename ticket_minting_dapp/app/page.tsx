"use client";
import { PublicKey, generateSigner, publicKey } from "@metaplex-foundation/umi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useUmi from "./useUmi";
import {
  TokenStandard,
  fetchDigitalAsset,
  fetchMasterEditionFromSeeds,
  printV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [metadata, setmetadata] = useState<any>({});
  const umi = useUmi();
  const master: PublicKey = publicKey(
    "7qGet4Eo7rW16fDk6fFrhgZktTMZS2VZrc3rUieVohQn"
  );

  useEffect(() => {
    const init = async () => {
      const asset = await fetchDigitalAsset(umi, master);
      const response = await axios.get(asset.metadata.uri);
      setmetadata(response.data);
    };

    init();
  }, [fetchDigitalAsset]);

  const mintPrintNFT = async () => {
    const masterEdition = await fetchMasterEditionFromSeeds(umi, {
      mint: master,
    });

    const editionMint = generateSigner(umi);
    await printV1(umi, {
      masterEditionMint: master,
      editionMint,
      editionNumber: Number(masterEdition.supply) + 1,
      editionTokenAccountOwner: umi.identity.publicKey,
      tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi);
    alert(`Edition NFT Mint ID: ${editionMint.publicKey.toString()}`);
  };

  return (
    <main className="">
      <div className="w-full h-[10vh] px-20 flex items-center justify-between">
        <p className="text-2xl font-bold">BCC 2024</p>
        <WalletMultiButton />
      </div>

      <div className="w-full h-[90vh] px-3 flex items-center justify-center">
        <div className="rounded flex flex-col items-center gap-5">
          {metadata.image && (
            <Image
              src={metadata.image}
              alt=""
              width={400}
              height={300}
              className="rounded-2xl"
            ></Image>
          )}
          <div className="w-full flex flex-col p-2 gap-4">
            <div className="flex justify-between items-center">
              {metadata.name && <p>{metadata.name}</p>}
              {metadata.symbol && (
                <p className="text-xl font-medium">{metadata.symbol}</p>
              )}
            </div>

            {metadata.description && <p>{metadata.description}</p>}
          </div>
          {metadata.description && (
            <button
              onClick={mintPrintNFT}
              className="w-full bg-slate-900 py-4 rounded-2xl hover:bg-slate-950"
            >
              Mint Now!
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
