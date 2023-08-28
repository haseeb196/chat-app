/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
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
import {
  type Timestamp,
  collection,
  getDocs,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import db from "@/utils/firebase";
import { useSession } from "next-auth/react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

interface chatType {
  image: string;
  message: string;
  name: string;
  timestamp: Timestamp;
}
const Chat: React.FC = () => {
  const [msg, setMsg] = useState<string>("");
  const [chats, setChats] = useState<chatType[]>([]);
  const [emoji, setEmoji] = useState(false);
  const session = useSession();
  const { chatid, userimage } = useContext(Mycontext);
  useEffect(() => {
    if (chatid !== "") {
      const chatdsg = collection(
        db,
        "users",
        session.data?.user?.name!,
        "chats",
        chatid,
        "messages"
      );
      const queryRef = query(chatdsg, orderBy("timestamp", "asc"));

      const chatsdata = getDocs(queryRef);
      let Unsubscribe: Unsubscribe;
      if (chatsdata !== undefined) {
        Unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
          const chatarray: chatType[] = [];
          querySnapshot.forEach((doc) =>
            chatarray.push(doc.data() as chatType)
          );
          setChats(chatarray);
        });
      }
      return () => {
        Unsubscribe();
      };
    }
  }, [chatid, session]);

  const handleinput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg !== "" && chatid !== "") {
      //send the msg
      const messageData = {
        message: msg,
        name: session.data?.user.name,
        image: session.data?.user.image,
        timestamp: serverTimestamp(),
      };

      addDoc(
        collection(
          db,
          "users",
          session.data?.user.name!,
          "chats",
          chatid,
          "messages"
        ),
        messageData
      ).catch((e) => console.log(e));
      addDoc(
        collection(
          db,
          "users",
          chatid,
          "chats",
          session.data?.user.name!,
          "messages"
        ),
        messageData
      ).catch((e) => console.log(e));
    }
    setMsg("");
  };
  const handleEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    event.preventDefault();
    setMsg((prev) => prev + emojiObject.emoji);
    setEmoji(!emoji);
  };
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
            {chats?.map((x, id) => {
              return (
                <MainChat
                  eimg={x.image}
                  ename={x.name}
                  emessage={x.message}
                  etimestamp={x.timestamp}
                  key={id}
                />
              );
            })}
          </div>
        </div>
        <hr />
        <div className="p-4">
          <form
            onSubmit={handleinput}
            className="flex w-full items-center justify-between rounded-xl bg-slate-100 px-2 py-1"
          >
            <div className="flex w-full space-x-1">
              <IconButton>
                <Mic />
              </IconButton>
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
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
              <div className="relative">
                <IconButton onClick={() => setEmoji(!emoji)}>
                  <SentimentSatisfiedAltOutlined />
                </IconButton>
                {emoji && (
                  <div className="absolute bottom-2 right-0">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>

              <IconButton type="submit">
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
