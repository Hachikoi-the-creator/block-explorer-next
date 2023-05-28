import axios from "axios";
import { BigNumber, Block } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BlockDetails } from "./BlockDetails";

export default function BlocksList() {
  const [blocksArr, setBlocksArr] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    // setLoading(true);
    const res = await axios<Block[]>("api/alchemy?want=blocks").catch((e) =>
      console.error("failed blocks list", (e as Error).message)
    );

    if (!res) return;
    setBlocksArr(res.data);
    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-wrap">
      {blocksArr.map((block) => (
        <BlockDetails {...{ block }} key={block.hash} />
      ))}
    </section>
  );
}
