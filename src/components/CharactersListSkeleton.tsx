import { Skeleton, Stack } from "@chakra-ui/react";

export default function CharactersListSkeleton() {
  const skeletonArray = Array.from({ length: 10 });
  return (
    <Stack>
      {skeletonArray.map((_, index) => (
        <Skeleton key={index} w={40} h={40} />
      ))}
    </Stack>
  );
}