export const site = {
  name: "Razeen Wasif",
  role: "Software Engineer & ML Researcher",
  location: "Canberra, AU",
  email: "razeen.wasif66@gmail.com",
  phone: "+61 450 004 709",
  socials: {
    github: "https://github.com/razeenwasif",
    linkedin: "https://linkedin.com/in/razeenwasif",
    kaggle: "https://www.kaggle.com/competitions/plantclef2026",
  },
  tagline:
    "I build full-stack products and ML systems — from training infrastructure to user-facing dashboards.",
};

export type Project = {
  index: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  insights?: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Prism · AutoML Workbench",
    year: "2025",
    summary:
      "GPU-first AutoML pipeline for tabular data with Optuna-tuned models, RAPIDS-accelerated entity resolution, and an Ollama-powered LLM for natural-language exploration.",
    stack: ["Python", "CUDA", "FastAPI", "React", "Docker"],
    insights: ["10x faster inference", "99.2% matching precision", "Ollama LLM"],
    links: [
      { label: "Live", href: "https://prism-automl.web.app" },
      { label: "Source", href: "https://github.com/razeenwasif/Prism" },
    ],
  },
  {
    index: "02",
    title: "Oracle · Identification Platform",
    year: "2026",
    summary:
      "Multi-domain identification engine — BioCLIP 2.5 ViT-H/14 partial fine-tune with auxiliary genus / family / order / class heads, 4×4 tile inference ensembled across 224 and 336-pixel resolutions, logit-adjusted with adaptive thresholding. Validated on the PlantCLEF 2026 long-tail multi-label benchmark.",
    stack: ["PyTorch", "BioCLIP", "React", "TypeScript", "Firebase"],
    insights: ["0.418 Macro F1", "7,806-class long-tail", "Tile + multi-res ensemble"],
    links: [
      { label: "Live", href: "https://oracle-neuro-sym.web.app" },
      { label: "Paper", href: "https://oracle-neuro-sym.web.app/oracle_plantclef2026.pdf" },
    ],
  },
  {
    index: "03",
    title: "Nexus · Distributed Training Console",
    year: "2026",
    summary:
      "Standalone control plane and real-time monitoring console for distributed ML training. Firestore-backed pod inventory, run lifecycle, NCCL liveness probes, and per-rank telemetry rolled up live in a monochrome glass shell. Self-contained product with its own backend and brand.",
    stack: ["Python", "Firestore", "React", "TypeScript", "Firebase"],
    insights: ["Real-time pod telemetry", "Multi-rank orchestration", "Live event console"],
    links: [
      { label: "Live", href: "https://nexus-cluster.web.app" },
    ],
  },
  {
    index: "04",
    title: "GPU-Accelerated Kernel Subsystem",
    year: "2025",
    summary:
      "Linux kernel subsystem offloading AES-256 and regex matching to CUDA — 15× throughput over CPU baselines via pinned memory, unified memory, and a work-stealing scheduler.",
    stack: ["C++", "CUDA", "Linux", "Kernel"],
    insights: ["15x throughput boost", "Zero-copy IO", "Custom CUDA kernels"],
    links: [{ label: "Source", href: "#" }],
  },
  {
    index: "05",
    title: "Signal-Preserving TinyML for GW Triggers",
    year: "2025",
    summary:
      "Quantization-aware training and custom C++ kernels to run gravitational-wave detection on ARM Cortex-M under a 128 KB SRAM budget without losing SNR.",
    stack: ["C++", "TensorFlow", "QAT", "ARM"],
    insights: ["128KB SRAM budget", "QAT optimization", "Real-time GW detection"],
    links: [
      {
        label: "Source",
        href: "https://github.com/razeenwasif/TinyML-Quantization_Induced_GW_SNR_Degradation",
      },
    ],
  },
  {
    index: "06",
    title: "16-Bit RISC CPU",
    year: "2024",
    summary:
      "Designed and simulated a 16-bit RISC processor from logic gates — custom ISA, multi-stage datapath, microprogrammed control unit, validated end-to-end on assembly programs.",
    stack: ["Digital Logic", "ISA", "ALU"],
    insights: ["Custom ISA design", "Multi-stage datapath", "Assembly validated"],
    links: [
      {
        label: "Source",
        href: "https://github.com/razeenwasif/Comp-Architecture/tree/main/16-bit-cpu",
      },
    ],
  },
  {
    index: "07",
    title: "Social Media Backend",
    year: "2024",
    summary:
      "Java backend for an Android social app — custom AVL tree for O(log n) reactions at 1M ops/sec, leet-speak censorship facade, and a tight persistence layer at <40 bytes/record.",
    stack: ["Java", "DSA", "JUnit", "DAO"],
    insights: ["1M ops/sec scale", "Custom AVL trees", "<40B record density"],
    links: [
      {
        label: "Source",
        href: "https://github.com/razeenwasif/Software-Development/tree/main/social-media",
      },
    ],
  },
];

export const stack = {
  Languages: ["Python", "C++", "CUDA", "Java", "TypeScript", "ARM ASM", "SQL"],
  "ML / AI": ["PyTorch", "TensorFlow", "Optuna", "RAPIDS", "BioCLIP", "DINOv3"],
  Systems: ["Linux Kernel", "TensorRT", "NVIDIA DALI", "FastAPI", "Docker"],
  Platforms: [
    "Power Platform",
    "Power BI",
    "Dataverse",
    "Firebase",
    "Figma",
    "React",
  ],
};

export type TimelineEntry = {
  year: string;
  role: string;
  org: string;
  detail: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "Feb 2026 — Now",
    role: "Full-Stack Developer & UX Lead",
    org: "ANU Virtuous Loop",
    detail:
      "Architecting a scalable feedback dashboard on Microsoft Power Platform with automated Power Automate pipelines, RLS-secured data, and a UX overhaul that lifted navigation efficiency 40%.",
  },
  {
    year: "2023 — Now",
    role: "Bachelor of Advanced Computing (Honours)",
    org: "Australian National University",
    detail:
      "Coursework in Machine Learning, AI, Computer Vision, Computer Architecture, Algorithms, and Data Analysis. Background in physics underpins a quantitative approach.",
  },
  {
    year: "2024 — 2025",
    role: "Open Source Contributor",
    org: "Pygame",
    detail:
      "Identified and resolved a segmentation fault in the PixelArray module — debugged memory management in the C-based backend to prevent invalid access during slicing.",
  },
];
