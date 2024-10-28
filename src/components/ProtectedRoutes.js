"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { employee } = useSelector((state) => state.employee);

  useEffect(() => {
    if (!employee || !employee._id) {
      router.push("/");
    }
  }, [employee, router]);

  if (!employee || !employee._id) {
    return null;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
