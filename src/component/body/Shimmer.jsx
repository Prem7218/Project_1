// Shimmer.js
import React from "react";

const Shimmer = ({cardsNo}) => {
    let cards = [];

    // Create 12 shimmer cards
    for (let i = 0; i <= cardsNo; i++) {
        cards.push(
            <div 
                key={i} 
                className="bg-white shadow-lg rounded-lg overflow-hidden w-60 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500 h-[300px]"
            >
                {/* Placeholder for Restaurant Image */}
                <div className="overflow-hidden">
                    <div className="shimmer-image h-48 bg-gray-300 animate-pulse rounded-lg mb-4"></div> {/* Increased height for image */}
                </div>
                
                {/* Placeholder for Restaurant Title */}
                <div className="p-4 text-center font-bold text-gray-800 text-lg transition duration-300">
                    <div className="shimmer-text bg-gray-300 h-6 rounded mb-3 animate-pulse w-3/4 mx-auto"></div> {/* Increased margin */}
                </div>

                {/* Placeholder for Restaurant Description */}
                <div className="px-4 py-2 text-gray-600 text-sm">
                    <div className="shimmer-text bg-gray-300 h-4 rounded mb-3 animate-pulse w-2/4 mx-auto"></div> {/* Increased margin */}
                </div>

                {/* Placeholder for Ratings and Time Info */}
                <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600 font-medium">
                    <div className="shimmer-text bg-gray-300 h-4 rounded animate-pulse w-1/4"></div>
                    <div className="shimmer-text bg-gray-300 h-4 rounded animate-pulse w-1/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="shimmer-wrapper mt-8 grid grid-cols-5 gap-x-36 gap-y-10 justify-items-center items-center mx-20">
            {cards}
        </div>
    );
};

export default Shimmer;
