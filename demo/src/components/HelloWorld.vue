

<template>
  <div>
    <div>
      <el-container style="height: 450px; border: 1px solid #eee">
        <el-header height="105px">
          <div class="pp">
            <div class="t5">根据关系筛选：</div>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 15px"></div>
            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{
                city
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="pp">
            <div class="t5">是否显示第三阶梯关系：</div>
            
     
    <el-checkbox v-model="hid1" :disabled="d1" @change="h1">详细版</el-checkbox>
    <el-checkbox v-model="hid2" :disabled="d2" @change="h2">简单版</el-checkbox>

          </div>
           
        </el-header>
        <el-container>
          <el-aside width="300px">
            <el-descriptions
              v-if="show_data.name != null"
              class="margin-top"
              :column="1"
              :size="size"
              border
            >
              <el-descriptions-item>
                <template slot="label"> 姓名 </template>
                {{ show_data.name }}
              </el-descriptions-item>
              <el-descriptions-item v-if="show_data.time">
                <template slot="label"> 时间 </template>
                {{ show_data.time }}
              </el-descriptions-item>
              <el-descriptions-item v-if="show_data.shiji">
                <template slot="label"> 事迹 </template>
                {{ show_data.shiji }}
              </el-descriptions-item>

              <el-descriptions-item v-if="show_data.guanzhi">
                <template slot="label"> 官职 </template>
                {{ show_data.guanzhi }}
              </el-descriptions-item>
              <el-descriptions-item v-if="show_data.wenxian">
                <template slot="label"> 文献 </template>
                {{ show_data.wenxian }}
              </el-descriptions-item>
                            <el-descriptions-item v-if="show_data.shqf!=null&&show_data.shqf">
                <template slot="label"> 社会区分 </template>
                {{ show_data.shqf }}
              </el-descriptions-item >
                            <el-descriptions-item v-if="show_data.rs!=null&&show_data.rs">
                <template slot="label"> 入仕 </template>
                {{ show_data.rs }}
              </el-descriptions-item>
            </el-descriptions>

            <el-empty
              v-else
              description="点击地图上坐标点来查看详细数据"
            ></el-empty>
          </el-aside>
          <el-container>
            <el-main  >
              <div class="mapbox">
                <baidu-map
                  class="map"
                  :center="{ lng: 114.091023, lat: 32.146983 }"
                  :zoom="7"
                  :scroll-wheel-zoom="true"
                  style="height: 80vh"
                  @ready="handler"
                  @click="getClickInfo"
                >
                  <bm-map-type
                    :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                    anchor="BMAP_ANCHOR_TOP_LEFT"
                  ></bm-map-type>
                  <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>

                  <bm-boundary
                    name="北京市海淀区"
                    :strokeWeight="2"
                    strokeColor="blue"
                  ></bm-boundary>
                  <div v-if="bar1">
                    <bm-marker
                      v-for="o in guanyuan"
                      :key="o"
                      :icon="{
                        url: '../../static/gy.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar2">
                    <bm-marker
                      v-for="o in gzz"
                      :key="o"
                      :icon="{
                        url: '../../static/gzz.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen1(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar3">
                    <bm-marker
                      v-for="o in sc"
                      :key="o"
                      :icon="{
                        url: '../../static/sf.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen2(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar4">
                    <bm-marker
                      v-for="o in jt"
                      :key="o"
                      :icon="{
                        url: '../../static/jt.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen3(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar5">
                    <bm-marker
                      v-for="o in ws"
                      :key="o"
                      :icon="{
                        url: '../../static/工人.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>

                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three1"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three2"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three3"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three4"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three5"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three6"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three7"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three8"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three9"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <div v-if="bar6">
                    <bm-marker
                      v-for="o in three10"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                                <div v-if="bar6">
                    <bm-marker
                      v-for="o in three11"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>


                  <div v-if="hid">
                    <bm-marker
                      v-for="o in hide"
                      :key="o"
                      :icon="{
                        url: '../../static/th.png',
                        size: { width: 25, height: 25 },
                      }"
                      :position="{
                        lng: o.location.lng,
                        lat: o.location.lat,
                      }"
                      @click="infoWindowOpen4(o)"
                    >
                    </bm-marker>
                  </div>
                  <!-- <bml-curve-line
                    :points="points"
                    :editing="true"
                  ></bml-curve-line> -->
                  <div v-if="bar6">
                    <bml-curve-line
                      v-for="o in people1"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      v-for="o in people2"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      v-for="o in people3"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      v-for="o in people4"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      strokeColor="red"
                      v-for="o in people5"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      strokeColor="blue"
                      v-for="o in people6"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      strokeColor="black"
                      v-for="o in people7"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      strokeColor="yellow"
                      v-for="o in people8"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                    <bml-curve-line
                      strokeColor="green"
                      v-for="o in people9"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>

                    <bml-curve-line
                      v-for="o in people10"
                      :key="o"
                      strokeColor="red"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
           <bml-curve-line
                      v-for="o in people11"
                      :key="o"
                      strokeColor="red"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>


                  </div>
                  <div v-if="hid">
                    <bml-curve-line
                      v-for="o in hi"
                      :key="o"
                      strokeWeight="1"
                      :points="[
                        { lng: o[0].lng, lat: o[0].lat },
                        { lng: o[1].lng, lat: o[1].lat },
                      ]"
                      :editing="false"
                    ></bml-curve-line>
                  </div>
                  <!-- <bm-polyline v-for="o in people1"
                      :key="o" :path="o" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false" ></bm-polyline> -->
                  <bm-geolocation
                    anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                    :showAddressBar="true"
                    :autoLocation="true"
                  ></bm-geolocation>
                </baidu-map>
              </div>
            </el-main>
            <el-footer>
              <div>系统开发：Jzh、孙潼、朱一诺</div>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>

      <div></div>
    </div>
  </div>
</template>


