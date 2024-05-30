import { CiMenuBurger } from "react-icons/ci";
const Logo = () => {
  return (
    <>
      <p className="font-orbitron text-3xl font-black">
        Zeraki<span className="text-green-500">S</span>ales
      </p>
    </>
  );
};

const Navbar = ({ show, setShow }) => {
  return (
    <nav className="navbar w-full sticky top-0 z-10 px-2 md:px-[15%] border-2 py-3 shadow-sm flex justify-between md:justify-normal bg-white">
      <div className="mx-5">
        <Logo />
      </div>
      <div
        className="visible md:hidden m-2 bg-green-100 p-1 rounded-md"
        onClick={() => setShow(!show)}>
        <CiMenuBurger size="27" />
      </div>
    </nav>
  );
};

export default Navbar;
