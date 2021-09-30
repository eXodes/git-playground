import logo from "./logo.svg";
import "./App.css";
import { useNetworkState } from "react-use";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function App() {
  const { online } = useNetworkState();

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <p>Currently is {online ? "😀" : "😐"}</p>
        <motion.img
          src={logo}
          initial='hidden'
          animate='visible'
          variants={variants}
          className='App-logo'
          alt='logo'
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
