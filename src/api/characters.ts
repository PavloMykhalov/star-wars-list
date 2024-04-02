import { Character } from "@/types/Character";
import { charactersAPI } from ".";

interface CharactersResponse {
  characters: Character[];
  count: number;
}

export async function getCharacters(page: number = 1): Promise<CharactersResponse> {
  try {
    const response = await charactersAPI.get(`/?page=${page}`);
    return {
      characters: response.data.results,
      count: response.data.count
    };
  } catch (error) {
    throw new Error("Error fetching characters");
  }
}