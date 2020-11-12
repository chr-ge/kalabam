import { Provider } from "next-auth/client";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import theme from "../theme";

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;
  return (
    <Provider session={session}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
