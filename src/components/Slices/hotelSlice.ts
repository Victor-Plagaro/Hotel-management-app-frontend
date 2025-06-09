import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Images } from './imageSlice';
import {
  addHotel,
  listHotels,
  updateHotel,
  deleteHotel,
} from '../../services/hotelAPI';

// Interfaces
export type Hotels = {
  id: number;
  name: string;
  images: Images[];
};

type hotelState = {
  hotels: Hotels[];
  error: string | null;
};

// Async calls
export const createHotels = createAsyncThunk(
  'hotel/addHotels',
  async ({ name }: { name: string }) => {
    const hotelPayload = {
      id: 0,
      name,
      images: [],
    };

    const hotelResult = await addHotel(hotelPayload);

    return {
      ...hotelResult,
    };
  }
);

export const readHotels = createAsyncThunk('hotel/listHotels', async () => {
  return listHotels();
});

export const updateHotels = createAsyncThunk(
  'hotel/updateHotels',
  async ({ hotelId, name }: { hotelId: number; name: string }) => {
    return updateHotel(hotelId, name);
  }
);

export const deleteHotels = createAsyncThunk(
  'hotel/deleteHotels',
  async ({ hotelId }: { hotelId: number }) => {
    return deleteHotel(hotelId);
  }
);

const initialState: hotelState = {
  hotels: [],
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotels[]>) => {
      state.hotels = action.payload;
    },
    clearHotels: (state) => {
      state.hotels = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readHotels.rejected, (state, action) => {
        state.error = action.error.message || 'Error al cargar los hoteles';
      })
      .addCase(
        readHotels.fulfilled,
        (state, action: PayloadAction<Hotels[]>) => {
          state.hotels = action.payload;
        }
      )
      .addCase(
        createHotels.fulfilled,
        (state, action: PayloadAction<Hotels>) => {
          state.hotels.push(action.payload);
        }
      )
      .addCase(
        deleteHotels.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.hotels = state.hotels.filter(
            (hotel) => hotel.id !== action.payload
          );
        }
      )
      .addCase(
        updateHotels.fulfilled,
        (state, action: PayloadAction<{ id: number; name: string }>) => {
          const index = state.hotels.findIndex(
            (hotel) => hotel.id === action.payload.id
          );
          if (index !== -1) {
            state.hotels[index].name = action.payload.name;
          }
        }
      );
  },
});

export default hotelSlice.reducer;
