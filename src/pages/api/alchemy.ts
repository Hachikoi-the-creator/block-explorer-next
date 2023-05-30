// import { Alchemy, Network } from "alchemy-sdk";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import {
  get12LastBlocks,
  getBlockTxs,
  getTxDetails,
} from "~/utils/alchemyHelpers";

export const VALID_QUERYS = Object.freeze({
  BLOCKS: "blocks",
  BLOCK_TX: "block_tx",
  BLOCK_TX_PARAM: "blockNum",
  RECEIPT: "receipt",
  RECEIPT_PARAM: "txHash",
});

// * handler
export default async function handler(req: Req, res: Res) {
  if (req.method !== "GET") {
    res.status(400).send("invalid method");
    return;
  }

  // would be: blocks | block_tx | receipt
  const { want, blockNum, txHash } = req.query;
  if (typeof want !== "string") {
    res.status(400).send("invalid query param");
    return;
  }

  if (want === VALID_QUERYS.BLOCKS) {
    // Get the 12 last blocks
    const [blockSuccess, blocks] = await get12LastBlocks();

    if (blockSuccess) res.status(200).send(blocks);
    else res.status(400).send(blocks);
  } else if (want === VALID_QUERYS.BLOCK_TX) {
    // Get the whole data of X block
    const [txSuccess, blockTxs] = await getBlockTxs(blockNum);

    if (txSuccess) res.status(200).send(blockTxs);
    else res.status(400).send(blockTxs);
  } else if (want === VALID_QUERYS.RECEIPT) {
    // Get details of X transaction
    const [receiptSuccess, receipt] = await getTxDetails(txHash);

    if (receiptSuccess) res.status(200).send(receipt);
    else res.status(400).send(receipt);
  } else {
    // silly dev case
    res.status(400).send("invalid query param");
  }
}
