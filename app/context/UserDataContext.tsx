import { createContext, useContext, useState } from "react";

export interface UserData {
    firstName: string;
    lastName: string;
}

const UserDataContext = createContext<[UserData | null, (userData: UserData | null) => void]>([
    null,
    () => {},
  ]);
  
  export function useUserData() {
    return useContext(UserDataContext);
  }
  
  export function useSetUserData() {
    const [, setUserData] = useContext(UserDataContext);
    return setUserData;
  }
  
  export default UserDataContext;