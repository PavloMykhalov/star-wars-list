import { Character } from "@/types/Character";
import CharacterItem from "./CharacterItem";
import CharacterModal from "./CharacterModal";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Fade, Grow, List } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  characters: Character[],
}

// Function to add a query parameter
const addQueryParam = (searchParams: URLSearchParams, key: string, value: string) => {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set(key, value);
  return newSearchParams;
}

// Function to remove a query parameter
const removeQueryParam = (searchParams: URLSearchParams, key: string) => {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.delete(key);
  return newSearchParams;
}

const normalizeName = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export default function CharactersList({ characters }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const characterName = searchParams.get('character');
    if (characterName) {
      const normalizedCharacterName = normalizeName(characterName);
      const character = characters.find(c => normalizeName(c.name) === normalizedCharacterName);
      if (character) {
        setSelectedCharacter(character);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, characters]);


  //function for handling opening modal
  const handleOpeningModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);

    const newSearchParams = addQueryParam(searchParams, 'character', normalizeName(character.name));
    router.push(`?${newSearchParams.toString()}`);
  }

  // function for handling closing modal
  const handleClosingModal = () => {
    const newSearchParams = removeQueryParam(searchParams, 'character');
    router.replace(`?${newSearchParams.toString()}`);
    setSelectedCharacter(null);
    setIsModalOpen(false);
  }

  return (
    <>
      <List
        sx={{
          width: { xs: "100vw", md: "450px", lg: "900px" },
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "20px",
          rowGap: "20px",
          mb: "50px",
          marginTop: { xs: "50px" },
        }}
      >
        {Array.isArray(characters) && characters.map((character, index) => (
          <Grow
            key={`${character.name}-${character.birthYear}`}
            in
            timeout={500 + index * 100}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div>
              <CharacterItem
                character={character}
                openModal={handleOpeningModal}
              />
            </div>
          </Grow>
        ))}
      </List>

      <CharacterModal
        character={selectedCharacter}
        onClose={handleClosingModal}
        isOpen={isModalOpen}
      />
    </>
  );
}