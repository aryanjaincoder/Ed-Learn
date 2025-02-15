

import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Chatbot from "../components/chatbot/Chatbot";
// import Chatbot from "../components/chatbot/Chatbot";

function Layout() {
  return (
    <>
    <Chatbot/>
    <div className="layout">
      <div className="navbar">
        <Topbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
    </>
  );
}

export default Layout;
