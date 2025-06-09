import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addImage,
  listImageTypeDto,
  listImage,
  deleteImage,
  deleteAllImages,
  updateImage,
} from '../../services/imageAPI';

// Interfaces
export type Images = {
  id: number;
  title: string;
  url: string;
  hotelId: number;
  imageTypeDto: ImageType;
};

export type ImageType = {
  id: number;
  name: string;
};

type imageState = {
  images: Images[];
  imageTypes: ImageType[];
  error: string | null;
};

// Async calls
export const createImages = createAsyncThunk<
  Images,
  { title: string; url: string; hotelId: number; imageTypeId: number }
>('hotel/addImages', async ({ title, url, hotelId, imageTypeId }) => {
  const imageType = await listImageTypeDto().then((types) =>
    types.find((type) => type.id === imageTypeId)
  );
  if (!imageType) {
    throw new Error(`ImageType con ID ${imageTypeId} no encontrado`);
  }
  const imageToAdd = {
    title,
    url,
    hotelId,
    imageTypeId: imageType.id,
  };
  const response = await addImage(imageToAdd);
  return response;
});

export const readImage = createAsyncThunk<Images[]>(
  'image/listimage',
  async () => {
    return listImage();
  }
);

export const readImageType = createAsyncThunk<ImageType[]>(
  'image/listimagetype',
  async () => {
    return listImageTypeDto();
  }
);

export const deleteOneImage = createAsyncThunk(
  'image/deleteimage',
  async ({ imageId }: { imageId: number }) => {
    return deleteImage(imageId);
  }
);

export const deleteAllImage = createAsyncThunk(
  'image/deleteallimages',
  async ({ hotelId }: { hotelId: number }) => {
    return deleteAllImages(hotelId);
  }
);

export const updateOneImage = createAsyncThunk(
  'image/updateImage',
  async ({
    imageId,
    title,
    url,
    imageTypeId,
    hotelId,
  }: {
    imageId: number;
    title: string;
    url: string;
    imageTypeId: number;
    hotelId: number;
  }) => {
    const imageTypes = await listImageTypeDto().then((types) =>
      types.find((type) => type.id === imageTypeId)
    );
    if (!imageTypes) {
      throw new Error(`ImageType con ID ${imageTypeId} no fue encontrado`);
    }
    return updateImage(imageId, title, url, imageTypes.id, hotelId);
  }
);

const initialState: imageState = {
  images: [],
  imageTypes: [],
  error: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<Images[]>) => {
      state.images = action.payload;
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        readImageType.fulfilled,
        (state, action: PayloadAction<ImageType[]>) => {
          state.imageTypes = action.payload;
        }
      )
      .addCase(
        createImages.fulfilled,
        (state, action: PayloadAction<Images>) => {
          state.images.push(action.payload);
        }
      )
      .addCase(
        deleteOneImage.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.images = state.images.filter(
            (image) => image.id !== action.payload
          );
        }
      )
      .addCase(
        deleteAllImage.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.images = state.images.filter(
            (image) => image.id !== action.payload
          );
        }
      )
      .addCase(
        updateOneImage.fulfilled,
        (state, action: PayloadAction<Images>) => {
          const index = state.images.findIndex(
            (image) => image.id === action.payload.id
          );
          if (index !== -1) {
            state.images[index] = action.payload;
          }
        }
      );
  },
});

export default imageSlice.reducer;
