import "./Grid.css";

export default function Grid({ children }) {
  return (
    <div id="gantt-A" className="grid grid-cols-6 rounded-xl p-4 h-auto">
      {children}
    </div>
  );
}
