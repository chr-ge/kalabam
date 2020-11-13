import Head from 'next/head'
import Header from "../components/Header";
import { Container } from "@chakra-ui/core";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Kalabam"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
