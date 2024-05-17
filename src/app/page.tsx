import { Box, Button, Fade, Typography } from "@mui/material";

export default function Home() {
  return (
    <Fade in mountOnEnter timeout={1500}>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={5}
        height="100vh"
        width="100vw"
      >
        <Box
          alignSelf={{ xs: "center" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mx={{ xs: "50px", lg: 0 }}
          textAlign="center"
          mb={{ xs: "-250px", md: "-200px", lg: 0 }}
        >
          <Typography
            variant="h1"
            color="white"
            fontSize="xx-large"
            mb="20px"
          >
            Explore detail information about your favourite hero
          </Typography>
          <Button
            variant="contained"
            href="/characters"
            sx={{
              width: "200px",
              height: "50px",
              backgroundColor: "yellow",
              transition: "all 0.3s",
              color: "black",
              fontSize: "16px",
              fontWeight: "regular",
              "&:hover": {
                backgroundColor: "yellow",
                transform: 'scale(1.2)',
              },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}
