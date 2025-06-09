import React, { useState, useEffect } from "react";
import openAddDialog from "./dialogAppHotel";
import { useSelector, useDispatch } from "react-redux";
import { createHotels, Hotels, readHotels } from "../Slices/hotelSlice";
import { createImages } from "../Slices/imageSlice";
import type { RootState, AppDispatch } from "../../store";
import { readImageType } from "../Slices/imageSlice";
import "./FormAddHotel.styles.css";

const FormAddHotel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const [error, setError] = useState<string | null>(null);
  const imageType = useSelector((state: RootState) => state.image.imageTypes);

  useEffect(() => {
    openAddDialog();
    dispatch(readImageType());
    dispatch(readHotels());
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Verificar si el hotel ya existe
    const existHotel = hotels.find((hotel: Hotels) => hotel.name === data.name);
    if (existHotel) {
      setError(
        `El nombre del hotel ya existe. Compruebe que si es el mismo o si no cambie el nombre del mismo`,
      );
      return;
    }

    try {
      const createdHotel = await dispatch(
        createHotels({
          name: data.name,
        }),
      ).unwrap();

      // Check if the inputs are empty or not
      if (data.title !== "") {
        await dispatch(
          createImages({
            title: data.title,
            url: data.url,
            hotelId: createdHotel.id,
            imageTypeId: parseInt(data.imageTypes),
          }),
        );
      }

      // Read again the list hotels for charge the hotel photo
      await dispatch(readHotels());

      setError(null);
      const dialog = document.getElementById("formHotel") as HTMLDialogElement;
      dialog.close();

      alert(`Hotel: ${data.name} añadido correctamente`);
    } catch (err) {
      console.error("Error:", err);
      setError("Error al agregar el hotel. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <button id="dialogHotel" className="btn__add-hotel ">
        Añadir hotel
      </button>

      <dialog id="formHotel" className="add-hotel__dialog">
        <div className="flex min-h-full flex-col gap-3">
          <header className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Agregar un hotel
            </h2>

            <p className="text-sm font-medium text-gray-600 dark:text-white">
              Rellene todos los campos para poder realizar el formulario
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-full flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-gray-800 dark:text-white">
                Nombre del hotel
              </p>
              <input
                required
                type="text"
                name="name"
                className="dialog__form-inputs"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-20">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-800 dark:text-white">
                    Título de la imagen
                  </p>
                  <input
                    type="text"
                    name="title"
                    className="dialog__form-inputs"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-800 dark:text-white">
                    Tipo de imagen
                  </p>
                  <select
                    name="imageTypes"
                    required
                    className="dialog__form-inputs"
                  >
                    <option value="vacio">Seleccione una opción...</option>
                    {imageType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-gray-800 dark:text-white">
                  Introduzca la URL de la imagen
                </p>
                <input type="text" name="url" className="dialog__form-inputs" />
              </div>
              <hr className="mt-3 border-gray-400" />
            </div>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            <footer className="mt-4 flex w-full items-center justify-between">
              <div className="flex w-full items-center justify-end gap-6">
                <button type="submit" className="form-add__btn-submit">
                  Agregar
                </button>
                <div>
                  <button type="button" className="close-dialog underline">
                    Cerrar
                  </button>
                </div>
              </div>
            </footer>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default FormAddHotel;
