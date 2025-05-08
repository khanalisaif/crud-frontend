import Todo from "./Todo"
import ProtectedRoute from './ProtectedRoute';
import Signup from "./Signup";
import Login from "./Login";
import { Route,  BrowserRouter as Router, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App
