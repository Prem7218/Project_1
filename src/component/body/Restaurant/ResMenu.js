import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResMenuCategories from "./ResMenuCategories";

const ResMenu = () => {
  const { resid } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuSections, setMenuSections] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [openSubSections, setOpenSubSections] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${resid}&catalog_qa=undefined&submitAction=ENTER`
        );
        const data = await response.json();
        console.log("data: ", data);

        const restaurantInfo = data?.data?.cards[2]?.card?.card?.info || null;
        const sections =
          data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
          data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
          [];

        setRestaurantData(restaurantInfo);
        setMenuSections(sections);

        // Initialize all sections as closed
        const initialOpenState = {};
        sections.forEach((_, index) => {
          initialOpenState[index] = false;
        });

        setOpenSections(initialOpenState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSubSection = (index) => {
    setOpenSubSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!restaurantData) {
    return (
      <div className="text-center text-lg font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Restaurant Info */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-2xl font-bold">{restaurantData.name}</h2>
        <div className="flex items-center text-gray-600 text-sm space-x-3 mt-2">
          <span className="text-yellow-500 font-semibold">
            ⭐ {restaurantData.avgRatingString}
          </span>
          <span>({restaurantData.totalRatingsString})</span>
          <span>• {restaurantData.costForTwoMessage}</span>
        </div>
        <p className="text-green-600 font-medium mt-1">
          {restaurantData.availability?.opened ? "Shop: Opened" : "Closed"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Cuisines: </span>
          {restaurantData.cuisines?.join(", ")}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Outlet: </span>
          {restaurantData.areaName}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Distance: </span>
          {restaurantData.sla?.lastMileTravelString}
        </p>
        <div className="flex justify-between items-between text-gray-600 mt-2">
          <div>
            <span className="ml-1">
              {restaurantData.sla?.slaString ||
                restaurantData?.sla?.longDistance}
            </span>
          </div>
          <div>
            <span className="ml-1">
              {restaurantData?.sla?.lastMileTravel > 30
                ? "No Service"
                : "Servic-able"}
            </span>
          </div>
        </div>
      </div>

      {/* Loop Through Menu Sections */}
      {menuSections.slice(1).map((section, sectionIndex) => {
        const sectionTitle = section?.card?.card?.title || "Section";
        let items = section?.card?.card?.itemCards || [];
        const categories = section?.card?.card?.categories || [];

        return (
          <div key={sectionIndex} className="mb-4">
            {/* Toggle Button */}
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full text-left bg-gray-100 px-4 py-2 rounded-lg flex justify-between items-center text-lg font-semibold cursor-pointer hover:bg-gray-200"
            >
              {sectionTitle}
              <span>{openSections[sectionIndex] ? "▲" : "▼"}</span>
            </button>

            {/* Show Menu Items when Open */}
            {openSections[sectionIndex] && (
              <div className="bg-gray-100 p-4 rounded-lg mt-2">
                {categories.length > 0
                  ? // Render categories first
                    categories.map((category, catIndex) => {
                      const categoryTitle = category?.title || "Subcategory";
                      const categoryItems = category?.itemCards || [];

                      return (
                        <div key={catIndex} className="mb-3">
                          {/* Subcategory Toggle Button */}
                          <button
                            onClick={() =>
                              toggleSubSection(`${sectionIndex}-${catIndex}`)
                            }
                            className="w-full text-left bg-gray-200 px-3 py-2 rounded-lg flex justify-between items-center text-md font-semibold cursor-pointer hover:bg-gray-300"
                          >
                            {categoryTitle}
                            <span>
                              {openSubSections[`${sectionIndex}-${catIndex}`]
                                ? "▲"
                                : "▼"}
                            </span>
                          </button>

                          {/* Show Subcategory Items when Open */}
                          {openSubSections[`${sectionIndex}-${catIndex}`] && (
                            <div className="bg-white p-3 rounded-lg mt-2">
                              {categoryItems.map((item) => {
                                const itemInfo = item?.card?.info;
                                return (
                                  <ResMenuCategories
                                    key={
                                      item?.card?.info?.id ||
                                      item?.card?.info?.name
                                    }
                                    inPlaceCart={false}
                                    itemInfo={itemInfo}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  : // If no subcategories, show items directly
                    items.map((item) => {
                      const itemInfo = item?.card?.info;
                      return (
                        <ResMenuCategories
                          key={item?.card?.info?.id || item?.card?.info?.name}
                          inPlaceCart={false}
                          itemInfo={itemInfo}
                        />
                      );
                    })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResMenu;
