import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import "@/styles/globals.css";
import ChatContext from "@/components/ChatContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChatContext>
        <Component {...pageProps} />
      </ChatContext>
    </SessionProvider>
  );
};

export default MyApp;
