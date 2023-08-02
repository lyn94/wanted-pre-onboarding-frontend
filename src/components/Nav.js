import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import RouterPaths from "../lib/client/routerPaths";

const Nav = () => {
  const location = useLocation();
  return(
    <div className="flex justify-between flex-row w-full">
    {
      Object.keys(RouterPaths).map((urlKey) => {
        const url = RouterPaths[urlKey];
        return(
          <NavLink to={url.path} key={url.name} className={location.pathname === url.path && "text-red-500"} >{url.name}</NavLink>
        )
      })
    }
    </div>

  )
  
};

export default Nav;
