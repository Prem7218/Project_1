import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../../slices/cartSlice";
import useZustand from "../../Demo/useZustand";


const ResMenuCategories = ({ itemInfo, inPlaceCart, itemCnt }) => {
  const { setProductCount } = useCart();
  const [addRemove, setAddORRemove] = useState("Add");
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const increment = useZustand((state) => state.increment);
  const decrement = useZustand((state) => state.decrement);

  const handleCart = (option, itemCount) => {
    if (option === "Add") {
      dispatch(addItem({ itemInfo: itemInfo, itemCount: itemCount}));
      increment((prev) => prev + 1);
      setAddORRemove("Remove");
      setItemCount((prev) => prev+1);
    } else {
      dispatch(removeItem({ itemInfo: itemInfo, itemCount: itemCount}));
      decrement((prev) => prev - 1);
      setAddORRemove("Add");
      setItemCount((prev) => prev-1);
    }
  };

  return (
    <div
      key={itemInfo?.id}
      className="flex items-center p-3 border-b last:border-b-0"
    >
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${itemInfo?.imageId}`}
        alt={itemInfo?.name}
        className="w-16 h-16 rounded-md"
      />
      <div className="flex-1 px-3">
        <h4 className="text-md font-semibold">{itemInfo?.name}</h4>
        <p className="text-sm text-gray-600">
          {itemInfo?.description || "No description available."}
        </p>
        <div className="flex justify-between">
          <p className="text-green-600 font-semibold mt-1">
            ₹{(itemInfo?.price || itemInfo?.defaultPrice) / 100}
          </p>
          <div className="flex p-2">
            <button
              onClick={() => handleCart("Add", itemCount)}
              className="bg-green-500 p-2 w-[80px] hover:bg-green-600 text-white px-3 py-1 rounded-md"
            >
              Add
            </button>
            <input
              type={"number"}
              min="0"
              value={itemCnt || itemCount}
              className="w-[100px] text-center text-md p-2"
              onChange={(e) => {
                let newValue = Number(e.target.value);
                if(newValue >= 0) {
                  (setItemCount(newValue))
                }
                else{ 
                  setItemCount(0);
                }
              }}
            />
            <button
              onClick={() => {
                if(itemCount > 0 || itemCnt > 0) {
                  handleCart("Remove", itemCount)
                }
              }}
              className="bg-red-500 p-2 w-[80px] hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResMenuCategories;
