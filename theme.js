import { theme as chakraTheme } from "@chakra-ui/core";

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: {
      500: "#000000",
      600: "#222222"
    },
    googleBlue: {
      500: "#4285F4",
      600: "#427AF4"
    }
  },
};

export default theme;
