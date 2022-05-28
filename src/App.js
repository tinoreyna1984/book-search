import "./App.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Auth0ProviderWithHistory>
          <Navbar />
          <AppRouter />
          <Footer />
        </Auth0ProviderWithHistory>
      </Router>
    </>
  );
}

export default App;
