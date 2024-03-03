export default function Button({ children, onClick }) {
  return (
    <button className="px-4 py-2 duration-150 flexMid rounded-xl bg-amber-100 text-slate-800 hover:opacity-80" onClick={onClick}>
      {children}
    </button>
  );
}
