# 🚀 Holink Solusi Digital - SEO Tool Directory

A modern SEO-focused Tool Directory built with Nuxt 4, featuring dynamic routes, Static Site Generation (SSG), structured data (JSON-LD), sitemap generation, and technical SEO best practices.

This project was developed as part of the Fullstack Developer Technical Assessment for PT Holink Solusi Digital.

---

## 📸 Preview

![Project Preview](https://raw.githubusercontent.com/SalmanDMA/holink-solusi-digital-app/refs/heads/main/public/image/preview.png)

---

## ✨ Features

- 🔍 **SEO Optimized Pages** – Every tool has a unique SEO-friendly URL and metadata.
- ⚡ **Static Site Generation (SSG)** – All tool pages are generated at build time for maximum performance.
- 🗺️ **Automatic Sitemap Generation** – Dynamic sitemap generated from all available tools.
- 🤖 **Robots.txt Support** – Search engine crawling configuration included.
- 📊 **Structured Data (JSON-LD)** – SoftwareApplication schema implemented for rich search results.
- 🌐 **Open Graph Metadata** – Optimized social sharing previews.
- 📱 **Responsive Design** – Works across desktop, tablet, and mobile devices.
- 🎯 **Dynamic Routing** – Single template generates multiple SEO pages using slug-based routing.
- 🛡️ **Type-Safe Development** – Built with TypeScript and strict typing.

---

## 🛠️ Tech Stack

- **Framework:** Nuxt 4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **SEO:** Nuxt SEO APIs, Sitemap, Robots.txt
- **Rendering Strategy:** Static Site Generation (SSG)
- **Structured Data:** Schema.org JSON-LD

---

## 🏗️ Project Structure

```text
.
├── assets/
├── components/
├── composables/
├── data/
│   └── tools.json
├── pages/
│   ├── index.vue
│   └── tools/
│       └── [slug].vue
├── public/
├── types/
├── app.vue
├── nuxt.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/SalmanDMA/holink-solusi-digital-app.git
cd holink-solusi-digital-app

npm install
```

### Development

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

### Generate Static Pages

```bash
npm run generate
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔍 SEO Implementation

### Dynamic Routes

Each tool is generated using:

```text
/tools/[slug]
```

Examples:

```text
/tools/bioglow
/tools/tapnest
/tools/linkloom
```

---

### SEO Metadata

Every page contains unique:

- Title Tag
- Meta Description
- Canonical URL
- Open Graph Metadata
- Twitter Card Metadata

---

### Structured Data

Implemented using:

```json
{
	"@context": "https://schema.org",
	"@type": "SoftwareApplication"
}
```

The dataset represents software products, making `SoftwareApplication` the most appropriate schema type.

---

### Sitemap

Automatically generated from all tool routes.

Example:

```text
/sitemap.xml
```

---

### Robots

Search engine crawling configuration:

```text
/robots.txt
```

---

## ⚙️ Rendering Strategy

### Why SSG?

The provided dataset is static and contains a fixed number of records.

Static Site Generation was selected because it provides:

- Better SEO performance
- Faster page load times
- Reduced server workload
- Fully pre-rendered pages for search engine crawlers
- Improved Core Web Vitals

All tool detail pages are generated at build time.

---

## 📈 Assessment Requirements Coverage

| Requirement        | Status |
| ------------------ | ------ |
| Index Page         | ✅     |
| Dynamic Tool Pages | ✅     |
| SSR / SSG          | ✅     |
| SEO Metadata       | ✅     |
| Canonical URLs     | ✅     |
| Open Graph         | ✅     |
| JSON-LD            | ✅     |
| Sitemap            | ✅     |
| Robots.txt         | ✅     |
| Responsive Design  | ✅     |

---

## 🔗 Live Demo

```text
https://holink-solusi-digital-app.vercel.app
```

---

## 👨‍💻 Developer

**Salman Dwi Maulana Akbar**

- 🌐 Portfolio: https://bit.ly/my-portofolio-salmandma
- 💼 LinkedIn: https://www.linkedin.com/in/salmandma/
- 🐙 GitHub: https://github.com/SalmanDMA

---

## 📄 License

This project was developed solely for the PT Holink Solusi Digital technical assessment.

# holink-solusi-digital-app
