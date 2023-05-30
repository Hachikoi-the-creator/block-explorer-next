import { TransactionReceipt } from "alchemy-sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTxDetails } from "~/utils/alchemyHelpers";

export default function TxDetails() {
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>();
  const { hash } = useRouter().query; // I bet it's not standart... however practical

  const fetchTxDetails = async () => {
    const { status, data } = await getTxDetails(hash);
    console.log(data);
    if (status === "ok") {
      setTxReceipt(data);
    }
  };

  useEffect(() => {
    fetchTxDetails();
  }, []);

  return <div>TxDetails of {hash || "0x000"}</div>;
}
