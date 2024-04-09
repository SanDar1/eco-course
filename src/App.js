import './App.css';
import {BrowserRouter} from "react-router-dom";

import AppRoutes from "./components/AppRoutesComponent/AppRoutes";

import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {ruRU} from "@mui/material/locale";

const theme = createTheme(
  ruRU,
);

function App() {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
}

export default App;
