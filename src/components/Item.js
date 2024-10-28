"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const Item = ({ vehicle, setVehicleSelected, setIsModalOpen }) => {
  return (
    <div className={`relative overflow-hidden`}>
      <img src={`/${vehicle.nameVehicle}.jpg`} alt="not render" />
      {vehicle.documentNumber && (
        <div className="absolute bottom-0  flex justify-between w-full px-10">
          <p className="text-lime-500 font-semibold text-xl">{vehicle.plate}</p>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2x"
            className="text-lime-500 cursor-pointer"
            onClick={() => {
              setVehicleSelected(vehicle);
              setIsModalOpen(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Item;
