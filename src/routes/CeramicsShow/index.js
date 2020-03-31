import React from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import './index.css';
import MenuButton from "../../components/MenuButton";
import TC from '../../JSON/TC/TC.json';
import * as THREE from 'three'
import Orbitcontrols from 'three-orbitcontrols'
import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader'
//import {FBXLoader} from 'three-fbx-loader'
//import {FBXLoader} from  'three/examples/js/loaders/FBXLoader.js'
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
      mtlurl:'',
      objurl:'',
      }
  }
  /*
  init=()=>{
    //加载fbx文件
       let fbx=new FBXLoader();
       fbx.load('../../models/test1.FBX',(object)=>{
     // object.scale.set(0.5,0.5,0.5);
     // object.position.set(0,0,0);
      this.scene.add(object);
      })
    }

   */

  init=(objurl,mtlurl)=>{
    //加载mtl obj文件
    let mtl = new MTLLoader();
    let obj=new OBJLoader();
   // mtl.setPath('../../models/');
    mtl.load(mtlurl,(materials)=> {
      materials.preload();
    //  console.log("mtlobject:", mtlurl);
      obj.setMaterials(materials);
    //  obj.setPath('../../models/');
      obj.load(objurl,(object) =>{
        object.position.y = 0;
        object.rotation.x = 0;
        object.rotation.y = 0;
        object.rotation.z = 0;
        object.name=objurl;
        //自行调整模型比例
       // object.scale.set(7,7, 7);
        this.state.scene.add(object);
        console.log("object:", object);
      });
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
    let width = c.clientWidth/2, height = c.clientHeight/2;
    //创建场景
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);
    scene.background = new THREE.Color("rgb(255,255,255)");
    scene.add(new THREE.GridHelper(400, 10)); //网格辅助
    //创建透视相机
    camera = new THREE.PerspectiveCamera(60,  window.innerWidth/window.innerHeight, 1, 2000);
    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 350;
    camera.lookAt(scene.position);
    //控制相机
    let orbitControls = new Orbitcontrols(camera);
    //光源
    let ambi = new THREE.AmbientLight(0x686868);
    scene.add(ambi);
    let spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(550, 100, 550);
    spotLight.intensity = 0.6;
    scene.add(spotLight);
    //实例化渲染器
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0xffffff);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth/2, window.innerHeight/2);

    c.appendChild(renderer.domElement);
  //  c.scissor(0,0,width,height);
    animate();
    function animate() {
      //每一帧渲染一次画面,不然画面是静止的
      requestAnimationFrame(animate);
      render();
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
    console.log(":", JSON.parse(dataItem));
    let mtlurl = JSON.parse(dataItem).mtlUrl;
    let objurl = JSON.parse(dataItem).objUrl;
    let timer = setTimeout(function (){
      document.getElementById('bgimage').setAttribute('class','bgimg');
    },10);
    this.setState({
      bgimg,
      timer,
      name,
      mtlurl,
      objurl,
      dataItem:JSON.parse(dataItem),
    });
    this.init(objurl,mtlurl);

  };

  render(){
    let {name,details,bgimg,dataItem,mtlurl,objurl} = this.state;
    return (
      <div className='box'>
        <div  onClick={this.gotoTab2.bind(this,name,dataItem)}  id='bgimage' className='bgimg' style={{backgroundImage:`url(${bgimg?require("../../JSON/TC/Images/"+bgimg):''})`}}>
        </div>
        <MenuButton/>
        <div  className='box-left'>
          <div id='3d-output' >
              <div>
                {/*这里别用map了，数据下面取好然后这里根据路径变换模型，而且swiper-slide是Swiper框架独有的class这里没用。*/}
              </div>
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
                      <div className='swiperContent'>{item.content.slice(0,40)}</div>
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