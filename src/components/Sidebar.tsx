import { Avatar } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Users from "./Users";
const Sidebar: React.FC = () => {
  return (
    <div className="flex w-[350px] flex-col space-y-5 bg-[#F5F5F5] px-4 pt-5">
      <div className="flex items-center space-x-4">
        <Avatar src={""} />
        <div>
          <p className="capitalize text-[19px] font-bold text-sky-500">UserName</p>
          <p className="text-sm">Senior Dev</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 rounded-xl bg-white px-2 py-2">
        <div>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search User"
          className="bg-transparent outline-none"
        />
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};

export default Sidebar;
