import { Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Recommendation from "../pages/Recommendation";

const Main = () => {
    return(
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/recommendation" element={<Recommendation />} />
        </Routes>
    );
};

export default Main;