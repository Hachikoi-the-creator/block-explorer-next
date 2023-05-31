import { BlockWithTransactions } from "alchemy-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlockTxs } from "~/utils/alchemyHelpers";
import { getAbreviatedHash } from "~/utils/dataHelpers";

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
    <main className="w-[80vw] mx-[10vw]">
      <h1 className="text-center">
        Block: {getAbreviatedHash(blockData?.hash || "")}
      </h1>

      <section>
        <h2>Transactions</h2>
        <article className="grid grid-cols-5 gap-7">
          {blockData?.transactions.map((tx) => (
            <Link
              key={tx.hash}
              href={`/tx/${tx.hash}`}
              className="bg-red-200 rounded border border-red-500 text-center"
            >
              {getAbreviatedHash(tx.hash)}
            </Link>
          ))}
        </article>
      </section>
    </main>
  );
}
