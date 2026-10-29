# Algorithms & Flowcharts

A simple educational web tool for visualizing basic algorithms and their execution in Python. The application combines pseudocode, flowcharts, and step-by-step code execution, making it suitable for teaching algorithms, sorting, and programming logic.

## Features

- includes example algorithms: Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic), and Pedestrian Crossing (Unsignalized, Complex)
- displays pseudocode and the corresponding flowchart
- converts indented pseudocode into Mermaid diagrams with branches and loops
- supports stepping through Python code and inspecting variables over time
- displays program output and highlights the current source-code line
- exports the current pseudocode to JSON, with one entry per line and indentation metadata
- imports pseudocode from a JSON file in the same format
- automatically fits diagrams to the available space and provides zoom controls
- runs Python in the browser with Pyodide; no local Python installation is required
- offers Czech, English, Slovak, Esperanto, and French interface languages

Use the flag buttons and language codes **CS**, **EN**, **SK**, **EO**, and **FR** in the upper-right corner to change the interface language. Esperanto uses its green flag with a green star on a white canton. Czech is the default language. Interface labels are translated, while the human-readable example-algorithm names remain in English. Pseudocode terms and the contents of the algorithm being edited are not translated.

## Flowcharts and supported pseudocode

The flowchart updates automatically shortly after the pseudocode is edited. Selecting an example algorithm renders its diagram right away. The generator converts each non-empty line into a diagram step and ignores blank lines. Indentation determines block membership, so use consistent indentation (two spaces per level are recommended). If a control structure is malformed or the diagram cannot be rendered, the error is displayed in the diagram pane.

Example diagrams are generated from their pseudocode; separate predefined diagrams are not used.

The pedestrian-crossing examples model crossings without traffic signals. The basic example waits for traffic to clear; its Python input uses `True` when traffic is approaching. The complex example checks every lane in each observation before crossing; each Python snapshot is a list where `True` means that lane is unsafe to cross.

The supported-terms help panel has a default height of **224 px**. Resize it by dragging the divider between the help and editor, or focus the divider and use the Up/Down arrow keys.

Supported control structures:

- Algorithm header: `ALGORITMUS name(parameters):`.
- Condition: `POKUD condition:` or `IF condition:`.
- Long decision labels wrap at word boundaries to reduce the height of the flowchart diamond.
- Optional alternative branch: `JINAK:` or `ELSE:`. Align `JINAK`/`ELSE` either with its matching `POKUD`/`IF` or with the statements in the first branch.
- Conditional loop: `DOKUD condition:` or `WHILE condition:`.
- Iterate over a collection: `PRO item V collection:` or `FOR item IN collection:`. The diagram shows a decision for whether another item is available, assigns the item, and includes the loop-back edge.
- Counted loop: `PRO i OD start DO end:` or `FOR i FROM start TO end:`. The loop header is shown as a hexagon with a loop-back edge; iteration steps and bounds are not evaluated.
- The following `Ne` branch is placed below all blocks in the `Ano` branch, including in nested loops.
- All listed structures can be nested. Their bodies must be indented relative to the header.

`VYPIS value` or `WRITE value` displays output as a regular flowchart step. The pseudocode editor underlines unknown uppercase words at the beginning of a line in red and shows their count. This is only a hint, not pseudocode validation: ordinary assignments and words inside a line are not checked, and unknown commands are still rendered as regular steps.

Commands that are not recognized as control structures are displayed as regular steps. Function results can be returned with `VRAT` or `RETURN`, shown as an output parallelogram connected to the diagram end. The generator creates an overview diagram; it does not interpret expressions, validate their syntax, or execute pseudocode. Counted loops and conditions are shown but not evaluated.

Example:

```text
ALGORITMUS IterateMatrix(matrix):
  PRO row V matrix:
    PRO value V row:
      POKUD value > 0:
        positive_count = positive_count + 1
      JINAK:
        nonpositive_count = nonpositive_count + 1
  VRAT positive_count
```

### Saving an algorithm

Click **Save JSON**. The file is downloaded using the selected algorithm's human-readable name and the `.json` extension. Invalid filename characters are replaced with underscores. A browser save dialog may allow you to change the filename.

Use **Load JSON** to import a file in this format. The imported algorithm name appears in the selector, and its pseudocode replaces the current pseudocode. Because the JSON format does not include Python code, the Python editor is left unchanged.

The export contains the algorithm name and pseudocode as an array of lines. Each line has `text`, containing the content without leading indentation, and `indent`, containing the indentation in spaces; tabs count as four spaces. Blank lines are preserved.

```json
{
  "name": "Bubble Sort",
  "pseudocode": [
    { "text": "ALGORITMUS Example:", "indent": 0 },
    { "text": "VYPIS value", "indent": 2 }
  ]
}
```

### Diagram zoom

The diagram is automatically scaled down to fit when the pane is at least **250 px wide and 400 px high**. The fit is recalculated when the pane is resized. Use the buttons in the diagram's upper-right corner to zoom in, zoom out, or restore the fit scale. At a manually selected zoom level, use the pane's scrollbars to move around the diagram.

## Running the application

1. Open `algoritmizace_vyukovy_nastroj.html` in a browser, or
2. run a simple local server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Technologies

- HTML, CSS, and JavaScript
- Tailwind CSS
- CodeMirror
- Mermaid.js
- Pyodide

## Project files

- `algoritmizace_vyukovy_nastroj.html` — main application
- `README.md` — English documentation
- `README_cz.md` — Czech documentation
- `README_sk.md` — Slovak documentation
- `README_eo.md` — Esperanto documentation
- `README_fr.md` — French documentation

## Usage

Select an algorithm from the drop-down menu and edit its pseudocode or Python code. Update the diagram with the button in the pseudocode pane. To step through Python execution, click **Start**, then use **Run** or the step controls.
