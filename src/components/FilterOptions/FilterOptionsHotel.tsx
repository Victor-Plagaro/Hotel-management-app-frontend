export const FilterOptionsHotels = () => {
  return (
    <div className="rounded-lg border-1 border-gray-200 pb-3">
      <div className="border-b-1 border-gray-200 p-2">
        <header>
          <h3 className="text-lg font-bold">Filtrar por:</h3>
        </header>
      </div>
      <div>
        <fieldset className="border-b-1 border-gray-200 p-2">
          <legend className="pt-2 text-sm font-bold">Ubicación</legend>
          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Gran Canaria"
              className="cursor-pointer"
            />
            <span>Gran Canaria</span>
          </label>
          <br />
          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Lanzarote"
              className="cursor-pointer"
            />
            <span>Lanzarote</span>
          </label>
          <br />
          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Tenerife"
              className="cursor-pointer"
            />
            <span>Tenerife</span>
          </label>
        </fieldset>

        <fieldset className="p-2">
          <legend className="pt-2 text-sm font-bold">Tipo de Imagen</legend>
          <label className="cursor-pointer space-x-2">
            <input type="checkbox" value="small" className="cursor-pointer" />
            <span>Immersive</span>
          </label>
          <br />
          <label className="cursor-pointer space-x-2">
            <input type="checkbox" value="medium" className="cursor-pointer" />
            <span>Panoramic</span>
          </label>
          <br />
          <label className="cursor-pointer space-x-2">
            <input type="checkbox" value="large" className="cursor-pointer" />
            <span>Cover</span>
          </label>
        </fieldset>
      </div>
    </div>
  );
};
