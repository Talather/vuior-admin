import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Assuming Lucide Icons are being used

const SortAutocomplete = ({ sortBy, setSortBy, autocompleteOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSortBy(option);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4 w-60 bg-buttonGpt text-white rounded-lg shadow-4 hover:bg-opacity-90 transition-all">
      {/* Label */}
      <label
        htmlFor="sortOptions"
        className="block text-sm font-medium text-white px-3 py-2"
      >
        Sort Options:
      </label>

      {/* Dropdown */}
      <button
        id="sortOptions"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center w-full p-2 text-left bg-transparent border-b border-white focus:outline-none"
      >
        {sortBy || "Select an option"}
        <ChevronDown className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white text-black rounded-lg shadow-lg">
          {autocompleteOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortAutocomplete;
