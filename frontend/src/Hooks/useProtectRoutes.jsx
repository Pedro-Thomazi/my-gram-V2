import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context/UserContext";

const ProtectRoutes = ({children}) => {
  // const {authentication} = useContext(Context)

  // if (authentication === false) {
  //   return <Navigate to='/login' />
  // }

  // return children
}

export default ProtectRoutes