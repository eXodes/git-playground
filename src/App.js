import logo from "./logo.svg";
import "./App.css";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
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
