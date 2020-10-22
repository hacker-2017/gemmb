<template>
  <div class="container">
    <img class="bg-image" src="/static/images/bg.png" />

    <div class="login">
      <van-field
        :value="username"
        clearable
        placeholder="Please input username"
        @change="onChangeCode"
      >
        <span slot="left-icon" class="iconfont icon-dengluyonghu"></span>
      </van-field>

      <van-field
        clearable
        :value="password"
        type="password"
        placeholder="Please input password"
        @change="onChangePwd"
      >
        <span slot="left-icon" class="iconfont icon-denglumima"></span>
      </van-field>

      <div class="error-tip">
        <span>{{message}}</span>
      </div>

      <button class="login-btn" :disabled="disabled" @click="onLogin">Login</button>

      <div class="partner-entry">Partner Entry</div>
    </div>
  </div>
</template>


<script>
import * as API from "@/api/api-login";
import { deviceList, deviceGroupItems } from "@/api/api-monitor";

export default {
  data() {
    return {
      disabled: false,
      // username: 'ZSCB@ZSCB',
      // password: 'Welcome01',
      message: ""
    };
  },
  mounted() {
    if (wx.getStorageSync("code")) {
      this.username = wx.getStorageSync("code");
    }
    if (wx.getStorageSync("password")) {
      this.password = wx.getStorageSync("password");
    }
  },
  computed: {
    language() {
      return this.$t("login");
    }
  },
  methods: {
    async onLogin() {
      if (!this.username) {
        this.message = this.language.a2;
        return;
      }

      if (!this.password) {
        this.message = this.language.a3;
        return;
      }

      this.disabled = true;

      try {
        const data = await API.login(this.username, this.password);
        wx.setStorageSync("access_token", data.AccessToken);
        wx.setStorageSync("customer", data.CustomerTag);
        wx.setStorageSync("userName", data.UserName);
        wx.setStorageSync("code", this.username);
        wx.setStorageSync("password", this.password);

        const devicetype = await deviceGroupItems();
        wx.setStorageSync("devicetype", devicetype);

        wx.reLaunch({ url: "/pages/index/main" });
      } catch (e) {
        if (e.status == 401) {
          this.message = this.language.a1;
        }
      } finally {
        this.disabled = false;
      }
    },

    onChangeCode(code) {
      this.username = code.mp.detail;
      this.message = "";
    },

    onChangePwd(pwd) {
      this.password = pwd.mp.detail;
      this.message = "";
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  position: relative;

  .bg-image {
    display: block;
    width: 100%;
    height: 100vh;
  }
  .login {
    width: 80%;
    height: 265px;
    position: absolute;
    top: 190px;
    left: 10%;
    background-color: #fff;
    border: 3px solid #f3e0e4;
    padding-top: 20px;
    box-sizing: border-box;

    .iconfont {
      padding-right: 10px;
      color: #e0222f;
      font-size: 20px;
    }

    .login-btn {
      width: 90%;
      height: 35px;
      line-height: 35px;
      background-color: #e0222f;
      color: white;
    }

    .partner-entry {
      width: 100%;
      font-size: 14px;
      color: #e0222f;
      text-align: center;
      margin-top: 30px;
    }

    .error-tip {
      height: 55px;
      line-height: 55px;
      text-align: center;
      width: 100%;
      color: #e0222f;
    }
  }
}
</style>