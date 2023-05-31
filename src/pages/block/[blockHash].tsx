import { BlockWithTransactions } from "alchemy-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlockTxs } from "~/utils/alchemyHelpers";
import { getAbreviatedHash, getIntFromHex } from "~/utils/dataHelpers";

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
      }
    } catch (err) {
      console.error("couldn't get block details", err);
    }
  };

  useEffect(() => {
    queryBlockData();
  }, []);

  if (!blockData) return <h1>Loading...</h1>;

  return (
    <main className="p-4 bg-white shadow rounded w[80vw] mx-[10vw]">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Hash:</p>
          <p className="font-medium">{getAbreviatedHash(blockData.hash)}</p>
        </div>
        <div>
          <p className="text-gray-500">Parent Hash:</p>
          <p className="font-medium">
            {getAbreviatedHash(blockData.parentHash)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Number:</p>
          <p className="font-medium">{blockData.number}</p>
        </div>
        <div>
          <p className="text-gray-500">Timestamp:</p>
          <p className="font-medium">{blockData.timestamp}</p>
        </div>
        <div>
          <p className="text-gray-500">Nonce:</p>
          <p className="font-medium">{blockData.nonce}</p>
        </div>
        <div>
          <p className="text-gray-500">Difficulty:</p>
          <p className="font-medium">{blockData.difficulty}</p>
        </div>
        <div>
          <p className="text-gray-500">Gas Limit:</p>
          <p className="font-medium">{getIntFromHex(blockData.gasLimit)}</p>
        </div>
        <div>
          <p className="text-gray-500">Gas Used:</p>
          <p className="font-medium">{getIntFromHex(blockData.gasUsed)}</p>
        </div>
        <div>
          <p className="text-gray-500">Miner:</p>
          <p className="font-medium">{getAbreviatedHash(blockData.miner)}</p>
        </div>
        <div>
          <p className="text-gray-500">Extra Data:</p>
          <p className="font-medium">
            {getAbreviatedHash(blockData.extraData)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Transactions:</p>
          <p className="font-medium">{blockData.transactions.length}</p>
        </div>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {blockData.transactions.map((tx) => (
            <Link
              key={tx.hash}
              href={`/tx/${tx.hash}`}
              className="p-4 bg-blue-200 shadow rounded text-violet-900 text-center"
            >
              {getAbreviatedHash(tx.hash)}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
