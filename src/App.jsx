 import Register from "./pages/Register";
 import Login from "./pages/Login";
 import { Routes,Route,Navigate} from "react-router-dom";
 import Dashboard from "./Dashboard";
 import ProtectedRoute from "./ProtectedRoute";
function App() {
   

  return (
    <>
     <Routes>
      <Route path="/" element = {<Navigate to={'/register'} replace />}  />
       <Route path="/register" element= {<Register />} />
       <Route path="/login" element ={<Login />} />
        <Route path="/dashboard" element ={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
     </Routes>
    
    </>
  )
}

export default App
