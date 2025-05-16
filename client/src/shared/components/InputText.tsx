type Props = {
  label: string;
  placeholder: string;
  value: string
  onChange: (value: string) => void;
}

const InputText = ({ label, placeholder, value, onChange }: Props) => {

  return (
    <div className="relative w-full max-w-md" >
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputText