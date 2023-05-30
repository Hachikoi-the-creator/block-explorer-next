import { Block, BlockWithTransactions } from "alchemy-sdk";
import Link from "next/link";
import { getAbreviatedHash, getIntFromHex } from "~/utils/dataHelpers";

type Props = { block: Block };

export const MinimalBlock = ({ block }: Props) => {
  const percentageOfGasUsed = Math.round(
    (+getIntFromHex(block.gasUsed) / +getIntFromHex(block.gasLimit)) * 100
  );

  return (
    <Link
      href={`block/${block.hash}`}
      className="border border-red-400 rounded w-[30%]"
    >
      <p className="flex justify-between p-5">
        <span>Hash: </span>
        <span>{getAbreviatedHash(block.hash)}</span>
      </p>
      <p className="flex justify-between p-5">
        <span>Tx amount: </span>
        <span>{block.transactions.length}</span>
      </p>
      <p className="flex justify-between p-5">
        <span>Gas used/limit: </span>
        <span>{percentageOfGasUsed}%</span>
      </p>
    </Link>
  );
};
