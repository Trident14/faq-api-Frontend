import React, { useEffect, useState } from "react";
import axios from "axios";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

  // Function to fetch FAQs based on selected language
  const fetchFaqs = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(
        `http://localhost:3000/api/faqs?lang=${selectedLanguage}`
      );
      setFaqs(response.data);
    } catch (err) {
      setError("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(faqs.length / faqsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (faq) => {
    setCurrentFaq(faq);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentFaq(null);
  };

  // Language change handler
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchFaqs();
  }, [selectedLanguage]); // Trigger fetch when language changes

  if (loading) return <p className="text-primary-500">Loading FAQs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Language Selection */}
      <div className="mb-4">
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="border px-4 py-2 rounded"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-heading text-primary-700 mb-4">FAQs</h2>
        {faqs.length === 0 ? (
          <p className="text-primary-500">No FAQs available.</p>
        ) : (
          <ul className="space-y-4">
            {currentFaqs.map((faq) => (
              <li key={faq._id} className="border-b py-4">
                <p className="text-lg font-semibold text-primary-700">{faq.question}</p>
                <button
                  onClick={() => openModal(faq)}
                  className="text-primary-500 mt-2 underline"
                >
                  View Answer
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePreviousPage}
            className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for FAQ */}
      {showModal && currentFaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-primary-700 mb-4">
              {currentFaq.question}
            </h3>
            <div className="text-primary-500">{currentFaq.answer}</div>
            <button
              onClick={closeModal}
              className="mt-4 bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqList;
