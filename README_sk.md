# Algoritmizácia a vývojové diagramy

Jednoduchý výučbový webový nástroj na vizualizáciu základných algoritmov a ich vykonávania v Pythone. Aplikácia spája pseudokód, vývojový diagram a krokované spúšťanie kódu, vďaka čomu sa hodí na výučbu algoritmizácie, triedenia a programátorskej logiky.

## Funkcie

- obsahuje ukážkové algoritmy: Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic) a Pedestrian Crossing (Unsignalized, Complex)
- zobrazuje pseudokód a príslušný vývojový diagram
- prevádza odsadený pseudokód na diagramy Mermaid vrátane vetvenia a cyklov
- umožňuje krokovať Python kód a sledovať hodnoty premenných
- zobrazuje výstup programu a zvýrazňuje aktuálny riadok zdrojového kódu
- exportuje aktuálny pseudokód do JSON; každý riadok je samostatná položka s údajom o odsadení
- načíta pseudokód zo súboru JSON v rovnakom formáte
- automaticky prispôsobuje diagram dostupnej ploche a ponúka ovládanie priblíženia
- spúšťa Python v prehliadači pomocou Pyodide bez potreby lokálnej inštalácie Pythonu
- ponúka rozhranie v češtine, angličtine, slovenčine, esperante a francúzštine

Jazyk rozhrania zmeníte tlačidlami s vlajkami a skratkami **CS**, **EN**, **SK**, **EO** a **FR** v pravom hornom rohu. Esperanto používa zelenú vlajku so zelenou hviezdou na bielom poli. Predvoleným jazykom je angličtina. Popisy rozhrania a podporované termíny pseudokódu sa prekladajú, ale ľudsky čitateľné názvy ukážkových algoritmov zostávajú v angličtine. Pseudokód sa interne prevádza do kanonickej angličtiny; identifikátory a text v úvodzovkách zostávajú zachované.

## Diagramy a podporovaný pseudokód

Vývojový diagram sa aktualizuje automaticky krátko po úprave pseudokódu. Po výbere ukážkového algoritmu sa diagram vykreslí ihneď. Generátor prevádza každý neprázdny riadok na krok diagramu a prázdne riadky ignoruje. Odsadenie určuje príslušnosť k bloku, preto používajte konzistentné odsadenie (odporúčané sú dva medzery na úroveň). Ak je riadiaca štruktúra nesprávne zapísaná alebo sa diagram nepodarí vykresliť, chyba sa zobrazí v paneli diagramu.

Diagramy ukážkových algoritmov sa generujú z ich pseudokódu; samostatné preddefinované diagramy sa nepoužívajú.

Príklady prechádzania cez cestu opisujú priechod bez semafora. Základný príklad čaká, kým bude cesta voľná; v jeho ukážke Pythonu znamená `True`, že sa približuje vozidlo. Zložitejší príklad pred prechodom kontroluje každý jazdný pruh; každá dopravná situácia v jeho ukážke Pythonu je zoznam, kde `True` znamená, že je daný pruh nebezpečné prechádzať.

Panel pomocníka s podporovanými termínmi má predvolenú výšku **224 px**. Výšku možno zmeniť ťahaním oddeľovača medzi pomocníkom a editorom alebo zameraním oddeľovača a použitím šípok nahor/nadol. Rovnakým spôsobom možno meniť výšku editora Pythonu a inšpektora premenných, ako aj panela premenných a konzoly, ťahaním ich oddeľovačov alebo ich zameraním a použitím šípok nahor/nadol.

Podporované riadiace štruktúry:

- Hlavička algoritmu: `ALGORITMUS názov(parametre):` alebo `ALGORITHM name(parameters):`.
- Podmienka: `POKUD podmienka:` alebo `IF podmienka:`.
- Dlhé popisy rozhodovacích uzlov sa zalamujú na hraniciach slov, aby sa zmenšila výška kosoštvorca.
- Voliteľná alternatívna vetva: `JINAK:` alebo `ELSE:`. Riadok `JINAK`/`ELSE` zarovnajte buď s príslušným `POKUD`/`IF`, alebo s príkazmi prvej vetvy.
- Podmienený cyklus: `DOKUD podmienka:` alebo `WHILE podmienka:`.
- Prechod kolekciou: `PRO prvok V kolekcia:` alebo `FOR prvok IN collection:`. Diagram znázorňuje rozhodnutie, či je dostupný ďalší prvok, jeho priradenie a návratovú hranu cyklu.
- Počítaný cyklus: `PRO i OD začiatok DO koniec:` alebo `FOR i FROM start TO end:`. Hlavička cyklu sa zobrazí ako šesťuholník s návratovou hranou; kroky a hranice iterácií sa nevyhodnocujú.
- Nasledujúci blok vetvy `Ne` sa v diagrame umiestni pod všetky bloky vetvy `Ano`, a to aj pri vnorených cykloch.
- Všetky uvedené štruktúry možno vnárať. Ich telá musia byť odsadené voči hlavičke.

