import { useState, useEffect, useRef } from "react";

const PaymentModal = ({ invoice, onClose }) => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const modalRef = useRef(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value !== "") {
      setAmountError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === "") {
      setAmountError(true);
      return;
    }
    // Handle payment submission logic here
    alert(`Processing payment of $${amount} for invoice: ${invoice.id}`);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-end justify-end z-50">
      <div
        ref={modalRef}
        className="bg-white w-full md:w-1/3 shadow-lg p-6 mb-5 transition-transform transform translate-y-full md:translate-y-0"
        style={{ transitionDuration: "300ms" }}>
        <h2 className="text-xl font-bold mb-4">Collect Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">School Name *</label>
            <input
              type="text"
              value={invoice.schoolName}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount Due *</label>
            <input
              type="text"
              value={`$${invoice.amountDue.toFixed(2)}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date *</label>
            <input
              type="text"
              value={invoice.dueDate}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Invoice Number *</label>
            <input
              type="text"
              value={invoice.invoiceId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount *</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full p-2 border ${
                amountError ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter amount"
            />
            {amountError && (
              <p className="text-red-500 text-sm mt-1">
                Amount cannot be empty
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
