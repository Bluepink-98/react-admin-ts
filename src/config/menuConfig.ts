import {IMenu} from '../modules/common'
const menuList: Array<IMenu> = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'icon-030-businessman-1', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/products',
    icon: 'icon-shangpin',
    children: [
      // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: 'icon-leimupinleifenleileibie',
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'icon-shangpin1',
      },
    ],
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'icon-yonghu',
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'icon-yonghu1',
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'icon-weibiaoti--',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'icon-tubiaozhuxingtu',
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'icon-tubiao2',
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'icon-tubiao1',
      },
    ],
  },

  {
    title: '订单管理',
    key: '/order',
    icon: 'icon-wodedingdan',
  },
];

export default menuList;
