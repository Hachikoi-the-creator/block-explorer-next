import { BigNumber, Block } from "alchemy-sdk";

const bigNumZero = BigNumber.from("0x0");
const baseBlock: Block = {
  hash: "",
  parentHash: "",
  transactions: [""],
  number: 0,
  timestamp: 0,
  nonce: "",
  difficulty: 0,
  _difficulty: bigNumZero,
  gasLimit: bigNumZero,
  gasUsed: bigNumZero,
  miner: "",
  extraData: "",
};
