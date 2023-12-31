/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import Chat from "@/components/Chat";
import db from "@/utils/firebase";
import Login from "@/components/Login";
import Sidebar from "@/components/Sidebar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const session = useSession();
  const [usertag, setUsertag] = useState("");

  useEffect(() => {
    if (session.data !== null && session.data !== undefined) {
      void (async () => {
        const datas = await getDoc(
          doc(db, "users", session.data.user.name as string)
        );
        if (datas.data() == undefined) {
          const user =
            "@" +
            session.data.user.name?.toLowerCase().replace(/ /g, "") +
            Math.floor(1000 + Math.random() * 9000).toString();
          setUsertag(user);
          setDoc(doc(db, "users", session.data.user.name as string), {
            tag: user,
            image: session.data.user.image,
          }).catch((e) => console.log(e));
        }
        setUsertag(datas.data()?.tag as string);
      })();
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Possup</title>
        <meta name="description" content="chat-app" />
        <link rel="icon" href="/app-logo.png" />
      </Head>
      {session.data !== null ? (
        <main className="flex h-screen">
          <Sidebar tag={usertag} />
          <Chat />
        </main>
      ) : (
        <Login />
      )}
    </>
  );
}
