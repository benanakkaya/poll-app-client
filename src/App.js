import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Users from "./contexts/Users";
import Homepage from "./components/Homepage";
import AddPoll from "./components/AddPoll";
import PollArchive from "./components/PollArchive";


function App() {
  return (
    <div className="App font-asap">
      <Users >
        <BrowserRouter>
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-poll" element={<AddPoll />} />
            <Route path="/poll-archive" element={<PollArchive />} />
          </Routes>
        </BrowserRouter>
      </Users>
    </div>
  );
}

export default App;
