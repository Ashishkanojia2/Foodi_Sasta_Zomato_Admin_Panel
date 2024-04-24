import "./App.css";
import AddFood from "././Component/AddFood";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import OrderSection from "./Component/Order/OrderSection";
import ShowOrderSpecific from "./Component/Order/ShowOrderSpecific/ShowOrderSpecific";
// import { ShowOrderSpecific } from "./Component/Order/ShowOrderSpecific/ShowOrderSpecific";

function App() {
  return (
    // <div className="Container">
    //   <AddFood />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderSection />} />
        <Route path="/order" element={<OrderSection />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/orderDetails/:orderid" element={<ShowOrderSpecific />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
