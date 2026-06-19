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

export type ProjectSection = {
  eyebrow: string;
  title: string;
  body: string[];
  bullets?: string[];
};

export type ProjectStat = {
  label: string;
  value: string;
  sub?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel dimensions — lets the browser reserve layout space
      before the image loads (no CLS). */
  width: number;
  height: number;
};

export type ProjectDetail = {
  tagline: string;
  hero?: ProjectImage;
  overview: string[];
  stats?: ProjectStat[];
  sections: ProjectSection[];
  gallery?: ProjectImage[];
};

export type Project = {
  index: string;
  slug?: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  insights?: string[];
  links: { label: string; href: string }[];
  detail?: ProjectDetail;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "prism",
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
    slug: "oracle",
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
    slug: "nexus",
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
    slug: "flux",
    title: "Flux · AI-Native Desktop Browser",
    year: "2026",
    summary:
      "An AI-native desktop browser built in Rust + Tauri v2 — native multi-tab browsing, a real-PTY terminal docked as a sidebar column, and a fully local LLM agent (Gemma 12B via Ollama / llama.cpp) that reads the page DOM and performs approved, injection-guarded actions. Zero-copy DOM IPC pipeline, webview hibernation, Brave-engine adblock, and an AES-256-GCM password vault — all on-device, no cloud.",
    stack: ["Rust", "Tauri", "SolidJS", "TypeScript", "Ollama"],
    insights: ["Local Gemma agent", "Zero-copy DOM IPC", "8–15 MB binary"],
    links: [{ label: "Source", href: "https://github.com/razeenwasif/flux" }],
  },
  {
    index: "05",
    slug: "omni",
    title: "Omni · From-Scratch Search Engine",
    year: "2026",
    summary:
      "A personal search engine hand-rolled in Rust (std-only core) with a Go crawler and a Python eval harness. BM25F lexical retrieval fused with 768-dim semantic embeddings via Reciprocal Rank Fusion, an HNSW ANN index, passage-level retrieval, live incremental indexing with background segment merges, and optional local-LLM RAG answers. Indexes a ~12k-doc academic corpus and powers the Flux browser's omnibox.",
    stack: ["Rust", "Go", "Python", "Ollama"],
    insights: ["BM25 + semantic hybrid", "Hand-rolled HNSW", "0.97 success@10"],
    links: [{ label: "Source", href: "https://github.com/razeenwasif/omni" }],
  },
  {
    index: "06",
    slug: "onyx",
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
    index: "07",
    slug: "audiopulse",
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
    index: "08",
    slug: "boxtube",
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
    index: "09",
    slug: "kata",
    title: "Kata · Terminal LeetCode Clone",
    year: "2026",
    summary:
      "A local, keyboard-first LeetCode clone that lives entirely in the terminal (Rust + Ratatui). 304 problems across 32 categories, solutions compiled and executed in network-isolated Docker sandboxes across 8 languages, automatic language-agnostic grading, streak + progress tracking, a streaming Ollama chat assistant, and Markdown export straight into an Onyx / Obsidian vault.",
    stack: ["Rust", "Ratatui", "Docker", "Ollama"],
    insights: ["304 problems · 8 languages", "Docker-sandboxed runs", "Onyx vault export"],
    links: [
      { label: "Source", href: "https://github.com/razeenwasif/Kata" },
      { label: "crates.io", href: "https://crates.io/crates/katacode" },
    ],
  },
  {
    index: "10",
    slug: "mamba",
    title: "Mamba · Verified Math Practice Engine",
    year: "2026",
    summary:
      "A terminal mathematics-practice engine (Rust + Ratatui) that mathematically verifies answers instead of string-matching them. A universal router dispatches each answer to one of three pipelines — symbolic (algebraic equivalence by numeric probing), tensor (exact rational matrices), and exact (arbitrary-precision number theory with Miller–Rabin). 262 problems across 18 topics, FSRS spaced repetition, near-miss diagnostics, dimensional analysis, a local AI tutor, and an MCP server that exposes the verifier to other agents.",
    stack: ["Rust", "Ratatui", "Ollama", "MCP"],
    insights: ["Math verification, not string match", "FSRS spaced repetition", "MCP verifier server"],
    links: [{ label: "Source", href: "https://github.com/razeenwasif/mamba" }],
  },
  {
    index: "11",
    slug: "canopy",
    title: "Canopy · Terminal LaTeX Editor",
    year: "2026",
    summary:
      "A single-binary terminal LaTeX editor (Rust + Tokio + Ratatui). Vim-style modal editing on a rope buffer, compilation inside an ephemeral network-isolated Docker container (read-only rootfs, dropped capabilities, memory + wall-clock caps), and inline PDF preview rendered in the terminal via Kitty / iTerm2 / Sixel. An Overleaf-style three-pane workspace with a local Ollama assistant — no server, no cloud.",
    stack: ["Rust", "Tokio", "Ratatui", "Docker"],
    insights: ["Sandboxed LaTeX compile", "Inline terminal PDF preview", "Vim modal editor"],
    links: [{ label: "Source", href: "https://github.com/razeenwasif/Canopy" }],
  },
  {
    index: "12",
    slug: "gpu-kernel",
    title: "GPU-Accelerated Kernel Subsystem",
    year: "2025",
    summary:
      "Linux kernel subsystem offloading AES-256 and regex matching to CUDA — 15× throughput over CPU baselines via pinned memory, unified memory, and a work-stealing scheduler.",
    stack: ["C++", "CUDA", "Linux", "Kernel"],
    insights: ["15x throughput boost", "Zero-copy IO", "Custom CUDA kernels"],
    links: [{ label: "Source", href: "#" }],
  },
  {
    index: "13",
    slug: "risc-cpu",
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

export const stack: Record<string, string[]> = {
  Languages: [
    "Python",
    "C++",
    "CUDA",
    "Rust",
    "Go",
    "TypeScript",
    "Java",
    "R",
    "Dart",
    "ARM ASM",
    "SQL",
  ],
  "ML / AI": [
    "PyTorch",
    "TensorFlow",
    "Optuna",
    "RAPIDS",
    "BioCLIP",
    "DINOv3",
    "Unsloth",
    "LoRA / DoRA",
  ],
  Systems: [
    "Linux Kernel",
    "TensorRT",
    "NVIDIA DALI",
    "FastAPI",
    "Docker",
    "Firestore",
    "Bun",
    "Node.js",
  ],
  "Platforms / Frameworks": [
    "React",
    "Vite",
    "Flutter",
    "Tailwind",
    "Bubble Tea",
    "Ratatui",
    "Textual",
    "Power Platform",
    "Power BI",
    "Dataverse",
    "Firebase",
    "Figma",
  ],
};

export type Research = {
  index: string;
  slug?: string;
  title: string;
  venue: string;
  year: string;
  status: string;
  summary: string;
  contribution?: string[];
  links: { label: string; href: string }[];
  detail?: ProjectDetail;
};

export const research: Research[] = [
  {
    index: "01",
    slug: "council-specialists",
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
    slug: "plantclef-2026",
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
    slug: "tinyml-gw",
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
    year: "Jun 2026 — Now",
    role: "Council Specialists fine-tuning pipeline",
    org: "Honours-track research",
    detail:
      "Single-GPU LoRA + DoRA + QLoRA pipeline on Mistral-7B-Instruct-v0.3 producing physics, math, and CS domain-specialist verifiers for the Council multi-agent system. PTQ vs QAT quantization curve as the headline ablation.",
  },
  {
    year: "Jun 2026",
    role: "Flux · Omni",
    org: "AI browser + search engine",
    detail:
      "An AI-native desktop browser (Rust / Tauri v2) with a DOM-aware PTY terminal and a local Gemma 12B agent, paired with Omni — a from-scratch hybrid search engine (std-only Rust core, Go crawler) doing BM25F + semantic retrieval over a 12k-doc corpus that powers Flux's omnibox.",
  },
  {
    year: "Jun 2026",
    role: "Kata · Mamba · Canopy",
    org: "Three Rust TUIs",
    detail:
      "A Docker-sandboxed terminal LeetCode clone (304 problems, 8 languages), a math-practice engine that mathematically verifies answers across symbolic / tensor / exact pipelines with FSRS scheduling and an MCP verifier, and a terminal LaTeX editor compiling inside locked-down containers with inline PDF preview.",
  },
  {
    year: "Jun 2026",
    role: "Onyx · AudioPulse · BoxTube",
    org: "Three terminal apps",
    detail:
      "Three TUIs in a four-day sprint — an Obsidian-style markdown vault (Rust / Ratatui), a Spotify-style music player with librespot playback (Go / Bubble Tea), and a YouTube client with in-terminal video via mpv + kitty graphics (Python / Textual).",
  },
  {
    year: "May 2026 — Now",
    role: "Council",
    org: "Multi-model coding agent",
    detail:
      "Seven-role AI council layered on a coding CLI — Architect, Implementer, Skeptic, Critic, Tester, Security, Performance — with a single-executor diff pipeline and vote-gated revision. Substrate for the specialist-verifier research above.",
  },
  {
    year: "Apr 2026 — Now",
    role: "TinyML for Gravitational-Wave Triggers",
    org: "Honours thesis",
    detail:
      "Quantifying how INT8 quantization disturbs phase coherence in LIGO chirp signals, with a signal-fidelity-first optimization framework (QAT + custom C++ kernels) for ARM Cortex-M deployment under a <128 KB SRAM budget.",
  },
  {
    year: "Feb 2026 — Now",
    role: "Full-Stack Developer & UX Lead",
    org: "ANU Virtuous Loop",
    detail:
      "Architecting a scalable feedback dashboard on Microsoft Power Platform with automated Power Automate pipelines, RLS-secured data, and a UX overhaul that lifted navigation efficiency 40%.",
  },
  {
    year: "Mar 2026 — May 2026",
    role: "Oracle & PlantCLEF 2026 submission",
    org: "ANU @ PlantCLEF",
    detail:
      "BioCLIP 2.5 ViT-H/14 partial fine-tune with taxonomy heads + 4×4 tile inference ensembled across 224 / 336 px. 0.418 Macro F1 on the 7,806-class long-tail benchmark. Paper submitted to LifeCLEF / CLEF 2026; productized as the Oracle live engine.",
  },
  {
    year: "May 2026",
    role: "Nexus",
    org: "Distributed training console",
    detail:
      "Standalone control plane for distributed ML training — Firestore-backed pod inventory, NCCL liveness probes, per-rank telemetry rolled up live in a monochrome glass shell.",
  },
  {
    year: "Oct 2025 — May 2026",
    role: "Prism",
    org: "AutoML workbench",
    detail:
      "GPU-first AutoML pipeline for tabular data — automated EDA, Optuna hyperparameter search, RAPIDS-accelerated entity resolution, and an Ollama-hosted LLM for natural-language data exploration. React + FastAPI + Docker Compose stack.",
  },
  {
    year: "2025",
    role: "GPU-Accelerated Kernel Subsystem",
    org: "Coursework",
    detail:
      "Linux kernel character device offloading AES-256 and regex matching to CUDA — pinned memory, unified memory, work-stealing scheduler. 15× throughput over the CPU baseline on the benchmark.",
  },
  {
    year: "2024 — 2025",
    role: "Open Source Contributor",
    org: "Pygame",
    detail:
      "Identified and resolved a segmentation fault in the PixelArray module — debugged memory management in the C-based backend to prevent invalid access during slicing.",
  },
  {
    year: "2024",
    role: "16-Bit RISC CPU",
    org: "Coursework",
    detail:
      "Designed and simulated a 16-bit RISC processor from basic logic gates — custom ISA, multi-stage datapath, microprogrammed control unit. Validated end-to-end on assembly programs.",
  },
  {
    year: "2023 — Now",
    role: "Bachelor of Advanced Computing (Honours)",
    org: "Australian National University",
    detail:
      "Coursework in Machine Learning, AI, Computer Vision, Computer Architecture, Algorithms, and Data Analysis. Background in physics underpins a quantitative approach.",
  },
];
