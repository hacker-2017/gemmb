<template>
  <div>
    <!--导航栏-->
    <van-nav-bar :title="title" />

    <div class="content">
      <div class="title">
        <span class="iconfont icon-xitong-copy"></span>
        <span class="setting">{{sysLanguage.s1}}</span>
      </div>
      <div class="block">
        <!-- 账户信息-->
        <div
          @click.stop="userMsg"
          style="margin-right: 10px;"
          :style="'height:' + (screenWidth -43)/3 +'px; width:'+(screenWidth -43)/3 +'px;'"
        >
          <span :style="'width:' + (screenWidth -43)/3 + 'px;'" class="iconfont icon-user"></span>
          <br />

          <span :style=" 'width:' + (screenWidth -43)/3 + 'px;' " class="text">{{sysLanguage.s2}}</span>
        </div>

        <!-- 客户选择 -->
        <div
          @click="customerLayer"
          style="margin-right: 10px;"
          :style="'height:' + (screenWidth -43)/3 +'px; width:'+(screenWidth -43)/3 +'px;'"
        >
          <span :style="'width:' + (screenWidth -43)/3 + 'px;'" class="iconfont icon-kehu"></span>
          <br />
          <span :style=" 'width:' + (screenWidth -43)/3 + 'px;' " class="text">{{sysLanguage.s3}}</span>
        </div>
        <!-- 语言选择-->
        <div
          @click.stop="selectLanguage"
          :style="'height:' + (screenWidth -43)/3 +'px; width:'+(screenWidth -40)/3 +'px;'"
        >
          <span :style="'width:' + (screenWidth -40)/3 + 'px;'" class="iconfont icon-yuyan"></span>
          <br />
          <span :style=" 'width:' + (screenWidth -40)/3 + 'px;' " class="text">{{sysLanguage.s4}}</span>
        </div>
      </div>

      <div>
        <img style="width: 100%;height: 90px;" src="/static/images/logo2.png" />
      </div>

      <div class="login-out" @click="loginOut">{{sysLanguage.s5}}</div>
    </div>

    <van-popup :show="show" @click="overlay" />
    <!--多语言 弹出层-->
    <div
      @click="selectLanguage"
      v-show="language"
      class="language"
      :style=" 'top:'+ (screenHeight - 121)/2 + 'px;' 
				+ 'left:' + (screenWidth - 300)/2 + 'px;' "
    >
      <div @click.stop="currLanguage('zh')" style="border-bottom: 1px solid #F5F6FA">简体中文</div>
      <div @click.stop="currLanguage('en')">English</div>
    </div>

    <!-- 账户信息弹出层 -->
    <div
      v-show="userMessage"
      :style=" 'top:'+ (screenHeight - 200)/2 + 'px;' 
				+ 'left:' + (screenWidth - 300)/2 + 'px;' "
      class="customer"
    >
      <div>
        {{sysLanguage.a1}}:
        <span class="info">{{userName}}</span>
      </div>
      <div>
        {{sysLanguage.a2}}:
        <span class="info">{{email}}</span>
      </div>
      <div>
        {{sysLanguage.a3}}:
        <span class="info">{{currCustomer}}</span>
      </div>
      <span @click=" show = false; userMessage = false" class="iconfont icon-guan"></span>
    </div>

    <!-- 客户信息弹出层 -->
    <div class="select-customer" v-show="customer">
      <div class="search-box">
        <span class="iconfont icon-sousuo"></span>
        <div style="padding-left: 35px; padding-top: 15px;">
          <input :placeholder="sysLanguage.a4" v-model="search" />
        </div>
      </div>
      <scroll-view style="border-top: 1px solid #DDD;max-height: 325px;" :scroll-y="true">
        <div
          v-for="(item, index) in customerList"
          :key="index"
          class="customer-list"
          @click="selectCustomer(item)"
        >{{item}}</div>
        <div
          v-show="customerList.length==0"
          style="height: 50px;text-align: center;line-height: 50px;margin-bottom: 100px;"
        >{{sysLanguage.a9}}</div>
      </scroll-view>
    </div>

    <app-footer :active="3" />
  </div>
</template>

<script>
import * as Api from "@/api/api-setting";

import { deviceGroups } from "@/api/api-monitor";

