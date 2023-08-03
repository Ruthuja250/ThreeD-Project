import { Component,  ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import{TeapotGeometry} from 'three/examples/jsm/geometries/TeapotGeometry';
import { Material } from 'three';
import { SuggestedProduct } from '../Models/Models';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  suggestedProducts : SuggestedProduct[] = [
    {
  banerimage : 'Baner/Accessories.jpg',
  category:{
    id:1,
    category:'teapot',
    subCategory:'Body',

  },
},
{
  banerimage : 'Baner/Accessories.jpg',
  category:{
    id:2,
    category:'teapot',
    subCategory:'upperlid',
    
  },
},

  ];
 constructor(){}
  
  ngOnInit(): void {
    
  }

  
  
}