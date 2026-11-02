# Algorithmes et organigrammes

Un outil pédagogique web simple pour visualiser des algorithmes de base et leur exécution en Python. L’application associe pseudocode, organigrammes et exécution pas à pas, ce qui la rend adaptée à l’enseignement des algorithmes, du tri et de la logique de programmation.

## Fonctionnalités

- propose un algorithme de départ vide avec une étape « Hello, world! », ainsi que Bubble Sort, Factorial (Recursion/Loops), Find Maximum in an Array, Euclidean Algorithm (GCD), Triangle Area from Three Sides, Pedestrian Crossing (Basic) et Pedestrian Crossing (Unsignalized, Complex)
- affiche le pseudocode et l’organigramme correspondant
- convertit le pseudocode indenté en diagrammes Mermaid avec des branches et des boucles
- permet d’exécuter le code Python pas à pas et de suivre les variables
- met en évidence le bloc correspondant dans l’organigramme pendant l’exécution pas à pas du Python généré
- affiche la sortie du programme et met en évidence la ligne de code source actuelle
- exporte le pseudocode courant en JSON, avec une entrée par ligne et une indication d’indentation
- importe le pseudocode depuis un fichier JSON au même format
- adapte automatiquement l’échelle des diagrammes et propose des commandes de zoom
- exécute Python dans le navigateur grâce à Pyodide, sans installation locale de Python
- propose une interface en tchèque, anglais, slovaque, espéranto et français

Utilisez les boutons avec drapeaux et codes **CS**, **EN**, **SK**, **EO** et **FR**, en haut à droite, pour changer la langue de l’interface. L’espéranto utilise son drapeau vert avec une étoile verte sur un canton blanc. La langue par défaut est l’anglais. Les libellés de l’interface et les termes de pseudocode pris en charge sont traduits, mais les noms lisibles des algorithmes d’exemple restent en anglais. Le pseudocode est converti en anglais canonique en interne ; les identifiants et le texte entre guillemets sont conservés.

## Organigrammes et pseudocode pris en charge

L’organigramme est actualisé automatiquement peu après la modification du pseudocode. La sélection d’un algorithme d’exemple affiche son diagramme sans délai. Le générateur transforme chaque ligne non vide en une étape du diagramme et ignore les lignes vides. L’indentation détermine l’appartenance aux blocs ; utilisez une indentation cohérente (deux espaces par niveau sont recommandés). Si une structure de contrôle est mal formée ou si le diagramme ne peut pas être affiché, une erreur apparaît dans le panneau du diagramme.

Les diagrammes des algorithmes d’exemple sont générés à partir de leur pseudocode ; aucun diagramme prédéfini indépendant n’est utilisé.

Les exemples de traversée modélisent un passage sans feux de circulation. L’exemple de base attend que la voie soit libre ; dans son entrée Python, `True` signifie qu’un véhicule approche. L’exemple complexe vérifie chaque voie avant de traverser ; chaque situation de circulation Python est une liste où `True` signifie que la voie concernée est dangereuse à traverser.

Le panneau d’aide des termes pris en charge a une hauteur initiale de **320 px**. Vous pouvez la modifier en faisant glisser le séparateur entre l’aide et l’éditeur, ou en sélectionnant ce séparateur et en utilisant les flèches Haut/Bas. Par défaut, l’éditeur Python et l’inspecteur de variables se partagent la hauteur à parts égales ; l’inspecteur et la console sont répartis selon un rapport 60:40. Les deux séparateurs restent redimensionnables par glissement ou avec les flèches Haut/Bas.

Structures de contrôle prises en charge :

