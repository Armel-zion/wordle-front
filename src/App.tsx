import "./App.css";
import Header from "./composents/Header/Header";
import Main from "./composents/Main/Main";
import Footer from "./composents/Footer/Footer";
import HelpModal from "./composents/HelpModal/HelpModal";

import {useState} from "react";

function App() {

  const[isHelpOpen, setIsHelpOpen] = useState(false);

  const openHelp = () => {
    setIsHelpOpen(true);
  };

  const closeHelp = () => {
    setIsHelpOpen(false);
  };


  return (
    <div className="app">
      <Header  onHelpClick={openHelp}/>
      <Main />
      <Footer />
      {isHelpOpen ? <HelpModal onClose={closeHelp} /> : null}
    </div>
  );
}

export default App;
