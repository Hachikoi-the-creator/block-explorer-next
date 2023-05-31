import { Block } from "alchemy-sdk";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { getAbreviatedHash, getIntFromHex } from "~/utils/dataHelpers";

type Props = { block: Block };

export const MinimalBlock = ({ block }: Props) => {
  const percentageOfGasUsed = Math.round(
    (+getIntFromHex(block.gasUsed) / +getIntFromHex(block.gasLimit)) * 100
  );

  const timeAgo = () => {
    // Convert the block timestamp to a Date object
    const blockDate = new Date(block.timestamp * 1000);

    // Get the time difference relative to the current time
    const timeDifference = formatDistanceToNow(blockDate, {
      includeSeconds: true,
      addSuffix: true,
    });
    return timeDifference;
  };

  return (
    <Link
      href={`/block/${block.hash}`}
      className="border rounded p-4 bg-blue-200 border-blue-700"
    >
      <p className="mb-2">
        <strong>Hash: </strong>
        <span>{getAbreviatedHash(block.hash)}</span>
      </p>
      <p className="mb-2">
        <strong>Tx amount: </strong>
        <span>{block.transactions.length}</span>
      </p>

      <p className="mb-2">{timeAgo()}</p>
      <p className="mb-2">
        <strong>Gas used/limit: </strong>
        <span>{percentageOfGasUsed}%</span>
      </p>
      <p>
        <span>{timeAgo()}</span>
      </p>
    </Link>
  );
};
