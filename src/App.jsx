import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import FaqList from "./components/FaqList";
import FaqForm from "./components/FaqForm";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [refresh, setRefresh] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleRefreshFaqs = () => {
    setRefresh(!refresh); // Trigger refresh by changing the key
  };

  const toggleFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  return (
    <>
      <div className="min-h-screen bg-primary-50 flex flex-col items-center justify-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-primary-700 mb-8 text-center">
          FAQ System
        </h1>

        <div className="flex flex-col md:flex-row items-start justify-center bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
          {/* Left Section: Language Selector and Faq List */}
          <div className="flex flex-col w-full md:w-1/3 space-y-6">
            <LanguageSelector onSelectLanguage={setSelectedLanguage} />
            <p className="mt-4 text-primary-500">
              Selected Language: {selectedLanguage.toUpperCase()}
            </p>
            <button
              onClick={toggleFormModal}
              className="bg-primary-500 text-white py-2 px-6 rounded-lg hover:bg-primary-600 transition-colors" style={{width:"50%"}}
            >
              Add New FAQ
            </button>
            <button
              onClick={handleRefreshFaqs}
              className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"  style={{width:"50%"}}
            >
              Refresh FAQs
            </button>
          </div>

          <div className="flex flex-col w-full md:w-2/3 mt-8 md:mt-0">
            {/* Passing the selected language and refresh trigger */}
            <FaqList selectedLanguage={selectedLanguage} key={refresh} />
          </div>
        </div>
      </div>

      {/* FAQ Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">
              Add New FAQ
            </h3>
            <FaqForm
              onFaqAdded={() => {
                setRefresh(!refresh); // Refresh FAQs after adding a new one
                setShowFormModal(false); // Close the modal after submission
              }}
            />
            <button
              onClick={toggleFormModal}
              className="mt-6 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
