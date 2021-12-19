import './App.css';
import Navigation  from './components/Navigation/Navigation';
import Logo  from './components/Logo/Logo';
import ImageLinkForm  from './components/imagelinkform/ImageLinkForm';
import Rank  from './components/Rank/Rank';
import SignIn   from './components/SignIn/SignIn';
import Register   from './components/Register/Register';

import Particles from "react-tsparticles";
import {Component} from 'react';
import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//   apiKey: '6db181cd35e74f609d3956b56cb11f6f'
//  });
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


class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log("click");
    
  }

  onRouteChange = (route) => {

    if (route === 'signout') {
      this.setState({isSignedIn:false});
      console.log("b here " , this.state.isSignedIn);

    }
    else if  (route === 'home') {

      this.setState({isSignedIn:true});
      console.log("here " , this.state.isSignedIn);
    }
    this.setState({route:route});
    console.log("onroutechange " , this.state.route);
console.log(route);
  // console.log(this.state.route)
  }

render() {
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
     <Navigation  isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' ? 
      <div>
      <Logo />
       <Rank />
       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
     </div>
     : (this.state.route === 'signin')
      ?
     <SignIn onRouteChange={this.onRouteChange} />
     : 
     <Register onRouteChange={this.onRouteChange} />
    }
  
    </div>
  );
}
}

export default App;
