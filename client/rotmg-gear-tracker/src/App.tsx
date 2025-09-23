import "./App.css";
import { fetchRotmgGear } from "./utils";

function App() {
  const handleButtonClick = async () => {
    const gear = await fetchRotmgGear();
    console.log(gear);
  };
  return (
    <>
      <button onClick={handleButtonClick}>Fetch data</button>
    </>
  );
}

export default App;
