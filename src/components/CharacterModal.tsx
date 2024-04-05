import ReactFlow, { Background, MiniMap, Controls, ReactFlowProvider, BackgroundVariant } from 'react-flow-renderer';
import { getCharacterFilms } from "@/api/films";
import { getCharacterStarships } from "@/api/starships";
import { Character } from "@/types/Character";
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  character: Character | null,
  isOpen: boolean,
  onClose: () => void,
}

export default function CharacterModal({ character, isOpen, onClose }: Props) {
  const [films, setFilms] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [characterNodePosition, setCharacterNodePosition] = useState<[number, number]>([1, 1]);

  // fetching titles for starships and films
  useEffect(() => {
    const fetch = async () => {
      try {
        if (character) {
          const filmTitles = await getCharacterFilms(character.films);
          setFilms(filmTitles);
          const starshipsTitles = await getCharacterStarships(character.starships);
          setStarships(starshipsTitles);
        }
      } catch (error) {
        console.error('Error loading:', error);
      }
    };

    fetch();
  }, [character]);

  // creating nodes and edges
  useEffect(() => {
    if (character) {
      // define position for character node
      const filmCount = films.length;
      const filmXCoordinates = films.map((film, index) => (index + 1) * 200 + 100);
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

      // define positions for films nodes
      const filmNodes = films.map((film, index) => ({
        id: `film-${index}`,
        data: { label: film },
        position: { x: (index + 1) * 200 + 100, y: 300 },
      }));

      // define positions for ships nodes
      const shipNodes = starships.map((ship, index) => ({
        id: `ship-${index}`,
        data: { label: ship },
        position: { x: (index + 1) * 200 + 100, y: 500 },
      }));

      // define connections between character and films
      const filmEdges = films.map((film, index) => ({
        id: `edge-${index}`,
        source: character.name,
        target: `film-${index}`,
        animated: true,
      }));

      // define connections between film and ships
      const shipEdges = starships.map((ship, index) => ({
        id: `edge-ship-${index}`,
        source: `film-${index}`,
        target: `ship-${index}`,
        animated: true,
      }));

      // saving nodes and edges to states
      setNodes([characterNode, ...filmNodes, ...shipNodes]);
      setEdges([...filmEdges, ...shipEdges]);
      setCharacterNodePosition([characterX, 100]);
    }
  }, [character, films, starships]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent bgColor={'black'} style={{ border: '2px solid yellow' }} mx={10}>
        <ModalHeader color={'yellow'}>{character?.name}</ModalHeader>
        <ModalCloseButton color="yellow" _hover={{ backgroundColor: 'gray.400', scale: 1.2 }} />
        <ModalBody>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              style={{ width: '100%', height: '500px' }}
              fitView={true}
              fitViewOptions={{ includeHiddenNodes: true }}
            >
              <Background color="black" variant={BackgroundVariant.Dots} />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </ModalBody>
      </ModalContent>
    </Modal >
  );
}