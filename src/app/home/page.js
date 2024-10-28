"use client";
import { useEffect, useState } from "react";
import Item from "@/components/Item";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { allParkings as getAllParkings } from "@/app/store/features/parking/parkingThunks";

const ModalDetails = ({ vehicle, setIsModalOpen }) => {
  const getDiference = (checkIn, checkOut) => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diff = date2 - date1;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours} horas y ${minutes} minutos`;
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

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg py-8 px-10 relative w-11/12 md:w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            Detalles del vehículo
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            className="text-white cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="mt-5 space-y-2 text-gray-300">
          <p>
            <span className="font-semibold">Propietario:</span> {vehicle.owner}
          </p>
          <p>
            <span className="font-semibold">Número de documento:</span>{" "}
            {vehicle.documentNumber}
          </p>
          <p>
            <span className="font-semibold">Vehículo:</span>{" "}
            {vehicle.nameVehicle}
          </p>
          <p>
            <span className="font-semibold">Placa:</span> {vehicle.plate}
          </p>
          <p>
            <span className="font-semibold">Fecha de ingreso:</span>{" "}
            {getFormatDate(vehicle.checkIn)}
          </p>
          <p>
            <span className="font-semibold">Fecha de salida:</span>{" "}
            {getFormatDate(vehicle.checkOut)}
          </p>
          <p>
            <span className="font-semibold">Tiempo de permanencia:</span>{" "}
            {getDiference(vehicle.checkIn, vehicle.checkOut)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { allParkings, loading, error } = useSelector((state) => state.parking);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleSelected, setVehicleSelected] = useState(null);
  const [parkings, setParkings] = useState([]);
  const constructorData = () => {
    const newArray = new Array(15);
    for (let i = 0; i < 15; i++) {
      if (i < parkings.length) {
        newArray[i] = parkings[i];
      } else {
        newArray[i] = {
          owner: "Libre",
          documentNumber: "",
          nameVehicle: "Libre",
          checkIn: "",
          checkOut: "",
          plate: "",
        };
      }
    }
    return newArray;
  };

  useEffect(() => {
    dispatch(getAllParkings());
  }, []);

  useEffect(() => {
    if (allParkings) {
      setParkings(allParkings);
    }
  }, [allParkings]);

  return (
    <ProtectedRoutes>
      <div className="w-full h-full flex flex-col justify-center overflow-y-auto pt-10 bg-gray-900">
        <h1 className="text-3xl font-semibold text-center md:text-start ml-6 md:ml-36 my-8 text-white">
          Vehículos
        </h1>
        {(loading || error) && (
          <div className="w-full flex justify-center h-[calc(100vh-220px)]">
            {loading && <p className="text-white">Cargando...</p>}
            {error && <p className="text-white">{error}</p>}
          </div>
        )}
        <div
          className="h-full w-full flex flex-wrap justify-center"
          style={{
            maxHeight: "calc(100vh - 220px)",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarColor: "#4B5563 #1F2937",
            scrollbarWidth: "thin",
          }}
        >
          {!loading && (
            <>
              {constructorData().map((vehicle, index) => (
                <Item
                  key={index}
                  vehicle={vehicle}
                  setVehicleSelected={setVehicleSelected}
                  setIsModalOpen={setIsModalOpen}
                />
              ))}
            </>
          )}
        </div>
        {isModalOpen && (
          <ModalDetails
            vehicle={vehicleSelected}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </ProtectedRoutes>
  );
};
export default Home;
