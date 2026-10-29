# Algoritmoj kaj fluodiagramoj

Simpla eduka reteja ilo por bildigi bazajn algoritmojn kaj ilian ruladon en Python. La aplikaĵo kombinas pseŭdokodon, fluodiagramon kaj paŝan ruladon de kodo, do ĝi taŭgas por instrui algoritmikon, ordigon kaj programan logikon.

## Funkcioj

- enhavas ekzemplajn algoritmojn: Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic) kaj Pedestrian Crossing (Unsignalized, Complex)
- montras pseŭdokodon kaj la respondan fluodiagramon
- konvertas indentitan pseŭdokodon al Mermaid-diagramoj kun branĉoj kaj iteracioj
- ebligas paŝe ruli Python-kodon kaj observi variablojn laŭlonge de la tempo
- montras programan eligon kaj emfazas la aktualan fontkodan linion
- eksportas la aktualan pseŭdokodon al JSON, unu ero por linio kun informo pri indento
- aŭtomate adaptas diagramojn al la disponebla spaco kaj ofertas zomajn regilojn
- rulas Python en la retumilo per Pyodide; loka instalado de Python ne estas bezonata
- ofertas interfacon en la ĉeĥa, angla, slovaka, Esperanto kaj franca lingvoj

Ŝanĝu la interfaco-lingvon per la flagaj butonoj kaj kodoj **CS**, **EN**, **SK**, **EO** kaj **FR** en la supra dekstra angulo. Esperanto uzas sian verdan flagon kun verda stelo sur blanka kampo. La defaŭlta lingvo estas la ĉeĥa. Interfacaj etikedoj estas tradukitaj, sed la homlegeblaj nomoj de la ekzemplaj algoritmoj restas en la angla. Pseŭdokodaj terminoj kaj la enhavo de la redaktata algoritmo ne estas tradukitaj.

## Fluodiagramoj kaj subtenata pseŭdokodo

La fluodiagramo aŭtomate ĝisdatiĝas baldaŭ post redaktado de la pseŭdokodo. Uzu **Ĝisdatigi diagramon el pseŭdokodo** por tuj refreŝigi ĝin. Elektinte ekzemplan algoritmon, ĝia diagramo tuj montriĝas. La generatoro konvertas ĉiun ne-malplenan linion al diagram-paŝo kaj ignoras malplenajn liniojn. Indento difinas apartenon al blokoj; uzu konsekvencan indenton (du spacoj por nivelo estas rekomendataj). Se kontrolstrukturo estas misformita aŭ diagramo ne povas esti bildigita, la eraro aperas en la diagram-panelo.

La diagramoj de ekzemplaj algoritmoj estas generataj el ilia pseŭdokodo; apartaj antaŭdifinitaj diagramoj ne estas uzataj.

La ekzemploj pri strattransiro modelas transiron sen trafiklumoj. La baza ekzemplo atendas ĝis la vojo estas libera; en ĝia Python-enigo `True` signifas, ke veturilo alproksimiĝas. La kompleksa ekzemplo kontrolas ĉiun vojstrion antaŭ transiri; ĉiu Python-a trafika stato estas listo, kie `True` signifas, ke tiu vojstrio estas danĝera por transiri.

La help-panelo kun subtenataj terminoj havas defaŭltan altecon de **224 px**. Ŝanĝu ĝin trenante la dividilon inter la helpo kaj redaktilo, aŭ fokusante la dividilon kaj uzante la sagoklavojn Supren/Malsupren.

Subtenataj kontrolstrukturoj:

- Algoritma kaplinio: `ALGORITMUS name(parameters):`.
- Kondiĉo: `POKUD condition:` aŭ `IF condition:`.
- Longaj etikedoj de decidaj nodoj estas falditaj ĉe vortlimoj por malpliigi la altecon de la rombo.
- Laŭvola alternativa branĉo: `JINAK:` aŭ `ELSE:`. Vicigu la linion `JINAK`/`ELSE` kun la responda `POKUD`/`IF` aŭ kun la komandoj en la unua branĉo.
- Kondiĉa iteracio: `DOKUD condition:` aŭ `WHILE condition:`.
- Trairi kolekton: `PRO item V collection:` aŭ `FOR item IN collection:`. La diagramo montras decidon pri la havebleco de plia elemento, ties atribuon kaj revenan sagon de la iteracio.
- Nombrila iteracio: `PRO i OD start DO end:` aŭ `FOR i FROM start TO end:`. La kaplinio aperas kiel seslatero kun revena sago; iteraciaj paŝoj kaj limoj ne estas kalkulataj.
- La sekva bloko de la branĉo `Ne` aperas sub ĉiuj blokoj de la branĉo `Ano`, ankaŭ ĉe nestitaj iteracioj.
- Ĉiuj listigitaj strukturoj povas esti nestitaj. Iliaj korpoj devas esti indentitaj rilate al la kaplinio.

