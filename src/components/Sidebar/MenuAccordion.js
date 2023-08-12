import React, { useState } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import CustomLink from "../Link";
import { FiLogOut } from "react-icons/fi";

const MenuAccordion = ({ d, sideBarShow, logout, userRole }) => {
  const [collapse, setCollapse] = useState(false);
  const toggle = (index) => {
    if (collapse === index) {
      return setCollapse(null);
    }
    setCollapse(index);
  };
  const perRoute = d.filter((rt) => rt?.permission?.includes(userRole));

  return (
    <>
      {perRoute.map((d, i) => (
        <li
          key={d.id}
          className={`tronliveClub_sidebar_menu_list ${
            d.dropdown ? "submenu" : ""
          }`}
          id={d.id}
        >
          <CustomLink
            href={d.route}
            onClick={() => {
              toggle(d.id);
              if (!d.dropdown) {
                sideBarShow(true);
              }
            }}
            className="tronliveClub_nav_link"
          >
            <div className="icon_text">
              <span>{d.icon}</span>
              <p>{d.menu}</p>
            </div>
            {d.dropdown && (
              <span>
                <RiArrowDropRightLine />
              </span>
            )}
          </CustomLink>
          {collapse === d.id ? (
            <ul>
              {d.dropdown
                ?.filter((pt) => pt?.permission?.includes(userRole))
                ?.map((drop) => {
                  return (
                    <li key={drop.id}>
                      <CustomLink
                        href={drop.route}
                        className="tronliveClub_nav_link dropdown"
                        onClick={() => {
                          sideBarShow(true);
                          setCollapse(false);
                        }}
                      >
                        {drop.menu}
                      </CustomLink>
                    </li>
                  );
                })}
            </ul>
          ) : null}
        </li>
      ))}
      <li className="tronliveClub_sidebar_menu_list" onClick={logout}>
        <CustomLink href="#" className="tronliveClub_nav_link">
          <div className="icon_text">
            <span>
              <FiLogOut />
            </span>
            <p>Logout</p>
          </div>
        </CustomLink>
      </li>
    </>
  );
};

export default MenuAccordion;
