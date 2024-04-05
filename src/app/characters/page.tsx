'use client'

import { getCharacters } from "@/api/characters";
import CharactersList from "@/components/CharactersList";
import CharactersListSkeleton from "@/components/CharactersListSkeleton";
import Pagination from "@/components/Pagination";
import { Character } from "@/types/Character";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function CharactersPage({
  searchParams
}: {
  searchParams?: {
    query?: string,
  }
}) {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams?.query || '';

  //state for the first load of the page for pagination
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
        setIsFirstLoad(false);
      });
  }, [currentPage]);

  //handle click on the page number button
  const handlePageChangeOnClick = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  }

  //handle click on previous page button
  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      setCurrentPage(prevPage);
      router.push(`?page=${prevPage}`)
    }
  };

  //handle click on next page button
  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      router.push(`?page=${nextPage}`)
    }
  };

  return (
    <Flex
      as="main"
      direction="column"
      justify="center"
      alignItems="center"
      w="100vw"
      h="100vh"
      px={100}
      py={200}
    >
      {isLoading ? (
        <Spinner color="white" size="xl" role="status" />
      ) : (
        <Suspense fallback={<CharactersListSkeleton />}>
          <CharactersList characters={characters} />
        </Suspense>
      )}

      {!isFirstLoad &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChangeOnClick}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePreviousPage}
        />
      }
    </Flex>
  );
}