<script>
const cityOptions = ["地方官员", "关注者", "师承", "家庭成员", "文氏工匠家族"];
import { BmlCurveLine } from "vue-baidu-map";
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
  components: {
    BmlCurveLine,
    BmlMarkerClusterer,
  },
  name: "HelloWorld",

  data() {
    return {
      d1:false,
      d2:true,
      
      hid1:false,
      hid: false,
      three: false,
      bar1: true,
      bar2: true,
      bar3: true,
      bar4: true,
      bar5: true,
      bar6: true,

      show_data: {},
      hi: [[{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '103.512036', 'lat': '30.193446'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '105.312454', 'lat': '29.920127'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '104.134082', 'lat': '29.995630'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '106.748083', 'lat': '30.432504'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '105.592898', 'lat': '30.532847'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '105.737228', 'lat': '35.529388'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '105.826693', 'lat': '32.432302'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '105.732556', 'lat': '35.521976'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '105.720921', 'lat': '35.517771'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '113.810860', 'lat': '23.261141'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '103.958013', 'lat': '30.990165'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '103.519778', 'lat': '30.010296'}], [{'lng': '105.801233', 'lat': '29.773573'}, {'lng': '120.441185', 'lat': '29.052781'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '120.151457', 'lat': '30.290905'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '104.147700', 'lat': '29.998850'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '117.486307', 'lat': '30.210314'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '118.532804', 'lat': '27.924140'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.835817', 'lat': '30.038830'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.839117', 'lat': '30.039640'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '113.810860', 'lat': '23.261141'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '106.748083', 'lat': '30.432504'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '104.282175', 'lat': '30.973974'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.521214', 'lat': '30.012725'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '104.194842', 'lat': '31.340945'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '104.148101', 'lat': '29.997858'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.958013', 'lat': '30.990165'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.922311', 'lat': '30.574446'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '120.670068', 'lat': '27.998155'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.517904', 'lat': '30.019315'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '105.571792', 'lat': '30.512969'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '117.737785', 'lat': '29.839115'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '103.517392', 'lat': '30.017315'}], [{'lng': '103.512036', 'lat': '30.193446'}, {'lng': '116.062269', 'lat': '27.764062'}], [{'lng': '105.312454', 'lat': '29.920127'}, {'lng': '103.512036', 'lat': '30.193446'}], [{'lng': '105.720921', 'lat': '35.517771'}, {'lng': '105.732556', 'lat': '35.521976'}], [{'lng': '105.720921', 'lat': '35.517771'}, {'lng': '107.400737', 'lat': '34.521218'}], [{'lng': '105.720921', 'lat': '35.517771'}, {'lng': '103.512036', 'lat': '30.193446'}], [{'lng': '105.732556', 'lat': '35.521976'}, {'lng': '104.194842', 'lat': '31.340945'}], [{'lng': '105.732556', 'lat': '35.521976'}, {'lng': '107.400737', 'lat': '34.521218'}], [{'lng': '105.732556', 'lat': '35.521976'}, {'lng': '103.506498', 'lat': '30.196789'}], [{'lng': '105.732556', 'lat': '35.521976'}, {'lng': '116.062269', 'lat': '27.764062'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '106.748083', 'lat': '30.432504'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '116.062269', 'lat': '27.764062'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '119.009357', 'lat': '25.429482'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '118.199179', 'lat': '29.789095'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '117.737785', 'lat': '29.839115'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '103.512036', 'lat': '30.193446'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '120.151457', 'lat': '30.290905'}], [{'lng': '113.810860', 'lat': '23.261141'}, {'lng': '119.597897', 'lat': '31.723247'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '104.147700', 'lat': '29.998850'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '103.835817', 'lat': '30.038830'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '103.839117', 'lat': '30.039640'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '117.486307', 'lat': '30.210314'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '103.506498', 'lat': '30.196789'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '104.194842', 'lat': '31.340945'}], [{'lng': '104.134082', 'lat': '29.995630'}, {'lng': '118.691601', 'lat': '25.362094'}], [{'lng': '103.958013', 'lat': '30.990165'}, {'lng': '105.737228', 'lat': '35.529388'}], [{'lng': '103.958013', 'lat': '30.990165'}, {'lng': '103.512036', 'lat': '30.193446'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '103.517904', 'lat': '30.019315'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '103.517392', 'lat': '30.017315'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '103.512036', 'lat': '30.193446'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '120.670068', 'lat': '27.998155'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '119.597897', 'lat': '31.723247'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '118.691601', 'lat': '25.362094'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '119.654061', 'lat': '29.084097'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '118.532804', 'lat': '27.924140'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '119.009357', 'lat': '25.429482'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '118.199179', 'lat': '29.789095'}], [{'lng': '103.519778', 'lat': '30.010296'}, {'lng': '116.062269', 'lat': '27.764062'}], [{'lng': '120.441185', 'lat': '29.052781'}, {'lng': '103.519778', 'lat': '30.010296'}], [{'lng': '106.748083', 'lat': '30.432504'}, {'lng': '104.282175', 'lat': '30.973974'}], [{'lng': '106.748083', 'lat': '30.432504'}, {'lng': '105.571792', 'lat': '30.512969'}], [{'lng': '106.748083', 'lat': '30.432504'}, {'lng': '104.084805', 'lat': '30.664370'}], [{'lng': '106.748083', 'lat': '30.432504'}, {'lng': '103.922311', 'lat': '30.574446'}], [{'lng': '106.748083', 'lat': '30.432504'}, {'lng': '113.810860', 'lat': '23.261141'}], [{'lng': '106.748083', 'lat': '30.432504'}, {'lng': '103.512036', 'lat': '30.193446'}]],
      people1: [
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.830863", lat: "30.040704" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.071879", lat: "34.445656" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.075931", lat: "30.651651" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.506498", lat: "30.196788" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.510748", lat: "30.190108" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.515241", lat: "30.199438" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.069490", lat: "29.650826" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.463885", lat: "30.410675" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "111.088540", lat: "25.950057" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.506547", lat: "30.192060" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "111.072340", lat: "25.929549" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.585315", lat: "31.298886" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.668995", lat: "30.631404" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.056598", lat: "27.762776" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.517919", lat: "30.013490" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.861798", lat: "29.248086" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.061424", lat: "30.659006" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.466215", lat: "30.408220" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.677588", lat: "29.553581" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.057654", lat: "30.650652" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.072912", lat: "29.650730" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.151457", lat: "30.290905" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.571769", lat: "30.513540" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.296841", lat: "26.081876" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.245124", lat: "28.682055" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.182036", lat: "26.637438" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.069750", lat: "29.651200" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.711051", lat: "32.709445" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.840692", lat: "30.053136" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "113.581234", lat: "28.701868" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.829141", lat: "30.035585" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.533449", lat: "27.920425" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "111.600796", lat: "25.526438" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.087780", lat: "33.768826" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.858197", lat: "28.682892" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "114.316223", lat: "30.554235" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.507979", lat: "30.198646" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.507507", lat: "30.198818" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.135354", lat: "36.192084" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.546773", lat: "30.410754" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "108.940174", lat: "34.341568" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.831813", lat: "30.036461" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.284372", lat: "30.977991" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.082816", lat: "30.797200" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.831752", lat: "30.042345" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.195607", lat: "31.342642" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.552365", lat: "24.781681" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.147700", lat: "29.998850" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.486307", lat: "30.210314" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.438093", lat: "34.635779" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.532804", lat: "27.924140" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.835817", lat: "30.038830" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.056600", lat: "27.765006" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.846688", lat: "29.831358" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "114.307581", lat: "34.797239" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.387052", lat: "27.740192" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.839117", lat: "30.039640" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.154594", lat: "30.037858" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.069726", lat: "29.651287" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "113.496894", lat: "27.646130" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.846642", lat: "29.831357" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "113.810860", lat: "23.261141" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.152791", lat: "30.267446" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.844228", lat: "30.042545" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.516331", lat: "30.012971" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.640388", lat: "27.554743" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.748083", lat: "30.432504" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.282175", lat: "30.973974" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.641925", lat: "27.557080" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.521214", lat: "30.012725" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "114.536626", lat: "36.741880" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.412966", lat: "32.394210" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.688316", lat: "30.622320" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.459213", lat: "30.413335" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.909426", lat: "28.689105" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.848091", lat: "30.039948" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.068686", lat: "29.651196" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.845642", lat: "30.037185" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.678601", lat: "31.033270" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.056404", lat: "29.844811" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.146840", lat: "29.997912" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.695647", lat: "28.702302" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.153203", lat: "30.047348" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.758816", lat: "30.940718" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.194842", lat: "31.340945" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.656370", lat: "34.414172" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.335613", lat: "30.097246" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.844288", lat: "30.038171" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "114.375743", lat: "30.882557" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.181843", lat: "26.640721" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.148101", lat: "29.997858" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.135507", lat: "27.229632" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.760667", lat: "29.581470" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.384334", lat: "25.721143" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.870257", lat: "30.190001" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.157115", lat: "30.038104" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.131725", lat: "26.150047" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.673130", lat: "28.998160" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.833859", lat: "30.052596" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.204513", lat: "29.275863" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.196536", lat: "31.339578" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.512940", lat: "30.198485" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.515682", lat: "30.201007" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.517486", lat: "30.201703" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.517597", lat: "30.200571" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.518437", lat: "30.202867" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.519672", lat: "30.203100" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.520653", lat: "30.202075" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.672250", lat: "30.632904" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.672250", lat: "28.997559" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.546169", lat: "28.057171" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.460526", lat: "29.208919" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.755058", lat: "27.918959" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.917787", lat: "30.575203" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.672627", lat: "30.624970" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.155070", lat: "30.274084" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.100464", lat: "30.867390" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.059820", lat: "27.764066" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.287800", lat: "31.255550" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.459655", lat: "30.414783" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.156424", lat: "30.043161" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.156269", lat: "30.042172" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.679196", lat: "31.032579" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.834587", lat: "30.053340" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.827745", lat: "30.051499" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.787103", lat: "28.189799" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.518350", lat: "30.011229" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.388405", lat: "30.870986" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.030749", lat: "27.750719" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.029942", lat: "27.752329" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "113.116528", lat: "26.127151" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.647444", lat: "29.079059" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.958013", lat: "30.990165" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.922067", lat: "30.572897" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.172304", lat: "29.028319" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.633212", lat: "30.455961" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.284124", lat: "34.205768" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.565793", lat: "27.661918" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.631990", lat: "30.456074" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.825970", lat: "30.051534" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "114.546702", lat: "29.026022" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.922591", lat: "30.572515" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.867760", lat: "30.185829" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.860906", lat: "30.186492" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.241566", lat: "29.289648" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.465950", lat: "30.413518" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.785741", lat: "28.188498" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.588121", lat: "31.167820" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.414834", lat: "30.043347" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "111.785937", lat: "23.143722" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.334106", lat: "27.540988" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.003092", lat: "26.891339" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.005643", lat: "26.885204" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.156851", lat: "30.041343" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.690913", lat: "28.152895" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.462785", lat: "30.410573" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.466246", lat: "30.415359" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.670560", lat: "27.996792" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.521105", lat: "30.200692" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.431849", lat: "32.394720" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.461741", lat: "30.404676" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.994097", lat: "29.153577" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "111.082923", lat: "25.948301" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.521219", lat: "30.012451" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.517644", lat: "30.008534" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.092362", lat: "31.090134" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.094387", lat: "31.095156" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.114152", lat: "30.954735" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.741173", lat: "29.654612" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.461319", lat: "30.406000" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.454244", lat: "30.404571" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.337711", lat: "30.347967" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.886629", lat: "30.808481" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.087928", lat: "31.092035" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.521383", lat: "28.898368" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.518325", lat: "28.898958" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.407320", lat: "30.041750" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.396278", lat: "29.275694" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.922311", lat: "30.574446" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.851944", lat: "29.764059" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.546773", lat: "30.410754" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.670068", lat: "27.998155" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.517904", lat: "30.019315" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.846084", lat: "26.830902" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.076724", lat: "29.643777" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.571792", lat: "30.512969" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.846203", lat: "29.830987" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.054102", lat: "30.661552" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.055177", lat: "30.664542" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.074498", lat: "30.664996" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.627636", lat: "30.128901" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.851944", lat: "29.764059" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.676555", lat: "30.633000" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.753580", lat: "25.208766" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.737785", lat: "29.839115" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.088980", lat: "31.095734" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.842779", lat: "28.127427" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "108.200398", lat: "34.260204" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.519839", lat: "30.199923" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.517392", lat: "30.017315" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.987229", lat: "25.386270" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.506498", lat: "30.196789" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.081583", lat: "30.663414" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.206931", lat: "29.273328" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "109.735661", lat: "26.887239" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "109.696311", lat: "26.575052" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.944049", lat: "27.829738" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.371066", lat: "27.970596" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "105.090004", lat: "31.097120" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.988556", lat: "25.375745" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "106.078259", lat: "30.796714" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.470304", lat: "35.937102" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "103.923770", lat: "30.574468" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.068840", lat: "29.615920" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.433854", lat: "32.131962" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.486306", lat: "30.210313" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.028280", lat: "31.651133" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.311910", lat: "31.491169" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.471373", lat: "26.728953" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.062269", lat: "27.764062" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "117.492534", lat: "27.340327" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "104.078003", lat: "30.649099" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "114.199134", lat: "38.247144" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.558692", lat: "29.831985" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "121.558073", lat: "29.828738" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "116.045060", lat: "29.448128" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.551885", lat: "28.277483" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.544536", lat: "28.055499" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.064767", lat: "33.602919" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.106269", lat: "30.867311" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.311910", lat: "31.491169" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.621934", lat: "33.160326" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "120.688393", lat: "28.155345" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.386279", lat: "24.960385" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.296494", lat: "26.074507" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "115.402992", lat: "28.001657" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "112.430185", lat: "34.671390" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "109.696311", lat: "26.575052" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "119.852541", lat: "32.910459" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "111.043715", lat: "25.940085" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.763232", lat: "32.061707" },
        ],
        [
          { lng: "103.512036", lat: "30.193446" },
          { lng: "118.497972", lat: "31.571213" },
        ],
      ],
      people2: [
        [
          { lng: "105.312454", lat: "29.920127" },
          { lng: "103.512036", lat: "30.193446" },
        ],
      ],
      people3: [
        [
          { lng: "105.720921", lat: "35.517771" },
          { lng: "105.732556", lat: "35.521976" },
        ],
        [
          { lng: "105.720921", lat: "35.517771" },
          { lng: "107.400737", lat: "34.521218" },
        ],
        [
          { lng: "105.720921", lat: "35.517771" },
          { lng: "103.512036", lat: "30.193446" },
        ],
        [
          { lng: "105.720921", lat: "35.517771" },
          { lng: "115.029215", lat: "35.761829" },
        ],
        [
          { lng: "105.720921", lat: "35.517771" },
          { lng: "118.245124", lat: "28.682055" },
        ],
      ],
      people4: [
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "105.740668", lat: "35.509044" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "104.194842", lat: "31.340945" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "105.692702", lat: "35.259179" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "104.926337", lat: "33.392211" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "107.400737", lat: "34.521218" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "118.036237", lat: "27.750558" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "119.977401", lat: "30.542510" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "103.506498", lat: "30.196789" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "116.062269", lat: "27.764062" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "107.200832", lat: "35.677462" },
        ],
        [
          { lng: "105.732556", lat: "35.521976" },
          { lng: "109.432369", lat: "35.761975" },
        ],
      ],
      people5: [
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "103.831581", lat: "30.047880" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "119.006128", lat: "25.428579" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "106.748083", lat: "30.432504" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "116.062269", lat: "27.764062" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "113.264434", lat: "23.129162" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "119.009357", lat: "25.429482" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "118.199179", lat: "29.789095" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "114.992509", lat: "27.113443" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "104.069726", lat: "29.651287" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "117.737785", lat: "29.839115" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "103.512036", lat: "30.193446" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "120.151457", lat: "30.290905" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "115.087807", lat: "28.456805" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "113.364257", lat: "22.939394" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "113.363849", lat: "22.939925" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "118.432941", lat: "31.352859" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "119.597897", lat: "31.723247" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "113.208510", lat: "23.395046" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "119.010445", lat: "25.426452" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "113.829866", lat: "23.290187" },
        ],
        [
          { lng: "113.810860", lat: "23.261141" },
          { lng: "113.830084", lat: "23.290981" },
        ],
      ],
      people6: [
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.134082", lat: "29.995630" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.134082", lat: "29.995630" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.134082", lat: "29.995630" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.134082", lat: "29.995630" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.134082", lat: "29.995630" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.147700", lat: "29.998850" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "103.835817", lat: "30.038830" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "103.839117", lat: "30.039640" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "117.486307", lat: "30.210314" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "116.525725", lat: "27.218445" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "105.724947", lat: "34.580863" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.699366", lat: "27.994267" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.220750", lat: "31.338077" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "112.909426", lat: "28.689105" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.755486", lat: "30.746129" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "118.907674", lat: "25.386139" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "115.023449", lat: "26.969989" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "115.118092", lat: "26.971390" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.907507", lat: "30.113454" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "117.020359", lat: "36.668530" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "112.454040", lat: "34.619682" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.284939", lat: "31.920658" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "115.026481", lat: "27.314894" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "103.506498", lat: "30.196789" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.207217", lat: "30.238724" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.585315", lat: "31.298886" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.198214", lat: "31.339155" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.134082", lat: "29.995630" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "116.711051", lat: "32.709445" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "104.194842", lat: "31.340945" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.580232", lat: "30.029752" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "118.691601", lat: "25.362094" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.655135", lat: "28.015455" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "120.967147", lat: "28.116083" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "117.119999", lat: "36.651216" },
        ],
        [
          { lng: "104.134082", lat: "29.995630" },
          { lng: "121.550357", lat: "29.874556" },
        ],
      ],
      people7: [
        [
          { lng: "103.958013", lat: "30.990165" },
          { lng: "115.974422", lat: "39.485283" },
        ],
        [
          { lng: "103.958013", lat: "30.990165" },
          { lng: "103.958013", lat: "30.990165" },
        ],
        [
          { lng: "103.958013", lat: "30.990165" },
          { lng: "105.737228", lat: "35.529388" },
        ],
        [
          { lng: "103.958013", lat: "30.990165" },
          { lng: "103.512036", lat: "30.193446" },
        ],
      ],
      people8: [
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "103.516331", lat: "30.012971" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "103.517904", lat: "30.019315" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "103.517392", lat: "30.017315" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "103.512036", lat: "30.193446" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "120.670068", lat: "27.998155" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "119.597897", lat: "31.723247" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "118.691601", lat: "25.362094" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "119.654061", lat: "29.084097" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "118.532804", lat: "27.924140" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "119.009357", lat: "25.429482" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "118.199179", lat: "29.789095" },
        ],
        [
          { lng: "103.519778", lat: "30.010296" },
          { lng: "116.062269", lat: "27.764062" },
        ],
      ],
      people9: [
        [
          { lng: "120.441185", lat: "29.052781" },
          { lng: "119.655665", lat: "29.086670" },
        ],
        [
          { lng: "120.441185", lat: "29.052781" },
          { lng: "119.821070", lat: "28.895838" },
        ],
        [
          { lng: "120.441185", lat: "29.052781" },
          { lng: "103.519778", lat: "30.010296" },
        ],
      ],

      people10: [
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "106.748083", lat: "30.432504" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "104.282175", lat: "30.973974" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "105.571792", lat: "30.512969" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "104.082430", lat: "30.664332" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "104.084805", lat: "30.664370" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "103.922311", lat: "30.574446" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "103.872852", lat: "30.193278" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "113.871561", lat: "36.357045" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "117.492534", lat: "27.340327" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "121.550357", lat: "29.874556" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "113.810860", lat: "23.261141" },
        ],
        [
          { lng: "106.748083", lat: "30.432504" },
          { lng: "103.512036", lat: "30.193446" },
        ],
      ],
            people11: [[{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '106.009615', 'lat': '29.740724'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '105.983327', 'lat': '29.770008'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '106.008030', 'lat': '29.750634'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '105.719210', 'lat': '29.696438'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '105.736096', 'lat': '29.671083'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '106.507987', 'lat': '29.534935'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '105.733226', 'lat': '29.664429'}], [{'lng': '105.707570', 'lat': '30.757575'}, {'lng': '105.739140', 'lat': '29.671418'}]],
      hide: [
        {
          name: "魏了翁",
          shiji: "题字",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian:
            "大佛湾7号妙智宝塔下壁,摩崖作匾形,篆书横题“毗卢庵”三字,署“朝散大夫守太常少卿兼国史院编修实录院检讨官魏了翁书”，29号圆觉洞甬道左壁有竖刻三字“宝顶山”,署“临邛魏了翁书”",
          time: "嘉定十六年，1223年",
          guanzhi: "吏部尚书",
        },
        {
          name: "杜孝严",
          shiji: "题字",
          location: { lng: "105.312454", lat: "29.920127" },
          wenxian:
            "大佛湾4号广大宝楼阁图下壁,摩崖作匾形,楷书横题“宝顶山”三字,署“朝请大夫权尚书兵部侍郎兼同修国史兼实录院同修撰杜孝严书”",
          time: "嘉定十六年，1223年",
          guanzhi: "兵部侍郎、礼部尚书",
        },
        {
          name: "虞允文",
          shiji: "采石之战大败金军",
          location: { lng: "104.134082", lat: "29.995630" },
          wenxian:
            "《续通鉴》卷一四四：（二月）酉，四川宣抚使、雍国公虞允文薨。......寻赠太傅，谥忠肃。",
          time: "淳熙元年，1173年",
          guanzhi: "左丞相、四川宣抚使、雍国公",
        },
        {
          name: "安丙",
          shiji: "诛杀吴曦，平定张福",
          location: { lng: "106.748083", lat: "30.432504" },
          wenxian:
            "《宋史》卷四〇二：安丙，字子文，广安人。淳熙间进士，调大足县主簿。",
          time: "淳熙元年至十六年，1174-1189年",
          guanzhi: "四川宣抚使、知潭州、湖南安抚使、大足县主簿",
        },
        {
          name: "杨辅",
          shiji: "地方官员",
          location: { lng: "105.592898", lat: "30.532847" },
          wenxian:
            "《宋史》卷三六：戊午,总领四川财赋杨辅奏：已蠲东、西两川 畸零绢钱四十七万缗、激赏绢六万六千匹。诏奖之。自是岁以为例。",
          time: "绍熙三年，1192年",
          guanzhi: "兵部尚书兼侍读、以龙图阁学士知建康府兼江、淮制置使",
        },
        {
          name: "吴曦",
          shiji: "叛宋降金，自封蜀王",
          location: { lng: "105.737228", lat: "35.529388" },
          wenxian: "",
          time: "",
          guanzhi: "太尉、四川宣抚副使、自封蜀王",
        },
        {
          name: "杨巨源",
          shiji: "平叛吴曦乱贼",
          location: { lng: "105.826693", lat: "32.432302" },
          wenxian: "",
          time: "",
          guanzhi: "四川宣抚副使、兼陕西、河东招抚使",
        },
        {
          name: "吴玠",
          shiji: "抗击金军，保全蜀地",
          location: { lng: "105.732556", lat: "35.521976" },
          wenxian:
            "《宋史》卷三九：“（八月）乙未，罢四川宣、制司所补官。”此乃指吴玠、吴磷兄弟等人守蜀及吴曦未叛时以“四川宣抚司”和“四川制置司”以及“四川安抚司”之任，为应付军情，简化程式，代朝廷而任命的蜀地及甘陕地区地方官员。",
          time: "嘉定七年，1214年",
          guanzhi: "四川宣抚司、四川制置司、四川安抚司",
        },
        {
          name: "吴璘",
          shiji: "抗击金军，保全蜀地",
          location: { lng: "105.720921", lat: "35.517771" },
          wenxian:
            "《宋史》卷三九：“（八月）乙未，罢四川宣、制司所补官。”此乃指吴玠、吴磷兄弟等人守蜀及吴曦未叛时以“四川宣抚司”和“四川制置司”以及“四川安抚司”之任，为应付军情，简化程式，代朝廷而任命的蜀地及甘陕地区地方官员。",
          time: "嘉定七年，1214年",
          guanzhi: "四川宣抚司、四川制置司、四川安抚司",
        },
        {
          name: "崔与之",
          shiji: "地方官员",
          location: { lng: "113.810860", lat: "23.261141" },
          wenxian:
            "《宋史》卷四○六《崔与之传》载：“崔与之字正子，广州人。…召为礼部尚书，不拜，便道还广。蜀人思之，肖其像于成都仙游阁，以配张咏、赵，名三贤祠。……薨时年八十有二，遗戒不得作佛事。”自开禧至嘉定年间，大足地区几无石刻开凿，或与安丙、崔与之等制置使不好佛事有关。",
          time: "嘉定十七年，1224年",
          guanzhi: "四川制置使、礼部尚书",
        },
        {
          name: "赵彦吶",
          shiji: "地方官员",
          location: { lng: "103.958013", lat: "30.990165" },
          wenxian:
            "《宋史》卷四一：赵彦呐直龙图阁、四川安抚制置副使、知兴元府、利路安抚使，安癸仲户部郎中、 总领四川财赋。",
          time: "绍定四年，1231年",
          guanzhi:
            "直龙图阁、四川安抚制置副使、知兴元府、利路安抚使，安癸仲户部郎中、 总领四川财赋",
        },
        {
          name: "李埴",
          shiji: "地方官员",
          location: { lng: "103.519778", lat: "30.010296" },
          wenxian:
            "《宋史》卷四一：“戊寅，以李埴为焕章阁直学士、四川制置使、知成都府……”",
          time: "绍定四年，1231年",
          guanzhi: "焕章阁直学士、四川制置使、知成都府",
        },
        {
          name: "王象之",
          shiji: "成书",
          location: { lng: "120.441185", lat: "29.052781" },
          wenxian:
            "所著《舆地纪胜》卷161《昌州》条中的记载:“宝峰山,在大足县东三十里,有龛岩。道者赵智凤修行之所。”",
          time: "宝庆3年，1227年",
          guanzhi: "知县，文人",
        },
        {
          name: "洪咨夔",
          shiji: "友",
          location: { lng: "120.151457", lat: "30.290905" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞夷简",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "104.147700", lat: "29.998850" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞兟",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "117.486307", lat: "30.210314" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "真德秀",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "118.532804", lat: "27.924140" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞刚简",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "103.835817", lat: "30.038830" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞方简",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "103.839117", lat: "30.039640" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "崔与之",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "113.810860", lat: "23.261141" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "安丙",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "106.748083", lat: "30.432504" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "安癸仲",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "104.282175", lat: "30.973974" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "李埴",
          shiji: "为Y之建筑物题咏、记、命名",
          location: { lng: "103.521214", lat: "30.012725" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "张浚",
          shiji: "为Y作祠记",
          location: { lng: "104.194842", lat: "31.340945" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞允文",
          shiji: "为Y作祠记",
          location: { lng: "104.148101", lat: "29.997858" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "赵彦吶",
          shiji: "为Y作墓志铭",
          location: { lng: "103.958013", lat: "30.990165" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "宇文绍节",
          shiji: "为Y作哀辞 [并入167]",
          location: { lng: "103.922311", lat: "30.574446" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "叶适",
          shiji: "为Y作祭文",
          location: { lng: "120.670068", lat: "27.998155" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "李壁",
          shiji: "为Y作祭文",
          location: { lng: "103.517904", lat: "30.019315" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "杨辅",
          shiji: "为Y作祭文",
          location: { lng: "105.571792", lat: "30.512969" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "方岳",
          shiji: "祭文由Y所作",
          location: { lng: "117.737785", lat: "29.839115" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "李鏐",
          shiji: "为Y作字说、名述",
          location: { lng: "103.517392", lat: "30.017315" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "吴泳",
          shiji: "被致书由Y",
          location: { lng: "116.062269", lat: "27.764062" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "书跋由Y所作",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "吴玠",
          shiji: "兄",
          location: { lng: "105.732556", lat: "35.521976" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "杨从义",
          shiji: "部将为Y",
          location: { lng: "107.400737", lat: "34.521218" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "为Y之收藏作跋",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian: "跋吴武安所得高孝两朝宸翰(鹤山大全集65/1下)。",
          time: "",
          guanzhi: "",
        },
        {
          name: "张浚",
          shiji: "为Y之部将",
          location: { lng: "104.194842", lat: "31.340945" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "杨从义",
          shiji: "部将为Y",
          location: { lng: "107.400737", lat: "34.521218" },
          wenxian: "凤翔天兴人 靖康元年应募 隶吴玠麾下 补进武校尉 继隶宣抚吴璘",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "书跋由Y所作",
          location: { lng: "103.506498", lat: "30.196789" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "吴泳",
          shiji: "传记作者为Y",
          location: { lng: "116.062269", lat: "27.764062" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "安丙",
          shiji: "致书Y",
          location: { lng: "106.748083", lat: "30.432504" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "吴泳",
          shiji: "被致书由Y",
          location: { lng: "116.062269", lat: "27.764062" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "刘克庄",
          shiji: "祭文由Y所作",
          location: { lng: "119.009357", lat: "25.429482" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "程珌",
          shiji: "书跋由Y所作",
          location: { lng: "118.199179", lat: "29.789095" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "方岳",
          shiji: "书跋由Y所作",
          location: { lng: "117.737785", lat: "29.839115" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "建筑物得到Y的题咏、记、命名",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "洪咨夔",
          shiji: "建筑物得到Y的题咏、记、命名",
          location: { lng: "120.151457", lat: "30.290905" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "刘宰",
          shiji: "同道",
          location: { lng: "119.597897", lat: "31.723247" },
          wenxian:
            "时相收召誉望略尽 所不能举者 宰与崔与之耳 隐处三十年 于书无所不读",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞夷简",
          shiji: "孙",
          location: { lng: "104.147700", lat: "29.998850" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞刚简",
          shiji: "孙",
          location: { lng: "103.835817", lat: "30.038830" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞方简",
          shiji: "孙",
          location: { lng: "103.839117", lat: "30.039640" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "虞兟",
          shiji: "曾孙; 重孙",
          location: { lng: "117.486307", lat: "30.210314" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "书跋由Y所作",
          location: { lng: "103.506498", lat: "30.196789" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "张浚",
          shiji: "被致书由Y",
          location: { lng: "104.194842", lat: "31.340945" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "蔡戡",
          shiji: "被致书由Y",
          location: { lng: "118.691601", lat: "25.362094" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "吴曦",
          shiji: "反对/攻讦",
          location: { lng: "105.737228", lat: "35.529388" },
          wenxian: "登四川类试第 少以材称 吴曦叛 遣将守夔 彦吶结义士暗杀之",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "墓志铭由Y所作",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "李壁",
          shiji: "兄",
          location: { lng: "103.517904", lat: "30.019315" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "李鏐",
          shiji: "子",
          location: { lng: "103.517392", lat: "30.017315" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "建筑物得到Y的题咏、记、命名",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "叶适",
          shiji: "建筑物得到Y的题咏、记、命名",
          location: { lng: "120.670068", lat: "27.998155" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "刘宰",
          shiji: "建筑物得到Y的题咏、记、命名",
          location: { lng: "119.597897", lat: "31.723247" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "蔡戡",
          shiji: "为Y所著书作序",
          location: { lng: "118.691601", lat: "25.362094" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "王象之",
          shiji: "为Y所著书作序",
          location: { lng: "119.654061", lat: "29.084097" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "真德秀",
          shiji: "书跋由Y所作",
          location: { lng: "118.532804", lat: "27.924140" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "刘克庄",
          shiji: "祭文由Y所作",
          location: { lng: "119.009357", lat: "25.429482" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "程珌",
          shiji: "祭文由Y所作",
          location: { lng: "118.199179", lat: "29.789095" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "吴泳",
          shiji: "被致书由Y",
          location: { lng: "116.062269", lat: "27.764062" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "李埴",
          shiji: "书序由Y所作",
          location: { lng: "103.519778", lat: "30.010296" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "安癸仲",
          shiji: "子",
          location: { lng: "104.282175", lat: "30.973974" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "杨辅",
          shiji: "同道",
          location: { lng: "105.571792", lat: "30.512969" },
          wenxian:
            "早择人望以镇方面 累官至宝谟阁学士、四川制置使 安丙、杨巨源密谋诛吴曦 辅请以事任付丙 复除兵部尚书",
          time: "",
          guanzhi: "",
        },
        {
          name: "杨巨源",
          shiji: "同道",
          location: { lng: "104.084805", lat: "30.664370" },
          wenxian:
            "吴曦叛 阴有讨贼志 遂与安丙、李好义等合谋杀曦 丙奏功 以巨源为第一",
          time: "",
          guanzhi: "",
        },
        {
          name: "宇文绍节",
          shiji: "被Y欣赏/器重",
          location: { lng: "103.922311", lat: "30.574446" },
          wenxian:
            "召为兵部侍郎 后吴曦据蜀 绍节谓安丙素怀忠义 授以密旨 必能讨贼成功",
          time: "",
          guanzhi: "",
        },
        {
          name: "崔与之",
          shiji: "被致书由Y",
          location: { lng: "113.810860", lat: "23.261141" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
        {
          name: "魏了翁",
          shiji: "答Y书",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian: "",
          time: "",
          guanzhi: "",
        },
      ],
      guanyuan: [
        {
          name: "魏了翁（1178-1237）",
          shiji: "题字",
          location: { lng: "103.512036", lat: "30.193446" },
          wenxian:
            "大佛湾7号妙智宝塔下壁,摩崖作匾形,篆书横题“毗卢庵”三字,署“朝散大夫守太常少卿兼国史院编修实录院检讨官魏了翁书”，29号圆觉洞甬道左壁有竖刻三字“宝顶山”,署“临邛魏了翁书”",
          time: "嘉定十六年，1223年",
          guanzhi: "吏部尚书",
        },
        {
          name: "杜孝严（1178~1237）",
          shiji: "题字",
          location: { lng: "105.312454", lat: "29.920127" },
          wenxian:
            "大佛湾4号广大宝楼阁图下壁,摩崖作匾形,楷书横题“宝顶山”三字,署“朝请大夫权尚书兵部侍郎兼同修国史兼实录院同修撰杜孝严书”",
          time: "嘉定十六年，1223年",
          guanzhi: "兵部侍郎、礼部尚书",
        },
        {
          name: "覃怀孝",
          shiji: "题字、捐银",
          location: { lng: "105.715939", lat: "29.705660" },
          wenxian:
            "捐银八百两，29号圆觉洞甬道右壁魏了翁书“宝顶山”三字之左上方,楷字竖刻三行六字“报恩圆觉道场”,字大小与“宝顶山”字仿佛而微小,字间略密;署“朝散大夫知昌州军事借紫覃怀孝浚岗书”",
          time: "嘉定十六年，1223年略前",
          guanzhi: "朝散大夫知昌州军事借紫",
        },
        {
          name: "宇文屺",
          shiji: "题字",
          location: { lng: "105.715761", lat: "29.701926" },
          wenxian:
            "大佛湾5号华严三圣龛下的宇文妃《诗碑并序》，全文云“剸云技巧欢群目,今(当作“经”)贝周遭见化城。大孝不移神所与,笙钟麟甲四时鸣。宝顶赵智宗刻石追孝,心可取焉。以成绝句,立诸山阿。笙钟麟甲事见坡诗,谓为神功阿护之意也。朝散郎知昌州军州事兼管内劝农事□□二江宇文屺书。”",
          time: "嘉定十六年，1223年",
          guanzhi: "昌州刺史",
        },
        {
          name: "席存著",
          shiji: "题字",
          location: { lng: "105.723770", lat: "29.698627" },
          wenxian: "残碑存小佛湾七佛龛壁中下部,现仅存“承直郎”三字。",
          time: "嘉熙年间，1237—1240年",
          guanzhi: "承直郎昌州军事判官",
        },
        {
          name: "姚宍恭",
          shiji: "题字、捐银",
          location: { lng: "106.577052", lat: "29.557259" },
          wenxian:
            "捐银一千五百两，大佛湾14号毗卢洞门上摩崖作匾形,楷体横书“毗卢道场”,署“朝散郎知重庆军府事姚宍恭书”",
          time: "1190-1240年",
          guanzhi: "朝散郎知重庆军府事",
        },
        {
          name: "虞允文（1110-1174）",
          shiji: "采石之战大败金军",
          location: { lng: "104.134082", lat: "29.995630" },
          wenxian:
            "《续通鉴》卷一四四：（二月）酉，四川宣抚使、雍国公虞允文薨。......寻赠太傅，谥忠肃。",
          time: "淳熙元年，1173年",
          guanzhi: "左丞相、四川宣抚使、雍国公",
        },
        {
          name: "黄图南",
          shiji: "地方官员",
          location: { lng: "105.715487", lat: "29.696472" },
          wenxian:
            "《宋会要辑稿·职官七二》：（正月）二十五日，朝奉郎、知昌州黄南，朝请郎、知合州何正仲并放罢。坐不恤旱伤，为漕臣按劾。",
          time: "淳熙九年，1182年",
          guanzhi: "朝奉郎、知昌州",
        },
        {
          name: "何正仲",
          shiji: "地方官员",
          location: { lng: "106.276130", lat: "29.972084" },
          wenxian:
            "《宋会要辑稿·职官七二》：（正月）二十五日，朝奉郎、知昌州黄南，朝请郎、知合州何正仲并放罢。坐不恤旱伤，为漕臣按劾。",
          time: "淳熙九年，1182年",
          guanzhi: "朝请郎、知合州",
        },
        {
          name: "尹商参",
          shiji: "地方官员",
          location: { lng: "106.633531", lat: "30.455671" },
          wenxian:
            "《宋会要辑稿·职官七二》：（九月）十三日，知广安军尹商参、知昌州杨已千并放罢。皆已根究公事不当，为本路漕臣按奏故也。",
          time: "淳熙十一年，1184年",
          guanzhi: "知广安军",
        },
        {
          name: "杨已千",
          shiji: "地方官员",
          location: { lng: "105.714775", lat: "29.694702" },
          wenxian:
            "《宋会要辑稿·职官七二》：（九月）十三日，知广安军尹商参、知昌州杨已千并放罢。皆已根究公事不当，为本路漕臣按奏故也。",
          time: "淳熙十一年，1184年",
          guanzhi: "知昌州",
        },
        {
          name: "王容（1163-1260）",
          shiji: "地方官员，状元",
          location: { lng: "112.550581", lat: "27.718313" },
          wenxian:
            "《宋史》卷三五：戊子，赐礼部进士王容以下四 百三十五人及第、出身。六月戊寅，以久旱，班画龙祈雨法。",
          time: "淳熙十四年，1187年",
          guanzhi: "校书郎、秘书郎、著作郎、修国史、实录院修撰、实录院检讨官",
        },
        {
          name: "安丙（1148-1221）",
          shiji: "诛杀吴曦，平定张福",
          location: { lng: "106.748083", lat: "30.432504" },
          wenxian:
            "《宋史》卷四〇二：安丙，字子文，广安人。淳熙间进士，调大足县主簿。",
          time: "淳熙元年至十六年，1174-1189年",
          guanzhi: "四川宣抚使、知潭州、湖南安抚使、大足县主簿",
        },
        {
          name: "杨辅（？-1209）",
          shiji: "地方官员",
          location: { lng: "105.592898", lat: "30.532847" },
          wenxian:
            "《宋史》卷三六：戊午,总领四川财赋杨辅奏：已蠲东、西两川 畸零绢钱四十七万缗、激赏绢六万六千匹。诏奖之。自是岁以为例。",
          time: "绍熙三年，1192年",
          guanzhi: "兵部尚书兼侍读、以龙图阁学士知建康府兼江、淮制置使",
        },
        {
          name: "王莘",
          shiji: "地方官员",
          location: { lng: "106.110698", lat: "30.837793" },
          wenxian:
            "《续通鉴》卷一五五：辛酉，命：“漕臣无出身者,勿差官考试。”先是果州学官王莘，被檄考试昌州，发策以王凤、牛仙客为问。礼部摘其语以告韩侂胄，谓其讥刺；侂胄怒，遂罢莘官。",
          time: "庆元五年，1199年",
          guanzhi: "果州学官，昌州考官",
        },
        {
          name: "程松",
          shiji: "地方官员",
          location: { lng: "117.847362", lat: "30.639230" },
          wenxian:
            "《宋史》卷三八：三月癸巳, 以程松为四川宣抚使, 吴曦为宣抚副使。 （十二月）癸酉，吴曦始自称蜀王。乙亥，四川宣抚使",
          time: "开禧二年，1206年",
          guanzhi: "同知枢密院事、资政殿大学士、知成都府、四川宣抚使",
        },
        {
          name: "吴曦（1162-1207）",
          shiji: "叛宋降金，自封蜀王",
          location: { lng: "105.737228", lat: "35.529388" },
          wenxian:
            "《宋史》卷三八：三月癸巳, 以程松为四川宣抚使, 吴曦为宣抚副使。 （十二月）癸酉，吴曦始自称蜀王。乙亥，四川宣抚使",
          time: "开禧二年，1206年",
          guanzhi: "太尉、四川宣抚副使、自封蜀王",
        },
        {
          name: "李好义（1169-1207）",
          shiji: "平叛吴曦乱贼",
          location: { lng: "109.586506", lat: "34.955855" },
          wenxian:
            "《宋史》卷三八：四川宣抚副使司随军转运安丙及兴州中军正将李好义、监四川总领所兴州合江仓杨 巨源等共诛吴曦，传首诣行在，献于庙社，枭三日，四川平。",
          time: "开禧三年，1207年",
          guanzhi: "中军正将",
        },
        {
          name: "杨巨源（1176—1207）",
          shiji: "平叛吴曦乱贼",
          location: { lng: "105.826693", lat: "32.432302" },
          wenxian:
            "《宋史》卷三八：四川宣抚副使司随军转运安丙及兴州中军正将李好义、监四川总领所兴州合江仓杨 巨源等共诛吴曦，传首诣行在，献于庙社，枭三日，四川平。",
          time: "开禧三年，1207年",
          guanzhi: "四川宣抚副使、兼陕西、河东招抚使",
        },
        {
          name: "曹格",
          shiji: "地方官员",
          location: { lng: "113.118056", lat: "29.349761" },
          wenxian:
            "《宋会要辑稿·职官七四》：知岳州曹格、知昌州王騊并与祠禄。以监察御史范之柔言:「格昏耄已甚,郡事不理;騊实历四考,便任专城。」",
          time: "嘉定三年，1210年",
          guanzhi: "知岳州",
        },
        {
          name: "王騊",
          shiji: "地方官员",
          location: { lng: "105.709350", lat: "29.695414" },
          wenxian:
            "《宋会要辑稿·职官七四》：知岳州曹格、知昌州王騊并与祠禄。以监察御史范之柔言:「格昏耄已甚,郡事不理;騊实历四考,便任专城。」",
          time: "嘉定三年，1210年",
          guanzhi: "知昌州",
        },
        {
          name: "吴玠（1093-1139）",
          shiji: "抗击金军，保全蜀地",
          location: { lng: "105.732556", lat: "35.521976" },
          wenxian:
            "《宋史》卷三九：“（八月）乙未，罢四川宣、制司所补官。”此乃指吴玠、吴磷兄弟等人守蜀及吴曦未叛时以“四川宣抚司”和“四川制置司”以及“四川安抚司”之任，为应付军情，简化程式，代朝廷而任命的蜀地及甘陕地区地方官员。",
          time: "嘉定七年，1214年",
          guanzhi: "四川宣抚司、四川制置司、四川安抚司",
        },
        {
          name: "吴磷（1102-1167）",
          shiji: "抗击金军，保全蜀地",
          location: { lng: "105.720921", lat: "35.517771" },
          wenxian:
            "《宋史》卷三九：“（八月）乙未，罢四川宣、制司所补官。”此乃指吴玠、吴磷兄弟等人守蜀及吴曦未叛时以“四川宣抚司”和“四川制置司”以及“四川安抚司”之任，为应付军情，简化程式，代朝廷而任命的蜀地及甘陕地区地方官员。",
          time: "嘉定七年，1214年",
          guanzhi: "四川宣抚司、四川制置司、四川安抚司",
        },
        {
          name: "赵方（？-1221）",
          shiji: "帅边十年，使京西免遭金人蹂躏",
          location: { lng: "112.868268", lat: "27.230291" },
          wenxian:
            "《宋史》卷四〇：（五月）癸卯，赵方请下诏伐金，遂传檄招谕中原官吏军民。 （十一月）癸亥，金凤翔副统军完颜赟以步骑万人犯四川。",
          time: "嘉定十年，1217年",
          guanzhi: "端明殿学士、正议大夫",
        },
        {
          name: "王逸",
          shiji: "地方官员",
          location: { lng: "105.833139", lat: "32.429375" },
          wenxian:
            "《宋史》卷四〇：戊子，利州统制王逸等率忠义人复皂郊，金副统军完颜赟、包长寿遁去，沔州军士郭雄追斩赟首，长寿仅以身免。己丑，沔州都统刘昌祖至皂郊。辛卯，忠义人十万余出攻秦州…军大溃。”",
          time: "嘉定十一年，1218年",
          guanzhi: "利州统制",
        },
        {
          name: "张福",
          shiji: "在四川起义",
          location: { lng: "107.029357", lat: "33.078739" },
          wenxian:
            "《宋史》卷四〇：癸亥，兴元军士张福、莫简等叛乱，以红巾为标记。",
          time: "嘉定十二年，1219年",
          guanzhi: "军士",
        },
        {
          name: "莫简",
          shiji: "在四川起义",
          location: { lng: "107.026909", lat: "33.076913" },
          wenxian:
            "《宋史》卷四〇：癸亥，兴元军士张福、莫简等叛乱，以红巾为标记。",
          time: "嘉定十二年，1219年",
          guanzhi: "军士",
        },
        {
          name: "崔与之（1158-1240）",
          shiji: "地方官员",
          location: { lng: "113.810860", lat: "23.261141" },
          wenxian:
            "《宋史》卷四○六《崔与之传》载：“崔与之字正子，广州人。…召为礼部尚书，不拜，便道还广。蜀人思之，肖其像于成都仙游阁，以配张咏、赵，名三贤祠。……薨时年八十有二，遗戒不得作佛事。”自开禧至嘉定年间，大足地区几无石刻开凿，或与安丙、崔与之等制置使不好佛事有关。",
          time: "嘉定十七年，1224年",
          guanzhi: "四川制置使、礼部尚书",
        },
        {
          name: "朱端常",
          shiji: "地方官员",
          location: { lng: "120.086823", lat: "30.894348" },
          wenxian:
            "《宋史》卷四一：甲申,朱端常言魏了翁封章谤讪,真德秀奏札诬诋。诏魏了翁落职,夺三秩、靖州居住;真德秀落职罢祠。",
          time: "宝庆元年，1225年",
          guanzhi: "兵部尚书、修国史",
        },
        {
          name: "赵彦呐",
          shiji: "地方官员",
          location: { lng: "103.958013", lat: "30.990165" },
          wenxian:
            "《宋史》卷四一：赵彦呐直龙图阁、四川安抚制置副使、知兴元府、利路安抚使，安癸仲户部郎中、 总领四川财赋。",
          time: "绍定四年，1231年",
          guanzhi:
            "直龙图阁、四川安抚制置副使、知兴元府、利路安抚使，安癸仲户部郎中、 总领四川财赋",
        },
        {
          name: "李埴（1161-1238）",
          shiji: "地方官员",
          location: { lng: "103.519778", lat: "30.010296" },
          wenxian:
            "《宋史》卷四一：“戊寅，以李埴为焕章阁直学士、四川制置使、知成都府……”",
          time: "绍定四年，1231年",
          guanzhi: "焕章阁直学士、四川制置使、知成都府",
        },
        {
          name: "赵范（1183-1240）",
          shiji: "将领",
          location: { lng: "112.870271", lat: "27.233251" },
          wenxian:
            "《宋史》卷四一：（八月）乙亥，以赵范为京河关陕宣抚使、知开封府、东京留守，赵葵京河治置使、知应天府、南京留守，全子才关陕制置使、知河南府、西京留守。",
          time: "端平元年，1234年",
          guanzhi: "京河关陕宣抚使、知开封府、东京留守",
        },
        {
          name: "赵葵（1168-1266）",
          shiji: "大败金兵，平定李全",
          location: { lng: "112.867897", lat: "27.234688" },
          wenxian:
            "《宋史》卷四一：（八月）乙亥，以赵范为京河关陕宣抚使、知开封府、东京留守，赵葵京河治置使、知应天府、南京留守，全子才关陕制置使、知河南府、西京留守。",
          time: "端平元年，1234年",
          guanzhi:
            "京河治置使、知应天府、南京留守，全子才关陕制置使、知河南府、西京留守",
        },
        {
          name: "库端",
          shiji: "无",
          location: { lng: "99.030769", lat: "30.718264" },
          wenxian:
            "《续通鉴》卷一六八：（九月）壬午，蒙古兵遂长驱入蜀。（十月）丙午，蒙古安笃尔招徠吐蕃诸部族，赐以很符，略定龙州，遂与库端合兵，进破成都。会闻皇子库春薨，库端旋弃成都而去。",
          time: "端平二年，公元1235年",
          guanzhi: "无",
        },
                {
          name: "冯楫",
          shiji: "大足多宝塔供养人",
          location: { lng: "105.707570", lat: "30.757575" },
          wenxian:
            "造大藏经四十八部，小藏四大部经(禅林中以《华严经》、《宝积经》、《般若经》、《涅槃经》等四部八四一卷为四大部经，大足多宝塔供养人",
          time: "",
          guanzhi: "潼川府路兵马都钤辖、泸南沿边安抚使、知泸州军州事提举学事",
        },
      ],
      gzz: [
        {
          name: "王象之（1163-1230）",
          shiji: "成书",
          location: {
            lat: 29.060103175107464,
            lng: 120.45651305177348,
          },
          wenxian:
            "所著《舆地纪胜》卷161《昌州》条中的记载:“宝峰山,在大足县东三十里,有龛岩。道者赵智凤修行之所。”",
          time: "宝庆3年，1227年",
          guanzhi: "知县，文人",
        },
        {
          name: "曹琼 明朝",
          shiji: "立碑",
          location: {
            lat: 30.693857943819243,
            lng: 117.57449037048667,
          },
          wenxian:
            "《恩荣圣寿寺碑》中记：相传为毗卢氏脱俗炼形之所也……周遭凡六百尺, 悉镌天竺诸境及冥司判官罗汉千象……大意宛然, 景迹非常, 金碧烂熳, 天然工巧, 殆有神妙, 皆毗卢之功也。寺因著名朝廷久也。今考其书, 毗卢佛 (赵智凤) 在世, 托生于本邑米粮里赵廷富之家, 事母最孝。母尝抱疾, 乃礼求于师, 将委身以救, 母疾以愈。他凡可以济人利物者, 靡所不至, 清苦七十余年, 始幻化超如来地之上品观, 此又未必无据也。",
          time: "弘治17年，1504年",
          guanzhi: "",
        },
        {
          name: "李德 清朝",
          shiji: "成书",
          location: {
            lat: 29.713113506076837,
            lng: 105.72840462545042,
          },
          wenxian:
            "李德于乾隆十五年（1750年）刊刻完成《大足县志》，之后，嘉庆、道光、光绪各朝不断加以增订续修。他所著《大足县志·隐逸仙释》中转载南宋嘉熙年间席存著铭刻残文如下:赵本尊名智风, 绍兴庚辰年 (1160年) 出生于米粮之沙溪。五岁入山, 持念经咒十有六年。西往弥牟, 复回山, 修建本尊殿, 传授柳本尊法旨, 遂名其山曰宝鼎。舍耳炼顶报亲, 散施符法救民。尝垂戒曰:“热铁轮里翻筋斗, 猛火炉里打倒悬。”",
          time: "乾隆15年，1750年",
          guanzhi: "知县",
        },
        {
          name: "张澍（1781-1847）",
          shiji: "成书",
          location: {
            lat: 37.934121948376344,
            lng: 102.64857479650965,
          },
          wenxian:
            "嘉庆二十三年(1818年)，代理知县张澍编纂的嘉庆《大足县志》被梁启超称为良志。他在大足半年时间的任期内，共写有《前游宝顶记》、《后游宝顶记》、《古文孝经碑考》等20余篇文章，多具有学术价值，这些文章其后大多收载于《大足金石录》中。《大足金石录》共收录碑刻铭文、题记等四十五则，末尾附录有“大足人物志”，有赵智凤等23位大足籍人物的生平简介。",
          time: "嘉庆23年，1818年",
          guanzhi: "文献学家，学术大师，知县",
        },
        {
          name: "晴舟 清朝",
          shiji: "立碑",
          location: {
            lat: 29.754546188554347,
            lng: 105.80135377012786,
          },
          wenxian:
            "《立实录碑记》记载:“先宝顶旧规, 租谷仅两百余石, 僧以寺大僧多, 朝参络绎, 田妏租少不足于用, 况前僧逋欠者垒千, 其何能偿, 于是始有加租之议。……屡年上军需钱不具数。”由此似可揣测, 赵智凤其时, 除了自身作为僧人要交纳度牒费外, 其苦心经营扩建的寺院和庞大的造像工程的费用必使他聚毕生之力才能奉之、成之。",
          time: "乾隆年间",
          guanzhi: "僧人",
        },
        {
          name: "爱新觉罗·弘历（1711—1799）",
          shiji: "微服私访，题字",
          location: {
            lat: 39.910924547299565,
            lng: 116.4133836971231,
          },
          wenxian:
            "乾隆三十二年夏，乾隆皇帝与6名侍卫和1名书写记录人员来到重庆微服私访，并在宝顶山题下“天下第一山”五字",
          time: "乾隆年间",
          guanzhi: "皇帝",
        },
      ],
      sc: [
        {
          name: "柳本尊（855-)",
          shiji: "暂无",
          location: {
            lat: 29.552106,
            lng: 103.765568,
          },
          wenxian: "暂无",
          time: "暂无",
          guanzhi: "暂无",
        },
      ],
      jt: [
        {
          name: "赵延富",
          shiji: "父亲",
          location: { lng: "105.711791", lat: "29.696220" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "不详",
        },
        {
          name: "伏秀",
          shiji: "母亲",
          location: { lng: "105.712940", lat: "29.696901" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "不详",
        },
        {
          name: "伏花",
          shiji: "表姐",
          location: { lng: "105.719041", lat: "29.698025" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "不详",
        },
        {
          name: "伏小八",
          shiji: "舅舅",
          location: { lng: "105.719210", lat: "29.696438" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "不详",
        },
        {
          name: "黎得叙",
          shiji: "干爹",
          location: { lng: "105.720657", lat: "29.699724" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "不详",
        },
      ],
      ws: [
        {
          name: "文昌",
          shiji: "大钟寺",
          location: { lng: "105.336770", lat: "30.100136" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第一代",
        },
        {
          name: "文惟一",
          shiji: "石门山",
          location: { lng: "105.338837", lat: "30.101341" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第二代",
        },
        {
          name: "文唯简",
          shiji: "石篆山",
          location: { lng: "105.337748", lat: "30.094469" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第二代",
        },
        {
          name: "文居道",
          shiji: "石门山",
          location: { lng: "105.344606", lat: "30.101067" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第三代",
        },
        {
          name: "文居政",
          shiji: "石门山",
          location: { lng: "105.341246", lat: "30.101361" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第三代",
        },
        {
          name: "文居用",
          shiji: "石篆山",
          location: { lng: "105.345203", lat: "30.105543" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第三代",
        },
        {
          name: "文居安",
          shiji: "石篆山",
          location: { lng: "105.341357", lat: "30.106826" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第三代",
        },
        {
          name: "文居礼",
          shiji: "石篆山",
          location: { lng: "105.333655", lat: "30.104429" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第三代",
        },
        {
          name: "文仲璋",
          shiji: "妙高山",
          location: { lng: "105.331898", lat: "30.101332" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第四代",
        },
        {
          name: "文仲利",
          shiji: "资中东岩",
          location: { lng: "105.344249", lat: "30.110595" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第四代",
        },
        {
          name: "文仲宁",
          shiji: "资中东岩",
          location: { lng: "105.344703", lat: "30.108835" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第四代",
        },
        {
          name: "文锈",
          shiji: "玉滩千佛洞",
          location: { lng: "105.333601", lat: "30.090710" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第五代",
        },
        {
          name: "文珠",
          shiji: "妙高山",
          location: { lng: "105.344510", lat: "30.094466" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第五代",
        },
        {
          name: "文凯",
          shiji: "玉滩千佛洞",
          location: { lng: "105.346406", lat: "30.100154" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第五代",
        },
        {
          name: "文玠",
          shiji: "妙高山",
          location: { lng: "105.352844", lat: "30.111027" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第五代",
        },
        {
          name: "文珆",
          shiji: "佛安桥",
          location: { lng: "105.351548", lat: "30.098692" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第五代",
        },
        {
          name: "文艺",
          shiji: "灵岩寺",
          location: { lng: "105.349789", lat: "30.093130" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第六代",
        },
        {
          name: "文孟周",
          shiji: "佛安桥",
          location: { lng: "105.335613", lat: "30.097246" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第六代",
        },
        {
          name: "文孟通",
          shiji: "佛安岩",
          location: { lng: "105.364636", lat: "30.094814" },
          wenxian: "不详",
          time: "不详",
          guanzhi: "文氏工匠第六代",
        },
      ],
      three1: [{'name': '史绳祖', 'shiji': '魏了翁门人为Y', 'location': {'lng': '103.830863', 'lat': '30.040704'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '许玠', 'shiji': '魏了翁门人为Y', 'location': {'lng': '115.071879', 'lat': '34.445656'}, 'wenxian': '', 'time': '', 'guanzhi': '司户参军', 'shqf': '', 'rs': ''}, {'name': '税与权', 'shiji': '魏了翁门人为Y', 'location': {'lng': '104.075931', 'lat': '30.651651'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '思想家', 'rs': ''}, {'name': '高道充', 'shiji': '魏了翁为Y之学生', 'location': {'lng': '103.506498', 'lat': '30.196788'}, 'wenxian': '宋人传记资料索引：与绍熙嘉泰间宾荐 士之请益者踵接 魏了翁尝受学焉 嘉定十三年特奏名 授贵州文学', 'time': '', 'guanzhi': '流外栓、县主簿', 'shqf': '', 'rs': ''}, {'name': '杜希仲', 'shiji': '魏了翁为Y之学生', 'location': {'lng': '103.510748', 'lat': '30.190108'}, 'wenxian': '宋人传记资料索引：崇尚礼义之学 授诸子学躬自程督 魏了翁自幼与内外群从兄弟皆从之游 卒年六十三', 'time': '', 'guanzhi': '', 'shqf': '隐士', 'rs': ''}, {'name': '何普', 'shiji': '魏了翁为Y之学生', 'location': {'lng': '103.515241', 'lat': '30.199438'}, 'wenxian': '宋人传记资料索引：笔耕以养父母 为乡先生 魏了翁幼从之学 后以特奏名入等 官荣州司户参军', 'time': '1142-1208', 'guanzhi': '司法参军、司户参军', 'shqf': '', 'rs': ''}, {'name': '牟子才', 'shiji': '魏了翁学生为Y', 'location': {'lng': '104.069490', 'lat': '29.650826'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、翰林学士、骑都尉、端明殿学士、资政殿学士、权礼部尚书、直学士院、知某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '郭黄中', 'shiji': '魏了翁学生为Y', 'location': {'lng': '103.463885', 'lat': '30.410675'}, 'wenxian': '宋人传记资料索引：邛州人 正孙子 尝往来魏了翁之门 为新都令 以学行着', 'time': '', 'guanzhi': '县令', 'shqf': '', 'rs': ''}, {'name': '蒋公顺', 'shiji': '魏了翁学生为Y', 'location': {'lng': '111.088540', 'lat': '25.950057'}, 'wenxian': '宋人传记资料索引：清湘人 精研义理之学 从魏了翁游者七年 所得益广 筑室湘源', 'time': '', 'guanzhi': '县尉', 'shqf': '', 'rs': ''}, {'name': '章寅臣', 'shiji': '魏了翁从Y游', 'location': {'lng': '103.506547', 'lat': '30.192060'}, 'wenxian': '', 'time': '1156-1225年', 'guanzhi': '县丞、县主簿', 'shqf': '', 'rs': '进士'}, {'name': '滕处厚', 'shiji': '魏了翁从Y游', 'location': {'lng': '111.072340', 'lat': '25.929549'}, 'wenxian': '宋人传记资料索引：清湘人 邃于春秋 魏了翁迁渠阳 日往从游 了翁奇之', 'time': '', 'guanzhi': '县主簿', 'shqf': '', 'rs': ''}, {'name': '王德文', 'shiji': '魏了翁从游者为Y', 'location': {'lng': '120.585315', 'lat': '31.298886'}, 'wenxian': '', 'time': '1190-1246年', 'guanzhi': '县尉、承杰郎、承信郎、监酒、提干', 'shqf': '', 'rs': ''}, {'name': '唐季乙', 'shiji': '魏了翁从游者为Y', 'location': {'lng': '103.668995', 'lat': '30.631404'}, 'wenxian': '', 'time': '？-1217年', 'guanzhi': '某州学教授', 'shqf': '', 'rs': ''}, {'name': '饶延年', 'shiji': '魏了翁称道Y之节行', 'location': {'lng': '116.056598', 'lat': '27.762776'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '士人', 'rs': ''}, {'name': '史守道', 'shiji': '魏了翁其学为Y所宗', 'location': {'lng': '103.517919', 'lat': '30.013490'}, 'wenxian': '辞辨雄放 当时诸儒托周程诸儒先语以自标榜 守道所依惟魏了翁 赐同进士出身 嘉定十三年卒', 'time': '1173-1220年', 'guanzhi': '迪功郎', 'shqf': '', 'rs': ''}, {'name': '朱熹', 'shiji': '魏了翁私淑Y之学', 'location': {'lng': '117.861798', 'lat': '29.248086'}, 'wenxian': '', 'time': '1130-1200年', 'guanzhi': '提举、知某军事、安抚使、朝请郎、朝散郎、国公、太师、幕职官、兵部司郎中、武学博士、侍读、侍讲、宝文阁侍制、敷文阁侍制、焕章阁侍制', 'shqf': '', 'rs': '进士'}, {'name': '范荪', 'shiji': '魏了翁向Y问学', 'location': {'lng': '104.061424', 'lat': '30.659006'}, 'wenxian': '传张栻之学 讲学沧江书院 魏了翁初为考索记问之学 荪以敛华就实语之 累官宗正寺丞、知邛州', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '李坤臣', 'shiji': '论学', 'location': {'lng': '103.466215', 'lat': '30.408220'}, 'wenxian': '尤邃于易 三礼最该畅 魏了翁尝与之共相讨论 嘉定十四年卒 年五十四', 'time': '1168-1221年', 'guanzhi': '', 'shqf': '思想家', 'rs': ''}, {'name': '薛绂', 'shiji': '论学', 'location': {'lng': '103.677588', 'lat': '29.553581'}, 'wenxian': '因陛对极言韩侂冑之奸 坐劾去 与魏了翁讲明易学 着则书十卷 了翁叹服不逮', 'time': '', 'guanzhi': '上护军、某州学教授', 'shqf': '', 'rs': '进士'}, {'name': '范仲黼', 'shiji': '友', 'location': {'lng': '104.057654', 'lat': '30.650652'}, 'wenxian': '', 'time': '', 'guanzhi': '国子监博士、知某州军州事、秘书省著作郎、著作佐郎', 'shqf': '', 'rs': '进士'}, {'name': '李心传', 'shiji': '友', 'location': {'lng': '104.072912', 'lat': '29.650730'}, 'wenxian': '', 'time': '1167-1244年', 'guanzhi': '史馆校勘、尚书省工部侍郎', 'shqf': '史学家、校勘学家', 'rs': ''}, {'name': '洪咨夔', 'shiji': '友', 'location': {'lng': '120.151457', 'lat': '30.290905'}, 'wenxian': '', 'time': '1176-1236年', 'guanzhi': '朝请郎、翰林学士、轻车都尉、监察御史、端明殿学士、右承议郎、尚书省刑部尚书、银青光禄大夫、中书舍人、通判某州军州事、侍读、侍讲', 'shqf': '', 'rs': '进士'}, {'name': '苏振文', 'shiji': '友', 'location': {'lng': '105.571769', 'lat': '30.513540'}, 'wenxian': '', 'time': '？-1233年', 'guanzhi': '', 'shqf': '小学家、士人', 'rs': ''}, {'name': '林岊', 'shiji': '友', 'location': {'lng': '119.296841', 'lat': '26.081876'}, 'wenxian': '', 'time': '', 'guanzhi': '朝散大夫、知某县事、知某州军州事、提举常平', 'shqf': '', 'rs': '进士'}, {'name': '郑梦协', 'shiji': '友', 'location': {'lng': '118.245124', 'lat': '28.682055'}, 'wenxian': '玉山人 师事赵蕃 与魏了翁、真德秀厚 讲道最笃 刘宰尤称其文章', 'time': '', 'guanzhi': '秘阁修撰', 'shqf': '', 'rs': ''}, {'name': '宋慈', 'shiji': '辟', 'location': {'lng': '118.182036', 'lat': '26.637438'}, 'wenxian': '', 'time': '1183-1246年', 'guanzhi': '知某军事、朝奉郎、朝请大夫、朝议大夫、通判、县尉、知某县事、知某州军州事、县主簿、智焕章阁、直秘阁、经略安抚使', 'shqf': '', 'rs': '进士'}, {'name': '牟桂', 'shiji': '魏了翁被Y欣赏/器重', 'location': {'lng': '104.069750', 'lat': '29.651200'}, 'wenxian': '', 'time': '', 'guanzhi': '朝散郎、通议大夫、县尉、知某县事、知某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '吕夷简', 'shiji': '欣赏/器重', 'location': {'lng': '116.711051', 'lat': '32.709445'}, 'wenxian': '跋家季文守富顺日拒吴曦伪檄事(鹤山大全集63/10下)', 'time': '979-1044年', 'guanzhi': '参知政事、丞相、太师、太尉、节度使、国公、中书令、同中书门下平章事', 'shqf': '', 'rs': '进士'}, {'name': '李从周', 'shiji': '欣赏/器重', 'location': {'lng': '103.840692', 'lat': '30.053136'}, 'wenxian': '一云临邛人 所着字通 极为魏了翁所称许', 'time': '', 'guanzhi': '', 'shqf': '士人', 'rs': ''}, {'name': '方輗', 'shiji': '欣赏/器重', 'location': {'lng': '113.581234', 'lat': '28.701868'}, 'wenxian': '尤精通鉴 为人负气不屈 魏了翁以直养无害勗之 绍定六年卒 年五十', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '程掌', 'shiji': '欣赏/器重', 'location': {'lng': '103.829141', 'lat': '30.035585'}, 'wenxian': '吴门人 学于陆九渊之子持之 魏了翁称其识度器藻出于侪类 所交多天下贤士 对古今治忽', 'time': '', 'guanzhi': '观察推官、某州学教授', 'shqf': '思想家', 'rs': '进士'}, {'name': '徐清叟', 'shiji': '魏了翁得到Y的支持', 'location': {'lng': '118.533449', 'lat': '27.920425'}, 'wenxian': '邛州先茶记(鹤山大全集48/19)。', 'time': '', 'guanzhi': '安抚使、参知政事、朝奉郎、观文殿大学士殿中省尚辇奉御、殿中侍御史、太常寺博士、太常寺少卿、知某州军州事、著作佐郎、资政殿大学士', 'shqf': '', 'rs': '进士'}, {'name': '周敦颐', 'shiji': '魏了翁为Y乞某事', 'location': {'lng': '111.600796', 'lat': '25.526438'}, 'wenxian': '', 'time': '1017-1073年', 'guanzhi': '知某军事、大理寺丞、国公、县令、县主簿、秘书省正字、知某县事、知某州军州事', 'shqf': '良吏、思想家', 'rs': ''}, {'name': '曹友闻', 'shiji': '魏了翁为Y乞某事', 'location': {'lng': '106.087780', 'lat': '33.768826'}, 'wenxian': '', 'time': '？-1236年', 'guanzhi': '知某军事、承事郎、三公、知某州军州事、某州学教授、某军军学教授', 'shqf': '', 'rs': '进士'}, {'name': '李安国', 'shiji': '魏了翁为Y乞某事', 'location': {'lng': '115.858197', 'lat': '28.682892'}, 'wenxian': '', 'time': '', 'guanzhi': '尚书省户部侍郎、知某军事、知某州军州事、总领官、湖广总领', 'shqf': '诗人、财政官员', 'rs': ''}, {'name': '别之杰', 'shiji': '魏了翁为Y乞某事', 'location': {'lng': '114.316223', 'lat': '30.554235'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、安抚使、兵部尚书、参知政事、朝请大夫、知某州军州事、资政殿学士、宝章阁侍制、知某府君府事、制置副史', 'shqf': '', 'rs': '进士'}, {'name': '高稼', 'shiji': '魏了翁为Y作世系碑记', 'location': {'lng': '103.507979', 'lat': '30.198646'}, 'wenxian': '', 'time': '？-1235年', 'guanzhi': '朝散郎、知某州军州事、知某府军府事', 'shqf': '', 'rs': '进士'}, {'name': '高定子', 'shiji': '魏了翁为Y作世系碑记，为Y之建筑物题咏、记、命名，为Y作祠记，为Y作斋、堂铭', 'location': {'lng': '103.507507', 'lat': '30.198818'}, 'wenxian': '', 'time': '', 'guanzhi': '端明殿学士、知某军事、参知政事、转连副使', 'shqf': '经学家、博学之人', 'rs': '进士'}, {'name': '石介', 'shiji': '魏了翁为Y作世系碑记', 'location': {'lng': '117.135354', 'lat': '36.192084'}, 'wenxian': '', 'time': '1005-1045年', 'guanzhi': '太子中允、通判、推官、通判某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '许奕', 'shiji': '魏了翁为Y作庙碑记', 'location': {'lng': '104.546773', 'lat': '30.410754'}, 'wenxian': '', 'time': '1170-1219年', 'guanzhi': '起居郎、三丞、少师、公、知某州军州事、显谟阁学士、显谟阁侍制、权吏部侍郎', 'shqf': '', 'rs': '进士'}, {'name': '张载', 'shiji': '魏了翁为Y作谥议', 'location': {'lng': '108.940174', 'lat': '34.341568'}, 'wenxian': '', 'time': '1020-1077年', 'guanzhi': '参军、县令、知太常礼院、崇文园校书', 'shqf': '', 'rs': '进士'}, {'name': '毛拱巳', 'shiji': '魏了翁为Y作义庄记', 'location': {'lng': '103.831813', 'lat': '30.036461'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '张震', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.284372', 'lat': '30.977991'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、上轻车都尉、知某州军州事、中书舍人、敷文阁直学士、敷文阁侍制、知某府军府事、通判君府事', 'shqf': '', 'rs': '进士'}, {'name': '鲜于侁', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '106.082816', 'lat': '30.797200'}, 'wenxian': '', 'time': '1019-1087年', 'guanzhi': '朝请大夫、礼部尚书、太常寺少卿、知某州军州事、转连史、转连司判官、左谏议大夫', 'shqf': '财政官员', 'rs': '进士'}, {'name': '孙抃', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.831752', 'lat': '30.042345'}, 'wenxian': '', 'time': '996-1064年', 'guanzhi': '参知政事、观文殿学士太子少傅、学士、御史中丞、群牧史、判史官事、尚书省礼部司郎中、权御史中丞事', 'shqf': '', 'rs': '进士'}, {'name': '张忠恕', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.195607', 'lat': '31.342642'}, 'wenxian': ' 理宗即位,忠恕移书史弥远请取法孝宗,行三年丧', 'time': '1174-1230年', 'guanzhi': '知某州军州事、司农寺丞、户部郎官、转连司通判、知某府军府事、直宝章阁、直秘阁', 'shqf': '', 'rs': ''}, {'name': '曾从龙', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '118.552365', 'lat': '24.781681'}, 'wenxian': '', 'time': '', 'guanzhi': '枢密使、知枢密院事、安抚使、参知政事、门下省给事中、骑都尉、知某军州事、直学士、资政殿大学士、权刑部尚书、实录院修撰', 'shqf': '', 'rs': '进士'}, {'name': '虞夷简', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.147700', 'lat': '29.998850'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '虞兟', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '117.486307', 'lat': '30.210314'}, 'wenxian': '', 'time': '', 'guanzhi': '朝请大夫、县令、知某县事、知某州军州事、户部司郎中', 'shqf': '', 'rs': ''}, {'name': '尹洙', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '112.438093', 'lat': '34.635779'}, 'wenxian': '', 'time': '1001-1047年', 'guanzhi': '节度使、少师、驸马都尉、太常寺丞、太子中允、通判、右司谏、知某县事、知某州军州事、知某州军府事、监酒、', 'shqf': '', 'rs': '进士'}, {'name': '真德秀', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '118.532804', 'lat': '27.924140'}, 'wenxian': '', 'time': '1178-1235年', 'guanzhi': '参知政事、翰林学士、少师、太中大夫、银青光禄大夫、知某州军州事、资政殿学士、侍读、集英殿修撰、右文殿修撰', 'shqf': '理学家、思想家', 'rs': '进士'}, {'name': '虞刚简', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.835817', 'lat': '30.038830'}, 'wenxian': '', 'time': '1164-1227年', 'guanzhi': '路提点司狱公事', 'shqf': '收徒讲学、良吏、循吏', 'rs': '进士'}, {'name': '罗愚', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '116.056600', 'lat': '27.765006'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、知某县事转连司判官', 'shqf': '', 'rs': ''}, {'name': '杨汝明', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.846688', 'lat': '29.831358'}, 'wenxian': '', 'time': '', 'guanzhi': '起居郎、尚书省工部尚书、上轻车都尉、知某州军州事、宝章阁学士', 'shqf': '', 'rs': '进士'}, {'name': '赵崇度', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '114.307581', 'lat': '34.797239'}, 'wenxian': '', 'time': '1175-1230年', 'guanzhi': '提举、知某军事、知某州军州事、朝散大夫、尚书省吏部尚书、户部右曹郎中', 'shqf': '理学家、财政官员', 'rs': ''}, {'name': '曾三异', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '115.387052', 'lat': '27.740192'}, 'wenxian': '', 'time': '1156-？', 'guanzhi': '承务郎、馆阁校勘、秘阁校勘、太社局令', 'shqf': '理学家、校勘学家', 'rs': '举人'}, {'name': '虞方简', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.839117', 'lat': '30.039640'}, 'wenxian': '', 'time': '1164-？', 'guanzhi': '', 'shqf': '', 'rs': '进士'}, {'name': '孙应时', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '121.154594', 'lat': '30.037858'}, 'wenxian': '', 'time': '1154-1206年', 'guanzhi': '承议郎、县尉、宣教郎、知某县事、通判某州军州事、通判某军事', 'shqf': '理学家', 'rs': ''}, {'name': '李性传', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.069726', 'lat': '29.651287'}, 'wenxian': '', 'time': '', 'guanzhi': '国公、参知政事、起居郎、端明殿学士、知某州军州事、宝章阁侍制、某知府军府事、权刑部侍郎', 'shqf': '', 'rs': '进士'}, {'name': '吴猎', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '113.496894', 'lat': '27.646130'}, 'wenxian': '', 'time': '1143-1213年', 'guanzhi': '公、上轻车都尉、知某府军府事、知某州军州事、安抚制置使、某府府学教授', 'shqf': '思想家、财政官员', 'rs': '进士'}, {'name': '杨泰之', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.846642', 'lat': '29.831357'}, 'wenxian': '', 'time': '1169-1230年', 'guanzhi': '奉直郎、县尉、知某州军州事、大理寺少卿、直宝谟阁、知某府军府事', 'shqf': '', 'rs': '进士'}, {'name': '崔与之', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '113.810860', 'lat': '23.261141'}, 'wenxian': '', 'time': '', 'guanzhi': '枢密史、安抚使、丞相、参知政事、观文殿大学士、秘阁、端明殿学士、正议大夫、焕章阁侍制、右丞相、太学生、知某府君府事', 'shqf': '', 'rs': '进士'}, {'name': '厉模', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '120.152791', 'lat': '30.267446'}, 'wenxian': '', 'time': '', 'guanzhi': '朝请大夫、直秘阁、知某府军府事、', 'shqf': '', 'rs': ''}, {'name': '家大酉', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.844228', 'lat': '30.042545'}, 'wenxian': '', 'time': '1177-？', 'guanzhi': '尚书省工部侍郎、县主簿、侍讲', 'shqf': '', 'rs': '进士'}, {'name': '杨恂', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.516331', 'lat': '30.012971'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '聂子述', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '116.640388', 'lat': '27.554743'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、轻车都尉、公、某知州军州事、某知府军府事、宝谟阁侍制、制置使', 'shqf': '', 'rs': '进士'}, {'name': '安丙', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '106.748083', 'lat': '30.432504'}, 'wenxian': '', 'time': '1148-1221年', 'guanzhi': '同知枢密院事、知某军事、安抚使、观文殿大学士、秘书省校书郎、端明殿学士、右承议郎、知某州军州事、中大夫、资政殿学士、知某府军府事、宣抚使、', 'shqf': '良吏、循吏', 'rs': ''}, {'name': '安癸仲', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.282175', 'lat': '30.973974'}, 'wenxian': '', 'time': '', 'guanzhi': '总领、太府寺少卿', 'shqf': '', 'rs': ''}, {'name': '李鼎', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '116.641925', 'lat': '27.557080'}, 'wenxian': '', 'time': '', 'guanzhi': '知某县事、知某州军州事、宗正寺丞、直敷文阁', 'shqf': '', 'rs': ''}, {'name': '李埴', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.521214', 'lat': '30.012725'}, 'wenxian': '', 'time': '1161-1238年', 'guanzhi': '同知枢密院事、起居郎、卿、端明殿学士、尚书省刑部尚书、知某州军州事、资政殿学士、侍读、监修国史、权礼部尚书、宣抚使、知某府军府事、', 'shqf': '', 'rs': '进士'}, {'name': '李芾', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '114.536626', 'lat': '36.741880'}, 'wenxian': '', 'time': '', 'guanzhi': '朝散大夫、知某州军州事、直秘阁、秘阁修撰、兵部司员外郎、知某州军府事', 'shqf': '经学家、博学之人', 'rs': ''}, {'name': '李大谦', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '119.412966', 'lat': '32.394210'}, 'wenxian': '', 'time': '', 'guanzhi': '朝议大夫、路提点司狱公事、直宝章阁', 'shqf': '', 'rs': ''}, {'name': '吕元素', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.688316', 'lat': '30.622320'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '道士', 'rs': ''}, {'name': '郭正孙', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.459213', 'lat': '30.413335'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、安抚使、朝散大夫、太府寺丞、知某州军州事、知某府军府事、通判某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '许晟大', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '112.909426', 'lat': '28.689105'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '张师夔', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.848091', 'lat': '30.039948'}, 'wenxian': '', 'time': '', 'guanzhi': '同知某州军州事、通判某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '黄申', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.068686', 'lat': '29.651196'}, 'wenxian': '', 'time': '', 'guanzhi': '知某州军州事、转连司判官', 'shqf': '', 'rs': '进士'}, {'name': '杨恢', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '103.845642', 'lat': '30.037185'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、太府寺少卿、知某州军州事、直宝文阁、宝章阁侍制、安抚制置使、兵部司郎中', 'shqf': '', 'rs': ''}, {'name': '杨子谟', 'shiji': '魏了翁为Y之建筑物题咏、记、命名', 'location': {'lng': '104.678601', 'lat': '31.033270'}, 'wenxian': '', 'time': '1153-1226年', 'guanzhi': '奉直郎、路提点司狱公事、直华文阁、知某县事、知某州军州事、通判某府军府事', 'shqf': '收徒讲学、良吏、循吏', 'rs': '进士'}, {'name': '度正', 'shiji': '魏了翁建筑物得到Y的题咏、记、命名', 'location': {'lng': '106.056404', 'lat': '29.844811'}, 'wenxian': '', 'time': '', 'guanzhi': '朝散郎、朝议大夫、国子监丞、起居郎、太常寺少卿、侍读、侍讲、吏部郎官、同修国史、知某君府军府事、实录院同修撰', 'shqf': '理学家', 'rs': '进士'}, {'name': '虞集', 'shiji': '魏了翁学记（书院记）由Y所作', 'location': {'lng': '104.146840', 'lat': '29.997912'}, 'wenxian': '', 'time': '1191-1255年', 'guanzhi': '太史', 'shqf': '士人', 'rs': ''}, {'name': '赵必愿', 'shiji': '魏了翁为Y作学记（书院记）', 'location': {'lng': '116.695647', 'lat': '28.702302'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、朝奉郎、知某州军州事、直秘阁、华文阁直学士', 'shqf': '', 'rs': ''}, {'name': '杨瑾', 'shiji': '魏了翁为Y作学记（书院记）', 'location': {'lng': '121.153203', 'lat': '30.047348'}, 'wenxian': '', 'time': '', 'guanzhi': '提举、知某州军州事、知某府军府事', 'shqf': '', 'rs': '进士'}, {'name': '李鼐常', 'shiji': '魏了翁为Y作学记（书院记）', 'location': {'lng': '118.758816', 'lat': '30.940718'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '张浚', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '104.194842', 'lat': '31.340945'}, 'wenxian': '', 'time': '1097-1164年', 'guanzhi': '枢密史、安抚使、观文殿大学士、丞相、国公、开国伯、节度使、骑都尉、特进、左宣奉大夫、资政殿大学士、少傅、集英殿修撰、太常寺主簿、知某府军府事', 'shqf': '财政职员', 'rs': '进士'}, {'name': '范纯仁', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '115.656370', 'lat': '34.414172'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '冯如晦', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '105.335613', 'lat': '30.097246'}, 'wenxian': '', 'time': '', 'guanzhi': '尚书省户部侍郎、集贤院校理、知某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '杨椿', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '103.844288', 'lat': '30.038171'}, 'wenxian': '', 'time': '1095-1167年', 'guanzhi': '兵部尚书、参知政事、左朝奉郎、国子监祭酒、翰林学士、门下省给事中、转连司判官、侍讲、尚书省工部屯田司郎中', 'shqf': '', 'rs': '进士'}, {'name': '程颢', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '114.375743', 'lat': '30.882557'}, 'wenxian': '', 'time': '1032-1085年', 'guanzhi': '国公、知某县事、宗正寺丞、县主簿、监察御史里行、签书判官厅公事', 'shqf': '思想家', 'rs': '进士'}, {'name': '胡宏', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '118.181843', 'lat': '26.640721'}, 'wenxian': '', 'time': '1106-1162年', 'guanzhi': '承务郎', 'shqf': '理学家、思想家', 'rs': ''}, {'name': '虞允文', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '104.148101', 'lat': '29.997858'}, 'wenxian': '', 'time': '1110-1174年', 'guanzhi': '枢密史、同知枢密院事、知某军事、参知政事、左朝请大夫、丞相、国公、左光禄大夫、中书舍人、知某州军州事、安抚制置使、知某府军府事、宣谕使', 'shqf': '', 'rs': '进士'}, {'name': '杨邦乂', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '115.135507', 'lat': '27.229632'}, 'wenxian': '', 'time': '1108-1129年', 'guanzhi': '知某县事', 'shqf': '', 'rs': ''}, {'name': '刘甲', 'shiji': '魏了翁为Y作祠记', 'location': {'lng': '103.760667', 'lat': '29.581470'}, 'wenxian': '', 'time': '1142-1214年', 'guanzhi': '知某军事、安抚使、宝谟阁学士、知某州军州事、知某府军府事', 'shqf': '', 'rs': ''}, {'name': '陈贵谊', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '119.384334', 'lat': '25.721143'}, 'wenxian': '', 'time': '1183-1234年', 'guanzhi': '同知枢密院事、知某军事、参知政事、秘阁、右承议郎、太学博士、正议大夫、中书舍人、资政殿大学士、知某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '师民瞻', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.870257', 'lat': '30.190001'}, 'wenxian': '', 'time': '？-1152年', 'guanzhi': '朝奉大夫、县主簿、通判某州军州事、某府府学教授', 'shqf': '', 'rs': ''}, {'name': '孙堪', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '121.157115', 'lat': '30.038104'}, 'wenxian': '', 'time': '1156-1213年', 'guanzhi': '', 'shqf': '士人、管理田产', 'rs': ''}, {'name': '朱倬', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '119.131725', 'lat': '26.150047'}, 'wenxian': '', 'time': '1086-1163年', 'guanzhi': '参知政事、教授、分司、通判、右正言、资政殿学士、某州学教授、知某州军州事、礼仪院', 'shqf': '', 'rs': '进士'}, {'name': '洪柲', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '116.673130', 'lat': '28.998160'}, 'wenxian': '', 'time': '1139-1209年', 'guanzhi': '知某军事、知某县事、知某州军州事、通判某州军州事、监岳庙', 'shqf': '', 'rs': ''}, {'name': '史尧辅', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.833859', 'lat': '30.052596'}, 'wenxian': '', 'time': '1173-1216年', 'guanzhi': '推官、县主簿', 'shqf': '富豪、收徒讲学', 'rs': ''}, {'name': '曹彦约', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '116.204513', 'lat': '29.275863'}, 'wenxian': '', 'time': '1157-1218年', 'guanzhi': '知某军事、安抚使、兵部尚书、县尉、转连司判官、知某州军州事、宝谟阁侍制、宝章阁学士、直秘阁、知某府军府事', 'shqf': '收徒讲学、理学家', 'rs': '进士'}, {'name': '张庶', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '104.196536', 'lat': '31.339578'}, 'wenxian': '', 'time': '？-1199年', 'guanzhi': '', 'shqf': '收徒讲学、士人', 'rs': ''}, {'name': '魏少翁', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.512940', 'lat': '30.198485'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '地方士人', 'rs': ''}, {'name': '魏越翁', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.515682', 'lat': '30.201007'}, 'wenxian': '', 'time': '1173-1220年', 'guanzhi': '', 'shqf': '地方士人', 'rs': ''}, {'name': '魏文翁', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.517486', 'lat': '30.201703'}, 'wenxian': '', 'time': '1181-1231年', 'guanzhi': '朝请大夫、朝散郎、县尉、知某县事、知某州军州事、通判某府军府事', 'shqf': '良吏、循吏', 'rs': ''}, {'name': '高载', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.517597', 'lat': '30.200571'}, 'wenxian': '', 'time': '？-1216年', 'guanzhi': '知某县事', 'shqf': '思想家', 'rs': '进士'}, {'name': '高崇', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.518437', 'lat': '30.202867'}, 'wenxian': '', 'time': '1173-1232年', 'guanzhi': '知某县事、知某州军州事、通判某府军府事', 'shqf': '良吏、循吏', 'rs': '进士'}, {'name': '魏天祐', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.519672', 'lat': '30.203100'}, 'wenxian': '', 'time': '1132-1213年', 'guanzhi': '', 'shqf': '士人', 'rs': ''}, {'name': '李惟正', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.520653', 'lat': '30.202075'}, 'wenxian': '', 'time': '1152-1212年', 'guanzhi': '司户参军、知某县事、县令、签书节度判官厅公事', 'shqf': '', 'rs': ''}, {'name': '张钧', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.672250', 'lat': '30.632904'}, 'wenxian': '', 'time': '', 'guanzhi': '路提点司狱公事、知某县事、兵部司郎官、秘书丞', 'shqf': '布衣', 'rs': '进士'}, {'name': '张大训', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '116.672250', 'lat': '28.997559'}, 'wenxian': '', 'time': '', 'guanzhi': '知某州军州事', 'shqf': '天文学家、藏书家、历算家', 'rs': ''}, {'name': '彭钦', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '115.546169', 'lat': '28.057171'}, 'wenxian': '', 'time': '1164-1218 年', 'guanzhi': '军器监主簿、知某州军州事、通判某府军府事', 'shqf': '', 'rs': ''}, {'name': '邵骥', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '119.460526', 'lat': '29.208919'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、大理寺丞、县令、县尉、宣教郎、都官司郎官、知某县事', 'shqf': '', 'rs': '进士'}, {'name': '陆持之', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '116.755058', 'lat': '27.918959'}, 'wenxian': '', 'time': '1171-1225年', 'guanzhi': '秘书省读书、修职郎 、经略安抚司', 'shqf': '士人', 'rs': ''}, {'name': '李嘉量', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.917787', 'lat': '30.575203'}, 'wenxian': '', 'time': '1160-1224年', 'guanzhi': '迪功郎、司法参军、宣教郎、知某县事、监酒、安抚使司、通判某州军州事、通判某府军府事', 'shqf': '', 'rs': ''}, {'name': '李蘩', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.672627', 'lat': '30.624970'}, 'wenxian': '', 'time': '1128-1178年', 'guanzhi': '安抚使、太府寺少卿、知某州军州事、知某府军府事、尚书省户部司郎中', 'shqf': '', 'rs': ''}, {'name': '赵纶', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.155070', 'lat': '30.274084'}, 'wenxian': '', 'time': '1164-1222年', 'guanzhi': '提举、安抚使、县令、知某州军州事、知某府军府事、直焕章阁', 'shqf': '', 'rs': ''}, {'name': '倪思', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.100464', 'lat': '30.867390'}, 'wenxian': '', 'time': '1147-1220年', 'guanzhi': '知某军事、朝散大夫、骑都尉、太中大夫、知某州军州事、中奉大夫、直学士院、侍读、宝谟阁学士、权兵部尚书、宝路院修撰、修国史、知某府军府事', 'shqf': '', 'rs': ''}, {'name': '李彦华', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '116.059820', 'lat': '27.764066'}, 'wenxian': '', 'time': '1112-1192年', 'guanzhi': '', 'shqf': '隐士', 'rs': ''}, {'name': '李琥', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '117.287800', 'lat': '31.255550'}, 'wenxian': '', 'time': '1098-1174年', 'guanzhi': '朝奉郎、将仕郎、县尉、知某州军州事、通判某府军府事、签书节度判官厅公事', 'shqf': '', 'rs': ''}, {'name': '乐材', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.459655', 'lat': '30.414783'}, 'wenxian': '', 'time': '?-1188年', 'guanzhi': '', 'shqf': '儒学', 'rs': '举人'}, {'name': '孙椿年', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '121.156424', 'lat': '30.043161'}, 'wenxian': '', 'time': '1141-1199年', 'guanzhi': '', 'shqf': '', 'rs': '士人'}, {'name': '孙之宏', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '121.156269', 'lat': '30.042172'}, 'wenxian': '', 'time': '', 'guanzhi': '承直郎、准备差遣、经略安抚使司准备差遣', 'shqf': '', 'rs': ''}, {'name': '吴之巽', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '104.679196', 'lat': '31.032579'}, 'wenxian': '', 'time': '1160-1221年', 'guanzhi': '', 'shqf': '收徒讲学', 'rs': '举人'}, {'name': '家炎', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.834587', 'lat': '30.053340'}, 'wenxian': '', 'time': '1145-1231年', 'guanzhi': '司理参军、知某县事、县主簿、通判某州军州事、知某监事', 'shqf': '', 'rs': ''}, {'name': '家某', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.827745', 'lat': '30.051499'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '李修己', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '115.787103', 'lat': '28.189799'}, 'wenxian': '', 'time': '', 'guanzhi': '供奉官、团练使、知某州军州事、知某府军府事、部署', 'shqf': '武官', 'rs': ''}, {'name': '杨庆崇', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.518350', 'lat': '30.011229'}, 'wenxian': '', 'time': '1133-1160年', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '蹇君章', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '105.388405', 'lat': '30.870986'}, 'wenxian': '', 'time': '1169-1227年', 'guanzhi': '县尉、知某县事、知某州军州事、通判某军事、提点刑狱司检法官', 'shqf': '', 'rs': ''}, {'name': '张宗说', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '118.030749', 'lat': '27.750719'}, 'wenxian': '', 'time': '1145-1227年', 'guanzhi': '承奉郎、推官', 'shqf': '乡绅、理学家', 'rs': ''}, {'name': '江埙', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '118.029942', 'lat': '27.752329'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '黄师南', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '113.116528', 'lat': '26.127151'}, 'wenxian': '', 'time': '1125-1197年', 'guanzhi': '', 'shqf': '落地士人', 'rs': ''}, {'name': '胡大异', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '119.647444', 'lat': '29.079059'}, 'wenxian': '', 'time': '1168-1227年', 'guanzhi': '县令、从议郎、兵马监押、监当官', 'shqf': '', 'rs': ''}, {'name': '赵彦吶', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.958013', 'lat': '30.990165'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、焕章阁学士、尚书省兵部侍郎、安抚制置使', 'shqf': '', 'rs': '进士'}, {'name': '郭叔谊', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.922067', 'lat': '30.572897'}, 'wenxian': '', 'time': '1155-1233年', 'guanzhi': '迪功郎、知某县事、知某州军州事、县主簿、通判某府军府事、某州学教授', 'shqf': '', 'rs': ''}, {'name': '李骏', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '119.172304', 'lat': '29.028319'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、安抚使、知某州军州事、中奉大夫、直焕章阁、直龙圆阁', 'shqf': '', 'rs': '进士'}, {'name': '王其贤', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '106.633212', 'lat': '30.455961'}, 'wenxian': '', 'time': '1182-1227年', 'guanzhi': '知某州军州事、知某府军府事、准备差遣', 'shqf': '', 'rs': ''}, {'name': '丁泰亨', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '117.284124', 'lat': '34.205768'}, 'wenxian': '', 'time': '1123-1196年', 'guanzhi': '奉直大夫', 'shqf': '', 'rs': ''}, {'name': '王自中', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.565793', 'lat': '27.661918'}, 'wenxian': '', 'time': '1134-1199年', 'guanzhi': '知某军事、县令、通判、知某州军州事', 'shqf': '思想家', 'rs': ''}, {'name': '安蕃', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '106.631990', 'lat': '30.456074'}, 'wenxian': '', 'time': '1172-1222年', 'guanzhi': '迪功郎、县主簿、知某县事、某州学教授、知县事兼车史', 'shqf': '', 'rs': ''}, {'name': '史氏(任逢母)', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.825970', 'lat': '30.051534'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '沈连', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '114.546702', 'lat': '29.026022'}, 'wenxian': '', 'time': '1169-1226年', 'guanzhi': '直承郎、奉议郎、司法参军、司户参军、县丞', 'shqf': '', 'rs': ''}, {'name': '宋之源', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.922591', 'lat': '30.572515'}, 'wenxian': '', 'time': '？-1221年', 'guanzhi': '县令、县尉、知某县事、知某州军州事、知某府军府事', 'shqf': '思想家、理学家', 'rs': ''}, {'name': '宋蕴', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.867760', 'lat': '30.185829'}, 'wenxian': '', 'time': '1136-1200年', 'guanzhi': '通知郎、知某县事、县主簿', 'shqf': '', 'rs': '进士'}, {'name': '宋祁仲', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.860906', 'lat': '30.186492'}, 'wenxian': '', 'time': '1161-1224年', 'guanzhi': '流外栓、县尉', 'shqf': '', 'rs': ''}, {'name': '李大有', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.241566', 'lat': '29.289648'}, 'wenxian': '', 'time': '', 'guanzhi': '奉议郎', 'shqf': '', 'rs': '进士'}, {'name': '李侨', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.465950', 'lat': '30.413518'}, 'wenxian': '', 'time': '971-1068年', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '蒋季荃', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '115.785741', 'lat': '28.188498'}, 'wenxian': '', 'time': '1169-1235年', 'guanzhi': '恭人', 'shqf': '', 'rs': ''}, {'name': '别湜', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '112.588121', 'lat': '31.167820'}, 'wenxian': '', 'time': '1151-1225年', 'guanzhi': '迪功郎、流外栓、宣议郎', 'shqf': '', 'rs': ''}, {'name': '胡扬', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '112.414834', 'lat': '30.043347'}, 'wenxian': '', 'time': '1165-1226年', 'guanzhi': '贡士、博士弟子员', 'shqf': '', 'rs': ''}, {'name': '胡仲舒', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '111.785937', 'lat': '23.143722'}, 'wenxian': '', 'time': '1147-1174年', 'guanzhi': '承事郎', 'shqf': '孝子', 'rs': ''}, {'name': '高谈', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '117.334106', 'lat': '27.540988'}, 'wenxian': '', 'time': '1162-1230年', 'guanzhi': '', 'shqf': '处士', 'rs': ''}, {'name': '孙景玉', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.003092', 'lat': '26.891339'}, 'wenxian': '', 'time': '1123-1196年', 'guanzhi': '武义郎', 'shqf': '地方乡绅、阴阳家、地理学家、卜筮者（太乙、轨革、六壬、遁甲等）', 'rs': ''}, {'name': '孙调', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.005643', 'lat': '26.885204'}, 'wenxian': '', 'time': '1126-1204年', 'guanzhi': '', 'shqf': '儒学', 'rs': ''}, {'name': '吴氏(孙之宏母)', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '121.156851', 'lat': '30.041343'}, 'wenxian': '', 'time': '1141-1223年', 'guanzhi': '孺人', 'shqf': '', 'rs': ''}, {'name': '徐瑄', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.690913', 'lat': '28.152895'}, 'wenxian': '', 'time': '？-1228年', 'guanzhi': '安抚使、礼记博士、司法参军、知某县事、知某州军州事、直秘阁、集英殿修撰、大理寺卿、大理寺少卿、大理寺评事、知某府军府事', 'shqf': '', 'rs': ''}, {'name': '郭汝该', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.462785', 'lat': '30.410573'}, 'wenxian': '', 'time': '', 'guanzhi': '迪功郎、司理参军', 'shqf': '', 'rs': '进士'}, {'name': '郭杭', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.466246', 'lat': '30.415359'}, 'wenxian': '', 'time': '1143-1210年', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '曹易', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.670560', 'lat': '27.996792'}, 'wenxian': '', 'time': '1153-1220年', 'guanzhi': '朝奉郎、县尉、知某县事、通判某州军州事、某州(府军监)学教授、都大提举茶马司', 'shqf': '', 'rs': '进士'}, {'name': '王万', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.521105', 'lat': '30.200692'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '张午', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '119.431849', 'lat': '32.394720'}, 'wenxian': '', 'time': '1155-1224年', 'guanzhi': '知某军事、舍人院、太府寺少卿、通直郎、知某州军州事、直宝谟阁、尚书省工部工部司郎中、通判某州军州事', 'shqf': '', 'rs': '进士'}, {'name': '张简', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.461741', 'lat': '30.404676'}, 'wenxian': '', 'time': '', 'guanzhi': '散骑常侍、通直郎、县主簿', 'shqf': '', 'rs': ''}, {'name': '陈克已', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '120.994097', 'lat': '29.153577'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '陶薰', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '111.082923', 'lat': '25.948301'}, 'wenxian': '', 'time': '1158-1229年', 'guanzhi': '秘书丞、某州(府军监)学教授', 'shqf': '地方乡绅、收徒讲学', 'rs': '进士'}, {'name': '彭运成', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.521219', 'lat': '30.012451'}, 'wenxian': '', 'time': '1164-1225年', 'guanzhi': '通直郎、县主簿、某州(府军监)学教授', 'shqf': '', 'rs': '进士'}, {'name': '程南金', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.517644', 'lat': '30.008534'}, 'wenxian': '', 'time': '1168-1227年', 'guanzhi': '迪功郎', 'shqf': '孝子', 'rs': ''}, {'name': '禄柬之', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '105.092362', 'lat': '31.090134'}, 'wenxian': '', 'time': '', 'guanzhi': '路提点刑狱公事、知某州军州事、直秘阁、知某府军府事', 'shqf': '词人', 'rs': '进士'}, {'name': '禄坚复', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '105.094387', 'lat': '31.095156'}, 'wenxian': '', 'time': '', 'guanzhi': '朝请郎、县丞、知某州军州事、通判某府军府事', 'shqf': '', 'rs': '进士'}, {'name': '邓应午', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '104.114152', 'lat': '30.954735'}, 'wenxian': '', 'time': '？-1225年', 'guanzhi': '县丞、县尉', 'shqf': '', 'rs': '进士'}, {'name': '钱安国', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '105.741173', 'lat': '29.654612'}, 'wenxian': '', 'time': '1146-1207年', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '韩甲', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.461319', 'lat': '30.406000'}, 'wenxian': '', 'time': '1162-1209年', 'guanzhi': '节度推官、观察推官、干办公事、四川茶马司干办公事', 'shqf': '', 'rs': '进士'}, {'name': '谯椿', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.454244', 'lat': '30.404571'}, 'wenxian': '', 'time': '1143-1213年', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '谯仲午', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.337711', 'lat': '30.347967'}, 'wenxian': '', 'time': '1167-1225年', 'guanzhi': '某州(府军监)学教授', 'shqf': '思想家', 'rs': '进士'}, {'name': '苏在镕', 'shiji': '魏了翁为Y作墓志铭', 'location': {'lng': '103.886629', 'lat': '30.808481'}, 'wenxian': '', 'time': '1153-1234年', 'guanzhi': '提举常平司干办公事', 'shqf': '收徒讲学', 'rs': '进士'}, {'name': '柳申锡', 'shiji': '魏了翁为Y作碑阴', 'location': {'lng': '105.087928', 'lat': '31.092035'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '天文学家（星象家）、儒学、阴阳家、经学家、卜筮者（太乙、轨革、六壬、遁甲等）、\t堪舆家风水师、历算家', 'rs': ''}, {'name': '赵希錧', 'shiji': '魏了翁为Y作神道碑', 'location': {'lng': '118.521383', 'lat': '28.898368'}, 'wenxian': '', 'time': '1176-1233年', 'guanzhi': '参军、节度使、秘书省监、府、司户参军、推官', 'shqf': '宗子', 'rs': '进士'}, {'name': '赵与潞', 'shiji': '魏了翁为Y作神道碑', 'location': {'lng': '118.518325', 'lat': '28.898958'}, 'wenxian': '', 'time': '', 'guanzhi': '承直郎、秘书省监、右承议郎', 'shqf': '', 'rs': '进士'}, {'name': '李耆寿', 'shiji': '魏了翁为Y作墓表', 'location': {'lng': '112.407320', 'lat': '30.041750'}, 'wenxian': '', 'time': '？-1230年', 'guanzhi': '朝奉大夫、登仕郎、知某州军州事、知某府军府事、通判某州军州事', 'shqf': '理学家', 'rs': ''}, {'name': '乔行简', 'shiji': '魏了翁受Y的请求为他人（第三方）作神道碑', 'location': {'lng': '120.396278', 'lat': '29.275694'}, 'wenxian': '', 'time': '1156-1241年', 'guanzhi': '枢密使、知枢密院事、参知政事、朝奉大夫、朝请大夫、丞相、礼泉观使、观文殿大学士、国公、龙图阁待制、少府监丞、府、太师、特进、路提点刑狱公事、知某州军州事、转运司判官、左丞相、右丞相、侍读、左相、直焕章阁、监修国史、直秘阁、提举编修玉牒、知某府军府事', 'shqf': '', 'rs': '进士'}, {'name': '宇文绍节', 'shiji': '魏了翁为Y作哀辞 [并入167]', 'location': {'lng': '103.922311', 'lat': '30.574446'}, 'wenxian': '', 'time': '？-1213年', 'guanzhi': '兵部尚书、参知政事、端明殿学士、府、学士、知某州军州事、中大夫、侍读、簽书枢密院事、宝文阁待制、华文阁学士、华文阁直学士、宝谟阁学士、宝谟阁待制、尚书省兵部侍郎、同修国史、实录院同修撰、知某府军府事、宣抚使', 'shqf': '', 'rs': '进士'}, {'name': '杨熹', 'shiji': '魏了翁为Y作哀辞 [并入167]', 'location': {'lng': '104.851944', 'lat': '29.764059'}, 'wenxian': '', 'time': '', 'guanzhi': '路提点刑狱公事', 'shqf': '', 'rs': ''}, {'name': '刘光祖', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.546773', 'lat': '30.410754'}, 'wenxian': '', 'time': '1142-1222年', 'guanzhi': '提举宫观、殿中省尚舍奉御、少卿、吏部侍郎左右选、侍御史、司农寺少卿、路提点刑狱公事、知某县事、知某州军州事、阁学士、宝文阁学士、显谟阁直学士、宝谟阁直学士、宝谟阁待制、直秘阁、右文殿修撰、太学正、知某府军府事、提点刑狱司检法官', 'shqf': '史学家', 'rs': '进士'}, {'name': '叶适', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '120.670068', 'lat': '27.998155'}, 'wenxian': '', 'time': '1150-1223年', 'guanzhi': '安抚使、朝请大夫、国子监司业、公、太常寺博士、太府寺卿、太学博士、知某州军州事、阁学士、宝文阁待制、宝谟阁待制、尚书省吏部员外郎、太学正、制置使', 'shqf': '孝子、经世学者、思想家', 'rs': '进士'}, {'name': '李壁', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '103.517904', 'lat': '30.019315'}, 'wenxian': '', 'time': '1159-1222年', 'guanzhi': '参知政事、上轻车都尉、殿中省尚舍奉御、端明殿学士、提举修敕令、监修国史、知某府军府事、同提举编修敕令、监修国史日历', 'shqf': '', 'rs': '进士'}, {'name': '袁说友', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '116.846084', 'lat': '26.830902'}, 'wenxian': '', 'time': '1140-1204年', 'guanzhi': '提举、尚书省户部侍郎、同知枢密院事、安抚使、参知政事、朝请大夫、朝议大夫、内藏库、通奉大夫、知某州军州事、中奉大夫、县主簿、资政殿学士、侍讲、宝文阁学士、直显谟阁、敷文阁学士、直秘阁、权户部侍郎、知某府军府事、制置', 'shqf': '', 'rs': '进士'}, {'name': '李道傅', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.076724', 'lat': '29.643777'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '杨辅', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '105.571792', 'lat': '30.512969'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、兵部尚书、三公、端明殿学士、通奉大夫、通议大夫、知某州军州事、显谟阁待制、敷文阁直学士、宝谟阁学士、知某府军府事、安抚制置使、制置使、宣抚使', 'shqf': '', 'rs': '进士'}, {'name': '杨虞仲', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '103.846203', 'lat': '29.830987'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、宣奉大夫、知某州军州事、中大夫、直秘阁、秘阁修撰', 'shqf': '', 'rs': '进士'}, {'name': '杜盖', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.054102', 'lat': '30.661552'}, 'wenxian': '', 'time': '？-1208年', 'guanzhi': '朝奉大夫、知某州军州事\t', 'shqf': '', 'rs': '进士'}, {'name': '杨震仲', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.055177', 'lat': '30.664542'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、知某县事、通判某府军府事', 'shqf': '', 'rs': '进士'}, {'name': '宇文价', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.074498', 'lat': '30.664996'}, 'wenxian': '', 'time': '', 'guanzhi': '兵部尚书、殿中省尚辇奉御、少师、公、著作佐郎、徽猷阁学士、知某府军府事\t', 'shqf': '', 'rs': '进士'}, {'name': '张方', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.627636', 'lat': '30.128901'}, 'wenxian': '', 'time': '', 'guanzhi': '某州(府军监)学教授、兵部司郎官', 'shqf': '', 'rs': '进士'}, {'name': '赵昱', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '104.851944', 'lat': '29.764059'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '张从祖', 'shiji': '魏了翁为Y作祭文', 'location': {'lng': '103.676555', 'lat': '30.633000'}, 'wenxian': '', 'time': '', 'guanzhi': '殿中省尚辇奉御、上轻车都尉、殿中省尚舍奉御、秘书省著作郎、国史院编修、将作监少监', 'shqf': '', 'rs': ''}, {'name': '王迈', 'shiji': '魏了翁祭文由Y所作', 'location': {'lng': '118.753580', 'lat': '25.208766'}, 'wenxian': '', 'time': '1185-1248年', 'guanzhi': '知某军事、殿中省尚舍奉御、司农寺少卿', 'shqf': '', 'rs': '进士'}, {'name': '方岳', 'shiji': '魏了翁祭文由Y所作', 'location': {'lng': '117.737785', 'lat': '29.839115'}, 'wenxian': '', 'time': '1199-1262年', 'guanzhi': '知某军事、知某州军州事、宗子博士、参议官', 'shqf': '士人、史学家', 'rs': '进士'}, {'name': '释居简', 'shiji': '魏了翁祭文由Y所作', 'location': {'lng': '105.088980', 'lat': '31.095734'}, 'wenxian': '', 'time': '1164-1246年', 'guanzhi': '', 'shqf': '僧人', 'rs': ''}, {'name': '刘德秀', 'shiji': '魏了翁为Y作道观记', 'location': {'lng': '115.842779', 'lat': '28.127427'}, 'wenxian': '', 'time': '？-1208年', 'guanzhi': '秘阁、三公、知某州军州事、簽书枢密院事、宝文阁学士、大理寺主簿、知某府军府事、安抚制置使、制置使', 'shqf': '', 'rs': '进士'}, {'name': '游裕', 'shiji': '魏了翁为Y作传', 'location': {'lng': '108.200398', 'lat': '34.260204'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '高斯得', 'shiji': '魏了翁为Y作字说、名述', 'location': {'lng': '103.519839', 'lat': '30.199923'}, 'wenxian': '', 'time': '1201—？', 'guanzhi': '参知政事、朝奉郎、朝散郎、知某州军州事、转连史、直宝文阁、史馆校勘、知某府军府事', 'shqf': '史学家、校勘学家', 'rs': '进士'}, {'name': '李鏐', 'shiji': '魏了翁为Y作字说、名述', 'location': {'lng': '103.517392', 'lat': '30.017315'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '陈宿', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '118.987229', 'lat': '25.386270'}, 'wenxian': '', 'time': '1173-1242年', 'guanzhi': '大理寺丞、知某县事、知某州军州事、知某府军府事、通判某州军州事、寺丞', 'shqf': '', 'rs': ''}, {'name': '高斯谋', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '103.506498', 'lat': '30.196789'}, 'wenxian': '', 'time': '', 'guanzhi': '吏部侍郎左右选、县令', 'shqf': '', 'rs': ''}, {'name': '师遇', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '104.081583', 'lat': '30.663414'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': '进士'}, {'name': '江万里', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '116.206931', 'lat': '29.273328'}, 'wenxian': '', 'time': '1198-1274年', 'guanzhi': '同知枢密院事、安抚使、丞相、宫观使、监察御史、卿、上轻车都尉、殿中省尚舍奉御、殿中侍御史、端明殿学士、侍御史、太傅、太师、特进、提举杭州洞霄宫、知某州军州事、转运司判官、资政殿学士、左丞相、侍讲、同簽书枢密院事、直秘阁、知某府军府事、安抚大使、驾部司郎官、同提举编修经武要略、校书郎', 'shqf': '死国难', 'rs': '进士'}, {'name': '李登', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '109.735661', 'lat': '26.887239'}, 'wenxian': '', 'time': '1205-？', 'guanzhi': '', 'shqf': '士人', 'rs': '进士'}, {'name': '唐佑之', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '109.696311', 'lat': '26.575052'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '万宗大', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '112.944049', 'lat': '27.829738'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '裴梦得', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '116.371066', 'lat': '27.970596'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '严师夔', 'shiji': '魏了翁为Y作斋、堂铭', 'location': {'lng': '105.090004', 'lat': '31.097120'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '陈增', 'shiji': '魏了翁为Y篆匾额、器铭', 'location': {'lng': '118.988556', 'lat': '25.375745'}, 'wenxian': '', 'time': '1200-1266年', 'guanzhi': '将作监主簿、朝奉大夫、承务郎、县丞、大理寺司直', 'shqf': '', 'rs': ''}, {'name': '游佀', 'shiji': '魏了翁为Y篆匾额、器铭', 'location': {'lng': '106.078259', 'lat': '30.796714'}, 'wenxian': '', 'time': '', 'guanzhi': '枢密使、丞相、大理寺丞、国公、门下省给事中、骑都尉、卿、路提点刑狱公事、宗正寺少卿、侍读、侍讲、簽书枢密院事、监修国史、直秘阁、权礼部侍郎、实录院修撰、军器监监、大理寺司直、知某府军府事、秘书丞、宫留守', 'shqf': '', 'rs': '进士'}, {'name': '李参', 'shiji': '魏了翁致书Y', 'location': {'lng': '116.470304', 'lat': '35.937102'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、礼部尚书、枢密直学士、知某县事、知某州军州事、转运使、三司盐铁副使、群牧使、尚书省兵部侍郎、刑部侍郎、知某府军府事', 'shqf': '', 'rs': ''}, {'name': '费士寅', 'shiji': '魏了翁致书Y', 'location': {'lng': '103.923770', 'lat': '30.574468'}, 'wenxian': '', 'time': '', 'guanzhi': '知枢密院事、参知政事、殿中省尚辇奉御、太学博士、知某州军州事、秘书省著作郎、资政殿学士、监修国史、籍田司令、知某府军府事、权尚书省吏部侍郎、提举兵马巡检盗贼公事', 'shqf': '史学家', 'rs': '进士'}, {'name': '李性傅', 'shiji': '魏了翁致书Y', 'location': {'lng': '104.068840', 'lat': '29.615920'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '孙书', 'shiji': '魏了翁致书Y', 'location': {'lng': '119.433854', 'lat': '32.131962'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '收徒讲学', 'rs': '正常科举'}, {'name': '丁黼', 'shiji': '魏了翁致书Y', 'location': {'lng': '117.486306', 'lat': '30.210313'}, 'wenxian': '', 'time': '？-1239年', 'guanzhi': '安抚使、知某州军州事、群牧制置使、直显谟阁、知某府军府事、安抚制置使', 'shqf': '', 'rs': '进士'}, {'name': '吴潜', 'shiji': '魏了翁致书Y', 'location': {'lng': '119.028280', 'lat': '31.651133'}, 'wenxian': '', 'time': '1196-1262年', 'guanzhi': '总领、尚书省户部侍郎、知某军事、安抚使、兵部尚书、参知政事、朝请大夫、丞相、观文殿大学士、国公、卿、端明殿学士、府、太常寺少卿、太中大夫、知某州军州事、转运副使、资政殿学士、左丞相、秘阁修撰、权户部侍郎、尚书省兵部侍郎、权兵部侍郎、知某府军府事、沿海制置副使、检正、沿江制置大使', 'shqf': '削籍官员', 'rs': ''}, {'name': '蒋重珍', 'shiji': '魏了翁致书Y', 'location': {'lng': '120.311910', 'lat': '31.491169'}, 'wenxian': '', 'time': '', 'guanzhi': '殿中省尚辇奉御、少师、舍人院、知某州军州事、秘书省著作郎、著作佐郎、崇政殿说书、集英殿修撰、刑部侍郎、簽书节度判官厅公事', 'shqf': '', 'rs': '进士'}, {'name': '黄伯固', 'shiji': '魏了翁致书Y', 'location': {'lng': '117.471373', 'lat': '26.728953'}, 'wenxian': '', 'time': '', 'guanzhi': '安抚使、知某县事、知某州军州事、宝章阁待制、尚书省兵部侍郎、知某府军府事、\t沿江水军制置使', 'shqf': '', 'rs': '进士'}, {'name': '吴泳', 'shiji': '魏了翁被致书由Y', 'location': {'lng': '116.062269', 'lat': '27.764062'}, 'wenxian': '', 'time': '1179-？', 'guanzhi': '朝請大夫、輕車都尉、上騎都尉、少卿、尚書省刑部尚書、知某州軍州事、知某州軍州事、知某州軍州事、中書舍人、直學士院、實章閣學士、實章閣直學士、實章閣待制、權中書舍人、權刑部尚書、玉牒所檢討官、修玉牒官、知某府軍府事、軍器監少監', 'shqf': '文官、思想家', 'rs': '进士'}, {'name': '黄中', 'shiji': '魏了翁答Y书', 'location': {'lng': '117.492534', 'lat': '27.340327'}, 'wenxian': '', 'time': '1096-1180年', 'guanzhi': '尚书省工部侍郎、兵部尚书、国子监司业、门下省给事中、三公、端明殿学士、显谟阁学士', 'shqf': '熟谙兵法韬略、军事家', 'rs': '进士'}, {'name': '范子长', 'shiji': '魏了翁答Y书', 'location': {'lng': '104.078003', 'lat': '30.649099'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '常德', 'shiji': '魏了翁答Y书', 'location': {'lng': '114.199134', 'lat': '38.247144'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '富豪', 'rs': ''}, {'name': '袁甫', 'shiji': '魏了翁答Y书', 'location': {'lng': '121.558692', 'lat': '29.831985'}, 'wenxian': '', 'time': '1174-1240年', 'guanzhi': '安抚使、兵部尚书、朝奉郎、国子监祭酒、轻车都尉、上骑都尉、少卿、少师、知某州军州事、中书舍人、著作佐郎、转运司判官、直徽猷阁、权中书舍人、权兵部尚书、判官、知某府军府事、秘书省少监', 'shqf': '思想家', 'rs': '进士'}, {'name': '史弥忠', 'shiji': '魏了翁答Y书', 'location': {'lng': '121.558073', 'lat': '29.828738'}, 'wenxian': '', 'time': '1165-1244年', 'guanzhi': '提举、知某军事、朝奉郎、县尉、知某州军州事、宝谟阁待制', 'shqf': '思想家', 'rs': '进士'}, {'name': '陈畴', 'shiji': '魏了翁答Y书', 'location': {'lng': '116.045060', 'lat': '29.448128'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、朝散大夫、知某县事、知某州军州事', 'shqf': '', 'rs': ''}, {'name': '易祓', 'shiji': '魏了翁答Y书', 'location': {'lng': '112.551885', 'lat': '28.277483'}, 'wenxian': '', 'time': '', 'guanzhi': '国子监司业、骑都尉、殿中省尚辇奉御、上轻车都尉、殿中省尚舍奉御、知某州军州事、秘书省著作郎、著作佐郎、枢密院检详诸房文字、国史院编修、实录院检讨官', 'shqf': '', 'rs': '进士'}, {'name': '曾宏迪', 'shiji': '魏了翁答Y书', 'location': {'lng': '115.544536', 'lat': '28.055499'}, 'wenxian': '', 'time': '', 'guanzhi': '集英殿修撰、将作监监、知某府军府事', 'shqf': '经学家', 'rs': '进士'}, {'name': '彭铉', 'shiji': '魏了翁答Y书', 'location': {'lng': '119.064767', 'lat': '33.602919'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、路提点刑狱公事、知某州军州事、直宝谟阁、直秘阁、经略安抚使', 'shqf': '', 'rs': ''}, {'name': '朱择善', 'shiji': '魏了翁答Y书', 'location': {'lng': '120.106269', 'lat': '30.867311'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '经学家、士人', 'rs': ''}, {'name': '李通', 'shiji': '魏了翁答Y书', 'location': {'lng': '120.311910', 'lat': '31.491169'}, 'wenxian': '', 'time': '', 'guanzhi': '知某县事', 'shqf': '', 'rs': ''}, {'name': '刘子澄', 'shiji': '魏了翁答Y书', 'location': {'lng': '115.621934', 'lat': '33.160326'}, 'wenxian': '', 'time': '', 'guanzhi': '军器监主簿、县令、安抚使司(大使司)参议官、抚参', 'shqf': '', 'rs': '进士'}, {'name': '潘子顺', 'shiji': '魏了翁答Y书', 'location': {'lng': '120.688393', 'lat': '28.155345'}, 'wenxian': '', 'time': '', 'guanzhi': '知某州军州事', 'shqf': '', 'rs': ''}, {'name': '李亢宗', 'shiji': '魏了翁答Y书', 'location': {'lng': '118.386279', 'lat': '24.960385'}, 'wenxian': '', 'time': '', 'guanzhi': '知某县事', 'shqf': '儒学、理学家', 'rs': ''}, {'name': '林观过', 'shiji': '魏了翁答Y书', 'location': {'lng': '119.296494', 'lat': '26.074507'}, 'wenxian': '', 'time': '', 'guanzhi': '知某县事、分差建康府诸军粮料院', 'shqf': '理学家', 'rs': '进士'}, {'name': '张元简', 'shiji': '魏了翁答Y书', 'location': {'lng': '115.402992', 'lat': '28.001657'}, 'wenxian': '', 'time': '', 'guanzhi': '知某军事、太府寺丞、知某州军州事、转运司判官、直宝文阁、直宝章阁、防御推官、制置副使、沿江水军制置副使', 'shqf': '地方乡绅、思想家', 'rs': '进士'}, {'name': '冯吉', 'shiji': '魏了翁答Y书', 'location': {'lng': '112.430185', 'lat': '34.671390'}, 'wenxian': '', 'time': '919-963年', 'guanzhi': '太常寺少卿、户部郎中、金部员外郎、秘书省校书郎、膳部员外郎、司勋郎中、太常少卿、职方员外郎、屯田郎中', 'shqf': '诗人', 'rs': ''}, {'name': '蒋山', 'shiji': '魏了翁答Y书', 'location': {'lng': '109.696311', 'lat': '26.575052'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '陈宓', 'shiji': '魏了翁收到Y的答书', 'location': {'lng': '119.852541', 'lat': '32.910459'}, 'wenxian': '', 'time': '1171-1230年', 'guanzhi': '军器监主簿、知某军事、朝奉郎、知某县事、知某州军州事、直龙图阁、直秘阁、监都进奏院、进奏官、监盐、龙图、寺丞', 'shqf': '理学家、良吏、循吏', 'rs': ''}, {'name': '文元', 'shiji': '魏了翁为Y作临别赠言(送别诗、序)', 'location': {'lng': '111.043715', 'lat': '25.940085'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '叶元老', 'shiji': '魏了翁为Y作临别赠言(送别诗、序)', 'location': {'lng': '118.763232', 'lat': '32.061707'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '辛克承', 'shiji': '赠诗、文', 'location': {'lng': '118.497972', 'lat': '31.571213'}, 'wenxian': '', 'time': '', 'guanzhi': '太府寺卿、知某州军州事、直显谟阁、知某府军府事、主管宫观', 'shqf': '', 'rs': ''}],

      three2: [{'name': '魏了翁', 'shiji': '杜孝严书跋由Y所作', 'location': {'lng': '103.512036', 'lat': '30.193446'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}],
      three3: [{'name': '吴玠', 'shiji': '兄', 'location': {'lng': '105.732556', 'lat': '35.521976'}, 'wenxian': '', 'time': '1080-1139', 'guanzhi': '安抚使、开封府判官、磨勘诸路提点、刑狱司、右承议郎、知某州军州事、都统制、知某府军府事、主管经略安抚、使司公事、宣抚副使、某州观察使、宣抚使、制置使、宣抚使、路分马步军副、总管', 'shqf': '武官', 'rs': '军功补授门'}, {'name': '杨从义', 'shiji': '吴璘部将为Y', 'location': {'lng': '107.400737', 'lat': '34.521218'}, 'wenxian': '', 'time': '1092-1169', 'guanzhi': '磨勘诸路提点、刑狱司、知某州军州事、进武校尉、都统制、某州防御使', 'shqf': '武官', 'rs': ''}, {'name': '魏了翁', 'shiji': '吴璘为Y之收藏作跋', 'location': {'lng': '103.512036', 'lat': '30.193446'}, 'wenxian': '跋吴武安所得高孝两朝宸翰(鹤山大全集65/1下)。', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}, {'name': '晁公遡', 'shiji': '吴璘祭文由Y所作', 'location': {'lng': '115.029215', 'lat': '35.761829'}, 'wenxian': '祭吳宣撫文(嵩山居士集28/8下)。', 'time': '1109-？', 'guanzhi': '朝奉大夫', 'shqf': '文官', 'rs': '进士'}, {'name': '汪应辰', 'shiji': '吴璘传记作者为Y', 'location': {'lng': '118.245124', 'lat': '28.682055'}, 'wenxian': '书吴忠烈遗事(文定集12/138)。', 'time': '1118-1176', 'guanzhi': '尚书省户部侍郎、左朝散大夫卿、殿中省尚舍奉御、端明殿学士、通判、知某州军州事、左中奉大夫、敷文阁直学士、直秘阁、集英殿修撰、知某府军府事、安抚制置使、通判某州军州事、宣抚使、俭判', 'shqf': '文官、财政官员、思想家', 'rs': '进士'}],
      three4: [{'name': '吴谦', 'shiji': '曾祖', 'location': {'lng': '105.740668', 'lat': '35.509044'}, 'wenxian': '', 'time': '1015-？', 'guanzhi': '右承议郎、 国夫人', 'shqf': '武官', 'rs': ''}, {'name': '张浚', 'shiji': '吴玠为Y之部将', 'location': {'lng': '104.194842', 'lat': '31.340945'}, 'wenxian': '', 'time': '1097-1164', 'guanzhi': '福密使、右仆射兼门下、侍郎、右仆射兼门下、侍郎、知福密院事、安抚使、丞相、观文殿大学士、国公、节度使、骑都尉、特进、提举杭州洞霄宫、左宣奉大夫、知某州军州事、资政殿大学士、少傅、集英殿修撰、尚书省工部虞部司郎中、太常寺主簿、知某府军府事、判某州军州事、宣抚处置使', 'shqf': '财政官员、宰执', 'rs': '进士'}, {'name': '郭浩', 'shiji': '吴玠部将为Y', 'location': {'lng': '105.692702', 'lat': '35.259179'}, 'wenxian': '鳳翔府 金人抵和尚原下 浩與吳玠隨方捍禦 蜀以安全 後拜檢校少保、永興軍路經略安撫使', 'time': '1087-1145', 'guanzhi': '开国伯、律学助教、右承议郎、知某州军、都统制、经略安抚使、知某府军府事、兵马铃辖、某军节度使、马步军龙卫神、卫四麻都指挥使、宣论使、福密院都统制', 'shqf': '武官', 'rs': ''}, {'name': '牛皓', 'shiji': '吴玠部将为Y', 'location': {'lng': '104.926337', 'lat': '33.392211'}, 'wenxian': '为川陕宣抚后军中部将 绍兴间金人犯秦川 副使吴玠遣皓伺之 皓与金兵遇 所部不满二百', 'time': '1088-1147', 'guanzhi': '武功大夫、宣抚使', 'shqf': '', 'rs': ''}, {'name': '杨从义', 'shiji': '吴玠部将为Y', 'location': {'lng': '107.400737', 'lat': '34.521218'}, 'wenxian': '凤翔天兴人 靖康元年应募 隶吴玠麾下 补进武校尉 继隶宣抚吴璘', 'time': '1092-1169', 'guanzhi': '磨勘诸路提点、刑狱司、知某州军州事、进武校尉、都统制、某州防御使', 'shqf': '武官', 'rs': ''}, {'name': '刘子羽', 'shiji': '吴玠欣赏/器重/军事支持Y', 'location': {'lng': '118.036237', 'lat': '27.750558'}, 'wenxian': '仕至徽猷阁待制 秦桧讽谏官论罢之 吴玠未知名 子羽独奇之 朱松以子熹托子羽、用为都统制 金人寇汉阳 刘子羽以驿书招玠 玠夜驰三百里赴之 撒离喝惊其神速', 'time': '1097-1146', 'guanzhi': '右朝请大夫、待制、国公、知某州军州事、少傅、徽猷阁待制、集英殿修撰、经略安抚使、沿江安抚使、散官', 'shqf': '文官', 'rs': '征召门、恩荫门'}, {'name': '卢法原', 'shiji': '不合', 'location': {'lng': '119.977401', 'lat': '30.542510'}, 'wenxian': '分地置将 前后履捷 素与吴玠不睦 玠劾之 帝手诏诘问', 'time': '1062-？', 'guanzhi': '尚书省户部尚书、三司盐铁勾院卿、端明殿学士、司农寺少卿、太府寺少卿、知某县事、知某州军州事、徽猷阁直学士、知某府军府事、宣抚副使', 'shqf': '财政官员', 'rs': '进士、学生门'}, {'name': '魏了翁', 'shiji': '吴玠书跋由Y所作', 'location': {'lng': '103.506498', 'lat': '30.196789'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}, {'name': '吴泳', 'shiji': '吴玠传记作者为Y', 'location': {'lng': '116.062269', 'lat': '27.764062'}, 'wenxian': '', 'time': '1179-？', 'guanzhi': '朝请大夫、轻车都尉、上骑都尉、少卿、尚书省刑部尚书、知某州军州事、知某州军州事、知某州军州事、中书舍人、直学士院、实章阁学士、实章阁直学士、实章阁待制、权中书舍人、权刑部尚书、玉牒所检讨官、修玉牒官、知某府军府事、军器监少监', 'shqf': '文官、思想家', 'rs': '进士'}, {'name': '杨政', 'shiji': '吴玠受Y之军事支持', 'location': {'lng': '107.200832', 'lat': '35.677462'}, 'wenxian': '政甫七岁 哀号如成人 建炎间从吴玠击金兵 累捷 积功至环庆路经略安抚使', 'time': '1098-1157', 'guanzhi': '秘书省校书郎、太尉、知某州军州事、右武大夫、经略安抚使、某州团练使', 'shqf': '', 'rs': ''}, {'name': '刘宣', 'shiji': '吴玠受Y之军事支持', 'location': {'lng': '109.432369', 'lat': '35.761975'}, 'wenxian': '为秦凤路兵马都监 金人入关陕 宣遗蜡书与吴玠相结 且率金将任拱等以所部归朝 约日已定', 'time': '', 'guanzhi': '兵马都监', 'shqf': '武官', 'rs': ''}],
      three5:[{'name': '程公许', 'shiji': '崔与之临别得到Y所作赠言(送别诗、序)', 'location': {'lng': '103.831581', 'lat': '30.047880'}, 'wenxian': '', 'time': '1182-？', 'guanzhi': '骑都尉、知某州军州事、侍读、直实误阁、权刑部尚书、知某府军府事', 'shqf': '文官', 'rs': '进士'}, {'name': '宋诩', 'shiji': '崔与之致书Y', 'location': {'lng': '119.006128', 'lat': '25.428579'}, 'wenxian': '', 'time': '', 'guanzhi': '知某县事、知某州军州事、直燥章阁、通判某州军州事', 'shqf': '文官', 'rs': '恩荫门'}, {'name': '安丙', 'shiji': '崔与之致书Y', 'location': {'lng': '106.748083', 'lat': '30.432504'}, 'wenxian': '', 'time': '1148-1221年', 'guanzhi': '同知枢密院事、知某军事、安抚使、观文殿大学士、秘书省校书郎、端明殿学士、右承议郎、知某州军州事、中大夫、资政殿学士、知某府军府事、宣抚使、', 'shqf': '良吏、循吏', 'rs': ''}, {'name': '吴泳', 'shiji': '崔与之被致书由Y', 'location': {'lng': '116.062269', 'lat': '27.764062'}, 'wenxian': '', 'time': '1179-？', 'guanzhi': '朝请大夫、轻车都尉、上骑都尉、少卿、尚书省刑部尚书、知某州军州事、知某州军州事、知某州军州事、中书舍人、直学士院、实章阁学士、实章阁直学士、实章阁待制、权中书舍人、权刑部尚书、玉牒所检讨官、修玉牒官、知某府军府事、军器监少监', 'shqf': '文官、思想家', 'rs': '进士'}, {'name': '李昴英', 'shiji': '崔与之行状由Y所作', 'location': {'lng': '113.264434', 'lat': '23.129162'}, 'wenxian': '崔清献公行状 / 崔清献公集', 'time': '1201-1257', 'guanzhi': '轻车都尉、三丞、推官、右正言、知某州军州事、直秘阁、大理寺司直、经略安抚使司管勾（主管）机宜文字', 'shqf': '文官', 'rs': '进士'}, {'name': '刘克庄', 'shiji': '崔与之祭文由Y所作', 'location': {'lng': '119.009357', 'lat': '25.429482'}, 'wenxian': '', 'time': '1187-1269', 'guanzhi': '三公、县令、知某州军州事、中书舍人、转运使、福密院编修、直实文阁、焕章阁学士、实章阁学士、宗正寺主簿、秘书省少监、侍右郎官', 'shqf': '财政官员', 'rs': '特旨门、恩荫门'}, {'name': '程珌', 'shiji': '崔与之书跋由Y所作', 'location': {'lng': '118.199179', 'lat': '29.789095'}, 'wenxian': '', 'time': '1164-1242', 'guanzhi': '输林学士、磨勘诸路提点、刑狱司、骑都尉、端明殿学士、正奉大夫、正议大夫、知某州军州事、直学士院、实文阁学士', 'shqf': '为官者：文', 'rs': '进士'}, {'name': '文天祥', 'shiji': '崔与之书跋由Y所作', 'location': {'lng': '114.992509', 'lat': '27.113443'}, 'wenxian': '', 'time': '1236-1283', 'guanzhi': '尚书省工部尚书、福密使、安抚使、丞相、国公、上轻车都尉、殿中省尚舍奉御、端明殿学士、右承议郎、路提点刑狱公事、知某县事、知某州军州事、左丞相、右丞相、福密院都承旨、尚书省礼部司员外郎、权工部尚书、知某府军府事、安抚制置使、都督等', 'shqf': '宰执、思想家', 'rs': '进士'}, {'name': '牟巘', 'shiji': '崔与之书跋由Y所作', 'location': {'lng': '104.069726', 'lat': '29.651287'}, 'wenxian': '', 'time': '1227-1311', 'guanzhi': '大理寺司直、大理寺少卿', 'shqf': '遗民、经学家、文官', 'rs': '进士'}, {'name': '方岳', 'shiji': '崔与之书跋由Y所作', 'location': {'lng': '117.737785', 'lat': '29.839115'}, 'wenxian': '', 'time': '1199-1262', 'guanzhi': '知某州军州事、宗子博士、参议官', 'shqf': '士人、史学家、工于骈体文、文官', 'rs': '进士'}, {'name': '魏了翁', 'shiji': '崔与之建筑物得到Y的题咏、记、命名', 'location': {'lng': '103.512036', 'lat': '30.193446'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}, {'name': '洪咨夔', 'shiji': '崔与之建筑物得到Y的题咏、记、命名', 'location': {'lng': '120.151457', 'lat': '30.290905'}, 'wenxian': '', 'time': '1176-1236年', 'guanzhi': '朝请郎、翰林学士、轻车都尉、监察御史、端明殿学士、右承议郎、尚书省刑部尚书、银青光禄大夫、中书舍人、通判某州军州事、侍读、侍讲', 'shqf': '', 'rs': '进士'}, {'name': '姚勉', 'shiji': '崔与之建筑物得到Y的题咏、记、命名', 'location': {'lng': '115.087807', 'lat': '28.456805'}, 'wenxian': '', 'time': '1216-1262', 'guanzhi': '上轻车都尉', 'shqf': '文官', 'rs': '进士'}, {'name': '吴纯臣', 'shiji': '推荐', 'location': {'lng': '113.364257', 'lat': '22.939394'}, 'wenxian': '', 'time': '999-？', 'guanzhi': '朝议大夫、散骑常侍、路提点刑狱公事、 通奉大夫\n', 'shqf': '文官', 'rs': ''}, {'name': '温若春', 'shiji': '推荐', 'location': {'lng': '113.363849', 'lat': '22.939925'}, 'wenxian': '历秘书省正字 寻转校书郎 崔与之素重其学行 荐诸朝 谓宜委清要之任', 'time': '', 'guanzhi': '朝奉郎、殿中省尚辇奉御、上轻车都尉、殿中省尚舍奉御', 'shqf': '孝子/孝女', 'rs': ''}, {'name': '王梠', 'shiji': '友', 'location': {'lng': '118.432941', 'lat': '31.352859'}, 'wenxian': '', 'time': '', 'guanzhi': '监岳庙', 'shqf': '落第士人', 'rs': '举人科'}, {'name': '刘宰', 'shiji': '同道', 'location': {'lng': '119.597897', 'lat': '31.723247'}, 'wenxian': '时相收召誉望略尽 所不能举者 宰与崔与之耳 隐处三十年 于书无所不读', 'time': '1166-1239', 'guanzhi': '右奉直大夫、太常寺丞、籍田司令、将作监少监、知某府军府事', 'shqf': '理学家、文官', 'rs': '进士'}, {'name': '曾士倬', 'shiji': '崔与之学生为Y', 'location': {'lng': '113.208510', 'lat': '23.395046'}, 'wenxian': '字子美 番禺人 学于崔与之、再学于李昴英 长于赋 年三十六登宝祐四年五甲第八十一名', 'time': '1220-？', 'guanzhi': '县令', 'shqf': '', 'rs': '进士'}, {'name': '黄镛', 'shiji': '崔与之学生为Y', 'location': {'lng': '119.010445', 'lat': '25.426452'}, 'wenxian': '工晚唐诗律 游五羊 获登崔与之之门 因筑舍于旁 名楼以诗隐', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '崔世明', 'shiji': '父', 'location': {'lng': '113.829866', 'lat': '23.290187'}, 'wenxian': '', 'time': '1135-？', 'guanzhi': '', 'shqf': '', 'rs': '特旨门'}, {'name': '崔璲', 'shiji': '子', 'location': {'lng': '113.830084', 'lat': '23.290981'}, 'wenxian': '', 'time': '1193-？', 'guanzhi': '', 'shqf': '', 'rs': ''}] ,
      three6: [{'name': '虞琪', 'shiji': '父', 'location': {'lng': '104.134082', 'lat': '29.995630'}, 'wenxian': '据宋史列传CBDB宋史分传#1219', 'time': '1086-？', 'guanzhi': '太子太师、转运司判官', 'shqf': '财政官员', 'rs': '进士'}, {'name': '虞询', 'shiji': '从子;姪子', 'location': {'lng': '104.134082', 'lat': '29.995630'}, 'wenxian': '', 'time': '1164-？', 'guanzhi': '', 'shqf': '文官', 'rs': '进士'}, {'name': '虞公亮', 'shiji': '子', 'location': {'lng': '104.134082', 'lat': '29.995630'}, 'wenxian': '', 'time': '1139-？', 'guanzhi': '', 'shqf': '文官', 'rs': ''}, {'name': '虞公着', 'shiji': '次子', 'location': {'lng': '104.134082', 'lat': '29.995630'}, 'wenxian': '据宋史列传CBDB宋史分传#1219', 'time': '1139-？', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '虞杭孙', 'shiji': '三子', 'location': {'lng': '104.134082', 'lat': '29.995630'}, 'wenxian': '据宋史列传CBDB宋史分传#1219', 'time': '1139-？', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '虞夷简', 'shiji': '孙', 'location': {'lng': '104.147700', 'lat': '29.998850'}, 'wenxian': '', 'time': '1169-？', 'guanzhi': '', 'shqf': '文官', 'rs': ''}, {'name': '虞刚简', 'shiji': '孙', 'location': {'lng': '103.835817', 'lat': '30.038830'}, 'wenxian': '', 'time': '1164-1227年', 'guanzhi': '路提点司狱公事', 'shqf': '收徒讲学、良吏、循吏', 'rs': '进士'}, {'name': '虞方简', 'shiji': '孙', 'location': {'lng': '103.839117', 'lat': '30.039640'}, 'wenxian': '', 'time': '1164-？', 'guanzhi': '', 'shqf': '文官', 'rs': '进士'}, {'name': '虞兟', 'shiji': '曾孙; 重孙', 'location': {'lng': '117.486307', 'lat': '30.210314'}, 'wenxian': '', 'time': '1198-？', 'guanzhi': '朝请大夫、县令、知某县事、知某州军州事、户部司郎中', 'shqf': '良吏、循吏、财政官员', 'rs': ''}, {'name': '符行中', 'shiji': '相识', 'location': {'lng': '116.525725', 'lat': '27.218445'}, 'wenxian': '迁江西转运使 奏减月俸虚额五分 识虞允文于常僚中 后以言事夺职 安置南雍州', 'time': '1100-1159', 'guanzhi': '总领、提举茶场买马、太府寺卿、太府寺少卿、通判、知某州军州事、转运使、敷文阁待制、直秘阁、户部司郎中、知某府军府事、总领四川财赋军马钱粮专一报发御前军马文字、安抚制置使', 'shqf': '财政官员', 'rs': '进士'}, {'name': '刘錡', 'shiji': '同僚', 'location': {'lng': '105.724947', 'lat': '34.580863'}, 'wenxian': '遂督兵战 大败之 刘錡执其手曰：朝廷养兵三十年 今日大功乃出儒者 孝宗时拜左丞相', 'time': '1098-1162', 'guanzhi': '提举宫观、律学助教、秘书省校书郎、阁门宣赞舍太尉、知某州军州事、知某州军州事、知某州军州事、知某州军州事、右武大夫、知某府军府事、知某府军府事、节制军马、安抚制置使、东京副留守、某军节度使、某州团练使、龙右都护、知某州军府事、制置使', 'shqf': '武官', 'rs': '恩荫门'}, {'name': '万庚', 'shiji': '辟', 'location': {'lng': '120.699366', 'lat': '27.994267'}, 'wenxian': '', 'time': '1125-？', 'guanzhi': '散骑常侍、县尉、某州(府军监)学教授 ', 'shqf': '词人、文官', 'rs': '进士'}, {'name': '李流谦', 'shiji': '虞允文幕僚为Y', 'location': {'lng': '104.220750', 'lat': '31.338077'}, 'wenxian': '', 'time': '1123-1176', 'guanzhi': '将仕郎、通判某府军府事、某州(府军监)学教授', 'shqf': '诗人、文官', 'rs': '恩荫门'}, {'name': '邓深', 'shiji': '欣赏/器重', 'location': {'lng': '112.909426', 'lat': '28.689105'}, 'wenxian': '守令贪污 即劾奏 虞允文称其刚介 后以朝散大夫终于家 有邓绅伯集十卷', 'time': '1113-？', 'guanzhi': '提举市舶司官、左朝奉郎、朝散大夫、太府寺丞、知某州军州事、转运使、路提举市舶司', 'shqf': '财政官员', 'rs': '进士'}, {'name': '赵眘', 'shiji': '虞允文得到Y的支持', 'location': {'lng': '120.755486', 'lat': '30.746129'}, 'wenxian': '', 'time': '1127-1194', 'guanzhi': '国公、秘书省监、皇子、皇太子、太上皇', 'shqf': '宗子、统治者、皇帝', 'rs': '宫廷门'}, {'name': '刘朔', 'shiji': '虞允文得到Y的支持', 'location': {'lng': '118.907674', 'lat': '25.386139'}, 'wenxian': '寻奉祠 再召入对 时虞允文方赞恢复 朔言宜练兵蓄财 以待其变', 'time': '1131-1175', 'guanzhi': '殿中省尚舍奉御、司户参军、 知某县事\n', 'shqf': '文官', 'rs': '进士'}, {'name': '周必大', 'shiji': '推荐', 'location': {'lng': '115.023449', 'lat': '26.969989'}, 'wenxian': '怀袖有方册曰材馆录 闻一善人必书 首荐胡铨、周必大等二十人 一时得人称盛 有奏议诗文等集', 'time': '1126-1204', 'guanzhi': '参知政事、丞相、观文殿大学上、国公、输林学士、输林学士承旨、门下省给事中、骑都尉、卿、上骑都尉、少卿、太师、路提点刑狱公事、知某州军州事、右丞相、少传、知阁门事、判某府军府事、秘书省少监、东宫官、提举敕令所', 'shqf': '宰执', 'rs': '进士'}, {'name': '胡铨', 'shiji': '推荐', 'location': {'lng': '115.118092', 'lat': '26.971390'}, 'wenxian': '怀袖有方册曰材馆录 闻一善人必书 首荐胡铨、周必大等二十人 一时得人称盛 有奏议诗文等集', 'time': '1102-1180', 'guanzhi': '尚书省工部、侍郎、提举宫观、磨勘诸路提、点刑狱司、上骑都尉、少卿、端明殿学士、左奉议郎公、通直郎、贤良方正、知某州军州事、敷文阁直学、集英殿修撰、判官、吏部郎官、秘书省少监、提举隆兴玉、隆万寿宫', 'shqf': '文官', 'rs': '进士'}, {'name': '赵雄', 'shiji': '推荐', 'location': {'lng': '104.907507', 'lat': '30.113454'}, 'wenxian': '', 'time': '1129-1193', 'guanzhi': '同知福密院事、安抚使、参知政事、丞相、观文殿大学士、国公、秘书省校书郎、磨勘京朝官院、殿中省尚舍、奉御、端明殿学士、右承议郎等', 'shqf': '理学家、宰执', 'rs': '进士'}, {'name': '王质', 'shiji': '推荐', 'location': {'lng': '117.020359', 'lat': '36.668530'}, 'wenxian': '有忌之者 寻罢去 虞允文当国 荐质可右正言 时中贵用事', 'time': '1135-1189', 'guanzhi': '右正言、太学正、相国', 'shqf': '文官', 'rs': '进士'}, {'name': '赵思', 'shiji': '推荐', 'location': {'lng': '112.454040', 'lat': '34.619682'}, 'wenxian': '绍兴二十四年进士 调锺离簿 以虞允文荐召对 孝宗问恢复大计 思对合帝意', 'time': '1125-1194', 'guanzhi': '朝奉大夫、少师、左奉议郎、知某州军州事、知某州军州事、中大夫、县主簿、直龙图阁、集英殿修撰、知某府军府事、提举太平兴国宫', 'shqf': '财政官员', 'rs': '进士'}, {'name': '丘崈', 'shiji': '推荐', 'location': {'lng': '120.284939', 'lat': '31.920658'}, 'wenxian': '', 'time': '1134-1208', 'guanzhi': '福密使、同知福密院事、兵部尚书、国子监博士、端明殿学士、通奉大夫、尚书省刑部、尚书、侍读、签书福密院事、燥章阁学士、知某府军府事、知某府军府事、安抚制置使、宣抚使\n', 'shqf': '宰执', 'rs': '进士'}, {'name': '杨万里', 'shiji': '虞允文墓志铭由Y所作', 'location': {'lng': '115.026481', 'lat': '27.314894'}, 'wenxian': '', 'time': '1127-1206', 'guanzhi': '朝请郎、光禄大夫、国子监博士、磨勘诸路提、点刑狱司、幕职官、上护军、上骑都尉、承议郎、太常寺博士、太常寺丞、路提点刑狱、公事、县丞、知某县事、知制语等', 'shqf': '诗人、财政官员、思想家', 'rs': '进士'}, {'name': '魏了翁', 'shiji': '虞允文书跋由Y所作', 'location': {'lng': '103.506498', 'lat': '30.196789'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}, {'name': '郑元祐', 'shiji': '虞允文书跋由Y所作', 'location': {'lng': '120.207217', 'lat': '30.238724'}, 'wenxian': '', 'time': '1292-1364', 'guanzhi': ' 诸路总管府儒学教授、 行省儒学提举', 'shqf': '文官', 'rs': '征召门'}, {'name': '朱存理', 'shiji': '虞允文书跋由Y所作', 'location': {'lng': '120.585315', 'lat': '31.298886'}, 'wenxian': '', 'time': '1444-1513', 'guanzhi': '', 'shqf': '布衣、士人、博学之人、工于文', 'rs': ''}, {'name': '张栻', 'shiji': '虞允文祭文由Y所作', 'location': {'lng': '104.198214', 'lat': '31.339155'}, 'wenxian': '', 'time': '1133-1180', 'guanzhi': '安抚使、承务郎、右承务郎、律学助教、轻车都尉、司理参军、知某州军州事、转运副使、转运使、直实阁、直秘阁、文殿修撰、秘阁修撰等', 'shqf': '理学家、文官、思想家', 'rs': '进士类、 恩荫门'}, {'name': '员兴宗', 'shiji': '虞允文传记作者为Y', 'location': {'lng': '104.134082', 'lat': '29.995630'}, 'wenxian': '', 'time': '1112-1171', 'guanzhi': '礼仪院、秘书省著作郎、国史院编修、实录院检讨官', 'shqf': '文官', 'rs': '进士'}, {'name': '吕祖谦', 'shiji': '虞允文字说、名述由Y所作', 'location': {'lng': '116.711051', 'lat': '32.709445'}, 'wenxian': '', 'time': '1137-1181', 'guanzhi': '上轻车都尉、殿中省尚舍、奉御、承议郎、财马都尉、太学博士、主管台州崇、道观、监狱庙、县尉、左宣教郎、秘书省著作郎、秘书省著作郎、著作佐郎、直秘阁、国史院编修、实录院检讨官、安抚使司（大使司）参议官左迪功郎等', 'shqf': '史学家、理学家、文官、思想家', 'rs': '制举、恩荫门、进士'}, {'name': '张浚', 'shiji': '虞允文被致书由Y', 'location': {'lng': '104.194842', 'lat': '31.340945'}, 'wenxian': '', 'time': '1097-1164', 'guanzhi': '福密使、右仆射兼门下、侍郎、右仆射兼门下、侍郎、知福密院事、安抚使、丞相、观文殿大学士、国公、节度使、骑都尉、特进、提举杭州洞霄宫、左宣奉大夫、知某州军州事、资政殿大学士、少傅、集英殿修撰、尚书省工部虞部司郎中、太常寺主簿、知某府军府事、判某州军州事、宣抚处置使', 'shqf': '财政官员、宰执', 'rs': '进士'}, {'name': '陆游', 'shiji': '虞允文被致书由Y', 'location': {'lng': '120.580232', 'lat': '30.029752'}, 'wenxian': '', 'time': '1125-1209', 'guanzhi': '提举、朝请大夫、登仕郎、司理参军、知某州军州事、县主簿、福密院编修、实阁待制、参议官', 'shqf': '诗人、财政官员', 'rs': '特旨门、恩荫门'}, {'name': '蔡戡', 'shiji': '虞允文被致书由Y', 'location': {'lng': '118.691601', 'lat': '25.362094'}, 'wenxian': '', 'time': '1141-？', 'guanzhi': '朝请大夫、律学助教、司农寺卿、司农寺少卿、路提点刑狱、公事、县尉、知某州军州事、实误阁直学、集英殿修撰、右文殿修撰、经略安抚使等\n', 'shqf': '良吏、循吏、财政官员', 'rs': '进士'}, {'name': '薛季宣', 'shiji': '虞允文被致书由Y', 'location': {'lng': '120.655135', 'lat': '28.015455'}, 'wenxian': '', 'time': '1134-1173', 'guanzhi': '右奉议郎、右通直郎、知某州军州事、大理寺正、大理寺主簿、机宜、书写机宜文字', 'shqf': '刺史幕僚（知州幕僚）、思想家', 'rs': '征召门、恩荫门'}, {'name': '王十朋', 'shiji': '虞允文被致书由Y', 'location': {'lng': '120.967147', 'lat': '28.116083'}, 'wenxian': '', 'time': '1112-1171', 'guanzhi': '三公、舍人院、左承议郎、太子詹事、知某州军州事、崇政殿说书、敷文阁直学士、敷文阁待制、集英殿修撰、愈判', 'shqf': '文官', 'rs': '进士'}, {'name': '周孚', 'shiji': '虞允文被致书由Y', 'location': {'lng': '117.119999', 'lat': '36.651216'}, 'wenxian': '', 'time': '1135-1177', 'guanzhi': '某州(府军监)学教授', 'shqf': '士人、诗人、词人、文官', 'rs': '进士'}, {'name': '楼钥', 'shiji': '虞允文收到Y的啓', 'location': {'lng': '121.550357', 'lat': '29.874556'}, 'wenxian': '楼钥《攻媿集》卷六四《代（曾逮）贺虞丞相（允文）启》。', 'time': '1137-1213', 'guanzhi': '同知极密院事、参知政事、朝议大夫、提举宫观、国子监司业、输林学士、门下省给事中、龙图阁待制牧、幕职官、卿、三馆、少卿、端明殿学士府、太常寺博士、太常寺少卿', 'shqf': '富豪、理学家、宰执', 'rs': '进士'}],
      three7: [{'name': '赵廷美', 'shiji': '八世祖;太高祖', 'location': {'lng': '115.974422', 'lat': '39.485283'}, 'wenxian': '', 'time': '947-984', 'guanzhi': '节度使、王、府尹、中书令、开封府尹、府法曹参军、郡守、郡王', 'shqf': '武官', 'rs': '军功补授门'}, {'name': '赵洸夫', 'shiji': '次子', 'location': {'lng': '103.958013', 'lat': '30.990165'}, 'wenxian': '', 'time': '1199-？', 'guanzhi': '', 'shqf': '[为官者：文]', 'rs': ''}, {'name': '吴曦', 'shiji': '反对/攻讦', 'location': {'lng': '105.737228', 'lat': '35.529388'}, 'wenxian': '登四川类试第 少以材称 吴曦叛 遣将守夔 彦吶结义士暗杀之', 'time': '1147-1206', 'guanzhi': '安抚使、团练使、知某州军州事、承宣使、宣抚副使、招抚使、某州团练使、卸前某军都统制、郡司户参军书、县丞', 'shqf': '武官', 'rs': '军功补授门'}, {'name': '魏了翁', 'shiji': '赵彦吶墓志铭由Y所作', 'location': {'lng': '103.512036', 'lat': '30.193446'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}],
      three8: [{'name': '李焘', 'shiji': '父', 'location': {'lng': '103.516331', 'lat': '30.012971'}, 'wenxian': '', 'time': '1115-1184', 'guanzhi': '秘书省正字、起居郎、太府寺丞、太师、知某州军州事、直实文阁、敷文阁学士、同修国史、知某府军府事', 'shqf': '史学家、小学家、博学之人、财政官员', 'rs': '进士'}, {'name': '李壁', 'shiji': '兄', 'location': {'lng': '103.517904', 'lat': '30.019315'}, 'wenxian': '', 'time': '1159-1222', 'guanzhi': '参知政事、上轻车都尉、殿中省尚舍奉御、端明殿学士、提举修敕令、监修国史、知某府军府事、知某府军府事、知某府军府事、同提举编修敕、监修国史日暦', 'shqf': '宰执', 'rs': '进士'}, {'name': '李鏐', 'shiji': '子', 'location': {'lng': '103.517392', 'lat': '30.017315'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '魏了翁', 'shiji': '李埴建筑物得到Y的题咏、记、命名', 'location': {'lng': '103.512036', 'lat': '30.193446'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}, {'name': '叶适', 'shiji': '李埴建筑物得到Y的题咏、记、命名', 'location': {'lng': '120.670068', 'lat': '27.998155'}, 'wenxian': '', 'time': '1150-1223', 'guanzhi': '安抚使、朝请大夫、国子监司业、公、太常寺博士、太府寺卿、太学博士、知某州军州事、阁学士、实文阁待制、尚书省吏部员、外郎、太学正、制置使', 'shqf': '经世学者、[财政官员]、思想家', 'rs': '进士'}, {'name': '刘宰', 'shiji': '李埴建筑物得到Y的题咏、记、命名', 'location': {'lng': '119.597897', 'lat': '31.723247'}, 'wenxian': '', 'time': '1166-1239', 'guanzhi': '右奉直大夫、太常寺丞、籍田司令、将作监少监、知某府军府事、太常寺丞', 'shqf': '理学家、为官者：文', 'rs': '进士'}, {'name': '蔡戡', 'shiji': '李埴为Y所著书作序', 'location': {'lng': '118.691601', 'lat': '25.362094'}, 'wenxian': '', 'time': '1141-？', 'guanzhi': '朝奉大夫、朝请大夫、律学助教、司农寺卿、司农寺少卿、路提点刑狱公事、县尉、知某州军州事、实误阁直学士、集英殿修撰、右文殿修撰、经略安抚使', 'shqf': '良吏;循吏，财政官员', 'rs': '进士'}, {'name': '王象之', 'shiji': '李埴为Y所著书作序', 'location': {'lng': '119.654061', 'lat': '29.084097'}, 'wenxian': '', 'time': '1167-？', 'guanzhi': '流外铨、知某县事', 'shqf': '[为官者：文]', 'rs': '进士'}, {'name': '真德秀', 'shiji': '李埴书跋由Y所作', 'location': {'lng': '118.532804', 'lat': '27.924140'}, 'wenxian': '', 'time': '1178-1235', 'guanzhi': '参知政事、提举宫观、输林学士、殿中省尚舍奉御、少师、太中大夫、银青光禄大夫、知制语、知某州军州事、中大夫、资政殿学士、侍读、显误阁待制、直徽猷阁、集英殿修撰、右文殿修撰、知礼部贡举事', 'shqf': '理学家、[宰执]、思想家', 'rs': '进士'}, {'name': '刘克庄', 'shiji': '李埴祭文由Y所作', 'location': {'lng': '119.009357', 'lat': '25.429482'}, 'wenxian': '', 'time': '1187-1269', 'guanzhi': '三公、县令、知某州军州事、中书舍人、转运使、福密院编修、直实文阁、焕章阁学士、实章阁学士、宗正寺主簿、秘书省少监、侍右郎官', 'shqf': '财政官员', 'rs': '特旨门、恩荫门'}, {'name': '程珌', 'shiji': '李埴祭文由Y所作', 'location': {'lng': '118.199179', 'lat': '29.789095'}, 'wenxian': '', 'time': '1164-1242', 'guanzhi': '输林学士、磨勘诸路提点、刑狱司、骑都尉、端明殿学士、正奉大夫、正议大夫、知某州军州事、直学士院、实文阁学士', 'shqf': '为官者：文', 'rs': '进士'}, {'name': '吴泳', 'shiji': '李埴被致书由Y', 'location': {'lng': '116.062269', 'lat': '27.764062'}, 'wenxian': '', 'time': '1179-？', 'guanzhi': '朝请大夫、轻车都尉、上骑都尉、少卿、尚书省刑部尚书、知某州军州事、知某州军州事、知某州军州事、中书舍人、直学士院、实章阁学士、实章阁直学士、实章阁待制、权中书舍人、权刑部尚书、玉牒所检讨官、修玉牒官、知某府军府事、军器监少监', 'shqf': '文官、思想家', 'rs': '进士'}],
      three9: [{'name': '王师古', 'shiji': '父', 'location': {'lng': '119.655665', 'lat': '29.086670'}, 'wenxian': '', 'time': '1125-？', 'guanzhi': '知某军事、教授、礼仪院、承议郎、知某州军州事', 'shqf': '为官者：文，良吏，循吏', 'rs': '进士'}, {'name': '吴师道', 'shiji': '王象之书序由Y所作', 'location': {'lng': '119.821070', 'lat': '28.895838'}, 'wenxian': '', 'time': '1283-1344', 'guanzhi': '博士、国子学助教、礼部郎中、县丞、路录事', 'shqf': '为官者：文', 'rs': '进士'}, {'name': '李埴', 'shiji': '王象之书序由Y所作', 'location': {'lng': '103.519778', 'lat': '30.010296'}, 'wenxian': '', 'time': '1161-1238', 'guanzhi': '同知枢密院事、提举宫观、门下省给事中、起居郎、卿、端明殿学士、尚书省刑部尚书、知某州军州事等', 'shqf': '为官者：文', 'rs': '进士'}],
      three10: [{'name': '安焕', 'shiji': '弟', 'location': {'lng': '106.748083', 'lat': '30.432504'}, 'wenxian': '', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '安癸仲', 'shiji': '子', 'location': {'lng': '104.282175', 'lat': '30.973974'}, 'wenxian': '', 'time': '', 'guanzhi': '总领、太府寺少卿', 'shqf': '', 'rs': ''}, {'name': '杨辅', 'shiji': '同道', 'location': {'lng': '105.571792', 'lat': '30.512969'}, 'wenxian': '早择人望以镇方面 累官至宝谟阁学士、四川制置使 安丙、杨巨源密谋诛吴曦 辅请以事任付丙 复除兵部尚书', 'time': '', 'guanzhi': '安抚使、兵部尚书、三公、端明殿学士、通奉大夫、知某州军州事、显谟阁待制、敷文阁直学士、 制置使、 宣抚使 ', 'shqf': '财政官员', 'rs': '进士'}, {'name': '王翥', 'shiji': '同道', 'location': {'lng': '104.082430', 'lat': '30.664332'}, 'wenxian': '吴曦谋反来请 翥阳病风瘖 潜往安丙 谋诛曦 事定', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '杨巨源', 'shiji': '同道', 'location': {'lng': '104.084805', 'lat': '30.664370'}, 'wenxian': '吴曦叛 阴有讨贼志 遂与安丙、李好义等合谋杀曦 丙奏功 以巨源为第一', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '宇文绍节', 'shiji': '安丙被Y欣赏/器重', 'location': {'lng': '103.922311', 'lat': '30.574446'}, 'wenxian': '召为兵部侍郎 后吴曦据蜀 绍节谓安丙素怀忠义 授以密旨 必能讨贼成功', 'time': '1154-1213', 'guanzhi': '兵部尚书、参知政事、端明殿学士、学士、知某州军州事、中大夫、侍读、实文阁待制、华文阁学士、华文阁直学士、尚书省、兵部侍郎、同修国史、宣抚使', 'shqf': '宰执', 'rs': '进士'}, {'name': '宋德之', 'shiji': '安丙得到Y的支持', 'location': {'lng': '103.872852', 'lat': '30.193278'}, 'wenxian': '', 'time': '1164-？', 'guanzhi': '知某州军州事、兵部司郎官、太常寺丞', 'shqf': '', 'rs': ''}, {'name': '陈咸', 'shiji': '推荐', 'location': {'lng': '113.871561', 'lat': '36.357045'}, 'wenxian': '被缁而出 乃得释归 寻安丙奏以总蜀赋 调度有方 召为司农少卿', 'time': '1146-？', 'guanzhi': '司农寺少卿、知某州军州事', 'shqf': '判臣、财政官员', 'rs': '进士'}, {'name': '严仁', 'shiji': '安丙其政策被Y反对/不支持', 'location': {'lng': '117.492534', 'lat': '27.340327'}, 'wenxian': '吴曦叛 杨巨源诛曦 安丙惎而杀之 仁尝作长愤歌 为时传诵', 'time': '', 'guanzhi': '', 'shqf': '', 'rs': ''}, {'name': '史弥远', 'shiji': '安丙致书Y', 'location': {'lng': '121.550357', 'lat': '29.874556'}, 'wenxian': '', 'time': '1164-1233', 'guanzhi': '枢密使、丞相、光禄大夫、国公、 秘书省监、磨勘京朝官院、太师、正奉大夫、知某州军州事、左丞相、右丞相、亲王府翊善', 'shqf': '宰执', 'rs': '进士'}, {'name': '崔与之', 'shiji': '安丙被致书由Y', 'location': {'lng': '113.810860', 'lat': '23.261141'}, 'wenxian': '', 'time': '', 'guanzhi': '枢密史、安抚使、丞相、参知政事、观文殿大学士、秘阁、端明殿学士、正议大夫、焕章阁侍制、右丞相、太学生、知某府君府事', 'shqf': '', 'rs': '进士'}, {'name': '魏了翁', 'shiji': '安丙答Y书', 'location': {'lng': '103.512036', 'lat': '30.193446'}, 'wenxian': '', 'time': '1178-1237', 'guanzhi': '安抚使、参知政事、太师、端明殿学士、知某州军州事、资政殿学士、签书枢密院事等\n\n', 'shqf': '收徒讲学、思想家、为官者', 'rs': '进士'}],
      three11:[{'name': '任亮', 'shiji': '冯楫是Y工作地方的出资人', 'location': {'lng': '106.009615', 'lat': '29.740724'}, 'wenxian': '', 'time': '', 'guanzhi': '大足多宝塔募化资金组织者的“化首”', 'shqf': '', 'rs': ''}, {'name': '邢信道', 'shiji': '冯楫是Y工作地方的出资人', 'location': {'lng': '105.983327', 'lat': '29.770008'}, 'wenxian': '', 'time': '', 'guanzhi': '大足多宝塔具体负责修建的“砌塔道人”', 'shqf': '', 'rs': ''}, {'name': '伏小六', 'shiji': '冯楫是Y工作地方的出资人', 'location': {'lng': '106.008030', 'lat': '29.750634'}, 'wenxian': '', 'time': '', 'guanzhi': '大足多宝塔工匠', 'shqf': '', 'rs': ''}, {'name': '伏小八', 'shiji': '冯楫是Y工作地方的出资人', 'location': {'lng': '105.719210', 'lat': '29.696438'}, 'wenxian': '', 'time': '', 'guanzhi': '大足多宝塔工匠', 'shqf': '', 'rs': ''}, {'name': '赵瓦', 'shiji': '冯楫是Y工作地方的出资人', 'location': {'lng': '105.736096', 'lat': '29.671083'}, 'wenxian': '', 'time': '', 'guanzhi': '大足多宝塔工匠', 'shqf': '', 'rs': ''}, {'name': '刘杰', 'shiji': '冯楫与Y同为信众', 'location': {'lng': '106.507987', 'lat': '29.534935'}, 'wenxian': '', 'time': '', 'guanzhi': '大足信众', 'shqf': '', 'rs': ''}, {'name': '何正言', 'shiji': '冯楫与Y同为信众', 'location': {'lng': '105.733226', 'lat': '29.664429'}, 'wenxian': '', 'time': '', 'guanzhi': '大足信众', 'shqf': '', 'rs': ''}, {'name': '刘升', 'shiji': '冯楫与Y同为信众', 'location': {'lng': '105.739140', 'lat': '29.671418'}, 'wenxian': '', 'time': '', 'guanzhi': '捐献出重达三十斤的铁索', 'shqf': '', 'rs': ''}],
      size: "medium",
      checkAll: true,
      checkedCities: ["地方官员", "关注者", "师承", "家庭成员", "文氏工匠家族"],
      cities: cityOptions,
      isIndeterminate: true,
      all: false,
      hid1:true,
      hid2:false,

      value: [4, 8],
      radio:"1"
    };
  },
  methods: {
    ch(e) {
      if (e == true) {
        if (this.all == true) {
          this.bar6 = e;
        } else {
          this.$message.error("清");
        }
      } else {
        this.bar6 = e;
      }
      console.log(e);
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    },
    c(e){
      console.log(e)
    },
    h(e){
      console.log(e)
      if(e==true){
        this.bar6=false
        this.hid=true
      }
      else{
        this.bar6=true
        this.hid=false

      }
      
    },
    update(e) {
      this.points = e.target.cornerPoints;
    },
    handleCheckAllChange(val) {
      console.log(val);
      this.all = !val;
      if (val == false) {
        this.bar1 = false;
        this.bar2 = false;
        this.bar3 = false;
        this.bar4 = false;
        this.bar5 = false;

        this.show_data = {};
      } else {
        this.bar1 = true;
        this.bar2 = true;
        this.bar3 = true;
        this.bar4 = true;
        this.bar5 = true;
      }
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log("1");
      console.log(value);
      if (value.length == 5) {
        this.all = false;
      } else {
        this.all = true;
      }
      console.log(this.all);
      //      "地方官员",
      // "关注者",
      // "师承",
      // "家庭成员",
      // "文氏工匠家族",
      // "宝顶山其他人物",
      var i1 = value.indexOf("地方官员");
      var i2 = value.indexOf("关注者");
      var i3 = value.indexOf("师承");
      var i4 = value.indexOf("家庭成员");
      var i5 = value.indexOf("文氏工匠家族");

      console.log(i1);
      if (i1 != -1) {
        this.bar1 = true;
      } else {
        this.bar1 = false;
      }
      if (i2 != -1) {
        this.bar2 = true;
      } else {
        this.bar2 = false;
      }
      if (i3 != -1) {
        this.bar3 = true;
      } else {
        this.bar3 = false;
      }
      if (i4 != -1) {
        this.bar4 = true;
      } else {
        this.bar4 = false;
      }
      if (i5 != -1) {
        this.bar5 = true;
      } else {
        this.bar5 = false;
      }

      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen(e) {
      this.show_data = e;
      console.log(this.show_data);
    },
    infoWindowOpen1(e) {
      this.show_data = e;
      console.log(this.show_data);
    },
    infoWindowOpen2(e) {
      this.show_data = e;
      console.log(this.show_data);
    },
    infoWindowOpen3(e) {
      this.show_data = e;
      console.log(this.show_data);
    },
    infoWindowOpen4(e) {
      this.show_data = e;
      console.log(this.show_data);
    },
    handler() {
      console.log("ready");
    },
    getClickInfo(e) {
      console.log(e);
    },
    h1(e){
       if(e==true){
         this.d2=true
         this.bar6=true
         this.hid=false
       }else{
         this.d1=false
         this.d2=false
         this.bar6=false
       }

    },
    h2(e){
         if(e==true){
         this.d1=true
         this.bar6=false
         this.hid=true
       }else{
         this.d1=false
         this.d2=false
         this.hid=false
       }

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pp {
  height: 50px;
  width: 600;
  display: flex;
  flex-direction: row;
}
.t5 {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}
.pp1 {
  flex-direction: row;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 100px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.text {
  font-size: 7px;
  text-align: left;
}

.item {
  padding: 10px 0;
  margin: 0px;
  height: 10px;
}
.box-card {
  margin-left: 4px;
  width: 290px;
  height: 600px;
}
.p2 {
  padding: 0;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
