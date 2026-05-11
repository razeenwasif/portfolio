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
    "I build GPU-accelerated ML systems and full-stack products — from custom CUDA kernels to neuro-symbolic neural architectures.",
};

export type Project = {
  index: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Prism",
    year: "2025",
    summary:
      "GPU-first AutoML pipeline for tabular data with Optuna-tuned models, RAPIDS-accelerated entity resolution, and an Ollama-powered LLM for natural-language exploration.",
    stack: ["Python", "CUDA", "FastAPI", "React", "Docker"],
    links: [{ label: "Source", href: "https://github.com/razeenwasif/Prism" }],
  },
  {
    index: "02",
    title: "Neuro-Symbolic Identification System",
    year: "2026",
    summary:
      "PlantCLEF research system fusing a triple-ensemble vision backbone (BioCLIP 2.0, DINOv3, ConvNeXt) with an ecological GCN — solved as a CSP across 1.4M species combinations.",
    stack: ["PyTorch", "Rust", "CUDA", "FP8", "GCN"],
    links: [
      {
        label: "Kaggle",
        href: "https://www.kaggle.com/competitions/plantclef2026",
      },
    ],
  },
  {
    index: "03",
    title: "GPU-Accelerated Kernel Subsystem",
    year: "2025",
    summary:
      "Linux kernel subsystem offloading AES-256 and regex matching to CUDA — 15× throughput over CPU baselines via pinned memory, unified memory, and a work-stealing scheduler.",
    stack: ["C++", "CUDA", "Linux", "Kernel"],
    links: [{ label: "Source", href: "#" }],
  },
  {
    index: "04",
    title: "Signal-Preserving TinyML for GW Triggers",
    year: "2025",
    summary:
      "Quantization-aware training and custom C++ kernels to run gravitational-wave detection on ARM Cortex-M under a 128 KB SRAM budget without losing SNR.",
    stack: ["C++", "TensorFlow", "QAT", "ARM"],
    links: [
      {
        label: "Source",
        href: "https://github.com/razeenwasif/TinyML-Quantization_Induced_GW_SNR_Degradation",
      },
    ],
  },
  {
    index: "05",
    title: "16-Bit RISC CPU",
    year: "2024",
    summary:
      "Designed and simulated a 16-bit RISC processor from logic gates — custom ISA, multi-stage datapath, microprogrammed control unit, validated end-to-end on assembly programs.",
    stack: ["Digital Logic", "ISA", "ALU"],
    links: [
      {
        label: "Source",
        href: "https://github.com/razeenwasif/Comp-Architecture/tree/main/16-bit-cpu",
      },
    ],
  },
  {
    index: "06",
    title: "Social Media Backend",
    year: "2024",
    summary:
      "Java backend for an Android social app — custom AVL tree for O(log n) reactions at 1M ops/sec, leet-speak censorship facade, and a tight persistence layer at <40 bytes/record.",
    stack: ["Java", "DSA", "JUnit", "DAO"],
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
