import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Schools = () => {
  const [data, setData] = useState([]);

  const url = "https://schools-bsc2.onrender.com/schools";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [url, data]);

  const navigate = useNavigate();
  return (
    <div className="my-10">
      <h4 className="font-forum text-lg mb-2">
        Click on the School to see invoices and collections
      </h4>
      <div className="my-10 overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light font-forum">
                <thead className="bg-green-400 shadow-sm border-b-2">
                  <tr>
                    <th className="px-6 py-4 w-8">No</th>
                    <th className="px-6 py-4">School Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 hidden md:table-cell">County</th>
                    <th className="px-6 py-4">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((school, index) => (
                    <tr
                      key={index}
                      onClick={() => navigate(`/schools/${school.id}`)}
                      className={` ${index % 2 && "bg-green-100"} ${
                        index % 2 && "hover:bg-green-200"
                      } ${
                        !(index % 2) && "hover:bg-amber-50"
                      } hover:cursor-pointer`}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {school.schoolName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {school.type}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 hidden md:table-cell">
                        {school.county}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {school.contactInformation.phone}
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
  );
};

export default Schools;
