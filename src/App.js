import { HotelsProvider } from "./context/HotelsContext";
import Main from "./components/Main";

function App() {
  return (
    <HotelsProvider>
      <Main />
    </HotelsProvider>
  );
}

export default App;
