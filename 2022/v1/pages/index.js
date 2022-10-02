import * as THREE from "three";
import { Component } from "react";
import EditorCamera from "../utils/camera"
import useCsv from "./../hooks/csv";

import Navbar from "../components/nav/Navbar";
import Sidebar from "../components/nav/Sidebar";
import SplashScreen from "../components/nav/SplashScreen";

let renderer, scene, camera, editorCamera;
let xMoon, xSkybox;
let xStation = [];
let xShallow = [];
let xDeep = [];
let xNatural = [];

// Sets up the lighting
const _createLighting = function () {

  // Sets up the lighting
  let light = new THREE.DirectionalLight ( new THREE.Color ( 0xffffff ), 0.1 );
  light.position.set ( 500, 0, 0 );
  scene.add ( light );

  light = new THREE.DirectionalLight ( new THREE.Color ( 0xffffff ), 0.1 );
  light.position.set ( -500, 0, 0 );
  scene.add ( light );

  // Sets up ambient light
  light = new THREE.AmbientLight ( 0xffffff );
  scene.add ( light );
}

// Creates a moon
const _createMoon = function ( radius, resolution ) {
  return new Promise ( ( resolve, _ ) => {

    // Creates geometry
    let geometry = new THREE.SphereGeometry ( radius, 64, 64 );

    // Loads the material
    _createMaterial ( resolution )
      .then ( material => {

        // Adds the mesh to the scene
        xMoon = new THREE.Mesh ( geometry, material );
        scene.add ( xMoon );

        resolve ( xMoon );
      });
  });
}

const _createSkybox = function ( resolution ) {

  // Creates geometry
  let geometry = new THREE.SphereGeometry ( 5000, 64, 64 );

  // Loads the material
  _createSkyboxMaterial ( resolution )
    .then ( material => {

      // Adds the mesh to the scene
      xSkybox = new THREE.Mesh ( geometry, material );
      scene.add ( xSkybox );
    });
}

// Creates the moon's material
const _createSkyboxMaterial = function ( resolution ) {
  return new Promise ( ( resolve, _ ) => {

    // Creates material
    const textureLoader = new THREE.TextureLoader ();
    textureLoader.load ( `resources/skybox/${ resolution }.jpg`, skyboxTexture => {

      // Render the texture as an equirectangular image
      skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;

      // Creates the material
      let material = new THREE.MeshPhongMaterial ({
        map: skyboxTexture,
        side: THREE.BackSide
      });

      resolve ( material );

    }, undefined, () => alert ( "Failed to load textures!" ) );

  }); 
}

