import {
  Alchemy,
  Block,
  BlockWithTransactions,
  Network,
  TransactionReceipt,
} from "alchemy-sdk";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// specify that if ok, data = Block[]
type MaybeBlocks =
  | { status: "ok"; data: Block[] }
  | { status: "error"; data: string };

export const get12LastBlocks = async (): Promise<MaybeBlocks> => {
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
    return { status: "ok", data: res };
  } catch (error) {
    console.error(error);
    return { status: "error", data: "Error trying to get last 12 blocks" };
  }
};

type MaybeData<T> =
  | { status: "ok"; data: T }
  | { status: "error"; data: string };

export const getBlockTxs = async (
  blockHash: string
): Promise<MaybeData<BlockWithTransactions>> => {
  try {
    const txs = await alchemy.core.getBlockWithTransactions(blockHash);
    return { status: "ok", data: txs };
  } catch (error) {
    console.error(error);
    return { status: "error", data: "Error trying to get block transactions" };
  }
};

/**
 * @param {Hex} txHash hash of the tx
 */
export const getTxDetails = async (
  txHash: any
): Promise<MaybeData<TransactionReceipt>> => {
  try {
    const txsReceipt = await alchemy.core.getTransactionReceipt(txHash);
    if (txsReceipt) {
      return { status: "ok", data: txsReceipt };
    }
    return { status: "error", data: "Couldn't find TX receipt" };
  } catch (error) {
    console.error(error);
    return { status: "error", data: "Error trying to get transaction details" };
  }
};
