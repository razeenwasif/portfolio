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
    title: "Onyx · Markdown Notes TUI",
    year: "2026",
    summary:
      "Obsidian-inspired terminal vault for markdown notes — Ratatui-based live preview, [[wikilinks]] with backlinks and outline panels, command palette and quick switcher, full-vault content search, ASCII graph view, daily-notes calendar, and vim-style modal editing in the editor pane.",
    stack: ["Rust", "Ratatui", "Crossterm", "Markdown"],
    insights: ["Wikilinks + backlinks", "ASCII graph view", "Vim modal editor"],
    links: [
      { label: "Source", href: "https://github.com/razeenwasif/onyx" },
    ],
  },
  {
    index: "05",
    title: "AudioPulse · Spotify-Style TUI Player",
    year: "2026",
    summary:
      "Bubble Tea TUI music player with a Spotify desktop-style layout. Plays full songs through an embedded librespot device controlled via the Spotify Web API (PKCE OAuth), with a no-login Deezer guest mode for 30-second previews and album art rendered in the terminal as 24-bit half-blocks.",
    stack: ["Go", "Bubble Tea", "librespot", "Spotify API"],
    insights: ["Full-song playback", "PKCE OAuth", "Album art in-terminal"],
    links: [
      { label: "Source", href: "https://github.com/razeenwasif/audiopulse" },
    ],
  },
  {
    index: "06",
    title: "BoxTube · Terminal YouTube Client",
    year: "2026",
    summary:
      "Textual-based TUI YouTube client — search, sign in to browse subscriptions, history, liked, watch later, and playlists, with inline thumbnails and full video playback rendered inside the terminal via mpv and the kitty graphics protocol (with sixel and unicode fallbacks). No Google API key required.",
    stack: ["Python", "Textual", "yt-dlp", "mpv"],
    insights: ["In-terminal video", "Kitty graphics protocol", "No API key"],
    links: [
      { label: "Source", href: "https://github.com/razeenwasif/boxtube-tui" },
    ],
  },
  {
    index: "07",
    title: "GPU-Accelerated Kernel Subsystem",
    year: "2025",
    summary:
      "Linux kernel subsystem offloading AES-256 and regex matching to CUDA — 15× throughput over CPU baselines via pinned memory, unified memory, and a work-stealing scheduler.",
    stack: ["C++", "CUDA", "Linux", "Kernel"],
    insights: ["15x throughput boost", "Zero-copy IO", "Custom CUDA kernels"],
    links: [{ label: "Source", href: "#" }],
  },
  {
    index: "08",
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

export type Research = {
  index: string;
  title: string;
  venue: string;
  year: string;
  status: string;
  summary: string;
  contribution?: string[];
  links: { label: string; href: string }[];
};

export const research: Research[] = [
  {
    index: "01",
    title:
      "Quantized Domain-Specialist Verifiers for Multi-Agent LLM Scientific Reasoning",
    venue: "NeurIPS ENLSP / ICLR ME-FoMo / ICML AI4Science 2026 (target)",
    year: "2026",
    status: "In progress",
    summary:
      "Hybrid architecture where frontier API models drive multi-agent debate (Council /discover) and locally-hosted, fine-tuned, aggressively-quantized open-weights models act as a domain-specialist verification layer — auditing domain-specific claims that frontier voices systematically miss. Single-GPU LoRA+DoRA+QLoRA pipeline on Mistral-7B-Instruct-v0.3 producing physics/math/CS specialists, trained partly on Council-generated synthetic debate data.",
    contribution: [
      "Specialist-as-verifier architecture",
      "PTQ vs QAT quantization curve (FP16→Q2)",
      "Council-bootstrapped training data",
    ],
    links: [
      { label: "Source", href: "https://github.com/razeenwasif/Council" },
    ],
  },
  {
    index: "02",
    title:
      "Partial Fine-Tuning of BioCLIP 2.5 with Taxonomic Auxiliary Heads for Multi-Label Plant Species Identification in Vegetation Plots: ANU at PlantCLEF 2026",
    venue: "PlantCLEF 2026 · LifeCLEF / CLEF",
    year: "2026",
    status: "Submitted",
    summary:
      "BioCLIP 2.5 ViT-H/14 partial fine-tune with auxiliary genus / family / order / class heads, 4×4 tile inference ensembled across 224 and 336-pixel resolutions, and logit-adjusted adaptive thresholding for the 7,806-class long-tail multi-label benchmark.",
    contribution: [
      "0.418 Macro F1",
      "Taxonomy-aware auxiliary heads",
      "Tile + multi-resolution ensemble",
    ],
    links: [
      { label: "Paper", href: "/plantclef-2026.pdf" },
      { label: "Source", href: "https://github.com/ManindraDeMel/PlantCLEF2026" },
    ],
  },
  {
    index: "03",
    title:
      "Signal-Preserving Quantization for Gravitational-Wave Triggers",
    venue: "ANU Honours · TinyML / Astrophysics",
    year: "2026",
    status: "In progress",
    summary:
      "Quantifies how INT8 quantization interferes with the phase coherence of LIGO chirp signals, and tests a signal-fidelity-first optimization framework (QAT + custom C++ kernels) for ARM Cortex-M edge deployment under a <128 KB SRAM budget.",
    contribution: [
      "<5% SNR-loss target",
      "FAR 10⁻⁴ Hz edge filter",
      "8× memory reduction",
    ],
    links: [
      { label: "Paper", href: "/tinyml-gw.pdf" },
      { label: "Lit Review", href: "/tinyml-gw-litreview.pdf" },
      {
        label: "Source",
        href: "https://github.com/razeenwasif/TinyML-Quantization_Induced_GW_SNR_Degradation",
      },
    ],
  },
];

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
