import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import FormAddHotel from "../FormAddHotel/FormAddHotel";
import FormUpdateHotel from "../FormUpdateHotel/FormUpdateHotel";
import FormAddImage from "../FormAddImage/FormAddImage";
import PaperBinIconBlack from "../../assets/img/trash-icon-black.svg";
import PaperBinIconWhite from "../../assets/img/trash-icon-white.svg";
import EditIconBlack from "../../assets/img/edit-icon-black.svg";
import EditIconWhite from "../../assets/img/edit-icon-white.svg";
import { Hotels } from "../Slices/hotelSlice";
import { FilterOptionsHotels } from "../FilterOptions/FilterOptionsHotel";
import { useSelector } from "react-redux";
import { readHotels, deleteHotels } from "../Slices/hotelSlice";
import { useAppDispatch } from "../../Hooks/hooks";
import {
  deleteAllImage,
  deleteOneImage,
  Images,
  readImageType,
} from "../Slices/imageSlice";
import { RootState } from "@/store";
import FormUpdateImage from "../FormUpdateImage/FormUpdateImage";
import NameUser from "../Profile/NameUser";
import ThemeToggle from "../Theme/ThemeToggle";
import "./DataTables.styles.css";

const DataTables = () => {
  // UseState hotels
  const dispatch = useAppDispatch();
  const hotels = useSelector((state: any) => state.hotel.hotels);
  const error = useSelector((state: any) => state.hotel.error);
  const imageTypes = useSelector((state: any) => state.image.imageTypes);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [open, setOpen] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotels | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<Images | null>(null);

  // UseState dropDown
  const dropDown = (id: number): void => {
    setOpen(open === id ? null : id);
  };

  // Filters the list of hotel based on the search term
  const filteredHotels = hotels.filter((hotels: Hotels) =>
    hotels.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // List hotels
  useEffect(() => {
    dispatch(readHotels());
    dispatch(readImageType());
  }, [dispatch]);

  return (
    <>
      <div className="data-table">
        <section className="m-6 mt-4 w-1/5">
          <div className="left-column__filter">
            <FilterOptionsHotels />
          </div>
        </section>
        <div className="data-table__table">
          <h2 className="table__title">Galería de imágenes</h2>
          <div className="table__searchbar">
            <SearchBar nameHotel={setSearchTerm} />
            <ThemeToggle />
            <FormAddHotel />
            <NameUser />
          </div>
          <div className="w-full">
            <div className="mx-auto flex justify-center">
              <table className="table__data-table">
                <thead className="bg-gray-200 dark:bg-stone-900">
                  <tr className="border-b px-4">
                    <th className="data-table__th">ID</th>
                    <th className="data-table__th">Nombre hotel</th>
                    <th className="data-table__th">Imagen</th>
                    <th className="data-table__th" colSpan={1}>
                      Acciones imágenes
                    </th>
                    <th className="data-table__th" colSpan={1}>
                      Acciones hotel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Conditional for render the error or the hotels list */}
                  {error ? (
                    <tr>
                      <td colSpan={5} className="text-center font-bold">
                        {error}
                      </td>
                    </tr>
                  ) : (
                    filteredHotels.map((hotel: Hotels) => {
                      // Only 1 photo per row
                      const firstImage = hotel.images[0];

                      return (
                        <React.Fragment key={hotel.id}>
                          <tr
                            className={`px-4 hover:bg-gray-100 dark:hover:bg-stone-600 ${
                              open === hotel.id ? "" : "border-b"
                            } items-center text-center`} // check if the row is open or not and put a border-b
                          >
                            <td className="data-table__td">{hotel.id}</td>
                            <td className="data-table__td">{hotel.name}</td>
                            <td className="data-table__td">
                              {firstImage ? (
                                <div className="flex flex-col items-center">
                                  <img
                                    src={firstImage.url}
                                    alt={firstImage.title}
                                    width="150"
                                  />
                                  <p>{firstImage.title}</p>
                                </div>
                              ) : (
                                <p>No hay imágenes</p>
                              )}
                            </td>
                            <td className="py-4 text-center">
                              <div className="flex flex-row justify-center gap-3">
                                <div>
                                  <button
                                    onClick={() => dropDown(hotel.id)}
                                    className="td__buttons"
                                  >
                                    Ver más imágenes
                                  </button>
                                </div>
                                <div>
                                  <FormAddImage hotelId={hotel.id} />
                                </div>
                                <div>
                                  {/* Delete button images */}
                                  <button
                                    className="td__buttons"
                                    id="borrar"
                                    onClick={() =>
                                      dispatch(
                                        deleteAllImage({ hotelId: hotel.id }),
                                      ).then(() => dispatch(readHotels()))
                                    }
                                  >
                                    Borrar todas las imágenes
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex flex-row justify-center gap-4">
                                {/* Delete button hotels*/}
                                <button
                                  className="td__icons"
                                  id="borrar"
                                  onClick={() =>
                                    dispatch(
                                      deleteHotels({ hotelId: hotel.id }),
                                    ).then(() => dispatch(readHotels()))
                                  }
                                >
                                  <img
                                    src={
                                      theme === "dark"
                                        ? PaperBinIconWhite
                                        : PaperBinIconBlack
                                    }
                                    alt="Borrar"
                                    width={28}
                                  />
                                </button>
                                <button
                                  className="td__icons"
                                  onClick={() => setSelectedHotel(hotel)}
                                >
                                  <img
                                    src={
                                      theme === "dark"
                                        ? EditIconWhite
                                        : EditIconBlack
                                    }
                                    alt="Editar"
                                    width={28}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Check which hotel is open */}
                          {open === hotel.id && (
                            <tr className="border-b px-4">
                              <td colSpan={5}>
                                <div
                                  className={`justify-center gap-2 ${
                                    // Check if the there are more images and change the display flex or grid
                                    hotel.images.slice(1).length > 0
                                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                      : "flex items-center justify-center"
                                  }`}
                                >
                                  {hotel.images.slice(1).length > 0 ? (
                                    hotel.images.slice(1).map((image) => (
                                      <div key={image.id} className="m-2">
                                        <img
                                          src={image.url}
                                          alt={image.title}
                                        />
                                        <p className="text-center">
                                          {image.title}
                                        </p>
                                        <div className="flex justify-center gap-4">
                                          <button
                                            className="text-sm text-red-500 underline hover:text-red-700"
                                            onClick={() =>
                                              dispatch(
                                                deleteOneImage({
                                                  imageId: image.id,
                                                }),
                                              ).then(() =>
                                                dispatch(readHotels()),
                                              )
                                            }
                                          >
                                            Borrar imagen
                                          </button>
                                          <button
                                            className="text-sm text-blue-500 underline hover:text-blue-700"
                                            onClick={() =>
                                              setSelectedImage(image)
                                            }
                                          >
                                            Modificar imagen
                                          </button>
                                        </div>
                                        {selectedImage && (
                                          <FormUpdateImage
                                            image={selectedImage}
                                            closeModal={() =>
                                              setSelectedImage(null)
                                            }
                                            imageTypes={imageTypes}
                                          />
                                        )}
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-center">
                                      No hay más imágenes de{" "}
                                      <strong>{hotel.name}</strong>
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/**Render the modal if there is one hotel selected*/}
      {selectedHotel && (
        <FormUpdateHotel
          hotel={selectedHotel}
          closeModal={() => setSelectedHotel(null)}
        />
      )}
    </>
  );
};

export default DataTables;
