import { starshipsAPI } from ".";

export async function getCharacterStarships(characterStarshipsIds: number[]): Promise<string[]> {
  try {
    const starshipsTitles: string[] = [];
    
    for (const starshipId of characterStarshipsIds) {
      const response = await starshipsAPI.get(`/${starshipId}`);
      starshipsTitles.push(response.data.name);
    }

    return starshipsTitles;
  } catch (error) {
    throw new Error('Error loading starships');
  }
}