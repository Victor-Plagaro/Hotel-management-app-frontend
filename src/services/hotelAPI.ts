import { Hotels } from '../components/Slices/hotelSlice';
import { Images } from '../components/Slices/imageSlice';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Calls to HOTEL API
export async function listHotels(): Promise<Hotels[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/hotel`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Hotels[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error READ hotels: ${error}`);
    throw error;
  }
}

export async function addHotel(hotel: Hotels): Promise<Hotels> {
  try {
    const response = await fetch(`${BACKEND_URL}/hotel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotel),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Hotels = await response.json();
    return data;
  } catch (error) {
    console.error(`Error ADD hotel: ${error}`);
    throw error;
  }
}

export async function deleteHotel(hotelId: number): Promise<number> {
  try {
    const response = await fetch(`${BACKEND_URL}/hotel/${hotelId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return hotelId;

  } catch (error) {
    console.error(`Error DELETE hotel: ${error}`);
    throw error;
  }
}

export async function updateHotel(hotelId: number, name: string): Promise<Hotels> {
  try {
    const response = await fetch(`${BACKEND_URL}/hotel/${hotelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Hotels = await response.json();
    return data;
  } catch (error) {
    console.error(`Error UPDATE hotel: ${error}`);
    throw error;
  }
}

// Calls to IMAGE API
export async function addImage(image: Images): Promise<Images> {
  try {
    const response = await fetch(`${BACKEND_URL}/hotel`, {
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
