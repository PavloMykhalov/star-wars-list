import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import bg from "../../public/images/main-logo.png";

export default function Home() {
  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
      bgImage={bg.src}
      w="100vw"
      h="100vh"
      bgPosition={{ base: "50% 2%", "2xl": "15%" }}
      bgSize={{ base: "500px", "2xl": "700px" }}
      bgRepeat="no-repeat"
    >
      <Box
        alignSelf={{ base: "center", "2xl": "flex-end" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        mx={{ base: "50px", md: 0 }}
        textAlign="center"
        mb={{ base: "-250px", lg: "-200px", "2xl": 0 }}
      >
        <Text as="h1" textColor="white" fontSize="xx-large" mr={{ "2xl": "15%" }} mb="20px">
          Explore detail information about your favourite hero
        </Text>
        <Button
          bgColor={"#ffe81f"}
          fontSize="xx-large"
          w="200px"
          h="75px"
          _hover={{ bg: "yellow.200" }}
          mr={{ "2xl": "15%" }}
        >
          <Link href='/characters'>
            Get started
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
