import { filmsAPI } from ".";

export async function getCharacterFilms(characterFilmsIds: number[]): Promise<string[]> {
  try {
    const filmTitles: string[] = [];

    for (const filmId of characterFilmsIds) {
      const response = await filmsAPI.get(`/${filmId}`);
      filmTitles.push(response.data.title);
    }

    return filmTitles;
  } catch (error) {
    throw new Error('Error loading films');
  }
}