import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntakeForm from "./features/intake-form/components/IntakeForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntakeForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
