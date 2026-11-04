# Algorithms & Flowcharts

## Copyright and license

Copyright © 2026 Jiri Kral. Developed at Brno University of Technology (VUT), Faculty of Mechanical Engineering, Department of Applied Computer Science, for student practice.

- Author: [Jiri Kral](https://www.vut.cz/en/people/jiri-kral-3652)
- University contact: [VUT Brno, Faculty of Mechanical Engineering, Dept. of Applied Computer Science](https://www.fme.vutbr.cz/en/fakulta/struktura/pracoviste/uai#oai)

This project is released under the [MIT License](./LICENSE). The license applies to this project's code and documentation; third-party dependencies remain under their respective licenses.

A simple educational web tool for visualizing basic algorithms and their execution in Python. The application combines pseudocode, flowcharts, and step-by-step code execution, making it suitable for teaching algorithms, sorting, and programming logic.

## Features

- includes an Empty Algorithm (Starter) example with a Hello, world! step, plus Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic), and Pedestrian Crossing (Unsignalized, Complex)
- displays pseudocode and the corresponding flowchart
- converts indented pseudocode into Mermaid diagrams with branches and loops
- supports stepping through Python code and inspecting variables over time
- highlights the corresponding flowchart block while stepping through generated Python
- displays program output and highlights the current source-code line
- exports the current pseudocode to JSON, with one entry per line and indentation metadata
- imports pseudocode from a JSON file in the same format
- automatically fits diagrams to the available space and provides zoom controls
- runs Python in the browser with Pyodide; no local Python installation is required
- offers Czech, English, Slovak, Esperanto, and French interface languages

Use the flag buttons and language codes **CS**, **EN**, **SK**, **EO**, and **FR** in the upper-right corner to change the interface language. Esperanto uses its green flag with a green star on a white canton. English is the default language. Interface labels and supported pseudocode terms are translated, while the human-readable example-algorithm names remain in English. Pseudocode is converted to canonical English internally; identifiers and quoted text are preserved.

## Flowcharts and supported pseudocode

The flowchart updates automatically shortly after the pseudocode is edited. Selecting an example algorithm renders its diagram right away. The generator converts each non-empty line into a diagram step and ignores blank lines. Indentation determines block membership, so use consistent indentation (two spaces per level are recommended). If a control structure is malformed or the diagram cannot be rendered, the error is displayed in the diagram pane.

Example diagrams are generated from their pseudocode; separate predefined diagrams are not used.

The pedestrian-crossing examples model crossings without traffic signals. The basic example waits for traffic to clear; its Python input uses `True` when traffic is approaching. The complex example checks every lane in each observation before crossing; each Python snapshot is a list where `True` means that lane is unsafe to cross.

The supported-terms help panel has a default height of **320 px**. Resize it by dragging the divider between the help and editor, or focus the divider and use the Up/Down arrow keys. The Python editor and variable inspector each use half of their pane by default; the variable inspector and console use a 60:40 split. Both dividers remain resizable by dragging or focusing them and using the Up/Down arrow keys.

Supported control structures:

- Algorithm header: `ALGORITMUS name(parameters):` or `ALGORITHM name(parameters):`.
- Condition: `POKUD condition:` or `IF condition:`.
- Long decision labels wrap at word boundaries to reduce the height of the flowchart diamond.
- Optional alternative branch: `JINAK:` or `ELSE:`. Align `JINAK`/`ELSE` either with its matching `POKUD`/`IF` or with the statements in the first branch.
- Conditional loop: `DOKUD condition:` or `WHILE condition:`.
- Iterate over a collection: `PRO item V collection:` or `FOR item IN collection:`. The diagram shows a decision for whether another item is available, assigns the item, and includes the loop-back edge.
- Counted loop: `PRO i OD start DO end:` or `FOR i FROM start TO end:`. The loop header is shown as a hexagon; its body and loop-back arrows are unlabeled, and its terminating arrow is labeled **End loop**. Iteration steps and bounds are not evaluated. `WHILE` and collection-loop arrows retain their **Yes**/**No** labels.
- The **No** branch is placed below all blocks in the **Yes** branch, including in nested loops.
- All listed structures can be nested. Their bodies must be indented relative to the header.

`VYPIS value` or `WRITE value` displays output as a regular flowchart step. `VSTUP variable` or `INPUT variable` reads a value and appears as an input parallelogram. The pseudocode editor underlines unknown uppercase words at the beginning of a line in red and shows their count. This is only a hint, not pseudocode validation: ordinary assignments and words inside a line are not checked, and unknown commands are still rendered as regular steps.

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

### Generating Python

The Python pane generates code from the pseudocode into the region between the comments `# BEGIN GENERATED CODE` and `# END GENERATED CODE`. Keep imports or preconditions before the start marker and example inputs or calls after the end marker; regeneration preserves both surrounding regions. The markers must appear exactly once and in that order.

The supported pseudocode structures and commands (`ALGORITMUS`/`ALGORITHM`, `IF`/`POKUD`, `ELSE`/`JINAK`, `WHILE`/`DOKUD`, both `FOR`/`PRO` forms, `WRITE`/`VYPIS`, `INPUT`/`VSTUP`, and `RETURN`/`VRAT`) generate Python. Input assigns the result of Python's `input()` to one variable; the value is a string. Counted-loop end bounds are inclusive. Basic expressions are retained, with `MOD`, `NEBO`, standalone `A`, `AND`, `OR`, `NOT`, `true`, `false`, and `length(...)` translated to their Python equivalents. Other statement text is emitted as Python and must be valid Python.

Pseudocode edits regenerate the marked section automatically until the Python editor is edited manually. After a manual edit, use **Generate Python** to explicitly replace only the marked section. Generation errors are shown beside the button and leave the existing code unchanged. Imported JSON contains only pseudocode; it updates the generated region when the Python editor has not been manually edited. While stepping through Python, the corresponding diagram block is highlighted using the generated source mapping.

### Saving an algorithm

Click **Save JSON**. The file is downloaded using the selected algorithm's human-readable name and the `.json` extension. Invalid filename characters are replaced with underscores. A browser save dialog may allow you to change the filename.

Use **Load JSON** to import a file in this format. The imported algorithm appears in the selector under the uploaded filename without its extension, and its pseudocode replaces the current pseudocode. JSON exports store canonical English pseudocode with `"pseudocodeLanguage": "en"`; imports also accept the supported localized terms. Because JSON does not contain Python code, the generated region is regenerated from the imported pseudocode when possible; code outside that region is preserved.

The export contains the algorithm name and pseudocode as an array of lines. Each line has `text`, containing the content without leading indentation, and `indent`, containing the indentation in spaces; tabs count as four spaces. Blank lines are preserved.

```json
{
  "name": "Bubble Sort",
  "pseudocodeLanguage": "en",
  "pseudocode": [
    { "text": "ALGORITHM Example:", "indent": 0 },
    { "text": "WRITE value", "indent": 2 }
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
- `LICENSE` — MIT License

## Usage

Select an algorithm from the drop-down menu and edit its pseudocode or Python code. The diagram updates automatically after pseudocode edits. To step through Python execution, click **Start**, then use **Run** or the step controls. Editing the Python code clears the recorded execution; click **Start** again to prepare the updated code.