Príkaz `VYPIS hodnota` alebo `WRITE value` zobrazí výpis hodnoty ako bežný krok diagramu. `VSTUP premenná` alebo `INPUT variable` načíta hodnotu a zobrazí ju ako vstupný rovnobežník. Editor pseudokódu červenou farbou podčiarkuje neznáme slová napísané veľkými písmenami na začiatku riadka a zobrazuje ich počet. Je to iba upozornenie, nie kontrola pseudokódu: bežné priradenia ani slová uprostred riadka nekontroluje a neznáme príkazy sa stále zobrazia ako bežné kroky.

Príkazy, ktoré nie sú rozpoznané ako riadiace štruktúry, sa zobrazia ako bežné kroky. Výsledok funkcie možno odovzdať pomocou `VRAT` alebo `RETURN`; zobrazí sa ako výstupný rovnobežník prepojený s koncom diagramu. Generátor vytvára prehľadový diagram; neinterpretuje výrazy, nekontroluje ich syntax a nespúšťa pseudokód. Počítané cykly a podmienky sa zobrazia, ale nevyhodnocujú.

Príklad:

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

### Generovanie Pythonu

Panel Pythonu generuje kód do oblasti medzi komentármi `# BEGIN GENERATED CODE` a `# END GENERATED CODE`. Importy a predpoklady ponechajte pred prvým komentárom, ukážkové dáta a volania za druhým; pri generovaní sa zachová všetok kód mimo tejto oblasti. Po úprave pseudokódu sa oblasť aktualizuje automaticky, kým používateľ ručne neupraví editor Pythonu. Potom možno oblasť prepísať tlačidlom **Generovať Python**. Podporované sú hlavičky algoritmov, podmienky, cykly, `WRITE`/`VYPIS`, `INPUT`/`VSTUP` a `RETURN`/`VRAT`; vstup sa načíta pomocou `input()` a má typ reťazec. Počítaný cyklus zahŕňa koncovú hodnotu. Ostatné príkazy musia byť platné príkazy Pythonu.

### Uloženie algoritmu

Kliknite na tlačidlo **Uložiť JSON**. Súbor sa stiahne s ľudsky čitateľným názvom vybraného algoritmu a príponou `.json`. Neplatné znaky v názve súboru sa nahradia podčiarkovníkom. Ak prehliadač zobrazí dialóg na uloženie, názov možno zmeniť.

Tlačidlom **Načítať JSON** možno načítať súbor v rovnakom formáte. Názov importovaného algoritmu sa zobrazí vo výbere a jeho pseudokód nahradí aktuálny pseudokód. Exportovaný JSON ukladá kanonický anglický pseudokód a obsahuje `"pseudocodeLanguage": "en"`; pri importe sa akceptujú aj podporované lokalizované termíny. JSON neobsahuje Python kód, preto sa pri neupravenom editore Pythonu vygenerovaná oblasť obnoví z pseudokódu a okolitý kód zostane zachovaný.

Export obsahuje názov algoritmu a pseudokód ako pole riadkov. Každý riadok obsahuje `text` bez úvodného odsadenia a `indent` s počtom odsadzovacích medzier; tabulátor sa počíta ako štyri medzery. Prázdne riadky sa zachovajú.

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

### Priblíženie diagramu

Diagram sa automaticky zmenší tak, aby sa zmestil do plochy, ak má panel aspoň **250 px na šírku a 400 px na výšku**. Prispôsobenie sa aktualizuje aj pri zmene veľkosti panela. Tlačidlami v pravom hornom rohu diagramu možno priblížiť, oddialiť alebo obnoviť prispôsobenú mierku. Pri ručnom priblížení možno diagram posúvať pomocou posuvníkov.

## Spustenie aplikácie

1. Otvorte súbor `algoritmizace_vyukovy_nastroj.html` v prehliadači alebo
2. spustite jednoduchý lokálny server, napríklad:

```bash
python -m http.server 8000
```

Potom otvorte adresu `http://localhost:8000`.

## Použité technológie

- HTML, CSS a JavaScript
- Tailwind CSS
- CodeMirror
- Mermaid.js
- Pyodide

## Súbory projektu

- `algoritmizace_vyukovy_nastroj.html` — hlavná aplikácia
- `README.md` — anglická dokumentácia
- `README_cz.md` — česká dokumentácia
- `README_sk.md` — slovenská dokumentácia
- `README_eo.md` — esperantská dokumentácia
- `README_fr.md` — francúzska dokumentácia

## Použitie

Vyberte algoritmus z rozbaľovacej ponuky a upravte jeho pseudokód alebo Python kód. Diagram aktualizujte tlačidlom v paneli pseudokódu. Krokovanie Pythonu spustíte tlačidlom **Start**; potom použite **Spustiť** alebo ovládacie prvky krokovania.
