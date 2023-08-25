/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import db from "@/utils/firebase";
import { Avatar } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, type FC, useState, useContext } from "react";
import { Mycontext } from "./ChatContext";
interface props {
  chatname: string;
}
interface chatMessage {
  message: string;
  image: string;
}
const Users: FC<props> = ({ chatname }) => {
  const [lastchat, setLastchat] = useState<chatMessage | undefined>();
  const session = useSession();
  const sessionData = session?.data;
  const chatContext = useContext(Mycontext);
  useEffect(() => {
    //get the last chat message
    void (async () => {
      const chatdsg = collection(
        db,
        "users",
        sessionData?.user?.name!,
        "chats",
        chatname,
        "messages"
      );
      const lastchatdg = (await getDocs(chatdsg)).docs[0]?.data();
      if (!lastchatdg?.empty) {
        const formatedchat: chatMessage = {
          image: lastchatdg?.image,
          message: lastchatdg?.message,
        };
        setLastchat(formatedchat);
      }
    })();
  }, [chatname, sessionData]);

  if (!chatContext) {
    return null;
  }
  const { setChatid } = chatContext;

  return (
    <div
      onClick={() => setChatid(chatname)}
      className="flex justify-between rounded-lg px-3 py-2 hover:bg-white"
    >
      <div className="flex items-center space-x-4">
        <Avatar src={lastchat?.image} />
        <div>
          <h2 className="text-[17px] font-semibold capitalize text-sky-700">
            {chatname}
          </h2>
          <p className="line-clamp-1 text-sm">{lastchat?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
