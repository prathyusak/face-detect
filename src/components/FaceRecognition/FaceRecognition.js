import React from 'react';
import './FaceRecognition.css'


function FaceRecognition({imageUrl, box, values}) {
  return (
  	<div className='center ma' >
  	  <div className='absolute mt2'>
  	    <img id='inputimage' alt='' src={imageUrl} width='300px' height='auto'/>
  	    <div className='bounding-box' style={{top: box.topRow, right: box.rightCol ,bottom: box.bottomRow, left: box.leftCol}}></div>
  	    </div>
  	   <div className='center ma'> Demographic information 
  	    <ul>
  	    {values.map(item => {
  	    	return <li>{item.name}</li>;
  	    })}
  	    </ul>
  	    </div>
   
    </div>
  )
}

export default FaceRecognition;
