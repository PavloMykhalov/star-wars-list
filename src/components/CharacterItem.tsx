import { Character } from "@/types/Character";
import { ListItem, Typography } from "@mui/material";

type Props = {
  character: Character;
  openModal: (character: Character) => void;
}

export default function CharacterItem({ character, openModal }: Props) {
  return (
    <ListItem
      onClick={() => openModal(character)}
      title="Click for details"
      sx={{
        height: { xs: '100px', md: '150px', xl: '150px' },
        width: { xs: '225px', md: '150px', xl: '150px' },
        backgroundColor: 'yellow',
        cursor: 'pointer',
        '&:hover': {
          color: 'white',
          transform: 'scale(1.1)',
        },
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid grey',
        borderRadius: '10px',
        padding: '20px',
        textAlign: "center",
      }}
    >
      <Typography
        color="black"
        fontSize="x-large"
        fontWeight="bold"
      >
        {character.name}
      </Typography>
    </ListItem>
  );
}