export default {
  data() {
    return {
      show: false,
      language: false,
      userMessage: false,
      customer: false,

      //用户名
      userName: "",
      //当前客户
      currCustomer: "",
      //邮箱
      email: "",

      customerList: [],

      search: ""
    };
  },
  watch: {
    async search(res) {
      await this.customerData();
      const Array = this.customerList.filter(val => {
        if (val.toUpperCase().indexOf(res.toUpperCase()) != -1) {
          return val;
        }
      });

      this.customerList = Array;
    }
  },
  computed: {
    screenWidth() {
      return wx.getSystemInfoSync().windowWidth;
    },
    screenHeight() {
      return wx.getSystemInfoSync().windowHeight;
    },
    sysLanguage() {
      return this.$t("system");
    },
    title() {
      return this.$t("index").title5;
    }
  },

  methods: {
    loginOut() {
      wx.showModal({
        title: this.sysLanguage.a5,
        content: this.sysLanguage.a8,
        confirmText: this.sysLanguage.a6,
        cancelText: this.sysLanguage.a7,
        success(res) {
          if (res.confirm) {
            wx.clearStorageSync();
            wx.reLaunch({ url: "/pages/login/main" });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    selectLanguage() {
      this.show = true;
      this.language = true;
    },
    currLanguage(language) {
      this.show = false;
      this.language = false;
      this.$i18n.locale = language;
    },

    overlay() {
      this.show = false;
      this.language = false;
      this.userMessage = false;
      this.customer = false;
    },

    //用户信息
    userMsg() {
      this.show = true;
      this.userMessage = true;
      this.currCustomer = wx.getStorageSync("customer");

      this.userName = wx.getStorageSync("userName");
    },
    //选择客户
    async selectCustomer(tag) {
      wx.setStorageSync("customer", tag);

      this.currCustomer = tag;
      this.show = false;
      this.customer = false;
      const devicetype = await deviceGroups(tag);

      console.log("kkkkk");
      console.log(devicetype);

      wx.setStorageSync("devicetype", devicetype);
    },

    customerLayer() {
      this.show = true;
      this.customer = true;

      this.customerData();
    },

    async customerData() {
      const list = await Api.customerList();
      let i = 0;
      const arr = new Array();
      list.filter(val => {
        arr[i] = val.Tag;
        i++;
      });
      this.customerList = arr;
    },

    async fetchData() {
      const userMsg = await Api.userMessage();
      const user = userMsg.filter(val => {
        if (val.Name == wx.getStorageSync("userName")) {
          return val;
        }
      });

      this.email = user[0].Email;
      this.userName = wx.getStorageSync("userName");
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.select-customer {
  max-height: 500px;
  min-height: 500px;
  background-color: white;
  width: 100%;
  position: fixed;
  z-index: 2000;
  bottom: 0px;
}
.customer-list {
  border-bottom: 1px solid #ddd;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.search-box {
  height: 50px;
  background-color: #eeeeee;
  border-radius: 5px;
  position: relative;
  margin: 10px;
  border: 1px solid #dddddd;
  color: #999999;
}

.search-box > .iconfont {
  position: absolute;
  top: 15px;
  left: 10px;
  font-size: 20px;
}

.language {
  position: fixed;
  box-sizing: border-box;
  z-index: 2000;
  height: 121px;
  width: 300px;
  border-radius: 10px;
  background-color: #fff;
}

.language > div {
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.customer {
  padding: 10px;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 2000;
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  border-radius: 10px;
  background-color: #fff;
}

.customer > div {
  width: 300px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding: 5px;
}

.info {
  display: block;
  float: right;
  width: 200px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.customer > .iconfont {
  position: absolute;
  display: block;
  top: 8px;
  right: 8px;
  padding: 5px;
}

.content {
  padding: 10px;
}
.title {
  height: 40px;
  position: relative;
}
.title > span {
  display: inline-block;
  position: absolute;
}
.title > .iconfont {
  font-size: 24px;
  display: inline-block;
}
.setting {
  left: 30px;
  top: 2px;
  font-size: 18px;
}
.block {
  height: 300px;
}
.block > div {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  float: left;
  position: relative;
  background-color: white;
  border-radius: 10px;
}

.block .iconfont {
  font-size: 30px;
  position: absolute;
  display: inline-block;
  left: 0px;
  top: 25px;
  text-align: center;
}

.text {
  display: inline-block;
  position: absolute;
  top: 70px;
  left: 0px;
  text-align: center;
}

.login-out {
  height: 50px;
  background-color: red;
  color: white;
  width: 100%;
  line-height: 50px;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
}
</style>