/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Avatar, IconButton, Backdrop } from "@mui/material";
import React, { useState, useEffect, ReactElement } from "react";
import { Search, Add, Close } from "@mui/icons-material";

import Users from "./Users";
import Menus from "./Menus";
import { useSession } from "next-auth/react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "@/utils/firebase";

interface props {
  tag: string;
}
const Sidebar: React.FC<props> = ({ tag }) => {
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState<{ id: string }[]>([]);
  const [finduser, setFinduser] = useState<string>("");
  const [backdrops, setBackdrops] = useState<boolean>(false);
  const Userdata = useSession().data;
  const userimage = Userdata?.user.image;

  useEffect(() => {
    void (async () => {
      if (Userdata !== undefined) {
        const chat = getDocs(
          collection(db, "users", Userdata?.user.name!, "chats")
        );
        const chatdoc: React.SetStateAction<{ id: string }[]> = [];
        (await chat).forEach((doc) => chatdoc.push({ id: doc.id }));
        setChats(chatdoc);
      }
    })();
  }, [Userdata]);

  const findUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackdrops(false);
    if (finduser !== "" && finduser !== tag) {
      const q = query(collection(db, "users"), where("tag", "==", finduser));
      const userid = (await getDocs(q)).docs[0]?.id;
      if (userid !== undefined) {
        setDoc(
          doc(collection(db, "users", Userdata?.user.name!, "chats"), userid),
          {}
        ).catch((e) => console.log(e));
        setDoc(
          doc(collection(db, "users", userid, "chats"), Userdata?.user.name!),
          {}
        ).catch((e) => console.log(e));
      }
    }
  };

  return (
    <div className="flex w-[309px] flex-col space-y-5 bg-[#F5F5F5] px-4 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {userimage && <Avatar src={userimage} alt="" />}
          <div>
            <p className="text-[19px] font-bold capitalize text-sky-500">
              {Userdata?.user.name}
            </p>
            <p className="text-sm">{tag}</p>
          </div>
        </div>
        <Menus />
      </div>
      <div className="flex items-center justify-between space-x-2 rounded-xl bg-white px-2 py-2">
        <Search fontSize="medium" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search User"
          className="bg-transparent outline-none"
        />
        <div>
          <IconButton onClick={() => setBackdrops(true)}>
            <Add />
          </IconButton>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrops}
        >
          <div className="relative flex flex-col gap-2 rounded-lg bg-gray-400 px-8 py-6 text-black">
            <span>Enter User Tag:</span>
            <form onSubmit={findUsers}>
              <input
                type="text"
                placeholder="@user3525"
                className="p-1 outline-none"
                value={finduser}
                onChange={(e) => setFinduser(e.target.value)}
              />
            </form>
            <IconButton
              className="!absolute !right-0 !top-0"
              onClick={() => setBackdrops(false)}
            >
              <Close />
            </IconButton>
          </div>
        </Backdrop>
      </div>
      <div className="no-scrollbar flex flex-col space-y-4 overflow-y-auto py-3">
        {chats.map((x) => (
          <Users chatname={x.id} key={x.id} search={search} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
