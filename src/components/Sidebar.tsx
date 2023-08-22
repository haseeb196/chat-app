/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Avatar, IconButton, Backdrop } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, Add } from "@mui/icons-material";
import Users from "./Users";
import Menus from "./Menus";
import { useSession } from "next-auth/react";
const Sidebar: React.FC = () => {
  const [usertag, setUsertag] = useState<string>("");
  const [backdrops, setBackdrops] = useState<boolean>(false);
  const Userdata = useSession().data;
  const findUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackdrops(false);
  };

  useEffect(() => {
    if (Userdata !== null) {
      const user =
        Userdata?.user?.name?.toLowerCase().replace(/ /g, "") +
        Math.floor(1000 + Math.random() * 9000).toString();

      setUsertag(user);
    }
  }, [Userdata]);

  return (
    <div className="flex w-[350px] flex-col space-y-5 bg-[#F5F5F5] px-4 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar src={""} />
          <div>
            <p className="text-[19px] font-bold capitalize text-sky-500">
              {Userdata?.user.name}
            </p>
            <p className="text-sm">@{usertag}</p>
          </div>
        </div>
        <Menus />
      </div>
      <div className="flex items-center space-x-2 rounded-xl bg-white px-2 py-2">
        <Search />
        <input
          type="text"
          placeholder="Search User"
          className="bg-transparent outline-none"
        />
        <IconButton onClick={() => setBackdrops(true)}>
          <Add />
        </IconButton>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrops}
        >
          <div className="flex flex-col gap-2 rounded-lg bg-gray-400 px-8 py-6 text-black">
            <span>Enter User Tag:</span>
            <form onSubmit={(e) => findUser(e)}>
              <input
                type="text"
                placeholder="@user3525"
                className="p-1 outline-none"
              />
              <button type="submit" className="hidden"></button>
            </form>{" "}
          </div>
        </Backdrop>
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};

export default Sidebar;
