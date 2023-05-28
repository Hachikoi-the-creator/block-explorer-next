import BlocksList from "~/components/block/BlocksList";
import TxList from "~/components/tx/TxList";

function App() {
  return (
    <main className="outline-red-600">
      <BlocksList />
      <TxList />
    </main>
  );
}

export default App;
