import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./hooks/AuthContext";
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
            <AuthProvider>
              <TrollerProvider>
                <Home />
              </TrollerProvider>
            </AuthProvider>
          </LoadingProvider>
        </GlobalStyles>
      </ThemeProvider>
    </>
  );
}

export default App;
