import type { Locale } from "@/lib/content";

export type RagChunk = {
  id: string;
  title: string;
  page: string;
  tokens: string;
  text: string;
  keywords: readonly string[];
};

export type RagDocument = {
  id: string;
  title: string;
  category: string;
  fileName: string;
  pdfHref: string;
  summary: string;
  previewTitle: string;
  previewExcerpt: string;
  questions: readonly string[];
  chunks: readonly RagChunk[];
};

export type RagShowcaseContent = {
  eyebrow: string;
  title: string;
  lead: string;
  principles: readonly string[];
  libraryTitle: string;
  libraryHint: string;
  previewTitle: string;
  previewHint: string;
  openPdfLabel: string;
  openPdfNewTabLabel: string;
  closeLabel: string;
  selectedLabel: string;
  questionTitle: string;
  questionHint: string;
  questionPlaceholder: string;
  analyzeLabel: string;
  analyzingLabel: string;
  resetLabel: string;
  suggestionsLabel: string;
  chunksTitle: string;
  chunksHint: string;
  retrievalTitle: string;
  retrievalHint: string;
  rerankTitle: string;
  rerankHint: string;
  llmInputTitle: string;
  llmInputHint: string;
  keywordsLabel: string;
  contextLabel: string;
  promptLabel: string;
  emptyRetrieval: string;
  emptyLlmInput: string;
  apiMissing: string;
  apiError: string;
  scoreLabel: string;
  rerankScoreLabel: string;
  matchedKeywordsLabel: string;
  documents: readonly RagDocument[];
};

const braceletChunks: readonly RagChunk[] = [
  {
    id: "B01",
    title: "工厂背景与丽拉的身份",
    page: "p.01",
    tokens: "约 178 tokens",
    keywords: ["食品加工厂", "印度女员工", "丽拉", "文化身份", "工作小组"],
    text:
      "丽拉·帕特尔在一家拥有 400 多名女员工的食品加工厂工作了 6 年。亚洲女员工不到全部女员工的五分之一，其中很多人与她一样有印度血统。她和其他 4 名女员工组成小组，直接向主管比尔·埃文汇报。"
  },
  {
    id: "B02",
    title: "安全事故与首饰禁令",
    page: "p.01",
    tokens: "约 214 tokens",
    keywords: ["安全事故", "首饰禁令", "手镯", "机器", "安全委员会"],
    text:
      "上个月一名女员工的手镯被卡进机器，导致手腕被卡断。安全委员会决定，任何人在工作时不得佩戴手镯、订婚戒指、耳环或项链，只允许佩戴结婚戒指、耳钉和手表。埃文要求丽拉摘掉自己的手镯。"
  },
  {
    id: "B03",
    title: "手镯的婚姻与宗教意义",
    page: "p.01",
    tokens: "约 236 tokens",
    keywords: ["印度妻子", "宗教信仰", "婚姻标志", "丈夫尊重", "社会地位"],
    text:
      "丽拉一直戴着三个手镯：铁的、塑料的和金的，这是她家乡的风俗。所有结过婚的印度妇女都要佩戴手镯。后来社区关系委员会的辛先生解释，手镯不仅是婚姻标志，也意味着丈夫对妻子的尊重；手镯越多、价值越大，女性受到的尊重和社会地位越高。"
  },
  {
    id: "B04",
    title: "主管沟通方式引发抵触",
    page: "p.01",
    tokens: "约 206 tokens",
    keywords: ["埃文", "训斥", "抵触", "重新戴上", "亚洲咨询委员会"],
    text:
      "埃文对丽拉说不要大惊小怪，并提到他已经训斥过其他印度女员工。丽拉含泪摘下手镯，但两人离开后又戴上金手镯继续工作。两三天内，主管发现所有印度女员工又戴上了手镯，有些人甚至戴得更多。亚洲咨询委员会要求公司取消禁令，直到与代表会面。"
  },
  {
    id: "B05",
    title: "管理层面临安全与多元文化冲突",
    page: "p.01-p.02",
    tokens: "约 252 tokens",
    keywords: ["安全隐患", "卫生隐患", "多元文化", "停工风险", "领导多元化"],
    text:
      "工厂主管琼斯认为，在这个工作环境中，珠宝首饰会带来安全和卫生隐患，因此必须摘除。但他担心如果直接告诉亚洲委员会，会引发更大抵触甚至停工。辛先生指出，宗教惯例并不阻止禁令实施，但手镯具有强烈风俗意义，摘下手镯甚至会让部分女性联想到丈夫死亡。"
  }
];

