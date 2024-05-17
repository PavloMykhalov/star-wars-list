import buttonIcon from '/public/images/aircraft.png';
import { Pagination, PaginationItem, useMediaQuery } from "@mui/material";

const SMALL_SCREEN_BREAKPOINT = "40em";

type Props = {
  currentPage: number,
  totalPages: number,
  handleClick: (page: number) => void;
}

const paginationItemStyles = {
  base: {
    backgroundColor: "white",
    width: '40px',
    height: '40px',
    marginBottom: { xs: "50px" },
    '&:hover': {
      backgroundColor: "yellow",
    },
    '&.Mui-selected': {
      backgroundColor: "yellow",
      color: "black",
      '&:hover': {
        backgroundColor: "yellow",
      },
      '&:active': {
        backgroundColor: "yellow.900",
      }
    },
  },
  previousNext: {
    width: "70px",
    backgroundImage: `url(${buttonIcon.src})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  previous: {
    transform: 'rotate(180deg)',
  }
};

export default function PaginationComponent({
  currentPage,
  totalPages,
  handleClick,
}: Props) {
  const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN_BREAKPOINT})`);

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      siblingCount={isSmallScreen ? 0 : totalPages}
      onChange={(_: any, page: number) => handleClick(page)}
      color="primary"
      shape="rounded"
      size="medium"
      renderItem={(item) => (
        <PaginationItem
          component="button"
          {...item}
          sx={{
            ...paginationItemStyles.base,
            ...(item.type === 'previous' || item.type === 'next' ? paginationItemStyles.previousNext : {}),
            ...(item.type === 'previous' && paginationItemStyles.previous),
          }}
        />
      )}
    />
  );
}