import { getNumber } from "@/helpers/getNumbers";
import { Box, Button, ButtonGroup, Image, useMediaQuery } from "@chakra-ui/react";
import buttonIcon from '/public/images/aircraft.png';

const SMALL_SCREEN_BREAKPOINT = "40em";

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
  const [isSmallScreen] = useMediaQuery(`(max-width: ${SMALL_SCREEN_BREAKPOINT})`);

  return (
    <Box
      display="flex"
      alignItems="center"
      position="fixed"
      mx="50px"
      bottom={{ base: "50px", md: "150px", xl: "150px" }}
    >
      <Button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        _active={{ bg: "yellow" }}
        _hover={{ bg: "yellow.200" }}
        mr={{ base: "200px", md: 0 }}
      >
        <Image
          src={buttonIcon.src}
          w={10}
          h={10}
          alt="Previous page button"
          transform="scaleX(-1)"
        />
      </Button>

      {!isSmallScreen && (
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
      )}

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