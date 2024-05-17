import { useCallback } from 'react';
import { Character } from "@/types/Character";

export interface GraphData {
  nodes: any[];
  edges: any[];
  characterNodePosition: number[];
}

const useGraphBuilder = () => {
  const buildGraphData = useCallback(async (character: Character, filmTitles: string[], starshipsTitles: string[]) => {
    try {
      const filmCount = filmTitles.length;
      const filmXCoordinates = filmTitles.map((film, index) => (index + 1) * 200 + 100);
      let characterX;

      if (filmCount === 1) {
        characterX = filmXCoordinates[0];
      } else if (filmCount % 2 !== 0) {
        characterX = filmXCoordinates[Math.floor(filmCount / 2)];
      } else {
        characterX = filmXCoordinates[Math.floor(filmCount / 2)] - 100;
      }

      const characterNode = {
        id: character.name,
        data: { label: character.name },
        position: { x: characterX, y: 100 },
      };

      const filmNodes = filmTitles.map((film, index) => ({
        id: `film-${index}`,
        data: { label: film },
        position: { x: (index + 1) * 200 + 100, y: 300 },
      }));

      const shipNodes = starshipsTitles.map((ship, index) => ({
        id: `ship-${index}`,
        data: { label: ship },
        position: { x: (index + 1) * 200 + 100, y: 500 },
      }));

      const filmEdges = filmTitles.map((film, index) => ({
        id: `edge-${index}`,
        source: character.name,
        target: `film-${index}`,
        animated: false,
      }));

      const shipEdges = starshipsTitles.map((ship, index) => ({
        id: `edge-ship-${index}`,
        source: `film-${index}`,
        target: `ship-${index}`,
        animated: false,
      }));

      const nodes = [characterNode, ...filmNodes, ...shipNodes];
      const edges = [...filmEdges, ...shipEdges];
      const characterNodePosition = [characterX, 100];

      return { nodes, edges, characterNodePosition };
    } catch (error) {
      console.error('Error building graph data:', error);
      return null;
    }
  }, []);

  return { buildGraphData };
};

export default useGraphBuilder;
