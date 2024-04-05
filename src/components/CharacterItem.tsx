import { Character } from "@/types/Character";
import { List, ListItem, Text } from "@chakra-ui/react";

type Props = {
  character: Character;
  openModal: (character: Character) => void;
}

export default function CharacterItem({ character, openModal }: Props) {
  return (
    <List>
      <ListItem
        display="flex"
        alignItems="center"
        justifyContent="center"
        border={1}
        p={2}
        borderColor="grey"
        borderStyle="solid"
        borderRadius={10}
        height={{ base: "100px", md: "100px", xl: 40 }}
        width={{ base: "150px", md: "200px", xl: 40 }}
        bg="yellow"
        cursor="pointer"
        _hover={{ color: 'white', transform: "scale(1.1)" }}
        transition="all 0.3s ease-in-out"
        onClick={() => openModal(character)}
        title="Click for details"
      >
        <Text textColor="black" fontSize="x-large" fontWeight="bold">
          {character.name}
        </Text>
      </ListItem>
    </List>
  );
}