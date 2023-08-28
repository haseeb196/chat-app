import React from "react";
import { Avatar } from "@mui/material";
import type { Timestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
interface eachChatType {
  eimg: string;
  emessage: string;
  ename: string;
  etimestamp: Timestamp;
}
const MainChat: React.FC<eachChatType> = ({
  eimg,
  emessage,
  etimestamp,
  ename,
}) => {
  const session = useSession();
  const formatTimestamp = (timestamp: Timestamp) => {
    const date = timestamp?.toDate();
    const hours = date?.getHours();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = date?.getMinutes().toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}${period}`;
  };

  return (
    <div
      className={`${
        session.data?.user.name == ename
          ? "mr-auto"
          : "ml-auto flex-row-reverse"
      } flex flex-row gap-3 py-3`}
    >
      <Avatar src={eimg} sx={{ width: 24, height: 24 }} className="self-end" />
      <p
        className={`flex min-w-[100px] flex-col items-center gap-y-2 rounded-lg  px-3 py-2 ${
          session.data?.user.name === ename
            ? "rounded-bl-none  bg-[#F5F5F5] text-black"
            : " rounded-br-none bg-sky-500  text-white"
        }`}
      >
        <span className="self-start">{emessage}</span>
        <span className="self-end text-xs">{formatTimestamp(etimestamp)}</span>
      </p>
    </div>
  );
};

export default MainChat;
