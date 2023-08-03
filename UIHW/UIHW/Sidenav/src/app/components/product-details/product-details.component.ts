import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Model } from '../Models/Models';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { UtilityServiceService } from 'src/app/services/utility-service.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { NavigationService } from 'src/app/services/navigation.service';
import * as THREE from 'three';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('modelContainer', { static: false })
  modelContainer!: ElementRef<HTMLCanvasElement>;
  @ViewChild('thumbnailCanvas1', { static: false })
  thumbnailCanvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('thumbnailCanvas2', { static: false })
  thumbnailCanvas2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('thumbnailCanvas3', { static: false })
  thumbnailCanvas3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('thumbnailCanvas4', { static: false })
  thumbnailCanvas4!: ElementRef<HTMLCanvasElement>;

  product!: Model;
  imageIndex: number = 1;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  loader!: GLTFLoader;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityServiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getproduct(id).subscribe((res: any) => {
        this.product = res;
        if (this.modelContainer && this.product && this.product.modelAccesoriess && this.product.modelAccesoriess.subCategory) {
          this.loadModel(this.modelContainer.nativeElement);
        }
      });
    });
  }

  ngAfterViewInit(): void {}

  loadModel(container: HTMLCanvasElement): void {
    // Create a WebGLRenderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: container });

    // Create a scene
    this.scene = new THREE.Scene();
 

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(100, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.camera.rotation.y=45/180*Math.PI;
    this.camera.position.y=900;
    this.camera.position.z=1000;
    this.camera.position.x=900;
    this.camera.position.set(4,4,4);

    const ambientLight = new THREE.AmbientLight(0x7c7c7c);
    const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    const light1 = new THREE.PointLight(0x404040,100);
     light.position.set(0,500,-500);
    this.scene.add(light1);

   const light2 = new THREE.PointLight(0x404040,100);
   light2.position.set(0,300,-500);
    this.scene.add(light2);

     const light3 = new THREE.PointLight(0x404040,100);
     light3.position.set(0,300,-500);
     this.scene.add(light3);

     const light4 = new THREE.PointLight(0x404040,10);
     light4.position.set(-500,300,500);
     this.scene.add(light4);
    light.position.set(0.32, 0.39, 0.7);
    this.scene.add(ambientLight);
    this.scene.add(light);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    controls.autoRotate=true;
    controls.enableZoom=true;
    controls.enablePan=true;
    controls.update();


    // Create a GLTFLoader instance
    this.loader = new GLTFLoader();

    // Construct the GLB model URL based on the product information
    const glbUrl = `../../assets/Images/${this.product.modelAccesoriess.subCategory}/${this.product.id}/${this.imageIndex}.glb`;

    // Load the main 3D model
    this.loader.load(glbUrl, (gltf) => {
      const model = gltf.scene;
      this.scene.add(model);

      // Render the scene with the camera
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    });

    // Load and add the thumbnails
    for (let i = 1; i <= 4; i++) {
      const thumbnailUrl = `../../assets/Images/${this.product.modelAccesoriess.subCategory}/${this.product.id}/${i}.glb`;
      const thumbnailTexture = new THREE.TextureLoader().load(thumbnailUrl);
      const thumbnailPlaneGeometry = new THREE.PlaneGeometry(1, 1);
      const thumbnailPlaneMaterial = new THREE.MeshBasicMaterial({ map: thumbnailTexture });
      let thumbnailCanvas: ElementRef<HTMLCanvasElement>| undefined = undefined;
      switch (i) {
        case 1:
          thumbnailCanvas = this.thumbnailCanvas1;
          break;
        case 2:
          thumbnailCanvas = this.thumbnailCanvas2;
          break;
        case 3:
          thumbnailCanvas = this.thumbnailCanvas3;
          break;
        case 4:
          thumbnailCanvas = this.thumbnailCanvas4;
          break;
        default:
          break;
      }
      if (thumbnailCanvas) {
        const thumbnailScene = new THREE.Scene();
        const thumbnailCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        thumbnailCamera.position.z = 10;
        thumbnailCamera.rotation.y=45/180*Math.PI;
        thumbnailCamera.position.y=900;
        thumbnailCamera.position.z=1000;
        thumbnailCamera.position.x=900;
        thumbnailCamera.position.set(4,4,4);
        const thumbnailRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: thumbnailCanvas.nativeElement });
        thumbnailRenderer.setSize(100, 100);
        const ambientLight = new THREE.AmbientLight(0x7c7c7c);
       const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
       light.position.set(0.32, 0.39, 0.7);
       this.scene.add(ambientLight);
       this.scene.add(light);
        const thumbnailPlane = new THREE.Mesh(thumbnailPlaneGeometry, thumbnailPlaneMaterial);
        thumbnailScene.add(thumbnailPlane);
        const animateThumbnail = () => {
          requestAnimationFrame(animateThumbnail);
          thumbnailRenderer.render(thumbnailScene, thumbnailCamera);
        };
        animateThumbnail();
      }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  onThumbnailClick(index: number): void {
    this.imageIndex = index;
    if (this.product && this.product.modelAccesoriess && this.product.modelAccesoriess.subCategory) {
      const glbUrl = `../../assets/Images/${this.product.modelAccesoriess.subCategory}/${this.product.id}/${this.imageIndex}.glb`;
      this.loadModel(this.modelContainer.nativeElement);
    }
  }
}
