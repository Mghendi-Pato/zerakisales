import { useParams } from "react-router-dom";
import { IoSchoolOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { BsCalendar2Date } from "react-icons/bs";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineAttachMoney } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import NewInvoiceModal from "../components/CreateInvoice";
import { useAlert } from "react-alert";
import CollectInvoice from "../components/CollectInvoice";
import UpdateCollection from "../components/UpdateCollection";

const SchoolDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const [school, setSchool] = useState(null);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  const [list, setList] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [collect, setCollect] = useState(false);
  const [collectInvoice, setCollectInvoice] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateCollection, setUpdateCollection] = useState({});
  console.log(updateCollection);

  const addInvoice = async (updatedSchool) => {
    console.log(updatedSchool);
    try {
      const response = await axios.patch(
        `https://schools-bsc2.onrender.com/schools/${id}`,
        updatedSchool
      );
      alert.show("Successful!");
      fetchData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setCollect(false);
    setUpdate(false);
  };

  //Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://schools-bsc2.onrender.com/schools/${id}`
      );
      setSchool(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //delete invoice
  const deleteInvoice = async (invoiceNumber) => {
    try {
      const updatedInvoices = school.invoices.filter(
        (invoice) => invoice.invoiceNumber !== invoiceNumber
      );
      await axios.patch(`https://schools-bsc2.onrender.com/schools/${id}`, {
        invoices: updatedInvoices,
      });
      alert.show("Invoice Deleted Successfully!");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (!school) {
    return <div>Loading...</div>;
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  //Calculate balance
  const calculateRemainingAmount = (amount, paidAmount) => {
    const remainingAmount = amount - paidAmount;
    return remainingAmount.toFixed(2);
  };

  const calculateBalance = (invoicesCreated, collectionsMade) => {
    return invoicesCreated - collectionsMade;
  };

  const schoolBalance = calculateBalance(
    school.schoolBalance.invoicesCreated,
    school.schoolBalance.collectionsMade
  );

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredInvoices = school.invoices.filter((invoice) => {
    if (status === "") return true;
    return invoice.completionStatus === status;
  });

  const filteredCollections = school.collections.filter((collection) => {
    if (list === "") return true;
    return collection.status.toLowerCase() === list.toLowerCase();
  });

  const onUpdateCollection = async (updatedSchool) => {
    try {
      const response = await axios.patch(
        `https://schools-bsc2.onrender.com/schools/${id}`,
        updatedSchool
      );
      alert.show("Collection updated Successfully!");
      fetchData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-5">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-row m-2 items-center">
          <div className="w-32 h-32 border bg-green-300 flex flex-col justify-center items-center">
            <p className="font-bold font-forum text-6xl">
              {getInitials(school.schoolName)}
            </p>
          </div>
        </div>
        <div className="space-y-4 mx-2 ">
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <IoSchoolOutline size="30" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">School:</h1>
            <span className="text-gray-500 text-lg md:text-xl ">
              {school.schoolName}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <GrUpdate size="20" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">Type:</h1>
            <span className="text-gray-500 text-lg md:text-xl ">
              {school.type}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <AiOutlineProduct size="25" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">Product:</h1>
            <span className="text-gray-500 text-lg md:text-xl ">
              {school.product}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <MdOutlineLocationOn size="25" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">County:</h1>
            <span className="text-gray-500 text-lg md:text-xl ">
              {school.county}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <BsCalendar2Date size="25" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">
              Registration Date:
            </h1>
            <span className="text-gray-500 text-lg md:text-xl l">
              {school.registrationDate}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <FiPhoneOutgoing size="25" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">Phone:</h1>
            <span className="text-gray-500 text-lg md:text-xl l">
              {school.contactInformation.phone}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <MdOutlineEmail size="25" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">Email:</h1>
            <span className="text-gray-500 text-lg md:text-xl ">
              {school.contactInformation.email}
            </span>
          </div>
          <hr className="max-w-96" />
          <div className="flex flex-row items-center text-center space-x-3">
            <span>
              <MdOutlineAttachMoney size="25" />
            </span>
            <h1 className="font-bold text-lg md:text-xl ">School balance:</h1>
            <span className="text-gray-500 text-lg md:text-xl ">
              {"$ " + schoolBalance}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-2 p-2 border-2">
        <div className="flex flex-row m-2 space-x-2">
          <button
            className={`p-2 ${
              !show && "bg-gray-400"
            } bg-green-400 hover:bg-green-500 p-2 font-forum shadow-sm`}
            onClick={() => setShow(true)}>
            Invoices
          </button>
          <button
            className={`p-2 ${
              show && "bg-gray-400"
            } bg-amber-400  hover:bg-green-500 p-2 font-forum shadow-sm`}
            onClick={() => setShow(false)}>
            Collections
          </button>
        </div>
        {show && (
          <div className="my-10 border p-2">
            <div>
              <h4 className="font-forum text-lg mb-2">
                All invoices for {school.schoolName}
              </h4>
              <div className="flex flex-row justify-between md:justify-end space-x-2 md:space-x-4 mb-1">
                <button
                  className="bg-amber-400 hover:bg-amber-500 p-2 font-forum shadow-sm"
                  onClick={() => setIsOpen(true)}>
                  Add Invoice
                </button>
                <button
                  className="bg-green-400 hover:bg-green-500 p-2 font-forum shadow-sm"
                  onClick={() => setStatus("")}>
                  All Invoices
                </button>
                <button
                  className="bg-amber-400 hover:bg-amber-500 p-2 font-forum shadow-sm"
                  onClick={() => setStatus("completed")}>
                  Completed
                </button>
                <button
                  className="bg-green-400 hover:bg-green-500 p-2 font-forum shadow-sm"
                  onClick={() => setStatus("Pending")}>
                  Pending
                </button>
              </div>

              <div className="my-10 overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm font-light font-forum">
                        <thead className="bg-green-400 shadow-sm border-b-2">
                          <tr>
                            <th className="px-6 py-4 w-8">No</th>
                            <th className="px-6 py-4">Invoice Number</th>
                            <th className="px-6 py-4">Invoice Item</th>
                            <th className="px-6 py-4">Creation Date</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Paid Amount</th>
                            <th className="px-6 py-4">Balance</th>
                            <th className="px-6 py-4">Completion Status</th>
                            <th className="px-6 py-4">Days Until Due</th>
                            <th className="px-6 py-4">Collect Payment</th>
                            <th className="px-6 py-4">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInvoices.map((invoice, index) => (
                            <tr
                              key={index}
                              className={` ${index % 2 && "bg-green-100"} ${
                                index % 2 && "hover:bg-green-200"
                              } ${
                                !(index % 2) && "hover:bg-amber-50"
                              } hover:cursor-pointer`}>
                              <td className="whitespace-nowrap px-6 py-4">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {invoice.invoiceNumber}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {invoice.invoiceItem}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {invoice.creationDate}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {invoice.dueDate}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {"$ " + invoice.amount}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {"$ " + invoice.paidAmount}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {calculateRemainingAmount(
                                  invoice.amount,
                                  invoice.paidAmount
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {invoice.completionStatus}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {calculateDaysUntilDue(invoice.dueDate)}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <button
                                  className="border border-green-500 hover:bg-green-500 text-gray-700 px-2 py-1 rounded"
                                  onClick={() => {
                                    setCollect(true);
                                    setCollectInvoice(invoice);
                                  }}>
                                  Collect
                                </button>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <button
                                  className="border border-green-500 hover:bg-green-500 text-gray-700 px-2 py-1 rounded"
                                  onClick={() =>
                                    deleteInvoice(invoice.invoiceNumber)
                                  }>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!show && (
          <div className="mt-5 mx-2">
            <div className="my-10 border p-2">
              <h4 className="font-forum text-lg mb-2">
                All collections for {school.schoolName}
              </h4>
              <div>
                <div className="flex flex-row justify-between md:justify-end space-x-4 mb-1">
                  <button
                    className="bg-green-400 hover:bg-green-500 p-2 font-forum shadow-sm"
                    onClick={() => setList("")}>
                    All Collection
                  </button>
                  <button
                    className="bg-amber-400 hover:bg-amber-500 p-2 font-forum shadow-sm w-32"
                    onClick={() => setList("valid")}>
                    Valid
                  </button>
                  <button
                    className="bg-green-400 hover:bg-green-500 p-2 font-forum shadow-sm"
                    onClick={() => setList("bounced")}>
                    Bounced
                  </button>
                </div>

                <div className="my-10 overflow-x-auto">
                  <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm font-light font-forum">
                          <thead className="bg-green-400 shadow-sm border-b-2">
                            <tr>
                              <th className="px-6 py-4">No</th>
                              <th className="px-6 py-4">Invoice Number</th>
                              <th className="px-6 py-4">Collection Number</th>
                              <th className="px-6 py-4">Date of Collection</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4">Amount</th>
                              <th className="px-6 py-4">Update Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCollections.map((collection, index) => (
                              <tr
                                key={index}
                                className={` ${index % 2 && "bg-green-100"} ${
                                  index % 2 && "hover:bg-green-200"
                                } ${
                                  !(index % 2) && "hover:bg-amber-50"
                                } hover:cursor-pointer`}>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {collection.invoiceNumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {collection.collectionNumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {collection.collectionDate}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {collection.status}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {"$ " + collection.amount}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <button
                                    className="border border-green-500 hover:bg-green-500 text-gray-700 px-2 py-1 rounded"
                                    onClick={() => {
                                      setUpdate(true);
                                      setUpdateCollection(collection);
                                    }}>
                                    Update
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <NewInvoiceModal
          isOpen={isOpen}
          onClose={onClose}
          onAddInvoice={addInvoice}
          school={school}
        />
        <CollectInvoice
          school={school}
          isOpen={collect}
          onClose={onClose}
          onAddInvoice={addInvoice}
          invoice={collectInvoice}
        />
        <UpdateCollection
          isOpen={update}
          invoice={updateCollection}
          school={school}
          onClose={onClose}
          onUpdateCollection={onUpdateCollection}
        />
      </div>
    </div>
  );
};

export default SchoolDetails;
