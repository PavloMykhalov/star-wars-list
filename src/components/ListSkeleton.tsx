import { List, Skeleton, Stack } from "@mui/material";

export default function CharactersListSkeleton() {
  const skeletonArray = Array.from({ length: 10 });
  return (
    <Stack>
      <List
        sx={{
          width: { xs: "450px", md: "450px", lg: "900px" },
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "20px",
          rowGap: "20px",
          mb: "100px",
        }}
      >
        {skeletonArray.map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              bgColor: 'grey.900',
              height: { xs: '100px', md: '150px', xl: '150px' },
              width: { xs: '210px', md: '150px', xl: '150px' },
              borderRadius: '10px',
            }}
          />
        ))}
      </List>
    </Stack>
  );
}