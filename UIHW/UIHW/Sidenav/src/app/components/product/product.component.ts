import { Component, Input, OnInit ,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Model } from '../Models/Models';
import { Title } from '@angular/platform-browser';
import { UtilityServiceService } from 'src/app/services/utility-service.service';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,AfterViewInit {
@Input() view: 'grid'| 'list' |'currcartitem'|'prevcartitem' = 'grid'
@Input() product: Model = { 
  id : 0,
  title : '',
  description : '',
  price: 0,
  quantity : 0,
  modelAccesoriess : {
    id : 1,
    category : '',
    subCategory : '',
  },
  imageName: '',
};
  @ViewChild('modelContainer', { static: false })
  modelContainer!: ElementRef;

  constructor( public utilityService: UtilityServiceService)  {}
  ngOnInit() {}
  ngAfterViewInit() {
    if (this.modelContainer) {
      const nativeElement = this.modelContainer.nativeElement;
      this.loadModel(nativeElement);
  }
}
  loadModel(container: HTMLElement): void {
    // Create a WebGLRenderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.rotation.y=45/180*Math.PI;
    camera.position.y=900;
    camera.position.z=1000;
    camera.position.x=900;
   camera.position.set(4,4,4);

    // Create a GLTFLoader instance
    const loader = new GLTFLoader();

    // Construct the GLB model URL based on the product information
    const glbUrl = `../../assets/Images/${this.product.modelAccesoriess.subCategory}/${this.product.id}/1.glb`;

    // Create an ambient light
    const ambientLight = new THREE.AmbientLight(0x7c7c7c);
    const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(0.32, 0.39, 0.7);
    scene.add(ambientLight);
    scene.add(light);


    // Load the GLB model
    loader.load(glbUrl, (gltf) => {
      const model = gltf.scene;
      
      // Add the model to the scene
      scene.add(model);
       


      // Render the scene with the camera
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    });
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }
}




