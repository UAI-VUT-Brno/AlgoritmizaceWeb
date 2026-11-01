# Algoritmizace & Vývojové Diagramy

Jednoduchý webový výukový nástroj pro vizualizaci základních algoritmů a jejich běhu v Pythonu. Aplikace kombinuje pseudokód, vývojový diagram a krokované spuštění kódu, takže je vhodná pro výuku algoritmizace, řazení a logiky programování.

## Co umí

- zobrazuje předpřipravené algoritmy (Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic) a Pedestrian Crossing (Unsignalized, Complex)
- ukazuje pseudokód a odpovídající vývojový diagram
- převádí odsazený pseudokód na Mermaid diagram včetně větvení a cyklů
- umožňuje krokovat Python kód a sledovat proměnné v čase
- zobrazuje výstup programu a zvýrazňuje aktuální řádek ve zdrojovém kódu
- umožňuje uložit aktuální pseudokód do JSON souboru pojmenovaného podle algoritmu, s odsazením jednotlivých řádků
- umožňuje načíst pseudokód ze souboru JSON ve stejném formátu
- automaticky přizpůsobuje měřítko diagramu a nabízí jeho přiblížení, oddálení a návrat na přizpůsobené měřítko
- používá Pyodide (Python v prohlížeči) bez nutnosti lokální instalace Pythonu
- umožňuje přepnout jazyk rozhraní mezi češtinou, angličtinou, slovenštinou, esperantem a francouzštinou

Jazyk rozhraní lze změnit tlačítky s vlajkami a zkratkami **CS**, **EN**, **SK**, **EO** a **FR** v pravé horní části aplikace. Pro esperanto je použita jeho zelená vlajka se zelenou hvězdou na bílém poli. Výchozím jazykem je angličtina. Změna jazyka překládá popisky i podporované termíny pseudokódu; lidsky čitelné názvy předpřipravených algoritmů zůstávají anglicky. Pseudokód se interně převádí na anglickou kanonickou podobu, identifikátory a text v uvozovkách zůstávají zachovány.

## Použití diagramu a podporovaný pseudokód

Diagram se automaticky aktualizuje po krátké prodlevě od poslední změny pseudokódu. Po výběru předpřipraveného algoritmu se diagram vykreslí okamžitě. Generátor převádí jednotlivé neprázdné řádky na kroky diagramu; prázdné řádky ignoruje. Odsazení určuje příslušnost řádků k bloku, proto používejte konzistentní odsazení (doporučené jsou dva mezery na úroveň). Pokud je syntaxe řídicí struktury chybná nebo diagram nelze vykreslit, zobrazí se chyba přímo v panelu diagramu.

Diagramy předpřipravených algoritmů se generují z jejich pseudokódu; samostatné předdefinované diagramy se nepoužívají.

Příklady přecházení silnice popisují přechod bez semaforu. Základní varianta čeká, dokud není vozovka volná; v jejím příkladu Pythonu znamená `True`, že se blíží vozidlo. Složitější varianta před přechodem kontroluje každý jízdní pruh; každá dopravní situace v jejím příkladu Pythonu je seznam, kde `True` znamená, že je daný pruh nebezpečné přecházet.

Nápověda s podporovanými termíny pseudokódu má výchozí výšku **224 px**. Její výšku lze měnit tažením dělicího pruhu mezi nápovědou a editorem nebo klávesami šipka nahoru/dolů při zaměření pruhu. Stejným způsobem lze měnit výšku editoru Pythonu a inspektoru proměnných i panelu proměnných a konzole tažením jejich dělicích pruhů nebo klávesami šipka nahoru/dolů při jejich zaměření.

Podporované řídicí struktury:

- Hlavička algoritmu: `ALGORITMUS název(parametry):` nebo `ALGORITHM name(parameters):`.
- Podmínka: `POKUD podmínka:` nebo `IF podmínka:`.
- Dlouhé popisky rozhodovacích uzlů se zalamují po slovech, aby se zmenšila výška diagramového kosočtverce.
- Volitelná alternativní větev: `JINAK:` nebo `ELSE:`. Řádek `JINAK`/`ELSE` zarovnejte buď s odpovídajícím `POKUD`/`IF`, nebo s příkazy první větve.
- Cyklus s podmínkou: `DOKUD podmínka:` nebo `WHILE podmínka:`.
- Cyklus přes prvky kolekce: `PRO prvek V kolekce:` nebo `FOR prvek IN kolekce:`. Diagram zobrazuje rozhodnutí, zda je k dispozici další prvek, přiřazení prvku a návratovou hranu cyklu.
- Počítaný cyklus: `PRO i OD začátek DO konec:` nebo `FOR i FROM start TO end:`. Hlavička cyklu je zobrazena jako šestiúhelník s návratovou hranou; kroky a hranice iterací se nevyhodnocují.
- Následující blok větve `Ne` je v diagramu umístěn pod všemi bloky větve `Ano`, a to i u vnořených cyklů.
- Všechny uvedené struktury lze vnořovat. Jejich těla musí být odsazena vůči hlavičce.

