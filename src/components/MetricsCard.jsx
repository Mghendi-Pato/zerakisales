import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { MdMoneyOffCsred } from "react-icons/md";

const MetricsCard = ({ type, total }) => {
  return (
    <div
      className="border m-2 h-36 w-80 md:w-72  rounded-xl p-2 shadow font-forum flex flex-col 
    transition-transform transform hover:scale-105 hover:shadow-xl mx-3">
      <div className="flex flex-row items-center justify-between px-2">
        {type === "collections" && (
          <RiMoneyDollarCircleFill size="30" color="#86efac" />
        )}
        {type === "sign ups" && (
          <FaArrowsDownToPeople size="30" color="#262626" />
        )}
        {type === "revenue" && <GiReceiveMoney size="30" color="#262626" />}
        {type === "bounced cheques" && (
          <MdMoneyOffCsred size="30" color="#f43f5e" />
        )}
        <p
          className={` -right-2 p-1 shadow pl-3 ${
            type === "collections" && "bg-green-300"
          } ${type === "sign ups" && "bg-amber-300"} ${
            type === "revenue" && "bg-fuchsia-300"
          }  ${type === "bounced cheques" && "bg-rose-500"}`}>
          {type}
        </p>
      </div>
      <div className="flex flex-1 justify-center items-center text-center">
        <span
          className={`text-gray-700 font-bold text-4xl ${
            type === "bounced cheques" ? "hidden" : ""
          } ${type === "sign ups" ? "hidden" : ""}`}>
          $
        </span>
        <p className="text-gray-700 font-bold text-2xl">{total}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
