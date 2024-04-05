import { starshipsAPI } from ".";

// Function to get the names of starships associated with a character
export async function getCharacterStarships(characterStarshipsIds: number[]): Promise<string[]> {
  try {
    const starshipsTitles: string[] = [];

    for (const starshipId of characterStarshipsIds) {
      // Making a GET request to the starships API with the specific starship ID
      const response = await starshipsAPI.get(`/${starshipId}`);
      
      starshipsTitles.push(response.data.name);
    }

    return starshipsTitles;
  } catch (error) {
    // Throwing an error if there's an error loading starships
    throw new Error('Error loading starships');
  }
}
