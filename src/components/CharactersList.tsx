import { Character } from "@/types/Character";
import { List, useBoolean } from "@chakra-ui/react";
import CharacterItem from "./CharacterItem";
import { useState } from "react";
import CharacterModal from "./CharacterModal";

type Props = {
  characters: Character[],
}

export default function CharactersList({ characters }: Props) {
  const [isModalOpen, setIsModalOpen] = useBoolean();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  //function for handling opening modal
  const handleOpeningModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen.on();
  }

  //function for handling closing modal
  const handleClosingModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen.off();
  }

  return (
    <>
      <List
        w={{ base: "450px", md: "768px", lg: "992px" }}
        h="100%"
        textAlign="center"
        mb={{ base: "150px", md: "150px", "2xl": "100px" }}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        columnGap="10px"
        rowGap="10px"
      >
        {Array.isArray(characters) && characters.map(character => (
          <CharacterItem
            character={character}
            openModal={handleOpeningModal}
            key={`${character.name}-${character.birthYear}`}
          />
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