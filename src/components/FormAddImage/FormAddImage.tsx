import React, { useState, useEffect } from "react";
import openAddDialog from "./dialogAddImage";
import { useSelector, useDispatch } from "react-redux";
import { createImages } from "../Slices/imageSlice";
import type { RootState, AppDispatch } from "../../store";
import { readHotels } from "../Slices/hotelSlice";

// Interface
type PropHotelId = {
  hotelId: number;
};

const FormAddImage: React.FC<PropHotelId> = ({ hotelId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const imageType = useSelector((state: RootState) => state.image.imageTypes);
  const dialogId = `formImage-${hotelId}`;

  useEffect(() => {
    openAddDialog(hotelId);
    dispatch(readHotels());
  }, [hotelId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      await dispatch(
        createImages({
          title: data.title,
          url: data.url,
          hotelId,
          imageTypeId: parseInt(data.imageTypes),
        }),
      );

      // Read again the list hotels for charge the hotel photo
      await dispatch(readHotels());

      setError(null);
      const dialog = document.getElementById(dialogId) as HTMLDialogElement;
      dialog.close();

      alert(`Image: ${data.title} añadido correctamente`);
    } catch (err) {
      console.error("Error:", err);
      setError("Error al agregar la imagen. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <button
        id={`dialogImage-${hotelId}`}
        className="cursor-pointer rounded-md border-1 border-gray-800 px-2 py-1 hover:scale-95 hover:font-medium dark:border-white"
      >
        +
      </button>

      <dialog
        id={dialogId}
        className="bg-gray-150 w-xl self-center justify-self-center rounded-lg border-1 border-gray-100 p-6 shadow-2xl"
      >
        <div className="flex min-h-full flex-col gap-3">
          <header className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-800">
              Agregar una imagen
            </h2>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-full flex-col gap-4"
          >
            <div className="flex flex-col gap-8">
              <div className="flex gap-20">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-800">
                    Título de la imagen
                  </p>
                  <input
                    type="text"
                    name="title"
                    className="w-full rounded-lg border-1 border-gray-300 p-1 pl-2 text-gray-900 focus:text-gray-800"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-800">
                    Tipo de imagen
                  </p>
                  <select
                    name="imageTypes"
                    required
                    className="w-full rounded-lg border-1 border-gray-300 p-1 pl-2 text-gray-900 focus:text-gray-800"
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
                <p className="text-xs font-bold text-gray-800">
                  Introduzca la URL de la imagen
                </p>
                <input
                  type="text"
                  name="url"
                  className="w-full rounded-lg border-1 border-gray-300 pl-2 text-gray-900 focus:text-gray-800"
                />
              </div>
              <hr className="mt-3 border-gray-400" />
            </div>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            <footer className="mt-4 flex w-full items-center justify-between">
              <div className="flex w-full items-center justify-end gap-6">
                <button
                  type="submit"
                  className="rounded-lg bg-gray-800 p-2 font-semibold text-white hover:bg-white hover:text-gray-800 hover:shadow-lg hover:shadow-gray-800/30"
                >
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

export default FormAddImage;
