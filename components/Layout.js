import Header from "../components/Header";
import { Container } from "@chakra-ui/core";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
