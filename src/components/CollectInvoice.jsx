import { useState, useEffect } from "react";

const CollectInvoice = ({ isOpen, onAddInvoice, onClose, school, invoice }) => {
  const [invoiceNumber, setInvoiceNumber] = useState(
    invoice.invoiceNumber || Math.floor(Math.random() * 1000000)
  );
  const [invoiceItem, setInvoiceItem] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [completionStatus, setCompletionStatus] = useState("Pending");
  const [schoolName, setSchoolName] = useState("");
  const [addedPay, setAddedPay] = useState(0);

  useEffect(() => {
    if (school) {
      setSchoolName(school.schoolName);
    }
  }, [school]);

  useEffect(() => {
    if (invoice) {
      setInvoiceNumber(invoice.invoiceNumber);
      setInvoiceItem(invoice.invoiceItem);
      setCreationDate(invoice.creationDate);
      setDueDate(invoice.dueDate);
      setAmount(invoice.amount);
      setPaidAmount(invoice.paidAmount);
      setCompletionStatus(invoice.completionStatus);
    }
  }, [invoice]);

  useEffect(() => {
    if (amount && paidAmount + addedPay) {
      setCompletionStatus(
        paidAmount + addedPay >= amount ? "Completed" : "Pending"
      );
    }
  }, [amount, paidAmount, addedPay]);

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
      paidAmount: parseFloat(paidAmount) + parseFloat(addedPay),
      completionStatus:
        parseFloat(paidAmount) + parseFloat(addedPay) >= amount
          ? "Completed"
          : "Pending",
    };

    const collectionNumber = `COL${Math.floor(Math.random() * 1000000)}`;
    const collectionDate = new Date().toISOString().split("T")[0];
    const newCollection = {
      collectionNumber,
      invoiceNumber,
      collectionDate,
      status: "Valid",
      amount: parseFloat(addedPay),
    };

    const updatedSchool = {
      ...school,
      invoices: school.invoices.map((inv) =>
        inv.invoiceNumber === invoiceNumber ? newInvoice : inv
      ),
      collections: [...school.collections, newCollection],
    };

    onAddInvoice(updatedSchool);
    onClose();
  };

  return (
    <div
      id="invoiceModal"
      className={`fixed inset-0 flex items-center justify-center mx-4 ${
        isOpen ? "" : "hidden"
      }`}>
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-10 w-80">
        <h2 className="text-2xl font-bold mb-4">Collect Invoice</h2>
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
            Added Payment:
            <input
              type="number"
              className="block w-full p-2 border border-gray-300 rounded"
              value={addedPay}
              onChange={(e) => setAddedPay(e.target.value)}
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

export default CollectInvoice;
