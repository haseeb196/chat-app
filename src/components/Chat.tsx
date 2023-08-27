/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Avatar, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import {
  Search,
  Mic,
  FavoriteBorder,
  NotificationsNone,
  AttachFile,
  PhotoCamera,
  SentimentSatisfiedAltOutlined,
  Send,
} from "@mui/icons-material";
import MainChat from "./MainChat";
import { Mycontext } from "./ChatContext";
import { type Timestamp, collection, getDocs } from "firebase/firestore";
import db from "@/utils/firebase";
import { useSession } from "next-auth/react";
interface chatType {
  image: string;
  message: string;
  name: string;
  timestamp: Timestamp;
}
const Chat: React.FC = () => {
  const [chats, setChats] = useState<chatType[]>([]);
  const session = useSession();
  const { chatid, userimage } = useContext(Mycontext);
  useEffect(() => {
    if (chatid !== "") {
      void (async () => {
        const chatdsg = collection(
          db,
          "users",
          session.data?.user?.name!,
          "chats",
          chatid,
          "messages"
        );
        const chatsdata = getDocs(chatdsg);
        const chatarray: chatType[] = [];
        if (chatsdata !== undefined) {
          (await chatsdata).forEach((doc) => {
            const thischat = doc.data() as chatType;

            chatarray.push(thischat);
          });
          setChats(chatarray);
        }
      })();
    }
  }, [chatid, session]);

  return (
    chatid !== "" && (
      <div className="flex w-full flex-col justify-between">
        <div className="h-full overflow-hidden pb-[4.3rem]">
          <div className="flex items-center justify-between px-6 py-3 shadow-md">
            <div className="flex items-center space-x-3">
              <Avatar src={userimage} />
              <p className="text-lg font-semibold capitalize">{chatid}</p>
            </div>
            <div className="flex space-x-2 !text-[#D3D3D3]">
              <IconButton>
                <Search />
              </IconButton>
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <IconButton>
                <NotificationsNone />
              </IconButton>
            </div>
          </div>
          <div className="h-full  overflow-y-scroll px-6 py-3">
            <div className="flex flex-row items-center justify-center capitalize">
              <hr className="w-full !bg-black" />
              <span className="px-3">today</span>
              <hr className="w-full !bg-black" />
            </div>
            {chats?.map((x) => {
              return (
                <MainChat
                  eimg={x.image}
                  ename={x.name}
                  emessage={x.message}
                  etimestamp={x.timestamp}
                  key={x.name}
                />
              );
            })}
          </div>
        </div>
        <hr />
        <div className="p-4">
          <form className="flex w-full items-center justify-between rounded-xl bg-slate-100 px-2 py-1">
            <div className="flex w-full space-x-1">
              <IconButton>
                <Mic />
              </IconButton>
              <input
                type="text"
                className="flex-1 bg-transparent pr-1 outline-none"
              />
            </div>
            <div className="flex space-x-1">
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <PhotoCamera />
              </IconButton>
              <IconButton>
                <SentimentSatisfiedAltOutlined />
              </IconButton>
              <IconButton>
                <Send />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Chat;
