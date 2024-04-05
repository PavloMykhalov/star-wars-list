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
      bgPosition='15%'
      bgSize="700px"
      bgRepeat="no-repeat"
    >
      <Box alignSelf="flex-end">
        <Text as="h1" textColor="white" fontSize="xx-large" mr="15%" mb="20px">
          Explore detail information about your favourite hero
        </Text>
        <Button bgColor={"#ffe81f"} fontSize="xx-large" w="200px" h="75px">
          <Link href='/characters'>
            Get started
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
