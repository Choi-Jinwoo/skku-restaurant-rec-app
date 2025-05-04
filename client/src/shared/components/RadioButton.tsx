
type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export const RadioGroup = <T,>({ label, options, value, onChange }: Props<T>) => {
  return (
    <div className="w-full max-w-md">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isChecked = value === option.value;
          return (
            <label
              key={String(option.value)}
              className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition ${isChecked
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <input
                type="radio"
                name={`radio-${label}`}
                value={String(option.value)}
                checked={isChecked}
                onChange={() => onChange(option.value)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};
