import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import UserDataContext from "~/context/UserDataContext";
import stylesheet from "~/index.css";
import satoshi from "~/satoshi.css";
import { useState } from "react";
import { UserDataProvider } from "~/context/UserDataContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "CPT",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: satoshi },
  ];
}

export default function Root() {

  return (
    <UserDataProvider>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </UserDataProvider>
  );
}
