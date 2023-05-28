import { Block } from "alchemy-sdk";
import { getAbreviatedHash, getIntFromHex } from "~/utils/dataHelpers";

type Props = { block: Block };

export const BlockDetails = ({ block }: Props) => {
  return (
    <div className="border border-red-400 rounded">
      <p className="flex justify-between p-5">
        <span>Hash: </span>
        <span>{getAbreviatedHash(block.hash)}</span>
      </p>
      <p className="flex justify-between p-5">
        <span>Tx amount: </span>
        <span>{block.transactions.length}</span>
      </p>
      <p className="flex justify-between p-5">
        <span>Gas Used: </span>
        <span>{getIntFromHex(block.gasUsed)}</span>
      </p>
    </div>
  );
};
