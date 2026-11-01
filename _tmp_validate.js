
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        darkbg: '#0f172a',
                        darkcard: '#1e293b',
                        darkaccent: '#334155',
                        brand: '#3b82f6',
                        brandhover: '#2563eb',
                        activeLine: '#374151',
                    }
                }
            }
        }
    </script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- CodeMirror 5 (Syntax highlighting for Pseudocode and Python) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/dracula.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js"></script>
    <!-- Mermaid.js for Flowcharts -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <!-- Pyodide CDN -->
    <script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>

    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            overflow: hidden;
        }
        .CodeMirror {
            height: 100% !important;
            font-family: 'Fira Code', 'Courier New', Courier, monospace;
            font-size: 13px;
            background-color: #0f172a !important;
        }
        .CodeMirror-gutters {
            background-color: #1e293b !important;
            border-right: 1px solid #334155 !important;
        }
        .active-line-highlight {
            background-color: rgba(59, 130, 246, 0.25) !important;
            border-left: 4px solid #3b82f6;
        }
        .cm-unknown-control {
            color: #fca5a5 !important;
            background-color: rgba(239, 68, 68, 0.12);
            text-decoration: underline wavy #ef4444;
            text-underline-offset: 2px;
        }
        /* Custom scrollbars */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }
        /* Resizer handle */
        .gutter-horizontal {
            cursor: col-resize;
            width: 6px;
            background-color: #1e293b;
            transition: background-color 0.2s;
        }
        .gutter-horizontal:hover {
            background-color: #3b82f6;
        }
        .gutter-vertical {
            flex: 0 0 6px;
            cursor: row-resize;
            background-color: #1e293b;
            touch-action: none;
        }
        .gutter-vertical:hover, .gutter-vertical:focus-visible {
            background-color: #3b82f6;
            outline: none;
        }
        #pseudocodeHelpResizer {
            position: relative;
            z-index: 1;
            flex-basis: 12px;
            user-select: none;
        }
        #pseudocodeHelpResizer::after {
            position: absolute;
            top: 4px;
            left: calc(50% - 18px);
            width: 36px;
            height: 4px;
            border-radius: 9999px;
            background: #64748b;
            content: "";
            pointer-events: none;
        }
        #pseudocodeHelp {
            height: 224px;
            min-height: 96px;
        }
        #pane1 > div:nth-child(2) {
            min-height: 120px;
        }
        #pythonEditorPane {
            flex: 0 0 55%;
            min-height: 100px;
        }
        #pythonEditorPane .CodeMirror {
            position: absolute;
            top: 28px;
            right: 0;
            bottom: 0;
            left: 0;
            height: auto !important;
        }
        #pythonInspectorPane {
            flex: 1 1 0;
            min-height: 260px;
        }
        #inspectorContent {
            gap: 8px;
        }
        #variablePane {
            flex: 1 1 0%;
            min-height: 90px;
        }
        #consolePane {
            flex: 1 1 112px;
            min-height: 70px;
        }
        .language-button[aria-pressed="true"] {
            background-color: #2563eb;
            color: #fff;
            box-shadow: inset 0 0 0 1px #60a5fa;
        }
        .language-flag {
            display: inline-block;
            width: 22px;
            height: 15px;
            vertical-align: -3px;
            border-radius: 2px;
            box-shadow: 0 0 0 1px rgb(148 163 184 / 0.4);
        }
        @media (max-width: 1499px) {
            .top-controls {
                width: 100%;
            }
        }
        /* Mermaid styling inside canvas */
        .node rect, .node circle, .node polygon {
            stroke-width: 2px !important;
            transition: all 0.3s ease;
        }
        .node.active-node rect, .node.active-node circle, .node.active-node polygon {
            fill: #2563eb !important;
            stroke: #60a5fa !important;
            stroke-width: 3px !important;
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
        }
        #mermaidTarget svg {
            max-width: none !important;
            max-height: none !important;
        }
    </style>
