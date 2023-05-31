// import { Alchemy, Network } from "alchemy-sdk";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import {
  get12LastBlocks,
  getBlockTxs,
  getTxDetails,
} from "~/utils/alchemyHelpers";

export const VALID_QUERYS = Object.freeze({
  BLOCKS: "blocks",
  BLOCK_TX: "blockTx",
  BLOCK_TX_PARAM: "blockHash",
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
  const { want, blockHash, txHash } = req.query;
  if (typeof want !== "string") {
    res.status(400).send("invalid query param");
    return;
  }

  if (want === VALID_QUERYS.BLOCKS) {
    // Get the 12 last blocks
    const { status, data } = await get12LastBlocks();

    if (status) res.status(200).send(data);
    else res.status(400).send(data);
  } else if (want === VALID_QUERYS.BLOCK_TX && typeof blockHash === "string") {
    // Get the whole data of X block
    const { status, data } = await getBlockTxs(blockHash);

    if (status) res.status(200).send(data);
    else res.status(400).send(data);
  } else if (want === VALID_QUERYS.RECEIPT) {
    // Get details of X transaction
    const { status, data } = await getTxDetails(txHash);

    if (status === "ok") res.status(200).send(data);
    else res.status(400).send(data);
  } else {
    // silly dev case
    res.status(400).send("invalid query param");
  }
}
