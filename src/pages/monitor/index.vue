<template>
  <div>
    <!--导航栏-->
    <app-header :title="title" />

    <div class="header">
      <div class="search">
        <span class="iconfont icon-sousuo"></span>
        <input v-model.lazy="search" :placeholder="language.m3" />
        <button class="search-button" @click="mysearch">{{language.m2}}</button>
      </div>

      <div class="list-title">
        <span class="iconfont icon-shebei"></span>
        <span style="margin-left: 10px;">{{language.m1}}</span>
      </div>
    </div>

    <!--主体-->
    <app-loading
      :defaultHeight="height"
      @Refresh="refresh"
      @tolower="moreLoad"
      @onScroll="myscroll"
    >
      <Block
        v-for=" (item,index) in devices"
        :key="index"
        :color="item.SeverityHtmlColor"
        :name="item.DeviceName"
        :ip="item.IPAddress"
        :location="item.LocationName"
        :severity="item.Severity"
        :deviceId="item.DeviceId"
        :locationId="item.LocationId"
        :type="item.setType"
      />

      <div v-if="isShow" style="height:50px;"></div>

      <div class="loading-animation" v-show="moreShow">
        <van-loading type="spinner" :size="18" />
      </div>
    </app-loading>

    <app-footer :active="1" />
  </div>
</template>

<script>
import { deviceList, deviceGroupItems } from "@/api/api-monitor";

import Block from "./block/index.vue";

export default {
  components: {
    Block
  },
  data() {
    return {
      search: "",
      devices: [],
      type: [],
      limit: 12,

      isShow: false,

      moreShow: false,

      more: true,

      devicesAll: []
    };
  },

  onUnload() {
    this.limit = 12;
  },
  computed: {
    height() {
      return wx.getSystemInfoSync().windowHeight - 64 - 50 - 90;
    },
    language() {
      return this.$t("monitor");
    },
    title() {
      return this.$t("index").title5;
    }
  },
  async mounted() {
    await this.deviceType();
    await this.fetchData();
    this.$nextTick(() => {
      if (this.devicesAll.length > this.devices.length) {
        this.moreShow = true;
      }
    });
  },

  methods: {
    refresh() {
      this.fetchData();
    },

    deviceType() {
      this.type = wx.getStorageSync("devicetype");
    },

    selectType(id) {
      let name = "";
      this.type.filter(val => {
        if (name) {
          return;
        }
        if (val.DeviceId == id) {
          try {
            name = val.DeviceGroupItems[0].Name;
          } catch (err) {
            console.log("异常");
          }
        }
      });

      return name;
    },

    getTypeIcon(obj) {
      if (obj.indexOf("Switch") != -1) {
        return "switch";
      }

      if (obj.indexOf("Router") != -1) {
        return "router";
      }

      if (obj.indexOf("Firewall") != -1) {
        return "fireWall";
      }

      if (obj.indexOf("Server") != -1) {
        return "server";
      }

      if (obj.indexOf("Call") != -1) {
        return "call";
      }

      if (obj.indexOf("Wireless") != -1) {
        return "wireless";
      }

      if (obj.indexOf("Link") != -1) {
        return "link";
      }
    },

    //加载更多
    moreLoad() {
      console.log("加载更多");

      if (!this.more) {
        return;
      }
      this.more = false;

      const arr = this.devicesAll.slice(this.limit, this.limit + 10);

      if (arr.length < 1) {
        this.more = true;
        this.moreShow = false;
        this.isShow = true;
        console.log("到底了");
        return;
      }

      arr.forEach(val => {
        const typeName = this.selectType(val.DeviceId);
        val.setType = this.getTypeIcon(typeName);
        this.devices.push(val);
      });

      this.$nextTick(() => {
        this.more = true;
      });

      this.limit = this.limit + 10;
    },

    async fetchData() {
      const array = await deviceList();
      const data2 = array.filter(val => {
        if (val.Severity == 0) {
          return val;
        }
        if (val.Severity == 1) {
          return val;
        }
        if (val.Severity == 2) {
          return val;
        }
        if (val.Severity == 3) {
          return val;
        }
        if (val.Severity == 4) {
          return val;
        }
      });

      this.devicesAll = data2;

      //初始化加载
      this.devices = data2.slice(0, this.limit);

      this.devices.forEach(val => {
        const typeName = this.selectType(val.DeviceId);
        console.log(typeName);
        val.setType = this.getTypeIcon(typeName);
      });

      if (this.devicesAll.length > this.devices.length) {
        this.moreShow = true;
        this.more = true;
      }
    },

    async mysearch() {
      this.more = false;

      this.devices = [];

      const searchText = this.search.toUpperCase();
      const deviceList2 = this.devicesAll;

      if (searchText == "") {
        this.more = true;
        this.devices = this.devicesAll.slice(0, this.limit);
        if (this.devicesAll.length > this.devices.length) {
          this.moreShow = true;
        }
        return;
      }

      const data5 = deviceList2.filter(val => {
        const deviceName = val.DeviceName.toUpperCase();
        const iPAddress = val.IPAddress.toUpperCase();
        const locationName = val.LocationName.toUpperCase();

        if (deviceName.indexOf(searchText) != -1) {
          return val;
        }
        if (iPAddress.indexOf(searchText) != -1) {
          return val;
        }
        if (locationName.indexOf(searchText) != -1) {
          return val;
        }
      });

      let aa = data5.filter(val => {
        if (val.Severity == 0) return val;
        if (val.Severity == 1) return val;
        if (val.Severity == 2) return val;
        if (val.Severity == 3) return val;
        if (val.Severity == 4) return val;
      });
      // aa = aa.slice(0,4);
      this.moreShow = false;

      aa.forEach(val => {
        const typeName = this.selectType(val.DeviceId);
        val.setType = this.getTypeIcon(typeName);
        this.devices.push(val);
      });

      this.devices = aa;
    }
  }
};
</script>

<style scoped>
.loading-animation {
  text-align: center;
  height: 18px;
  margin-top: 8px;
}

.header {
  padding: 10px 10px 0 10px;
  height: 90px;
  box-sizing: border-box;
}
.search {
  border: 1px solid #cccccc;
  height: 35px;
  border-radius: 5px;
}
.search > input {
  height: 35px;
  margin-left: 35px;
  display: inline-block;
  width: 235px;
  font-size: 12px;
}
.search > .iconfont {
  display: inline-block;
  position: absolute;
  color: #aaaaaa;
  font-size: 20px;
  padding-top: 8px;
  padding-left: 8px;
}
.search-button {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  width: 75px;
  background-color: #aaa;
  margin-bottom: 4px;
  color: white;
  font-size: 12px;
  border-radius: 8px;
}
.list-title {
  box-sizing: border-box;
  padding: 0 5px 0px 0;
  margin-top: 15px;
  font-size: 20px;
  padding-top: 3px;
}

.icon-shebei {
  font-size: 20px;
}
</style>