- En-tête d’algorithme : `ALGORITMUS nom(paramètres):` ou `ALGORITHM name(parameters):`.
- Condition : `POKUD condition:` ou `IF condition:`.
- Les longs libellés des nœuds de décision sont coupés aux limites des mots afin de réduire la hauteur du losange.
- Branche alternative facultative : `JINAK:` ou `ELSE:`. Alignez `JINAK`/`ELSE` soit avec le `POKUD`/`IF` correspondant, soit avec les instructions de la première branche.
- Boucle conditionnelle : `DOKUD condition:` ou `WHILE condition:`.
- Parcours d’une collection : `PRO élément V collection:` ou `FOR élément IN collection:`. Le diagramme représente la décision indiquant s’il reste un élément, son affectation et la flèche de retour de la boucle.
- Boucle comptée : `PRO i OD début DO fin:` ou `FOR i FROM start TO end:`. L’en-tête est représenté par un hexagone ; les flèches vers le corps et de retour ne portent pas de libellé, et la flèche de sortie porte **Fin de boucle**. Les étapes et les limites des itérations ne sont pas évaluées. Les flèches des boucles `WHILE` et des parcours de collection conservent leurs libellés **Oui**/**Non**.
- Le bloc suivant de la branche **Non** est placé sous tous les blocs de la branche **Oui**, y compris dans les boucles imbriquées.
- Toutes les structures indiquées peuvent être imbriquées. Leur corps doit être indenté par rapport à l’en-tête.

La commande `VYPIS valeur` ou `WRITE value` affiche une valeur comme une étape ordinaire du diagramme. `VSTUP variable` ou `INPUT variable` lit une valeur et l’affiche sous forme de parallélogramme d’entrée. L’éditeur de pseudocode souligne en rouge les mots inconnus écrits en majuscules au début d’une ligne et en indique le nombre. Il s’agit d’un simple avertissement, pas d’une validation du pseudocode : les affectations ordinaires et les mots au milieu d’une ligne ne sont pas vérifiés, et les commandes inconnues restent affichées comme des étapes ordinaires.

Les commandes qui ne sont pas reconnues comme des structures de contrôle s’affichent comme des étapes ordinaires. Le résultat d’une fonction peut être renvoyé avec `VRAT` ou `RETURN` et apparaît sous forme de parallélogramme de sortie relié à la fin du diagramme. Le générateur crée un diagramme récapitulatif ; il n’interprète pas les expressions, ne vérifie pas leur syntaxe et n’exécute pas le pseudocode. Les boucles comptées et les conditions sont donc représentées, mais pas évaluées.

Exemple :

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

### Générer du Python

Le panneau Python génère le code à partir du pseudocode dans la région délimitée par `# BEGIN GENERATED CODE` et `# END GENERATED CODE`. Chaque marqueur doit apparaître une seule fois et dans cet ordre. Placez les imports et préconditions avant le premier marqueur, puis les données d’exemple et appels après le second ; la régénération préserve le code situé hors de cette région. Les en-têtes d’algorithme, `IF`/`POKUD`, `ELSE`/`JINAK`, `WHILE`/`DOKUD`, les deux formes de `FOR`/`PRO`, `WRITE`/`VYPIS`, `INPUT`/`VSTUP` et `RETURN`/`VRAT` sont pris en charge. La saisie affecte le résultat de `input()` à une variable et produit une chaîne ; la borne finale des boucles comptées est incluse. Les expressions simples sont conservées ; `MOD`, `NEBO`, `A` autonome, `AND`, `OR`, `NOT`, `true`, `false` et `length(...)` sont convertis en équivalents Python. Les autres instructions sont émises comme du Python et doivent être valides. Les modifications du pseudocode actualisent automatiquement la région jusqu’à une modification manuelle de l’éditeur Python. Ensuite, **Générer Python** remplace uniquement cette région ; les erreurs sont affichées près du bouton et le code existant reste inchangé. Pendant l’exécution pas à pas, le bloc correspondant de l’organigramme est mis en évidence.

### Enregistrer un algorithme

Cliquez sur **Enregistrer JSON**. Le fichier est téléchargé avec le nom lisible de l’algorithme sélectionné et l’extension `.json`. Les caractères interdits dans les noms de fichier sont remplacés par des traits de soulignement. Une boîte de dialogue du navigateur peut permettre de modifier le nom.

Utilisez **Charger JSON** pour importer un fichier au même format. L’algorithme importé apparaît dans la liste sous le nom du fichier sans son extension, et son pseudocode remplace le pseudocode actuel. Les exports JSON stockent le pseudocode canonique anglais et contiennent `"pseudocodeLanguage": "en"` ; les imports acceptent également les termes localisés pris en charge. JSON ne contient pas de code Python ; la région générée est donc mise à jour à partir du pseudocode si l’éditeur Python n’a pas été modifié manuellement, tandis que le code environnant est préservé.

L’export contient le nom de l’algorithme et le pseudocode sous forme de tableau de lignes. Chaque ligne possède `text`, qui contient le texte sans indentation initiale, et `indent`, qui indique le nombre d’espaces d’indentation ; une tabulation compte pour quatre espaces. Les lignes vides sont conservées.

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

### Zoom de l’organigramme

L’organigramme est automatiquement réduit pour tenir dans le panneau lorsque celui-ci mesure au moins **250 px de largeur et 400 px de hauteur**. L’ajustement est recalculé lorsque le panneau est redimensionné. Les boutons en haut à droite de l’organigramme permettent de zoomer, dézoomer ou de rétablir l’échelle ajustée. Lorsque le zoom est réglé manuellement, utilisez les barres de défilement pour parcourir le diagramme.

## Lancer l’application

1. Ouvrez `algoritmizace_vyukovy_nastroj.html` dans un navigateur, ou
2. lancez un serveur local simple, par exemple :

```bash
python -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`.

## Technologies

- HTML, CSS et JavaScript
- Tailwind CSS
- CodeMirror
- Mermaid.js
- Pyodide

## Fichiers du projet

- `algoritmizace_vyukovy_nastroj.html` — application principale
- `README.md` — documentation en anglais
- `README_cz.md` — documentation en tchèque
- `README_sk.md` — documentation en slovaque
- `README_eo.md` — documentation en espéranto
- `README_fr.md` — documentation en français

## Utilisation

Sélectionnez un algorithme dans la liste déroulante et modifiez son pseudocode ou son code Python. L’organigramme est actualisé automatiquement après une modification du pseudocode. Pour exécuter le code Python pas à pas, cliquez sur **Start**, puis utilisez **Run** ou les commandes d’avancement.
