import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/homepage";
import StationComponent from "./components/station-component";
import RentalComponent from "./components/rental-component";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/stations" element={<StationComponent />} />
        <Route path="/rental" element={<RentalComponent />} />
      </Routes>
    </div>
  );
}

export default App;
