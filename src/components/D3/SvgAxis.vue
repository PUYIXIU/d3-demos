<script setup>
import * as d3 from 'd3'
import {shallowRef} from 'vue'
import {onMounted, onUnmounted} from "@vue/runtime-core";
import ExmapleAxis from "@/components/D3/ExmapleAxis.vue";
import FullAxis from "@/components/D3/FullAxis.vue";

const domain = shallowRef([0, 100])
const range = [20, 840]
let timer

onMounted(()=>{
  timer = d3.interval(()=>{
    const x = Math.random() * 100
    const l = Math.random() * 100;
    domain.value = [x, x + l]
  },2500)
})

onUnmounted(()=>{
  timer?.stop()
})
</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>axisTop</li>
      <li>axisBottom</li>
      <li>axisLeft</li>
      <li>axisRight</li>
      <li>axis.scale</li>
      <li>axis.ticks</li>
      <li>tickArguments</li>
    </div>
    <div class="content">
      <svg width="890" height="50">
        <g fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
          <path class="domain" stroke="currentColor" d="M0.5,6V0.5H880.5V6"></path>
          <g class="tick" opacity="1" transform="translate(0.5,0)">
            <line stroke="currentColor" y2="6"></line>
            <text fill="currentColor" y="9" dy="0.71em">0.0</text>
          </g>
          <g class="tick" opacity="1" transform="translate(176.5,0)">
            <line stroke="currentColor" y2="6"></line>
            <text fill="currentColor" y="9" dy="0.71em">0.2</text>
          </g>
          <g class="tick" opacity="1" transform="translate(352.5,0)">
            <line stroke="currentColor" y2="6"></line>
            <text fill="currentColor" y="9" dy="0.71em">0.4</text>
          </g>
          <g class="tick" opacity="1" transform="translate(528.5,0)">
            <line stroke="currentColor" y2="6"></line>
            <text fill="currentColor" y="9" dy="0.71em">0.6</text>
          </g>
          <g class="tick" opacity="1" transform="translate(704.5,0)">
            <line stroke="currentColor" y2="6"></line>
            <text fill="currentColor" y="9" dy="0.71em">0.8</text>
          </g>
          <g class="tick" opacity="1" transform="translate(880.5,0)">
            <line stroke="currentColor" y2="6"></line>
            <text fill="currentColor" y="9" dy="0.71em">1.0</text>
          </g>
        </g>
      </svg>
    </div>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLinear([0,100],range))" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLog([1,1000],range))" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleBand([...'ABCDEFGHIJKM'],range)).tickSizeOuter(0)" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleUtc([new Date('2011-01-01'), new Date('2013-01-01')], range))" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLinear(domain, range))" :y="7" :duration="1500"></ExmapleAxis>
    <FullAxis ></FullAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLinear([0,100],range)).ticks(40)" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleUtc([new Date('2000-01-01'), new Date('2023-01-01')],range)).ticks(20,'xxx')" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleUtc([new Date('2023-12-01'), new Date('2023-12-02')],range)).ticks(d3.timeHour.every(3))" :y="7"></ExmapleAxis>
    <div class="read-me">
      <li>tickValues</li>
      <li>tickFormat</li>
      <li>tickSize</li>
      <li>tickSizeInner</li>
      <li>tickSizeOuter</li>
      <li>tickPadding</li>
      <li>offset</li>
    </div>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLinear([0,100],range)).tickValues([0,1,2,3,4,5,55,89,100])" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLinear([0,100],range)).tickFormat(d3.format('#x'))" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleLinear([0,100],range)).tickSize(0)" :y="7"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleBand([...'ABCDEFGHIJKM'],range)).tickSizeInner(0).tickSizeOuter(10)" :y="7" :width="900"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleBand([...'ABCDEFGHIJKM'],range)).tickPadding(10)" :y="7" :width="900"></ExmapleAxis>
    <ExmapleAxis :axis="d3.axisBottom(d3.scaleBand([...'ABCDEFGHIJKM'],range)).offset(-5)" :y="7" :width="900"></ExmapleAxis>
  </div>
</template>

<style scoped lang="scss">
.container{
  padding-top:10px;
  width:fit-content;
  background: white;
  .read-me{
    margin:10px;
    background: #eaeaea;
    padding:10px;
    line-height:30px;
  }
  .content{
    width: 900px;
    padding:5px;
  }
}
</style>