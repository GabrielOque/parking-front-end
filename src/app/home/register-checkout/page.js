"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
const { closeRegister } = require("@/app/store/features/parking/parkingThunks");
const { clearSuccess } = require("@/app/store/features/parking/parkingSlices");

const pricePerHour = 5000;

const RegisterExit = () => {
  const dispatch = useDispatch();
  const { error, loading, allParkings, success } = useSelector(
    (state) => state.parking
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const filteredVehicles = allParkings.filter((vehicle) =>
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotal = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const totalHours = Math.ceil((outDate - inDate) / (1000 * 60 * 60));
    return totalHours * pricePerHour;
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const confirmExit = () => {
    dispatch(closeRegister(selectedVehicle._id));
  };

  const getFormatDate = (date) => {
    const date1 = new Date(date);
    const day = date1.getDate();
    const month = date1.getMonth() + 1;
    const year = date1.getFullYear();
    const hours = date1.getHours();
    const minutes = date1.getMinutes();
    return `${year}/${month}/${day} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };

  useEffect(() => {
    if (success === "SUCCESS") {
      closeModal();
      dispatch(clearSuccess());
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-8">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Registrar Salida
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        type="text"
        placeholder="Buscar por propietario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none mb-4 w-full lg:w-1/2"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 w-full lg:w-1/2">
        {filteredVehicles.map((vehicle, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(vehicle)}
          >
            <img
              src={`/${vehicle.nameVehicle}_SinFondo.png`}
              alt={vehicle.nameVehicle}
              className="w-full h-24 object-cover mb-2 rounded"
            />
            <h3 className="text-white font-semibold">{vehicle.owner}</h3>
            <p className="text-gray-400">Placa: {vehicle.plate}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3 relative">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">
                {selectedVehicle.nameVehicle}
              </h2>
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                className="text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>

            <img
              src={`/${selectedVehicle.nameVehicle}_SinFondo.png`}
              alt={selectedVehicle.nameVehicle}
              className="w-full h-48 object-contain mb-4"
            />
            <p className="text-white">Propietario: {selectedVehicle.owner}</p>
            <p className="text-white">Placa: {selectedVehicle.plate}</p>
            <p className="text-white">
              Hora de Entrada: {getFormatDate(selectedVehicle.checkIn)}
            </p>
            <p className="text-white">
              Hora de Salida: {getFormatDate(selectedVehicle.checkOut)}
            </p>
            <p className="text-white">
              Tiempo:{" "}
              {Math.ceil(
                (new Date(selectedVehicle.checkOut) -
                  new Date(selectedVehicle.checkIn)) /
                  (1000 * 60 * 60)
              )}{" "}
              horas
            </p>
            <p className="text-white">
              Total a Pagar: $
              {formatCurrency(
                calculateTotal(
                  selectedVehicle.checkIn,
                  selectedVehicle.checkOut
                )
              )}
            </p>
            <button
              onClick={confirmExit}
              className="bg-lime-500 text-gray-900 font-semibold py-2 rounded mt-4 w-full"
            >
              {loading ? "Cargando..." : "Confirmar Salida"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterExit;
