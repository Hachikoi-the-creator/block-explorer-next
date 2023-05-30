import axios from "axios";
import { BlockWithTransactions } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { MinimalBlock } from "./MinimalBlock";

export default function BlocksList() {
  const [blocksArr, setBlocksArr] = useState<BlockWithTransactions[]>([]);
  const [loading, setLoading] = useState(false);

  // todo: add try catch
  const fetchData = async () => {
    // setLoading(true);
    const res = await axios<BlockWithTransactions[]>(
      "api/alchemy?want=blocks"
    ).catch((e) => console.error("failed blocks list", (e as Error).message));

    if (!res) return;
    setBlocksArr(res.data);
    // const block1 = res.data[0];
    // console.log(block1);

    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-wrap gap-3 w-4/5 mx-[10%]">
      {blocksArr.map((block) => (
        <MinimalBlock {...{ block }} key={block.hash} />
      ))}
    </section>
  );
}
