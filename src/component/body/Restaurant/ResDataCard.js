import React from "react";
import Cuisines from "../Cuisines";

const ResDataCard = ({ IMG_PATH, cloudinaryImageId, name, deliveryTime, avgRating, cuisines }) => {
  return (
    <div
      data-testid="ResCards"
      className="m-8 bg-gray-300 w-[300px] p-5 rounded-2xl h-[300px]"
    >
      <img
        className="h-[160px] w-[300px]"
        src={`${IMG_PATH}${cloudinaryImageId}`}
        alt="Food Restaurant Img"
      />

      <div className="bg-yellow-100 p-2">
        <p className="p-1 ">{name}</p>
        <div>
          <p>
            {avgRating} Star - Deliver: {deliveryTime} min Cuisines:{" "}
          </p>
          <Cuisines cuisines={cuisines} />
        </div>
      </div>
    </div>
  );
};

export default ResDataCard;
