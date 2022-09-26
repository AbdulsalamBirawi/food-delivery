import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, MainContiner, CreateContainer, Menu } from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/FirebaseFunction";
import { useEffect } from "react";
import { actionType } from "./context/Reducer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) =>
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-16 md:mt-20 px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContiner />} />
            <Route path="createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
