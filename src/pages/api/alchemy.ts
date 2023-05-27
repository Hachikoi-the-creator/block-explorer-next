// import { Alchemy, Network } from "alchemy-sdk";
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { get12LastBlocks } from "~/utils/alchemyHelpers";

const VALID_QUERYS = Object.freeze({
  BLOCKS: "blocks",
  BLOCK_TX: "block_tx",
  RECEIPT: "receipt",
});

// const settings = {
//   apiKey: process.env.ALCHEMY_API_KEY,
//   network: Network.ETH_MAINNET,
// };

// const alchemy = new Alchemy(settings);

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

  switch (want) {
    // Get the 12 last blocks
    case VALID_QUERYS.BLOCKS:
      const blocks = await get12LastBlocks();
      res.status(200).send(blocks);
      break;

    // Get the whole data of X block
    case VALID_QUERYS.BLOCK_TX:
      const blockTx = "";
      res.status(200).send("");
      break;

    // Get details of X transaction
    case VALID_QUERYS.RECEIPT:
      const receipt = "";
      res.status(200).send("");
      break;

    default:
      res.status(400).send("invalid query param");
  }
}
