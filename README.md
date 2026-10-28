# Algoritmizace & Vývojové Diagramy

Jednoduchý webový výukový nástroj pro vizualizaci základních algoritmů a jejich běhu v Pythonu. Aplikace kombinuje pseudokód, vývojový diagram a krokované spuštění kódu, takže je vhodná pro výuku algoritmizace, řazení a logiky programování.

## Co umí

- zobrazuje několik předpřipravených algoritmů (Bubble Sort, faktoriál, maximum v poli, GCD)
- ukazuje pseudokód a odpovídající vývojový diagram
- umožňuje krokovat Python kód a sledovat proměnné v čase
- zobrazuje výstup programu a zvýrazňuje aktuální řádek ve zdrojovém kódu
- používá Pyodide (Python v prohlížeči) bez nutnosti lokální instalace Pythonu

## Jak spustit

1. otevřete soubor `algoritmizace_vyukovy_nastroj.html` v prohlížeči
2. nebo jej spusťte přes jednoduchý lokální server, například:

```bash
python -m http.server 8000
```

Poté otevřete v prohlížeči adresu `http://localhost:8000`.

## Technologie

- HTML + CSS + JavaScript
- Tailwind CSS
- CodeMirror
- Mermaid.js
- Pyodide

## Struktura projektu

- `algoritmizace_vyukovy_nastroj.html` — hlavní aplikace
- `README.md` — dokumentace projektu

## Použití

Vyberte algoritmus z rozbalovací nabídky, upravte pseudokód nebo Python kód, a poté spusťte krokování. Aplikace vám pomůže lépe pochopit vztah mezi algoritmem, diagramem a skutečným během programu.
