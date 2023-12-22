import MainContent from "./components/MainContent";
import Navs from "./components/Navs";

import { ProjectContextProvider } from "./store/ProjectContextProvider";

function App() {
  return (
    <ProjectContextProvider>
      <Navs />
      <MainContent />
    </ProjectContextProvider>
  );
}

export default App;
