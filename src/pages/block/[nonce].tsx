import { BlockWithTransactions } from "alchemy-sdk";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VALID_QUERYS } from "../api/alchemy";
import { getBlockTxs } from "~/utils/alchemyHelpers";

export default function BlockDetails() {
  const [blockData, setblockData] = useState<BlockWithTransactions>();
  const { nonce } = useRouter().query; // I bet it's not standart... however practical

  const queryBlockData = async () => {
    try {
      const { data } = await axios<BlockWithTransactions>(
        `api/alchemy?want=block_tx&blockNum=${nonce}`
      );

      if (typeof data !== "string") {
        setblockData(data);
        console.log(data);
      }
    } catch (err) {
      console.error("couldn't get block details", err);
    }
  };

  useEffect(() => {
    // queryBlockData();
  }, []);

  return (
    <main>
      <p>
        <span>Hash:</span>
        <span>{blockData?.hash}</span>
      </p>
    </main>
  );
}
