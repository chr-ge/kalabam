import { signin, signout, useSession } from "next-auth/client";
import { Avatar, Box, Flex, Heading, Button } from "@chakra-ui/core";

const Nav = () => {
  const [session, loading] = useSession();

  return (
    <nav>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <Flex
        align="center"
        justify="space-between"
        backgroundColor="gray.200"
        borderBottomColor="gray.300"
        borderBottomWidth="thick"
        py="1"
        px="4"
      >
        <Heading color="blue.800">Kalabam</Heading>
        {!session && (
          <Box>
            <Button
              colorScheme="pink"
              color="white"
              aria-label="Sign In"
              size="sm"
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              Sign in
            </Button>
          </Box>
        )}
        {session && (
          <Flex align="center">
            <Avatar
              src={session.user.image}
              name={session.user.name}
              size="sm"
              mr="3"
            />
            <Button
              colorScheme="teal"
              aria-label="Sign Out"
              size="sm"
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault();
                signout();
              }}
            >
              Sign out
            </Button>
          </Flex>
        )}
      </Flex>
    </nav>
  );
};

export default Nav;
