import React from 'react';
import './ImageLinkForm.css'

function ImageLinkForm( {onInput , onButtonSubmit}) {
  return (
  	<div >
       <p className='f4'>
         {'This Magic Brain will detect faces in your images.Give it a try!!'}
       </p>	
       <div className='center'>
	       <div className='form center pa4 br3 shadow-5'>
	       	  <input className='w-70 pa2 f5 center' type='text' onChange={onInput}/>
	       	  <button className='w-30 grow link f5 pv2 ph3 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button> 
	       </div>
       </div>
    </div>
  )
}

export default ImageLinkForm;
