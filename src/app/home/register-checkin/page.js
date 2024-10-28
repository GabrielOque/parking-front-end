"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { newRegister } from "@/app/store/features/parking/parkingThunks";
const { clearSuccess } = require("@/app/store/features/parking/parkingSlices");

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, loading, allParkings, success } = useSelector(
    (state) => state.parking
  );
  const [owner, setOwner] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [nameVehicle, setNameVehicle] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [plate, setPlate] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!owner) errors.owner = "error";
    if (!documentNumber) errors.documentNumber = "error";
    if (!checkIn) errors.checkIn = "error";
    if (!checkOut) errors.checkOut = "error";
    if (!plate) errors.plate = "error";
    if (checkIn && checkOut && checkIn >= checkOut) {
      errors.checkOut = "error";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const registrationData = {
      owner,
      documentNumber,
      nameVehicle,
      checkIn,
      checkOut,
      plate,
    };
    dispatch(newRegister(registrationData));
  };

  const getFreeVehicles = () => {
    let motobikes = 0;
    let cars = 0;
    let freeVehicles = [];
    let freeMotoBikes = [];
    allParkings.forEach((option) => {
      if (option.nameVehicle.includes("Moto")) {
        motobikes++;
      } else {
        cars++;
      }
    });
    if (motobikes < 10) {
      freeMotoBikes = ["Moto"];
    }
    if (cars < 5) {
      freeVehicles = ["Carro"];
    }
    return [...freeVehicles, ...freeMotoBikes];
  };

  const generateRandomVehicleStyle = (length) => {
    return Math.floor(Math.random() * length) + 1;
  };

  useEffect(() => {
    if (success === "SUCCESS") {
      router.push("/home");
    }
  }, [router, success]);

  useEffect(() => {
    dispatch(clearSuccess());
  }, [success]);

  return (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg lg:w-1/2 w-full">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <h1 className="text-2xl font-semibold text-white mb-4">
          Registrar Vehículo
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block mb-1 text-white">Propietario:</label>
            <input
              type="text"
              placeholder="Nombre del propietario"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none w-full ${
                errors.owner ? "border-red-500 border-2" : ""
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-white">
              Número de Documento:
            </label>
            <input
              placeholder="Número de documento"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none w-full ${
                errors.documentNumber ? "border-red-500 border-2" : ""
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Vehículo:</label>
            <select
              placeholder="Vehículo"
              value={nameVehicle ? nameVehicle : "Seleccione un vehículo"}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "Carro")
                  setNameVehicle(`${value}.${generateRandomVehicleStyle(5)}`);
                if (value === "Moto")
                  setNameVehicle(`${value}.${generateRandomVehicleStyle(10)}`);
              }}
              className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none w-full ${
                errors.nameVehicle ? "border-red-500 border-2" : ""
              }`}
            >
              {getFreeVehicles().map((vehicle, index) => (
                <option key={index} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white">Check In:</label>
            <input
              placeholder="Fecha de ingreso"
              type="datetime-local"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none w-full ${
                errors.checkIn ? "border-red-500 border-2" : ""
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Check Out:</label>
            <input
              placeholder="Fecha de salida"
              type="datetime-local"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none w-full ${
                errors.checkOut ? "border-red-500 border-2" : ""
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Placa:</label>
            <input
              placeholder="Placa"
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none w-full ${
                errors.plate ? "border-red-500 border-2" : ""
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-lime-500 text-gray-900 font-semibold py-2 rounded mt-2 w-full"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
