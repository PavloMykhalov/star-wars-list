'use client'

import { getCharacters } from "@/api/characters";
import CharactersList from "@/components/CharactersList";
import ListSkeleton from "@/components/ListSkeleton";
import { Character } from "@/types/Character";
import { Box, Slide } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import buttonIcon from '/public/images/aircraft.png';
import PaginationComponent from "@/components/Pagination";

const paginationItemStyles = {
  base: {
    backgroundColor: "white",
    width: '40px',
    height: '40px',
    '&:hover': {
      backgroundColor: "orange",
    },
    '&.Mui-selected': {
      backgroundColor: "orange",
      '&:hover': {
        backgroundColor: "orange",
      },
      '&:active': {
        backgroundColor: "orange",
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

export default function CharactersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initalPage = parseInt(searchParams.get('page') || '1', 10);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(initalPage);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //function for fetching characters from API
  const fetchCharacters = async (page: number) => {
    try {
      const { characters, count } = await getCharacters(page);
      setCharacters(characters);
      setTotalPages(Math.ceil(count / 10))
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  //calling fetching and set loading state
  useEffect(() => {
    setIsLoading(true);
    fetchCharacters(currentPage)
      .catch(() => {
        throw new Error('Failed to load characters')
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  //handle click on the page number button
  const handlePageChangeOnClick = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  }

  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Slide direction="left" in timeout={1500}>
        <div>
          {isLoading ? (
            <ListSkeleton />
          ) : (
            <CharactersList characters={characters} />
          )}
        </div>
      </Slide>

      <Slide direction="right" in timeout={1500}>
        <div>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handleClick={handlePageChangeOnClick}
          />
        </div>
      </Slide>
    </Box>
  );
}