La komando `VYPIS value` aŭ `WRITE value` montras valoron kiel ordinaran diagram-paŝon. La pseŭdokoda redaktilo ruĝe substrekas nekonatajn vortojn per majuskloj ĉe la komenco de linio kaj montras ilian nombron. Tio estas nur atentigo, ne validigo de pseŭdokodo: ordinaraj atribuoj kaj vortoj ene de linio ne estas kontrolataj, kaj nekonataj komandoj ankoraŭ aperas kiel ordinaraj paŝoj.

Komandoj, kiuj ne estas rekonataj kiel kontrolstrukturoj, aperas kiel ordinaraj paŝoj. Funkcia rezulto estas redonata per `VRAT` aŭ `RETURN` kaj montriĝas kiel eliga paralelogramo konektita al la fino de la diagramo. La generatoro kreas superrigardan diagramon; ĝi ne interpretas esprimojn, kontrolas ilian sintakson aŭ rulas pseŭdokodon. Nombrilaj iteracioj kaj kondiĉoj do estas montrataj sed ne kalkulataj.

Ekzemplo:

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

### Konservi algoritmon

Alklaku **JSON**. La dosiero elŝutiĝas kun la homlegebla nomo de la elektita algoritmo kaj la sufikso `.json`. Nevalidaj signoj en la dosiernomo estas anstataŭigitaj per substrekoj. Retumila dialogo por konservi la dosieron povas ebligi ŝanĝi la nomon.

La eksporto enhavas la algoritman nomon kaj la pseŭdokodon kiel tabelon de linioj. Ĉiu linio havas `text` kun la enhavo sen komenca indento kaj `indent` kun la nombro de indentaj spacoj; tabo kalkuliĝas kiel kvar spacoj. Malplenaj linioj estas konservataj.

```json
{
  "name": "Bubble Sort",
  "pseudocode": [
    { "text": "ALGORITMUS Example:", "indent": 0 },
    { "text": "VYPIS value", "indent": 2 }
  ]
}
```

### Zomi la diagramon

La diagramo aŭtomate malgrandiĝas por konveni al la panelo, se ĝi estas almenaŭ **250 px larĝa kaj 400 px alta**. La adapto ĝisdatiĝas ankaŭ kiam la panelo estas regrandigita. Uzu la butonojn en la supra dekstra angulo de la diagramo por zomi, malzomi aŭ restarigi la adaptitan skalon. Ĉe mana zomo, uzu la rulumilojn de la panelo por moviĝi tra la diagramo.

## Lanĉi la aplikaĵon

1. Malfermu `algoritmizace_vyukovy_nastroj.html` en retumilo, aŭ
2. lanĉu simplan lokan servilon, ekzemple:

```bash
python -m http.server 8000
```

Poste malfermu `http://localhost:8000`.

## Teknologioj

- HTML, CSS kaj JavaScript
- Tailwind CSS
- CodeMirror
- Mermaid.js
- Pyodide

## Projektaj dosieroj

- `algoritmizace_vyukovy_nastroj.html` — ĉefa aplikaĵo
- `README.md` — angla dokumentaro
- `README_cz.md` — ĉeĥa dokumentaro
- `README_sk.md` — slovaka dokumentaro
- `README_eo.md` — Esperanta dokumentaro
- `README_fr.md` — franca dokumentaro

## Uzado

Elektu algoritmon el la falmenuo kaj redaktu ĝian pseŭdokodon aŭ Python-kodon. Ĝisdatigu la diagramon per la butono en la pseŭdokoda panelo. Por paŝe ruli Python-kodon, alklaku **Start**, poste uzu **Run** aŭ la paŝajn regilojn.
