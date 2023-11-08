import Button from './components/button/Button';
import plusIcon from './assets/icon/plus.svg';

function App(): JSX.Element {
  return (
    <div>
      <h1>BeatBuddy</h1>
      <Button link="https://www.google.com">
        <img src={plusIcon} alt="" />
        New playlist
      </Button>
      <p>asdl;fjl;asdjf</p>
    </div>
  );
}

export default App;
