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
}
export const Mycontext = createContext<chatType | undefined>(undefined);
const ChatContext: React.FC<contextType> = ({ children }) => {
  const [chatid, setChatid] = useState("");
  const contextValue: chatType = {
    chatid,
    setChatid,
  };

  return (
    <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
  );
};

export default ChatContext;
