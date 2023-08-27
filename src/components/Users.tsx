/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import db from "@/utils/firebase";
import { Avatar } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, type FC, useState, useContext } from "react";
import { Mycontext } from "./ChatContext";
interface props {
  chatname: string;
}
interface Userchats {
  message: string;
  image: string;
}
const Users: FC<props> = ({ chatname }) => {
  const [userchat, setUserchat] = useState<Userchats | undefined>();
  const session = useSession();
  const sessionData = session?.data;
  const chatContext = useContext(Mycontext);
  const { setChatid, chatid, setUserimage } = chatContext;
  useEffect(() => {
    void (async () => {
      const chatdsg = collection(
        db,
        "users",
        sessionData?.user?.name!,
        "chats",
        chatname,
        "messages"
      );
      const imagedata = getDoc(doc(db, "users", chatname));
      const image = (await imagedata).data();
      const lastchatdg = (await getDocs(chatdsg)).docs[0]?.data();
      if (!lastchatdg?.empty || !(await imagedata).exists) {
        const formatedchat: Userchats = {
          image: image?.image,
          message: lastchatdg?.message,
        };
        setUserchat(formatedchat);
        setUserimage(image?.image);
      }
    })();
  }, [chatname, sessionData, setUserimage]);

  return (
    <div
      onClick={() => setChatid(chatname)}
      className={`${
        chatid === chatname && "bg-white"
      } flex justify-between rounded-lg px-3 py-2 hover:bg-white`}
    >
      <div className="flex items-center space-x-4">
        <Avatar src={userchat?.image} />
        <div>
          <h2 className="text-[17px] font-semibold capitalize text-sky-700">
            {chatname}
          </h2>
          <p className="line-clamp-1 text-sm">{userchat?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
