import { ThemeProvider } from "@material-ui/core";
import { LoadingProvider } from "./hooks/LoadingContext";
import { TrollerProvider } from "./hooks/TrollerContext";
import Home from "./pages/Home";
import theme from "./theme";
import GlobalStyles from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles>
          <LoadingProvider>
            {/* <TrollerProvider> */}
            <Home />
            {/* </TrollerProvider> */}
          </LoadingProvider>
        </GlobalStyles>
      </ThemeProvider>
    </>
  );
}

export default App;
