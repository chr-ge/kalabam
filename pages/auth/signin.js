import React, { useState } from "react";
import { providers, signIn } from "next-auth/client";
import {
  Button,
  Divider,
  Center,
  Flex,
  Link,
  Stack,
  Input,
  Text,
} from "@chakra-ui/core";
import { FaGoogle, FaApple } from "react-icons/fa";
import Nav from "../../components/nav";

export default function SignIn({ providers }) {
  const [email, setEmail] = useState("");

  return (
    <>
      <Nav />
      <Center m="20">
        <Stack spacing={3}>
          <Button
            leftIcon={<FaGoogle />}
            size="lg"
            colorScheme="googleBlue"
            onClick={() => signIn(providers.google.id)}
          >
            Sign in with Google
          </Button>
          <Button
            leftIcon={<FaApple />}
            size="lg"
            colorScheme="black"
            onClick={() => signIn(providers.apple.id)}
          >
            Sign in with Apple
          </Button>
          <Flex align="center">
            <Divider color="gray.400" />
            <Text p="2" fontSize="xs" color="gray.400">
              Or
            </Text>
            <Divider color="gray.400" />
          </Flex>
          <Input
            aria-label="Email Input"
            placeholder="Email Address"
            borderColor="gray.400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button colorScheme="pink" onClick={() => signIn("email", { email })}>
            Sign in with Email
          </Button>
          <Text fontSize="sm" textAlign="center" color="gray.500" pt="3">
            Need an account? <Link color="blue.900">Sign Up</Link>
          </Text>
        </Stack>
      </Center>
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};
