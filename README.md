# Algoritmizace & Vývojové Diagramy

Jednoduchý webový výukový nástroj pro vizualizaci základních algoritmů a jejich běhu v Pythonu. Aplikace kombinuje pseudokód, vývojový diagram a krokované spuštění kódu, takže je vhodná pro výuku algoritmizace, řazení a logiky programování.

## Co umí

- zobrazuje předpřipravené algoritmy (Bubble Sort, faktoriál, maximum v poli, GCD a obsah trojúhelníku)
- ukazuje pseudokód a odpovídající vývojový diagram
- převádí odsazený pseudokód na Mermaid diagram včetně větvení a cyklů
- umožňuje krokovat Python kód a sledovat proměnné v čase
- zobrazuje výstup programu a zvýrazňuje aktuální řádek ve zdrojovém kódu
- umožňuje uložit aktuální pseudokód do JSON souboru s vlastním názvem a odsazením jednotlivých řádků
- automaticky přizpůsobuje měřítko diagramu a nabízí jeho přiblížení, oddálení a návrat na přizpůsobené měřítko
- používá Pyodide (Python v prohlížeči) bez nutnosti lokální instalace Pythonu

## Použití diagramu a podporovaný pseudokód

Diagram se automaticky aktualizuje po krátké prodlevě od poslední změny pseudokódu. Tlačítkem **Aktualizovat Diagram z Pseudokódu** jej lze překreslit ihned. Po výběru předpřipraveného algoritmu se diagram vykreslí okamžitě. Generátor převádí jednotlivé neprázdné řádky na kroky diagramu; prázdné řádky ignoruje. Odsazení určuje příslušnost řádků k bloku, proto používejte konzistentní odsazení (doporučené jsou dva mezery na úroveň). Pokud je syntaxe řídicí struktury chybná nebo diagram nelze vykreslit, zobrazí se chyba přímo v panelu diagramu.

Diagramy předpřipravených algoritmů se generují z jejich pseudokódu; samostatné předdefinované diagramy se nepoužívají.

Nápověda s podporovanými termíny pseudokódu má zvětšenou výchozí výšku. Její výšku lze měnit tažením dělicího pruhu mezi nápovědou a editorem nebo klávesami šipka nahoru/dolů při zaměření pruhu.

Podporované řídicí struktury:

- Hlavička algoritmu: `ALGORITMUS název(parametry):`.
- Podmínka: `POKUD podmínka:` nebo `IF podmínka:`.
- Dlouhé popisky rozhodovacích uzlů se zalamují po slovech, aby se zmenšila výška diagramového kosočtverce.
- Volitelná alternativní větev: `JINAK:` nebo `ELSE:`. Řádek `JINAK`/`ELSE` zarovnejte buď s odpovídajícím `POKUD`/`IF`, nebo s příkazy první větve.
- Cyklus s podmínkou: `DOKUD podmínka:` nebo `WHILE podmínka:`.
- Cyklus přes prvky kolekce: `PRO prvek V kolekce:` nebo `FOR prvek IN kolekce:`. Diagram zobrazuje rozhodnutí, zda je k dispozici další prvek, přiřazení prvku a návratovou hranu cyklu.
- Počítaný cyklus: `PRO i OD začátek DO konec:` nebo `FOR i FROM start TO end:`. Hlavička cyklu je zobrazena jako šestiúhelník s návratovou hranou; kroky a hranice iterací se nevyhodnocují.
- Následující blok větve `Ne` je v diagramu umístěn pod všemi bloky větve `Ano`, a to i u vnořených cyklů.
- Všechny uvedené struktury lze vnořovat. Jejich těla musí být odsazena vůči hlavičce.

Příkaz `VYPIS hodnota` nebo `WRITE value` zobrazí tisk hodnoty jako běžný krok diagramu. Editor pseudokódu průběžně červeně podtrhává neznámá slova psaná velkými písmeny na začátku řádku a zobrazuje počet nálezů. Jde o orientační upozornění, nikoli o validaci pseudokódu: běžná přiřazení a slova uvnitř řádku nekontroluje a neznámé příkazy se stále zobrazí jako běžné kroky.

Příkazy, které nejsou rozpoznány jako řídicí struktury, se zobrazí jako běžné kroky. Předání výsledku funkce se rozpozná pomocí `VRAT` nebo `RETURN` a zobrazí se jako výstupní rovnoběžník propojený s koncem diagramu. Generátor vytváří přehledový diagram; neinterpretuje výrazy, neověřuje jejich syntaxi ani nespouští pseudokód. Počítané cykly a podmínky jsou tedy znázorněné, ale jejich průběh se nepočítá.

Příklad:

```text
ALGORITMUS ProjdiMatici(matice):
  PRO radek V matice:
    PRO hodnota V radek:
      POKUD hodnota > 0:
        kladnych = kladnych + 1
      JINAK:
        zapornych = zapornych + 1
  VRAT kladnych
```

### Uložení algoritmu

Do pole **Název souboru** zadejte požadovaný název a stiskněte tlačítko **JSON**. Přípona `.json` se doplní automaticky; při prázdném poli se použije název vybraného algoritmu. Neplatné znaky pro název souboru se nahradí podtržítkem.

Export obsahuje lidský název algoritmu a pseudokód jako pole řádků. Každý řádek má `text` s obsahem bez počátečního odsazení a `indent` s počtem odsazovacích mezer; tabulátor se počítá jako čtyři mezery. Prázdné řádky se zachovávají.

```json
{
  "name": "Název algoritmu",
  "pseudocode": [
    { "text": "ALGORITMUS Ukazka:", "indent": 0 },
    { "text": "VYPIS hodnota", "indent": 2 }
  ]
}
```

### Ovládání měřítka diagramu

Diagram se automaticky zmenší tak, aby se vešel do plochy, pokud má plocha alespoň **250 px na šířku a 400 px na výšku**. Přizpůsobení se aktualizuje také při změně velikosti panelu. Pomocí tlačítek v pravém horním rohu diagramu lze přiblížit, oddálit nebo obnovit přizpůsobené měřítko. Při ručním zoomu lze diagram posouvat pomocí posuvníků plochy.

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

Vyberte algoritmus z rozbalovací nabídky a upravte jeho pseudokód nebo Python kód. Diagram aktualizujte příslušným tlačítkem v panelu pseudokódu. Pro krokování Pythonu stiskněte **Start**, poté použijte **Spustit** nebo tlačítka pro pohyb po jednotlivých krocích.
