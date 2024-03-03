export default function Container({ children, flex1 }) {
  return (
    <div className={`w-full max-w-[1200px] p-2 mx-auto sm:p-3 md:p-4 ${flex1 && "flex-1"}`} >
      {children}
    </div>
  );
}
