import * as THREE from 'three'
import * as TWEEN from '@/utils/tween.esm.js'
import {CSS3DRenderer,CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import {
    addQipao,
    setPrizes,
    showPrizeList,
    setPrizeData,
    resetPrize
} from "./prizeList";
import { NUMBER_MATRIX } from "./config.js";

import {getTempData} from "@/api/lottery.js";

let btns // 按钮
let prizes //奖项
let EACH_COUNT //奖项数量
let ROW_COUNT = 7
let COLUMN_COUNT = 17
let COMPANY // 公司名称
let HIGHLIGHT_CELL = []
let Resolution = 1;

let selectedCardIndex = []
let rotate = false
let basicData = { // 数据
     prizes: [], //奖品信息
     users: [], //所有人员
     luckyUsers: {}, //已中奖人员
     leftUsers: [] //未中奖人员
 }
let interval
let currentPrizeIndex
let currentPrize
let isLotting = false
let currentLuckys = []

export function initAll(){
    btns = {
        enter: document.querySelector("#enter"),
        lotteryBar: document.querySelector("#lotteryBar"),
        lottery: document.querySelector("#lottery")
    }
    getTempData().then(({data})=>{
        prizes = data.cfgData.prizes;
        EACH_COUNT = data.cfgData.EACH_COUNT;
    })
}