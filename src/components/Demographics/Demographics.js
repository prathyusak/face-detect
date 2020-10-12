import React from 'react';

function Demographics({values}) {
  return (
  	   <div> Demographic information 
  	    <ul>
  	    {values.map(item => {
  	    	return <li>{item.name}</li>;
  	    })}
  	    </ul>
  	    </div>
   
  )
}

export default Demographics;
