/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from "next/image";
import React from "react";

const Login = () => {
  const popupCenter = (
    url: string | URL | undefined,
    title: string | undefined
  ) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  return (
    <main className="mx-auto flex h-screen !max-w-[410px] flex-col justify-center">
      <Image
        width={1920}
        height={1080}
        src={"/app-logo.png"}
        alt=""
        className="bg-transparent"
        priority
      />
      <button
        onClick={() => popupCenter("/google-signin", "google-signin")}
        className="-mt-10 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Login
      </button>
    </main>
  );
};

export default Login;
