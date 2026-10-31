  import { useNavigate } from "react-router-dom"
 
  function Dashboard () {
        const navigate = useNavigate ();
       function handleLogout () {
        localStorage.removeItem ('token');
        navigate ('/login');
       }
    return (
        <div className="bg-gray-200 flex flex-col justify-center items-center min-h-screen">
            <h1 className="mb-2 text-xl font-semibold">Welcome user!</h1>
            <button className="bg-blue-400 rounded text-white p-2" onClick={handleLogout}>Logout</button>
        
        </div>
    )
  }
  export default Dashboard