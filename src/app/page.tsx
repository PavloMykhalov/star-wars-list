'use client'

import { getCharacters } from "@/api/characters";
import CharactersList from "@/components/CharactersList";
import Pagination from "@/components/Pagination";
import { Character } from "@/types/Character";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //fetching characters from API
  const fetchCharacters = async (page: number) => {
    try {
      const { characters, count } = await getCharacters(page);
      setCharacters(characters);
      setTotalPages(Math.ceil(count / 10))
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage)
      .catch(() => {
        throw new Error('Failed to load characters')
      })
      .finally(() => {

      });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      setCurrentPage(prevPage);
      router.push(`/?page=${prevPage}`)
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      router.push(`/?page=${nextPage}`)
    }
  };

  return (
    <Flex direction="column" justify="center" alignItems="center" mx={20}>
      <CharactersList characters={characters} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </Flex>
  );
}
