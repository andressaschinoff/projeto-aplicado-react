import { ThemeProvider } from "@material-ui/core";
import { LoadingProvider } from "./hooks/loading-context";
import { TrollerProvider } from "./hooks/TrollerContext";
import Routes from "./routes";
import theme from "./theme";
import GlobalStyles from "./theme/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles>
        <LoadingProvider>
          <TrollerProvider>
            <Routes />
          </TrollerProvider>
        </LoadingProvider>
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default App;
