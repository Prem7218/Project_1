import React, { useEffect, useState } from "react";
import { IMG_PATH, MOCK_DATA } from "../../utils/mockData";
import Shimmer from "./Shimmer";
import Cuisines from "./Cuisines";
import ResDataCard from "./Restaurant/ResDataCard";
import { Link } from "react-router-dom";

const Body = () => {
  const [MainData, setMainData] = useState([]);
  const [demoData, setDaemoData] = useState(MainData);
  const [loading, setLoading] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sideBarOpenCheck, setSideBarOpenCheck] = useState(false);
  const [locationText, setLocationText] = useState("");
  const [placeId, setPlaceId] = useState([]);
  const [nearLocation, setNearLocation] = useState([]);
  const [latLan, setLatLan] = useState({ lat: "18.52110", lng: "73.85020" });

  // const fetchData = async (placeId) => {
  //   try {
  //     data = await fetch(
  //       `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`
  //     );
  //     const resp1 = await data.json();

  //     const locations = resp1.data[0].geometry.location;
  //     setLatLan(locations);
  //     setSideBarOpenCheck(false);
  //   } catch (e) {
  //     console.log("Error: ", e);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let data = await fetch(
  //         `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationText}&types=`
  //       );
  //       const resp = await data.json();
  //       setNearLocation(resp.data.map((loc) => loc.description));
  //       setPlaceId(resp.data.map((plcId) => plcId.place_id));
  //     } catch (e) {
  //       console.log("Error: ", e);
  //     }
  //   };

  //   fetchData();
  // }, [locationText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latLan.lat}&lng=${latLan.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        );
        const resp = await data.json();
        const datas =
          resp?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        setMainData(datas);
        setDaemoData(datas);
      } catch (e) {
        console.log("Error: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latLan.lat, latLan.lng]);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setSideBarOpenCheck(!sideBarOpenCheck)}
            className="bg-blue-500 p-3 rounded-md"
          >
            Location Hub
          </button>

          {sideBarOpenCheck && (
            <div className="fixed top-0 left-0 bg-white w-[400px] h-full shadow-lg p-4">
              {/* Sidebar Header */}
              <header className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-semibold">Location Hub</h2>
                <button
                  onClick={() => setSideBarOpenCheck(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  ✕ Close
                </button>
              </header>

              {/* Location Input */}
              <div className="mt-4">
                <label
                  htmlFor="locationInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Location:
                </label>
                <input
                  id="locationInput"
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type a location..."
                />
              </div>

              {/* Nearby Locations */}
              {nearLocation.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Nearby Locations:
                  </h3>
                  <div className="space-y-2">
                    {nearLocation.map((loc, index) => (
                      <button
                        key={index}
                        onClick={() => fetchData(placeId[index])}
                        className="block w-full text-left p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            data-testid={"SearchId"}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-blue-200 p-3 rounded-lg w-[60%]"
            type="text"
            placeholder="search restaurants..."
          />

          <button
            className="bg-blue-500 p-3 rounded-md"
            onClick={() => {
              const filterData = demoData.filter((items) => {
                return items?.info?.name?.includes(searchText);
              });
              setDaemoData(filterData);
            }}
          >
            Search
          </button>
        </div>

        <div className="flex justify-center items-center gap-5 mt-5">
          <button
            className="bg-blue-500 p-2 rounded-md"
            onClick={() => {
              const filterdata = demoData.filter(
                (data) => data.info.sla.deliveryTime <= 25
              );
              setDaemoData(filterdata);
            }}
          >
            Speed Delivery
          </button>

          <button
            className="bg-blue-500 p-2 rounded-md"
            onClick={() => setDaemoData(MainData)}
          >
            View All
          </button>

          <button
            className="bg-blue-500 p-2 rounded-md"
            onClick={() => {
              const filterdata = demoData.filter(
                (data) => data.info.avgRating >= 4.5
              );
              setDaemoData(filterdata);
            }}
          >
            Rating's
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {demoData && !loading ? (
          demoData.map((items, index) => {
            const { cloudinaryImageId, name, cuisines, avgRating, id } =
              items.info;
            const { deliveryTime } = items.info.sla;

            return (
              <Link to={`/res-menu/${id}`} key={`link-${index}-${id}`}>
                <ResDataCard
                  cloudinaryImageId={cloudinaryImageId}
                  IMG_PATH={IMG_PATH}
                  name={name}
                  cuisines={cuisines}
                  avgRating={avgRating}
                  deliveryTime={deliveryTime}
                />
              </Link>
            );
          })
        ) : (
          <Shimmer cardsNo={8} />
        )}
      </div>
    </div>
  );
};

export default Body;
