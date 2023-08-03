import { Component,  ElementRef, OnInit, ViewChild} from '@angular/core';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit{
  
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  teapot: THREE.Mesh;
  materials: { [key: string]: THREE.Material } = {};
  private effectController: any = {
    newTess: 15,
    bottom: true,
    lid: true,
    body: true,
    fitLid: false,
    nonblinn: false,
    newShading: 'glossy'
  };
  private tess: number = -1;
  private bBottom: boolean;
  private bLid: boolean;
  private bBody: boolean;
  private bFitLid: boolean;
  private bNonBlinn: number;
  private shading: string;
  
  teapotSize: number =300;
  
  constructor() {
    this.camera = new THREE.PerspectiveCamera();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.teapot = new THREE.Mesh();


    // Initialize effectController object with default values
    this.bBottom = true;
    this.bLid = true;
    this.bBody = true;
    this.bFitLid = false;
    this.bNonBlinn = 20;
    this.shading = 'glossy';


// Call render function after initializing effectController
   }

  ngOnInit() {
    this.init();
    this.render();
  }

  init() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 80000);
    this.camera.position.set(-600, 550, 1300);


    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvasWidth, canvasHeight);
    container.appendChild( this.renderer.domElement );


    // CONTROLS
    const cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
     cameraControls.addEventListener('change', () => this.render());

    // SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xAAAAAA);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x7c7c7c);
    const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(0.32, 0.39, 0.7);
    this.scene.add(ambientLight);
    this.scene.add(light);

    // MATERIALS
    const textureMap = new THREE.TextureLoader().load('assets/examples/textures/uv_grid_opengl.jpg');
    textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.colorSpace = THREE.SRGBColorSpace;

    const path = 'assets/examples/textures/cube/pisa/';
    const urls = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];
    const textureCube = new THREE.CubeTextureLoader().setPath(path).load(urls);
    this.materials['wireframe'] = new THREE.MeshBasicMaterial({ wireframe: true });
    this.materials['flat'] = new THREE.MeshPhongMaterial({ specular: 0x000000, flatShading: true, side: THREE.DoubleSide });
    this.materials['smooth'] = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
    this.materials['glossy'] = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    this.materials['textured'] = new THREE.MeshPhongMaterial({ map: textureMap, side: THREE.DoubleSide });
    this.materials['reflective'] = new THREE.MeshPhongMaterial({ envMap: textureCube, side: THREE.DoubleSide });

    // GUI
    this.setupGui();
  }
  onWindowResize() {

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    this.renderer.setSize( canvasWidth, canvasHeight );

    this.camera.aspect = canvasWidth / canvasHeight;
    this.camera.updateProjectionMatrix();

    this.render();

  }

  setupGui() {
    
    const gui = new GUI();
    gui.add(this.effectController, 'newTess', [2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50]).name('Tessellation Level').onChange(this.render.bind(this));
    gui.add(this.effectController, 'lid').name('display lid').onChange(this.render.bind(this));
    gui.add(this.effectController, 'body').name('display body').onChange(this.render.bind(this));
    gui.add(this.effectController, 'bottom').name('display bottom').onChange(this.render.bind(this));
    gui.add(this.effectController, 'fitLid').name('snug lid').onChange(this.render.bind(this));
    gui.add(this.effectController, 'nonblinn').name('original scale').onChange(this.render.bind(this));
    gui.add(this.effectController, 'newShading', ['wireframe', 'flat', 'smooth', 'glossy', 'textured', 'reflective']).name('Shading').onChange(this.render.bind(this));
 }

  render() {  
    // assets/examples/textures/cube/pisa/
    const path = 'assets/examples/textures/cube/pisa/';
    const urls = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];
    const textureCube = new THREE.CubeTextureLoader().setPath(path).load(urls);
  
    if (
      this.effectController.newTess!==this.tess ||
      this.effectController.bottom !==this.bBottom ||
      this.effectController.lid !==this.bLid ||
      this.effectController.body !==this.bBody ||
      this.effectController.fitLid !==this.bFitLid ||
      this.effectController.nonblinn !==this.bNonBlinn ||
      this.effectController.newShading !==this.shading
    ) {
      this.tess = this.effectController.newTess;
      this.bBottom = this.effectController.bottom;
      this.bLid = this.effectController.lid;
      this.bBody = this.effectController.body;
      this.bFitLid = this.effectController.fitLid;
      this.bNonBlinn = this.effectController.nonblinn;
      this.shading = this.effectController.newShading;

      this.createNewTeapot();
    }
    if ( this.shading === 'reflective' ) {

      this.scene.background = textureCube;

    } else {

      this.scene.background = null;

    }

    this.renderer.render(this.scene, this.camera);
  }

  createNewTeapot() {
    if (this.teapot !== undefined) {
      this.teapot.geometry.dispose();
      this.scene.remove(this.teapot);
    }

    const geometry = new TeapotGeometry(
      this.teapotSize,
      this.tess,
      this.bBottom,
      this.bLid,
      this.bBody,
      this.bFitLid,
      
    );

    this.teapot = new THREE.Mesh(geometry, this.materials[this.shading]);
    this.scene.add(this.teapot);
  }
}



