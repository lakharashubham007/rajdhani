import React, { useReducer, useContext, useEffect, useState } from "react";
import { Collapse } from 'react-bootstrap';
/// Link
import { Link } from "react-router-dom";
import { MenuList } from './Menu';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { getSidebarMenusApi } from "../../../services/apis/SidebarMenuApi";
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

        setSidebarMenus(updatedMenus);

        // // Replace this URL with your actual API endpoint
        // const response = await getSidebarMenusApi(); // Set the fetched sidebar menus to state
        // console.log(response, 'response is hereeeeeee');

        // // setSidebarMenus(response?.data?.MenuList);
        // setLoading(false);
      } catch (err) {
        // Handle any errors
        // setError(err.message);
        // setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchSidebarMenus();
  }, []);

  // Function to determine badge color class based on data.update
   // Function to determine badge color class based on data.update
   // Function to determine badge color class based on status
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
          {/* sidebarMenus */}
          {sidebarMenus?.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={`nav-label ${menuClass} ${data.extraclass}`} key={index} >{data.title}</li>
              )
            } else {
              return (
                <li className={` ${state.active === data.title ? 'mm-active' : ''}${data.to === path ? 'mm-active' : ''}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ?
                    <>
                      <Link to={"#"}
                        className="has-arrow"
                        onClick={() => { handleMenuActive(data.title) }}
                      >
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                        <span className="badge badge-xs style-1 badge-danger">{data.update}</span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                          {data.content && data.content.map((data, index) => {

                            return (
                              <li key={index}
                                className={`${state.activeSubmenu === data.title ? "mm-active" : ""}${data.to === path ? 'mm-active' : ''}`}
                              >
                                {data.content && data.content.length > 0 ?

                                  <>
                                    <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                      onClick={() => { handleSubmenuActive(data.title) }}
                                    >
                                      {data.title}

                                    </Link>

                                    <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                      <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                        {data.content && data.content.map((data, index) => {
                                          return (
                                            <li key={index}>
                                              <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>
                                                {data.title}


                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </Collapse>
                                  </>
                                  :
                                  <Link to={data.to}
                                    className={`${data.to === path ? 'mm-active' : ''}`}
                                  >
                                    {data.title}
                                    <span  className={`badge badge-xs style-1 ${getBadgeColorClass(data.title)}`}>
                                      {data.update}
                                    </span>
                                  </Link>
                                }
                              </li>
                            )
                          })}
                        </ul>
                      </Collapse>
                    </>
                    :
                    <Link to={data.to} className={`${data.to === path ? 'mm-active' : ''}`}>
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  }
                </li>
              )
            }
          })}
        </ul>
        <div className="copyright">
          <p>Bhookhe Admin © {dat.getFullYear()} All Rights Reserved</p>
          <p className="fs-12">Made with <span className="heart"
            onClick={(e) => e.target.classList.toggle('heart-blast')}
          ></span> by Idea2Reality.tech</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
