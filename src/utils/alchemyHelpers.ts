import { Alchemy, Block, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const get12LastBlocks = async () => {
  const blockNum = await alchemy.core.getBlockNumber();

  // * make an arr of promises asking for the 12 blocks
  const promisesArr: Promise<Block>[] = [];
  for (let i = blockNum - 12; i < blockNum; i++) {
    const block = alchemy.core.getBlock(blockNum);
    promisesArr.push(block);
  }

  // * resolve them and send the result
  const res = await Promise.all(promisesArr);
  return res;
};

export const getBlockTxs = async () => {
  //
};

export const getTxDetails = async () => {
  //
};

async function getBlockNumber() {
  const blockNum = await alchemy.core.getBlockNumber();
  // setBlockNumber(blockNum);
  console.log(blockNum);

  // const duh = await alchemy.core.getBlock(blockNum);
  // console.log("\nblock?", duh);

  const txs = await alchemy.core.getBlockWithTransactions(blockNum);
  console.log("\nTsx", txs);

  const txsReceipt = await alchemy.core.getTransactionReceipt(
    txs.transactions[0].hash
  );
  console.log("\nreceipt", txsReceipt);
}
