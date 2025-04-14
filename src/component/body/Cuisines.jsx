import React, { useState } from 'react'

const Cuisines = ( {cuisines} ) => {
    const [getShow, setgetShow] = useState(false);
    const description = cuisines.join(", ");
    const maxLen = 20;

  return (
    <div>
      {description.length <= 20 || getShow ? description + "..." : description.slice(0, maxLen) + "..."};
      <button 
        onClick={() => setgetShow(!getShow)}  
      >
        {getShow ? " show less" : " get More"}
      </button>
    </div>
  )
}

export default Cuisines;
