export default function Chart({ children }) {
  return (
    <div id="gantt-A" className="grid grid-cols-8 rounded-xl p-4 h-auto">
      {children}
    </div>
  );
}
