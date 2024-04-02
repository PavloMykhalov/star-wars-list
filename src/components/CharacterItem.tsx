import { Character } from "@/types/Character";
import { ListItem, Text, useBoolean } from "@chakra-ui/react";

type Props = {
  character: Character;
  openModal: (character: Character) => void;
}

export default function CharacterItem({ character, openModal }: Props) {
  return (
    <ListItem
      display="flex"
      alignItems="center"
      justifyContent="center"
      border={1}
      borderColor="grey"
      borderStyle="solid"
      borderRadius={10}
      height={40}
      width={40}
      cursor="pointer"
      _hover={{ color: 'white', bg: 'grey', transition: "all 0.3s ease-in-out" }}
      transition="background-color 0.3s ease-in-out"
      onClick={() => openModal(character)}
      title="Click for details"
    >
      <Text>
        {character.name}
      </Text>
    </ListItem>
  );
}