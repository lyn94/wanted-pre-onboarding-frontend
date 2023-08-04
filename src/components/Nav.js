import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import RouterPaths from "../lib/client/routerPaths";
import { cls } from '../lib/common/utils';

const Nav = () => {
  const location = useLocation();
  return (
    <div className="flex justify-around flex-row w-full my-6 mx-auto">
      {Object.keys(RouterPaths).map((urlKey) => {
        const url = RouterPaths[urlKey];
        return (
          <NavLink
            to={url.path}
            key={url.name}
            className={cls(
              "p-4 rounded-[50%]",
              location.pathname === url.path && "text-black font-bold bg-orange-200"
            )}
          >
            {url.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Nav;
