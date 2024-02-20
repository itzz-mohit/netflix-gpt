import { Provider } from "react-redux";
import { Body } from "./components/index";
import appStore from "./app/appStore";
function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
