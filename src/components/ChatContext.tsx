/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  type ReactNode,
  type ReactPortal,
} from "react";
interface contextType {
  children: ReactNode | ReactPortal;
}
interface chatType {
  chatid: string;
  setChatid: (chatid: string) => void;
  userimage: string;
  setUserimage: (userimage: string) => void;
}
const initialcontext: chatType = {
  chatid: "",
  setChatid: () => {},
  userimage: "",
  setUserimage: () => {},
};
export const Mycontext = createContext<chatType>(initialcontext);
const ChatContext: React.FC<contextType> = ({ children }) => {
  const [chatid, setChatid] = useState("");
  const [userimage, setUserimage] = useState("");
  const contextValue: chatType = {
    chatid,
    setChatid,
    userimage,
    setUserimage,
  };

  return (
    <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
  );
};

export default ChatContext;
