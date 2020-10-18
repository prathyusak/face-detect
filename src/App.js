import React ,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Demographics from './components/Demographics/Demographics'
import Particles from 'react-particles-js';

const particleOptions = {
 particles: {
    number: {
      value:100,
      density: {
        enable: true,
        value_area: 1000
      }
   }
  }
}

const intialState = {
      input:'',
      imageUrl:'',
      box:{},
      values:[],
      route:'signin',
      isSignedIn:false,
      selectedFile: null,
      user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state= intialState

  };

loadUser = (data) => {
  this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined    
  }})
}


  componentDidMount() {
    this.onButtonSubmit()
  }

calculateFaceLocation = (data) => {
  //console.log(data.rawData.outputs[0].data.regions[0].data.concepts)
  const concepts = data.rawData.outputs[0].data.regions[0].data.concepts
  const values = concepts.filter(num => num.value > 0.5)
  this.setState({values:values});
  console.log(values)
  console.log(this.state.values)
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    leftCol: clarifaiFace.left_col*width,
    rightCol:width-(clarifaiFace.right_col*width),
    topRow:clarifaiFace.top_row*height,
    bottomRow: height -(clarifaiFace.bottom_row*height) 
  }
};

displayFaceBox = (box) => {
  //console.log(box)
  this.setState({box:box});
  };
onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(intialState)
  } else if (route === 'home') {
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
};

onInputChange = (event) => {
  this.setState({values:[],box:{}})
  this.setState({input:event.target.value})
};
  
onUploadImage = (event) => {
  this.setState({values:[],box:{}})
  this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
      const reader = new FileReader();
    const url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = function (e) {
      this.setState({
          imageUrl: [reader.result]
      })
    }.bind(this);
  console.log(url) // Would see a path?
  // TODO: concat files
};

onButtonSubmit = () => {

  if (this.state.input) {
    this.setState({imageUrl:this.state.input})
    fetch('https://secret-tundra-90598.herokuapp.com/imageurl',{method:'post',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({input:this.state.input})})
      .then(response => response.json()).then( response =>{
      if (response) {
        fetch('https://secret-tundra-90598.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
                              id:this.state.user.id
                              })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response)) 
    })
    .catch(err =>console.log(err))

  } else {
    const file = this.state.selectedFile
    const formData = new FormData()
    formData.append('myFile',file)


    //this.setState({imageUrl: URL.createObjectURL(this.state.selectedFile)})
    fetch('https://secret-tundra-90598.herokuapp.com/saveImage', {method: 'POST',body: formData})
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://secret-tundra-90598.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
                              id:this.state.user.id
                              })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response)) 
    })
    .catch(err =>console.log(err))
    }
  
};

  render() {
    return(
      <div className="App">
        <Particles className='particle' params={particleOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
          ?<div>
              <Logo />
              <Rank  name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInput={this.onInputChange} onUpload={this.onUploadImage} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box}  imageUrl={this.state.imageUrl}/>
              <Demographics values={this.state.values} />
            </div>
          :(this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
