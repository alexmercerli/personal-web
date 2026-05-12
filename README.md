# Mercer Industrial AI Portfolio

双语个人作品集网站，面向 HR、行业伙伴、工作伙伴和潜在合作方。

## 启动

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000/zh
http://localhost:3000/en
```

## 构建 / 部署

```bash
npm run build
```

项目已配置为静态导出，构建产物会生成在 `out/`，可部署到 GitHub Pages、Vercel、Netlify 等静态托管服务。

## 你最常编辑的文件

- `lib/content.ts`：中英文正文、项目、教育、联系文案
- `lib/planetTags.ts`：首页地球旁边的知识星球标签
- `lib/content.ts` 里的 `links`：简历、Email、LinkedIn、GitHub 占位链接
- `app/globals.css`：整体视觉样式
- `components/KnowledgePlanet.tsx`：3D 地球/轨道视觉

## 发布前 TODO

- 替换 `/resume.pdf`
- 替换 Email / LinkedIn / GitHub 占位链接
