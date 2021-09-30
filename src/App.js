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
        <motion.img
          src={logo}
          initial='hidden'
          animate='visible'
          variants={variants}
          className='App-logo'
          alt='logo'
        />
        <p className='mb-5 px-4 py-2 rounded bg-gray-500 text-gray-300 uppercase tracking-widest flex items-center'>
          <span className='text-sm font-bold mx-2'>Status</span> {online ? "😀" : "😐"}
        </p>
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