</head>
<body class="bg-darkbg text-slate-100 h-screen flex flex-col">

    <!-- Top Navigation Bar -->
    <header class="min-h-14 h-auto bg-darkcard border-b border-darkaccent px-4 py-2 flex flex-wrap items-center justify-between gap-y-2 flex-shrink-0">
        <div class="flex items-center space-x-3">
            <i class="fa-solid font-bold text-brand text-xl fa-diagram-project"></i>
            <h1 data-i18n="appTitle" class="font-bold text-lg tracking-wide bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Algoritmizace & Vývojové Diagramy
            </h1>
            <span class="text-xs bg-darkaccent px-2 py-0.5 rounded-full text-slate-300 font-mono">Pyodide WASM</span>
        </div>

        <!-- Controls: Select Template, Run Debugger, Step Controls -->
        <div class="top-controls flex flex-wrap items-center justify-end gap-3 max-w-full">
            <div class="flex items-center space-x-2">
                <label data-i18n="algorithmLabel" class="text-xs text-slate-400 font-medium">Algoritmus:</label>
                <select id="templateSelect" onchange="loadTemplate(this.value)" class="bg-darkbg border border-darkaccent text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand text-slate-200">
                </select>
                <input id="jsonFileInput" type="file" accept=".json,application/json" class="hidden">
                <button id="loadJsonButton" type="button" onclick="document.getElementById('jsonFileInput').click()" data-i18n-title="loadJson" data-i18n-aria-label="loadJson" class="flex items-center space-x-1 bg-slate-700 hover:bg-slate-600 text-xs text-white px-2.5 py-1.5 rounded transition" title="Načíst pseudokód z JSON">
                    <i class="fa-solid fa-upload"></i>
                    <span data-i18n="loadJson">Načíst JSON</span>
                </button>
                <button onclick="saveSelectedTemplate()" data-i18n-title="saveJson" data-i18n-aria-label="saveJson" class="flex items-center space-x-1 bg-slate-700 hover:bg-slate-600 text-xs text-white px-2.5 py-1.5 rounded transition" title="Uložit pseudokód jako JSON" aria-label="Uložit pseudokód jako JSON">
                    <i class="fa-solid fa-download"></i>
                    <span data-i18n="saveJsonButton">Uložit JSON</span>
                </button>
            </div>

            <div class="h-5 w-px bg-darkaccent"></div>

            <!-- Execution Controls -->
            <div class="flex items-center space-x-1 bg-darkbg p-1 rounded-lg border border-darkaccent">
                <button id="btnInit" onclick="initExecution()" data-i18n-title="prepareExecution" class="flex items-center space-x-1 bg-slate-700 hover:bg-slate-600 text-xs text-white px-2.5 py-1 rounded transition" title="Připravit ke krokování">
                    <i class="fa-solid fa-rotate-left"></i>
                    <span data-i18n="start">Start</span>
                </button>
                <button id="btnPlay" onclick="togglePlay()" disabled class="flex items-center space-x-1 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:hover:bg-green-600 text-xs text-white px-2.5 py-1 rounded transition">
                    <i id="playIcon" class="fa-solid fa-play"></i>
                    <span id="playText" data-i18n="play">Spustit</span>
                </button>
                <button id="btnStepNext" onclick="stepForward()" disabled class="flex items-center space-x-1 bg-brand hover:bg-brandhover disabled:opacity-40 text-xs text-white px-2.5 py-1 rounded transition">
                    <i class="fa-solid fa-step-forward"></i>
                    <span data-i18n="step">Krok</span>
                </button>
                <button id="btnStepPrev" onclick="stepBackward()" data-i18n-title="previousStep" data-i18n-aria-label="previousStep" disabled class="flex items-center space-x-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs text-white px-2.5 py-1 rounded transition">
                    <i class="fa-solid fa-step-backward"></i>
                </button>
            </div>

            <!-- Speed Slider -->
            <div class="flex items-center space-x-2 bg-darkbg px-2 py-1 rounded-lg border border-darkaccent text-xs">
                <i class="fa-solid fa-gauge-high text-slate-400"></i>
                <input type="range" id="speedSlider" min="100" max="1500" value="600" step="50" class="w-20 accent-brand cursor-pointer">
                <span id="speedVal" class="text-slate-400 font-mono w-10">600ms</span>
            </div>
            <div class="flex items-center gap-1 rounded-lg border border-darkaccent bg-darkbg p-1" role="group" data-i18n-aria-label="languageSelector">
                <button type="button" class="language-button rounded px-1.5 py-1 text-[11px] transition hover:bg-darkaccent" data-language="cs" aria-pressed="false" aria-label="Čeština">
                    <svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#d7141a"/><path d="M0 0v20l13-10z" fill="#11457e"/></svg> CS
                </button>
                <button type="button" class="language-button rounded px-1.5 py-1 text-[11px] transition hover:bg-darkaccent" data-language="en" aria-pressed="true" aria-label="English">
                    <svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.5"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="7"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3"/></svg> EN
                </button>
                <button type="button" class="language-button rounded px-1.5 py-1 text-[11px] transition hover:bg-darkaccent" data-language="sk" aria-pressed="false" aria-label="Slovenčina">
                    <svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="7" fill="#fff"/><rect y="7" width="30" height="6" fill="#0b4ea2"/><rect y="13" width="30" height="7" fill="#ee1c25"/></svg> SK
                </button>
                <button type="button" class="language-button rounded px-1.5 py-1 text-[11px] transition hover:bg-darkaccent" data-language="eo" aria-pressed="false" aria-label="Esperanto">
                    <svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#009b3a"/><path d="M0 0h12v10H0z" fill="#fff"/><path d="m6 1.4 1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z" fill="#009b3a"/></svg> EO
                </button>
                <button type="button" class="language-button rounded px-1.5 py-1 text-[11px] transition hover:bg-darkaccent" data-language="fr" aria-pressed="false" aria-label="Français">
                    <svg class="language-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#000091"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#e1000f"/></svg> FR
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container: 3 Panes Layout -->
    <main id="container" class="flex-1 flex overflow-hidden">
        
        <!-- PANE 1: Pseudokód & Edice (1/3) -->
        <section id="pane1" class="w-1/3 flex flex-col border-r border-darkaccent min-w-[280px]">
            <div class="h-9 bg-darkcard px-3 flex items-center justify-between border-b border-darkaccent text-xs font-semibold text-slate-300">
                <span class="flex items-center space-x-2">
                    <i class="fa-solid fa-file-code text-indigo-400"></i>
                    <span data-i18n="pseudocodePane">1. Pseudokód / Struktura</span>
                </span>
                <span data-i18n="algorithm" class="text-[10px] text-slate-500 uppercase tracking-wider">Algoritmus</span>
            </div>
            <div class="flex-1 relative">
                <textarea id="pseudocodeEditor"></textarea>
                <div id="pseudocodeWarning" data-i18n-title="pseudocodeWarningTitle" class="hidden absolute top-2 right-3 z-10 rounded border border-red-500/50 bg-slate-900/95 px-2 py-1 text-[10px] text-red-300 shadow" role="status" aria-live="polite" title="Kontrola označuje neznámá slova psaná velkými písmeny na začátku řádku; běžné přiřazení ignoruje.">
                </div>
            </div>
            <div id="pseudocodeHelpResizer" class="gutter-vertical" role="separator" data-i18n-aria-label="resizeHelp" aria-label="Změnit výšku nápovědy" aria-orientation="horizontal" aria-valuemin="96" tabindex="0"></div>
            <div class="h-56 flex-shrink-0 overflow-y-auto border-t border-darkaccent bg-slate-900/70 px-3 py-2 text-[10px] leading-4 text-slate-400" id="pseudocodeHelp">
                <h2 data-i18n="supportedTerms" class="mb-1 text-[11px] font-semibold text-slate-200">Podporované termíny pseudokódu</h2>
                <ul class="space-y-0.5">
                    <li data-i18n="termAlgorithm" data-i18n-html="true"><code class="text-indigo-300">ALGORITMUS název(...):</code> / <code class="text-indigo-300">ALGORITHM name(...):</code> — hlavička algoritmu</li>
                    <li data-i18n="termIf" data-i18n-html="true"><code class="text-indigo-300">POKUD</code> / <code class="text-indigo-300">IF</code> — podmínka</li>
                    <li data-i18n="termElse" data-i18n-html="true"><code class="text-indigo-300">JINAK</code> / <code class="text-indigo-300">ELSE</code> — alternativní větev</li>
                    <li data-i18n="termWhile" data-i18n-html="true"><code class="text-indigo-300">DOKUD</code> / <code class="text-indigo-300">WHILE</code> — podmíněný cyklus</li>
                    <li data-i18n="termForEach" data-i18n-html="true"><code class="text-indigo-300">PRO prvek V kolekce</code> / <code class="text-indigo-300">FOR prvek IN collection</code> — průchod kolekcí</li>
                    <li data-i18n="termForCount" data-i18n-html="true"><code class="text-indigo-300">PRO i OD začátek DO konec</code> / <code class="text-indigo-300">FOR i FROM start TO end</code> — počítaný cyklus (šestiúhelník)</li>
                    <li data-i18n="termReturn" data-i18n-html="true"><code class="text-indigo-300">VRAT hodnota</code> / <code class="text-indigo-300">RETURN value</code> — předání výsledku funkce (rovnoběžník)</li>
                    <li data-i18n="termWrite" data-i18n-html="true"><code class="text-indigo-300">VYPIS hodnota</code> / <code class="text-indigo-300">WRITE value</code> — tisk hodnoty</li>
                    <li data-i18n="termInput" data-i18n-html="true"><code class="text-indigo-300">VSTUP proměnná</code> / <code class="text-indigo-300">INPUT variable</code> — načtení textového vstupu (rovnoběžník)</li>
                    <li data-i18n="termIndent" data-i18n-html="true">Bloky pište s dvojtečkou a odsazujte; ostatní řádky se zobrazí jako kroky.</li>
                    <li data-i18n="termPythonGeneration" data-i18n-html="true">Python se generuje mezi komentáři <code class="text-indigo-300"># BEGIN GENERATED CODE</code> a <code class="text-indigo-300"># END GENERATED CODE</code>.</li>
                    <li data-i18n="termWarning" data-i18n-html="true">Neznámá velká slova na začátku řádku jsou podtržena červeně; upozornění je pouze orientační.</li>
                </ul>
            </div>
        </section>

        <!-- Divider 1 -->
        <div id="gutter1" class="gutter-horizontal"></div>

        <!-- PANE 2: Vývojový diagram (1/3) -->
        <section id="pane2" class="w-1/3 flex flex-col border-r border-darkaccent min-w-[280px]">
            <div class="h-9 bg-darkcard px-3 flex items-center justify-between border-b border-darkaccent text-xs font-semibold text-slate-300">
                <span class="flex items-center space-x-2">
                    <i class="fa-solid fa-project-diagram text-emerald-400"></i>
                    <span data-i18n="diagramPane">2. Vývojový Diagram</span>
                </span>
                <div class="flex items-center space-x-2">
                    <span id="mermaidStatus" class="text-[10px] text-slate-400">Generováno</span>
                </div>
            </div>
            <!-- Dynamic Flowchart Viewport -->
            <div class="flex-1 bg-darkbg p-4 overflow-auto flex items-center justify-center relative" id="diagramContainer">
                <div class="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-lg border border-darkaccent bg-darkcard/95 p-1 shadow">
                    <button onclick="zoomDiagram(-1)" data-i18n-title="zoomOut" data-i18n-aria-label="zoomOut" class="h-7 w-7 rounded text-slate-200 hover:bg-darkaccent" title="Oddálit diagram" aria-label="Oddálit diagram">
                        <i class="fa-solid fa-magnifying-glass-minus"></i>
                    </button>
                    <button onclick="zoomDiagram(1)" data-i18n-title="zoomIn" data-i18n-aria-label="zoomIn" class="h-7 w-7 rounded text-slate-200 hover:bg-darkaccent" title="Přiblížit diagram" aria-label="Přiblížit diagram">
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                    </button>
                    <button onclick="resetDiagramZoom()" data-i18n-title="fitDiagram" data-i18n-aria-label="fitDiagram" class="h-7 w-7 rounded text-slate-200 hover:bg-darkaccent" title="Přizpůsobit diagram ploše" aria-label="Přizpůsobit diagram ploše">
                        <i class="fa-solid fa-house"></i>
                    </button>
                </div>
                <div id="mermaidTarget" class="mermaid flex justify-center items-center">
                    %% Diagram se vygeneruje zde %%
                </div>
            </div>
        </section>

        <!-- Divider 2 -->
        <div id="gutter2" class="gutter-horizontal"></div>

        <!-- PANE 3: Python Kód + Debugger / Proměnné (1/3 Pravý sloupec) -->
        <section id="pane3" class="w-1/3 flex flex-col min-w-[280px]">
            <div class="h-9 bg-darkcard px-3 flex items-center justify-between border-b border-darkaccent text-xs font-semibold text-slate-300 flex-shrink-0">
                <span class="flex items-center space-x-2">
                    <i class="fa-brands fa-python text-yellow-400"></i>
                    <span data-i18n="pythonPane">3. Python Kód & Vizualizace</span>
                </span>
                <span id="pyodideStatus" class="text-[10px] text-amber-400 flex items-center space-x-1">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    <span>Nahrávání Pyodide...</span>
                </span>
            </div>

            <!-- Python Editor (Top 55%) -->
            <div id="pythonEditorPane" class="relative border-b border-darkaccent overflow-hidden">
                <div class="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between border-b border-darkaccent bg-slate-900 px-2">
                    <span id="pythonGenerationStatus" class="max-w-[200px] truncate text-[10px] text-slate-400" role="status" aria-live="polite"></span>
                    <button id="generatePythonButton" type="button" onclick="generatePythonFromPseudocode()"
                        class="rounded bg-indigo-700 hover:bg-indigo-600 px-2 py-1 text-[10px] text-white transition"
                        data-i18n="generatePythonButton">Generovat Python</button>
                </div>
                <textarea id="pythonEditor"></textarea>
            </div>

            <div id="pythonEditorResizer" class="gutter-vertical" role="separator" data-i18n-aria-label="resizePythonEditor" aria-label="Změnit výšku editoru Pythonu a inspektoru proměnných" aria-orientation="horizontal" aria-valuemin="100" tabindex="0"></div>

            <!-- Variables & Callstack Inspector (Bottom 45%) -->
            <div id="pythonInspectorPane" class="flex flex-col bg-darkcard">
                <div class="h-8 bg-slate-900 px-3 flex items-center justify-between border-b border-darkaccent text-xs font-medium text-slate-400 flex-shrink-0">
                    <span class="flex items-center space-x-2">
                        <i class="fa-solid fa-cube text-sky-400"></i>
                        <span data-i18n="variables">Inspektor Proměnných</span>
                    </span>
                    <span id="stepCounter" class="font-mono text-[11px] text-slate-400">Krok: 0 / 0</span>
                </div>

                <div id="inspectorContent" class="flex-1 p-2 overflow-y-auto font-mono text-xs flex flex-col">
                    <!-- Local Variables Table -->
                    <div id="variablePane" class="bg-darkbg rounded-lg border border-darkaccent p-2 overflow-y-auto">
                        <div class="text-[11px] text-slate-400 font-sans font-semibold mb-1 flex justify-between border-b border-darkaccent pb-1">
                            <span data-i18n="variable">Proměnná</span>
                            <span data-i18n="value">Hodnota</span>
                        </div>
                        <div id="varInspector" class="space-y-1">
                            <span data-i18n="startStepping" class="text-slate-500 italic font-sans text-[11px]">Spusťte krokování...</span>
                        </div>
                    </div>

                    <div id="variableConsoleResizer" class="gutter-vertical" role="separator" data-i18n-aria-label="resizeVariableConsole" aria-label="Změnit výšku panelu proměnných a konzole" aria-orientation="horizontal" aria-valuemin="90" tabindex="0"></div>

                    <!-- Output & Call Stack -->
                    <div id="consolePane" class="bg-darkbg rounded-lg border border-darkaccent p-2 overflow-y-auto">
                        <div class="text-[11px] text-slate-400 font-sans font-semibold mb-1 flex justify-between border-b border-darkaccent pb-1">
                            <span data-i18n="console">Konzole (stdout)</span>
                        </div>
                        <pre id="consoleOutput" class="text-slate-300 text-[11px] whitespace-pre-wrap font-mono"></pre>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Global Application Scripts -->
    <script>
        // --- 1. PRE-DEFINED ALGORITHM TEMPLATES ---
        const templates = {
            bubbleSort: {
                name: 'Bubble Sort',
                pseudocode: `ALGORITHM BubbleSort(array):
  n = length(array)
  FOR i FROM 0 TO n - 1:
    FOR j FROM 0 TO n - i - 2:
      IF array[j] > array[j + 1]:
        array[j], array[j + 1] = array[j + 1], array[j]
  RETURN array`,
                python: `# BEGIN GENERATED CODE
def bubble_sort(array):
    n = len(array)
    for i in range(n):
        for j in range(0, n - i - 1):
            if array[j] > array[j + 1]:
                array[j], array[j + 1] = array[j + 1], array[j]
    return array
# END GENERATED CODE

values = [64, 34, 25, 12, 22, 8, -10, -5, 0, 3, 99]
bubble_sort(values)
print("done")`
            },

            factorial: {
                name: 'Factorial (Recursion/Loops)',
                pseudocode: `ALGORITHM Factorial(n):
  result = 1
  FOR i FROM 1 TO n:
    result = result * i
  RETURN result`,
                python: `# BEGIN GENERATED CODE
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result = result * i
    return result
# END GENERATED CODE

result = factorial(5)
print("Factorial:", result)`
            },

            findMax: {
                name: 'Find Maximum in an Array',
                pseudocode: `ALGORITHM FindMaximum(array):
  max_value = array[0]
  FOR item IN array:
    IF item > max_value:
      max_value = item
  RETURN max_value`,
                python: `# BEGIN GENERATED CODE
def find_max(array):
    max_value = array[0]
    for item in array:
        if item > max_value:
            max_value = item
    return max_value
# END GENERATED CODE

numbers = [14, 45, 8, 99, 23]
maximum = find_maximum(numbers)
print("Maximum:", maximum)`
            },

            gcd: {
                name: 'Euclidean Algorithm (GCD)',
                pseudocode: `ALGORITHM EuclideanGCD(a, b):
  WHILE b != 0:
    temp = b
    b = a MOD b
    a = temp
  RETURN a`,
                python: `# BEGIN GENERATED CODE
def euclidean_gcd(a, b):
    while b != 0:
        temp = b
        b = a % b
        a = temp
    return a
# END GENERATED CODE

result = euclidean_gcd(48, 18)
print("GCD:", result)`
            },

            triangleArea: {
                name: 'Triangle Area from Three Sides',
                pseudocode: `ALGORITHM TriangleArea(a, b, c):
  IF a <= 0 OR b <= 0 OR c <= 0:
    WRITE "Side lengths must be greater than zero"
    RETURN None
  IF a + b <= c OR a + c <= b OR b + c <= a:
    WRITE "Side lengths do not form a valid triangle"
    RETURN None
  sp = (a + b + c) / 2
  area = math.sqrt(sp * (sp - a) * (sp - b) * (sp - c))
  RETURN area`,
                python: `import math

# BEGIN GENERATED CODE
def triangle_area(a, b, c):
    if a <= 0 or b <= 0 or c <= 0:
        print("Side lengths must be greater than zero")
        return None
    if a + b <= c or a + c <= b or b + c <= a:
        print("Side lengths do not form a valid triangle")
        return None
    sp = (a + b + c) / 2
    return math.sqrt(sp * (sp - a) * (sp - b) * (sp - c))
# END GENERATED CODE

area = triangle_area(3, 4, 5)
print("Triangle area:", area)`
            },

            pedestrianCrossingBasic: {
                name: 'Pedestrian Crossing (Basic)',
                pseudocode: `ALGORITHM PedestrianCrossingBasic(traffic_snapshots):
  WRITE "Stop at the curb"
  WRITE "Look left, right, and left again"
  FOR traffic_approaching IN traffic_snapshots:
    IF traffic_approaching:
      WRITE "Wait 5 seconds"
      WRITE "Check traffic again"
    ELSE:
      WRITE "Cross while watching traffic"
      RETURN true
  WRITE "Traffic is still approaching. Keep waiting."
  RETURN false`,
                python: `# BEGIN GENERATED CODE
def cross_road_basic(traffic_snapshots):
    print("Stop at the curb.")
    for traffic_approaching in traffic_snapshots:
        print("Look left, right, then left again.")
        if traffic_approaching:
            print("Traffic is approaching. Wait and check again.")
            continue
        print("The road is clear. Cross carefully while watching traffic.")
        return True
    print("Traffic is still approaching. Keep waiting.")
    return False
# END GENERATED CODE

traffic_snapshots = [True, True, False]
pedestrian_crossing_basic(traffic_snapshots)
print("done")`
            },

            pedestrianCrossingComplex: {
                name: 'Pedestrian Crossing (Unsignalized, Complex)',
                pseudocode: `ALGORITHM PedestrianCrossingUnsignalized(traffic_snapshots):
  WRITE "Choose a crossing place with a clear view."
  WRITE "Stop before the road, remove distractions, and check both directions."
  FOR snapshot IN traffic_snapshots:
    all_lanes_clear = true
    FOR lane_is_unsafe IN snapshot:
      IF lane_is_unsafe:
        all_lanes_clear = false
    IF all_lanes_clear:
      WRITE "All lanes have a safe gap. Cross without running and keep watching traffic."
      RETURN true
    WRITE "At least one lane is unsafe. Wait and check both directions again."
  WRITE "No safe gap yet. Keep waiting."
  RETURN false`,
                python: `# BEGIN GENERATED CODE
def cross_road_complex(traffic_snapshots):
    print("Choose a crossing place with a clear view.")
    print("Stop before the road, remove distractions, and check both directions.")
    for snapshot in traffic_snapshots:
        all_lanes_clear = all(not lane_is_unsafe for lane_is_unsafe in snapshot)
        if all_lanes_clear:
            print("All lanes have a safe gap. Cross without running and keep watching traffic.")
            return True
        print("At least one lane is unsafe. Wait and check both directions again.")
    print("No safe gap yet. Keep waiting.")
    return False
# END GENERATED CODE

traffic_snapshots = [[True, False], [False, True], [False, False]]
pedestrian_crossing_unsignalized(traffic_snapshots)
print("done")`
            }
        };

        const translations = {
            cs: {
                documentTitle: 'Algoritmizace & Vývojové diagramy | Výukový nástroj',
                appTitle: 'Algoritmizace & Vývojové Diagramy',
                languageSelector: 'Výběr jazyka',
                algorithmLabel: 'Algoritmus:',
                loadJson: 'Načíst JSON',
                saveJsonButton: 'Uložit JSON',
                saveJson: 'Uložit pseudokód jako JSON',
                prepareExecution: 'Připravit ke krokování',
                start: 'Start',
                play: 'Spustit',
                pause: 'Pauza',
                step: 'Krok',
                previousStep: 'Předchozí krok',
                pseudocodePane: '1. Pseudokód / Struktura',
                algorithm: 'Algoritmus',
                pseudocodeWarningTitle: 'Kontrola označuje neznámá slova psaná velkými písmeny na začátku řádku; běžné přiřazení ignoruje.',
                supportedTerms: 'Podporované termíny pseudokódu',
                termAlgorithm: '<code class="text-indigo-300">ALGORITMUS název(...):</code> / <code class="text-indigo-300">ALGORITHM name(...):</code> — hlavička algoritmu',
                termIf: '<code class="text-indigo-300">POKUD</code> / <code class="text-indigo-300">IF</code> — podmínka',
                termElse: '<code class="text-indigo-300">JINAK</code> / <code class="text-indigo-300">ELSE</code> — alternativní větev',
                termWhile: '<code class="text-indigo-300">DOKUD</code> / <code class="text-indigo-300">WHILE</code> — podmíněný cyklus',
                termForEach: '<code class="text-indigo-300">PRO prvek V kolekce</code> / <code class="text-indigo-300">FOR prvek IN collection</code> — průchod kolekcí',
                termForCount: '<code class="text-indigo-300">PRO i OD začátek DO konec</code> / <code class="text-indigo-300">FOR i FROM start TO end</code> — počítaný cyklus (šestiúhelník)',
                termReturn: '<code class="text-indigo-300">VRAT hodnota</code> / <code class="text-indigo-300">RETURN value</code> — předání výsledku funkce (rovnoběžník)',
                termWrite: '<code class="text-indigo-300">VYPIS hodnota</code> / <code class="text-indigo-300">WRITE value</code> — tisk hodnoty',
                termInput: '<code class="text-indigo-300">VSTUP proměnná</code> / <code class="text-indigo-300">INPUT variable</code> — načtení textového vstupu (rovnoběžník)',
                termIndent: 'Bloky pište s dvojtečkou a odsazujte; ostatní řádky se zobrazí jako kroky.',
                termPythonGeneration: 'Python se generuje mezi komentáři <code class="text-indigo-300"># BEGIN GENERATED CODE</code> a <code class="text-indigo-300"># END GENERATED CODE</code>.',
                termWarning: 'Neznámá velká slova na začátku řádku jsou podtržena červeně; upozornění je pouze orientační.',
                resizeHelp: 'Změnit výšku nápovědy',
                resizePythonEditor: 'Změnit výšku editoru Pythonu a inspektoru proměnných',
                resizeVariableConsole: 'Změnit výšku panelu proměnných a konzole',
                diagramPane: '2. Vývojový Diagram',
                diagramGenerated: 'Generováno',
                diagramOk: 'Diagram OK',
                diagramError: 'Chyba pseudokódu',
                diagramCreateError: 'Diagram se nepodařilo vytvořit. Opravte pseudokód.',
                diagramRenderError: 'Diagram se nepodařilo vykreslit. Zkontrolujte syntaxi pseudokódu.',
                zoomOut: 'Oddálit diagram',
                zoomIn: 'Přiblížit diagram',
                fitDiagram: 'Přizpůsobit diagram ploše',
                pythonPane: '3. Python Kód & Vizualizace',
                generatePythonButton: 'Generovat Python',
                pythonGenerated: 'Python vygenerován',
                pythonNeedsGeneration: 'Pseudokód změněn; vygenerujte Python',
                pythonGenerationError: 'Python se nepodařilo vygenerovat',
                pythonMarkersMissing: 'Vložte do editoru komentáře # BEGIN GENERATED CODE a # END GENERATED CODE.',
                pythonMarkersInvalid: 'Komentáře pro generovaný kód musí být právě jeden pár ve správném pořadí.',
                pyodideLoading: 'Nahrávání Pyodide...',
                pyodideReady: 'Python připraven',
                pyodideError: 'Chyba při načítání Pythonu',
                variables: 'Inspektor Proměnných',
                stepCounter: 'Krok: {current} / {total}',
                variable: 'Proměnná',
                value: 'Hodnota',
                startStepping: 'Spusťte krokování...',
                noVariables: 'Žádné lokální proměnné',
                console: 'Konzole (stdout)',
                saveError: 'Zvolený algoritmus se nepodařilo uložit.',
                invalidJson: 'Soubor JSON má neplatný formát. Očekává se název a pole řádků pseudokódu s textem a odsazením.',
                jsonReadError: 'Soubor JSON se nepodařilo načíst.',
                pyodideNotReady: 'Pyodide se stále načítá. Počkejte prosím chvíli.',
                noExecutionSteps: 'Nebyl zaznamenán žádný krok vykonávání kódového bloku.',
                pythonRuntimeError: 'Chyba běhu Pythonu:',
                unknownTerms: 'Neznámé řídicí výrazy: {count}',
                malformedElse: 'Alternativní větev "{line}" musí být zapsána jako JINAK: nebo ELSE:.',
                malformedBlock: 'Pseudokód nelze zpracovat u řádku: {line}',
                malformedInput: 'Příkaz VSTUP/INPUT na řádku {line} musí mít tvar VSTUP proměnná nebo INPUT variable.',
                missingColon: 'Hlavička "{line}" musí končit dvojtečkou.',
                malformedAlgorithm: 'Hlavička algoritmu na řádku {line} musí mít tvar ALGORITMUS/ALGORITHM název(parametry): a musí být první.',
                iteratorQuestion: 'Další prvek v {iterable}?',
                nextIterator: 'další prvek z {iterable}',
                condition: 'Podmínka',
                yes: 'Ano',
                no: 'Ne',
                startNode: 'Start',
                endNode: 'Konec'
            },
            en: {
                documentTitle: 'Algorithms & Flowcharts | Learning Tool',
                appTitle: 'Algorithms & Flowcharts',
                languageSelector: 'Language selector',
                algorithmLabel: 'Algorithm:',
                loadJson: 'Load JSON',
                saveJsonButton: 'Save JSON',
                saveJson: 'Save pseudocode as JSON',
                prepareExecution: 'Prepare for stepping',
                start: 'Start',
                play: 'Run',
                pause: 'Pause',
                step: 'Step',
                previousStep: 'Previous step',
                pseudocodePane: '1. Pseudocode / Structure',
                algorithm: 'Algorithm',
                pseudocodeWarningTitle: 'Highlights unknown uppercase words at the beginning of a line; ordinary assignments are ignored.',
                supportedTerms: 'Supported pseudocode terms',
                termAlgorithm: '<code class="text-indigo-300">ALGORITHM name(...):</code> — algorithm header',
                termIf: '<code class="text-indigo-300">IF</code> — condition',
                termElse: '<code class="text-indigo-300">ELSE</code> — alternative branch',
                termWhile: '<code class="text-indigo-300">WHILE</code> — conditional loop',
                termForEach: '<code class="text-indigo-300">FOR item IN collection</code> — iterate over a collection',
                termForCount: '<code class="text-indigo-300">FOR i FROM start TO end</code> — counted loop (hexagon)',
                termReturn: '<code class="text-indigo-300">RETURN value</code> — return a function result (parallelogram)',
                termWrite: '<code class="text-indigo-300">WRITE value</code> — print a value',
                termInput: '<code class="text-indigo-300">INPUT variable</code> — read text input (parallelogram)',
                termIndent: 'End blocks with a colon and indent them; other lines appear as steps.',
                termPythonGeneration: 'Python is generated between the comments <code class="text-indigo-300"># BEGIN GENERATED CODE</code> and <code class="text-indigo-300"># END GENERATED CODE</code>.',
                termWarning: 'Unknown uppercase words at the start of a line are underlined in red; this is only a hint.',
                resizeHelp: 'Resize help panel',
                resizePythonEditor: 'Resize Python editor and variable inspector',
                resizeVariableConsole: 'Resize variable panel and console',
                diagramPane: '2. Flowchart',
                diagramGenerated: 'Generated',
                diagramOk: 'Diagram OK',
                diagramError: 'Pseudocode error',
                diagramCreateError: 'Could not create the diagram. Please fix the pseudocode.',
                diagramRenderError: 'Could not render the diagram. Check the pseudocode syntax.',
                zoomOut: 'Zoom out',
                zoomIn: 'Zoom in',
                fitDiagram: 'Fit diagram to pane',
                pythonPane: '3. Python Code & Visualization',
                generatePythonButton: 'Generate Python',
                pythonGenerated: 'Python generated',
                pythonNeedsGeneration: 'Pseudocode changed; regenerate Python',
                pythonGenerationError: 'Could not generate Python',
                pythonMarkersMissing: 'Add the comments # BEGIN GENERATED CODE and # END GENERATED CODE to the editor.',
                pythonMarkersInvalid: 'Generated-code markers must be one correctly ordered pair.',
                pyodideLoading: 'Loading Pyodide...',
                pyodideReady: 'Python ready',
                pyodideError: 'Error loading Python',
                variables: 'Variable Inspector',
                stepCounter: 'Step: {current} / {total}',
                variable: 'Variable',
                value: 'Value',
                startStepping: 'Start stepping...',
                noVariables: 'No local variables',
                console: 'Console (stdout)',
                saveError: 'Could not save the selected algorithm.',
                invalidJson: 'The JSON file has an invalid format. Expected a name and a pseudocode array with line text and indentation.',
                jsonReadError: 'Could not read the JSON file.',
                pyodideNotReady: 'Pyodide is still loading. Please wait.',
                noExecutionSteps: 'No execution steps were recorded for this code block.',
                pythonRuntimeError: 'Python runtime error:',
                unknownTerms: 'Unknown control terms: {count}',
                malformedElse: 'The alternative branch "{line}" must be written as ELSE:.',
                malformedBlock: 'Could not parse pseudocode at line: {line}',
                malformedInput: 'The INPUT command on line {line} must have the form INPUT variable.',
                missingColon: 'Header "{line}" must end with a colon.',
                malformedAlgorithm: 'The algorithm header on line {line} must be ALGORITHM name(parameters): and must come first.',
                iteratorQuestion: 'Next item in {iterable}?',
                nextIterator: 'next item from {iterable}',
                condition: 'Condition',
                yes: 'Yes',
                no: 'No',
                startNode: 'Start',
                endNode: 'End'
            },
            eo: {
                documentTitle: 'Algoritmoj kaj fluodiagramoj | Lernilo',
                appTitle: 'Algoritmoj kaj fluodiagramoj',
                languageSelector: 'Lingvoelektilo',
                algorithmLabel: 'Algoritmo:',
                loadJson: 'Ŝargi JSON',
                saveJsonButton: 'Konservi JSON',
                saveJson: 'Konservi pseŭdokodon kiel JSON',
                prepareExecution: 'Prepari por paŝa rulado',
                start: 'Starti',
                play: 'Ruli',
                pause: 'Paŭzi',
                step: 'Paŝo',
                previousStep: 'Antaŭa paŝo',
                pseudocodePane: '1. Pseŭdokodo / Strukturo',
                algorithm: 'Algoritmo',
                pseudocodeWarningTitle: 'Markas nekonatajn vortojn per majuskloj ĉe la komenco de linio; ordinaraj atribuoj estas ignorataj.',
                supportedTerms: 'Subtenataj pseŭdokodaj terminoj',
                termAlgorithm: '<code class="text-indigo-300">ALGORITMUS název(...):</code> / <code class="text-indigo-300">ALGORITHM name(...):</code> — algoritmo-kapo',
                termIf: '<code class="text-indigo-300">POKUD</code> / <code class="text-indigo-300">IF</code> — kondiĉo',
                termElse: '<code class="text-indigo-300">JINAK</code> / <code class="text-indigo-300">ELSE</code> — alternativa branĉo',
                termWhile: '<code class="text-indigo-300">DOKUD</code> / <code class="text-indigo-300">WHILE</code> — kondiĉa iteracio',
                termForEach: '<code class="text-indigo-300">PRO prvek V kolekce</code> / <code class="text-indigo-300">FOR prvek IN collection</code> — trairi kolekton',
                termForCount: '<code class="text-indigo-300">PRO i OD začátek DO konec</code> / <code class="text-indigo-300">FOR i FROM start TO end</code> — nombrila iteracio (seslatero)',
                termReturn: '<code class="text-indigo-300">VRAT hodnota</code> / <code class="text-indigo-300">RETURN value</code> — redoni funkcir rezulton (paralelogramo)',
                termWrite: '<code class="text-indigo-300">VYPIS hodnota</code> / <code class="text-indigo-300">WRITE value</code> — presi valoron',
                termInput: '<code class="text-indigo-300">VSTUP proměnná</code> / <code class="text-indigo-300">INPUT variable</code> — legi tekstan enigon (paralelogramo)',
                termIndent: 'Finu blokojn per dupunkto kaj indentu ilin; aliaj linioj aperas kiel paŝoj.',
                termPythonGeneration: 'Python estas generata inter la komentoj <code class="text-indigo-300"># BEGIN GENERATED CODE</code> kaj <code class="text-indigo-300"># END GENERATED CODE</code>.',
                termWarning: 'Nekonataj majusklaj vortoj ĉe la komenco de linio estas substrekataj ruĝe; tio estas nur averto.',
                resizeHelp: 'Ŝanĝi altecon de helpo',
                resizePythonEditor: 'Ŝanĝi altecon de Python-redaktilo kaj variabla inspektilo',
                resizeVariableConsole: 'Ŝanĝi altecon de variabla panelo kaj konzolo',
                diagramPane: '2. Fluodiagramo',
                diagramGenerated: 'Generita',
                diagramOk: 'Diagramo preta',
                diagramError: 'Pseŭdokoda eraro',
                diagramCreateError: 'Ne eblis krei diagramon. Korektu la pseŭdokodon.',
                diagramRenderError: 'Ne eblis bildigi la diagramon. Kontrolu la pseŭdokodan sintakson.',
                zoomOut: 'Malzomi diagramon',
                zoomIn: 'Zomi diagramon',
                fitDiagram: 'Adapti diagramon al la panelo',
                pythonPane: '3. Python-kodo kaj bildigo',
                generatePythonButton: 'Generi Python',
                pythonGenerated: 'Python generita',
                pythonNeedsGeneration: 'Pseŭdokodo ŝanĝiĝis; regeneru Python',
                pythonGenerationError: 'Ne eblis generi Python',
                pythonMarkersMissing: 'Aldonu la komentojn # BEGIN GENERATED CODE kaj # END GENERATED CODE al la redaktilo.',
                pythonMarkersInvalid: 'La markiloj de generita kodo devas esti unu ĝuste ordigita paro.',
                pyodideLoading: 'Ŝargante Pyodide...',
                pyodideReady: 'Python preta',
                pyodideError: 'Eraro dum ŝargado de Python',
                variables: 'Variabla inspektilo',
                stepCounter: 'Paŝo: {current} / {total}',
                variable: 'Variablo',
                value: 'Valoro',
                startStepping: 'Komencu paŝan ruladon...',
                noVariables: 'Neniuj lokaj variabloj',
                console: 'Konzolo (stdout)',
                saveError: 'Ne eblis konservi la elektitan algoritmon.',
                invalidJson: 'La JSON-dosiero havas nevalidan formaton. Atendata estas nomo kaj pseŭdokoda tabelo kun linia teksto kaj indento.',
                jsonReadError: 'Ne eblis legi la JSON-dosieron.',
                pyodideNotReady: 'Pyodide ankoraŭ ŝargiĝas. Bonvolu atendi.',
                noExecutionSteps: 'Neniu rula paŝo estis registrita por ĉi tiu kodbloko.',
                pythonRuntimeError: 'Python-rultempa eraro:',
                unknownTerms: 'Nekonataj stiraj terminoj: {count}',
                malformedElse: 'La alternativa branĉo "{line}" devas esti skribita kiel JINAK: aŭ ELSE:.',
                malformedBlock: 'Ne eblis analizi pseŭdokodon ĉe linio: {line}',
                malformedInput: 'La komando VSTUP/INPUT ĉe linio {line} devas havi la formon INPUT variable.',
                missingColon: 'La kaplinio "{line}" devas finiĝi per dupunkto.',
                malformedAlgorithm: 'La algoritmo-kapo ĉe linio {line} devas havi la formon ALGORITMUS aŭ ALGORITHM nomo(parametroj): kaj esti la unua.',
                iteratorQuestion: 'Ĉu estas plia elemento en {iterable}?',
                nextIterator: 'plia elemento el {iterable}',
                condition: 'Kondiĉo',
                yes: 'Jes',
                no: 'Ne',
                startNode: 'Starto',
                endNode: 'Fino'
            },
            fr: {
                documentTitle: 'Algorithmes et organigrammes | Outil pédagogique',
                appTitle: 'Algorithmes et organigrammes',
                languageSelector: 'Sélecteur de langue',
                algorithmLabel: 'Algorithme :',
                loadJson: 'Charger JSON',
                saveJsonButton: 'Enregistrer JSON',
                saveJson: 'Enregistrer le pseudocode au format JSON',
                prepareExecution: 'Préparer le pas à pas',
                start: 'Démarrer',
                play: 'Exécuter',
                pause: 'Pause',
                step: 'Étape',
                previousStep: 'Étape précédente',
                pseudocodePane: '1. Pseudocode / Structure',
                algorithm: 'Algorithme',
                pseudocodeWarningTitle: 'Signale les mots inconnus en majuscules au début d’une ligne ; les affectations ordinaires sont ignorées.',
                supportedTerms: 'Termes de pseudocode pris en charge',
                termAlgorithm: '<code class="text-indigo-300">ALGORITMUS název(...):</code> / <code class="text-indigo-300">ALGORITHM name(...):</code> — en-tête d’algorithme',
                termIf: '<code class="text-indigo-300">POKUD</code> / <code class="text-indigo-300">IF</code> — condition',
                termElse: '<code class="text-indigo-300">JINAK</code> / <code class="text-indigo-300">ELSE</code> — branche alternative',
                termWhile: '<code class="text-indigo-300">DOKUD</code> / <code class="text-indigo-300">WHILE</code> — boucle conditionnelle',
                termForEach: '<code class="text-indigo-300">PRO prvek V kolekce</code> / <code class="text-indigo-300">FOR prvek IN collection</code> — parcourir une collection',
                termForCount: '<code class="text-indigo-300">PRO i OD začátek DO konec</code> / <code class="text-indigo-300">FOR i FROM start TO end</code> — boucle compteur (hexagone)',
                termReturn: '<code class="text-indigo-300">VRAT hodnota</code> / <code class="text-indigo-300">RETURN value</code> — renvoyer le résultat d’une fonction (parallélogramme)',
                termWrite: '<code class="text-indigo-300">VYPIS hodnota</code> / <code class="text-indigo-300">WRITE value</code> — afficher une valeur',
                termInput: '<code class="text-indigo-300">VSTUP proměnná</code> / <code class="text-indigo-300">INPUT variable</code> — lire une entrée textuelle (parallélogramme)',
                termIndent: 'Terminez les blocs par deux-points et indentez-les ; les autres lignes apparaissent comme des étapes.',
                termPythonGeneration: 'Python est généré entre les commentaires <code class="text-indigo-300"># BEGIN GENERATED CODE</code> et <code class="text-indigo-300"># END GENERATED CODE</code>.',
                termWarning: 'Les mots inconnus en majuscules au début d’une ligne sont soulignés en rouge ; il s’agit seulement d’un avertissement.',
                resizeHelp: 'Modifier la hauteur de l’aide',
                resizePythonEditor: 'Modifier la hauteur de l’éditeur Python et de l’inspecteur de variables',
                resizeVariableConsole: 'Modifier la hauteur du panneau des variables et de la console',
                diagramPane: '2. Organigramme',
                diagramGenerated: 'Généré',
                diagramOk: 'Diagramme prêt',
                diagramError: 'Erreur de pseudocode',
                diagramCreateError: 'Impossible de créer le diagramme. Corrigez le pseudocode.',
                diagramRenderError: 'Impossible d’afficher le diagramme. Vérifiez la syntaxe du pseudocode.',
                zoomOut: 'Dézoomer le diagramme',
                zoomIn: 'Zoomer le diagramme',
                fitDiagram: 'Adapter le diagramme au panneau',
                pythonPane: '3. Code Python et visualisation',
                generatePythonButton: 'Générer Python',
                pythonGenerated: 'Python généré',
                pythonNeedsGeneration: 'Pseudocode modifié ; régénérez Python',
                pythonGenerationError: 'Impossible de générer Python',
                pythonMarkersMissing: 'Ajoutez les commentaires # BEGIN GENERATED CODE et # END GENERATED CODE dans l’éditeur.',
                pythonMarkersInvalid: 'Les marqueurs du code généré doivent former une seule paire dans le bon ordre.',
                pyodideLoading: 'Chargement de Pyodide...',
                pyodideReady: 'Python prêt',
                pyodideError: 'Erreur lors du chargement de Python',
                variables: 'Inspecteur de variables',
                stepCounter: 'Étape : {current} / {total}',
                variable: 'Variable',
                value: 'Valeur',
                startStepping: 'Lancez le pas à pas...',
                noVariables: 'Aucune variable locale',
                console: 'Console (stdout)',
                saveError: 'Impossible d’enregistrer l’algorithme sélectionné.',
                invalidJson: 'Le fichier JSON a un format invalide. Un nom et un tableau de pseudocode avec le texte et l’indentation de chaque ligne sont requis.',
                jsonReadError: 'Impossible de lire le fichier JSON.',
                pyodideNotReady: 'Pyodide est en cours de chargement. Veuillez patienter.',
                noExecutionSteps: 'Aucune étape d’exécution n’a été enregistrée pour ce bloc de code.',
                pythonRuntimeError: 'Erreur d’exécution Python :',
                unknownTerms: 'Termes de contrôle inconnus : {count}',
                malformedElse: 'La branche alternative « {line} » doit être écrite JINAK: ou ELSE:.',
                malformedBlock: 'Impossible d’analyser le pseudocode à la ligne : {line}',
                malformedInput: 'La commande VSTUP/INPUT à la ligne {line} doit avoir la forme INPUT variable.',
                missingColon: 'L’en-tête « {line} » doit se terminer par deux-points.',
                malformedAlgorithm: 'L’en-tête d’algorithme à la ligne {line} doit avoir la forme ALGORITMUS ou ALGORITHM nom(paramètres): et être en premier.',
                iteratorQuestion: 'Y a-t-il un autre élément dans {iterable} ?',
                nextIterator: 'élément suivant de {iterable}',
                condition: 'Condition',
                yes: 'Oui',
                no: 'Non',
                startNode: 'Début',
                endNode: 'Fin'
            },
            sk: {
                documentTitle: 'Algoritmy a vývojové diagramy | Výučbový nástroj',
                appTitle: 'Algoritmy a vývojové diagramy',
                languageSelector: 'Výber jazyka',
                algorithmLabel: 'Algoritmus:',
                loadJson: 'Načítať JSON',
                saveJsonButton: 'Uložiť JSON',
                saveJson: 'Uložiť pseudokód ako JSON',
                prepareExecution: 'Pripraviť na krokovanie',
                start: 'Štart',
                play: 'Spustiť',
                pause: 'Pauza',
                step: 'Krok',
                previousStep: 'Predchádzajúci krok',
                pseudocodePane: '1. Pseudokód / Štruktúra',
                algorithm: 'Algoritmus',
                pseudocodeWarningTitle: 'Označuje neznáme slová písané veľkými písmenami na začiatku riadka; bežné priradenia ignoruje.',
                supportedTerms: 'Podporované termíny pseudokódu',
                termAlgorithm: '<code class="text-indigo-300">ALGORITMUS název(...):</code> / <code class="text-indigo-300">ALGORITHM name(...):</code> — hlavička algoritmu',
                termIf: '<code class="text-indigo-300">POKUD</code> / <code class="text-indigo-300">IF</code> — podmienka',
                termElse: '<code class="text-indigo-300">JINAK</code> / <code class="text-indigo-300">ELSE</code> — alternatívna vetva',
                termWhile: '<code class="text-indigo-300">DOKUD</code> / <code class="text-indigo-300">WHILE</code> — podmienený cyklus',
                termForEach: '<code class="text-indigo-300">PRO prvek V kolekce</code> / <code class="text-indigo-300">FOR prvek IN collection</code> — prechod kolekciou',
                termForCount: '<code class="text-indigo-300">PRO i OD začátek DO konec</code> / <code class="text-indigo-300">FOR i FROM start TO end</code> — počítaný cyklus (šesťuholník)',
                termReturn: '<code class="text-indigo-300">VRAT hodnota</code> / <code class="text-indigo-300">RETURN value</code> — odovzdanie výsledku funkcie (rovnobežník)',
                termWrite: '<code class="text-indigo-300">VYPIS hodnota</code> / <code class="text-indigo-300">WRITE value</code> — výpis hodnoty',
                termInput: '<code class="text-indigo-300">VSTUP premenná</code> / <code class="text-indigo-300">INPUT variable</code> — načítanie textového vstupu (rovnobežník)',
                termIndent: 'Bloky ukončite dvojbodkou a odsadzujte; ostatné riadky sa zobrazia ako kroky.',
                termPythonGeneration: 'Python sa generuje medzi komentármi <code class="text-indigo-300"># BEGIN GENERATED CODE</code> a <code class="text-indigo-300"># END GENERATED CODE</code>.',
                termWarning: 'Neznáme veľké slová na začiatku riadka sú podčiarknuté červenou; upozornenie je iba orientačné.',
                resizeHelp: 'Zmeniť výšku pomocníka',
                resizePythonEditor: 'Zmeniť výšku editora Pythonu a inšpektora premenných',
                resizeVariableConsole: 'Zmeniť výšku panela premenných a konzoly',
                diagramPane: '2. Vývojový diagram',
                diagramGenerated: 'Vygenerované',
                diagramOk: 'Diagram OK',
                diagramError: 'Chyba pseudokódu',
                diagramCreateError: 'Diagram sa nepodarilo vytvoriť. Opravte pseudokód.',
                diagramRenderError: 'Diagram sa nepodarilo vykresliť. Skontrolujte syntax pseudokódu.',
                zoomOut: 'Oddialiť diagram',
                zoomIn: 'Priblížiť diagram',
                fitDiagram: 'Prispôsobiť diagram ploche',
                pythonPane: '3. Python kód a vizualizácia',
                generatePythonButton: 'Generovať Python',
                pythonGenerated: 'Python vygenerovaný',
                pythonNeedsGeneration: 'Pseudokód sa zmenil; vygenerujte Python',
                pythonGenerationError: 'Python sa nepodarilo vygenerovať',
                pythonMarkersMissing: 'Vložte do editora komentáre # BEGIN GENERATED CODE a # END GENERATED CODE.',
                pythonMarkersInvalid: 'Komentáre generovaného kódu musia tvoriť jeden pár v správnom poradí.',
                pyodideLoading: 'Načítava sa Pyodide...',
                pyodideReady: 'Python je pripravený',
                pyodideError: 'Chyba pri načítaní Pythonu',
                variables: 'Inšpektor premenných',
                stepCounter: 'Krok: {current} / {total}',
                variable: 'Premenná',
                value: 'Hodnota',
                startStepping: 'Spustite krokovanie...',
                noVariables: 'Žiadne lokálne premenné',
                console: 'Konzola (stdout)',
                saveError: 'Vybraný algoritmus sa nepodarilo uložiť.',
                invalidJson: 'Súbor JSON má neplatný formát. Očakáva sa názov a pole riadkov pseudokódu s textom a odsadením.',
                jsonReadError: 'Súbor JSON sa nepodarilo načítať.',
                pyodideNotReady: 'Pyodide sa ešte načítava. Počkajte, prosím.',
                noExecutionSteps: 'Pre tento blok kódu nebol zaznamenaný žiadny krok vykonávania.',
                pythonRuntimeError: 'Chyba pri vykonávaní Pythonu:',
                unknownTerms: 'Neznáme riadiace výrazy: {count}',
                malformedElse: 'Alternatívna vetva "{line}" musí byť zapísaná ako JINAK: alebo ELSE:.',
                malformedBlock: 'Pseudokód sa nepodarilo spracovať na riadku: {line}',
                malformedInput: 'Príkaz VSTUP/INPUT na riadku {line} musí mať tvar INPUT variable.',
                missingColon: 'Hlavička "{line}" musí končiť dvojbodkou.',
                malformedAlgorithm: 'Hlavička algoritmu na riadku {line} musí mať tvar ALGORITMUS/ALGORITHM názov(parametre): a musí byť prvá.',
                iteratorQuestion: 'Je ďalší prvok v {iterable}?',
                nextIterator: 'ďalší prvok z {iterable}',
                condition: 'Podmienka',
                yes: 'Áno',
                no: 'Nie',
                startNode: 'Štart',
                endNode: 'Koniec'
            }
        };

        // --- 2. GLOBAL STATE ---
        const importedTemplateKey = '__imported__';
        let currentLanguage = 'en';
        let importedTemplate = null;
        let diagramStatusKey = 'diagramGenerated';
        let pythonGenerationStatusKey = 'pythonGenerated';
        let pythonGenerationErrorDetail = '';
        let pyodideStatusKey = 'pyodideLoading';
        let pyEditor, pseudoEditor;
        let pythonCodeRevision = 0;
        let pythonCodeDirty = false;
        let isSettingPythonProgrammatically = false;
        let pyodideInstance = null;
        let executionTrace = [];
        let currentStepIndex = -1;
        let isPlaying = false;
        let playInterval = null;
        let diagramZoom = 1;
        let diagramResizeObserver = null;
        let pseudocodeDiagramUpdateTimer = null;
        let pseudocodePythonUpdateTimer = null;
        let diagramRenderVersion = 0;
        const pseudocodeDiagramUpdateDelay = 350;
        const supportedPseudocodeLeadingTerms = new Set([
            'ALGORITMUS', 'ALGORITHM', 'POKUD', 'IF', 'JINAK', 'ELSE', 'DOKUD', 'WHILE',
            'PRO', 'FOR', 'VRAT', 'RETURN', 'VYPIS', 'WRITE', 'VSTUP', 'INPUT'
        ]);

        function translate(key, values = {}) {
            let text = translations[currentLanguage][key];
            for (const [name, value] of Object.entries(values)) {
                text = text.replaceAll(`{${name}}`, value);
            }
            return text;
        }

        function setDiagramStatus(key) {
            diagramStatusKey = key;
            const status = document.getElementById('mermaidStatus');
            status.innerText = translate(key);
            status.className = key === 'diagramOk'
                ? 'text-[10px] text-emerald-400'
                : key === 'diagramGenerated'
                    ? 'text-[10px] text-slate-400'
                    : 'text-[10px] text-rose-400';
        }

        function renderPyodideStatus() {
            const status = document.getElementById('pyodideStatus');
            const icon = pyodideStatusKey === 'pyodideLoading'
                ? '<i class="fa-solid fa-spinner fa-spin"></i>'
                : pyodideStatusKey === 'pyodideReady'
                    ? '<i class="fa-solid fa-circle-check"></i>'
                    : '';
            status.innerHTML = `${icon}<span>${translate(pyodideStatusKey)}</span>`;
            status.className = pyodideStatusKey === 'pyodideReady'
                ? 'text-[10px] text-emerald-400 flex items-center space-x-1'
                : pyodideStatusKey === 'pyodideError'
                    ? 'text-[10px] text-rose-400 flex items-center space-x-1'
                    : 'text-[10px] text-amber-400 flex items-center space-x-1';
        }

        function setPythonGenerationStatus(key, detail = '') {
            pythonGenerationStatusKey = key;
            pythonGenerationErrorDetail = detail;
            const status = document.getElementById('pythonGenerationStatus');
            if (!status) return;
            status.textContent = translate(key);
            status.title = detail;
            status.className = key === 'pythonGenerated'
                ? 'max-w-[200px] truncate text-[10px] text-emerald-400'
                : key === 'pythonGenerationError'
                    ? 'max-w-[200px] truncate text-[10px] text-rose-400'
                    : 'max-w-[200px] truncate text-[10px] text-amber-300';
        }

        function applyLanguage(language, refreshDiagram = true) {
            if (!Object.hasOwn(translations, language)) return;
            currentLanguage = language;
            document.documentElement.lang = language;
            document.title = translate('documentTitle');

            document.querySelectorAll('[data-i18n]').forEach(element => {
                const text = translate(element.dataset.i18n);
                if (element.dataset.i18nHtml === 'true') {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            });
            document.querySelectorAll('[data-i18n-title]').forEach(element => {
                element.title = translate(element.dataset.i18nTitle);
            });
            document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
                element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabel));
            });
            document.querySelectorAll('.language-button').forEach(button => {
                button.setAttribute('aria-pressed', String(button.dataset.language === language));
            });

            populateTemplateSelect();
            document.getElementById('playText').textContent = translate(isPlaying ? 'pause' : 'play');
            setDiagramStatus(diagramStatusKey);
            renderPyodideStatus();
            setPythonGenerationStatus(pythonGenerationStatusKey, pythonGenerationErrorDetail);
            document.getElementById('stepCounter').textContent = translate('stepCounter', {
                current: currentStepIndex < 0 ? 0 : currentStepIndex + 1,
                total: executionTrace.length
            });
            updatePseudocodeWarning();
            if (executionTrace.length === 0) {
                document.getElementById('varInspector').innerHTML =
                    `<span class="text-slate-500 italic text-[11px]">${translate('startStepping')}</span>`;
            }
            if (refreshDiagram && pseudoEditor) updateDiagramFromPseudocode();
        }

        function getUnknownPseudocodeControlWord(line) {
            const match = line.match(/^[\t ]*([\p{L}_][\p{L}\p{N}_]*)/u);
            if (!match) return null;

            const word = match[1];
            const normalizedWord = word.toLocaleUpperCase('cs-CZ');
            const isUppercase = word === normalizedWord;
            const isAssignment = /^\s*(?:=|←)/u.test(line.slice(match[0].length));
            if (!isUppercase || word.length < 2
                || supportedPseudocodeLeadingTerms.has(normalizedWord)
                || isAssignment) {
                return null;
            }
            return word;
        }

        CodeMirror.defineMode('pseudocode', () => ({
            startState: () => ({ atLineStart: true }),
            copyState: state => ({ atLineStart: state.atLineStart }),
            token(stream, state) {
                if (stream.sol()) state.atLineStart = true;
                if (stream.eatSpace()) return null;
                if (state.atLineStart) {
                    state.atLineStart = false;
                    const match = stream.match(/[\p{L}_][\p{L}\p{N}_]*/u);
                    if (match) {
                        return getUnknownPseudocodeControlWord(stream.string) === match[0]
                            ? 'unknown-control'
                            : null;
                    }
                }
                stream.skipToEnd();
                return null;
            }
        }));

        // Initialize CodeMirror Editors
        window.addEventListener('DOMContentLoaded', () => {
            // Pseudocode Editor
            pseudoEditor = CodeMirror.fromTextArea(document.getElementById('pseudocodeEditor'), {
                mode: 'pseudocode',
                theme: 'dracula',
                lineNumbers: true,
                lineWrapping: true
            });
            pseudoEditor.on('change', () => {
                updatePseudocodeWarning();
                scheduleDiagramUpdate();
                schedulePythonGeneration();
            });

            // Python Editor
            pyEditor = CodeMirror.fromTextArea(document.getElementById('pythonEditor'), {
                mode: 'python',
                theme: 'dracula',
                lineNumbers: true,
                lineWrapping: true
            });
            pyEditor.on('change', () => {
                pythonCodeRevision++;
                resetExecutionState();
                if (!isSettingPythonProgrammatically) {
                    pythonCodeDirty = true;
                    setPythonGenerationStatus('pythonNeedsGeneration');
                }
            });

            // Init Mermaid
            mermaid.initialize({
                startOnLoad: false,
                theme: 'dark',
                securityLevel: 'loose',
                flowchart: { curve: 'basis' }
            });
            document.querySelectorAll('.language-button').forEach(button => {
                button.addEventListener('click', () => applyLanguage(button.dataset.language));
            });
            applyLanguage('en', false);
            loadTemplate(document.getElementById('templateSelect').value);
            document.getElementById('jsonFileInput').addEventListener('change', event => {
                const [file] = event.target.files;
                if (file) importAlgorithmJson(file);
                event.target.value = '';
            });
            diagramResizeObserver = new ResizeObserver(() => applyDiagramZoom());
            diagramResizeObserver.observe(document.getElementById('diagramContainer'));

            // Initialize Pyodide WASM
            initPyodide();

            // Handle speed slider change
            document.getElementById('speedSlider').addEventListener('input', (e) => {
                const val = e.target.value;
                document.getElementById('speedVal').innerText = `${val}ms`;
                if (isPlaying) {
                    stopPlay();
                    startPlay();
                }
            });
        });

        function updatePseudocodeWarning() {
            const unknownTerms = pseudoEditor.getValue()
                .split('\n')
                .filter(line => getUnknownPseudocodeControlWord(line));
            const warning = document.getElementById('pseudocodeWarning');
            warning.textContent = unknownTerms.length
                ? translate('unknownTerms', { count: unknownTerms.length })
                : '';
            warning.classList.toggle('hidden', unknownTerms.length === 0);
        }

        function scheduleDiagramUpdate() {
            clearTimeout(pseudocodeDiagramUpdateTimer);
            pseudocodeDiagramUpdateTimer = setTimeout(
                updateDiagramFromPseudocode,
                pseudocodeDiagramUpdateDelay
            );
        }

        function schedulePythonGeneration() {
            clearTimeout(pseudocodePythonUpdateTimer);
            pseudocodePythonUpdateTimer = setTimeout(() => {
                if (pythonCodeDirty) {
                    setPythonGenerationStatus('pythonNeedsGeneration');
                } else {
                    generatePythonFromPseudocode();
                }
            }, pseudocodeDiagramUpdateDelay);
        }

        function populateTemplateSelect() {
            const select = document.getElementById('templateSelect');
            const selectedKey = select.value;
            const options = Object.entries(templates).map(([key, template]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = template.name;
                return option;
            });
            if (importedTemplate) {
                const option = document.createElement('option');
                option.value = importedTemplateKey;
                option.textContent = importedTemplate.name;
                options.push(option);
            }
            select.replaceChildren(...options);
            if (templates[selectedKey] || (selectedKey === importedTemplateKey && importedTemplate)) {
                select.value = selectedKey;
            }
        }

        // Load Algorithm Templates
        function loadTemplate(key) {
            if (key === importedTemplateKey && importedTemplate) {
                clearTimeout(pseudocodeDiagramUpdateTimer);
                clearTimeout(pseudocodePythonUpdateTimer);
                pseudoEditor.setValue(importedTemplate.pseudocode);
                clearTimeout(pseudocodeDiagramUpdateTimer);
                clearTimeout(pseudocodePythonUpdateTimer);
                updateDiagramFromPseudocode();
                if (pythonCodeDirty) {
                    setPythonGenerationStatus('pythonNeedsGeneration');
                } else {
                    generatePythonFromPseudocode();
                }
                resetExecutionState();
                return;
            }

            const tmpl = templates[key];
            if (!tmpl) return;

            clearTimeout(pseudocodeDiagramUpdateTimer);
            clearTimeout(pseudocodePythonUpdateTimer);
            pseudoEditor.setValue(tmpl.pseudocode);
            isSettingPythonProgrammatically = true;
            try {
                pyEditor.setValue(tmpl.python);
            } finally {
                isSettingPythonProgrammatically = false;
            }
            pythonCodeDirty = false;
            clearTimeout(pseudocodeDiagramUpdateTimer);
            clearTimeout(pseudocodePythonUpdateTimer);
            updateDiagramFromPseudocode();
            generatePythonFromPseudocode();

            resetExecutionState();
        }

        async function importAlgorithmJson(file) {
            let contents;
            try {
                contents = await file.text();
            } catch (error) {
                console.error('JSON Import Read Error:', error);
                alert(translate('jsonReadError'));
                return;
            }

            let data;
            try {
                data = JSON.parse(contents);
            } catch {
                alert(translate('invalidJson'));
                return;
            }

            const isValid = data !== null
                && typeof data === 'object'
                && typeof data.name === 'string'
                && data.name.trim().length > 0
                && Array.isArray(data.pseudocode)
                && data.pseudocode.every(line =>
                    line !== null
                    && typeof line === 'object'
                    && typeof line.text === 'string'
                    && !/[\r\n]/.test(line.text)
                    && Number.isSafeInteger(line.indent)
                    && line.indent >= 0
                    && line.indent <= 10000
                );
            if (!isValid) {
                alert(translate('invalidJson'));
                return;
            }

            importedTemplate = {
                name: data.name,
                pseudocode: data.pseudocode
                    .map(line => `${' '.repeat(line.indent)}${line.text}`)
                    .join('\n')
            };
            populateTemplateSelect();
            const select = document.getElementById('templateSelect');
            select.value = importedTemplateKey;
            loadTemplate(importedTemplateKey);
        }

        function saveSelectedTemplate() {
            const select = document.getElementById('templateSelect');
            const selectedTemplate = select.value === importedTemplateKey
                ? importedTemplate
                : templates[select.value];
            const pseudocode = pseudoEditor.getValue();
            if (!selectedTemplate) {
                alert(translate('saveError'));
                return;
            }

            const fileName = selectedTemplate.name
                .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
                .replace(/[. ]+$/g, '')
                .trim();
            const pseudocodeLines = pseudocode.split(/\r?\n/).map(line => {
                const leadingWhitespace = line.match(/^[\t ]*/)[0];
                return {
                    text: line.slice(leadingWhitespace.length),
                    indent: leadingWhitespace.replace(/\t/g, '    ').length
                };
            });
            const json = JSON.stringify({
                name: selectedTemplate.name,
                pseudocode: pseudocodeLines
            }, null, 2);
            const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName || 'algoritmus'}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        // --- 3. MERMAID FLOWCHART RENDERER ---
        async function renderMermaid(graphDefinition) {
            const renderVersion = ++diagramRenderVersion;
            const target = document.getElementById('mermaidTarget');
            try {
                target.removeAttribute('data-processed');
                target.innerHTML = graphDefinition;
                await mermaid.run({
                    nodes: [target]
                });
                if (renderVersion !== diagramRenderVersion) return;
                diagramZoom = 1;
                applyDiagramZoom(true);
                setDiagramStatus('diagramOk');
            } catch (err) {
                if (renderVersion !== diagramRenderVersion) return;
                console.error("Mermaid Render Error:", err);
                showDiagramError(translate('diagramRenderError'), err);
            }
        }

        function showDiagramError(message, error) {
            diagramRenderVersion++;
            const target = document.getElementById('mermaidTarget');
            const errorMessage = document.createElement('p');
            errorMessage.className = 'max-w-md rounded-lg border border-rose-500/50 bg-rose-950/60 p-4 text-sm text-rose-200';
            errorMessage.setAttribute('role', 'alert');
            errorMessage.textContent = error instanceof Error && error.message
                ? `${message} ${error.message}`
                : message;
            target.replaceChildren(errorMessage);
            target.style.removeProperty('width');
            target.style.removeProperty('height');
            setDiagramStatus('diagramError');
        }

        function applyDiagramZoom(resetScroll = false) {
            const container = document.getElementById('diagramContainer');
            const target = document.getElementById('mermaidTarget');
            const svg = target.querySelector('svg');
            if (!container || !svg) return;

            const viewBox = svg.viewBox.baseVal;
            if (!viewBox.width || !viewBox.height) return;

            const style = getComputedStyle(container);
            const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
            const toolbarSpace = 44;
            const availableWidth = Math.max(1, container.clientWidth - horizontalPadding);
            const availableHeight = Math.max(1, container.clientHeight - verticalPadding - toolbarSpace);
            const canFit = container.clientWidth >= 250 && container.clientHeight >= 400;
            const fitScale = canFit
                ? Math.min(1, availableWidth / viewBox.width, availableHeight / viewBox.height)
                : 1;
            const scale = fitScale * diagramZoom;
            const width = viewBox.width * scale;
            const height = viewBox.height * scale;

            target.style.setProperty('width', `${width}px`);
            target.style.setProperty('height', `${height}px`);
            target.style.setProperty('min-height', '0');
            target.style.setProperty('max-width', 'none');
            target.style.setProperty('flex', '0 0 auto');
            svg.style.setProperty('width', `${width}px`, 'important');
            svg.style.setProperty('height', `${height}px`, 'important');
            svg.style.setProperty('max-width', 'none', 'important');
            svg.style.setProperty('max-height', 'none', 'important');

            if (resetScroll) {
                container.scrollLeft = 0;
                container.scrollTop = 0;
            }
        }

        function zoomDiagram(direction) {
            const container = document.getElementById('diagramContainer');
            const previousWidth = document.getElementById('mermaidTarget').getBoundingClientRect().width;
            const previousHeight = document.getElementById('mermaidTarget').getBoundingClientRect().height;
            diagramZoom = Math.min(4, Math.max(0.25, diagramZoom * (direction > 0 ? 1.2 : 1 / 1.2)));
            applyDiagramZoom();
            const target = document.getElementById('mermaidTarget');
            container.scrollLeft += (target.getBoundingClientRect().width - previousWidth) / 2;
            container.scrollTop += (target.getBoundingClientRect().height - previousHeight) / 2;
        }

        function resetDiagramZoom() {
            diagramZoom = 1;
            applyDiagramZoom(true);
        }

        function parsePseudocode(code) {
            const lines = code.split('\n')
                .map((text, index) => ({
                    indent: text.match(/^[\t ]*/)[0].replace(/\t/g, '    ').length,
                    text: text.trim(),
                    line: index + 1
                }))
                .filter(line => line.text.length > 0);
            const malformedElse = lines.find(line =>
                isElse(line.text) && !/^(?:JINAK|ELSE):$/i.test(line.text)
            );
            if (malformedElse) {
                throw new Error(translate('malformedElse', { line: malformedElse.text }));
            }
            let lineIndex = 0;

            function isIf(line) {
                return /^(POKUD|IF)\b/i.test(line);
            }

            function isWhile(line) {
                return /^(DOKUD|WHILE)\b/i.test(line);
            }

            function isFor(line) {
                return /^(PRO|FOR)\b/i.test(line);
            }

            function isElse(line) {
                return /^(JINAK|ELSE)\b/i.test(line);
            }

            function isAlgorithm(line) {
                return /^(ALGORITMUS|ALGORITHM)\b/i.test(line);
            }

            function parseBlock(indent) {
                const statements = [];
                while (lineIndex < lines.length) {
                    const current = lines[lineIndex];
                    if (current.indent < indent || (current.indent === indent && isElse(current.text))) break;
                    if (current.indent > indent) {
                        if (isElse(current.text)) {
                            throw new Error(translate('malformedBlock', { line: current.text }));
                        }
                        const previousLineIndex = lineIndex;
                        statements.push(...parseBlock(current.indent));
                        if (lineIndex === previousLineIndex) {
                            throw new Error(translate('malformedBlock', { line: current.text }));
                        }
                        continue;
                    }

                    lineIndex++;
                    if (isAlgorithm(current.text)) {
                        const header = current.text.match(/^(?:ALGORITMUS|ALGORITHM)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*:\s*$/i);
                        if (!header || current.indent !== lines[0].indent || statements.length > 0) {
                            throw new Error(translate('malformedAlgorithm', { line: current.line }));
                        }
                        statements.push({
                            type: 'algorithm',
                            name: header[1],
                            parameters: header[2].trim(),
                            text: current.text,
                            line: current.line
                        });
                        continue;
                    }
                    if (/^(?:VSTUP|INPUT)\b/i.test(current.text)) {
                        const input = current.text.match(/^(?:VSTUP|INPUT)\s+([A-Za-z_][A-Za-z0-9_]*)$/i);
                        if (!input) {
                            throw new Error(translate('malformedInput', { line: current.line }));
                        }
                        statements.push({
                            type: 'input',
                            target: input[1],
                            text: current.text,
                            line: current.line
                        });
                        continue;
                    }
                    if (!isIf(current.text) && !isWhile(current.text) && !isFor(current.text)) {
                        statements.push({ type: 'step', text: current.text, line: current.line });
                        continue;
                    }

                    const isLoop = isWhile(current.text) || isFor(current.text);
                    let conditionText = current.text;
                    while (!conditionText.trimEnd().endsWith(':')
                        && lineIndex < lines.length
                        && lines[lineIndex].indent > current.indent
                        && !isElse(lines[lineIndex].text)) {
                        conditionText += ` ${lines[lineIndex].text}`;
                        lineIndex++;
                    }
                    if (!conditionText.trimEnd().endsWith(':')) {
                        throw new Error(translate('missingColon', { line: current.text }));
                    }
                    const statement = {
                        type: isLoop ? 'loop' : 'decision',
                        text: conditionText.replace(/^(POKUD|IF|DOKUD|WHILE|PRO|FOR)\s*/i, '').replace(/:\s*$/, ''),
                        thenBranch: [],
                        elseBranch: [],
                        line: current.line
                    };
                    const iterableHeader = isLoop && conditionText.match(/^(?:PRO|FOR)\s+(.+?)\s+(?:V|IN)\s+(.+?):?$/i);
                    if (iterableHeader) {
                        statement.type = 'forEach';
                        statement.iterator = iterableHeader[1].trim();
                        statement.iterable = iterableHeader[2].trim().replace(/:\s*$/, '');
                        statement.text = translate('iteratorQuestion', { iterable: statement.iterable });
                    } else if (isLoop) {
                        const countedHeader = conditionText.match(
                            /^(?:PRO|FOR)\s+([A-Za-z_][A-Za-z0-9_]*)\s+(?:OD\s+(.+?)\s+DO|FROM\s+(.+?)\s+TO)\s+(.+?):?$/i
                        );
                        if (countedHeader) {
                            statement.type = 'countedLoop';
                            statement.iterator = countedHeader[1];
                            statement.start = countedHeader[2] || countedHeader[3];
                            statement.end = countedHeader[4].replace(/:\s*$/, '');
                        } else if (isFor(current.text)) {
                            throw new Error(translate('malformedBlock', { line: current.text }));
                        }
                    }
                    let thenIndent = null;
                    if (lineIndex < lines.length && lines[lineIndex].indent > current.indent && !isElse(lines[lineIndex].text)) {
                        thenIndent = lines[lineIndex].indent;
                        statement.thenBranch = parseBlock(thenIndent);
                    }
                    if (lineIndex < lines.length
                        && isElse(lines[lineIndex].text)
                        && (lines[lineIndex].indent === current.indent || lines[lineIndex].indent === thenIndent)) {
                        const elseIndent = lines[lineIndex].indent;
                        lineIndex++;
                        if (lineIndex < lines.length && lines[lineIndex].indent > elseIndent) {
                            statement.elseBranch = parseBlock(lines[lineIndex].indent);
                        }
                    }
                    statements.push(statement);
                }
                return statements;
            }

            const statements = lines.length > 0 ? parseBlock(lines[0].indent) : [];
            if (lineIndex < lines.length) {
                throw new Error(translate('malformedBlock', { line: lines[lineIndex].text }));
            }
            return statements;
        }

        function generateMermaidFromPseudocode(code) {
            const statements = parsePseudocode(code);
            let nodeIndex = 0;
            const nodes = [];
            function makeNode(type, text) {
                const node = { id: `N${nodeIndex++}`, type, text };
                nodes.push(node);
                return node;
            }

            const start = makeNode('start', translate('startNode'));
            const end = makeNode('end', translate('endNode'));
            const edges = [];
            const layoutEdges = [];

            function emitBlock(block, incoming) {
                let exits = incoming;
                const pendingLoopLayoutSources = [];
                for (const statement of block) {
                    const deferredLayoutSources = pendingLoopLayoutSources.splice(0);
                    const statementStartIndex = nodes.length;
                    if (statement.type === 'decision' || statement.type === 'loop' || statement.type === 'forEach' || statement.type === 'countedLoop') {
                        const decision = makeNode(statement.type === 'countedLoop' ? 'countedLoop' : 'decision', statement.text || translate('condition'));
                        exits.forEach(edge => edges.push({ from: edge.from, to: decision.id, label: edge.label }));
                        const loopBodyStartIndex = nodes.length;
                        let loopBodyIncoming = [{ from: decision.id, label: translate('yes') }];
                        if (statement.type === 'forEach') {
                            const iteratorStep = makeNode('step', `${statement.iterator} = ${translate('nextIterator', { iterable: statement.iterable })}`);
                            loopBodyIncoming.forEach(edge => edges.push({ from: edge.from, to: iteratorStep.id, label: edge.label }));
                            loopBodyIncoming = [{ from: iteratorStep.id, label: '' }];
                        }
                        const thenExits = emitBlock(statement.thenBranch, loopBodyIncoming);
                        const thenBranchNodes = nodes.slice(loopBodyStartIndex);
                        if (statement.type === 'loop' || statement.type === 'forEach' || statement.type === 'countedLoop') {
                            thenExits.forEach(edge => edges.push({ from: edge.from, to: decision.id, label: edge.label }));
                            exits = [{ from: decision.id, label: translate('no') }];
                            if (thenBranchNodes.length > 0) {
                                pendingLoopLayoutSources.push(...thenBranchNodes.map(node => node.id));
                            }
                        } else {
                            let elseExits = [{ from: decision.id, label: translate('no') }];
                            if (statement.elseBranch.length > 0) {
                                elseExits = emitBlock(statement.elseBranch, [{ from: decision.id, label: translate('no') }]);
                            }
                            exits = [...thenExits, ...elseExits];
                        }
                    } else {
                        const isReturn = /^(?:VRAT|RETURN)(?=\s|$)/i.test(statement.text);
                        const nodeType = statement.type === 'input'
                            ? 'input'
                            : isReturn
                                ? 'return'
                                : 'step';
                        const node = makeNode(nodeType, statement.text);
                        exits.forEach(edge => edges.push({ from: edge.from, to: node.id, label: edge.label }));
                        if (isReturn) {
                            edges.push({ from: node.id, to: end.id, label: '' });
                            exits = [];
                        } else {
                            exits = [{ from: node.id, label: '' }];
                        }
                    }
                    const statementFirstNode = nodes[statementStartIndex];
                    if (statementFirstNode) {
                        deferredLayoutSources.forEach(from => layoutEdges.push({
                            from,
                            to: statementFirstNode.id
                        }));
                    }
                }
                return exits;
            }

            const exits = emitBlock(statements, [{ from: start.id, label: '' }]);
            exits.forEach(edge => edges.push({ from: edge.from, to: end.id, label: edge.label }));

            function escapeLabel(text) {
                return text.replace(/&/g, '#amp;').replace(/"/g, '#quot;').replace(/[{}\[\]]/g, ' ');
            }

            function formatDecisionLabel(text) {
                const maxLineLength = 28;
                const lines = [];
                let line = '';
                text.split(/\s+/).forEach(word => {
                    if (line && line.length + word.length + 1 > maxLineLength) {
                        lines.push(line);
                        line = word;
                    } else {
                        line = line ? `${line} ${word}` : word;
                    }
                });
                if (line) lines.push(line);
                return lines.map(escapeLabel).join('<br/>');
            }

            let mermaidStr = 'graph TD\n';
            nodes.forEach(node => {
                const label = node.type === 'decision'
                    ? formatDecisionLabel(node.text)
                    : escapeLabel(node.text);
                if (node.type === 'decision') {
                    mermaidStr += `  ${node.id}{"${label}"}\n`;
                } else if (node.type === 'countedLoop') {
                    mermaidStr += `  ${node.id}{{"${label}"}}\n`;
                } else if (node.type === 'return') {
                    mermaidStr += `  ${node.id}[/"${label}"/]\n`;
                } else if (node.type === 'input') {
                    mermaidStr += `  ${node.id}[\\${label}\\]\n`;
                } else if (node.type === 'start') {
                    mermaidStr += `  ${node.id}(["${label}"])\n`;
                } else if (node.type === 'end') {
                    mermaidStr += `  ${node.id}(["${label}"])\n`;
                } else {
                    mermaidStr += `  ${node.id}["${label}"]\n`;
                }
            });
            edges.forEach(edge => {
                const label = edge.label ? ` -- ${edge.label} --> ` : ' --> ';
                mermaidStr += `  ${edge.from}${label}${edge.to}\n`;
            });
            layoutEdges.forEach(edge => {
                mermaidStr += `  ${edge.from} ~~~ ${edge.to}\n`;
            });

            return mermaidStr;
        }

        function updateDiagramFromPseudocode() {
            clearTimeout(pseudocodeDiagramUpdateTimer);
            try {
                renderMermaid(generateMermaidFromPseudocode(pseudoEditor.getValue()));
            } catch (error) {
                console.error("Pseudocode Parse Error:", error);
                showDiagramError(translate('diagramCreateError'), error);
            }
        }

        function translatePythonExpression(expression) {
            return expression.split(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g)
                .map((part, index) => {
                    if (index % 2 === 1) return part;
                    return part
                        .replace(/\bMOD\b/gi, '%')
                        .replace(/\bNEBO\b/gi, 'or')
                        .replace(/\bA\b/g, 'and')
                        .replace(/\bAND\b/gi, 'and')
                        .replace(/\bOR\b/gi, 'or')
                        .replace(/\bNOT\b/gi, 'not')
                        .replace(/<>/g, '!=')
                        .replace(/\btrue\b/gi, 'True')
                        .replace(/\bfalse\b/gi, 'False')
                        .replace(/\blength\s*\(/gi, 'len(')
                        .replace(/←/g, '=');
                })
                .join('');
        }

        function toPythonIdentifier(name) {
            const snakeCaseName = name
                .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
                .replace(/[^A-Za-z0-9_]/g, '_')
                .toLowerCase();
            return /^[A-Za-z_]/.test(snakeCaseName) ? snakeCaseName : `_${snakeCaseName}`;
        }

        function generatePythonCode(code) {
            const statements = parsePseudocode(code);
            const algorithmIndex = statements.findIndex(statement => statement.type === 'algorithm');
            const algorithm = algorithmIndex >= 0 ? statements[algorithmIndex] : null;
            const body = statements.filter(statement => statement.type !== 'algorithm');
            const generatedLines = [];

            function appendBlock(block, indentation) {
                if (block.length === 0) {
                    generatedLines.push(`${' '.repeat(indentation)}pass`);
                    return;
                }

                for (const statement of block) {
                    const prefix = ' '.repeat(indentation);
                    if (statement.type === 'decision') {
                        if (!statement.text.trim()) {
                            throw new Error(`Missing condition on line ${statement.line}.`);
                        }
                        generatedLines.push(`${prefix}if ${translatePythonExpression(statement.text)}:`);
                        appendBlock(statement.thenBranch, indentation + 4);
                        if (statement.elseBranch.length > 0) {
                            generatedLines.push(`${prefix}else:`);
                            appendBlock(statement.elseBranch, indentation + 4);
                        }
                        continue;
                    }

                    if (statement.type === 'loop') {
                        if (!statement.text.trim()) {
                            throw new Error(`Missing WHILE condition on line ${statement.line}.`);
                        }
                        if (statement.elseBranch.length > 0) {
                            throw new Error(`An ELSE branch is not supported for loops (line ${statement.line}).`);
                        }
                        generatedLines.push(`${prefix}while ${translatePythonExpression(statement.text)}:`);
                        appendBlock(statement.thenBranch, indentation + 4);
                        continue;
                    }

                    if (statement.type === 'forEach') {
                        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(statement.iterator)
                            || !statement.iterable.trim()) {
                            throw new Error(`Invalid FOR item IN collection header on line ${statement.line}.`);
                        }
                        if (statement.elseBranch.length > 0) {
                            throw new Error(`An ELSE branch is not supported for loops (line ${statement.line}).`);
                        }
                        generatedLines.push(
                            `${prefix}for ${statement.iterator} in ${translatePythonExpression(statement.iterable)}:`
                        );
                        appendBlock(statement.thenBranch, indentation + 4);
                        continue;
                    }

                    if (statement.type === 'countedLoop') {
                        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(statement.iterator)
                            || !statement.start.trim()
                            || !statement.end.trim()) {
                            throw new Error(`Invalid counted FOR header on line ${statement.line}.`);
                        }
                        if (statement.elseBranch.length > 0) {
                            throw new Error(`An ELSE branch is not supported for loops (line ${statement.line}).`);
                        }
                        const start = translatePythonExpression(statement.start);
                        const end = translatePythonExpression(statement.end);
                        generatedLines.push(
                            `${prefix}for ${statement.iterator} in range(${start}, (${end}) + 1):`
                        );
                        appendBlock(statement.thenBranch, indentation + 4);
                        continue;
                    }

                    if (statement.type === 'input') {
                        generatedLines.push(`${prefix}${statement.target} = input()`);
                        continue;
                    }

                    if (statement.type !== 'step') {
                        throw new Error(`Unsupported pseudocode structure on line ${statement.line}.`);
                    }
                    const write = statement.text.match(/^(?:VYPIS|WRITE)(?:\s+([\s\S]*))?$/i);
                    if (write) {
                        if (!write[1]) {
                            throw new Error(`WRITE needs a value on line ${statement.line}.`);
                        }
                        generatedLines.push(`${prefix}print(${translatePythonExpression(write[1])})`);
                        continue;
                    }
                    const result = statement.text.match(/^(?:VRAT|RETURN)(?:\s+([\s\S]*))?$/i);
                    if (result) {
                        generatedLines.push(
                            `${prefix}return${result[1] ? ` ${translatePythonExpression(result[1])}` : ''}`
                        );
                        continue;
                    }
                    if (/^[A-ZČĎĚŇŘŠŤŮŽ][A-Z0-9_ČĎĚŇŘŠŤŮŽ]*\b/.test(statement.text)
                        && !/^[A-Z_][A-Z0-9_]*\s*(?:=|←)/i.test(statement.text)) {
                        throw new Error(`Unsupported pseudocode statement on line ${statement.line}: ${statement.text}`);
                    }
                    generatedLines.push(`${prefix}${translatePythonExpression(statement.text)}`);
                }
            }

            if (algorithm) {
                const parameters = translatePythonExpression(algorithm.parameters);
                generatedLines.push(`def ${toPythonIdentifier(algorithm.name)}(${parameters}):`);
                appendBlock(body, 4);
            } else {
                appendBlock(body, 0);
            }
            return generatedLines.join('\n');
        }

        function generatePythonFromPseudocode() {
            clearTimeout(pseudocodePythonUpdateTimer);
            if (!pseudoEditor || !pyEditor) return;

            try {
                const lines = pyEditor.getValue().split('\n');
                const startMarkers = [];
                const endMarkers = [];
                lines.forEach((line, index) => {
                    if (/^\s*# BEGIN GENERATED CODE\s*$/i.test(line)) startMarkers.push(index);
                    if (/^\s*# END GENERATED CODE\s*$/i.test(line)) endMarkers.push(index);
                });
                if (startMarkers.length === 0 || endMarkers.length === 0) {
                    throw new Error(translate('pythonMarkersMissing'));
                }
                if (startMarkers.length !== 1 || endMarkers.length !== 1
                    || startMarkers[0] >= endMarkers[0]) {
                    throw new Error(translate('pythonMarkersInvalid'));
                }

                const generatedCode = generatePythonCode(pseudoEditor.getValue());
                const updatedLines = [
                    ...lines.slice(0, startMarkers[0] + 1),
                    ...generatedCode.split('\n'),
                    ...lines.slice(endMarkers[0])
                ];
                const updatedCode = updatedLines.join('\n');
                if (updatedCode !== pyEditor.getValue()) {
                    isSettingPythonProgrammatically = true;
                    try {
                        pyEditor.setValue(updatedCode);
                    } finally {
                        isSettingPythonProgrammatically = false;
                    }
                }
                pythonCodeDirty = false;
                setPythonGenerationStatus('pythonGenerated');
            } catch (error) {
                console.error('Python Generation Error:', error);
                setPythonGenerationStatus('pythonGenerationError', error.message);
            }
        }

        // --- 4. PYODIDE & PYTHON EXECUTION TRACER ---
        async function initPyodide() {
            try {
                pyodideInstance = await loadPyodide();
                pyodideStatusKey = 'pyodideReady';
                renderPyodideStatus();
            } catch (e) {
                console.error("Pyodide Init Failed", e);
                pyodideStatusKey = 'pyodideError';
                renderPyodideStatus();
            }
        }

        // Python Tracing wrapper injected dynamically
        const pythonTracerScript = `
import sys
import json

_execution_trace = []
_console_output = []

class CustomStdout:
    def write(self, text):
        if text.strip():
            _console_output.append(text)
    def flush(self):
        pass

sys.stdout = CustomStdout()

def _trace_func(frame, event, arg):
    if event == 'line':
        lineno = frame.f_lineno
        # Filter local variables (exclude internal setup)
        locals_val = {}
        for k, v in frame.f_locals.items():
            if not k.startswith('_'):
                try:
                    locals_val[k] = repr(v)
                except:
                    locals_val[k] = str(v)
        
        _execution_trace.append({
            'line': lineno,
            'locals': locals_val,
            'stdout': list(_console_output)
        })
    return _trace_func

sys.settrace(_trace_func)
sys._getframe().f_trace = _trace_func
`;

        async function initExecution() {
            if (!pyodideInstance) {
                alert(translate('pyodideNotReady'));
                return;
            }

            resetExecutionState();

            const userCode = pyEditor.getValue();
            const executionRevision = pythonCodeRevision;
            const executionPrefix = `\n${pythonTracerScript}\ntry:\n`;
            const wrappedUserCode = userCode.split('\n').map(line => '    ' + line).join('\n');
            const userCodeStartLine = executionPrefix.split('\n').length;
            const fullScript = `${executionPrefix}${wrappedUserCode}\nfinally:\n    sys.settrace(None)`;
            const userCodeLineCount = userCode.split('\n').length;

            try {
                await pyodideInstance.runPythonAsync(fullScript);
                if (executionRevision !== pythonCodeRevision) return;
                
                // Retrieve execution trace from Python context
                const rawTrace = pyodideInstance.globals.get('_execution_trace').toJs({
                    dict_converter: Object.fromEntries
                });
                executionTrace = rawTrace.map(item => ({
                    line: item.line - userCodeStartLine,
                    locals: item.locals,
                    stdout: item.stdout
                })).filter(step => step.line >= 0 && step.line < userCodeLineCount);

                if (executionTrace.length > 0) {
                    executionTrace[executionTrace.length - 1].stdout =
                        pyodideInstance.globals.get('_console_output').toJs();
                    currentStepIndex = 0;
                    updateStepUI();
                    document.getElementById('btnPlay').disabled = false;
                    document.getElementById('btnStepNext').disabled = false;
                    document.getElementById('btnStepPrev').disabled = false;
                } else {
                    alert(translate('noExecutionSteps'));
                }
            } catch (err) {
                if (executionRevision !== pythonCodeRevision) return;
                console.error("Python Execution Error", err);
                document.getElementById('consoleOutput').innerText = `${translate('pythonRuntimeError')}\n${err.message}`;
            }
        }

        // --- 5. STEPPING & UI VISUALIZATION ---
        function updateStepUI() {
            if (currentStepIndex < 0 || currentStepIndex >= executionTrace.length) return;

            const step = executionTrace[currentStepIndex];

            // 1. Highlight line in Python Editor
            highlightPythonLine(step.line);

            // 2. Render variables in Inspector
            renderVariables(step.locals);

            // 3. Update Console
            document.getElementById('consoleOutput').innerText = step.stdout.join('\n');

            // 4. Highlight Flowchart Node (matching heuristically)
            highlightFlowchartStep(step.line);

            // 5. Update Counter
            document.getElementById('stepCounter').innerText = translate('stepCounter', {
                current: currentStepIndex + 1,
                total: executionTrace.length
            });

            // Controls active states
            document.getElementById('btnStepPrev').disabled = (currentStepIndex === 0);
            document.getElementById('btnStepNext').disabled = (currentStepIndex === executionTrace.length - 1);
        }

        let lineClassHandle = null;
        function highlightPythonLine(lineIdx) {
            if (!Number.isInteger(lineIdx) || lineIdx < 0 || lineIdx >= pyEditor.lineCount()) return;
            if (lineClassHandle !== null) {
                pyEditor.removeLineClass(lineClassHandle, 'background', 'active-line-highlight');
            }
            lineClassHandle = pyEditor.addLineClass(lineIdx, 'background', 'active-line-highlight');
            pyEditor.scrollIntoView({ line: lineIdx, ch: 0 }, 50);
        }

        function renderVariables(localsObj) {
            const container = document.getElementById('varInspector');
            container.innerHTML = '';

            const keys = Object.keys(localsObj);
            if (keys.length === 0) {
                container.innerHTML = `<span class="text-slate-500 italic text-[11px]">${translate('noVariables')}</span>`;
                return;
            }

            keys.forEach(key => {
                const row = document.createElement('div');
                row.className = 'flex items-start gap-2 bg-slate-800/60 px-2 py-1 rounded text-[11px] font-mono border border-slate-700/50';
                
                const nameSpan = document.createElement('span');
                nameSpan.className = 'flex-[0_0_30%] min-w-0 break-words text-sky-300 font-semibold';
                nameSpan.innerText = key;

                const valSpan = document.createElement('span');
                valSpan.className = 'min-w-0 flex-1 whitespace-normal break-words text-right text-amber-300';
                valSpan.innerText = localsObj[key];
                valSpan.title = localsObj[key];

                row.appendChild(nameSpan);
                row.appendChild(valSpan);
                container.appendChild(row);
            });
        }

        function highlightFlowchartStep(lineNum) {
            // Remove previous active SVG highlights
            const svgNodes = document.querySelectorAll('#mermaidTarget .node');
            svgNodes.forEach(node => node.classList.remove('active-node'));

            if (svgNodes.length === 0) return;

            // Map line index roughly to flowchart nodes
            const nodeIndex = (lineNum % svgNodes.length);
            if (svgNodes[nodeIndex]) {
                svgNodes[nodeIndex].classList.add('active-node');
            }
        }

        function stepForward() {
            if (currentStepIndex < executionTrace.length - 1) {
                currentStepIndex++;
                updateStepUI();
            } else {
                stopPlay();
            }
        }

        function stepBackward() {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateStepUI();
            }
        }

        function togglePlay() {
            if (isPlaying) {
                stopPlay();
            } else {
                startPlay();
            }
        }

        function startPlay() {
            if (currentStepIndex >= executionTrace.length - 1) {
                currentStepIndex = 0;
            }
            isPlaying = true;
            document.getElementById('playIcon').className = 'fa-solid fa-pause';
            document.getElementById('playText').innerText = translate('pause');
            
            const speed = parseInt(document.getElementById('speedSlider').value);
            playInterval = setInterval(() => {
                if (currentStepIndex < executionTrace.length - 1) {
                    stepForward();
                } else {
                    stopPlay();
                }
            }, speed);
        }

        function stopPlay() {
            isPlaying = false;
            if (playInterval) clearInterval(playInterval);
            document.getElementById('playIcon').className = 'fa-solid fa-play';
            document.getElementById('playText').innerText = translate('play');
        }

        function resetExecutionState() {
            stopPlay();
            executionTrace = [];
            currentStepIndex = -1;
            if (lineClassHandle !== null) {
                pyEditor.removeLineClass(lineClassHandle, 'background', 'active-line-highlight');
                lineClassHandle = null;
            }
            document.getElementById('varInspector').innerHTML = `<span class="text-slate-500 italic text-[11px]">${translate('startStepping')}</span>`;
            document.getElementById('consoleOutput').innerText = '';
            document.getElementById('stepCounter').innerText = translate('stepCounter', {
                current: 0,
                total: 0
            });
            document.getElementById('btnPlay').disabled = true;
            document.getElementById('btnStepNext').disabled = true;
            document.getElementById('btnStepPrev').disabled = true;

            const svgNodes = document.querySelectorAll('#mermaidTarget .node');
            svgNodes.forEach(node => node.classList.remove('active-node'));
        }

        // --- 6. RESIZABLE PANES DRAG LOGIC ---
        const container = document.getElementById('container');
        const pane1 = document.getElementById('pane1');
        const pane2 = document.getElementById('pane2');
        const pane3 = document.getElementById('pane3');
        const gutter1 = document.getElementById('gutter1');
        const gutter2 = document.getElementById('gutter2');
        const pseudocodeHelp = document.getElementById('pseudocodeHelp');
        const pseudocodeHelpResizer = document.getElementById('pseudocodeHelpResizer');
        const pythonEditorPane = document.getElementById('pythonEditorPane');
        const pythonEditorResizer = document.getElementById('pythonEditorResizer');
        const inspectorContent = document.getElementById('inspectorContent');
        const variablePane = document.getElementById('variablePane');
        const variableConsoleResizer = document.getElementById('variableConsoleResizer');
        const minimumHelpHeight = 96;
        const minimumPseudocodeEditorHeight = 120;
        const minimumPythonEditorHeight = 100;
        const minimumPythonInspectorHeight = 260;
        const minimumVariablePaneHeight = 90;
        const minimumConsolePaneHeight = 70;

        let activeGutter = null;
        let helpResizeStart = null;
        let pythonResizeStart = null;
        let variableConsoleResizeStart = null;

        function setPseudocodeHelpHeight(height) {
            const paneRect = pane1.getBoundingClientRect();
            const headerHeight = pane1.querySelector(':scope > div:first-child').offsetHeight;
            const maximumHeight = Math.max(
                minimumHelpHeight,
                paneRect.height - headerHeight - minimumPseudocodeEditorHeight - pseudocodeHelpResizer.offsetHeight
            );
            const boundedHeight = Math.min(maximumHeight, Math.max(minimumHelpHeight, height));
            pseudocodeHelp.style.height = `${boundedHeight}px`;
            pseudocodeHelpResizer.setAttribute('aria-valuemax', String(Math.round(maximumHeight)));
            pseudocodeHelpResizer.setAttribute('aria-valuenow', String(Math.round(boundedHeight)));
        }

        pseudocodeHelpResizer.addEventListener('pointerdown', event => {
            if (event.button !== 0 || !event.isPrimary) return;
            helpResizeStart = {
                pointerId: event.pointerId,
                clientY: event.clientY,
                height: pseudocodeHelp.getBoundingClientRect().height
            };
            event.preventDefault();
        });

        document.addEventListener('pointermove', event => {
            if (!helpResizeStart || event.pointerId !== helpResizeStart.pointerId) return;
            setPseudocodeHelpHeight(helpResizeStart.height - (event.clientY - helpResizeStart.clientY));
        });

        document.addEventListener('pointerup', event => {
            if (!helpResizeStart || event.pointerId !== helpResizeStart.pointerId) return;
            helpResizeStart = null;
        });
        document.addEventListener('pointercancel', event => {
            if (!helpResizeStart || event.pointerId !== helpResizeStart.pointerId) return;
            helpResizeStart = null;
        });
        pseudocodeHelpResizer.addEventListener('keydown', event => {
            if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
            event.preventDefault();
            const adjustment = event.key === 'ArrowUp' ? 16 : -16;
            setPseudocodeHelpHeight(pseudocodeHelp.getBoundingClientRect().height + adjustment);
        });
        window.addEventListener('resize', () => {
            setPseudocodeHelpHeight(pseudocodeHelp.getBoundingClientRect().height);
        });
        setPseudocodeHelpHeight(pseudocodeHelp.getBoundingClientRect().height);

        function setPythonEditorHeight(height) {
            const paneRect = pane3.getBoundingClientRect();
            const headerHeight = pane3.querySelector(':scope > div:first-child').offsetHeight;
            const availableHeight = paneRect.height - headerHeight - pythonEditorResizer.offsetHeight;
            const maximumHeight = Math.max(
                minimumPythonEditorHeight,
                availableHeight - minimumPythonInspectorHeight
            );
            const boundedHeight = Math.min(
                maximumHeight,
                Math.max(minimumPythonEditorHeight, height)
            );
            pythonEditorPane.style.flexBasis = `${boundedHeight}px`;
            pythonEditorResizer.setAttribute('aria-valuemax', String(Math.round(maximumHeight)));
            pythonEditorResizer.setAttribute('aria-valuenow', String(Math.round(boundedHeight)));
            if (pyEditor) pyEditor.refresh();
        }

        pythonEditorResizer.addEventListener('pointerdown', event => {
            pythonResizeStart = {
                pointerId: event.pointerId,
                clientY: event.clientY,
                height: pythonEditorPane.getBoundingClientRect().height
            };
            pythonEditorResizer.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        pythonEditorResizer.addEventListener('pointermove', event => {
            if (!pythonResizeStart || event.pointerId !== pythonResizeStart.pointerId) return;
            setPythonEditorHeight(pythonResizeStart.height + event.clientY - pythonResizeStart.clientY);
        });

        pythonEditorResizer.addEventListener('pointerup', () => {
            pythonResizeStart = null;
        });
        pythonEditorResizer.addEventListener('lostpointercapture', () => {
            pythonResizeStart = null;
        });
        pythonEditorResizer.addEventListener('keydown', event => {
            if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
            event.preventDefault();
            const adjustment = event.key === 'ArrowUp' ? -16 : 16;
            setPythonEditorHeight(pythonEditorPane.getBoundingClientRect().height + adjustment);
        });
        window.addEventListener('resize', () => {
            setPythonEditorHeight(pythonEditorPane.getBoundingClientRect().height);
        });
        setPythonEditorHeight(pythonEditorPane.getBoundingClientRect().height);

        function setVariablePaneHeight(height) {
            const contentStyle = getComputedStyle(inspectorContent);
            const verticalPadding = parseFloat(contentStyle.paddingTop) + parseFloat(contentStyle.paddingBottom);
            const gaps = parseFloat(contentStyle.rowGap) * 2;
            const availableHeight = inspectorContent.clientHeight
                - verticalPadding
                - gaps
                - variableConsoleResizer.offsetHeight;
            const maximumHeight = Math.max(
                minimumVariablePaneHeight,
                availableHeight - minimumConsolePaneHeight
            );
            const boundedHeight = Math.min(
                maximumHeight,
                Math.max(minimumVariablePaneHeight, height)
            );
            variablePane.style.flex = `0 0 ${boundedHeight}px`;
            variableConsoleResizer.setAttribute('aria-valuemax', String(Math.round(maximumHeight)));
            variableConsoleResizer.setAttribute('aria-valuenow', String(Math.round(boundedHeight)));
        }

        variableConsoleResizer.addEventListener('pointerdown', event => {
            variableConsoleResizeStart = {
                pointerId: event.pointerId,
                clientY: event.clientY,
                height: variablePane.getBoundingClientRect().height
            };
            variableConsoleResizer.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        variableConsoleResizer.addEventListener('pointermove', event => {
            if (!variableConsoleResizeStart || event.pointerId !== variableConsoleResizeStart.pointerId) return;
            setVariablePaneHeight(
                variableConsoleResizeStart.height + event.clientY - variableConsoleResizeStart.clientY
            );
        });

        variableConsoleResizer.addEventListener('pointerup', () => {
            variableConsoleResizeStart = null;
        });
        variableConsoleResizer.addEventListener('lostpointercapture', () => {
            variableConsoleResizeStart = null;
        });
        variableConsoleResizer.addEventListener('keydown', event => {
            if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
            event.preventDefault();
            const adjustment = event.key === 'ArrowUp' ? -16 : 16;
            setVariablePaneHeight(variablePane.getBoundingClientRect().height + adjustment);
        });
        window.addEventListener('resize', () => {
            setVariablePaneHeight(variablePane.getBoundingClientRect().height);
        });
        setVariablePaneHeight(variablePane.getBoundingClientRect().height);

        gutter1.addEventListener('mousedown', () => activeGutter = 1);
        gutter2.addEventListener('mousedown', () => activeGutter = 2);

        document.addEventListener('mousemove', (e) => {
            if (!activeGutter) return;

            const containerRect = container.getBoundingClientRect();
            const totalWidth = containerRect.width;

            if (activeGutter === 1) {
                const newWidth1 = e.clientX - containerRect.left;
                if (newWidth1 > 200 && newWidth1 < totalWidth - 400) {
                    pane1.style.width = `${newWidth1}px`;
                }
            } else if (activeGutter === 2) {
                const newWidth2 = e.clientX - pane2.getBoundingClientRect().left;
                if (newWidth2 > 200 && (totalWidth - e.clientX) > 200) {
                    pane2.style.width = `${newWidth2}px`;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            activeGutter = null;
        });
    