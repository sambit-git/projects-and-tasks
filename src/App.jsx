import MainContent from "./components/MainContent";
import Navs from "./components/Navs";

import { Provider } from "react-redux";
import { store } from "./store/project-redux-store";

function App() {
  return (
    <Provider store={store}>
      <Navs />
      <MainContent />
    </Provider>
  );
}

export default App;
