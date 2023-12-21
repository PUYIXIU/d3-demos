
<script setup>
import "@/assets/styles/animate.min.css";
import {ref,onMounted,onBeforeUnmount} from "vue";
import * as THREE from 'three'
import {CSS3DRenderer,CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import axios from 'axios'
import {NUMBER_MATRIX} from "@/views/demos/lottery/js/config.js";
import * as TWEEN from '@/utils/tween.esm.js'

const baseUrl = 'http://127.0.0.1:18888' //服务地址
let camera,scene,renderer
let controls

const startBtn = ref()

let Resolution = 1;
let ROW_COUNT = 7,
    COLUMN_COUNT = 17
let TOTAL_CARDS = ROW_COUNT * COLUMN_COUNT
let HIGHLIGHT_CELL = [] //高亮索引
let threeDCards = []
let targets = {
  table:[],
  sphere:[]
}
let basicData = {
  prizes:[], //
  users:[], // 所有人员
  luckyUsers:[], // 已中奖人员
  leftUsers:[]  // 未中奖人员
}
function initCards(){
  let member = basicData.users.slice()
  let showCards = []
  let length = member.length;
  let isBold = false;
  let showTable = basicData.leftUsers.length === length
  let index = 0
  let position = {
    x:(140 * COLUMN_COUNT - 20)/2,
    y:(180* ROW_COUNT - 20)/2
  }

  // 相机 场景
  camera = new THREE.PerspectiveCamera(
      40,
      window.innerHeight/window.innerHeight,
      1,
      10000
  )
  camera.position.z = 3000;
  scene = new THREE.Scene()

  for(let i = 0;i<ROW_COUNT;i++){
    for(let j = 0;j<COLUMN_COUNT;j++){
      isBold = HIGHLIGHT_CELL.includes(`${j}-${i}`)
      var element = createCard(
          member[index % length],
          isBold,
          index,
          showTable
      )
      let obj = new CSS3DObject(element)
      obj.position.x = Math.random() * 4000 - 2000;
      obj.position.y = Math.random() * 4000 - 2000;
      obj.position.z = Math.random() * 4000 - 2000;
      scene.add(obj);
      threeDCards.push(obj);

      // 表格映射位置
      var object = new THREE.Object3D();
      object.position.x = j * 140 - position.x;
      object.position.y = -(i * 180) + position.y;
      targets.table.push(object);
      index++;
    }
  }
  // 球体映射位置
  let vector = new THREE.Vector3()
  for(let i =0,l = threeDCards.length;i<l;i++){
    let phi = Math.acos(-1 + (2 * i) / l);
    var theta = Math.sqrt(l * Math.PI) * phi;
    var object = new THREE.Object3D();
    object.position.setFromSphericalCoords(800 * Resolution, phi, theta);
    vector.copy(object.position).multiplyScalar(2);
    object.lookAt(vector);
    targets.sphere.push(object);
  }
  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('container').appendChild(renderer.domElement)

  controls = new TrackballControls(camera,renderer.domElement)
  controls.rotateSpeed = 0.5
  controls.minDistance = 500
  controls.maxDistance = 6000;
  controls.addEventListener('change',render)
  bindEvent()
  render()
  if(showTable){
    switchScreen("enter");
  }else{
    switchScreen("rotate");
  }
}

// 变换-渲染
function transform(targets, duration){
  for(var i = 0;i < threeDCards.length;i++){
    // 从object位置 移动到target位置
    var object = threeDCards[i]
    var target = targets[i]
    new TWEEN.Tween(object.position) // 坐标点位移动
        .to({
          x: target.position.x,
          y: target.position.y,
          z: target.position.z
        },Math.random()*duration+duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    new TWEEN.Tween(object.rotation) // 旋转角度
        .to({
          x:target.rotation.x,
          y:target.rotation.y,
          z:target.rotation.z,
        },Math.random()*duration+duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
  }
  new TWEEN.Tween(this)
      .to({},duration*2)
      .onUpdate(render)
      .start();
}

// 状态切换 表格-球形
function switchScreen(type){
  switch(type){
    case 'enter':
      transform(targets.table, 2000)
      break;
    default:
      transform(targets.sphere, 2000)
      break;
  }
}

function animate(){
  requestAnimationFrame(animate)
  controls.update()
}

// 初始化所有
function initAll(){
  axios.post(`${baseUrl}/getTempData`).then(({data})=>{
    basicData.leftUsers = data.leftUsers;
  })
  axios.post(`${baseUrl}/getUsers`).then(({data})=>{
    basicData.users = data
    HIGHLIGHT_CELL = createHightLight();
    initCards()
    animate()
  })
}

// 类led年份数字显示屏效果
// 返回需要高亮显示的卡片索引
function createHightLight(){
  let year = new Date().getFullYear()+""
  let step = 4
  let xOffset = 1
  let yOffset = 1
  let hightlight = []
  year.split("").forEach(n=>{
    hightlight = hightlight.concat(
        NUMBER_MATRIX[n].map(item=>{
          return `${item[0]+xOffset}-${item[1]+yOffset}`
        })
    )
    xOffset+=step
  })
  return hightlight
}

/**
 * 创建名牌
 * @param user
 * @param isBold
 * @param id
 * @param showTable
 */
function createCard(user, isBold, id, showTable){
  let element = createElement()
  element.id = `card-${id}`
  if(isBold){
    element.className = 'element lightitem'
    if(showTable){
      element.classList.add('highlight')
    }
  } else {
    element.className = "element";
    element.style.backgroundColor =
        "rgba(0,127,127," + (Math.random() * 0.7 + 0.25) + ")";
  }
  element.appendChild(createElement('name',user[1]));
  element.appendChild(createElement('details',`${user[0]}<br/>${user[2]}`));
  return element
}

function createElement(css,text){
  let dom = document.createElement('div')
  dom.className = css || ''
  dom.innerHTML = text || ''
  return dom
}

function bindEvent(){

  window.addEventListener('resize',onWindowResize, false)
}

function onWindowResize(){
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function render(){
  renderer.render(scene,camera)
}

onMounted(()=>{
  document.body.style.overflow = ' hidden'
  initAll()
})
onBeforeUnmount(()=>{
  document.body.style.overflow = ' visible'
  document.getElementById('container').innerHTML = ''
})
</script>

<template>
  <div class="wrap">
    <div class="button-box" id="menu">
      <button id="start" ref="startBtn">Start</button>
    </div>
    <div id="container"></div>
  </div>
</template>

<style scoped lang="scss">
.wrap{
  width:100%;
  height:100vh;
  background:#000;
  overflow:hidden;
  position:relative;
  .button-box{
    position:absolute;
    left:0px;
    top:0px;
  }
  #container{
    width: 100%;
    height:100%;
  }
}
</style>

<style lang="scss">
.element {
  width: 12vh;
  height: 16vh;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  text-align: center;
  cursor: default;
  transition: background-color 0.3s ease-in;
}

.element:hover {
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .company {
  position: absolute;
  top: 1.2vh;
  right: 0;
  width: 100%;
  font-size: 2vh;
  color: rgba(127, 255, 255, 0.75);
}

.element .name {
  position: absolute;
  top: 4.6vh;
  left: 0;
  right: 0;
  font-size: 2.9vh;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 1vh rgba(0, 255, 255, 0.95);
}

.element .details {
  position: absolute;
  bottom: 1.2vh;
  left: 0;
  right: 0;
  font-size: 1.6vh;
  color: rgba(127, 255, 255, 0.75);
}
.highlight {
  background-color: rgba(253, 105, 0, 0.95) !important;
  box-shadow: 0 0 12px rgba(253, 105, 0, 0.95);
  border: 1px solid rgba(253, 105, 0, 0.25);
}

.highlight.element .name {
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.95);
}
.prize .company,
.prize .details,
.prize .name,
.highlight .company,
.highlight .name,
.highlight .details {
  color: rgba(255, 255, 255, 0.85);
}
</style>