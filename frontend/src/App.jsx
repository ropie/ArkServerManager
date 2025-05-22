import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar";

console.log(import.meta.env.VITE_SERVER_URL)

const App = () => {
  return (
    <div className='p-6'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
