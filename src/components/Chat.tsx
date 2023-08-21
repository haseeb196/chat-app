import { Avatar, IconButton } from "@mui/material";
import React from "react";

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
const Chat: React.FC = () => {
  return (
    <div className="flex w-full flex-col justify-between">
      <div className="h-full overflow-hidden pb-[4.3rem]">
        <div className="flex items-center justify-between px-6 py-3 shadow-md">
          <div className="flex items-center space-x-3">
            <Avatar src={""} />
            <p className="text-lg font-semibold capitalize">dgsgsg</p>
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
        <div className="h-full  overflow-y-scroll px-6">
          <div className="flex flex-row items-center justify-center capitalize">
            <hr className="w-full !bg-black" />
            <span className="px-3">today</span>
            <hr className="w-full !bg-black" />
          </div>
          <MainChat />
        </div>
      </div>
      <hr />
      <div className="p-4">
        <div className="flex w-full items-center justify-between rounded-xl bg-slate-100 px-2 py-1">
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
        </div>
      </div>
    </div>
  );
};

export default Chat;