Příkaz `VYPIS hodnota` nebo `WRITE value` zobrazí tisk hodnoty jako běžný krok diagramu. `VSTUP proměnná` nebo `INPUT variable` načte hodnotu a zobrazí ji jako vstupní rovnoběžník. Editor pseudokódu průběžně červeně podtrhává neznámá slova psaná velkými písmeny na začátku řádku a zobrazuje počet nálezů. Jde o orientační upozornění, nikoli o validaci pseudokódu: běžná přiřazení a slova uvnitř řádku nekontroluje a neznámé příkazy se stále zobrazí jako běžné kroky.

Příkazy, které nejsou rozpoznány jako řídicí struktury, se zobrazí jako běžné kroky. Předání výsledku funkce se rozpozná pomocí `VRAT` nebo `RETURN` a zobrazí se jako výstupní rovnoběžník propojený s koncem diagramu. Generátor vytváří přehledový diagram; neinterpretuje výrazy, neověřuje jejich syntaxi ani nespouští pseudokód. Počítané cykly a podmínky jsou tedy znázorněné, ale jejich průběh se nepočítá.

Příklad:

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

### Generování Pythonu

Panel Pythonu generuje kód z pseudokódu do oblasti mezi komentáři `# BEGIN GENERATED CODE` a `# END GENERATED CODE`. Importy nebo předpoklady ponechte před počátečním komentářem, ukázková data a volání za koncovým komentářem; při opětovném generování zůstanou okolní části zachovány. Každý komentář musí být uveden právě jednou a ve správném pořadí.

Podporované struktury a příkazy pseudokódu (`ALGORITMUS`/`ALGORITHM`, `IF`/`POKUD`, `ELSE`/`JINAK`, `WHILE`/`DOKUD`, obě podoby `FOR`/`PRO`, `WRITE`/`VYPIS`, `INPUT`/`VSTUP` a `RETURN`/`VRAT`) se převádějí na Python. `INPUT variable` přiřadí do jedné proměnné výsledek Pythonového `input()`; načtená hodnota je řetězec. Horní mez počítaného cyklu je zahrnuta. Základní výrazy se zachovávají; `MOD`, `NEBO`, samostatné `A`, `AND`, `OR`, `NOT`, `true`, `false` a `length(...)` se převádějí na ekvivalenty v Pythonu. Ostatní text příkazů se přenáší jako Python a musí mít platnou syntaxi.

Při úpravě pseudokódu se označená oblast automaticky aktualizuje, dokud uživatel ručně neupraví editor Pythonu. Po ruční úpravě použijte **Generovat Python**; přepíše se pouze označená oblast. Chyba generování se zobrazí vedle tlačítka a stávající kód zůstane zachován. Importovaný JSON obsahuje pouze pseudokód; pokud editor Pythonu nebyl ručně upraven, vygenerovaná oblast se z něj aktualizuje.

### Uložení algoritmu

Stiskněte tlačítko **Uložit JSON**. Soubor se stáhne s lidsky čitelným názvem vybraného algoritmu a příponou `.json`; název lze změnit v dialogu pro ukládání prohlížeče, pokud jej prohlížeč zobrazí. Neplatné znaky pro název souboru se nahradí podtržítkem.

Tlačítkem **Načíst JSON** lze načíst soubor ve stejném formátu. Název importovaného algoritmu se zobrazí ve výběru a jeho pseudokód nahradí aktuální pseudokód. Export ukládá pseudokód v anglické kanonické podobě a obsahuje `"pseudocodeLanguage": "en"`; při importu jsou podporovány také lokalizované termíny. JSON neobsahuje Python kód, proto se při nezměněném editoru Pythonu znovu vygeneruje pouze označená oblast; okolní kód zůstane zachován.

Export obsahuje lidský název algoritmu a pseudokód jako pole řádků. Každý řádek má `text` s obsahem bez počátečního odsazení a `indent` s počtem odsazovacích mezer; tabulátor se počítá jako čtyři mezery. Prázdné řádky se zachovávají.

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
- `README.md` — anglická dokumentace projektu
- `README_cz.md` — česká dokumentace projektu
- `README_sk.md` — slovenská dokumentace projektu
- `README_eo.md` — esperantská dokumentace projektu
- `README_fr.md` — francouzská dokumentace projektu

## Použití

Vyberte algoritmus z rozbalovací nabídky a upravte jeho pseudokód nebo Python kód. Diagram aktualizujte příslušným tlačítkem v panelu pseudokódu. Pro krokování Pythonu stiskněte **Start**, poté použijte **Spustit** nebo tlačítka pro pohyb po jednotlivých krocích. Po úpravě Python kódu se zaznamenaný běh zruší; stiskněte znovu **Start**, aby se připravil upravený kód.
