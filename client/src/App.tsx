import "./index.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function App() {
  const { user, loginWithPopup, getAccessTokenSilently } = useAuth0();

  async function getToken() {
    const token = await getAccessTokenSilently({ scope: "read:current_user" });
    console.log(token);
    console.log(user);
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={() => loginWithPopup()}>Login</button>
    </div>
  );
}

export default App;
