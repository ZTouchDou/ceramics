import React from 'react';
import { Carousel } from 'antd';
import './index.css';
import config from '../../../config.js';
import GoBackButton from '../../../components/GoBackButton';
import * as THREE from 'three'
import Orbitcontrols from 'three-orbitcontrols'
import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader'
import 'three/examples/js/libs/inflate.min.js'

const fontName = config.fontName;

const font = {
  fontFamily:fontName
};

class details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem:{},
      arrStr:[]
    };
  }

  //取得父级传过来的数据
  componentDidMount() {
    let {arrStr} = this.state;
    let dataItem = JSON.parse(sessionStorage.getItem('dataItem'));
    let str = dataItem.content;//字符串
    let f = 70;//每一页是字数
    for(let i=0;i<str.length;i+=f){
      arrStr.push(str.slice(i,i+f));
    }
     console.log("dataItem.content:", dataItem.content);
    this.setState({
      dataItem,
      arrStr
    });
    console.log("dataitem-url:",dataItem.objUrl,dataItem.mtlUrl,dataItem.textureUrl);
    this.init(dataItem.objUrl,dataItem.mtlUrl,dataItem.textureUrl);
    this.initThree();
  }
  initThree() {
    let camera, scene, renderer, group;
    let c=document.getElementById('3d-output');
    let width = 200, height = 350;
    //创建场景
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);
    //创建透视相机
    camera = new THREE.PerspectiveCamera(60,  width/height, 1, 1500);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 450;
    camera.lookAt(scene.position);
    //控制相机
    //光源
    let ambi = new THREE.AmbientLight(0x686868);
    scene.add(ambi);
    let spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(550, 100, 550);
    spotLight.intensity = 0.6;
    scene.add(spotLight);
    //实例化渲染器
    renderer = new THREE.WebGLRenderer({antialias:true,alpha: true});
    renderer.setClearColor(0xffffff);
    renderer.setClearAlpha(0x000000, 0 );
    renderer.setPixelRatio(window.devicePixelRatio);
    //  camera.updateProjectionMatrix();
    renderer.setSize( width, height);
    renderer.autoClear = true;
    c.appendChild(renderer.domElement);
    let orbitControls = new Orbitcontrols(camera,renderer.domElement);
    animate();
    function animate() {
      //每一帧渲染一次画面,不然画面是静止的
      render();
      requestAnimationFrame(animate);
    }
    function render() {
      renderer.render(scene, camera);
    }
    this.setState({
      scene,
    });
  }
  init=(objurl,mtlurl,textureurl)=>{
    let manager = new THREE.LoadingManager();
    let texture = new THREE.Texture();
    let loader = new THREE.ImageLoader(manager);
    loader.load(textureurl, function (image) {
      texture.image = image;
      texture.needsUpdate = true;
    });
    let mtl = new MTLLoader();
    let obj = new OBJLoader(manager);
    mtl.load(mtlurl, (materials) => {
      materials.preload();
      obj.setMaterials(materials);
      obj.load(objurl, (object) => {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.map = texture;
          }
        });
        object.name = objurl;
      //   object.scale.set(1.5,1.5, 1.5);
        this.state.scene.add(object);
        object.needsUpdate = true;
      });
    });
  };
  gotoBack=()=>{
    this.props.history.push('/CeramicsShow');
  };

  render() {
    // 引入arrStr，你也可以下面直接this.state.arrStr，效果一样的
    let {arrStr,dataItem} = this.state;
    return (
      <div className='details-bg'>
        <GoBackButton
          color='black'
          gotoBack={this.gotoBack}
        />
        <div className='details-top'>
          <Carousel
            className='ant-carousel-details'
            ref={el => (this.slider = el)}
            autoplay={false}
            dots={false}
            lazyLoad={true}
            effect="fade"
          >
            {
              arrStr.map((item,index)=>{
                return(
                  <div className='details-content' key={index} style={{...font}}>
                    {item}
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className='details-module'>
          <div id='3d-output' style={{position:'relative',backgroundColor:'transparent'}}>
          </div>
          </div>
        </div>

    );
  }
}
export default details;