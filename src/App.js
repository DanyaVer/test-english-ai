import './App.css';
import Header from './components/Header';
import WordsSequence from './components/WordsSequence';

function App() {

  return ( 
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      
      <WordsSequence />
      
      <footer>

      </footer>
    </div>
  );
}

export default App;