const _addResizeListener = function () {
  window.addEventListener ( 'resize', function () {
    renderer.setSize ( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix ();
  });
}

const _positionOnSphere = function ( latitude, longitude, mesh ) {
  xMoon.geometry.computeBoundingSphere();
  var radius = xMoon.geometry.boundingSphere.radius;
  var v1 = new THREE.Vector3 ( 0, radius, 0 );
  var x = Math.PI * latitude;
  var z = Math.PI * 2 * longitude;
  var e1 = new THREE.Euler ( x, 0, z ); 
  mesh.position.copy ( xMoon.position ).add ( v1 ).applyEuler ( e1 ); 
}

// Creates the moon's material
const _createMaterial = function ( resolution ) {
  return new Promise ( ( resolve, _ ) => {

    // Creates material
    const textureLoader = new THREE.TextureLoader ();
    textureLoader.load ( `resources/moon/texture/${ resolution }.jpg`, moonTexture => {

      // Loads the displacement map
      textureLoader.load ( `resources/moon/bump/${ resolution }.jpg`, displacementTexture => {

        // Render the texture as an equirectangular image
        moonTexture.mapping = THREE.EquirectangularReflectionMapping;

        // Creates the material
        let material = new THREE.MeshPhongMaterial ({
          map: moonTexture,
          bumpMap: displacementTexture
        });

        resolve ( material );

      }, undefined, () => alert ( "Failed to load displacement textures!" ) ); 
    }, undefined, () => alert ( "Failed to load textures!" ) );

  }); 
}

// Creates the renderer
const _createRenderer = function () {

  // Creates a WebGL renderer
  let canvas =  document.getElementById ( "renderer" );
  let renderer = new THREE.WebGLRenderer ({ 
    antialias: true,
    canvas: canvas
  });
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.setClearColor ( 0x000000, 1 );
  renderer.setSize ( window.innerWidth, window.innerHeight - 80 );
  return renderer;
}

const fetchStationLocations = function () {
  return new Promise ( ( resolve, _reject ) => {
    window.fetch ( "http://service.iris.edu/irisws/fedcatalog/1/query?net=XA&starttime=1969-01-01&endtime=1977-12-31&format=text&includeoverlaps=true&nodata=404" )
      .then ( response => response.text () )
      .then ( response => resolve ( parseRawStationLocations ( response ) ) );
  });
}

const parseRawStationLocations = function ( raw ) {
  let rawLines = raw.split ( "\n" );
  rawLines.splice ( 0, 3 );

  let locations = []
  rawLines.forEach ( line => locations.push ( parseRawLocation ( line ) ) );

  return locations;
}

const parseRawLocation = function ( raw ) {

    if ( raw.length <= 0 ) 
        return null;

    let split = raw.split ( "|" );
    
    // Checks for excess params
    let x = 0;
    if ( split.length > 17 )
        x = split.length - 17;

    return{
        network: split[x + 0],
        stationName: split[x + 1],
        location: split[x + 2],
        channel: split[x + 3],
        lat: split[x + 4],
        long: split[x + 5],
        elevation: split[x + 6],
        depth: split[x + 7],
        azimut: split[x + 8],
        dip: split[x + 9],
        description: split[x + 10],
        scale: split[x + 11],
        freq: split[x + 12],
        units: split[x + 13],
        rate: split[x + 14],
        start: split[x + 15],
        end: split[x + 16],
    }
}

// Fetches the moonquake event data
const _fetchMoonquakeEvents = function () {
  useCsv ().processCsv ( "https://seismoon.vercel.app/resources/gagnepian_2006_catalog.csv" )
    .then ( result => {

      // Fetches station locations
      let eventGeometry = new THREE.SphereGeometry ( 0.07, 16, 16 );
      result.data.forEach ( event => {

        let color = 0x000000;

        if ( event.Type === "M" )
          color += 0xff0000;
        else if ( event.Type === "SH" )
          color += 0x00ff00;
        else if ( event.Type[0] === "A" )
          color += 0x00ffff;
        else if ( event.Type[0] === "1" ) 
          return;

        let eventColor = new THREE.Color ( color );
        let eventMaterial = new THREE.MeshBasicMaterial ({ color: new THREE.Color ( 
          eventColor
        ) });

        let pointer = new THREE.Mesh ( eventGeometry, eventMaterial );
        _positionOnSphere ( event.Lat, event.Long, pointer );
        scene.add ( pointer );

        if ( event.Type === "M" )
          xNatural.push ( pointer );
        else if ( event.Type === "SH" )
          xShallow.push ( pointer );
        else if ( event.Type[0] === "A" )
          xDeep.push ( pointer );
      });
    });
}

const _initScene = resolution => {
  _addResizeListener ();
  _createLighting ();
  _createSkybox ( resolution );
  _createMoon ( 5, resolution )
    .then ( moon => {

      // Fetches station locations
      let stationGeometry = new THREE.SphereGeometry ( 0.07, 16, 16 );
      let stationMaterial = new THREE.MeshBasicMaterial ({ color: new THREE.Color ( 0x0000ff ) });
      fetchStationLocations ()
        .then ( locations => {
          locations.forEach ( location => {

            if ( location === null )
              return;

            // Creates new sphere
            let pointer = new THREE.Mesh ( stationGeometry, stationMaterial );
            _positionOnSphere ( location.lat, location.long, pointer );
            scene.add ( pointer );
            xStation.push ( pointer );
          });
        });

      _fetchMoonquakeEvents ();
      
    })
}

class Home extends Component {

  constructor () {
    super ();

    this.state = {
      sidebarVisible: false,
      resolution: "2048x1024"
    }
  }

  componentDidMount () {

    renderer = _createRenderer ();
    scene = new THREE.Scene ();
    camera = new THREE.PerspectiveCamera ( 45, renderer.getContext ().drawingBufferWidth / renderer.getContext ().drawingBufferHeight, 0.1, 10_000 );
    editorCamera = new EditorCamera ( camera, document, 15, new THREE.Vector2 ( -Math.PI * ( 2 / 4 ), -Math.PI * ( 1 / 4 ) ) );

    _initScene ( "2048x1024" );

    const _render = function () {
      requestAnimationFrame ( _render );
      renderer.render ( scene, camera );
    }

    _render ();

  }

  toggleSidebar = () => {
    this.setState ({ 
      sidebarVisible: !this.state.sidebarVisible,
      resolution: this.state.resolution
    });
  }

  togglePointerArray = ( array, visible ) => {
    if ( !visible ) 
      array.forEach ( pointer => scene.remove ( pointer ) );
    else 
      array.forEach ( pointer => scene.add ( pointer ) );
  };


  onResolutionChange = resolution => {

    // Loads the material
    _createMaterial ( resolution )
      .then ( material => {

        // Adds the material to the moon
        xMoon.material = material;
      });

    // Loads the skybox
    _createSkyboxMaterial ( resolution )
      .then ( material => {
        
        // Adds the material to the skybox
        xSkybox.material = material;
      })
  }

  render () {
    return (
      <>
        <SplashScreen />
        <Sidebar 
          visible={ this.state.sidebarVisible } 
          toggleSidebar={ this.toggleSidebar } 
          onResolutionChange={ this.onResolutionChange } 
          toggleDeepMoonQuakes={ ( vis ) => this.togglePointerArray ( xDeep, vis ) }
          toggleShallowMoonQuakes={ ( vis ) => this.togglePointerArray ( xShallow, vis ) }
          toggleNaturalImpacts={ ( vis ) => this.togglePointerArray ( xNatural, vis ) }
          toggleStations={ ( vis ) => this.togglePointerArray ( xStation, vis ) } />
        <Navbar onClick={ this.toggleSidebar } />
        <div className="w-screen h-screen flex justify-evenly">
          <canvas className="touch-none w-5/6 h-screen ml-auto" data-engine="three.js r145" id="renderer" />
        </div>  
      </>
    )
  }

}

export default Home;