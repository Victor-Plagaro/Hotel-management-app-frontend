import React, { useState } from "react";
import { useAppDispatch } from "../../Hooks/hooks";
import { updateOneImage, Images, ImageType } from "../Slices/imageSlice";
import { readHotels } from "../Slices/hotelSlice";
import "./FormUpdateImage.styles.css";

type FormUpdateImageProps = {
  image: Images;
  imageTypes: ImageType[];
  closeModal: () => void;
};

const FormUpdateImage: React.FC<FormUpdateImageProps> = ({
  image,
  imageTypes,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const [titleImage, setTitleImage] = useState(image.title);
  const [imageType, setImageType] = useState<number>(
    image.imageTypeDto?.id ?? 0,
  );
  const [url, setURL] = useState(image.url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleImage(e.target.value);
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  const handleImageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImageType(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(
        updateOneImage({
          imageId: image.id,
          title: titleImage,
          url: url,
          imageTypeId: imageType,
          hotelId: image.hotelId,
        }),
      ).unwrap();

      // Read again the list hotels for charge the hotel photo
      await dispatch(readHotels());

      closeModal();
    } catch (err) {
      setError("Error al actualizar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="dialog-form-update-image">
      <div className="flex min-h-full flex-col gap-3">
        <h2 className="mb-4 text-xl font-bold dark:text-white">
          Actualizar Imagen
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="form-update-image__label ">
              Título de la imagen
            </label>
            <input
              required
              type="text"
              onChange={handleTitleChange}
              value={titleImage}
              name="title"
              className="form-update-image__inputs"
            />
          </div>

          <div>
            <label className="form-update-image__label">URL de la imagen</label>
            <input
              required
              type="text"
              onChange={handleURLChange}
              value={url}
              name="url"
              className="form-update-image__inputs"
            />
          </div>

          <div>
            <label className="form-update-image__label">Tipo de imagen</label>
            <select
              required
              onChange={handleImageTypeChange}
              value={imageType}
              name="imageType"
              className="form-update-image__inputs"
            >
              <option value="" disabled>
                Seleccione un tipo de imagen
              </option>
              {imageTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

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

export default FormUpdateImage;
