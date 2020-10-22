<template>
  <div>
    <van-nav-bar :title="language.m1">
      <span @click="back" slot="left" style="padding: 10px;" class="iconfont icon-shangyibu"></span>
    </van-nav-bar>

    <scroll-view class="content" :scroll-y="true" :style=" 'height:' + height + 'px;' ">
      <app-title name="icon-shebei" :value="language.m2" />

      <!-- 设备信息 -->
      <div
        class="device-message"
        :style=" 'background-color:' + color "
        style="position: relative;"
      >
        <div style="font-size: 18px;line-height: 50px;">{{name}}</div>
        <div
          style="font-size: 18px;line-height: 30px;overflow: hidden;"
        >{{language.m3}}:{{ modelName }}</div>
        <div class="location" style="height: 55px;overflow: hidden;">
          <div
            style="font-size: 18px;line-height: 35px;width: 10vw;margin-right: 10px;"
          >{{Description}}</div>
          <div style="font-size: 12px;width: 45vw; overflow: hidden;">{{ Address1 }}</div>
          <div style="font-size: 12px;position: absolute;right: 10px;bottom: 30px;">IP:{{ip}}</div>
        </div>
      </div>
      <!-- 关联工单 -->
      <div style="line-height: 50px;">{{language.m5}}</div>

      <div
        @click="linkTick(item.TicketId,item.TicketStatus,
		    		item.Priority,item.PriorityHtmlColor)"
        class="guan"
        style="font-size: 12px;"
        v-for="(item, index) in associatList"
        :key="index"
      >
        <span>{{language.m6}}:&nbsp;</span>
        <span style="text-decoration: underline;">{{item.TicketId}}</span>
        <span style="margin-left: 65px;">{{language.m7}}:&nbsp;{{item.TicketState}}</span>
      </div>

      <div style="line-height: 50px;">{{language.m8}}</div>

      <!-- ping -->
      <div class="ping">
        <div style="line-height: 30px;">Ping</div>
        <div style="box-sizing: border-box;padding-top: 10px;">
          <van-progress :show-pivot="false" :color="bgcolor" percentage="100" />
        </div>
      </div>

      <!--  接口利用率 -->
      <div style="border-radius: 10px;overflow: hidden;">
        <van-collapse :value="activeNames" @change="onChange1" :accordion="true">
          <van-collapse-item :title="language.m9" name="0">
            <van-collapse :value="activeNames1" @change="onChange_1" :accordion="true">
              <van-collapse-item
                v-for="(item, index) in interfaceList"
                :key="index"
                :title="item.Label"
                :name="index"
                @click="interface(index)"
              >
                <div v-if="item.in&&item.out">
                  <span>in</span>
                  <span style="width: 80px;display: inline-block;float: right;">{{item.in}}%</span>
                  <br />
                  <van-progress :percentage="item.in" :show-pivot="false" />
                  <br />
                  <span>out</span>
                  <span style="width: 80px;display: inline-block;float: right;">{{item.out}}%</span>
                  <br />
                  <van-progress :percentage="item.out" :show-pivot="false" />
                  <br />
                </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
          <van-collapse-item :title="language.m10" name="1">
            <van-collapse :value="activeNames2" @change="onChange_2" :accordion="true">
              <van-collapse-item
                v-for="(item, index) in cpuList"
                :key="index"
                :title="item.Label"
                :name="index"
                @click="cpu(index)"
              >
                <div v-if="item.value">
                  <div style="height: 20px;">
                    <span style="width: 80px;display: inline-block;float: right;">{{item.value}}%</span>
                  </div>
                  <div style="height: 20px;">
                    <van-progress :percentage="item.value" :show-pivot="false" />
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
          <van-collapse-item :title="language.m11" name="2">
            <van-collapse :value="activeNames3" @change="onChange_3" :accordion="true">
              <van-collapse-item
                v-for="(item, index) in memoryList"
                :key="index"
                :title="item.Label"
                :name="index"
                @click="memory(index)"
              >
                <div v-if="item.value">
                  <div style="height: 20px">
                    <span style="width: 80px;display: inline-block;float: right;">{{item.value}}%</span>
                  </div>
                  <div style="height: 20px;">
                    <van-progress :percentage="item.value" :show-pivot="false" />
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>

      <div style="line-height: 50px;" v-if="alerts.length>0">{{language.m12}}</div>

      <Alerts
        v-for=" (item, index) in alerts"
        :key="index"
        :Notes="item.Notes"
        :dataTime="item.LocalTime"
      />

      <div style="line-height: 50px;" v-if="historyTicket.length>0">{{language.m13}}</div>

      <Tickets
        v-for="(item, index) in historyTicket"
        :key="index"
        :TicketId="item.TicketId"
        :TicketType="item.TicketType"
        :TicketState="item.TicketState"
        :Priority="item.Priority"
        :LocalTime="item.ModifiedLocalTime"
        :color="item.PriorityHtmlColor"
        @critical="linkDevice(item)"
      />
    </scroll-view>
  </div>
