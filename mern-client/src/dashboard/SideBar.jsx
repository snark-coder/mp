import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiBookmark,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
} from "react-icons/hi";

import userimage from "../assets/logo.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { user } = useContext(AuthContext);

  const userId = user?.uid; // ✅ safely access uid

  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <Link to="/">
      <SidebarLogo  img={userimage} imgAlt="logo">
        Lend&Read
      </SidebarLogo>
      </Link>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
            Upload Books
          </SidebarItem>
          <SidebarItem href="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </SidebarItem>
          {userId && (
            <SidebarItem href={`/my-rentals`} icon={HiBookmark}>
              My Rentals
            </SidebarItem>
          )}
          
          <SidebarItem href="/login" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="/logout" icon={HiTable}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default SideBar;
