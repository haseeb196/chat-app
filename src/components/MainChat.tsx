import React from "react";
import { Avatar } from "@mui/material";
const MainChat: React.FC = () => {
  return (
    <div className={`flex gap-3 py-3 ${false && "flex-row-reverse"} flex-row`}>
      <Avatar src={""} sx={{ width: 24, height: 24 }} className="self-end" />
      <p
        className={`flex flex-col rounded-lg rounded-bl-none bg-[#F5F5F5] px-3 py-2 ${
          false && "rounded-bl-lg rounded-br-none bg-sky-500 text-white"
        }`}
      >
        <span>Lorem ipsum dolor, sit amet</span>
        <span className="self-end text-xs">10:56pm</span>
      </p>
    </div>
  );
};

export default MainChat;
