import { useState, useEffect } from "react";
import CollectInvoice from "./CollectInvoice";
import axios from "axios";
import { useAlert } from "react-alert";

const UpcomingInvoices = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [school, setSchool] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const alert = useAlert();

  const url = "https://schools-bsc2.onrender.com/schools";

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  function getPendingInvoices() {
    return data.flatMap((school) =>
      school.invoices
        .filter((invoice) => invoice.completionStatus === "Pending")
        .map((invoice) => ({ ...invoice, schoolName: school.schoolName }))
    );
  }

  const upcomingInvoices = getPendingInvoices();

  const handleCollectPayment = (invoice) => {
    const schoolName = invoice.schoolName;
    const school = data.find((school) => school.schoolName === schoolName);
    setSchool(school);
    setSelectedInvoice(invoice);
    setIsOpen(true);
  };

  const collectPayment = async (updatedSchool) => {
    const { id } = updatedSchool;
    console.log(updatedSchool);
    try {
      await axios.patch(
        `https://schools-bsc2.onrender.com/schools/${id}`,
        updatedSchool
      );
      alert.show("Collected Successfully!");
      fetchData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  // calculate balance
  const calculateRemainingAmount = (amount, paidAmount) => {
    const remainingAmount = amount - paidAmount;
    return remainingAmount.toFixed(2);
  };

  return (
    <div className="mb-20">
      <h4 className="font-bold font-forum text-lg">Upcoming Invoices</h4>
      <div className="invoice-list font-forum">
        <table className="w-full border-collapse">
          <thead className="bg-green-400 shadow-sm border-b-2">
            <tr>
              <th className="p-2 text-left w-8">No</th>
              <th className="p-2 text-center md:text-left w-1/4">
                School Name
              </th>
              <th className="p-2 text-center md:text-right w-1/5">
                Amount Due
              </th>
              <th className="p-2 text-center md:text-left w-1/5">Due Date</th>
              <th className="p-2 text-left w-1/5 hidden md:visible">ID</th>
              <th className="p-2 text-left w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingInvoices.map((invoice, index) => (
              <tr
                key={index}
                className={`${index % 2 && "bg-green-100"} ${
                  index % 2 && "hover:bg-green-200"
                } ${!(index % 2) && "hover:bg-amber-50"}`}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{invoice.schoolName}</td>
                <td className="p-2 text-right">
                  $
                  {calculateRemainingAmount(invoice.amount, invoice.paidAmount)}
                </td>
                <td className="p-2">{invoice.dueDate}</td>
                <td className="p-2 hidden md:visible">{invoice.invoiceId}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleCollectPayment(invoice)}
                    className="border border-green-500 hover:bg-green-500 text-gray-700 px-2 py-1 rounded">
                    Collect Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedInvoice && (
        <CollectInvoice
          school={school}
          isOpen={isOpen}
          onClose={onClose}
          onAddInvoice={collectPayment}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default UpcomingInvoices;
