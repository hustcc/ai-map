<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN$GNdh6/language.svg" width="18"> 简体中文 | [English](./README.en-US.md)

<h1 align="center">🗺️ 面向中国的 amapcn 🇨🇳</h1>

让中国地图开发合规且更简单。免费开源、开箱即用、可自定义的 React 地图组件。

<p align="center">
  <a href="https://www.npmjs.com/package/amapcn"><img alt="npm version" src="https://img.shields.io/npm/v/amapcn.svg" /></a>
  <a href="https://www.npmjs.com/package/amapcn"><img alt="npm downloads" src="https://img.shields.io/npm/dm/amapcn.svg" /></a>
  <a href="https://github.com/hustcc/amapcn/blob/main/LICENSE"><img alt="license" src="https://img.shields.io/github/license/hustcc/amapcn.svg" /></a>
</p>

零配置，一条命令即可开始。基于 <a href="https://lbs.amap.com/">高德地图（AMap）</a>，使用 <a href="https://tailwindcss.com/">Tailwind</a> 样式体系，与 <a href="https://ui.shadcn.com/">shadcn/ui</a> 无缝协作。

<p align="center">
  <a href="https://map.ling.pub/docs">快速开始</a> ·
  <a href="https://map.ling.pub/docs/installation">安装</a> ·
  <a href="https://map.ling.pub/docs/basic-map">组件</a> ·
  <a href="https://github.com/hustcc/ai-map/tree/main/amapcn-skill">SKILL</a>
</p>

<p align="center">
  <img width="1024" alt="amapcn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KpQ6TY5Y1OIAAAAAgBAAAAgAemJ7AQ/fmt.avif" />
</p>

## 🧩 配合 shadcn/ui 使用

使用 [shadcn/ui](https://ui.shadcn.com/) CLI 将 amapcn 组件添加到你的项目中：

```bash
npx shadcn@latest add https://map.ling.pub/r/amap.json
```

```tsx
import { Map, MapMarker } from "@/components/ui/map";
```

## 📦 使用 npm

直接安装 npm 包：

```bash
npm install amapcn
```

```tsx
import { Map, MapMarker } from "amapcn";
```

## 🤖 配合 Claude Code 使用

将 amapcn skill 添加到 Claude Code，实现 AI 地图开发：

```bash
claude skill add https://github.com/hustcc/ai-map/tree/main/amapcn-skill
```

## ✨ 特性

- 🎨 **主题感知** —— 自动适配明暗主题
- 🎯 **零配置** —— 默认即可工作
- 📦 **兼容 shadcn/ui** —— 采用一致的组件与样式模式
- 🗺️ **基于高德地图** —— 完整接入高德地图能力
- 🧩 **可组合** —— 用声明式组件构建复杂地图界面
- 📍 **标记与弹窗** —— 丰富的 Marker、Popup、Tooltip 与 Label 支持
- 🛤️ **路线能力** —— 轻松绘制路线与轨迹
- 🎮 **地图控件** —— 支持缩放、指北针、定位与全屏控件

## 📜 高德地图服务条款

本项目使用 [高德地图（AMap）](https://lbs.amap.com/) JS API。

- **API Key**：你需要在 [高德开放平台](https://lbs.amap.com/) 申请 API Key。
- **商业使用**：请阅读 [高德服务条款](https://lbs.amap.com/terms) 了解商业授权细节。
- **非商业使用**：高德提供开发者免费额度，详情见 [开发者定价页面](https://lbs.amap.com/dev/index)。

## 🤝 参与贡献

欢迎贡献！欢迎随时提交 Pull Request。

1. Fork 本仓库
2. 创建你的功能分支（`git checkout -b feature/amazing-feature`）
3. 提交你的修改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)。

项目灵感来自 <a href="https://github.com/AnmolSaini16/mapcn">mapcn</a> 的优秀设计、组件模式与文档结构。amapcn 在其思路基础上针对高德地图与中国地图生态进行了适配。
