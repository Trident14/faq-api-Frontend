import React from "react";

const LanguageSelector = ({ onSelectLanguage }) => {
  const handleLanguageChange = (e) => {
    onSelectLanguage(e.target.value);
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-4">
      <label className="block text-primary-700 font-medium">Select Language:</label>
      <select
        onChange={handleLanguageChange}
        className="w-full mt-2 px-4 py-2 border rounded-lg text-primary-700 focus:ring focus:ring-primary-300"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
