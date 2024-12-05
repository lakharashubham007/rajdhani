import React, { useReducer, useContext, useEffect, useState } from "react";
import { Collapse } from 'react-bootstrap';
/// Link
import { Link } from "react-router-dom";
import { MenuList } from './Menu';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { getSidebarMenusApi } from "../../../services/apis/SidebarMenuApi";
import { transform } from "lodash";
// import LogoutPage from './Logout';
/// Image
// import profile from "../../../assets/images/profile/pic1.jpg";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}

const SideBar = () => {
  let dat = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )


  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }
  }

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title })
        }
        item.content?.forEach(ele => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title })
          }
        })
      })
    })
  }, [path]);

  const [sidebarMenus, setSidebarMenus] = useState([]);

  console.log(sidebarMenus, "sidebarmenus are here")

  useEffect(() => {
    // Define the function to fetch sidebar menus
    const fetchSidebarMenus = async () => {
      try {

        const response = await getSidebarMenusApi();
        const menus = response?.data?.MenuList;


        // Transform iconStyle strings into React elements
        const updatedMenus = menus.map(menu => {
          if (menu.iconStyle) {
            // Extract the className from the string (e.g., 'la la-home')
            const classNameMatch = menu.iconStyle.match(/className=['"]([^'"]+)['"]/);

            if (classNameMatch && classNameMatch[1]) {
              const iconClass = classNameMatch[1];

              // Convert the string into a React element
              return {
                ...menu,
                iconStyle: <i className={iconClass} />
              };
            }
          }
          return menu;
        });

        // Organize menus by module_id and children
        const formattedMenus = updatedMenus
          .filter(menu => menu.module_id) // Get parent modules
          .map(parent => ({
            ...parent,
            children: updatedMenus
              .filter(child => child.parent_module_id === parent.module_id) // Match children
              .sort((a, b) => a.module_menu_priority - b.module_menu_priority), // Sort by child priority
          }))
          .sort((a, b) => a.module_priority - b.module_priority);
        console.log("menus", formattedMenus)

        const extractIndividualEntries = (menus) => {
          let result = [];

          menus.forEach(menu => {
            // Add parent menu
            result.push({
              ...menu,
              children: undefined, // Remove children
              content: undefined  // Remove content
            });

            // Add children menus
            if (menu.children && menu.children.length > 0) {
              menu.children.forEach(child => {
                result.push({
                  ...child,
                });

                // Add nested content in children (if exists)
                // if (child.content && child.content.length > 0) {
                //   result.push(...child.content);
                // }
              });
            }
          });

          return result;
        };

        const individualEntries = extractIndividualEntries(formattedMenus);
        console.log(individualEntries);
        setSidebarMenus(formattedMenus);


      } catch (err) {
        // Handle any errors
        // setError(err.message);
        // setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchSidebarMenus();
  }, []);

  const getBadgeColorClass = (status) => {
    switch (status) {
      case "All":
      case "Scheduled":
      case "Accepted":
      case "Processing":
      case "Food on the way":
      case "Offline Payments":
        return "badge-primary"; // Blue for orders before Delivered
      case "Delivered":
        return "badge-success"; // Green for Delivered
      case "Pending":
      case "Payment Failed":
      case "Refunded":
      case "Canceled":
        return "badge-danger"; // Red for orders after Delivered
      default:
        return "badge-secondary"; // Gray for unknown or other statuses
    }
  };

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}
    >
      <div className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          {/* All Main Modules  class sidebar-lebel */}
          {sidebarMenus?.map((data, index) => {
            let menuClass = data.classChange;
            return (
              <li className={`sidebar-lebel  metismenu ${menuClass} ${data.extraClass}`} key={index} >{data.title}
                {/* Check Menus */}
                {data.children?.length > 0 && (
                  <li className={` ${state.active === data.title ? 'mm-active' : ''}${data.to === path ? 'mm-active' : ''}`}
                    key={index}
                  >
                    {/* Extract Menus */}
                    {data.children?.map((child) => (
                      {/* Type 1st Menus Collapsible */ },
                      child?.content && child?.content?.length > 0 ? (
                        <>
                          <Link to={"#"}
                            className="has-arrow"
                            onClick={() => { handleMenuActive(child?.title) }}
                          >
                            {child.iconStyle}
                            <span className="nav-text">{child?.title}</span>
                            <span className="badge badge-xs style-1 badge-danger">{child?.update}</span>
                          </Link>
                          <Collapse in={state.active === child?.title ? true : false}>
                            <ul className={`${child.classChange === "mm-collapse" ? "mm-show" : ""}`} >
                              {/* Extract Sub Menus */}
                              {child.content && child?.content.map((subChild, index) => {
                                return (
                                  <li key={index}
                                    className={` ${state.activeSubmenu === subChild?.title ? "mm-active" : ""}${subChild?.to === path ? 'mm-active' : ''}`}
                                  >
                                    <>
                                      <Link to={subChild?.to} className={subChild?.hasMenu ? 'has-arrow' : ''}
                                        onClick={() => { handleSubmenuActive(subChild?.title) }}
                                      >
                                        {subChild?.title}
                                      </Link>
                                    </>
                                  </li>
                                )
                              })}
                            </ul>
                          </Collapse>
                        </>
                      ) : (
                        {/* Type 2nd Menus Non Collapsible */ },
                        <Link
                          to={child?.to}
                          className={`${child?.to === path ? 'mm-active' : ''}`}
                          key={child?._id}
                        >
                          {child.iconStyle}
                          <span className="nav-text">{child?.title}</span>
                        </Link>
                      )
                    ))}
                  </li>
                )}
              </li>
            )
          })}
        </ul>
        {/* Footer */}
        <div className="copyright">
          <p>Idea2Reality Admin © {dat.getFullYear()} All Rights Reserved</p>
          <p className="fs-12">Made with <span className="heart"
            onClick={(e) => e.target.classList.toggle('heart-blast')}
          ></span> by Idea2Reality.tech</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
