import { Block } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { MinimalBlock } from "./MinimalBlock";
import { get12LastBlocks, testTx } from "~/utils/alchemyHelpers";

export default function BlocksList() {
  const [blocksArr, setBlocksArr] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  // todo: add try catch
  // todo: change this so make a req to api instead
  // todo: add loading states
  // todo: find a way where the status bool is actually usefull in TS
  const fetchData = async () => {
    const { data } = await get12LastBlocks();

    if (typeof data !== "string") {
      setBlocksArr(data);
    }
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
