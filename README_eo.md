# Algoritmoj kaj fluodiagramoj

## Copyright and license

Copyright © 2026 Jiri Kral. Developed at Brno University of Technology (VUT), Faculty of Mechanical Engineering, Department of Applied Computer Science, for student practice.

- Author: [Jiri Kral](https://www.vut.cz/en/people/jiri-kral-3652)
- University contact: [VUT Brno, Faculty of Mechanical Engineering, Dept. of Applied Computer Science](https://www.fme.vutbr.cz/en/fakulta/struktura/pracoviste/uai#oai)

This project is released under the [MIT License](./LICENSE). The license applies to this project's code and documentation; third-party dependencies remain under their respective licenses.

Simpla eduka reteja ilo por bildigi bazajn algoritmojn kaj ilian ruladon en Python. La aplikaĵo kombinas pseŭdokodon, fluodiagramon kaj paŝan ruladon de kodo, do ĝi taŭgas por instrui algoritmikon, ordigon kaj programan logikon.

## Funkcioj

- enhavas malplenan komencan algoritmon kun paŝo „Hello, world!“ kaj ekzemplojn Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic), kaj Pedestrian Crossing (Unsignalized, Complex)
- montras pseŭdokodon kaj la respondan fluodiagramon
- konvertas indentitan pseŭdokodon al Mermaid-diagramoj kun branĉoj kaj iteracioj
- ebligas paŝe ruli Python-kodon kaj observi variablojn laŭlonge de la tempo
- dum paŝa rulado de Python emfazas la respondan blokon en la fluodiagramo
- montras programan eligon kaj emfazas la aktualan fontkodan linion
- eksportas la aktualan pseŭdokodon al JSON, unu ero por linio kun informo pri indento
- importas pseŭdokodon el JSON-dosiero en la sama formato
- aŭtomate adaptas diagramojn al la disponebla spaco kaj ofertas zomajn regilojn
- rulas Python en la retumilo per Pyodide; loka instalado de Python ne estas bezonata
- ofertas interfacon en la ĉeĥa, angla, slovaka, Esperanto kaj franca lingvoj

Ŝanĝu la interfaco-lingvon per la flagaj butonoj kaj kodoj **CS**, **EN**, **SK**, **EO** kaj **FR** en la supra dekstra angulo. Esperanto uzas sian verdan flagon kun verda stelo sur blanka kampo. La defaŭlta lingvo estas la angla. Interfacaj etikedoj kaj subtenataj pseŭdokodaj terminoj estas tradukitaj, sed la homlegeblaj nomoj de la ekzemplaj algoritmoj restas en la angla. Pseŭdokodo estas interne konvertata al kanona angla formo; identigiloj kaj citita teksto estas konservataj.

## Fluodiagramoj kaj subtenata pseŭdokodo

La fluodiagramo aŭtomate ĝisdatiĝas baldaŭ post redaktado de la pseŭdokodo. Elektinte ekzemplan algoritmon, ĝia diagramo tuj montriĝas. La generatoro konvertas ĉiun ne-malplenan linion al diagram-paŝo kaj ignoras malplenajn liniojn. Indento difinas apartenon al blokoj; uzu konsekvencan indenton (du spacoj por nivelo estas rekomendataj). Se kontrolstrukturo estas misformita aŭ diagramo ne povas esti bildigita, la eraro aperas en la diagram-panelo.

La diagramoj de ekzemplaj algoritmoj estas generataj el ilia pseŭdokodo; apartaj antaŭdifinitaj diagramoj ne estas uzataj.

La ekzemploj pri strattransiro modelas transiron sen trafiklumoj. La baza ekzemplo atendas ĝis la vojo estas libera; en ĝia Python-enigo `True` signifas, ke veturilo alproksimiĝas. La kompleksa ekzemplo kontrolas ĉiun vojstrion antaŭ transiri; ĉiu Python-a trafika stato estas listo, kie `True` signifas, ke tiu vojstrio estas danĝera por transiri.

La help-panelo kun subtenataj terminoj havas defaŭltan altecon de **320 px**. Ŝanĝu ĝin trenante la dividilon inter la helpo kaj redaktilo, aŭ fokusante la dividilon kaj uzante la sagoklavojn Supren/Malsupren. Defaŭlte, la Python-redaktilo kaj variabla inspektilo dividas sian panelon egale; variabloj kaj konzolo estas dividitaj laŭ proporcio 60:40. Ambaŭ dividiloj restas regrandigeblaj per trenado aŭ per la sagoklavoj Supren/Malsupren.

Subtenataj kontrolstrukturoj:

La dupunkto ĉe la fino de algoritmaj kaj kontrolstrukturaj kaplinioj estas nedeviga. Indentado de blokoj tamen estas bezonata, kaj la generita Python enhavas la bezonatajn dupunktojn.

- Algoritma kaplinio: `ALGORITMO nomo(parametroj):`.
- Kondiĉo: `SE kondiĉo:`.
- Longaj etikedoj de decidaj nodoj estas falditaj ĉe vortlimoj por malpliigi la altecon de la rombo.
- Laŭvola alternativa branĉo: `ALIE:`. Vicigu la linion `ALIE` kun la responda `SE` aŭ kun la komandoj en la unua branĉo.
- Kondiĉa iteracio: `DUM kondiĉo:`.
- Trairi kolekton: `POR elemento EN kolekto:`. La diagramo montras decidon pri la havebleco de plia elemento, ties atribuon kaj revenan sagon de la iteracio.
- Nombrila iteracio: `POR i DE komenco ĜIS fino:`. La kaplinio aperas kiel seslatero; la sagoj al la korpo kaj reen estas sen etikedoj, kaj la elira sago estas etikedita **Fino de la ciklo**. Iteraciaj paŝoj kaj limoj ne estas kalkulataj. La sagoj de `DUM` kaj kolektaj iteracioj plu uzas **Jes**/**Ne**.
- La sekva bloko de la branĉo **Ne** aperas sub ĉiuj blokoj de la branĉo **Jes**, ankaŭ ĉe nestitaj iteracioj.
- Ĉiuj listigitaj strukturoj povas esti nestitaj. Iliaj korpoj devas esti indentitaj rilate al la kaplinio.

La komando `SKRIBU valoro` montras valoron kiel ordinaran diagram-paŝon. `LEGU variablo` legas valoron kaj montras ĝin kiel enigan paralelogramon. La pseŭdokoda redaktilo ruĝe substrekas nekonatajn vortojn per majuskloj ĉe la komenco de linio kaj montras ilian nombron. Tio estas nur atentigo, ne validigo de pseŭdokodo: ordinaraj atribuoj kaj vortoj ene de linio ne estas kontrolataj, kaj nekonataj komandoj ankoraŭ aperas kiel ordinaraj paŝoj.

Komandoj, kiuj ne estas rekonataj kiel kontrolstrukturoj, aperas kiel ordinaraj paŝoj. Funkcia rezulto estas redonata per `REVENIGU` kaj montriĝas kiel eliga paralelogramo konektita al la fino de la diagramo. La generatoro kreas superrigardan diagramon; ĝi ne interpretas esprimojn, kontrolas ilian sintakson aŭ rulas pseŭdokodon. Nombrilaj iteracioj kaj kondiĉoj do estas montrataj sed ne kalkulataj.

Ekzemplo:

```text
ALGORITMO TrairuMatrico(matrico):
  POR vico EN matrico:
    POR valoro EN vico:
      SE valoro > 0:
        pozitiva_nombro = pozitiva_nombro + 1
      ALIE:
        nepozitiva_nombro = nepozitiva_nombro + 1
  REVENIGU pozitiva_nombro
```

### Generi Python

La Python-panelo generas kodon el la pseŭdokodo inter la komentoj `# BEGIN GENERATED CODE` kaj `# END GENERATED CODE`. Ĉiu komento devas aperi precize unufoje kaj en tiu ordo. Metu importojn kaj antaŭkondiĉojn antaŭ la unua komento, kaj ekzemplajn datumojn kaj vokojn post la dua; regenerado konservas la kodon ekster tiu regiono. La subtenataj pseŭdokodaj strukturoj, komandoj kaj operatoroj devas esti skribitaj precize per majuskloj; aliaj skribmanieroj estas rifuzitaj. Enigo asignas la rezulton de `input()` al unu variablo kaj estas teksto; la fina valoro de nombrila iteracio estas inkluzivita. Bazaj esprimoj konserviĝas; subtenataj operatoroj kaj `LENGTH(...)` estas tradukataj al Python-ekvivalentoj. Alia komandteksto estas elsendata kiel Python kaj devas esti valida Python. Pseŭdokodaj ŝanĝoj ĝisdatigas la generitan regionon aŭtomate ĝis mana ŝanĝo de la Python-redaktilo. Poste **Generi Python** anstataŭigas nur tiun regionon; eraroj aperas apud la butono kaj la ekzistanta kodo restas senŝanĝa. Dum paŝa rulado de Python emfaziĝas la responda diagram-bloko.

### Konservi algoritmon

Alklaku **Konservi JSON**. La dosiero elŝutiĝas kun la homlegebla nomo de la elektita algoritmo kaj la sufikso `.json`. Nevalidaj signoj en la dosiernomo estas anstataŭigitaj per substrekoj. Retumila dialogo por konservi la dosieron povas ebligi ŝanĝi la nomon.

Uzu **Ŝargi JSON** por importi dosieron en la sama formato. La importita algoritmo aperas en la elektilo sub la alŝutita dosiernomo sen ĝia sufikso, kaj ĝia pseŭdokodo anstataŭigas la aktualan. Eksportitaj JSON-dosieroj konservas kanonan anglan pseŭdokodon kaj enhavas `"pseudocodeLanguage": "en"`; importado ankaŭ akceptas la subtenatajn lokalizitajn terminojn. Ĉar JSON ne enhavas Python-kodon, la generita regiono estas ĝisdatigita el la pseŭdokodo se la Python-redaktilo ne estis permane ŝanĝita; la ĉirkaŭa kodo estas konservata.

La eksporto enhavas la algoritman nomon kaj la pseŭdokodon kiel tabelon de linioj. Ĉiu linio havas `text` kun la enhavo sen komenca indento kaj `indent` kun la nombro de indentaj spacoj; tabo kalkuliĝas kiel kvar spacoj. Malplenaj linioj estas konservataj.

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

Elektu algoritmon el la falmenuo kaj redaktu ĝian pseŭdokodon aŭ Python-kodon. La diagramo aŭtomate ĝisdatiĝas post ŝanĝo de pseŭdokodo. Por paŝe ruli Python-kodon, alklaku **Start**, poste uzu **Run** aŭ la paŝajn regilojn.
