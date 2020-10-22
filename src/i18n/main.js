import Vue from 'vue'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  zh: {
    tabBar: {
      home: "首页",
      monitor: "监控",
      ticket: "工单",
      setting: "设置",
      messages: '下拉刷新',
      messages2: '释放更新'
    },
    index: {
      title: '当前客户',
      title2: '企业设备运行状态',
      title3: '故障设备',
      title4: '工单列表',
      title5: 'GNC基础架构监控平台',
      v1: '故障设备',
      v2: '维护中的设备',
      v3: '监控中的设备',
      v4: '处理中的工单',
      v5: '健康状态',

      v6: '您的网络很健康',
      v7: '暂未产生P1-P2故障工单'
    },
    monitor: {
      m1: '设备列表',
      m2: '搜索',
      m3: '名称、ip、地址...'
    },
    monitorDetils: {
      m1: '设备详情',
      m2: '设备信息',
      m3: '设备型号',
      m5: '关联工单',
      m6: '工单 ID',
      m7: '状态',
      m8: '性能管理',
      m9: '接口利用率',
      m10: 'cpu利用率',
      m11: '内存利用率',
      m12: '历史告警',
      m13: '历史工单',
    },
    block: {
      b1: '名称',
      b2: '地点',
      b3: '类型',
      b4: '工单 ID',
      b5: '优先级',
      b6: '状态',
    },
    ticketDetils: {
      t1: '工单详情',
      t2: '工单 ID',
      t3: '优先级',
      t4: '状态',
      t5: '关联设备',
      t6: '开始',
      t7: '暂停',
      t8: '工单日志',
      t9: '设备告警',
      t10: '类型',
      t11: '时间'
    },
    system: {
      s1: '设置',
      s2: '账户信息',
      s3: '客户选择',
      s4: '语言选择',
      s5: '退出登录',
      title5: 'GNC基础架构监控平台',
      a1: '用户名',
      a2: '邮箱',
      a3: '当前客户',
      a4: '输入关键字查找',

      a5: '提示',
      a6: '确定',
      a7: '取消',
      a8: '您确定要退出？',
      a9: '无数据'
    },
     ticket: {
      t1: '故障工单',
      t2: '变更工单',
      t3: '请求工单',
      t4: '标准',
      t5: '无数据',
    },

    login: {
      a1: '用户名或密码错误',
      a2: '用户名不能为空',
      a3: '密码不能为空'

    },
  },
  en: {
    login: {
      a1: 'Wrong username or password',
      a2: 'User name cannot be empty',
      a3: 'Password cannot be empty'
    },

     ticket: {
      t1: 'Incident',
      t2: 'Change',
      t3: 'Request',
      t4: 'Standard',
      t5: 'No Data',
    },
    system: {
      s1: 'Setting',
      s2: 'Account Info',
      s3: 'Customers',
      s4: 'language',
      s5: 'Logout',
      title5: 'GNC Monitor Platform',
      a1: 'Name',
      a2: 'Mail',
      a3: 'Customer',
      a4: 'Input a keyword search',
      a5: 'Tips',
      a6: 'Yes',
      a7: 'No',
      a8: 'Are you sure you want to exit',
      a9: 'No Data'
    },
    ticketDetils: {
      t1: 'Ticket Info',
      t2: 'Ticket ID',
      t3: 'Priority',
      t4: 'Status',
      t5: 'Associated Device',
      t6: 'start',
      t7: 'suspend',
      t8: 'Ticket Journal',
      t9: 'Device Alert',
      t10: 'Type',
      t11: 'time'
    },
    block: {
      b1: 'name',
      b2: 'location',
      b3: 'type',
      b4: 'Ticket ID',
      b5: 'Priority',
      b6: 'status',
    },
    monitorDetils: {
      m1: 'Device Details',
      m2: 'Device information',
      m3: 'Device Model',
      m5: 'Associated Ticket',
      m6: 'Ticket ID',
      m7: 'status',
      m8: 'Performance',
      m9: 'Interface Utilization',
      m10: 'CPU Utilization',
      m11: 'Memory Utilization',
      m12: 'History Alert',
      m13: 'History Tickets',
    },
  	tabBar: {
      home: "Home",
      monitor: "Monitor",
      ticket: "Ticket",
      setting: "Setting",
      messages: '下拉刷新',
      messages2: '释放更新'
    },
    index: {
      // 当前客户
      title: 'Current Customer',
      // 企业设备运行状态
      title2: 'Enterprise Equipment Running State',
      //故障设备
      title3: 'Failure Devices',
      //工单列表
      title4: 'Ticket List',
      title5: 'GNC Monitor Platform',
      //故障设备
      v1: 'Failure Devices',
      //维护中的设备
      v2: 'Maintanence',
      //监控中的设备
      v3: 'Monitor Devices',
      //处理中的工单
      v4: 'Tickets',
      //健康状态
      v5: 'Health Status',

      v6: 'Your network is healthy',
      v7: 'No p1-p2 incident tickets has been generated'
    },
    monitor: {
      m1: 'Devices List',
      m2: 'Search',
      m3: 'name、ip、localion...'
    },
  }
}

export default new VueI18n({
  locale: 'zh',
	messages
})