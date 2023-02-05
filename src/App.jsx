import { Container, MantineProvider } from "@mantine/core";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const links = [
  {
    link: "/create",
    label: "Home",
  },
  {
    link: "/employees",
    label: "List",
  },
];

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header links={links} />
      <Container>
        <Outlet />
      </Container>
    </MantineProvider>
  );
}

export default App;
