import React from "react";
import { Avatar } from "@mui/material";
const MainChat: React.FC = () => {
  return (
    <div
      className={`flex gap-3 py-3 ${false && "flex-row-reverse"} flex-row`}
    >
      <Avatar src={""} sx={{ width: 24, height: 24 }} className="self-end" />
      <p
        className={`rounded-lg rounded-bl-none bg-[#F5F5F5] px-3 py-2 ${
          false && "bg-sky-500 text-white rounded-bl-lg rounded-br-none"
        }`}
      >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum officia est deserunt enim, voluptate quia voluptas nemo asperiores doloremque accusamus tempora iusto autem minus, maiores fugit illum? Eligendi, eius in.
      </p>
    </div>
  );
};

export default MainChat;
