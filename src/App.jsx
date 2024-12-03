import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Navigator from "./components/Navigation/Navigation";


function App() {

  return (
    <>
        <Header />
        <Navigator />
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default App