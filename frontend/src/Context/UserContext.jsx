import { createContext } from "react";
import useAuth from '../Hooks/useAuth'
import useScrollToTop from "../Hooks/useScrollToTop";

const Context = createContext()

function UserProvider({ children }) {
  const { authentication, login, register, logout, updateUser, publish, followUser, unFollowUser, comment, denouncePubli, removeNotifications, deletePublication } = useAuth()
  const { goTop } = useScrollToTop()

  return (
    <Context.Provider value={{ authentication, login, register, logout, updateUser, goTop, publish, followUser, unFollowUser, comment, denouncePubli, removeNotifications, deletePublication }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }