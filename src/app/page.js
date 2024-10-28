"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  LoginEmployee,
  getEmployee,
} from "./store/features/employee/employeeThunks";
import { getToken } from "../utils/getToken";
export default function Login() {
  const dispatch = useDispatch();
  const { employee, loading, error } = useSelector((state) => state.employee);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const regesEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const errors = {};
    if (!email || !regesEmail.test(email)) {
      errors.email = "error";
    }
    if (!password) {
      errors.password = "error";
    }
    setErrors(errors);
    if (errors.email || errors.password) {
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    const formData = {
      email,
      password,
    };
    dispatch(LoginEmployee(formData));
  };

  useEffect(() => {
    if (employee && employee._id) {
      router.push("/home");
    }
  }, [employee, router]);

  useEffect(() => {
    if (getToken()) {
      dispatch(getEmployee());
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 md:px-20 px-0">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg lg:w-1/2 2xl:w-1/3 w-full md:px-20">
        <div className="flex flex-col items-center">
          <div>
            <img
              src={`/logo.png`}
              alt="not render"
              className="object-contain h-16 w-20"
            />
          </div>

          <h2 className="text-white text-lg font-semibold mt-4">
            Bienvenido a EasyPark
          </h2>
          <p className="text-gray-400 text-center mt-1 mb-4">
            Encuentra y reserva tu parqueadero fácilmente en segundos.
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Ingresa tu correo"
            className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none ${
              errors.email && "border-red-500 border-2"
            }`}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Ingresa tu contraseña"
            className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none ${
              errors.password && "border-red-500 border-2"
            }`}
          />
          <button
            type="submit"
            className="bg-lime-500 text-gray-900 font-semibold py-2 rounded mt-2"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="flex items-center my-4 text-gray-400">
          <p>
            ¿Sabías que usar un parqueadero seguro reduce el riesgo de daños y
            robos? Tu vehículo merece la mejor protección, y nosotros te
            ofrecemos tranquilidad en cada viaje. Elige la seguridad y disfruta
            del camino sin preocupaciones.
          </p>
        </div>
      </div>
    </div>
  );
}
