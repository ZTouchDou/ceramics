import React from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import './index.css';
import MenuButton from "../../components/MenuButton";
import TC from '../../JSON/TC/TC.json';
import * as THREE from 'three'
import Orbitcontrols from 'three-orbitcontrols'
import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader'
import 'three/examples/js/libs/inflate.min.js'

//陶瓷页
class CeramicsShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      bgimg:'',
      timer:'',
      dataItem:{},
      scene:'',
      obj:'',
      mtlurl:'',
      objurl:'',
      imgurl:'',
      numberOfObjects:'',
    }
  }

  init=(objurl,mtlurl,textureurl)=> {
    let manager = new THREE.LoadingManager();
    let texture = new THREE.Texture();
    let loader = new THREE.ImageLoader(manager);
    loader.load(textureurl, function (image) {
      texture.image = image;
      texture.needsUpdate = true;
    })
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
        object.position.y = 0;
        object.rotation.x = 0;
        object.rotation.y = 0;
        object.rotation.z = 0;
        object.name = objurl;
        this.state.scene.add(object);
        this.numberOfObjects = this.state.scene.children.length;
        console.log("objectnumber:", this.state.scene.children);
        if(this.state.scene.children.length>4){
          let allchilden=this.state.scene.children;
          let lastObject = allchilden[allchilden.length - 2];
          this.state.scene.remove(lastObject);
          console.log("lastObject:",lastObject);
        }
        object.needsUpdate = true;
      });
    });
    this.setState({
      obj,
    });
  }
  //跳转页面
  gotoTab2 = (name,dataItem)=>{
    console.log("dataItem:", dataItem);
    sessionStorage.setItem('dataItem',JSON.stringify(dataItem));
    this.props.history.push('/CeramicsShow/details',{name:name});
  };

  componentDidMount() {
    let t = this;
    new Swiper('.swiper-container',{
      autoplay:false,
      loop:false,
      direction: 'vertical',//竖向轮播
      effect : 'coverflow',//设置切换效果
      slidesPerView: 3,
      centeredSlides: true,
      offsetSlidesBefore:2,
      on:{
        transitionEnd:t.onChange,
      }
    });
    t.initThree();

  }
  componentWillUnmount() {
    let {timer} = this.state;
    if(timer){
      clearTimeout(timer)
    }

  }

  initThree() {
    let camera, scene, renderer, group;
    let c=document.getElementById('3d-output');
    let width = 200, height = 300;
    //创建场景
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);
    //  scene.background = new THREE.Color(255,255,255);
    //scene.add(new THREE.GridHelper(400, 10)); //网格辅助
    //创建透视相机
    camera = new THREE.PerspectiveCamera(60,  width/height, 1, 1500);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 380;
    camera.lookAt(scene.position);
    //控制相机
    //光源
    let ambi = new THREE.AmbientLight(0x686868);
    scene.add(ambi);
    let spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(100, 100, 100);
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
  onChange = ()=>{
    let bgimg = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-bgimg');
    let name = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-name');
    let dataItem = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-item');
    document.getElementById('bgimage').setAttribute('class','bgimgchange');
    console.log("dataItem:", JSON.parse(dataItem));
    let mtlurl = JSON.parse(dataItem).mtlUrl;
    let objurl = JSON.parse(dataItem).objUrl;
    let textureurl=JSON.parse(dataItem).textureUrl;
    let timer = setTimeout(function (){
      document.getElementById('bgimage').setAttribute('class','bgimg');
    },10);
    this.setState({
      bgimg,
      timer,
      name,
      mtlurl,
      objurl,
      textureurl,
      dataItem:JSON.parse(dataItem),
    });
    this.init(objurl,mtlurl,textureurl);

  };

  render(){
    let {name,details,bgimg,dataItem,mtlurl,objurl} = this.state;
    return (
      <div className='box'>
        <div    id='bgimage' className='bgimg' style={{backgroundImage:`url(${bgimg?require("../../JSON/TC/Images/"+bgimg):''})`}}>
        </div>
        <MenuButton/>
        <div onClick={this.gotoTab2.bind(this,name,dataItem)} className='box-left'>
          <div id='3d-output' style={{position:'relative',backgroundColor:'transparent'}}>
          </div>
        </div>
        <div className='box-right'>
          <div className='swiper-container'>
            <div className='swiper-wrapper'>
              {
                TC.map((item,index)=>{
                  return(
                    <div className='swiper-slide'
                         key={index}
                         data-bgimg={item.imgUrl}
                         data-name={item.title}
                         data-item={JSON.stringify(item)}
                    >
                      <div className='swiperTitle'>{item.title}</div>

                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CeramicsShow;