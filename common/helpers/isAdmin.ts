import {jwtDecode} from "jwt-decode";
import {MyJwtPayload} from "@/types/MyJwtPayload";
import {getCookie, TOKEN_NAME} from "@/common/api/core";


export const isAdmin = () => {
  const token = getCookie(TOKEN_NAME);
  if (!token) return false;

  try {
    const decoded = jwtDecode(token) as MyJwtPayload;
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
};