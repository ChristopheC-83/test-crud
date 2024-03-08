export default function InputLabelBtn({
  label = "label",
  type = "text",
  name = "",
  placeholder = "",
  defaultValue="",
  onClick=""
}) {
  return (
    <div className="flex w-full p-3 mb-4 text-amber-100 bg-neutral-800 rounded-xl placeholder:text-amber-100 ">
      <label className="w-1/2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="pl-4 text-amber-100 bg-neutral-800 placeholder:text-amber-100"
      />
      <button onClick={onClick}>✅</button>
    </div>
  );
}
