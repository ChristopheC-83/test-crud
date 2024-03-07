export default function InputLabel({
  label = "label",
  type = "text",
  name = "",
  placeholder = "",
}) {
  return (
    <div className="w-full p-3 mb-4 text-amber-100 bg-neutral-800 rounded-xl placeholder:text-amber-100 flex ">
      <label className="w-1/2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="text-amber-100 bg-neutral-800 pl-4 placeholder:text-amber-100"
      />
    </div>
  );
}
