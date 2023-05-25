import { json, redirect } from "@remix-run/server-runtime";
import jwt from "jsonwebtoken";

type LoadFunctionParams = Parameters<LoaderFunction>[0];

interface LoadFunction {
  (args: LoadFunctionParams): Promise<any>;
}

export const withAuthentication = (loadFunction: LoadFunction) => {
    // This should return a function, which is the actual loader
    return async ({ request, ...args }: LoadFunctionParams) => {
      const cookiesHeader = request.headers.get("Cookie") || "";
      const cookies = new Map(
        cookiesHeader.split("; ").map((cookie) => cookie.split("="))
      );
      const token = cookies.get("token");
  
      try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
      } catch (err) {
        return redirect("/login");
      }
  
      return await loadFunction({ request, ...args });
    };
  }
  