import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Home from "./Pages/Home/Home"
import { UserProvider } from "./Context/UserContext"
import FlashMessage from "./Components/FlashMessage/FlashMessage"
import Dashboard from "./Pages/Dashboard/Dashboard"
import UpdateUser from "./Pages/UpdateUser/UpdateUser"
import UserPage from "./Pages/UserPage/UserPage"
import CreatePubli from "./Pages/CreatePubli/CreatePubli"
import DenouncePage from "./Pages/DenouncePage/DenouncePage"
import UserNotifications from "./Pages/UserNotifications/UserNotifications"
import MyPubli from "./Components/MyPubli/MyPubli"

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <FlashMessage />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/update-perfil/:id' element={<UpdateUser />} />
            <Route path='/user/:name/:id' element={<UserPage />} />
            <Route path='/my-publication' element={<CreatePubli />} />
            <Route path='/denounce/:id' element={<DenouncePage />} />
            <Route path='/my-notifications' element={<UserNotifications />} />
            <Route path='/publication/:id' element={<MyPubli />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
