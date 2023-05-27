import axios from "axios";
import BlocksList from "~/components/block/BlocksList";
import TxList from "~/components/tx/TxList";

function App() {
  return (
    <section className="">
      <BlocksList />
      <TxList />
      <button
        onClick={() => {
          axios("api/alchemy?want=blocks").then((res) => console.log(res));
        }}
      >
        Fetch these
      </button>
    </section>
  );
}

export default App;
