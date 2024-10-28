"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutEmployee } from "@/app/store/features/employee/employeeSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { allParkings } = useSelector((state) => state.parking);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutEmployee());
    router.push("/");
  };
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div
        onClick={() => router.push("/home")}
        className="flex items-center cursor-pointer"
      >
        <img
          src={`/logo.png`}
          alt="not render"
          className="object-contain h-12 w-16 mr-4"
        />

        <h1 className="text-xl font-semibold">EasyPark</h1>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={() => {
            if (allParkings.length === 15) return;
            router.push("/home/register-checkin");
            setIsMenuOpen(false);
          }}
          className={`bg-lime-500 text-black px-4 py-2 rounded-lg ${
            allParkings.length === 15 && "cursor-not-allowed opacity-20"
          }`}
        >
          {allParkings.length === 15
            ? "Parqueadero lleno"
            : "Registrar Ingreso"}
        </button>
        <button
          onClick={() => {
            router.push("/home/register-checkout");
            setIsMenuOpen(false);
          }}
          className="bg-lime-500 text-black px-4 py-2 rounded-lg"
        >
          Registrar Salida
        </button>
        <button
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
          className="bg-lime-500 text-black px-4 py-2 rounded-lg"
        >
          Cerrar Sesión
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-gray-800 shadow-lg rounded-md md:hidden z-50">
          <div className="flex flex-col p-2">
            <button
              onClick={() => {
                if (allParkings.length === 15) return;
                router.push("/home/register-checkin");
                setIsMenuOpen(false);
              }}
              className={`bg-lime-500 text-black px-4 py-2 rounded-lg mb-2 ${
                allParkings.length === 15 && "cursor-not-allowed opacity-20"
              }`}
            >
              {allParkings.length === 15
                ? "Parqueadero lleno"
                : "Registrar Ingreso"}
            </button>
            <button
              onClick={() => {
                router.push("/home/register-checkout");
                setIsMenuOpen(false);
              }}
              className="bg-lime-500 text-black px-4 py-2 rounded-lg mb-2"
            >
              Registrar Salida
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-lime-500 text-black px-4 py-2 rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
