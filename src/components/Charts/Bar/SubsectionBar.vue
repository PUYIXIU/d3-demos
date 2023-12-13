<template>
  <div class="content">
    <div class="bar bar1">
      <div class="bar-label">
        <div class="label">高级工程师</div>
        <div class="split"></div>
      </div>
      <div class="bar-item"></div>
    </div>
    <div class="bar bar2">
      <div class="bar-label">
        <div class="label">高级经济师</div>
        <div class="split"></div>
      </div>
      <div class="bar-item"></div>
    </div>
    <div class="bar bar3">
      <div class="bar-label">
        <div class="label">中级工程师</div>
        <div class="split"></div>
      </div>
      <div class="bar-item"></div>
    </div>
    <div class="bar bar4">
      <div class="bar-label">
        <div class="label">助理研究员</div>
        <div class="split"></div>
      </div>
      <div class="bar-item"></div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.content{
  width:100%;
  height:100%;
  background: #0a0d16;
  display: flex;
  align-items: center;
}
.bar{
  margin-right:15px;
  position:relative;

  .bar-label{
    position:absolute;
    top:-25px;
    left:20%;
    .label{
      color:#fff;
      position:absolute;
      top:-25px;
      display: block;
      text-wrap: nowrap;
      left:50%;
      transform: translateX(-50%);
    }
    .split{
      width: 5px;
      background: linear-gradient(180deg,#fff, #28454d 45%, #01b6e6 55%);
      clip-path: polygon(0% 0%, 100% 0%, 70% 30%, 70% 70%, 100% 100%, 0% 100%,30% 70%, 30% 30%, 0% 0%);
      height:25px;
    }

  }
  .bar-item{
    height:20px;
    background:
        repeating-linear-gradient(90deg, rgba(46, 141, 138, 0.3), rgba(48, 159, 155, 0.3) 3px, rgba(20, 131, 125, 0.3) 5px, rgba(21, 121, 116, 0.3) 10px),
        radial-gradient(ellipse at 75% 100%, rgba(4, 255, 215, 0.75), transparent);
    border:2px solid #1bd4d3;
  }

  &.bar1{
    width:50%;
    margin-left:15px;
  }
  &.bar2{
    width:20%;
    .bar-label{
      top:initial;
      bottom:-25px;
      .label{top:initial;bottom:-25px;}
      .split{
        background: linear-gradient(0deg,#fff, #28454d 45%, #00b4e3 55%);
      }
    }
    .bar-item{
      background:
          repeating-linear-gradient(90deg, rgba(23, 120, 166, 0.39), rgba(29, 124, 169, 0.41) 2px, rgba(29, 135, 183, 0.37) 4px, rgba(29, 135, 183, 0.33) 7px),
          radial-gradient(ellipse at 75% 100%, rgb(17, 184, 255), rgb(5, 0, 0));
      border:2px solid #1278d4;
    }
  }
  &.bar3{
    width:13%;
    .bar-label{
      .split{
        background: linear-gradient(180deg,#fff, #28454d 45%, #0068e3 55%);
      }
    }
    .bar-item{
      background:radial-gradient(ellipse at 75% 100%, rgb(0, 89, 218), rgb(0, 28, 68));
      border:2px solid #4788e9;
    }
  }
  &.bar4{
    width:17%;
    .bar-label{
      top:initial;
      bottom:-25px;
      left:50%;
      transform: translateX(-50%);
      .label{top:initial;bottom:-25px;}
      .split{
        background: linear-gradient(0deg,#fff, #134032 45%, #00c35b 55%);
      }
    }
    .bar-item{
      background:
          repeating-linear-gradient(90deg, rgba(33, 166, 23, 0.2), rgba(29, 169, 78, 0.2) 3px, rgba(29, 183, 73, 0.2) 5px, rgba(29, 183, 73, 0.2) 10px),
          radial-gradient(ellipse at 75% 100%, rgb(121, 222, 114), rgb(40, 63, 35));
      border:2px solid #97f086;
    }
  }
}
</style>