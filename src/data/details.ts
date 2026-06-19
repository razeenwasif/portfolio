import type { ProjectDetail } from "./site";

export const projectDetails: Record<string, ProjectDetail> = {
  "prism": {
      tagline:
        "A GPU-first AutoML workbench for tabular data — automated EDA, hyperparameter search, and entity resolution behind a natural-language front end.",
      overview: [
        "Prism is an end-to-end AutoML pipeline for heterogeneous tabular data, built around the assumption that a strong GPU is available end-to-end — data prep, model training, and entity resolution all sit on top of CUDA-accelerated primitives where possible. The front end is a React + Vite Command Center on a FastAPI backend, with an Ollama-hosted LLM behind a natural-language query box for non-technical operators.",
        "Two problems motivate it. First, conventional AutoML stacks bottleneck on CPU-side preprocessing and pandas-style joins long before the GPU sees a tensor. Second, real-world tabular pipelines almost always need entity resolution — merging records across systems — and that step usually gets bolted on with a separate tool. Prism collapses both into one orchestrated stack.",
      ],
      stats: [
        { label: "ROC AUC", value: "0.97", sub: "Demo classification run" },
        { label: "Accuracy", value: "0.933", sub: "Held-out test set" },
        { label: "Speedup", value: "10×", sub: "Inference vs CPU baseline" },
        { label: "Match precision", value: "99.2%", sub: "RAPIDS record linkage" },
      ],
      sections: [
        {
          eyebrow: "AutoML pipeline",
          title: "Automated EDA + target-aware cleaning + Optuna search",
          body: [
            "Prism takes a CSV and a target column, runs automated EDA (distributions, missingness, leakage checks), applies target-aware cleaning rules per column type, and dispatches an Optuna hyperparameter search across a candidate model pool — XGBoost, PyTorch MLPs, and gradient-boosted classical baselines.",
            "Model wrappers transparently fall back across CUDA / MPS / CPU depending on what's available, so the same pipeline runs identically on a 4090 workstation, an Apple-Silicon laptop, or a CPU-only CI box. The Command Center surfaces a live model leaderboard with ROC AUC, accuracy, and F1 macro per trial.",
          ],
          bullets: [
            "Optuna-driven hyperparameter optimisation across multiple model families",
            "CUDA-backed XGBoost + PyTorch wrappers with automatic CUDA / MPS / CPU fallback",
            "Live leaderboard, distribution plots, and feature-importance breakdowns",
            "Deterministic mode with a fixed seed for reproducible reruns",
          ],
        },
        {
          eyebrow: "Entity resolution",
          title: "RAPIDS-accelerated record linkage with semantic embeddings",
          body: [
            "The record-linkage workflow uses RAPIDS for the heavy joins and pairwise similarity, with semantic embeddings as the candidate-pair generator instead of plain blocking keys. This keeps recall high on noisy real-world data — typos, abbreviations, transliterations — without paying the quadratic cost of an unblocked comparison.",
            "Linked records are surfaced through the same Command Center, with a confirm/reject interface that feeds labelled pairs back into the threshold tuning loop.",
          ],
          bullets: [
            "RAPIDS-accelerated pairwise similarity + dedupe",
            "Semantic embeddings for candidate-pair recall",
            "Asynchronous execution so the linkage step doesn't block the AutoML pipeline",
            "99.2% match precision on the bundled benchmark dataset",
          ],
        },
        {
          eyebrow: "Systems",
          title: "Microservices stack with an Ollama LLM in the loop",
          body: [
            "The runtime is a Docker Compose stack: a FastAPI backend for the AutoML pipeline, a separate FastAPI service for record linkage, a React + Vite front end, and an Ollama server hosting a local LLM. The LLM answers freeform questions about the loaded dataset (\"how skewed is petal width?\", \"is there any leakage between sepal_length and species?\") by routing through the same parsed dataset metadata the dashboards use.",
            "Everything is local — no remote API calls for inference — so the workbench can run air-gapped on internal data.",
          ],
          bullets: [
            "Docker Compose orchestration of all services",
            "Ollama-hosted LLM for natural-language dataset exploration",
            "Local-only inference path — no third-party API egress",
            "React + Vite front end with a dark Command Center theme",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/prism/main.webp",
          width: 2044,
          height: 1079,
          alt: "Prism Command Center — AutoML pipeline with live metrics tiles, dataset preview, and natural-language query box",
          caption:
            "Command Center — pipeline configuration on the left (NL query box, dataset upload, target column), live metrics across the top (log loss, ROC AUC, AUC PR, accuracy), full dataset preview with per-column distributions and breakdown plots below.",
        },
      ],
    },
  "oracle": {
      tagline:
        "A long-tail multi-label identification engine, productized for the field.",
      overview: [
        "Oracle is the productized form of the PlantCLEF 2026 research pipeline — a partial fine-tune of BioCLIP 2.5 wrapped in a React + TypeScript front end on Firebase, with image upload, top-k predictions, and taxonomy context surfaced to a non-expert audience.",
        "The motivating problem is long-tail multi-label identification across 7,806 plant species, where most species have a handful of training images and many vegetation plots contain several species per quadrat. Off-the-shelf classification heads collapse under that distribution; Oracle was built to recover graceful behavior across the tail.",
      ],
      stats: [
        { label: "Macro F1", value: "0.418", sub: "PlantCLEF 2026 held-out" },
        { label: "Classes", value: "7,806", sub: "Long-tail, multi-label" },
        { label: "Backbone", value: "ViT-H/14", sub: "BioCLIP 2.5, partial FT" },
        { label: "Inference", value: "4×4 + dual res", sub: "Tile ensemble" },
      ],
      sections: [
        {
          eyebrow: "Research",
          title: "Why partial fine-tuning, and what the taxonomy heads do",
          body: [
            "BioCLIP 2.5 is a strong biology-domain backbone, but unmodified it underweights the rare-class regime of PlantCLEF. We partial-fine-tune only the upper transformer blocks plus the classification heads, keeping the lower layers frozen — this preserves the pre-trained visual prior while shifting capacity toward the long-tail species head.",
            "Critically, the loss is taxonomy-aware. Auxiliary heads at the genus / family / order / class levels inject hierarchical structure into the gradient, so the model gets credit for being \"close\" even when the leaf-level species call is wrong. This stabilizes training on rare species that don't have enough images to learn directly.",
          ],
          bullets: [
            "BioCLIP 2.5 ViT-H/14 backbone, partial unfreeze on upper blocks",
            "Auxiliary heads at four taxonomic levels: genus / family / order / class",
            "Logit-adjusted loss to counter the long-tail prior",
            "Adaptive per-class thresholding tuned on the validation split",
          ],
        },
        {
          eyebrow: "Systems",
          title: "Inference pipeline — tile decomposition + multi-resolution ensemble",
          body: [
            "Vegetation-plot images are large, multi-species, and unevenly composed. A single 224 px forward pass would dilute small-but-present species into the dominant region's logits. Oracle decomposes each input into a 4×4 grid of overlapping tiles and runs the model independently per tile at two resolutions — 224 px and 336 px — then ensembles the logits before thresholding.",
            "The front end is a thin React + TypeScript surface on Firebase: image upload routes to a Cloud-hosted inference endpoint, the response is rendered as top-k species cards with taxonomy context, and the static assets are served from Firebase Hosting. The model and inference path are isolated from the UI — the UI is swappable without retraining.",
          ],
          bullets: [
            "4×4 tile decomposition with overlap to avoid boundary artefacts",
            "Multi-resolution forward passes at 224 and 336 px, logit-averaged",
            "Adaptive per-class thresholds for multi-label output",
            "React + TypeScript front end on Firebase Hosting",
          ],
        },
        {
          eyebrow: "Outcome",
          title: "Validated on PlantCLEF 2026 — 0.418 Macro F1 on the long tail",
          body: [
            "End-to-end the system reaches 0.418 Macro F1 on the PlantCLEF 2026 held-out vegetation-plot test set across 7,806 classes. The accompanying paper, submitted to LifeCLEF / CLEF 2026, documents the partial-fine-tune recipe, the taxonomy-head ablations, and the tile-ensemble inference path.",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/oracle/main.webp",
          width: 2043,
          height: 1077,
          alt: "Oracle live app — Your Library view with identified plants as cards, totals across the top",
          caption:
            "Oracle live — the user's library view after running identifications. Totals tile across the top (total, unique species, rare finds, daily streak), and a grid of identified specimens (Gentiana scabra, Olea europaea, etc.) with the predicted family, status, and confidence under each card.",
        },
        {
          src: "/projects/oracle/figures-1.webp",
          width: 1214,
          height: 1145,
          alt: "Oracle paper figures 1–3: score progression across experiments, val/Kaggle divergence, validation-accuracy-as-Kaggle-predictor",
          caption:
            "Paper figures 1–3 — score progression across 11 submissions (best Kaggle public F1 climbing to 010), the val/Kaggle distribution gap, and a per-experiment correlation between validation accuracy and the Kaggle public score.",
        },
        {
          src: "/projects/oracle/figures-2.webp",
          width: 1194,
          height: 767,
          alt: "Oracle paper figures 4–5: 015 validation climbs while Kaggle stalls + species image counts before and after the 500 cap",
          caption:
            "Paper figures 4–5 — adding capacity in the wrong distribution shape (015 validation climbs while Kaggle public F1 stalls), and the species-image-count histogram before/after the 500-image cap that collapses the right tail without rescuing the 1,644 species under 100 images.",
        },
      ],
    },
  "nexus": {
      tagline:
        "A standalone control plane for distributed ML training — pod inventory, run lifecycle, and per-rank telemetry rolled up live.",
      overview: [
        "Nexus is a self-contained operator console for a distributed ML training cluster: pod inventory, run lifecycle, NCCL liveness probes, and per-rank telemetry rolled up live in a monochrome glass shell. It is not an add-on to an existing tool — it has its own backend, brand, and deployment surface, separated cleanly from the training cluster's runtime.",
        "The motivating problem is the gap between \"the training run started\" and \"the training run is healthy.\" Standard MLOps surfaces show job state and end-of-step metrics; they don't tell an operator whether rank 3 is gradient-thrashing because of a NCCL stall, or whether the pod inventory is one node short of the requested replica count. Nexus is built to make that visible without polling.",
      ],
      stats: [
        { label: "Components", value: "12.4k", sub: "Total tracked" },
        { label: "Allocation", value: "Live", sub: "Memory + GPU rollup" },
        { label: "Probe", value: "NCCL", sub: "Per-rank liveness" },
        { label: "Mode", value: "Streaming", sub: "No polling" },
      ],
      sections: [
        {
          eyebrow: "Control plane",
          title: "Firestore-backed pod inventory + run lifecycle",
          body: [
            "Pod state and run lifecycle live in Firestore — a small but real-time consistent store that lets the front end subscribe to changes without a custom websocket layer. Each pod has a heartbeat, a current run, a NCCL liveness verdict, and a per-rank telemetry blob (throughput, gradient norms, memory footprint). The run-lifecycle model tracks queued / started / running / failed / completed with per-step timestamps.",
            "An ingestion service written in Python watches the training cluster's exporter endpoints and writes into the same Firestore schema, so the front end never talks to the cluster directly — operators get a stable, sanitized view of the cluster regardless of what's actually running on the bare metal.",
          ],
          bullets: [
            "Firestore as the single source of truth for pod + run state",
            "Real-time subscriptions on the client side — no polling",
            "NCCL liveness probe rolled up to a per-pod verdict",
            "Per-rank telemetry: throughput, gradient norms, memory footprint",
          ],
        },
        {
          eyebrow: "Event console",
          title: "Streaming events for multi-rank orchestration",
          body: [
            "The Compare Runs view streams events from every active rank in a chosen run — per-step throughput, gradient norms, rank-level failures, NCCL renegotiations — into a single console. An operator can pin two runs side by side and watch them diverge live, without exporting CSVs or waiting for end-of-epoch summaries.",
            "All metrics are tabular-num + monochrome by design. The glass shell is intentional: dense data + restrained surface, so the operator's attention stays on the numbers, not the UI.",
          ],
          bullets: [
            "Compare-runs view with live event streaming",
            "Per-step throughput + gradient-norm overlays",
            "Rank-level failure annotations inline with the timeline",
            "Monochrome glass shell — every accent reserved for status",
          ],
        },
        {
          eyebrow: "Systems",
          title: "Self-contained product on React + TypeScript + Firebase",
          body: [
            "The whole product ships independently of the training cluster: React + TypeScript + Firebase Hosting on the operator side, Python ingestion service in a separate container that the cluster pushes telemetry to. Operators get a stable URL that doesn't break when the cluster reshapes, and cluster admins don't have to expose internal endpoints to the UI.",
          ],
          bullets: [
            "React + TypeScript front end on Firebase Hosting",
            "Python ingestion service decoupled from the training cluster",
            "Firestore between them — both sides talk to it, neither talks to the other directly",
            "Independent deploy + version surface; UI can be redeployed without touching the cluster",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/nexus/main.webp",
          width: 1639,
          height: 1046,
          alt: "Nexus Silicon Distributed Fleet — pod inventory with live device cards, GPU utilisation and temperature per node",
          caption:
            "Silicon Distributed Fleet view — total-component + memory-allocation rollup on the left, recent-deploys list, then the live device grid (Razeen-Home-PC, B1 NVIDIA GeForce RTX 4090) with utilisation, temperature, and power per node. Monochrome glass shell with status as the only accent.",
        },
      ],
    },
  "flux": {
      tagline:
        "A privacy-first desktop browser with a DOM-aware terminal and a local AI agent — Rust + Tauri, no Electron, no cloud.",
      overview: [
        "Flux is a desktop browser built on Rust + Tauri v2 instead of an Electron / Chromium fork. It uses the OS's native webviews (WebView2, WKWebView, WebKitGTK) rather than shipping a 180 MB Chromium, and runs the terminal and LLM on native Rust threads with no V8 GC pauses. The chrome is SolidJS — fine-grained signals, no virtual DOM — laid out Arc-style: a collapsible left sidebar, the active tab floating in a rounded content card, a terminal as a vertical right column, and the agent docked far-right.",
        "Three capabilities set it apart from a normal browser. A real OS PTY terminal lives as a persistent sidebar column with a DOM-aware CLI (`flux url|dom|links|extract-json` reads the active page). A fully local LLM agent — Gemma-class 12B via Ollama or in-process llama.cpp — grounds itself in the page DOM, and on a `/act` prompt returns a structured action that Flux injects with a preview-and-approve workflow and a destructive-action deny-list. And the whole thing is engineered to a strict performance budget, leaning on a zero-copy DOM pipeline that shares 5 MB page snapshots as `Arc<[u8]>` across the terminal, agent, and embedder with a single memcpy at the boundary.",
      ],
      stats: [
        { label: "Binary", value: "8–15 MB", sub: "vs Electron 180–250 MB" },
        { label: "Idle RAM", value: "<80 MB", sub: "Shell + daemon" },
        { label: "Agent", value: "Gemma 12B", sub: "Local, no token cost" },
        { label: "DOM snapshot", value: "<12 ms", sub: "5 MB, zero-copy IPC" },
      ],
      sections: [
        {
          eyebrow: "Architecture",
          title: "Rust + Tauri over Electron — a zero-copy DOM pipeline",
          body: [
            "The motivating decision is to refuse the Chromium tax. Native OS webviews mean no bundled 180 MB engine and no second JS runtime for the chrome; the trade-off accepted is engine heterogeneity, handled with a DOM-baseline action compiler that only emits universally-supported APIs.",
            "DOM snapshots are captured in the Rust core (HTML + visible text, capped ~1 MiB) and shared as a single `Arc<[u8]>` allocation that the terminal, agent, and embedder all read — versus Electron's two-stage structured-clone + JSON round-trip. Background tabs idle past a timeout have their native webview destroyed (RAM freed, tile stays in the strip and reloads on activation); workspace switches destroy webviews entirely, so an inactive space is kilobytes of metadata.",
          ],
          bullets: [
            "Native OS webviews (WebView2 / WKWebView / WebKitGTK) — no shipped Chromium",
            "SolidJS chrome — fine-grained signals, no VDOM diff",
            "Zero-copy DOM snapshots shared as `Arc<[u8]>` across subsystems",
            "Webview hibernation + Belady/Markov eviction under memory pressure",
          ],
        },
        {
          eyebrow: "Local agent",
          title: "An on-device LLM that reads the page and acts under approval",
          body: [
            "The agent runs entirely locally — Gemma-class 12B through Ollama (or an in-process llama.cpp FFI backend), no cloud, no API key, no token cost. A chat-first sidebar grounds itself in the page's text; a `/act` prefix has the agent read the DOM and return a structured action, which Flux compiles into injection-safe JS and highlights for the user to Approve or Skip.",
            "Safety is built into the action path: a destructive-action guard in the injected JS denies delete / pay / order / refund operations on a deny-list, a defense against prompt injection. Semantic features (omnibox suggestions, offline-archive search) run on EmbeddingGemma vectors with an instant hashing fallback when no model is present.",
          ],
          bullets: [
            "Local Gemma 12B via Ollama or in-process llama.cpp — fully offline",
            "`/act` reads the DOM, returns a structured action, previews before injecting",
            "Destructive-action deny-list guards against prompt injection",
            "EmbeddingGemma semantic search with a no-model hashing fallback",
          ],
        },
        {
          eyebrow: "Browser + terminal",
          title: "A real PTY terminal and a full privacy stack",
          body: [
            "The terminal is a real OS PTY (portable-pty) rendered in a persistent right-side column, with a DOM-aware CLI that can read the active page and optional tmux persistence across restarts. The browser side ships the table stakes — session restore, find-in-page, split view, command palette, tab groups, Chrome import — plus a Brave-engine content blocker (full EasyList + EasyPrivacy, auto-updated) and an AES-256-GCM password vault with a Proton Pass importer and OS-keychain key storage.",
          ],
          bullets: [
            "Real PTY terminal with a DOM-aware CLI and optional tmux persistence",
            "Brave `adblock` engine — EasyList + EasyPrivacy, per-site shields",
            "AES-256-GCM vault — Proton Pass import, OS-keychain data key, Argon2id master password",
            "Arc-style vertical UI: sidebar / floating content card / terminal column / agent dock",
          ],
        },
      ],
    },
  "omni": {
      tagline:
        "Every IR primitive hand-written from scratch — inverted index, BM25F, WAND, HNSW, segment merges — fused into a hybrid lexical + semantic search engine.",
      overview: [
        "Omni is a from-scratch search engine. The core is intentionally std-only Rust — the inverted index, BM25F fielded ranking, Block-Max WAND pruning, Porter stemming, phrase queries, HNSW approximate nearest neighbour, segment persistence, and merge policy are all hand-authored rather than delegated to Lucene or Tantivy. A separate Go crawler (stdlib only) handles the BFS frontier, robots.txt, per-host rate limiting, and HTML extraction; a Python harness grades ranking quality.",
        "The engine fuses two retrieval modes. Block-Max WAND pulls a BM25F candidate pool, which is fused with dense 768-dim semantic search (nomic-embed-text via Ollama) through Reciprocal Rank Fusion. Documents are chunked into ~150-word passages, each embedded and scored independently so a long document can't drown a small relevant section. The index is a directory of immutable content-addressed segments with a log-size auto-merge policy and a background merger thread that rebalances live, swapping an `Arc` snapshot atomically with zero dropped requests. It registers as the Flux browser's default search backend over a two-endpoint HTTP API.",
      ],
      stats: [
        { label: "nDCG@10", value: "0.666", sub: "Hybrid vs 0.477 lexical-only" },
        { label: "success@10", value: "0.97", sub: "31/32 graded queries" },
        { label: "Corpus", value: "~12k docs", sub: "Academic, 65k passages" },
        { label: "Core deps", value: "std-only", sub: "No Lucene / Tantivy" },
      ],
      sections: [
        {
          eyebrow: "Retrieval",
          title: "Hybrid BM25F + semantic search with passage-level scoring",
          body: [
            "A two-phase query path retrieves a BM25F candidate pool with Block-Max WAND (≈97% posting-list pruning on selective queries), then re-ranks it with a title boost, a proximity bonus, and a PageRank-lite link-graph signal. Lexical and dense results are fused via Reciprocal Rank Fusion with a tunable semantic weight.",
            "Dense retrieval is passage-level: documents are chunked into ~150-word windows (≤6 per doc), each embedded with nomic-embed-text and scored independently, with the document taking its best passage's score. On the graded eval this beat naive whole-doc embeddings by +17.8% nDCG and fixed the 21% of docs that whole-doc mode left unembedded.",
          ],
          bullets: [
            "BM25F fielded ranking (title 3× body) + positional phrase queries",
            "Block-Max WAND dynamic pruning — ~97% of postings skipped on selective queries",
            "Reciprocal Rank Fusion of lexical + 768-dim semantic results",
            "Passage-level retrieval — best-passage scoring beats whole-doc embeddings",
          ],
        },
        {
          eyebrow: "Index",
          title: "Hand-rolled HNSW, segmented store, live background merges",
          body: [
            "The semantic index is a hand-written HNSW graph (diversity neighbour selection, deterministic seeded RNG) persisted as a tiny sidecar — 36 KB of topology rehydrated against mmap'd segment vectors. The lexical index is a directory of immutable content-addressed segments with delta + varint posting compression; a tiered log-size merge policy keeps the segment count at merge_factor · log(N).",
            "A background merger thread rebalances the index while the server serves traffic, swapping an `Arc<Index>` snapshot atomically behind an RwLock — zero dropped requests. Incremental `--update` diffs the doc store by URL + content hash and re-indexes only what changed, so adding pages never triggers a full rebuild.",
          ],
          bullets: [
            "Hand-written HNSW ANN with a signature-validated sidecar",
            "Immutable content-addressed segments, delta + varint postings",
            "Tiered log-size auto-merge with a live background merger thread",
            "Atomic `Arc` snapshot swaps — incremental updates with no downtime",
          ],
        },
        {
          eyebrow: "Serving",
          title: "Custom HTTP server, RAG answers, and Flux integration",
          body: [
            "Even the HTTP layer is hand-rolled — a custom HTTP/1.0 server with chunked fallback and Server-Sent Events streaming, no web framework. It exposes `/search` (HTML), `/ac` (autocomplete JSON), `/answer` (generative RAG), `/ingest` (live doc ingestion from Flux), and `/stats`/`/dashboard` telemetry.",
            "Generative answers ground a local gemma4:12b in the top-5 passages and stream a cited 2–5 sentence response token-by-token over SSE; an extractive direct-answer mode returns the best passage verbatim at zero latency cost. Omni registers as Flux's default search engine with live omnibox autocomplete and a `!bang` shortcut table.",
          ],
          bullets: [
            "Custom HTTP/1.0 server with chunked transfer + SSE streaming, no framework",
            "Local-LLM RAG answers with inline citations, streamed over SSE",
            "Live `/ingest` from Flux — pages stage, embed, and swap in without downtime",
            "Registers as the Flux omnibox backend with autocomplete + `!bang` routing",
          ],
        },
      ],
    },
  "onyx": {
      tagline:
        "An Obsidian-inspired markdown vault that lives entirely inside the terminal.",
      overview: [
        "Onyx is a markdown notes TUI for people who already live in a terminal multiplexer and don't want to leave it to take notes. The vault model, wikilinks, backlinks, outline panel, command palette, quick switcher, full-vault search, and graph view come from Obsidian; the input model, render pane, and modal editor come from Vim and Helix.",
        "It's written in Rust on Ratatui + Crossterm because notes-taking has to be instant — opening the vault, switching notes, running a search, jumping through a wikilink — anything above ~30ms breaks the flow. The whole runtime is a single binary with no daemon and no background indexer.",
      ],
      stats: [
        { label: "Backend", value: "Rust", sub: "Ratatui + Crossterm" },
        { label: "Editor", value: "Modal", sub: "Vim-style keys" },
        { label: "Search", value: "Full-vault", sub: "Content + filename" },
        { label: "Themes", value: "4 + user", sub: "Dark / Light / Dracula / Nord" },
      ],
      sections: [
        {
          eyebrow: "Editing",
          title: "Live preview, wikilinks, and modal editing in the editor pane",
          body: [
            "The editor pane is split into a markdown source view and a live render pane — headings, bold / italic, code blocks, lists, task lists, blockquotes, wikilinks, and tags all render as you type. The source pane uses vim-style modal editing (normal / insert / visual), so motions, text objects, and operator-pending mode all work the way muscle memory expects.",
            "Wikilinks (`[[note name]]`) are first-class. Autocomplete searches the vault as you type; Ctrl-Enter follows the link; the backlinks panel on the right shows every other note that wikilinks into the current one.",
          ],
          bullets: [
            "Live render of headings, lists, task lists, code blocks, blockquotes",
            "Vim-style modal editing — normal / insert / visual / pending",
            "Wikilink autocomplete + Ctrl-Enter to follow",
            "Backlinks, outline, and tag panels in the right sidebar",
          ],
        },
        {
          eyebrow: "Navigation",
          title: "Command palette, quick switcher, full-vault search, graph view",
          body: [
            "Ctrl-P opens a fuzzy-matched command palette; Ctrl-O opens a quick switcher over note titles; Ctrl-Shift-F runs full-vault content search and lands you on the matching line. Ctrl-G opens an ASCII graph view centered on the current note — links rendered as box-drawing edges, neighbours one hop out.",
            "Ctrl-K opens a monthly calendar with daily-notes integration — pick a date, open or create the note for that day. All of this is keyboard-only by default; the terminal mouse hooks are opt-in.",
          ],
          bullets: [
            "Ctrl-P command palette, Ctrl-O quick switcher, Ctrl-Shift-F full-vault search",
            "ASCII graph view centered on the current note",
            "Monthly calendar with daily-notes integration",
            "Keyboard-first throughout; mouse hooks opt-in",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/onyx/main.webp",
          width: 2029,
          height: 942,
          alt: "Onyx markdown vault — file tree, source pane, live render pane, backlinks + outline + graph + calendar panels",
          caption:
            "Onyx running a TinyML literature-review vault — file tree on the left, source pane in the middle, live render pane on the right. Backlinks, outline, ASCII graph view, and monthly calendar panels stacked along the far right sidebar.",
        },
      ],
    },
  "audiopulse": {
      tagline:
        "A Spotify desktop, rebuilt in the terminal — full-song playback, OAuth, and album art in 24-bit half-blocks.",
      overview: [
        "AudioPulse is a Bubble Tea TUI music player that mirrors the Spotify desktop layout (left rail: library + playlists; centre: browse / search; right rail: now-playing + queue) inside a terminal. It plays full songs through an embedded librespot device, authenticated against the Spotify Web API via PKCE OAuth — no client secret on disk.",
        "It also runs in a no-login guest mode against Deezer's public API for 30-second previews, so the player is usable on a machine that's never been signed in. Album art is rendered inline as 24-bit half-blocks (one pixel per two terminal cells) so the visual identity carries across without any image protocol.",
      ],
      stats: [
        { label: "Backend", value: "Go", sub: "Bubble Tea + librespot" },
        { label: "Auth", value: "PKCE", sub: "No client secret" },
        { label: "Guest mode", value: "Deezer", sub: "30s previews" },
        { label: "Art", value: "24-bit", sub: "Half-block rendering" },
      ],
      sections: [
        {
          eyebrow: "Playback",
          title: "Full-song streaming through an embedded librespot device",
          body: [
            "Logged-in playback uses librespot — the open-source Spotify Connect client — embedded directly in the Go process. The TUI registers itself as a Spotify Connect device, controlled by the Spotify Web API for playlist/queue management. This is what unlocks full-song playback inside the terminal; the alternative (third-party stream URLs) would only give 30-second previews.",
            "The Deezer guest mode shares the same UI layer: the playback engine swaps out for an HTTP audio player, the metadata source swaps out for Deezer's public API, but the layout, keybindings, and queue model don't change.",
          ],
          bullets: [
            "librespot device registered against Spotify Connect",
            "Spotify Web API for playlist / queue / search",
            "Deezer no-login guest mode for 30-second previews",
            "Shared UI + queue model across both backends",
          ],
        },
        {
          eyebrow: "Interface",
          title: "Spotify desktop layout, terminal-native rendering",
          body: [
            "The layout is deliberately Spotify-desktop-shaped — left rail with library + playlists, centre area with browse and search, right rail with now-playing and queue, controls along the bottom. Visual identity is carried by album art: each tile renders the actual cover at 24-bit color using terminal half-blocks (two vertical pixels per terminal cell), so a tile reads as a real album cover from a normal reading distance.",
            "PKCE OAuth means there's no client secret on disk and no user-managed credentials — the first launch opens a browser, the callback lands on a localhost listener, and the refresh-token loop runs entirely inside the process.",
          ],
          bullets: [
            "Spotify-desktop-shaped layout: left rail / centre / right rail / transport",
            "24-bit half-block album art rendering",
            "PKCE OAuth — no client secret, no user-managed credentials",
            "Keyboard-first navigation across all panels",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/audiopulse/main.webp",
          width: 2018,
          height: 941,
          alt: "AudioPulse TUI — library on the left, full track list in the centre, podcasts column, now-playing tile with album art + lyrics + waveform",
          caption:
            "AudioPulse running with a logged-in Spotify session — Your Library on the left rail, Liked Songs track list in the centre, Podcasts column on the right, and the now-playing tile (album art in 24-bit half-blocks, lyrics, and waveform) docked at the bottom-right.",
        },
      ],
    },
  "boxtube": {
      tagline:
        "A YouTube client that lives in the terminal — search, subscriptions, and full video playback, no Google API key required.",
      overview: [
        "BoxTube is a Textual-based YouTube TUI. It supports search, sign-in (cookie-based), subscriptions, history, liked / watch later / playlists, with inline thumbnails in the grid and full video playback rendered inside the terminal — no separate window. There is no Google API key requirement; everything routes through yt-dlp and mpv.",
        "The motivating idea is that YouTube's web client is dense — recommendations, shorts strips, ads, notifications — and a lot of it is friction for a logged-in viewer who already knows what they want. BoxTube is a stripped-down replacement that keeps the navigation primitives (subscriptions, playlists, history) and drops everything else.",
      ],
      stats: [
        { label: "Backend", value: "Python", sub: "Textual + yt-dlp" },
        { label: "Playback", value: "mpv", sub: "In-terminal" },
        { label: "Graphics", value: "Kitty", sub: "Sixel + unicode fallback" },
        { label: "API key", value: "None", sub: "All via yt-dlp" },
      ],
      sections: [
        {
          eyebrow: "Playback",
          title: "Full video inside the terminal via mpv + the kitty graphics protocol",
          body: [
            "Video plays directly inside the terminal — no separate window — by launching mpv with the kitty graphics protocol output driver. On terminals that support kitty graphics natively (kitty, Ghostty, WezTerm), this is true pixel-accurate playback. On terminals without that protocol it falls back to sixel, and on terminals without sixel it falls back to a unicode block renderer (lower-fidelity but still watchable).",
            "Thumbnails in the search and subscription grids use the same rendering path, so the whole UI carries real imagery rather than ASCII stand-ins.",
          ],
          bullets: [
            "mpv-driven in-terminal video — no separate window",
            "Kitty graphics protocol primary, sixel and unicode fallbacks",
            "Thumbnails in search + subscription grids render the same way",
            "Frame-accurate seeking inherited from mpv",
          ],
        },
        {
          eyebrow: "No API key",
          title: "Sign-in via cookies, data via yt-dlp",
          body: [
            "There is no YouTube Data API integration. Sign-in uses a cookie jar (browser-exported or netscape-format), and everything else — search, subscriptions, watch-later, history, playlist contents — goes through yt-dlp's existing scrapers. This sidesteps the Data API quota entirely and works for accounts that have never enrolled in any Cloud project.",
            "The Textual app stays responsive by streaming yt-dlp's JSON output incrementally rather than blocking on the full result set.",
          ],
          bullets: [
            "Cookie-based sign-in — no OAuth, no Data API quota",
            "yt-dlp powers every data fetch: search, subscriptions, playlists, history",
            "Incremental streaming of yt-dlp's JSON output for responsive scroll",
            "Subscriptions, history, liked, watch later, playlists all accessible",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/boxtube/main.webp",
          width: 2010,
          height: 944,
          alt: "BoxTube terminal client — channel videos grid with in-terminal thumbnails and a preview pane on the right",
          caption:
            "BoxTube running in a kitty terminal — top-bar tabs for All / Shorts / Music / Gaming / News, subscriptions navigation on the left, a grid of channel videos (3Blue1Brown) with real thumbnails rendered inline via the kitty graphics protocol, and a video preview pane on the right.",
        },
      ],
    },
  "kata": {
      tagline:
        "LeetCode without the browser — a terminal problem bank with Docker-sandboxed execution across eight languages.",
      overview: [
        "Kata is a browser-free LeetCode clone built as a Ratatui TUI in Rust. You browse a curated problem bank, write a solution in a keyboard-driven editor, run it instantly against test cases in an isolated Docker sandbox, and on a 100% pass the solution is exported as a Markdown note into a personal vault — all without leaving the terminal. The whole 304-problem bank is embedded into the single binary at compile time via `include_dir`.",
        "Two design choices carry it. Test cases are correct-by-construction: instead of hand-typing expected outputs, reference solutions are run through the real Docker sandbox to generate them, and every language variant is verified to pass the same tests. And execution is non-blocking — compiles and runs happen on a worker thread over an mpsc channel, so the UI stays responsive (scroll, search, chat) through even a slow Rust or Java compile.",
      ],
      stats: [
        { label: "Problems", value: "304", sub: "82 Easy / 173 Med / 48 Hard" },
        { label: "Languages", value: "8", sub: "Python … Rust … SQL … ARM ASM" },
        { label: "Categories", value: "32", sub: "Blind 75 + applied domains" },
        { label: "Sandbox", value: "Docker", sub: "--network none, read-only" },
      ],
      sections: [
        {
          eyebrow: "Execution",
          title: "Sandboxed, multi-language, non-blocking",
          body: [
            "Each test runs in a fresh transient container with `--network none`, a read-only rootfs, and per-language memory / CPU / PID caps under a host-enforced wall-clock timeout. Eight languages are expressed as a pure-data `RUNTIMES` table (image, filename, command, limits) — adding a language is one table row. Grading is language-agnostic over shared stdin/stdout, so a compile error simply surfaces as a failed case.",
            "Runs execute on a worker thread and drain into the event loop each tick, so the editor, fuzzy finder, and AI panel never freeze while a solution compiles.",
          ],
          bullets: [
            "Per-test isolated containers — no network, read-only, resource-capped",
            "8 languages (Python, C++, Rust, Go, Java, TypeScript, SQL, ARM AArch64) as a data table",
            "Correct-by-construction tests — expected outputs generated by running references",
            "Worker-thread execution — UI stays live through long compiles",
          ],
        },
        {
          eyebrow: "Workflow",
          title: "Progress tracking, fuzzy finding, and vault export",
          body: [
            "A persistent JSON log tracks solved / attempted problems and a solving streak, surfaced as a 🔥 streak widget and inline status glyphs. A Spotlight-style fuzzy finder ranks by title / category / difficulty. On a first full pass, Kata atomically writes a Markdown note (YAML frontmatter + problem + solution) into `~/OnyxVault/Kata`, integrating directly with the Onyx vault. A `Ctrl-A` panel streams a local Ollama model (default gemma4:12b) with `/hint`, `/explain`, `/complexity`, and `/review` slash commands scoped to the open problem and current code.",
          ],
          bullets: [
            "Persistent streak + solved/attempted tracking with activity strip",
            "Fuzzy problem finder (Skim algorithm) and category-grouped navigator",
            "Atomic Markdown export into the Onyx / Obsidian vault on first pass",
            "Context-aware Ollama assistant with hint / explain / complexity / review commands",
          ],
        },
      ],
    },
  "mamba": {
      tagline:
        "A math trainer that actually checks your math — symbolic, matrix, and number-theory answers verified, not string-compared.",
      overview: [
        "Mamba is the math sibling to Kata: a Ratatui TUI where you work a curated problem bank, type a mathematical answer, and have it genuinely verified rather than string-matched. The hard part it solves is that `3/5` and `6/10`, or `2sin(x)cos(x)` and `sin(2x)`, are the same answer — so verification routes through real mathematics, not text comparison.",
        "A universal routing engine dispatches each problem by domain to one of three specialized pipelines: symbolic (multivariate algebraic equivalence via numeric probing, including exp / ln / trig), tensor (exact rational matrices, so dimension and value are checked exactly), and exact (arbitrary-precision integers with deterministic Miller–Rabin primality). Correct solves are archived as Markdown notes scheduled with FSRS spaced repetition. Verification runs off-thread, so even a slow check never freezes the UI.",
      ],
      stats: [
        { label: "Problems", value: "262", sub: "18 topics, 3 domains" },
        { label: "Verifier", value: "3 pipelines", sub: "Symbolic / tensor / exact" },
        { label: "Scheduler", value: "FSRS", sub: "Tunable retention 0.70–0.97" },
        { label: "Integration", value: "MCP", sub: "Verifier exposed to agents" },
      ],
      sections: [
        {
          eyebrow: "Verification",
          title: "A universal router over three mathematical pipelines",
          body: [
            "Each problem's domain routes its answer to symbolic, tensor, or exact verification — extensible to a new domain by adding a module and one router arm. Symbolic compares expressions by numeric probing for algebraic equivalence; tensor uses exact rational cells so `3/5 = 6/10`; exact uses arbitrary-precision integers and Miller–Rabin primality. Physics and engineering problems additionally run dimensional analysis (it rejects `30 kg` for a force, accepts `30 N`).",
            "Wrong answers aren't just rejected — a near-miss analyzer recognizes off-by-sign, constant-factor, reciprocal, transpose, swapped-complex-part, and off-by-one relationships and surfaces them as learning hints.",
          ],
          bullets: [
            "Domain router → symbolic / tensor / exact pipelines (meval, ndarray, num-bigint)",
            "Algebraic equivalence by numeric probing; exact rational matrices; bignum number theory",
            "Dimensional analysis for physics / engineering answers",
            "Near-miss diagnostics — sign, factor, reciprocal, transpose, off-by-one",
          ],
        },
        {
          eyebrow: "Study system",
          title: "FSRS scheduling, AI tutor, and an MCP verifier server",
          body: [
            "Solves write Markdown notes with FSRS state into a local vault, and a rolling `_progress.md` dashboard tracks streaks, per-domain breakdowns, and topic mastery against a DAG curriculum with prerequisite lock badges. A `Ctrl-A` tutor streams a local Ollama model scoped to the open problem; `Ctrl-G` has the tutor author a new problem that Mamba's own engine independently cross-verifies before offering it.",
            "Mamba also runs as an MCP server (`mamba mcp`) over stdio, exposing its verification engine — `verify`, `solve`, `recommend_next`, `due`, `curriculum` — so other AI agents can check math against a real engine instead of trusting an LLM's arithmetic.",
          ],
          bullets: [
            "FSRS spaced-repetition scheduling with per-user optimization",
            "Curriculum DAG with prerequisite locks and topic-mastery tracking",
            "Local Ollama tutor + engine-cross-verified problem generation",
            "MCP server exposing the verifier to other agents over stdio",
          ],
        },
      ],
    },
  "canopy": {
      tagline:
        "Overleaf in the terminal — edit, compile in an isolated container, and preview the PDF inline, all in one Rust binary.",
      overview: [
        "Canopy is a terminal LaTeX editor that gives you the full Overleaf loop — edit, compile, preview — as a single self-contained Rust binary with no server, database, or network dependency. The motivating concern is safety: LaTeX is Turing-complete and can perform arbitrary file I/O via `\\write18`, so Canopy never compiles untrusted `.tex` on the host. Every build runs inside a fresh, locked-down Docker container.",
        "The editor is a vim-style modal editor over a ropey rope buffer (O(log n) edits) with full motion and command support. Compilation spawns as a background Tokio task and streams results back over a channel while editing stays synchronous and responsive — a single `tokio::select!` loop multiplexes the keystroke stream and the compile channel. The resulting PDF rasterizes and renders inline in the terminal.",
      ],
      stats: [
        { label: "Binary", value: "Single", sub: "~3.2k LOC Rust, no server" },
        { label: "Sandbox", value: "network:none", sub: "RO rootfs, caps dropped" },
        { label: "Preview", value: "Inline", sub: "Kitty / iTerm2 / Sixel" },
        { label: "Editor", value: "Vim modal", sub: "Rope buffer (ropey)" },
      ],
      sections: [
        {
          eyebrow: "Sandbox",
          title: "Every compile in an ephemeral, locked-down container",
          body: [
            "Each build runs in a fresh TeX Live container (via the bollard Docker API) with `network: none`, a read-only root filesystem with a 64 MiB tmpfs `/tmp`, all Linux capabilities dropped, a PID cap, a memory limit (default 512 MiB), and a hard wall-clock timeout enforced by killing the container. It runs as the host uid:gid so outputs aren't root-owned. The engine re-runs up to four passes until cross-references and the TOC stabilize, then cleans 30+ auxiliary extensions, keeping the PDF and sources.",
          ],
          bullets: [
            "Ephemeral TeX Live container per compile via the bollard async API",
            "network:none, read-only rootfs, dropped caps, PID + memory + time limits",
            "Multi-pass until references stabilize, then auxiliary-file cleanup",
            "Configurable engine (pdflatex / xelatex / lualatex) and image",
          ],
        },
        {
          eyebrow: "Workspace",
          title: "Modal editor, inline PDF preview, and a local assistant",
          body: [
            "The Overleaf-style three-pane workspace puts the modal editor, the PDF preview, and an AI assistant side by side, with `Ctrl-W` cycling focus. The editor is full vim — Normal / Insert / Command modes, motions, `dd`/`D`/`x`, `:w`/`:make`/`:e` — over a rope buffer, with LaTeX syntax highlighting and a gitignore-aware fuzzy file finder. The PDF preview rasterizes pages at 150 DPI with pdftoppm and renders them inline via ratatui-image, negotiating Kitty → iTerm2 → Sixel → half-block, auto-refreshing after each successful compile.",
            "A `Ctrl-A` assistant streams a local Ollama model (loopback only) with the current document as context, stoppable mid-stream — keeping the whole tool offline.",
          ],
          bullets: [
            "Vim modal editing on a ropey rope buffer with LaTeX highlighting",
            "Inline PDF preview at 150 DPI via Kitty / iTerm2 / Sixel protocols",
            "Three-pane Overleaf-style workspace with focus cycling",
            "Gitignore-aware fuzzy file finder + local Ollama assistant",
          ],
        },
      ],
    },
  "gpu-kernel": {
      tagline:
        "A Linux kernel subsystem that offloads AES-256 and regex matching to the GPU.",
      overview: [
        "A coursework-grade Linux kernel subsystem that exposes a character device for AES-256 encryption and regex matching, with both operations dispatched to the GPU via custom CUDA kernels. The point is to learn what changes in throughput when the data path goes pinned-memory → unified-memory → device-side scheduler, instead of the standard userspace-only crypto path.",
        "Pinned memory eliminates the per-buffer copy at kernel/user boundary; unified memory lets the device-side kernels touch host buffers without explicit cudaMemcpy; a work-stealing scheduler keeps the SMs fed across mixed AES + regex workloads.",
      ],
      sections: [
        {
          eyebrow: "Pipeline",
          title: "Pinned memory + unified memory + work-stealing scheduler",
          body: [
            "Userspace writes a request to the character device; the kernel module pins the page, hands the device pointer to a unified-memory region, and signals the device-side scheduler. A work-stealing queue distributes batches across SMs, and results flow back through the same buffer without an extra copy on completion.",
          ],
          bullets: [
            "Character-device interface for AES-256 + regex requests",
            "Pinned memory at the kernel/user boundary — no extra copy",
            "Unified memory on the device side — no explicit cudaMemcpy",
            "Work-stealing scheduler across SMs for mixed workloads",
            "15× end-to-end throughput vs the CPU baseline on the benchmark",
          ],
        },
      ],
    },
  "risc-cpu": {
      tagline:
        "A 16-bit RISC processor designed and simulated from basic logic gates.",
      overview: [
        "A computer-architecture coursework project: design a 16-bit RISC processor from scratch — custom ISA, ALU, register file, microprogrammed control unit, 16-bit address bus — and validate it end-to-end by running assembly programs through the simulator.",
        "The deliverable is not just \"a CPU that runs\" but a CPU whose every datapath component was independently tested. The simulator runs assembly-level programs (Fibonacci, array traversal) on top of the synthesized hardware logic, and the test harness verifies cycle-accurate behaviour against the spec.",
      ],
      sections: [
        {
          eyebrow: "Architecture",
          title: "Custom ISA + multi-stage datapath + microprogrammed control",
          body: [
            "The ISA covers arithmetic, logic, control flow, and memory ops. The datapath is multi-stage with an ALU, register file, program counter, instruction register, and a microprogrammed control unit that decodes each instruction into a sequence of control signals over multiple cycles.",
            "Memory addressing is 16-bit with a dedicated address bus. Each component (ALU, MUX, decoders, register file) has its own unit tests; the integration tests then run full assembly programs and verify the simulated state against expected end-states.",
          ],
          bullets: [
            "Custom 16-bit RISC ISA",
            "ALU, register file, PC, IR, and microprogrammed control unit",
            "16-bit address bus with dedicated PC / IR",
            "Unit tests per component + assembly-level integration tests",
          ],
        },
      ],
    },
};

export const researchDetails: Record<string, ProjectDetail> = {
  "council-specialists": {
      tagline:
        "Frontier models reason. Quantized, fine-tuned, locally-hosted specialists verify.",
      overview: [
        "Multi-agent LLM systems improve reasoning, factuality, and domain coverage over single-model baselines — but the per-query cost is dominated by N parallel frontier API calls. A single Council /discover invocation can cost USD 1–3, which excludes researchers without API budgets and penalizes the high-volume inner-loop steps (reflection, ranking) of systems like AI Co-Scientist.",
        "This work proposes a hybrid architecture: frontier API models keep their role as the primary reasoners, and a locally-hosted, fine-tuned, aggressively-quantized open-weights model is added as a domain-specialist verification layer. The specialist is not asked to generate novel content; it is asked to flag domain-specific claims that frontier voices systematically get wrong.",
        "We hypothesize that aggressive quantization of a small domain-specialist fine-tune — used for verification rather than open-ended generation — preserves enough domain knowledge to detect failure modes frontier models miss. The contribution is three-fold: a system architecture for cost-efficient hybrid frontier-local scientific debate; a quantization-degradation curve identifying the practical floor of specialist-as-verifier capability; and a comparative study of PTQ vs QAT in the specialist-verifier regime.",
      ],
      stats: [
        { label: "Base model", value: "Mistral-7B", sub: "Instruct-v0.3, Apache-2.0" },
        { label: "Method", value: "LoRA + DoRA", sub: "QLoRA 4-bit + NEFTune" },
        { label: "Domains", value: "3", sub: "Physics / math / CS" },
        { label: "Quant sweep", value: "FP16 → Q2", sub: "PTQ vs QAT" },
      ],
      sections: [
        {
          eyebrow: "Architecture",
          title: "Frontier debate + quantized local verifier",
          body: [
            "Council's /discover already runs N frontier voices in parallel, then synthesizes their proposals into a single brief. We add a Domain Specialist role: a quantized open-weights model fine-tuned on the relevant domain (physics, math, or CS), routed via Ollama, called only after the frontier voices have spoken.",
            "The specialist is constrained to verification: given a frontier claim plus context, output a structured verdict (consistent / inconsistent / uncertain) with a justification grounded in the domain corpus it was fine-tuned on. The synthesizer treats specialist disagreement as a strong block — frontier consensus is downgraded when the specialist refuses to ratify.",
          ],
          bullets: [
            "Frontier voices unchanged — Council's existing multi-agent debate stays the primary reasoner",
            "Specialist routed via Ollama as `<domain>-specialist:7b-council`",
            "Verification-only output schema — consistent / inconsistent / uncertain + justification",
            "Synthesizer treats specialist refusal as a vote-gated block",
          ],
        },
        {
          eyebrow: "Training",
          title: "Single-GPU LoRA + DoRA + QLoRA pipeline on a shared base",
          body: [
            "All three specialists share a single base model — Mistral-7B-Instruct-v0.3 — chosen for its 0-cap-hit performance across every Council role in our Phase 1 sweep. Each specialist is a ~150 MB LoRA + DoRA adapter trained on a curated domain corpus (target 100–150k examples per domain after dedup).",
            "The training stack is Unsloth-accelerated: manual CUDA kernels for Mistral attention/MLP (≈2× throughput), Flash Attention 2, 4-bit QLoRA, 8-bit paged AdamW, sequence packing to eliminate padding waste, NEFTune embedding noise, BF16 mixed precision, and gradient checkpointing. Fits cleanly into 24 GB VRAM with 5–8 GB headroom; each domain runs in 6–10 wall-clock hours on a 4090.",
            "A distinguishing dataset choice: ~30k examples per domain come from firing thesis-relevant prompts through Council /discover itself and converting the resulting briefs into SFT format. The specialist then plugs back into Council with an output shape Council was already designed to consume — self-referential bootstrap loop.",
          ],
          bullets: [
            "Mistral-7B-Instruct-v0.3 shared base (Apache-2.0)",
            "LoRA r=16 + DoRA + QLoRA 4-bit, target params ≈80M trainable",
            "Unsloth fast kernels + Flash Attention 2 + sequence packing",
            "NEFTune α=5, 8-bit paged AdamW, BF16, gradient checkpointing",
            "~30k Council-generated synthetic examples per domain",
            "6–10 hours / domain on a 4090, 100–150k examples total",
          ],
        },
        {
          eyebrow: "Ablation",
          title: "PTQ vs QAT across six bit-depths, in the verifier regime",
          body: [
            "The headline experiment is a controlled ablation across six bit-depths — FP16, Q8, Q6, Q4, Q3, Q2 — comparing post-training quantization (PTQ) against quantization-aware training (QAT) in the specialist-as-verifier regime. The eval is structured claim-evaluation against ground-truth-graded rubrics, not open-ended generation; this is where prior literature on quantization is weakest.",
            "Two outcomes are publishable. If the quality-vs-bit-depth curve has a knee at Q4 or below, the hybrid architecture becomes practical on consumer hardware. If the curve is monotonic with no knee, the result is sobering but informative for the field. The PTQ-vs-QAT comparison quantifies how many bits of additional headroom QAT buys in the verifier setting.",
          ],
          bullets: [
            "Six bit-depths: FP16 / Q8 / Q6 / Q4 / Q3 / Q2",
            "PTQ + QAT variants at the four critical bit-depths",
            "5-dimensional 0–3 rubric on a held-out claim-evaluation set",
            "Per-bit-depth failure-mode taxonomy",
            "Confidence intervals via repeated sampling on the eval set",
          ],
        },
        {
          eyebrow: "Status",
          title: "Companion engineering substrate",
          body: [
            "Council itself — the multi-agent CLI on which /discover runs — is the production engineering substrate. It is a seven-role debate layer (Architect, Implementer, Skeptic, Critic, Tester, Security, Performance) on top of OpenClaude's coordinator mode, with a single-executor diff pipeline and vote-gated revision. The specialist verifier slots in as an eighth role, called only when the synthesizer asks for a domain check.",
            "Target venue: workshop submission at NeurIPS ENLSP 2026, ICLR ME-FoMo 2026, or ICML AI4Science 2026. Final venue selection pending Phase 2 results.",
          ],
        },
      ],
    },
  "plantclef-2026": {
      tagline:
        "Taxonomy-aware partial fine-tuning of BioCLIP 2.5 for the 7,806-class long-tail multi-label plant ID benchmark.",
      overview: [
        "PlantCLEF 2026 is a 7,806-class long-tail multi-label vegetation-plot identification benchmark — every test image can contain several species, and most species have only a handful of training images. Off-the-shelf classification heads on top of a frozen backbone collapse under that distribution shape; a full fine-tune overfits the tail.",
        "Our submission, ANU at PlantCLEF 2026, partial-fine-tunes BioCLIP 2.5 ViT-H/14 with auxiliary taxonomic heads, runs a 4×4 tile inference ensemble across two resolutions, and uses logit-adjusted adaptive thresholding to handle the multi-label output. Final Macro F1 on the held-out set: 0.418.",
      ],
      stats: [
        { label: "Macro F1", value: "0.418", sub: "PlantCLEF 2026 held-out" },
        { label: "Classes", value: "7,806", sub: "Long-tail, multi-label" },
        { label: "Backbone", value: "ViT-H/14", sub: "BioCLIP 2.5" },
        { label: "Inference", value: "4×4 · dual-res", sub: "Tile ensemble" },
      ],
      sections: [
        {
          eyebrow: "Method",
          title: "Partial fine-tune + taxonomy-aware auxiliary heads",
          body: [
            "We unfreeze only the upper transformer blocks of BioCLIP 2.5 (the lower blocks stay frozen to preserve the pre-trained visual prior) and attach four auxiliary classification heads — genus, family, order, class — alongside the species head. The loss is a weighted sum across all five heads. The taxonomy gradient gives the model credit for being \"close\" when the leaf-level call is wrong, which is exactly the regime where rare-species training fails.",
            "Logit adjustment is applied across the species head to counter the long-tail prior — without it, the model collapses to predicting common species everywhere.",
          ],
          bullets: [
            "BioCLIP 2.5 ViT-H/14 backbone — partial unfreeze on upper blocks",
            "Auxiliary heads: genus / family / order / class",
            "Logit-adjusted loss for long-tail multi-label",
            "Adaptive per-class thresholds tuned on the validation split",
          ],
        },
        {
          eyebrow: "Inference",
          title: "4×4 tile + multi-resolution ensemble",
          body: [
            "Vegetation-plot images are large, unevenly composed, and multi-species. A single 224 px forward pass dilutes small species into the logits of the dominant region. We decompose every input into a 4×4 grid of overlapping tiles and run the model independently per tile at 224 and 336 px. Logits are averaged across tiles and resolutions before adaptive thresholding produces the final multi-label set.",
          ],
          bullets: [
            "4×4 tile decomposition with overlap",
            "Dual-resolution forward passes (224 + 336 px)",
            "Logit averaging across tile × resolution grid",
            "Per-class adaptive thresholding for multi-label output",
          ],
        },
      ],
      gallery: [
        {
          src: "/projects/oracle/figures-1.webp",
          width: 1214,
          height: 1145,
          alt: "PlantCLEF score progression across 11 submissions, val/Kaggle distribution gap, and validation-accuracy-as-Kaggle-predictor",
          caption:
            "Figures 1–3 — best Kaggle public F1 across 11 submissions climbing to 010 (the partial-unfreeze breakthrough), the val/Kaggle distribution gap, and a per-experiment correlation between validation accuracy and Kaggle public score.",
        },
        {
          src: "/projects/oracle/figures-2.webp",
          width: 1194,
          height: 767,
          alt: "015 validation climbs while Kaggle stalls + species image counts before and after the 500 cap",
          caption:
            "Figures 4–5 — 015 validation rises while Kaggle public F1 stalls (capacity added to the wrong distribution shape), and the species-image-count histogram before/after the 500-image cap that collapses the right tail without rescuing the 1,644 species under 100 images.",
        },
      ],
    },
  "tinyml-gw": {
      tagline:
        "How much does INT8 quantization corrupt the phase coherence of LIGO chirps — and can custom kernels claw it back at the edge?",
      overview: [
        "Gravitational-wave detection trigger pipelines run on matched-filter cross-correlations between a template bank and the incoming strain. The trigger arm is throughput-bound and increasingly being pushed to edge devices to cut latency from detector to alert. Quantization is the obvious lever — but standard INT8 quantization is benchmarked on benchmark losses like cross-entropy, not on phase coherence.",
        "This honours thesis quantifies the gap. We measure how INT8 quantization interferes with the phase coherence of LIGO-style chirp signals — the signal property that the trigger filter actually depends on — and prototype a signal-fidelity-first optimization framework targeting ARM Cortex-M edge hardware under a <128 KB SRAM budget.",
      ],
      stats: [
        { label: "SNR-loss target", value: "<5%", sub: "vs FP32 baseline" },
        { label: "SRAM budget", value: "<128 KB", sub: "ARM Cortex-M" },
        { label: "FAR target", value: "10⁻⁴ Hz", sub: "Edge-side filter" },
        { label: "Compression", value: "8×", sub: "vs FP32 model" },
      ],
      sections: [
        {
          eyebrow: "Problem",
          title: "Quantization vs phase coherence",
          body: [
            "Matched filtering depends on phase alignment between the template and the observed signal. Quantization noise distorts the phase non-uniformly across frequency — and the chirp's most informative content is in the high-frequency tail. The question the thesis answers: at what bit-depth does that distortion start damaging detection sensitivity in a way that matters for the trigger pipeline.",
            "We measure SNR loss vs the FP32 baseline across quantization schemes (PTQ, QAT, hardware-aware distillation), with the chirp template + LIGO-style noise as the input distribution.",
          ],
          bullets: [
            "Phase-coherence metric over the chirp template band",
            "PTQ vs QAT vs hardware-aware distillation",
            "SNR-loss target: <5% vs FP32 baseline",
            "False alarm rate held at 10⁻⁴ Hz at the edge filter",
          ],
        },
        {
          eyebrow: "Edge deployment",
          title: "Custom C++ inference kernels for Cortex-M",
          body: [
            "TensorFlow Lite Micro on ARM Cortex-M is the obvious deployment target, but its generic op kernels carry overhead that matters when the model has to fit in <128 KB SRAM and run on 4096 Hz strain data. We bypass TFLite Micro with custom hand-written C++ inference kernels for the specific operator set the model uses — depthwise convolutions, matched-filter cross-correlations, threshold-then-emit logic.",
            "The result is 8× memory reduction relative to the FP32 model, with the SNR-loss bound held below 5% — enough to keep the False Alarm Rate at the edge filter inside the 10⁻⁴ Hz target.",
          ],
          bullets: [
            "Custom C++ kernels bypassing TFLite Micro overhead",
            "Depthwise conv + matched-filter cross-correlation operators",
            "Optimised for high-frequency 4096 Hz strain data",
            "<128 KB SRAM budget on ARM Cortex-M",
          ],
        },
      ],
    },
};
