// libraries
import {Routes, Route, BrowserRouter} from "react-router-dom"

// components
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
// styles

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
