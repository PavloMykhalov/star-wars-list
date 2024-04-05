import { getNumber } from "@/helpers/getNumbers";
import { Box, Button, ButtonGroup, Image } from "@chakra-ui/react";
import buttonIcon from '/public/images/aircraft.png';

type Props = {
  currentPage: number,
  totalPages: number,
  handlePrevPage: () => void,
  handleNextPage: () => void,
  onPageChange: (page: number) => void,
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  onPageChange,
}: Props) {
  //pages for creating button group
  const pages = getNumber(totalPages);

  return (
    <Box
      display="flex"
      alignItems="center"
      position="fixed"
      bottom={{ base: "150px", md: "50px", xl: "100px", "2xl": "200px" }}
    >
      <Button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        _active={{ bg: "yellow" }}
        _hover={{ bg: "yellow.200" }}
      >
        <Image
          src={buttonIcon.src}
          w={10}
          h={10}
          alt="Previous page button"
          transform="scaleX(-1)"
        />
      </Button>

      <ButtonGroup mx={5}>
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            isActive={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
            _active={{ bg: "yellow" }}
            _hover={{ bg: "yellow.200" }}
          >
            {pageNumber}
          </Button>
        ))}
      </ButtonGroup>

      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        _active={{ bg: "yellow" }}
        _hover={{ bg: "yellow.200" }}
      >
        <Image
          src={buttonIcon.src}
          w={10}
          h={10}
          alt="Next page button"
        />
      </Button>
    </Box>
  );
}