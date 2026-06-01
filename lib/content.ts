export type Locale = "zh" | "en";

const sharedLinks = {
  resume: "/resume.pdf",
  email: "13717322326@163.com",
  linkedin: "https://www.linkedin.com/in/yicheng-li-716850339/"
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
      lead: "一个从磁共振精密制造现场出发的工艺工程师。",
      body: "**我正在寻求向AI 产品经理，AI 项目经理方向转型，关注 AI 如何提高生产力、改善质量并赋能业务。**",
      primary: "查看作品集",
      secondary: "下载简历",
      tertiary: "联系我",
      planetTitle: "Knowledge Planet",
      directionLabel: "Current Direction",
      planetNote: "连接具体业务、AI工作流和制造现场，面向可验证、可交付、可使用的工业 AI 实践。"
    },
    mobileTabs: [
      { label: "关于我", href: "#about", icon: "person" },
      { label: "工作经验", href: "#ground", icon: "experience" },
      { label: "AI实验室", href: "/zh/rag-showcase/", icon: "lab" },
      { label: "工作之外", href: "#beyond-work", icon: "life" }
    ],
    links: sharedLinks,
    sectionEyebrows: {
      about: "",
      education: "",
      ground: "",
      data: "",
      projects: "",
      lab: "",
      capability: "",
      career: "",
      contact: ""
    },
    about: {
      title: "About / 关于我",
      text: "我是李奕成，一名从磁共振精密制造一线成长起来的工艺与自动化工程师。我的长期方向是将制造业 know-how、AI 工具能力与项目管理方法结合起来，推动 AI 在真实工业场景中的落地。",
      tags: ["工艺工程师", "自动化工程师", "AI 实践者", "英语口语流利", "逻辑思维能力","第一性原理"]
    },
    beyondWork: {
      title: "Beyond Work / 工作之外",
      eyebrow: "",
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
      title: "Working Experience / 工作经验",
      text: "我在真实制造现场积累了工作经验：新产品导入、工艺开发、troubleshooting 、设备故障、质量问题和供应商管理。我认为 AI 在制造业中的价值，必须回到效率、质量、稳定性和可交付结果上去。在西门子医疗的四年经历磨练了我的工程经验和靠谱素养。",
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
      text: "我关注如何利用好生产数据：从数据分析，到工艺预警，再到质量改善。数据不单单可以用来做看板，也可以用来做机器学习的预测。",
      items: ["自动化测试解决方案", "LabVIEW / Python / MATLAB", "历史过程工艺数据", "测试结果与不良记录", "分析报告"]
    },
    projectsTitle: "AI Projects / AI 项目",
    workflowTeaser: {
      eyebrow: "Centerpiece Prototype",
      title: "Industrial AI Multi-Agent Workflow Showcase",
      text: "一个模拟制造问题调查的交互式 AI 工作流原型，展示多 Agent 协作、风险评估和人工复核。",
      cta: "Launch Experience"
    },
    ragTeaser: {
      eyebrow: "",
      title: "基于RAG的企业知识库搭建",
      text: "一个企业知识库的真实Demo演示：选择私有文档/数据，提出问题，可视化RAG（检索增强生成）的流程，并且演示如何将生成的上下文和Prompt输入给LLM。",
      cta: "打开Demo演示"
    },
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
        context: "当前的人工测试流程需要使用多种测试仪器，工艺繁琐且耗费时间长",
        role: "自动化方案设计与实现",
        approach: "开发了基于Labview的一键测试平台，并且结合历史工艺数据、测试结果和不良记录，构建基于 XGBoost 的风险预警模型。",
        tools: "LabVIEW, Python, XGBoost, Manufacturing Data",
        outcome: "节省工时，将制造过程中的测试效率提升90%，实现约 CNY 400K / 年成本节省",
        keywords: ["Automation Testing", "XGBoost", "Quality Prediction"],
        action: {
          type: "flip",
          label: "Demo",
          backEyebrow: "ACCESS NOTE",
          hint: "点击翻面",
          backTitle: "联系作者获取 demo",
          backText: "由于涉及业务流程与测试逻辑，demo 可在沟通后单独展示。",
          cta: "Email Me"
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
          href: "http://www.peng-le.cn/?PCB-AOI/84.html",
          modalTitle: "打开项目链接",
          modalText: "该案例将在新的浏览器标签页中打开。",
          openLabel: "继续打开",
          close: "取消"
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
          type: "flip",
          label: "Video",
          backEyebrow: "ACCESS NOTE",
          hint: "点击翻面",
          backTitle: "联系作者获取视频",
          backText: "该项目视频可在沟通后单独提供。",
          cta: "Email Me"
        }
      }
    ],
    lab: {
      title: "AI Agent Lab / AI Agent 实验室",
      text: "我正在将AI落地：我能深刻理解业务需求，设计产品功能，快速完成原型验证，并判断它是否被实际使用并创造价值。",
      items: ["AI Workflow", "RAG", "企业知识库"]
    },
    capabilityTitle: "Capability Map / 能力地图",
    capabilities: [
      ["Manufacturing Know-how", "工艺 / 设备 / 质量 / NPI / 验证与确认"],
      ["Automation & Data", "LabVIEW / Python / MATLAB / 自动化测试 / 机器学习"],
      ["AI & Computer Vision", "OpenCV / ResNet-18 / Transformer / Unet"],
      ["Common skills", "沟通交流能力 / 项目管理能力 / 英语口语 / 基础德语 "]
    ],
    educationTitle: "Education / 教育背景",
    education: [
      ["清华大学", "工程管理，工业工程系，2025.09 至今；GPA 3.9 / 4.0，核心课程：运筹学、战略管理、系统工程、人力资源管理、机器学习"],
      ["深圳大学", "机械设计制造及其自动化（机器人方向），本科，2018.09 - 2022.06；核心课程：机械设计、机器视觉、机器学习、嵌入式系统"],
      ["德国雷根斯堡应用技术大学", "机械工程系，国际交换生，2019.03 - 2019.04"]
    ],
    career: {
      title: "Career Direction / 职业方向",
      text: "我的下一阶段目标，是从生产一线，走向 AI 产品经理或制造业 AI 项目经理的岗位。我希望参与那些真正进入业务流程的 AI 项目：改善质量、提升效率、降低风险，并为业务带来实际价值。",
      roles: ["AI 产品经理", "AI 项目经理", "工业数字化项目经理", "AI 售前/解决方案工程师","FDE 前沿部署工程师"]
    },
    contact: {
      title: "Contact / 联系方式",
      text: "我正在寻找 AI 产品经理、制造业 AI 项目经理、工业数字化和自动化解决方案相关机会。如果你关注制造业 AI、医疗器械数字化、工业数据应用或 AI Agent 工作流，欢迎联系我。",
      buttons: ["下载简历", "Email Me", "LinkedIn"],
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
      titleLines: ["Yicheng Li / Mercer", "Personal Homepage"],
      titleAlt: "李奕成 Mercer｜个人主页",
      lead: "A process engineer shaped by precision MRI manufacturing.",
      body: "**I am seeking to transition toward AI Product Manager and AI Project Manager roles, with a focus on how AI can improve productivity, quality, and business enablement.**",
      primary: "View Portfolio",
      secondary: "Download Resume",
      tertiary: "Contact",
      planetTitle: "AI Knowledge Planet",
      directionLabel: "Current Direction",
      planetNote: "Connecting concrete business needs, AI workflows, and manufacturing sites for verifiable, deliverable, usable industrial AI practice."
    },
    mobileTabs: [
      { label: "About", href: "#about", icon: "person" },
      { label: "Experience", href: "#ground", icon: "experience" },
      { label: "AI Lab", href: "/en/rag-showcase/", icon: "lab" },
      { label: "Beyond", href: "#beyond-work", icon: "life" }
    ],
    links: sharedLinks,
    sectionEyebrows: {
      about: "",
      education: "",
      ground: "",
      data: "",
      projects: "",
      lab: "",
      capability: "",
      career: "",
      contact: ""
    },
    about: {
      title: "About / About Me",
      text: "I am Yicheng Li, also known as Mercer — a process and automation engineer who grew from the front line of precision MRI manufacturing. My long-term direction is to combine manufacturing know-how, AI tool capabilities, and project management methods to drive AI implementation in real industrial scenarios.",
      tags: ["Process Engineer", "Automation Engineer", "AI Practitioner", "Fluent Spoken English", "Logical Thinking", "First Principles"]
    },
    beyondWork: {
      title: "Beyond Work / Personal Layer",
      eyebrow: "",
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
      title: "Working Experience / Engineering Practice",
      text: "I built my working experience in real manufacturing environments: new product introduction, process development, troubleshooting, equipment failures, quality issues, and supplier management. I believe the value of AI in manufacturing must return to efficiency, quality, stability, and deliverable outcomes. Four years at Siemens Healthineers strengthened my engineering experience and my reliability as a professional.",
      items: [
        "Process engineer in Siemens Healthineers MR business",
        "Managed process, equipment, quality, and material issues across 5 mass-production lines",
        "Responsible for product yield above 99.8% in 2025",
        "MR sub-component process development / NPI",
        "Large magnetic field test system introduction, installation, and validation",
        "Advanced equipment / precision product manufacturing and validation know-how"
      ]
    },
    data: {
      title: "Automation & Data / 自动化与数据",
      text: "I focus on making better use of production data: from data analysis to process early warning and quality improvement. Data is not just a dashboard. It is the input to machine learning models.",
      items: ["Automated testing solutions", "LabVIEW / Python / MATLAB", "Historical process data", "Test results and defect records", "Analysis reports"]
    },
    projectsTitle: "AI Projects / Applied Work",
    workflowTeaser: {
      eyebrow: "Centerpiece Prototype",
      title: "Industrial AI Multi-Agent Workflow Showcase",
      text: "An interactive AI workflow prototype that simulates manufacturing investigation, multi-agent collaboration, risk evaluation, and human review.",
      cta: "Launch Experience"
    },
    ragTeaser: {
      eyebrow: "",
      title: "Enterprise Knowledge Base Built with RAG",
      text: "A real demo of an enterprise knowledge base: select private documents/data, ask questions, visualize the RAG (retrieval-augmented generation) workflow, and see how the generated context and prompt are passed into an LLM.",
      cta: "Open Demo"
    },
    projectLabels: {
      context: "Context",
      role: "My Role",
      approach: "Approach",
      tools: "Tools",
      outcome: "Outcome"
    },
    projects: [
      {
        title: "LabVIEW-Based Automated Test Platform",
        context: "The existing manual testing process required multiple instruments, involved complex procedures, and took a long time to complete",
        role: "Solution design and implementation",
        approach: "Developed a LabVIEW-based one-button test platform and built an XGBoost-based risk warning model using historical process data, test results, and defect records.",
        tools: "LabVIEW, Python, XGBoost, Manufacturing Data",
        outcome: "Saved working hours, improved testing efficiency in the manufacturing process by 90%, and achieved around CNY 400K annual cost saving",
        keywords: ["Automation Testing", "XGBoost", "Quality Prediction"],
        action: {
          type: "flip",
          label: "Demo",
          backEyebrow: "ACCESS NOTE",
          hint: "Click to flip",
          backTitle: "Demo available on request",
          backText: "Because this platform involves real manufacturing workflows and testing logic, a demo can be shared separately after direct communication.",
          cta: "Email Me"
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
          href: "http://www.peng-le.cn/?PCB-AOI/84.html",
          modalTitle: "Open project link",
          modalText: "This case page will open in a new browser tab.",
          openLabel: "Open Link",
          close: "Cancel"
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
          type: "flip",
          label: "Video",
          backEyebrow: "ACCESS NOTE",
          hint: "Click to flip",
          backTitle: "Video available on request",
          backText: "The project video can be shared separately after direct communication.",
          cta: "Email Me"
        }
      }
    ],
    lab: {
      title: "AI Agent Lab / Product Practice",
      text: "I am turning AI into practical workflows: understanding business needs deeply, designing product features, quickly validating prototypes, and judging whether they are actually used and able to create value.",
      items: ["AI Workflow", "RAG", "Enterprise Knowledge Base"]
    },
    capabilityTitle: "Capability Map / 能力地图",
    capabilities: [
      ["Manufacturing Know-how", "Process / Equipment / Quality / NPI / Medical Device Validation"],
      ["Automation & Data", "LabVIEW / Python / MATLAB / Automated Testing / XGBoost"],
      ["AI & Computer Vision", "OpenCV / ResNet-18 / Transformer / Unet / AI Agent"],
      ["Common skills", "Communication / Project Management / Spoken English / Basic German"]
    ],
    educationTitle: "Education / 教育背景",
    education: [
      ["Tsinghua University", "Engineering Management, Department of Industrial Engineering, 2025.09 - Present; GPA 3.9 / 4.0; core courses include Operations Research, Strategic Management, Systems Engineering, HR Management, Machine Learning"],
      ["Shenzhen University", "Mechanical Design, Manufacturing and Automation, Robotics Track, Bachelor, 2018.09 - 2022.06; core courses include Mechanical Design, Machine Vision, Machine Learning, Embedded Systems"],
      ["OTH Regensburg", "Department of Mechanical Engineering, International Exchange Student, 2019.03 - 2019.04"]
    ],
    career: {
      title: "Career Direction / 职业方向",
      text: "My next step is to move from the manufacturing site toward AI Product Manager or industrial AI Project Manager roles. I hope to work on AI projects that truly enter business workflows, improve quality, increase efficiency, reduce risk, and create practical business value.",
      roles: ["AI Product Manager", "AI Project Manager", "Industrial Digitalization PM", "AI Presales / Solution Engineer", "FDE / Forward Deployed Engineer"]
    },
    contact: {
      title: "Contact / 联系方式",
      text: "I am open to opportunities in AI product management, industrial AI project management, manufacturing digitalization, and automation solutions. I am especially interested in applying AI to real manufacturing workflows and medical device production systems.",
      buttons: ["Download Resume", "Email Me", "LinkedIn"],
      emailDialog: {
        title: "Email",
        hint: "Send me an email and I will reply soon.",
        copy: "Copy Email",
        copied: "Copied",
        close: "Close"
      }
    }
  }
} as const;
