import { filmsAPI } from ".";

// Function to get the titles of films associated with a character
export async function getCharacterFilms(characterFilmsIds: number[]): Promise<string[]> {
  try {
    const filmTitles: string[] = [];

    for (const filmId of characterFilmsIds) {
      // Making a GET request to the films API with the specific film ID
      const response = await filmsAPI.get(`/${filmId}`);
      
      filmTitles.push(response.data.title);
    }
    
    return filmTitles;
  } catch (error) {
    // Throwing an error if there's an error loading films
    throw new Error('Error loading films');
  }
}
