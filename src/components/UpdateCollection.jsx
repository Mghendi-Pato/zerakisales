import { useState, useEffect } from "react";

const UpdateCollection = ({
  isOpen,
  onUpdateCollection,
  onClose,
  school,
  invoice,
}) => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [status, setStatus] = useState("Valid");

  useEffect(() => {
    if (isOpen) {
      setSelectedCollection(null);
      setStatus("Valid");
    }
  }, [isOpen]);

  const handleCollectionChange = (e) => {
    const collectionId = e.target.value;
    const collection = school.collections.find(
      (col) => col.collectionNumber === collectionId
    );
    setSelectedCollection(collection);
    setStatus(collection ? collection.status : "Valid");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCollection) {
      alert("Please select a collection to update.");
      return;
    }

    const updatedCollection = {
      ...selectedCollection,
      status,
    };

    const updatedSchool = {
      ...school,
      collections: school.collections.map((col) =>
        col.collectionNumber === selectedCollection.collectionNumber
          ? updatedCollection
          : col
      ),
    };

    onUpdateCollection(updatedSchool);
    console.log(updatedSchool);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (
      isOpen &&
      !document.getElementById("collectionModal").contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      id="collectionModal"
      className={`fixed inset-0 flex items-center justify-center mx-4 ${
        isOpen ? "" : "hidden"
      }`}>
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={handleClickOutside}></div>
      <div className="bg-white p-8 rounded-lg z-10 w-80">
        <h2 className="text-2xl font-bold mb-4">Update Collection</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Select Collection:
            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={
                selectedCollection ? selectedCollection.collectionNumber : ""
              }
              onChange={handleCollectionChange}
              required>
              <option value="">Select Collection</option>
              {school.collections
                .filter((col) => col.invoiceNumber === invoice.invoiceNumber)
                .map((col) => (
                  <option
                    key={col.collectionNumber}
                    value={col.collectionNumber}>
                    {col.collectionNumber}
                  </option>
                ))}
            </select>
          </label>
          <label className="block mb-4">
            Status:
            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required>
              <option value="Valid">Valid</option>
              <option value="Bounced">Bounced</option>
            </select>
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-white rounded mr-2"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCollection;
