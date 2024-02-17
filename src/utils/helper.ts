import { verifyToken } from "./authUtils";

export const isUserAuthenticated = () => {
  const { token } = JSON.parse(localStorage.getItem("userAuthData")!) || "{}";
  if (!token) return false;
  const isTokenVerified = verifyToken(token);
  return !!isTokenVerified;
};

export const validateEmail = (email:string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
