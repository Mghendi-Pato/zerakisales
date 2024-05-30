import { RxDashboard } from "react-icons/rx";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import { MdSchool } from "react-icons/md";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [active, setActive] = useState(false);
  const pathname = useLocation();
  const path = pathname.pathname;

  useEffect(() => {
    setActive(path.startsWith("/schools"));
  }, [path]);

  const [show, setShow] = useState(false);
  return (
    <div>
      <Navbar show={show} setShow={setShow} />
      <Sidebar show={show}>
        <SidebarItem
          icon={<RxDashboard size="30" />}
          text="Dashboard"
          route={"/"}
        />
        <SidebarItem
          icon={<MdSchool size="40" className="text-gray-300" />}
          active={active}
          text="Schools"
          route={"/schools"}
        />
      </Sidebar>
      <div className="mx-2 md:mx-[10%]">{children}</div>
    </div>
  );
};

export default Layout;
