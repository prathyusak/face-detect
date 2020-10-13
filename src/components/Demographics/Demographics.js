import React from 'react';
import './Demographics.css';

function Demographics({values}) {
  return (
  	   <div className='labeling'> 
  	    <ul className='listing'>
  	    {values.map(item => {
  	    	return <li className='white f4'>{item.name}</li>;
  	    })}
  	    </ul>
  	    </div>
   
  )
}

export default Demographics;