</template>

<script>
import {
  associat,
  address,
  ping,
  getping,
  getPerformance,
  getHistoryWaringApi,
  liuliang,
  EntityMib
} from "@/api/api-monitor";

import Alerts from "./alerts.vue";

import Tickets from "./tickets";

export default {
  components: {
    Alerts,
    Tickets
  },
  data() {
    return {
      id: "",
      name: "",
      ip: "",
      location: "",
      color: "",
      bgcolor: "red",
      associatList: [],
      locationId: "",
      Description: "",
      Address1: "",
      //接口
      activeNames: [],
      activeNames1: [],
      activeNames2: [],
      activeNames3: [],

      modelName: "",

      show: false,
      cpuList: [],
      interfaceList: [],
      memoryList: [],

      //历史告警
      alerts: [],
      //历史工单
      historyTicket: []
    };
  },
  onLoad(data) {
    this.id = data.id;
    this.name = data.name;
    this.ip = data.ip;
    this.location = data.location;
    this.color = data.color;
    this.locationId = data.locationId;
  },
  computed: {
    height() {
      return wx.getSystemInfoSync().windowHeight - 65;
    },
    language() {
      return this.$t("monitorDetils");
    }
  },
  onUnload() {
    this.modelName = "";
    this.associatList = [];
    this.bgcolor = "red";
    this.Address1 = "";
    this.Description = "";
    this.locationId = "";
    this.historyTicket = [];
    this.alerts = [];
    this.cpuList = [];
    this.interfaceList = [];
    this.memoryList = [];
    this.activeNames = [];
    this.activeNames1 = [];
    this.activeNames2 = [];
    this.activeNames3 = [];
  },
  async mounted() {
    console.log(this.id);
    try {
      this.modelName = (await EntityMib(
        this.id
      )).EntityMib.EntityPhysicalEntries[1].ModelName;
    } catch (err) {}
    //关联工单
    const resp = await associat(this.id);

    this.historyTicket = resp.filter(val => {
      if (
        val.Priority != 5 &&
        val.Priority != 6 &&
        val.Priority != 7 &&
        val.Priority != 8
      ) {
        return val;
      }
    });

    // console.log(this.historyTicket)

    this.associatList = resp.filter(val => {
      if (
        val.TicketState != "Closed" &&
        val.TicketState != "Completed" &&
        val.Priority != 8
      )
        return val;
    });

    console.log(this.associatList);

    const res = await ping(this.id);

    if (res) {
      delete res.Name;
      const aa = getping(res);
      if (aa) {
        this.bgcolor = "#5CB85C";
      }
    }

    const { data } = await address();

    const local = data.filter(val => {
      if (val.LocationId == this.locationId) {
        return val;
      }
    });

    this.Description = local[0].Description;
    this.Address1 = local[0].Address1;

    this.getHistoryWaring();

    this.getPerformance2();
  },
  methods: {
    linkDevice(obj) {
      const id = obj.TicketId;
      const state = obj.TicketState;
      const color = obj.PriorityHtmlColor;
      const priority = obj.Priority;

      wx.navigateTo({
        url: `/pages/ticket/details/main?id=${id}&status=${state}&priority=${priority}&color=${color}`
      });
    },
    linkTick(id, status, priority, color) {
      console.log(id);
      console.log(status);
      console.log(priority);
      console.log(color);

      if (status <= 2) {
        status = "open";
      } else {
        status = "closed";
      }

      wx.navigateTo({
        url: `/pages/ticket/details/main?id=${id}&status=${status}&priority=${priority}&color=${color}`
      });
    },
    back() {
      wx.navigateBack({ delta: 1 });
    },
    onChange1({ mp }) {
      this.activeNames = mp.detail;
    },
    onChange_1({ mp }) {
      this.activeNames1 = mp.detail;
    },
    onChange_2({ mp }) {
      this.activeNames2 = mp.detail;
    },
    onChange_3({ mp }) {
      this.activeNames3 = mp.detail;
    },
    //接口
    async interface(index) {
      const param = {
        CustomerTag: wx.getStorageSync("customer"),
        ItemId: this.interfaceList[index].ItemId,
        ChartingMethod: 0,
        ChartId: this.interfaceList[index].ChartId,
        Start: this.getTime1(),
        End: this.getTime(),
        DataRollupType: 0
      };
      const { ChartData } = await liuliang(param);
      const arr = ChartData.split(",");
      const num = arr.length;

      this.interfaceList[index].in = this.toNumber(arr[num - 1]);
      this.interfaceList[index].out = this.toNumber(arr[num - 2]);
    },

    //cpu
    async cpu(index) {
      const param = {
        CustomerTag: wx.getStorageSync("customer"),
        ItemId: this.cpuList[index].ItemId,
        ChartingMethod: 0,
        ChartId: this.cpuList[index].ChartId,
        Start: this.getTime1(),
        End: this.getTime(),
        DataRollupType: 0
      };
      const { ChartData } = await liuliang(param);
      const arr = ChartData.split(",");

      let str = arr[arr.length - 2];

      //   this.cpuList[index].value = arr[arr.length - 2];

      console.log("计算得出");

      this.cpuList[index].value = this.toNumber(arr[arr.length - 2]);
    },

    toNumber(obj) {
      let num = Number(obj);
      num = num.toFixed(2);
      num = num > 0.01 ? num : 0.01;
      return num;
    },

    //内存
    async memory(index) {
      const param = {
        CustomerTag: wx.getStorageSync("customer"),
        ItemId: this.memoryList[index].ItemId,
        ChartingMethod: 0,
        ChartId: this.memoryList[index].ChartId,
        Start: this.getTime1(),
        End: this.getTime(),
        DataRollupType: 0
      };
      const { ChartData } = await liuliang(param);
      const arr = ChartData.split(",");

      this.memoryList[index].value = this.toNumber(arr[arr.length - 2]);
    },
    //获取性能指标
    async getPerformance2() {
      const da = await getPerformance(this.id);
      const performance = da[0].ChildItems;

      performance.forEach(val => {
        if (val.Label == "Interface") {
          val.ChildItems.forEach(val => {
            const json = {};
            json.in = "";
            json.out = "";
            json.Label = val.Label;
            json.ItemId = val.ItemId;

            val.ChartItems.forEach(val => {
              if (val.Label == "Interface Utilization") {
                json.ChartId = val.ChartId;
              }
            });
            this.interfaceList.push(json);
          });
        }

        if (val.Label == "System") {
          val.ChildItems.forEach(val2 => {
            if (val2.Label == "CPU") {
              val2.ChildItems.forEach(val3 => {
                const json = {};
                json.value = "";
                json.ItemId = val3.ItemId;
                json.Label = val3.Label;
                json.ChartId = val3.ChartItems[0].ChartId;
                this.cpuList.push(json);
              });
            }

            if (val2.Label == "Memory") {
              val2.ChildItems.forEach(val => {
                const json = {};
                json.value = "";
                json.ItemId = val.ItemId;
                json.Label = val.Label;
                val.ChartItems.filter(val => {
                  if (val.Label == "Memory Usage") {
                    json.ChartId = val.ChartId;
                  }
                });

                this.memoryList.push(json);
              });
            }
          });
        } //系统
      });
      //   console.log(this.memoryList);
      //   console.log(this.interfaceList);
      //   console.log(this.cpuList);
    },

    //获取当前时间
    getTime() {
      const time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
      return time1.replace(" ", "T");
    },

    //获取1小时前
    getTime1() {
      var time2 = new Date();
      time2.setHours(time2.getHours() - 1);
      time2 = new Date(time2).format("yyyy-MM-dd hh:mm:ss");
      return time2.replace(" ", "T");
    },
    //获取昨天
    getyestoday() {
      var time2 = new Date();
      time2 = time2.setDate(time2.getDate() - 1);
      time2 = new Date(time2).format("yyyy-MM-dd hh:mm:ss");
      return time2.replace(" ", "T");
    },

    // 获取历史警告
    async getHistoryWaring() {
      // 2019-11-19T00:26:11
      const guoqu = this.getyestoday();
      const currTime = this.getTime();
      this.alerts = await getHistoryWaringApi(this.id, guoqu, currTime);
    }
  }
};
</script>

<style scoped>
.guan {
  height: 35px;
  line-height: 35px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 10px;
  margin-bottom: 10px;
}
.guan > span {
  display: inline-block;
}
.ping {
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.content {
  padding: 10px;
  box-sizing: border-box;
}
.device-message {
  padding: 0 5px 0 5px;
  height: 150px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #f4de3c;
  margin-top: 20px;
}
.device-message > div {
  height: 45px;
  padding: 0 10px 0 10px;
  color: #fff;
}
.location > div {
  float: left;
}
</style>