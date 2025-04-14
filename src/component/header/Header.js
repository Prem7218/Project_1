import { Link } from "react-router-dom";
import useInternet from "../Demo/useInternet";
import { useCart } from "../Context/CartContext";
import useZustand from "../Demo/useZustand";

export const Header = ({ headName, headName1 }) => {
  const buttons = ["Home", "About Us", "Contact Us", "Grocery"];
  const buttonPath = ["/", "/about", "/contact", "/grocery"];
  const OnlineStatus = useInternet();
  const { productCount } = useCart();
  const count = useZustand((state) => state.count);

  return (
    <div className="flex items-center justify-between bg-gray-200">
      <div className="flex gap-3">
        <img
          className="w-12 rounded-lg mt-2 m-3"
          src="https://imgs.search.brave.com/k2BfXrg7xJzptV3kHLdHEIcQW2td37bq9smmou-KVRs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/ZmFzdC1mb29kLWFw/cC1sb2dvLWRlc2ln/bi12MC1lMGR4d2Ro/b3VrOGExLnBuZz9h/dXRvPXdlYnAmcz01/NjAyNmIzMWVlMjE2/MjQwNWU2MzIwODc1/MzBlNTVlODE4ZjJi/NGM4"
          alt="image food"
        />
        <h2 className="mt-5">Food App</h2>
      </div>

      <div className="flex gap-3 m-3">
        <p>
          Internet:{" "}
          {OnlineStatus ? (
            <img
              src="https://img.icons8.com/?size=100&id=oRpJcNQuEJxY&format=png&color=000000"
              width={40}
              height={40}
            />
          ) : (
            <img
              src="https://img.icons8.com/?size=100&id=13814&format=png&color=000000"
              width={40}
              height={40}
            />
          )}
        </p>

        {buttons.map((item, index) => (
          <Link key={index} to={buttonPath[index]}>
            <button className="text-white bg-black p-3 rounded-md">
              {item}
            </button>
          </Link>
        ))}

        <Link to={"/cart"}><button className="text-white bg-black p-3 rounded-md">{`cart - ${count}`}</button></Link>
      </div>
    </div>
  );
};

export default Header;
