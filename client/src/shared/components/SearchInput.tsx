import { useEffect, useMemo, useRef, useState } from "react";

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  label: string;
  placeholder: string;
  list: Option<T>[];
  onChange: (value: T) => void;
};

const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchInput = <T,>({ label, placeholder, list, onChange }: Props<T>) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const isEmpty = debouncedQuery.trim() === '';

  const filteredList = useMemo(() => {
    return isEmpty ? list.slice(0, 10) : list.filter(item => item.label.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 10);
  }, [debouncedQuery, isEmpty])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        placeholder={placeholder}
      />
      {isOpen && filteredList.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredList.map((item) => (
            <li
              key={String(item.value)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-600"
              onClick={() => {
                onChange(item.value);
                setQuery(item.label);
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;