const floridaChunks: readonly RagChunk[] = [
  {
    id: "F01",
    title: "三叉戟潜艇的文化背景",
    page: "p.01",
    tokens: "约 220 tokens",
    keywords: ["三叉戟潜艇", "精英文化", "安静", "安全约束", "自豪感"],
    text:
      "三叉戟核潜艇气氛安静、纪律严格，船员被视为美国海军精英。潜艇速度快、辐射噪声低，并配备远程导弹和核弹头。严格安全约束提高了船员的精英意识和自豪感，船上文化低调文雅，船员习惯轻声讲话并在狭小空间中和睦相处。"
  },
  {
    id: "F02",
    title: "阿方索的背景与强硬开场",
    page: "p.01",
    tokens: "约 214 tokens",
    keywords: ["迈克尔·阿方索", "新指挥官", "严格管理", "脾气粗暴", "职业海军"],
    text:
      "迈克尔·阿方索成为 USS 佛罗里达号指挥官时，船员最初欢迎他的到来。他年轻时参军并一路晋升，过去给人的印象是独来独往，有时脾气粗暴，但总体还算和蔼可亲。上任后他很快告诫船员自己会严格管理，并在试水后开始公开训斥表现欠佳的人。"
  },
  {
    id: "F03",
    title: "公开羞辱麦克阿瑟",
    page: "p.01",
    tokens: "约 218 tokens",
    keywords: ["麦克阿瑟", "公开训斥", "你不合格", "潜望镜深度", "公开表扬私下批评"],
    text:
      "航行分队队长唐纳德·麦克阿瑟在训练中因海底凹凸不平，难以把潜艇控制在潜望镜深度。阿方索当众宣布“你不合格”，取消他的潜水任务，并要求他通过额外练习再次达标后才可归队。这让习惯“公开表扬，私下批评”的船员大吃一惊。"
  },
  {
    id: "F04",
    title: "琐事引发的大发雷霆",
    page: "p.01",
    tokens: "约 204 tokens",
    keywords: ["可乐", "Mr. Pibb", "刀叉", "大发雷霆", "恐惧"],
    text:
      "阿方索并不总是因为工作表现而大发雷霆。有一次他想要可乐，饮水机出来的却是 Mr. Pibb，于是对军需官、主任参谋和舰务长大喊大叫。另一次他夜宵时发现刀叉不见了，又暴跳如雷。船员开始用小报传播这些让指挥官发火的琐事。"
  },
  {
    id: "F05",
    title: "船员疏远与信息不上报",
    page: "p.01-p.02",
    tokens: "约 236 tokens",
    keywords: ["船员疏远", "关系紧张", "不上报", "恐惧", "战术准备评估"],
    text:
      "船员很快受到阿方索行为影响。士官亚伦·卡摩迪说，即使出了差错，也没有人会向舰长汇报；船员不应该害怕自己的舰长，应该对他直言不讳，但没有人愿意这么做。潜艇抵达夏威夷进行战术准备评估时，船员之间已完全疏远，检查员也报告舰长和船员关系非常紧张。"
  },
  {
    id: "F06",
    title: "沙利文革职与阿方索的辩解",
    page: "p.02",
    tokens: "约 224 tokens",
    keywords: ["沙利文上将", "革职", "恐惧和恐吓", "最佳成绩", "领导关系"],
    text:
      "回港后，考虑到船员沮丧失望的报告，沙利文上将展开非正式调查，并决定解除阿方索的指挥官职务。此前还没有三叉戟潜艇指挥官被免职的先例。沙利文说，阿方索浪费了体验指挥官魅力的机会，恐惧和恐吓一定会带来毁灭。阿方索则指出，佛罗里达号在他的指挥下获得了全面检修后评估检验中的最佳成绩。"
  }
];

const documents: readonly RagDocument[] = [
  {
    id: "bracelet",
    title: "手镯的麻烦",
    category: "Leadership / Cross-cultural Management",
    fileName: "bracelet-trouble.pdf",
    pdfHref: "/demo-pdfs/bracelet-trouble.pdf",
    summary: "一个关于食品加工厂安全规定、印度女性婚姻习俗和多元文化领导的案例。",
    previewTitle: "安全禁令遇到文化习俗",
    previewExcerpt:
      "一场机器安全事故后，公司要求员工摘掉手镯。但对部分印度女性而言，手镯不仅是首饰，也是婚姻、尊重、宗教义务和社会身份的象征。",
    questions: [
      "为什么印度女孩如此介意摘掉自己的手镯？",
      "如果你是这家公司的高级主管，你会怎么解决这个问题?"
    ],
    chunks: braceletChunks
  },
  {
    id: "uss-florida",
    title: "美国潜艇佛罗里达号",
    category: "Leadership / Naval Command",
    fileName: "uss-florida.pdf",
    pdfHref: "/demo-pdfs/uss-florida.pdf",
    summary: "一个关于核潜艇指挥官、恐惧式管理、团队信任和领导绩效的案例。",
    previewTitle: "高绩效是否能抵消恐惧式领导？",
    previewExcerpt:
      "阿方索接任 USS 佛罗里达号指挥官后，通过公开训斥和高压管理取得了优秀评估成绩，却让船员陷入恐惧、疏远和沉默。",
    questions: [
      "阿方索因为什么原因对下属大发雷霆？",
      "你同意沙利文上将对阿方索革职的决定吗?"
    ],
    chunks: floridaChunks
  }
];

const sharedContent = {
  documents
} as const;

