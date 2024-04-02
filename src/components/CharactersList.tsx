import { Character } from "@/types/Character";
import { List, ListItem, Text, useBoolean } from "@chakra-ui/react";
import CharacterItem from "./CharacterItem";
import { useState } from "react";
import CharacterModal from "./CharacterModal";

type Props = {
  characters: Character[],
}

export default function CharactersList({ characters }: Props) {
  const [isModalOpen, setIsModalOpen] = useBoolean();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleOpeningModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen.on();
  }

  const handleClosingModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen.off();
  }

  return (
    <>
      <List
        w="100%"
        h="100%"
        textAlign="center"
        mb="5%"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        columnGap={2}
        rowGap={3}
      >
        {Array.isArray(characters) && characters.map(character => (
          <CharacterItem
            key={`${character.name}-${character.birthYear}`}
            character={character}
            openModal={handleOpeningModal}
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