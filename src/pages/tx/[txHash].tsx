import { TransactionReceipt } from "alchemy-sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTxDetails } from "~/utils/alchemyHelpers";
import { getIntFromHex } from "~/utils/dataHelpers";

export default function TxDetails() {
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>();
  const { txHash } = useRouter().query; // I bet it's not standart... however practical

  const fetchTxDetails = async () => {
    const { status, data } = await getTxDetails(txHash);
    console.log(data);
    if (status === "ok") {
      setTxReceipt(data);
    }
  };

  useEffect(() => {
    fetchTxDetails();
  }, []);

  if (!txReceipt) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-lightBlue-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-lg font-semibold">Transaction Details</p>
        <div className="mt-4">
          <p>
            <strong className="text-darkBlue-500">From:</strong>
            {txReceipt.from}
          </p>
          <p>
            <strong className="text-darkBlue-500">To:</strong> {txReceipt.to}
          </p>
          <p>
            <strong className="text-darkBlue-500">Transaction Hash:</strong>
            {txReceipt.transactionHash}
          </p>
          <p>
            <strong className="text-darkBlue-500">Block Number:</strong>
            {txReceipt.blockNumber}
          </p>
          <p>
            <strong className="text-darkBlue-500">Gas Used:</strong>
            {getIntFromHex(txReceipt.gasUsed)}
          </p>
          <p>
            <strong className="text-darkBlue-500">Status:</strong>
            {txReceipt.status === 1 ? "Success" : "Failure"}
          </p>
        </div>
      </div>
    </main>
  );
}
