// src/HomePage.jsx
import React, {useState} from "react";

const HomePage = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!selectedFiles) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    // Append selected files to FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Files uploaded successfully:", result);
        alert("Files uploaded successfully!");
      } else {
        const error = await response.json();
        console.error("Error uploading files:", error);
        alert("Error uploading files: " + error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading files: " + error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 rounded-md shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MediBot</h1>
          <p className="text-lg">
            MediBot is an advanced chatbot designed to assist doctors in
            accessing and analyzing patient medical records. With MediBot,
            healthcare professionals can quickly retrieve crucial patient
            information, improving diagnosis accuracy and patient care.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <div className="flex flex-row justify-between mt-8">
        <div className="bg-white p-4 flex-1 mx-2 rounded-md border border-black flex flex-col justify-between">
          <div>
            <p className="text-3xl text-center py-2">
              Upload Your PDF Files here
            </p>
            <p className="mb-4 text-center">File format should be PDF only</p>
          </div>
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
            />
            <label
              htmlFor="file-upload"
              className="block w-full bg-blue-500 text-white py-3 px-6 rounded-md text-center cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
            >
              Choose Files
            </label>
          </div>
        </div>

        <div className="bg-white p-4 flex-1 mx-2 rounded-md border border-black flex flex-col justify-between">
          <div>
            <p className="text-3xl text-center py-2">
              Upload Your Text Files here
            </p>
            <p className="mb-4 text-center">File format should be .txt only</p>
          </div>
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              accept=".txt"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
            />
            <label
              htmlFor="file-upload"
              className="block w-full bg-blue-500 text-white py-3 px-6 rounded-md text-center cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
            >
              Choose Files
            </label>
          </div>
        </div>

        <div className="bg-white p-4 flex-1 mx-2 rounded-md border border-black flex flex-col justify-between">
          <div>
            <p className="text-3xl text-center py-2">
              Files not in PDF or Text format? Convert Your images into text
              format
            </p>
          </div>
          <div className="relative">
            <form onSubmit={handleSubmit}>
              <input
                id="file-upload"
                type="file"
                accept=".jpg, .png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="block w-full bg-blue-500 text-white py-3 px-6 rounded-md text-center cursor-pointer shadow-lg hover:bg-blue-300 transition-colors"
              >
                Choose Files
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
