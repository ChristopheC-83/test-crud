export default function InputLabel({
  label = "label",
  type = "text",
  name = "",
  placeholder = "",
  defaultValue=""
}) {
  return (
    <div className="flex w-full p-3 mb-4 text-amber-100 bg-neutral-800 rounded-xl placeholder:text-amber-100 ">
      <label className="w-1/3">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full pl-4 text-amber-100 bg-neutral-800 placeholder:text-amber-100"
      />
    </div>
  );
}
