import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import axios from "axios";

const FaqForm = ({ onFaqAdded }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  const quillRef = useRef(null); // Create a ref for ReactQuill

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the plain text from the ReactQuill editor
    const plainTextAnswer = quillRef.current.getEditor().getText().trim();

    const newFaq = {
      question,
      answer: plainTextAnswer,  // Send plain text answer
    };

    try {
      await axios.post("http://localhost:3000/api/faqs", newFaq);
      onFaqAdded(); // Trigger a refresh on the parent component
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-heading text-primary-700 mb-4">Add New FAQ</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-primary-700">Question (English):</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full mt-2 p-2 border border-primary-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block text-primary-700">Answer (English):</label>
          <ReactQuill
            value={answer}
            onChange={setAnswer}
            ref={quillRef} 
            className="mt-2"
            theme="snow"
            placeholder="Type the answer here"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600"
        >
          Add FAQ
        </button>
      </form>
    </div>
  );
};

export default FaqForm;
