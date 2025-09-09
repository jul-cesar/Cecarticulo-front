import { Route, Routes } from "react-router-dom";
import ArticlesFullText from "./components/pages/ArticlesFullText";
import Home from "./components/pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:id" element={<ArticlesFullText />} />
    </Routes>
  );
};

export default App;
