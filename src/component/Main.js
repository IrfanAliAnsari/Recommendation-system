import { Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import { Suspense, lazy } from "react"; 

const Recommendation = lazy(() => import("../pages/Recommendation"));

const Main = () => {
    return(
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/recommendation" element={<Suspense fallback='Loading...'><Recommendation /></Suspense>} />
        </Routes>
    );
};

export default Main;