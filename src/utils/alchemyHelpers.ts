import { Alchemy, Block, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const get12LastBlocks = async () => {
  try {
    const blockNum = await alchemy.core.getBlockNumber();

    // * make an arr of promises asking for the 12 blocks
    const promisesArr: Promise<Block>[] = [];
    for (let i = blockNum - 12; i < blockNum; i++) {
      const block = alchemy.core.getBlock(i);
      promisesArr.push(block);
    }

    // * resolve them and send the result
    const res = await Promise.all(promisesArr);
    return [true, res];
  } catch (error) {
    console.error(error);
    return [false, "Error trying to get last 12 blocks"];
  }
};

export const getBlockTxs = async (blockNum: any) => {
  try {
    // * if is able to be parsed a number, then is a number (I know +[] = 0, etc)
    if (isNaN(+blockNum)) throw new Error("Invalid block num");
    const txs = await alchemy.core.getBlockWithTransactions(+blockNum);
    return [true, txs];
  } catch (error) {
    console.error(error);
    return [false, "Error trying to get block transactions"];
  }
};

/**
 * @param {Hex} txHash hash of the tx
 */
export const getTxDetails = async (txHash: any) => {
  try {
    const txsReceipt = await alchemy.core.getTransactionReceipt(txHash);
    return [true, txsReceipt];
  } catch (error) {
    console.error(error);
    return [false, "Error trying to get transaction details"];
  }
};
