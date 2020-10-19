import React from 'react';
import './FaceRecognition.css';


function FaceRecognition({imageUrl, boxArray}) {
  return (
  	<div className='center ma' >
  	<div className='absolute mt2'>
	<img id='inputimage' alt='' src={imageUrl} width='300px' height='auto'/>
	{
		boxArray.map((box,i)=> {
			return (				
				<div className='bounding-box' 
				style={{top: box.topRow, right: box.rightCol ,bottom: box.bottomRow, left: box.leftCol}}>{box.values}</div>
  				)
		})
	}
	</div>
    </div>
  )
}

export default FaceRecognition;


// {
// 		robots.map((user,i) => {
// 			return (
// 				<Card key={i} id={robots[i].id} name={robots[i].name} email={robots[i].email}/>
// 				);
// 		})}

// //
//  <div className='absolute mt2'>
//   	    <img id='inputimage' alt='' src={imageUrl} width='300px' height='auto'/>
//   	    <div className='bounding-box' 
//   	    style={{top: box.topRow, right: box.rightCol ,bottom: box.bottomRow, left: box.leftCol}}>{box.values}</div>
//   	    </div>  