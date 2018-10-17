# Genuine Theme

Genuine Theme 是基于 React 的 HIUI 主题。


## 开始

#### Install

```
npm i @hi-ui/genuine-theme --save
```

#### 使用

主题是组件的形式，可以直接按组件来使用

```
import Layout from '@hi-ui/genuine-theme'

<Layout />
```

#### 添加侧栏菜单

添加 `sider` 属性

该属性是一个对象，包含 `items` 和 `top`。`items` 是一个包含多项对象的数组，包含索引值、选项、选项链接和子菜单。`top` 可以是任何元素。

```
const sider = {
  items: [
    {key: 1, title: '首页', to: '/', icon: <Icon name='user' />},
    {
      key: 2, title: '表单', to: '', icon: <Icon name='usergroup' />,
      children: [
        {key: 21, title: '基础表单', to: '/order/base'},
        {key: 22, title: '分组表单', to: '/order/group'},
        {key: 23, title: '步骤表单', to: '/order/step'},
        {key: 24, title: '高级表单', to: '/order/super'},
      ]
    },
  ],
  top: <a href='#'>HIUI</a>
}

<Layout 
  sider={sider}
/>
```
`<Icon />` 是引用的 `HIUI` 组件

最多支持二级菜单，第二级菜单不赞成使用任何 icon。

#### 路由

添加路由文件，例如 `router.js`。并在主题组件中使用。

```
// router.js
import Home from './Home'
import Other from './Other'

const routes = [
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/others',
    exact: true,
    component: Other,
  }
]


// 引用主题的文件
<Layout
  sider={sider}
  routes={routes}
/>
```

#### 页面头部自定义配置

添加 `header` 属性

此属性值为任何元素，没有默认值，完全自由，但是可以引用主题内置组件来自行拼装

```
import { Logo, Login } from '@hi-ui/genuine-theme'

const login = {
  headUrl: 'your_image_linking',
  name: '叶静静',
  children: <div style={{width: '100px'}}>这里是登录信息</div>,  // 点击后下拉框显示内容
}

const header = (
  <React.Fragment>
    <BreadCrumb
      style={{float: 'left'}}
      {...breadCrumb}
    />
    <Login {...login} />
    <NavMenu />
  </React.Fragment>
)

<Layout
  header={header}
  sider={sider}
  routes={routes}
/>
```

`BreadCrumb` 的位置可以自由控制，我们在页面头部的下面也预留有面包屑位置。可以参考下面。

#### 面包屑

添加 `breadCrumb` 属性

此属性值为对象，没有默认值，不添加该属性即不显示面包屑

```
const breadCrumb = {
  items: [
    {title: '首页', to: '/'},
    {title: '其他页面', to: ''},
  ],
  sign: '/'  // 分隔符号
}

<Layout
  header={header}
  breadCrumb={breadCrumb}
  sider={sider}
  routes={routes}
/>
```

建议把面包屑选项的值 `breadCrumb.items` 放入 `redux` 控制，并在每个页面的 `componentDidMount` 生命周期段来修改

#### 主题色和主题种类

添加 `theme` 属性

此属性值为对象，默认为 `{ type: 'inner', color: 'dark' }`

```
<Layout
  header={header}
  breadCrumb={breadCrumb}
  sider={sider}
  routes={routes}
  theme={{
    type: 'outer',
    color: 'blue'
  }}
/>
```

> `dark` 深色主题
>
> `gray` 灰色主题

> `inner` 扁平主题
>
> `outer` 凹陷主题


## 内部组件

内部可引用的组件：`Cascad, InfoBlock, Logo, Login, BreadCrumb`

```
Cascad：带标题的块

<Cascad 
  title='标题'  // 块标题
  children=''     // 想要嵌入的任意元素
  status=''       // 想要标记的状态文字
/>

InfoBlock：信息列表块

<InfoBlock
  title='标题'  // 块标题
  list=[{label: '单号', info: '值'}]   // 列表数组
/>

```


## 其他主题链接

- [Classic 主题](https://www.npmjs.com/package/@hi-ui/classic-theme)

-- EOF --