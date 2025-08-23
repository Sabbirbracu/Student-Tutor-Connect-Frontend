import { Toaster } from "react-hot-toast";
import RootRouter from "./rootRouter.jsx"; // ✅ Use .jsx here

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RootRouter />
    </>
  )
}

export default App;
