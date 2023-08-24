import { Avatar } from "@mui/material";
import React, { type FC } from "react";
interface props {
  chatname: string;
}
const Users: FC<props> = ({ chatname }) => {
  return (
    <div className="flex justify-between rounded-lg px-3 py-2 hover:bg-white">
      <div className="flex items-center space-x-4">
        <Avatar src={""} />
        <div>
          <p className="text-[17px] font-semibold capitalize text-sky-700">
            {chatname}
          </p>
          <p className="line-clamp-1 text-sm">Loremg ipsum dolor sitame</p>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="whitespace-nowrap text-[14px]">10:56 pm</p>
        <p className="self-end rounded-full bg-sky-500 px-2 py-[2.5px] text-[10px] text-white">
          1
        </p>
      </div>
    </div>
  );
};

export default Users;
