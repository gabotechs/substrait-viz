import { SubstraitViz } from '../lib/main';
import './App.css';
import plan from '../plan.json';

function App() {
  return (
    <div className="main">
      <SubstraitViz plan={JSON.stringify(plan)} />
    </div>
  );
}

export default App;
