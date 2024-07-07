import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToDoHome } from "./components/home";
import { UserRegister } from "./components/register";
import { UserLogin } from "./components/login";
import { UserError } from "./components/error";
import { UserDashboard } from "./components/dashboard";
import { AddTask } from "./components/add-task";
import { EditTask } from "./components/edit-task";

function App() {
  return (
    <div className="App" id='Background'>
      <div id='Bg-Shade'>
        <BrowserRouter>
          <header>

          </header>
          <section>
            <Routes>
              <Route path="/" element={<ToDoHome />} />
              <Route path="register" element={<UserRegister />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="error" element={<UserError />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="add-task" element={<AddTask />} />
              <Route path="edit-task" element={<EditTask />} />
            </Routes>
          </section>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
