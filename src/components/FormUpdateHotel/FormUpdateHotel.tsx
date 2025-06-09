import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHotels, Hotels } from "../Slices/hotelSlice";
import type { AppDispatch } from "../../store";
import "./FormUpdateHotel.styles.css";

// Interface
type FormUpdateHotelProps = {
  hotel: Hotels;
  closeModal: () => void;
};

const FormUpdateHotel: React.FC<FormUpdateHotelProps> = ({
  hotel,
  closeModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [nameHotel, setNameHotel] = useState(hotel.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameHotel(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(
        updateHotels({ hotelId: hotel.id, name: nameHotel }),
      ).unwrap();

      closeModal();
    } catch (err) {
      setError("Error al actualizar el hotel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="dialog-form-update">
      <div className="flex min-h-full flex-col gap-3">
        <h2 className="mb-4 text-xl font-bold dark:text-white">
          Actualizar Hotel
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <p className="text-xs font-bold text-gray-800 dark:text-white">
            Nombre del hotel
          </p>
          <input
            required
            type="text"
            onChange={handleChange}
            value={nameHotel}
            name="name"
            className="w-full rounded-lg border-1 border-gray-300 p-1 pl-2 text-gray-900 focus:text-gray-800 dark:text-white dark:focus:text-white"
            placeholder="Introduzca nombre..."
          />

          {error && <p className="text-red-500">{error}</p>}
          <footer className="mt-4 flex w-full items-center justify-end gap-4">
            <button
              type="submit"
              className="form-update__btn-submit"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="close-dialog underline"
            >
              Cerrar
            </button>
          </footer>
        </form>
      </div>
    </dialog>
  );
};

export default FormUpdateHotel;
