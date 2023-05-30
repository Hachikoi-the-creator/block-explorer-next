import { BlockWithTransactions } from "alchemy-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlockTxs } from "~/utils/alchemyHelpers";

export default function BlockDetails() {
  const [blockData, setblockData] = useState<BlockWithTransactions>();
  const { blockHash } = useRouter().query; // I bet it's not standart... however practical

  const queryBlockData = async () => {
    // todo change this so make a req to api instead
    if (typeof blockHash !== "string") return;
    try {
      // even tho I did separated types, doesn't seem to care much...(status)
      const { data } = await getBlockTxs(blockHash);

      if (typeof data !== "string") {
        setblockData(data);
        console.log(data);
      }
    } catch (err) {
      console.error("couldn't get block details", err);
    }
  };

  useEffect(() => {
    queryBlockData();
  }, []);

  return (
    <main>
      <p>
        <span>Hash:</span>
        <span>{blockData?.hash}</span>
      </p>
      <section>
        {blockData?.transactions.map((tx) => (
          <p key={tx.hash}>
            <Link replace href={`tx/${tx.hash}`}>
              {tx.hash}
            </Link>
          </p>
        ))}
      </section>
    </main>
  );
}
