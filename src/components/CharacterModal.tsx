import ReactFlow, { Background, MiniMap, Controls, ReactFlowProvider, BackgroundVariant } from 'react-flow-renderer';
import { getCharacterFilms } from "@/api/films";
import { getCharacterStarships } from "@/api/starships";
import { Character } from "@/types/Character";
import React, { useCallback, useEffect, useState } from "react";
import useGraphBuilder, { GraphData } from '@/hooks/useNodes';
import { Box, Grow, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  character: Character | null,
  isOpen: boolean,
  onClose: () => void,
}

export default function CharacterModal({ character, isOpen, onClose }: Props) {
  const [films, setFilms] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const { buildGraphData } = useGraphBuilder();
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (character) {
        const [filmTitles, starshipsTitles] = await Promise.all([
          getCharacterFilms(character.films),
          getCharacterStarships(character.starships)
        ]);
        setFilms(filmTitles);
        setStarships(starshipsTitles);
      }
    } catch (error) {
      console.error('Error loading:', error);
    }
  }, [character]);

  const fetchGraphData = useCallback(async () => {
    if (character) {
      const filmTitles = await getCharacterFilms(character.films);
      const starshipsTitles = await getCharacterStarships(character.starships);
      const data = await buildGraphData(character, filmTitles, starshipsTitles);
      if (data) {
        setGraphData(prevData => ({ ...prevData, ...data }));
      }
    }
  }, [character, buildGraphData]);

  // fetching titles for starships and films
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // creating nodes and edges
  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  if (!isOpen || !graphData) {
    return null;
  }

  const { nodes, edges, characterNodePosition } = graphData;

  return (
    <Modal
      open={isOpen}
      aria-labelledby="character-modal-title"
      aria-describedby="character-modal-description"
    >
      <Grow in timeout={500}>
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            width: '80%',
            bgcolor: 'black',
            boxShadow: 24,
            border: "1px solid yellow",
            borderRadius: "50px",
            p: 4,
          }}
        >
          <ReactFlowProvider>
            <IconButton
              aria-label="delete"
              onClick={onClose}
              sx={{
                position: "relative",
                left: "98%",
                color: "yellow",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              style={{ width: '100%', height: '700px' }}
              fitView={true}
              fitViewOptions={{ includeHiddenNodes: true }}
            >
              <Background color="black" variant={BackgroundVariant.Dots} />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </Box>
      </Grow>
    </Modal>
  );
}