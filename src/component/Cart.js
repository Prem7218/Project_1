import React from "react";
import { useSelector } from "react-redux";
import ResMenuCategories from "./body/Restaurant/ResMenuCategories";
import Payment from "./paymentGate/Payment";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector((store) => store.cartData.items);
  return (
    <div>
      {items.length > 0 ? (
        <>
          <div className="mx-auto mt-5">
            {items.map((item, index) => (
              <ResMenuCategories
                key={`link-${index}-${item.id}`}
                inPlaceCart={true}
                itemInfo={item.itemInfo}
                itemCnt={item.itemCount}
              />
            ))}
          </div>

          <div>
            <Payment />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <Link to="/">
            <button className="bg-black text-white text-2xl border-red-300">
              Go Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
