"use client";
export const getToken = () => {
  const token = localStorage.getItem("parkin_token");
  if (!token) return false;
  return token;
};
