import { useState, useEffect } from "react";

const NewInvoiceModal = ({ isOpen, onAddInvoice, onClose, school }) => {
  const [invoiceNumber] = useState(Math.floor(Math.random() * 1000000));
  const [invoiceItem, setInvoiceItem] = useState("");
  const [creationDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [completionStatus] = useState("Pending");
  const [schoolName, setSchoolName] = useState("");

  const schoolId = school.id;

  useEffect(() => {
    if (school) {
      setSchoolName(school.schoolName);
    }
  }, [school]);

  const handleClickOutside = (event) => {
    if (
      isOpen &&
      !document.getElementById("invoiceModal").contains(event.target)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schoolName) {
      alert("Please enter the school name.");
      return;
    }
    const newInvoice = {
      invoiceNumber,
      invoiceItem,
      creationDate,
      dueDate,
      amount,
      paidAmount,
      completionStatus,
    };

    const updatedSchool = {
      ...school,
      invoices: [...school.invoices, newInvoice],
    };

    onAddInvoice(updatedSchool);
    setInvoiceItem("");
    setDueDate("");
    setAmount("");
    setPaidAmount("");
    setSchoolName("");
  };

  return (
    <div
      id="invoiceModal"
      className={`fixed inset-0 flex items-center justify-center mx-4 ${
        isOpen ? "" : "hidden"
      }`}>
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={handleClickOutside}></div>
      <div className="bg-white p-8 rounded-lg z-10 w-80">
        <h2 className="text-2xl font-bold mb-4">Add Invoice</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            School Name:
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Invoice Item:
            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={invoiceItem}
              onChange={(e) => setInvoiceItem(e.target.value)}
              required>
              <option value="">Select Item</option>
              <option value="Analytics">Analytics</option>
              <option value="Finance">Finance</option>
              <option value="Timetable">Timetable</option>
            </select>
          </label>
          <label className="block mb-4">
            Due Date:
            <input
              type="date"
              className="block w-full p-2 border border-gray-300 rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Amount:
            <input
              type="number"
              className="block w-full p-2 border border-gray-300 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Paid Amount:
            <input
              type="number"
              className="block w-full p-2 border border-gray-300 rounded"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              required
            />
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceModal;
