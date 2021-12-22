import './App.css';
import Navigation  from './components/Navigation/Navigation';
import Logo  from './components/Logo/Logo';
import ImageLinkForm  from './components/imagelinkform/ImageLinkForm';
import Rank  from './components/Rank/Rank';
import SignIn   from './components/SignIn/SignIn';
import Register   from './components/Register/Register';
import FaceRecognition   from './components/FaceRecognition/FaceRecognition';

import Particles from "react-tsparticles";
import {Component} from 'react';

 const particlesOptions = {
  number:2000,
  fps_limit: 60,
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: true, mode: "push" },
      onhover: {
        enable: true,
        mode: "attract",
        parallax: { enable: false, force: 60, smooth: 10 }
      },
      resize: true
    },
    modes: {
      push: { quantity: 4 },
      attract: { distance: 200, duration: 0.4, factor: 5 }
    }
  },
  particles: {
    color: { value: "#ffffff" },
    line_linked: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 2,
      straight: false
    },
    number: { density: { enable: true, value_area: 800 }, value: 80 },
    opacity: {
      anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
      random: false,
      value: 0.5
    },
    shape: {
      character: {
        fill: false,
        font: "Verdana",
        style: "",
        value: "*",
        weight: "400"
      },
      image: {
        height: 100,
        replace_color: true,
        src: "images/github.svg",
        width: 100
      },
      polygon: { nb_sides: 5 },
      stroke: { color: "#000000", width: 0 },
      type: "circle"
    },
    size: {
      anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
      random: true,
      value: 5
    }
  },
  polygon: {
    draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
    move: { radius: 10 },
    scale: 1,
    type: "none",
    url: ""
  },
  retina_detect: true
}

const initialState = {
  input: '',
  imageUrl: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email:'',
        entries: 0,
        joined: ''
      }
}
class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState( {user:{
      id: data.id,
      name: data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://secret-savannah-70067.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://secret-savannah-70067.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
 
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
 
  onRouteChange = (route) => {

    if (route === 'signout') {
      this.setState(initialState);
    }
    else if  (route === 'home') {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

render() {
  const {isSignedIn, route,user, imageUrl} = this.state;
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  

  return (

    <div className="App">
       <Particles className="particles" params={particlesOptions}/>
     <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { route === 'home' ? 
      <div>
      <Logo />
       <Rank entries={user.entries} name={user.name} />
       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      if (this.state.box) {
        <FaceRecognition box={this.state.box} imageUrl={imageUrl} />
      }
     </div>
     : (route === 'signin')
      ?
     <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
     : 
     <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
    }
  
    </div>
  );
}
}

export default App;
