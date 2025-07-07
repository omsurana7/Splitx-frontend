import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e5f0fb",
      100: "#cce0f7",
      200: "#99c2ef",
      300: "#66a3e7",
      400: "#3385df",
      500: "#004c97", // HDFC Blue
      600: "#003d78",
      700: "#002e5a",
      800: "#001f3c",
      900: "#000f1e",
      red: "#E31837", // HDFC Red
    },
    background: {
      light: "#F1F3F6",
      dark: "#212529",
    },
  },
  fonts: {
    heading: "Segoe UI, sans-serif",
    body: "Segoe UI, sans-serif",
  },
});
export default theme;
