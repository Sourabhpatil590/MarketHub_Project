import "./App.css";
import RegistrationForm from "./Components/Registration/RegistrationForm";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCrentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function App() {
  return (
    <div className="App">
      <RegistrationForm />
    </div>
  );
}

export default App;