export const ragShowcase: Record<Locale, RagShowcaseContent> = {
  zh: {
    eyebrow: "RAG Document Intelligence Lab",
    title: "基于真实企业知识库的 RAG 流程演示",
    lead: "选择一个真实的知识库PDF，输入问题，查看系统如何完成RAG中切片、语义召回、重排的过程，并如何将上下文交给 LLM。",
    principles: ["企业知识库", "RAG", "Embedding"],
    libraryTitle: "案例 PDF 文档库",
    libraryHint: "本网站提供的素材基于两个非公开的知识文档，在这个工作流中，你可以直观看到RAG是怎么做的，并且如何处理你的真实业务数据的。",
    previewTitle: "PDF 预览",
    previewHint: "点击按钮会在页面内打开真实 PDF。也可以选择新标签页打开。",
    openPdfLabel: "查看 PDF",
    openPdfNewTabLabel: "新标签页打开",
    closeLabel: "关闭",
    selectedLabel: "当前文档",
    questionTitle: "提出问题",
    questionHint: "可以选择我预设好的问题，也可以自己输入你的问题。点击分析后，服务端会调用真实 embedding API进行分析。",
    questionPlaceholder: "输入一个关于当前 PDF 的问题...",
    analyzeLabel: "用 RAG 分析",
    analyzingLabel: "分析中...",
    resetLabel: "重置",
    suggestionsLabel: "预设问题",
    chunksTitle: "文本切片",
    chunksHint: "这个流程演示了文档被切片成token的过程。",
    retrievalTitle: "召回结果",
    retrievalHint: "这个流程演示了根据用户问题与文档切片进行匹配，并且得到召回结果。",
    rerankTitle: "重排结果",
    rerankHint: "这个流程演示了召回结果再交给 reranker，筛出更适合送给 LLM 的上下文。",
    llmInputTitle: "输入预览",
    llmInputHint: "这里会展示在RAG完后后，即将传入 LLM 的关键词和上下文。",
    keywordsLabel: "输出关键词",
    contextLabel: "送入 LLM 的上下文",
    promptLabel: "Prompt payload",
    emptyRetrieval: "输入问题并点击 RAG 分析后，这里会显示真实 API 返回的召回和重排结果。",
    emptyLlmInput: "",
    apiMissing: "服务端还没有配置 JINA_API_KEY。请在本地 .env.local 或 Vercel 环境变量中添加它。",
    apiError: "RAG API 调用失败，请检查 Jina API key、网络或服务端日志。",
    scoreLabel: "召回分数",
    rerankScoreLabel: "重排分数",
    matchedKeywordsLabel: "命中关键词",
    ...sharedContent
  },
  en: {
    eyebrow: "RAG Document Intelligence Lab",
    title: "A RAG Flow Demo Based on a Real Enterprise Knowledge Base",
    lead: "Select a real knowledge-base PDF, ask a question, and see how the system completes chunking, semantic retrieval, reranking, and passes context to the LLM.",
    principles: ["Enterprise Knowledge Base", "RAG", "Embedding"],
    libraryTitle: "Case PDF Library",
    libraryHint: "The materials provided on this site are based on two private knowledge documents. In this workflow, you can see how RAG works and how it handles real business data.",
    previewTitle: "PDF Preview",
    previewHint: "Click the button to open the real PDF in this page. You can also open it in a new tab.",
    openPdfLabel: "View PDF",
    openPdfNewTabLabel: "Open in New Tab",
    closeLabel: "Close",
    selectedLabel: "Current document",
    questionTitle: "Ask a question",
    questionHint: "Choose one of my preset questions or enter your own. After analysis starts, the server calls a real embedding API.",
    questionPlaceholder: "Ask a question about the current PDF...",
    analyzeLabel: "Analyze with RAG",
    analyzingLabel: "Analyzing...",
    resetLabel: "Reset",
    suggestionsLabel: "Preset questions",
    chunksTitle: "Text Chunks",
    chunksHint: "This flow demonstrates how a document is split into token-based chunks.",
    retrievalTitle: "Retrieval Results",
    retrievalHint: "This flow demonstrates how the user question is matched with document chunks to produce retrieval results.",
    rerankTitle: "Reranking Results",
    rerankHint: "This flow demonstrates how retrieved results are passed to a reranker to select better context for the LLM.",
    llmInputTitle: "Input Preview",
    llmInputHint: "This panel shows the keywords and context that will be passed into the LLM after the RAG process.",
    keywordsLabel: "Output keywords",
    contextLabel: "Context for LLM",
    promptLabel: "Prompt payload",
    emptyRetrieval: "Enter a question and click Analyze to show real API retrieval and reranking results.",
    emptyLlmInput: "",
    apiMissing: "JINA_API_KEY is not configured on the server. Add it to local .env.local or Vercel Environment Variables.",
    apiError: "RAG API request failed. Please check the Jina API key, network, or server logs.",
    scoreLabel: "Retrieval score",
    rerankScoreLabel: "Rerank score",
    matchedKeywordsLabel: "Matched keywords",
    ...sharedContent
  }
} as const;
