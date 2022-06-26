<template>
<div>
      <div class="block">
        <div class="bvt"> 
    <span class="demonstration">赵智凤年谱可视化系统介绍</span>
    </div>
    <el-carousel height="270px">
      <el-carousel-item v-for="item in img" :key="item">
        <el-image
      style="width: 750px; height: 270px"
      :src='item'
      :fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div >
  <div class="bt">项目背景:</div>
  <div  class="wz">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{bj}}</div>

    <div class="bt">项目方法:</div>
  <div  class="wz">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ff}}</div>

    <div class="bt">项目成果:</div>
  <div  class="wz">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{cg}}</div>
    <div  class="wz" v-for="i in cg1" :key="i">{{i}}</div>

     <div class="bt">项目意义:</div>
  <div   class="wz" v-for="i in yy" :key="i">{{i}}</div>
    
</div>
<el-button type="primary" @click="goto" >进入系统</el-button>
</div>
  

</template>

<script>

export default {

  name: "index",

  data() {
    return {
        img:["https://jzh-mall.oss-cn-beijing.aliyuncs.com/zzf/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220620224731.jpg",
        "https://jzh-mall.oss-cn-beijing.aliyuncs.com/zzf/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220620224735.jpg",
        "https://jzh-mall.oss-cn-beijing.aliyuncs.com/zzf/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220620224741.jpg",
        "https://jzh-mall.oss-cn-beijing.aliyuncs.com/zzf/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220620224745.jpg",
        "https://jzh-mall.oss-cn-beijing.aliyuncs.com/zzf/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220620224752.jpg"
],
        bj:"南宋绍兴二十九年（公元1159年），出生于大足米粮乡的赵智凤5岁出家，16岁前往四川弥牟学习柳本尊密法，3年后回到家乡大足，主持雕凿了一座以阐释佛教义理，宣扬儒家忠孝思想为主旨的大型石窟造像群。赵智凤翻山越岭，栉风沐雨，足迹踏遍大足境内的山山水水，最终把创建密宗道场的位置选定在宝顶山上的马蹄形崖湾里。一直以来，对赵智凤修建宝顶山石刻的原因争论很多，而本项目以赵智凤为中心，围绕赵智凤、立碑题字者、工匠、同时期官员等人，用现有资料对他们的社交关系网络进行联结，试图分析当时潜在的大足时刻关注者与推动者。" ,
        ff:"本项目应用CBDB的关系型数据结构，采用群体传记学的方法，建立一个关系型的数据库，其中涉及人物、人群、地域官职等多方面数据的交叉。通过对呈现出的数据进行数据分析、网络分析、空间分析，最终得出研究结果。",
        cg:"先以原始的Excel数据建立关系后得到整体的人物图谱，后以赵志凤为中心的二级阶梯关系与三级阶梯关系跨越大江南北，并以四川、东南地区为中心展开。其中又以赵智凤、魏了翁、李埴、崔与之等人为重要节点。通过赵智凤年谱可视化系统，我们可以从地理、群体视角直观清晰地感受到赵智凤及大足石刻的影响力。在对关系图进行分析的过程中，我们得出以下结论：",
      cg1:["1.魏了翁作为作为鹤山学派的代表人物，四川儒学的传播者，他在大足石刻的题字行为是佛儒文化交流的结果，对鹤山学派、四川儒学乃至全国的儒学推动佛儒融合有一定影响力。","2.王象之编撰的《舆地纪胜》中记录了大足石刻相关信息，是南宋中期的一部地理总志，对研究南宋的历史与重要的史料价值。而在数据中我们发现王象之与四川地方官员李埴有书信来往，这对于大足石刻推广至全国具有一定意义。","3.赵智凤的舅舅伏小八在冯楫作为赞助人时是修凿大足石刻的工匠之一，冯楫死后他又迎来小赵智凤的出生，由此可见赵智凤本人的家庭代代传承修建石刻的精神与热情。","4.从地理范围来看，赵智凤与大足石刻的影响力和传播力较为广泛。","5.从人际关系视角来看，不同于传统叙述中民间修建的结果，大足石刻可能在上层政治阶级中有一定的传播力度。"]
,      yy:["1.将引得、《大足编年史》的人物数据转换为可视化年谱，便于观者更强烈直观地感受赵智凤与大足石刻的地理范围和传播力度。","2.对于更加深入研究社会群体与大足石刻的关系提供一定的便利。","3.将可视化系统建立在网页平台，以全新的视角向大众宣传推广赵智凤与大足石刻这一历史瑰宝。"]


    };
  },
  methods: {
goto(){
    console.log("11")
    
this.$router.push('/HelloWorld')
}
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bt{
  text-align: left;
  font-weight: bold;
  font-size: 10pt;
  margin-top: 10px;
   margin-left: 50px;
  margin-right: 50px;
  
}
.bvt{


  font-weight: bold;
  font-size: 18pt;
  margin-top: 10px;
   margin-left: 50px;
  margin-right: 50px;
}
.wz{
  font-size: 9pt;
  
  text-align: left;
  margin-left: 50px;
  margin-right: 50px;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

</style>
