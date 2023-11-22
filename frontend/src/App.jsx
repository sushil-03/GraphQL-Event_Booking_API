import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Navbar from "./components/common/Navbar";
import Events from "./components/Events";
import { Booking } from "./components/Booking";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={AuthPage} />
      </Routes>
      <Routes>
        <Route path="/auth" Component={AuthPage} />
      </Routes>
      <Routes>
        <Route path="/events" Component={Events} />
      </Routes>
      <Routes>
        <Route path="/booking" Component={Booking} />
      </Routes>
      {/* <Routes>
          <Route path="/" Component={<AuthPage />} />
        </Routes> */}
    </BrowserRouter>
  );
}

export default App;
