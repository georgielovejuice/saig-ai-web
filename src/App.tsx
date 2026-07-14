import { RiskMap } from "./components/RiskMap";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>RoadRisk TH</h1>
        <p>Accident risk across Thailand — placeholder map, no model output yet.</p>
      </header>
      <main className="app-map">
        <RiskMap />
      </main>
    </div>
  );
}
