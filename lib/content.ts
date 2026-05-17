export type Locale = "zh" | "en";

const sharedLinks = {
  resume: "/resume.pdf",
  email: "13717322326@163.com",
  linkedin: "#TODO-linkedin",
  github: "#TODO-github"
} as const;

export const content = {
  zh: {
    brand: {
      name: "李奕成 Mercer",
      subtitle: "AI Portfolio"
    },
    nav: {
      portfolio: "Portfolio",
      about: "About",
      ground: "Manufacturing Ground",
      data: "Automation & Data",
      projects: "Industrial AI Projects",
      lab: "AI Product & Agent Lab",
      capability: "Capability Map",
      contact: "Contact",
      resume: "Resume"
    },
    hero: {
      eyebrow: "Personal Knowledge Studio",
      titleLines: ["李奕成 Mercer", "个人主页"],
      titleAlt: "Yicheng Li / Mercer — AI Portfolio",
      lead: "从磁共振精密制造现场出发，连接工艺、生产、自动化测试、机器视觉与 AI 驱动业务。",
      body: "**我正在寻求向AI 产品经理，AI 项目经理方向转型，关注 AI 如何提高生产力、改善质量并赋能业务。**",
      primary: "查看作品集",
      secondary: "下载简历",
      tertiary: "联系我",
      planetTitle: "Knowledge Planet",
      directionLabel: "Current Direction",
      planetNote: "连接制造现场、AI 工具和产品落地，面向可验证、可交付、可使用的工业 AI 实践。"
    },
    links: sharedLinks,
    sectionEyebrows: {
      about: "01 / Positioning",
      education: "02 / Education",
      ground: "03 / Factory Context",
      data: "04 / Signals",
      projects: "05 / Applied Work",
      lab: "06 / Product Practice",
      capability: "07 / Kanban",
      career: "09 / Next Step",
      contact: "10 / Contact"
    },
    about: {
      title: "About / 关于我",
      text: "我是李奕成，一名从磁共振精密制造一线成长起来的工艺与自动化工程师。我的长期方向是将制造业 know-how、AI 工具能力与项目管理方法结合起来，推动 AI 在真实工业场景中的落地。",
      tags: ["工艺工程师", "自动化工程师", "AI 实践者", "英语可作为工作语言", "逻辑思维能力","创造性"]
    },
    beyondWork: {
      title: "Beyond Work / 工作之外",
      eyebrow: "08 / Personal Layer",
      text: "我是一个爱好广泛，乐于分享和高能量的人。工作之外，我喜欢看电影、小说、徒步，也是一个科幻和音乐爱好者。我相信把点连成面的力量，做自己的长期主义者。",
      quoteLabel: "最近很喜欢的一句话",
      quote: "到场是成功的八成。",
      portrait: {
        src: "/images/beyond-work/life-photo.jpg",
        alt: "生活照占位图"
      },
      interests: [
        {
          key: "film",
          label: "电影",
          title: "Film Picks",
          description: "三部我会推荐的电影",
          items: ["星际穿越", "楚门的世界", "三峡好人"],
          images: [{ src: "/images/beyond-work/film-placeholder.jpg", alt: "电影推荐占位图" }]
        },
        {
          key: "books",
          label: "小说",
          title: "Book Picks",
          description: "三本长期留在我阅读清单里的书",
          items: ["银河系漫游指南", "被讨厌的勇气", "非暴力沟通"],
          images: [{ src: "/images/beyond-work/books-placeholder.jpg", alt: "书籍推荐占位图" }]
        },
        {
          key: "hiking",
          label: "徒步",
          title: "Notes",
          description: "在徒步里体会自然",
          items: ["保持好的身体状态", "保持对自然的热爱", "把点连成线"],
          images: [
            { src: "/images/beyond-work/hiking-01.jpg", alt: "徒步照片占位图 1" },
            { src: "/images/beyond-work/hiking-02.jpg", alt: "徒步照片占位图 2" },
            { src: "/images/beyond-work/hiking-03.jpg", alt: "徒步照片占位图 3" }
          ]
        },
        {
          key: "scifi",
          label: "科幻",
          title: "科幻小说和电影爱好者",
          description: "Of Course I Still Love You",
          items: ["想象力", "创造力", "理性浪漫主义"],
          images: [{ src: "/images/beyond-work/ship.jpg", alt: "Of Course I Still Love You 占位图" }]
        }
      ]
    },
    ground: {
      title: "Manufacturing Ground / 制造现场根基",
      text: "我的工程经验来自真实制造现场一线：新产品导入、工艺开发、troubleshooting 、设备故障、质量问题和供应商管理。这些经历让我理解，AI 在制造业中的价值，必须回到效率、质量、稳定性和可交付结果。同时，在西门子医疗的四年经历磨练了我的一线经验和靠谱素养。",
      items: [
        "西门子医疗磁共振事业部工艺工程师",
        "管理 5 款量产产线中的工艺、设备、质量、物料问题",
        "2025 年负责产品合格率达到 99.8% 以上",
        "磁共振子部件工艺开发 / 新产品导入",
        "大型磁场测试系统导入、安装和验证",
        "先进设备/精密产品制造及验证 know-how"
      ]
    },
    data: {
      title: "Automation & Data / 自动化与数据",
      text: "我关注如何把制造过程中的数据变成可操作的判断：从自动化测试，到风险预警，再到质量改善。对我来说，数据不是报表，而是机器学习模型的输入。",
      items: ["自动化测试解决方案", "LabVIEW / Python / MATLAB", "历史过程工艺数据", "测试结果与不良记录", "XGBoost 不良风险预警模型", "约 CNY 400K / 年成本节省"]
    },
    projectsTitle: "Industrial AI Projects / 工业 AI 项目",
    projectLabels: {
      context: "项目背景",
      role: "我的角色",
      approach: "实现方法",
      tools: "工具",
      outcome: "结果"
    },
    projects: [
      {
        title: "基于Labview的自动化测试平台",
        context: "赋能医疗器械制造过程中的测试效率提升90%，识别质量风险",
        role: "自动化方案设计与实现",
        approach: "结合历史工艺数据、测试结果和不良记录，构建基于 XGBoost 的风险预警模型。",
        tools: "LabVIEW, Python, XGBoost, Manufacturing Data",
        outcome: "实现约 CNY 400K / 年成本节省",
        keywords: ["Automation Testing", "XGBoost", "Quality Prediction"],
        action: {
          type: "flip",
          label: "Demo",
          backEyebrow: "ACCESS NOTE",
          hint: "点击翻面",
          backTitle: "联系作者获取 demo",
          backText: "该平台涉及真实制造现场流程与测试逻辑，demo 可在沟通后单独展示。",
          cta: "Email Me",
          href: "#contact"
        }
      },
      {
        title: "卷对卷柔性电路板机器视觉缺陷检测",
        context: "人工检测效率低、漏检率高",
        role: "机器视觉工程师实习，参与算法开发",
        approach: "使用 OpenCV 完成图像处理、目标区域提取和检测结果后处理；基于 ResNet-18 构建缺陷分类模型。",
        tools: "OpenCV, ResNet-18, Industrial Camera, Image Processing",
        outcome: "漏检率下降 90%，处理速度提升 50%，召回率 98%+",
        keywords: ["Machine Vision", "OpenCV", "Industrial Inspection"],
        action: {
          type: "external",
          label: "Case Link",
          hint: "打开项目链接",
          href: "http://www.peng-le.cn/?PCB-AOI/84.html"
        }
      },
      {
        title: "基于 AI 的罕见病 CT 影像辅助诊断方案",
        context: "罕见病 CT 病灶识别、分割与分级评分",
        role: "核心算法工程师",
        approach: "结合 Transformer 架构与 Unet-8 算法，实现病灶识别分割。",
        tools: "Python, Transformer, Unet, Medical Image Segmentation",
        outcome: "病灶分割准确率 91.7%，在清华长庚医院试用运行，项目获得课程一等奖",
        keywords: ["Medical AI", "CT Segmentation", "Transformer"],
        action: {
          type: "video",
          label: "Video",
          hint: "观看项目视频",
          src: "/videos/medical-ai-demo.mp4",
          modalTitle: "项目视频 / Medical AI Demo",
          placeholderTitle: "视频占位符",
          placeholderText: "上传视频到 /public/videos/medical-ai-demo.mp4 后，这里会自动播放。",
          close: "关闭"
        }
      }
    ],
    lab: {
      title: "AI Product & Agent Lab / AI 产品与 Agent 实验室",
      text: "我正在构建 AI 产品经理所需要的实践能力：理解业务问题，拆解用户需求，设计 AI 功能，快速完成原型验证，并判断它是否能进入真实工作流。",
      items: ["主流 AI 模型使用经验", "ChatGPT 等大模型工具链", "Openclaw & Hermes Agent", "Vibe coding", "AI 辅助开发", "Agent 工作流设计", "功能设计与原型验证", "面向业务需求拆解 AI 功能"]
    },
    capabilityTitle: "Capability Map / 能力地图",
    capabilities: [
      ["Manufacturing Know-how", "工艺 / 设备 / 质量 / NPI / 医疗器械验证"],
      ["Automation & Data", "LabVIEW / Python / MATLAB / 自动化测试 / XGBoost"],
      ["AI & Computer Vision", "OpenCV / ResNet-18 / Transformer / Unet / 医学影像 AI"],
      ["AI Product & Agent", "需求拆解 / 原型验证 / Agent 工作流 / AI 辅助开发"]
    ],
    educationTitle: "Education / 教育背景",
    education: [
      ["清华大学", "工程管理，工业工程系，2025.09 至今；GPA 3.9 / 4.0，核心课程：运筹学、战略管理、系统工程、人力资源管理、机器学习"],
      ["深圳大学", "机械设计制造及其自动化（机器人方向），本科，2018.09 - 2022.06；核心课程：机械设计、机器视觉、机器学习、嵌入式系统"],
      ["OTH Regensburg", "德国雷根斯堡应用技术大学机械工程系，国际交换生，2019.03 - 2019.04"]
    ],
    career: {
      title: "Career Direction / 职业方向",
      text: "我的下一阶段目标，是从工艺工程与自动化实践，走向 AI 产品经理或制造业 AI 项目经理。我希望参与那些真正进入业务流程的 AI 项目：能改善质量、提升效率、降低风险，并被一线团队实际使用。",
      roles: ["AI 产品经理", "制造业 AI 项目经理", "工业数字化项目经理", "自动化 / AI 解决方案工程师","FDE 前沿部署工程师"]
    },
    contact: {
      title: "Contact / 联系方式",
      text: "我正在寻找 AI 产品经理、制造业 AI 项目经理、工业数字化和自动化解决方案相关机会。如果你关注制造业 AI、医疗器械数字化、工业数据应用或 AI Agent 工作流，欢迎联系我。",
      buttons: ["Download Resume", "Email Me", "LinkedIn", "GitHub"],
      emailDialog: {
        title: "Email",
        hint: "请给我发送邮件，我会快速回复你。",
        copy: "复制邮箱",
        copied: "已复制",
        close: "关闭"
      }
    }
  },
  en: {
    brand: {
      name: "Yicheng Li / Mercer",
      subtitle: "AI Portfolio"
    },
    nav: {
      portfolio: "Portfolio",
      about: "About",
      ground: "Manufacturing Ground",
      data: "Automation & Data",
      projects: "Industrial AI Projects",
      lab: "AI Product & Agent Lab",
      capability: "Capability Map",
      contact: "Contact",
      resume: "Resume"
    },
    hero: {
      eyebrow: "Personal Knowledge Studio",
      titleLines: ["Yicheng Li / Mercer", "AI Portfolio"],
      titleAlt: "李奕成｜AI 作品集",
      lead: "From medical device manufacturing to AI project thinking.",
      body: "**I am seeking to transition toward AI Product Manager and AI Project Manager roles, with a focus on how AI can improve productivity, quality, and business enablement.**",
      primary: "View Portfolio",
      secondary: "Download Resume",
      tertiary: "Contact",
      planetTitle: "AI Knowledge Planet",
      directionLabel: "Current Direction",
      planetNote: "Connecting manufacturing practice, AI tools, and product delivery for verifiable, shippable, usable industrial AI."
    },
    links: sharedLinks,
    sectionEyebrows: {
      about: "01 / Positioning",
      education: "02 / Education",
      ground: "03 / Factory Context",
      data: "04 / Signals",
      projects: "05 / Applied Work",
      lab: "06 / Product Practice",
      capability: "07 / Kanban",
      career: "09 / Next Step",
      contact: "10 / Contact"
    },
    about: {
      title: "About / About Me",
      text: "I am Yicheng Li, also known as Mercer — a process and automation engineer who grew from the front line of precision MRI manufacturing. My long-term direction is to combine manufacturing know-how, AI tool capabilities, and project management methods to drive AI implementation in real industrial scenarios.",
      tags: ["Process Engineer", "Automation Engineer", "AI Practitioner", "English as a Working Language", "Logical Thinking", "Creativity"]
    },
    beyondWork: {
      title: "Beyond Work / Personal Layer",
      eyebrow: "08 / Personal Layer",
      text: "I’m a person with diverse interests who loves to share and is full of energy. Outside of work, I enjoy watching movies, reading novels, and hiking, and I’m also a fan of science fiction and music. I believe in the power of connecting the dots and am committed to a long-term perspective.",
      quoteLabel: "Recent quote",
      quote: "Showing up is 80 percent of success.",
      portrait: {
        src: "/images/beyond-work/life-photo.jpg",
        alt: "Life photo placeholder"
      },
      interests: [
        {
          key: "film",
          label: "Film",
          title: "Film Picks",
          description: "Three films I would recommend",
          items: ["Interstellar", "The Truman Show", "Still Life"],
          images: [{ src: "/images/beyond-work/film-placeholder.jpg", alt: "Film recommendations placeholder" }]
        },
        {
          key: "books",
          label: "Books",
          title: "Book Picks",
          description: "Three books that stay on my shelf",
          items: ["The Hitchhiker's Guide to the Galaxy", "The Courage to Be Disliked", "Nonviolent Communication"],
          images: [{ src: "/images/beyond-work/books-placeholder.jpg", alt: "Book recommendations placeholder" }]
        },
        {
          key: "hiking",
          label: "Hiking",
          title: "Trail Notes",
          description: "Experience nature on a hike",
          items: ["Keep Healthy", "Observing Nature", "Connect the dots"],
          images: [
            { src: "/images/beyond-work/hiking-01.jpg", alt: "Hiking photo placeholder 1" },
            { src: "/images/beyond-work/hiking-02.jpg", alt: "Hiking photo placeholder 2" },
            { src: "/images/beyond-work/hiking-03.jpg", alt: "Hiking photo placeholder 3" }
          ]
        },
        {
          key: "scifi",
          label: "Sci-fi",
          title: "Loves science fiction novels and movies",
          description: "Of Course I Still Love You",
          items: ["Imagination", "Creativity", "Rational Romanticism"],
          images: [{ src: "/images/beyond-work/ship.jpg", alt: "Of Course I Still Love You placeholder" }]
        }
      ]
    },
    ground: {
      title: "Manufacturing Ground / 制造现场根基",
      text: "My engineering experience comes from the front line of real manufacturing environments: new product introduction, process development, troubleshooting, equipment failures, quality issues, and supplier management. These experiences helped me understand that the value of AI in manufacturing must return to efficiency, quality, stability, and deliverable results. At the same time, four years at Siemens Healthineers shaped my frontline experience and reliability as an engineer.",
      items: [
        "Process engineer in Siemens Healthineers MR business",
        "Handled process, equipment, quality, and material issues across 5 production lines",
        "Responsible for product yield above 99.8% in 2025",
        "MR sub-component process development / NPI",
        "Large magnetic field test system installation and validation",
        "Medical device manufacturing and validation know-how"
      ]
    },
    data: {
      title: "Automation & Data / 自动化与数据",
      text: "I focus on turning manufacturing data into actionable signals — from automated testing to risk prediction and quality improvement. For me, data is not just reporting. It is an early warning layer for manufacturing systems.",
      items: ["Automated testing solutions", "LabVIEW / Python / MATLAB", "Historical process data", "Test results and defect records", "XGBoost defect risk prediction model", "Around CNY 400K annual cost saving"]
    },
    projectsTitle: "Industrial AI Projects / 工业 AI 项目",
    projectLabels: {
      context: "Context",
      role: "My Role",
      approach: "Approach",
      tools: "Tools",
      outcome: "Outcome"
    },
    projects: [
      {
        title: "LabVIEW-Based One-button Test Platform",
        context: "Enables a 90% increase in testing efficiency during medical device manufacturing and identifies quality risks",
        role: "Solution design and implementation",
        approach: "Built an automated testing solution and developed an XGBoost-based risk prediction model using historical process data, test results, and defect records.",
        tools: "LabVIEW, Python, XGBoost, Manufacturing Data",
        outcome: "Achieved around CNY 400K annual cost saving",
        keywords: ["Automation Testing", "XGBoost", "Quality Prediction"],
        action: {
          type: "flip",
          label: "Demo",
          backEyebrow: "ACCESS NOTE",
          hint: "Click to flip",
          backTitle: "Demo available on request",
          backText: "This platform involves real manufacturing workflows and testing logic. A demo can be shared after direct contact.",
          cta: "Email Me",
          href: "#contact"
        }
      },
      {
        title: "Machine Vision Defect Detection for Roll-to-roll Flexible Circuit Boards",
        context: "Manual defect inspection was inefficient and prone to missing defects",
        role: "Machine vision engineering intern, involved in algorithm development",
        approach: "Used OpenCV for image processing, ROI extraction, and post-processing; built a ResNet-18 model for defect classification.",
        tools: "OpenCV, ResNet-18, Industrial Camera, Image Processing",
        outcome: "Reduced missed detection rate by 90%, improved processing speed by 50%, and achieved 98%+ recall",
        keywords: ["Machine Vision", "OpenCV", "Industrial Inspection"],
        action: {
          type: "external",
          label: "Case Link",
          hint: "Open case link",
          href: "http://www.peng-le.cn/?PCB-AOI/84.html"
        }
      },
      {
        title: "AI-assisted CT Image Diagnosis for Rare Disease",
        context: "CT lesion segmentation, recognition, and grading for rare disease diagnosis",
        role: "Core algorithm engineer",
        approach: "Developed a Transformer-enhanced Unet-8 model for lesion segmentation.",
        tools: "Python, Transformer, Unet, Medical Image Segmentation",
        outcome: "Achieved 91.7% segmentation accuracy; trialed at Tsinghua Changgung Hospital and won first prize in the course project",
        keywords: ["Medical AI", "CT Segmentation", "Transformer"],
        action: {
          type: "video",
          label: "Video",
          hint: "Watch project video",
          src: "/videos/medical-ai-demo.mp4",
          modalTitle: "Project Video / Medical AI Demo",
          placeholderTitle: "Video placeholder",
          placeholderText: "Upload your video to /public/videos/medical-ai-demo.mp4 and it will play here automatically.",
          close: "Close"
        }
      }
    ],
    lab: {
      title: "AI Product & Agent Lab / AI 产品与 Agent 实验室",
      text: "I am building the practical skill set required for AI product work: understanding business problems, translating needs into AI features, validating prototypes quickly, and evaluating whether they can fit into real workflows.",
      items: ["Mainstream AI model usage", "ChatGPT and LLM toolchains", "Openclaw & Hermes Agent", "Vibe coding", "AI-assisted development", "Agent workflow design", "Feature design and prototype validation", "AI feature breakdown from business needs"]
    },
    capabilityTitle: "Capability Map / 能力地图",
    capabilities: [
      ["Manufacturing Know-how", "Process / Equipment / Quality / NPI / Medical Device Validation"],
      ["Automation & Data", "LabVIEW / Python / MATLAB / Automated Testing / XGBoost"],
      ["AI & Computer Vision", "OpenCV / ResNet-18 / Transformer / Unet / Medical AI"],
      ["AI Product & Agent", "Requirement Breakdown / Prototype Validation / Agent Workflow / AI-assisted Development"]
    ],
    educationTitle: "Education / 教育背景",
    education: [
      ["Tsinghua University", "Engineering Management, Department of Industrial Engineering, 2025.09 - Present; GPA 3.9 / 4.0; core courses include Operations Research, Strategic Management, Systems Engineering, HR Management, Machine Learning"],
      ["Shenzhen University", "Mechanical Design, Manufacturing and Automation, Robotics Track, Bachelor, 2018.09 - 2022.06; core courses include Mechanical Design, Machine Vision, Machine Learning, Embedded Systems"],
      ["OTH Regensburg", "Department of Mechanical Engineering, International Exchange Student, 2019.03 - 2019.04"]
    ],
    career: {
      title: "Career Direction / 职业方向",
      text: "My next step is to move from process engineering and automation practice toward AI product management and industrial AI project delivery. I am interested in AI solutions that enter real workflows, improve quality, increase efficiency, reduce risk, and are actually used by frontline teams.",
      roles: ["AI Product Manager", "Industrial AI Project Manager", "Manufacturing Digitalization PM", "Automation / AI Solution Engineer","FDE"]
    },
    contact: {
      title: "Contact / 联系方式",
      text: "I am open to opportunities in AI product management, industrial AI project management, manufacturing digitalization, and automation solutions. I am especially interested in applying AI to real manufacturing workflows and medical device production systems.",
      buttons: ["Download Resume", "Email Me", "LinkedIn", "GitHub"],
      emailDialog: {
        title: "Email",
        hint: "Send me a Email and I will reply you soon.",
        copy: "Copy Email",
        copied: "Copied",
        close: "Close"
      }
    }
  }
} as const;
