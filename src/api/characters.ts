import { Character } from "@/types/Character";
import { charactersAPI } from ".";

// Interface for the response containing characters and count
interface CharactersResponse {
  characters: Character[];
  count: number;
}

// Function to fetch characters from the API
export async function getCharacters(page: number = 1): Promise<CharactersResponse> {
  try {
    // Making a GET request to the characters API with the specified page
    const response = await charactersAPI.get(`/?page=${page}`);
    
    // Returning an object with characters and count extracted from the response data
    return {
      characters: response.data.results,
      count: response.data.count
    };
  } catch (error) {
    // Throwing an error if there's an error fetching characters
    throw new Error("Error fetching characters");
  }
}
