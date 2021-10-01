import logo from "./logo.svg";
import "./App.css";
import { useState } from 'react'
import { useNetworkState } from "react-use";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function App() {
  const [count, setCount] = useState(0);
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
        <p>Currently is {online ? "😀" : "😐"}</p>
        <p>Handling complex Git flow is hard!</p>
        <small style={{ marginBlockEnd: "1rem" }}>
          Not sure if I can do this right.
        </small>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>

        <p>And state management!</p>
      </header>
    </div>
  );
}

export default App;
