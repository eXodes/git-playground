import logo from "./logo.svg";
import "./App.css";
import { useNetworkState } from "react-use";

function App() {
  const { online } = useNetworkState();

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <p>Currently is {online ? "😀" : "😐"}</p>
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
