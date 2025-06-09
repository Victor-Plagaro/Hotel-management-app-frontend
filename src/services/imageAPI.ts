import { Images, ImageType } from '../components/Slices/imageSlice';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Calls to IMAGE API
export async function addImage(image: {
  title: string;
  url: string;
  hotelId: number;
  imageTypeId: number;
}): Promise<Images> {
  try {
    const response = await fetch(`${BACKEND_URL}/imagen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Images = await response.json();
    return data;
  } catch (error) {
    console.error(`Error ADD image: ${error}`);
    throw error;
  }
}

export async function listImage(): Promise<Images[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/imagen`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Images[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error READ image: ${error}`);
    throw error;
  }
}

export async function deleteImage(imageId: number): Promise<number> {
  try {
    const response = await fetch(`${BACKEND_URL}/imagen/${imageId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return imageId;

  } catch (error) {
    console.error(`Error DELETE image: ${error}`);
    throw error;
  }
}

export async function deleteAllImages(hotelId: number): Promise<number> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/imagen/hotel/${hotelId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return hotelId;

  } catch (error) {
    console.error(`Error DELETE ALL image: ${error}`);
    throw error;
  }
}

export async function updateImage(
  imageId: number,
  title: string,
  url: string,
  imageTypeId: number,
  hotelId: number
): Promise<Images> {
  try {
    const response = await fetch(`${BACKEND_URL}/imagen/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, url, imageTypeId: imageTypeId, hotelId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Images = await response.json();
    return data;
  } catch (error) {
    console.error(`Error UPDATE image: ${error}`);
    throw error;
  }
}

// Calls to TYPE IMAGE API
export async function listImageTypeDto(): Promise<ImageType[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/imageType`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ImageType[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error READ image type: ${error}`);
    throw error;
  }
}
