import { getNumber } from "@/helpers/getNumbers";
import { Box, Button, ButtonGroup, NumberDecrementStepperProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
  const pages = getNumber(totalPages);

  return (
    <Box>
      <Button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      <ButtonGroup mx={5}>
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            isActive={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </ButtonGroup>

      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
}