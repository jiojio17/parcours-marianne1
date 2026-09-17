/* Banque d’entraînement — questions de connaissances et situations. */
const EXAM_BANK = [
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quelle est la devise de la République française ?",
    "options": [
      "Liberté, Égalité, Fraternité",
      "Travail, Famille, Patrie",
      "Paix, Justice, Progrès",
      "Unité, Force, Honneur"
    ],
    "explanation": "C’est la devise officielle, inscrite à l’article 2 de la Constitution, héritée de la Révolution de 1789.",
    "why": "« Travail, Famille, Patrie » était la devise du régime de Vichy (1940-1944) — piège classique !"
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Où peut-on voir la devise de la République ?",
    "options": [
      "Sur les bâtiments publics (mairies, écoles, tribunaux)",
      "Uniquement sur les billets de banque",
      "Dans les églises",
      "Sur les plaques d’immatriculation"
    ],
    "explanation": "« Liberté, Égalité, Fraternité » est inscrite sur le fronton des bâtiments publics.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quelles sont les couleurs du drapeau français ?",
    "options": [
      "Bleu, blanc, rouge",
      "Rouge, jaune, vert",
      "Bleu, jaune, rouge",
      "Bleu, blanc, vert"
    ],
    "explanation": "Le drapeau tricolore bleu-blanc-rouge est l’emblème national depuis la Révolution.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quel est le nom de l’hymne national français ?",
    "options": [
      "La Marseillaise",
      "Le Chant du départ",
      "L’Ode à la Joie",
      "La Parisienne"
    ],
    "explanation": "La Marseillaise, composée par Rouget de Lisle en 1792. L’Ode à la Joie est l’hymne… européen.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qui a composé la Marseillaise ?",
    "options": [
      "Rouget de Lisle",
      "Victor Hugo",
      "Beethoven",
      "Mozart"
    ],
    "explanation": "Claude Joseph Rouget de Lisle, officier, l’a composée à Strasbourg en avril 1792. Beethoven a composé l’hymne européen.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Complétez : « Allons enfants de la patrie… »",
    "options": [
      "… le jour de gloire est arrivé",
      "… la victoire est à nous",
      "… le soleil se lève",
      "… la République nous appelle"
    ],
    "explanation": "C’est le premier vers de la Marseillaise, composée en 1792.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qui est Marianne ?",
    "options": [
      "La figure symbolique de la République française",
      "La première reine de France",
      "Une héroïne de la guerre de 1914",
      "L’épouse de Napoléon"
    ],
    "explanation": "Marianne est une figure imaginaire : son buste trône dans toutes les mairies. Elle porte le bonnet phrygien, symbole de liberté.",
    "why": "Jeanne d’Arc et Simone Veil sont des personnalités réelles, pas le symbole de la République."
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Que porte Marianne sur la tête ?",
    "options": [
      "Le bonnet phrygien",
      "Une couronne royale",
      "Un casque de guerre",
      "Un chapeau de paille"
    ],
    "explanation": "Le bonnet phrygien : dans l’Antiquité, il était porté par les esclaves libérés. Il symbolise donc la liberté.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Sur quel document peut-on voir Marianne ?",
    "options": [
      "Sur les timbres, les pièces de monnaie et les documents officiels",
      "Uniquement sur le passeport",
      "Sur les plaques de rue",
      "Sur les billets d’avion"
    ],
    "explanation": "Marianne est partout : timbres-poste, pièces, cartes officielles… et son buste dans les mairies.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quel animal symbolise traditionnellement la France ?",
    "options": [
      "Le coq",
      "L’aigle",
      "L’ours",
      "Le lion"
    ],
    "explanation": "Le coq gaulois ! En latin, « gallus » désignait à la fois le coq et le Gaulois. Il figure sur les maillots de sport.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Lequel de ces éléments n’est PAS un symbole officiel inscrit dans la Constitution ?",
    "options": [
      "Le coq",
      "Le drapeau tricolore",
      "La Marseillaise",
      "La devise Liberté, Égalité, Fraternité"
    ],
    "explanation": "L’article 2 cite le drapeau, l’hymne et la devise. Le coq et Marianne sont des symboles traditionnels, pas constitutionnels.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quelle est la date de la fête nationale française ?",
    "options": [
      "Le 14 juillet",
      "Le 4 juillet",
      "Le 11 novembre",
      "Le 1er mai"
    ],
    "explanation": "Le 14 juillet : prise de la Bastille (1789) et fête de la Fédération (1790). Chaque année : défilé, bals et feux d’artifice.",
    "why": "Le 4 juillet, c’est la fête nationale… américaine. Piège fréquent !"
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qu’est-ce qui est traditionnellement organisé le 14 juillet sur les Champs-Élysées ?",
    "options": [
      "Un défilé militaire",
      "Un carnaval",
      "Un marché de Noël",
      "Une course cycliste"
    ],
    "explanation": "Le défilé militaire du 14 juillet descend les Champs-Élysées chaque année devant le président de la République.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Peut-on brûler publiquement un drapeau français ?",
    "options": [
      "Non, c’est un délit puni par la loi",
      "Oui, c’est la liberté d’expression",
      "Oui, si c’est pour une manifestation",
      "Oui, le dimanche seulement"
    ],
    "explanation": "L’outrage au drapeau national est un délit : jusqu’à 1 500 € d’amende. Respecter les symboles, c’est respecter la Nation.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Que signifie la « fraternité » dans la devise ?",
    "options": [
      "La solidarité entre les citoyens",
      "L’amitié entre voisins seulement",
      "L’amour de la famille",
      "Le partage de l’argent"
    ],
    "explanation": "Se voir comme des semblables, membres d’une même communauté : on veille les uns sur les autres.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Que signifie « égalité » dans la devise républicaine ?",
    "options": [
      "Les mêmes droits et devoirs pour tous, sans distinction",
      "Gagner le même salaire que tout le monde",
      "Porter les mêmes vêtements",
      "Habiter dans le même quartier"
    ],
    "explanation": "Mêmes droits, mêmes devoirs, quelle que soit l’origine, le sexe ou la religion (article 1er de la Constitution).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quelle est la langue officielle de la République française ?",
    "options": [
      "Le français",
      "L’anglais",
      "Il n’y a pas de langue officielle",
      "Le français et le basque"
    ],
    "explanation": "L’article 2 de la Constitution : « La langue de la République est le français ».",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qu’est-ce que la laïcité ?",
    "options": [
      "La liberté de croire ou de ne pas croire",
      "L’interdiction de toutes les religions",
      "Une religion officielle de l’État",
      "L’obligation d’être athée"
    ],
    "explanation": "La laïcité garantit la liberté de conscience : chacun peut croire, ne pas croire, changer de religion.",
    "why": "La laïcité n’interdit PAS la religion : elle la protège, tout en gardant l’État neutre."
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "En quelle année la loi de séparation des Églises et de l’État a-t-elle été votée ?",
    "options": [
      "1905",
      "1789",
      "1882",
      "1958"
    ],
    "explanation": "Le 9 décembre 1905 : la République ne reconnaît, ne salarie ni ne subventionne aucun culte.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Que prévoit la loi du 9 décembre 1905 ?",
    "options": [
      "La séparation des Églises et de l’État, la neutralité de l’État et la liberté de conscience",
      "L’école obligatoire",
      "Le droit de vote des femmes",
      "L’abolition de la peine de mort"
    ],
    "explanation": "C’est le texte fondateur de la laïcité française : l’État est neutre, chacun est libre de croire.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quel est le « jour de la laïcité » en France ?",
    "options": [
      "Le 9 décembre",
      "Le 14 juillet",
      "Le 1er janvier",
      "Le 11 novembre"
    ],
    "explanation": "Le 9 décembre, anniversaire de la loi de 1905, est la journée de la laïcité.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Selon la laïcité, que signifie la neutralité de l’État ?",
    "options": [
      "L’État ne privilégie aucune religion et traite tous les citoyens de manière égale",
      "L’État interdit les religions",
      "L’État choisit une religion pour les citoyens",
      "L’État finance toutes les religions"
    ],
    "explanation": "Neutre ne veut pas dire hostile : l’État protège la liberté religieuse sans favoriser personne.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qui doit respecter la neutralité religieuse dans les services publics ?",
    "options": [
      "Les agents publics (fonctionnaires)",
      "Les usagers dans la rue",
      "Les enfants à la maison",
      "Personne"
    ],
    "explanation": "Les agents publics ne manifestent pas leur religion au travail. Les usagers, eux, restent libres de leurs tenues.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Un élève peut-il porter un signe religieux ostensible dans une école publique ?",
    "options": [
      "Non, la loi de 2004 l’interdit dans les écoles publiques",
      "Oui, toujours",
      "Oui, s’il a plus de 15 ans",
      "Seulement le vendredi"
    ],
    "explanation": "La loi du 15 mars 2004 interdit les signes religieux ostensibles à l’école publique : l’école reste un espace neutre et apaisé.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Une personne peut-elle changer librement de religion en France ?",
    "options": [
      "Oui, c’est la liberté de conscience",
      "Non, c’est interdit",
      "Oui, mais avec une autorisation du préfet",
      "Seulement une fois dans sa vie"
    ],
    "explanation": "La liberté de conscience inclut le droit de croire, de ne plus croire ou de changer de religion.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Comment appelle-t-on une personne qui ne croit en aucun dieu ?",
    "options": [
      "Une personne athée",
      "Une personne pratiquante",
      "Une personne croyante",
      "Une personne laïque"
    ],
    "explanation": "Athée = qui ne croit en aucun dieu. La laïcité protège autant les croyants que les athées.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Quelle institution doit rester neutre en matière de religion ?",
    "options": [
      "L’État et ses services publics (mairies, écoles, hôpitaux, tribunaux)",
      "Les restaurants",
      "Les entreprises privées",
      "Les familles"
    ],
    "explanation": "Neutralité pour l’État et ses agents ; liberté pour les citoyens dans l’espace public.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qu’est-ce que l’antisémitisme ?",
    "options": [
      "Une forme de racisme dirigée contre les personnes juives, punie par la loi",
      "Une religion",
      "Un parti politique",
      "Une fête traditionnelle"
    ],
    "explanation": "L’antisémitisme est un délit. Les contenus haineux peuvent être signalés sur la plateforme Pharos.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qu’est-ce que la liberté d’association ?",
    "options": [
      "Le droit de créer ou de rejoindre librement une association",
      "Le droit de voter",
      "Le droit de grève",
      "Le droit de rester chez soi"
    ],
    "explanation": "Garantie par la loi du 1er juillet 1901 : culturelle, sportive, caritative… chacun peut s’associer librement.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "En France, il est possible pour l’État de financer :",
    "options": [
      "Aucun culte (l’État ne salarie ni ne subventionne de religion)",
      "Toutes les religions",
      "Seulement une religion officielle",
      "Les religions majoritaires"
    ],
    "explanation": "Article 2 de la loi de 1905. (Exception historique : l’Alsace-Moselle, restée sous le concordat de 1801.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 1,
    "q": "Qu’est-ce que la Charte de la laïcité à l’école (2013) ?",
    "options": [
      "Un document affiché dans les établissements qui rappelle les règles de la laïcité",
      "Un diplôme de fin de collège",
      "Un manuel de religion",
      "Une chanson patriotique"
    ],
    "explanation": "Affichée dans toutes les écoles publiques depuis 2013, elle rappelle neutralité, liberté de conscience et refus du prosélytisme.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quel est le régime politique de la France aujourd’hui ?",
    "options": [
      "La Ve République",
      "Une monarchie",
      "Un Empire",
      "La IVe République"
    ],
    "explanation": "La Ve République, fondée en 1958 par le général de Gaulle, est notre régime actuel.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui est élu lors des élections présidentielles ?",
    "options": [
      "Le président de la République",
      "Le Premier ministre",
      "Le maire",
      "Les députés"
    ],
    "explanation": "Le président est élu au suffrage universel direct par tous les électeurs inscrits.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Pour combien de temps le président de la République est-il élu ?",
    "options": [
      "5 ans",
      "7 ans",
      "4 ans",
      "6 ans"
    ],
    "explanation": "5 ans : c’est le « quinquennat », en place depuis le référendum de 2000 (avant : 7 ans).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Où réside le président de la République ?",
    "options": [
      "Au palais de l’Élysée",
      "À l’hôtel de Matignon",
      "Au palais du Luxembourg",
      "Au château de Versailles"
    ],
    "explanation": "L’Élysée = le président. Matignon = le Premier ministre. Le Luxembourg = le Sénat. Bien distinguer !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui dirige l’action du Gouvernement ?",
    "options": [
      "Le Premier ministre",
      "Le président de la République",
      "Le maire de Paris",
      "Le préfet"
    ],
    "explanation": "Article 21 de la Constitution : le Premier ministre dirige l’action du Gouvernement et veille à l’exécution des lois.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui est élu lors des élections législatives ?",
    "options": [
      "Les députés",
      "Le président",
      "Les maires",
      "Les sénateurs"
    ],
    "explanation": "Les législatives élisent les députés, qui siègent à l’Assemblée nationale au palais Bourbon.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Combien de députés composent l’Assemblée nationale ?",
    "options": [
      "577",
      "348",
      "300",
      "650"
    ],
    "explanation": "577 députés à l’Assemblée nationale. Astuce mémo : le Sénat compte 348 sénateurs, les deux ensemble = le Parlement.",
    "why": "348, c’est le nombre de sénateurs au Sénat — le piège préféré de l’examen !"
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Pour combien de temps les députés sont-ils élus ?",
    "options": [
      "5 ans",
      "6 ans",
      "4 ans",
      "7 ans"
    ],
    "explanation": "Députés : 5 ans. Sénateurs : 6 ans. Maires et conseils municipaux : 6 ans. Président : 5 ans.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Pour combien de temps les sénateurs sont-ils élus ?",
    "options": [
      "6 ans",
      "5 ans",
      "9 ans",
      "4 ans"
    ],
    "explanation": "6 ans, renouvelés par moitié tous les 3 ans. Ils siègent au palais du Luxembourg.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Comment les sénateurs sont-ils élus ?",
    "options": [
      "Au suffrage universel indirect, par des grands électeurs",
      "Au suffrage universel direct",
      "Par le président",
      "Par tirage au sort"
    ],
    "explanation": "Les sénateurs sont choisis par un collège de grands électeurs (élus locaux) : suffrage indirect.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui vote les lois ?",
    "options": [
      "Le Parlement (Assemblée nationale et Sénat)",
      "Le président tout seul",
      "Le préfet",
      "Les maires"
    ],
    "explanation": "Le Parlement, composé de DEUX chambres : l’Assemblée nationale et le Sénat. Le président promulgue ensuite les lois.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui est élu lors des élections municipales ?",
    "options": [
      "Les conseillers municipaux (qui élisent ensuite le maire)",
      "Le maire directement",
      "Le préfet",
      "Les ministres"
    ],
    "explanation": "Les habitants élisent les conseillers municipaux ; CEUX-CI choisissent ensuite le maire parmi eux.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Comment le maire d’une commune est-il désigné ?",
    "options": [
      "Élu par le conseil municipal parmi ses membres",
      "Nommé par le président",
      "Élu directement par les habitants",
      "Tiré au sort"
    ],
    "explanation": "Les électeurs votent pour une liste de conseillers ; les conseillers élus choisissent leur maire. Mandat de 6 ans.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui représente l’État dans un département ?",
    "options": [
      "Le préfet",
      "Le maire",
      "Le député",
      "Le président de région"
    ],
    "explanation": "Le préfet est nommé par l’État : il veille à l’application des lois dans le département. Le maire, lui, dirige la commune.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Combien y a-t-il de départements en France ?",
    "options": [
      "101",
      "96",
      "18",
      "350"
    ],
    "explanation": "101 départements : 96 en métropole + 5 d’outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte).",
    "why": "96 = seulement la métropole. 18 = le nombre de régions. Ne pas mélanger !"
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Comment la France est-elle organisée administrativement ?",
    "options": [
      "Communes, départements et régions",
      "Provinces et royaumes",
      "États et cantons",
      "10 grandes provinces"
    ],
    "explanation": "≈ 35 000 communes, 101 départements, 18 régions (13 en métropole + 5 outre-mer).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "À quel âge a-t-on le droit de voter en France ?",
    "options": [
      "18 ans",
      "16 ans",
      "21 ans",
      "25 ans"
    ],
    "explanation": "La majorité civile et le droit de vote sont à 18 ans. À 16 ans : le recensement citoyen en mairie.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Le vote en France est-il obligatoire ?",
    "options": [
      "Non, c’est un droit civique, pas une obligation",
      "Oui, sous peine d’amende",
      "Oui, pour les présidentielles",
      "Seulement pour les moins de 50 ans"
    ],
    "explanation": "Pas d’obligation légale, mais voter est un acte essentiel : c’est la voix du peuple !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "À qui appartient la souveraineté nationale ?",
    "options": [
      "Au peuple, qui l’exerce par ses représentants et par référendum",
      "Au président",
      "À l’armée",
      "Aux riches propriétaires"
    ],
    "explanation": "Article 3 de la Constitution : le pouvoir vient du peuple — par ses représentants élus ou par référendum.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quels sont les trois pouvoirs séparés dans la République ?",
    "options": [
      "Exécutif, législatif, judiciaire",
      "Police, armée, justice",
      "Maire, préfet, président",
      "Économique, social, culturel"
    ],
    "explanation": "Exécutif (applique les lois), législatif (vote les lois), judiciaire (juge). Leur séparation protège nos libertés.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qu’est-ce qu’un État de droit ?",
    "options": [
      "Un État où tous, citoyens et dirigeants, sont soumis à la loi",
      "Un État dirigé par les juges",
      "Un État sans loi",
      "Un État militaire"
    ],
    "explanation": "Personne n’est au-dessus de la loi, pas même le président ou les ministres. La justice est indépendante.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Le président de la République a-t-il tous les pouvoirs ?",
    "options": [
      "Non, ses pouvoirs sont limités par la Constitution et la séparation des pouvoirs",
      "Oui, absolument tous",
      "Oui, pendant la guerre",
      "Oui, s’il a la majorité"
    ],
    "explanation": "En démocratie, personne n’a tous les pouvoirs : le Parlement vote les lois, la justice juge, le Conseil constitutionnel veille.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui sanctionne l’auteur d’un vol ?",
    "options": [
      "La justice (les tribunaux)",
      "La police",
      "Le maire",
      "Le président"
    ],
    "explanation": "La police enquête, mais seul un juge peut prononcer une sanction : c’est la séparation des pouvoirs.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Peut-on modifier la Constitution ?",
    "options": [
      "Oui, par un vote du Parlement suivi d’un référendum ou d’un vote du Congrès",
      "Non, jamais",
      "Oui, par le président seul",
      "Oui, par un décret du préfet"
    ],
    "explanation": "La révision demande l’accord des deux chambres, puis référendum ou Congrès (à Versailles, 3/5 des voix). Exemple : inscrire l’IVG, 2024.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Où s’inscrit-on sur les listes électorales si l’on n’a pas internet ?",
    "options": [
      "À la mairie de sa commune",
      "À la préfecture de police",
      "À la poste",
      "Au commissariat"
    ],
    "explanation": "La mairie tient les listes électorales. On peut aussi s’inscrire en ligne sur service-public.fr.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Qui est le Défenseur des droits ?",
    "options": [
      "Une autorité indépendante qui défend les citoyens face aux administrations et lutte contre les discriminations",
      "Un policier de quartier",
      "Un juge d’instruction",
      "Un ministre"
    ],
    "explanation": "On peut le saisir gratuitement — par exemple en cas de discrimination à l’embauche ou par une administration.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Combien de pays font partie de l’Union européenne ?",
    "options": [
      "27",
      "28",
      "15",
      "50"
    ],
    "explanation": "27 États membres depuis le départ du Royaume-Uni (Brexit, 2020). La France en fait partie.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quel pays est sorti de l’Union européenne en 2020 ?",
    "options": [
      "Le Royaume-Uni",
      "La Suisse",
      "La Turquie",
      "La Norvège"
    ],
    "explanation": "Le Brexit : le Royaume-Uni a quitté l’UE en janvier 2020. La Suisse et la Norvège n’ont jamais été membres.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quelle est la devise de l’Union européenne ?",
    "options": [
      "« Unie dans la diversité »",
      "« Liberté, Égalité, Fraternité »",
      "« Un peuple, un but »",
      "« Paix et travail »"
    ],
    "explanation": "« Unie dans la diversité » : des peuples unis pour la paix, fiers de leurs cultures différentes.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quel est l’hymne de l’Union européenne ?",
    "options": [
      "L’Ode à la Joie de Beethoven",
      "La Marseillaise",
      "Le Chant des partisans",
      "God Save the King"
    ],
    "explanation": "L’Ode à la Joie (9e symphonie de Beethoven), adopté en 1985. Astuce : UE = Beethoven, France = Rouget de Lisle.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Que représente le drapeau européen ?",
    "options": [
      "12 étoiles dorées en cercle sur fond bleu",
      "27 étoiles sur fond blanc",
      "Une croix rouge",
      "Des rayures bleues et blanches"
    ],
    "explanation": "12 étoiles, symbole d’unité — pas le nombre de pays membres ! Astuce : 12 comme les mois de l’année.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Où siège le Parlement européen ?",
    "options": [
      "À Strasbourg",
      "À Paris",
      "À Bruxelles uniquement",
      "À Luxembourg"
    ],
    "explanation": "Strasbourg, en France ! (Des travaux ont aussi lieu à Bruxelles.) La Commission européenne, elle, est à Bruxelles.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quel traité a fondé l’Union européenne ?",
    "options": [
      "Le traité de Maastricht (1992)",
      "Le traité de Versailles (1919)",
      "Le traité de Rome seul (1957)",
      "Le traité de Paris (1945)"
    ],
    "explanation": "Maastricht, signé en 1992, entré en vigueur en 1993 : naissance de l’UE et de la citoyenneté européenne.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Quand est célébrée la journée de l’Europe ?",
    "options": [
      "Le 9 mai",
      "Le 8 mai",
      "Le 14 juillet",
      "Le 11 novembre"
    ],
    "explanation": "Le 9 mai, en souvenir de la déclaration Schuman du 9 mai 1950. (Le 8 mai = victoire de 1945.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 2,
    "q": "Les citoyens européens résidant en France peuvent-ils voter aux élections locales ?",
    "options": [
      "Oui, aux élections municipales et européennes",
      "Non, jamais",
      "Oui, à toutes les élections",
      "Uniquement aux présidentielles"
    ],
    "explanation": "Ils peuvent voter et être élus conseillers municipaux (mais pas maire). Les élections nationales restent réservées aux Français.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quel texte énonce les droits et devoirs fondamentaux des personnes en France ?",
    "options": [
      "La Déclaration des droits de l’homme et du citoyen",
      "Le Code de la route",
      "La Bible",
      "Le règlement intérieur des écoles"
    ],
    "explanation": "La Déclaration des droits de l’homme et du citoyen, adoptée le 26 août 1789 pendant la Révolution. Valeur constitutionnelle.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "De quelle année date la Déclaration des droits de l’homme et du citoyen ?",
    "options": [
      "1789",
      "1905",
      "1958",
      "1945"
    ],
    "explanation": "1789, l’année de la Révolution française. « Les hommes naissent et demeurent libres et égaux en droits » (article 1er).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quelle citation vient de la Déclaration des droits de l’homme de 1789 ?",
    "options": [
      "« Les hommes naissent et demeurent libres et égaux en droits »",
      "« Travail, famille, patrie »",
      "« Un pour tous, tous pour un »",
      "« Paix aux hommes de bonne volonté »"
    ],
    "explanation": "C’est son article 1er — le fondement de l’égalité républicaine.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "La liberté d’expression, en France, c’est :",
    "options": [
      "Exprimer ses idées librement, dans les limites fixées par la loi",
      "Dire absolument tout, même des insultes racistes",
      "Un droit réservé aux journalistes",
      "Le droit de mentir"
    ],
    "explanation": "Liberté réelle MAIS encadrée : la loi interdit la diffamation, l’injure raciste et l’appel à la violence. Mes droits s’arrêtent là où commencent ceux des autres.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Pour quel motif la liberté d’expression peut-elle être limitée ?",
    "options": [
      "Pour protéger les droits des autres et l’ordre public (haine, diffamation, violence)",
      "Pour empêcher les critiques du gouvernement",
      "Parce qu’un voisin n’est pas d’accord",
      "Elle ne peut jamais être limitée"
    ],
    "explanation": "La loi punit la provocation à la haine, la diffamation et l’apologie du terrorisme. On peut critiquer le pouvoir, c’est normal en démocratie !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "L’article 4 de la Déclaration de 1789 dit que la liberté consiste à « pouvoir faire tout ce qui ne nuit pas à autrui ». Que signifie cela ?",
    "options": [
      "Ma liberté s’arrête où commence celle des autres",
      "Je peux tout faire sans règles",
      "Les autres doivent me laisser tranquille",
      "La liberté n’existe pas"
    ],
    "explanation": "Chacun est libre, mais dans le respect des autres et de la loi. C’est le cœur de la vie en société.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "La peine de mort en France est :",
    "options": [
      "Abolie depuis 1981",
      "Toujours appliquée",
      "Appliquée uniquement pour les crimes graves",
      "Décidée par les préfets"
    ],
    "explanation": "Abolie en 1981 sous l’impulsion de Robert Badinter (présidence Mitterrand). La France défend l’abolition universelle.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Une femme peut-elle voter en France ?",
    "options": [
      "Oui, depuis 1944-1945 comme les hommes",
      "Non",
      "Uniquement si son mari est d’accord",
      "Depuis 2020 seulement"
    ],
    "explanation": "Les femmes votent depuis 1945 (droit obtenu en avril 1944). L’égalité des droits est un principe de la République.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Une femme peut-elle travailler sans l’autorisation de son mari ?",
    "options": [
      "Oui, toujours : les droits ne dépendent pas du mari",
      "Non",
      "Uniquement avec son accord écrit",
      "Seulement à temps partiel"
    ],
    "explanation": "Femmes et hommes ont exactement les mêmes droits : travailler, ouvrir un compte, voyager, créer une entreprise.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Est-il légal d’être marié à plusieurs personnes en même temps en France ?",
    "options": [
      "Non, la polygamie est interdite",
      "Oui, avec une autorisation",
      "Oui, selon certaines religions",
      "Oui, pour les personnes riches"
    ],
    "explanation": "Le Code civil impose la monogamie : une seule personne à la fois. La bigamie est un délit.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Le mariage entre deux personnes de même sexe est :",
    "options": [
      "Légal depuis la loi de 2013",
      "Interdit",
      "Légal seulement à Paris",
      "Toléré mais sans valeur"
    ],
    "explanation": "Depuis le 17 mai 2013, le mariage est ouvert aux couples de même sexe, avec les mêmes droits (dont l’adoption).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "L’avortement (IVG) en France est :",
    "options": [
      "Un droit garanti par la Constitution, pris en charge à 100 %",
      "Interdit",
      "Autorisé seulement avec accord du mari",
      "Réservé aux plus de 30 ans"
    ],
    "explanation": "Droit depuis la loi Veil de 1975, inscrit dans la Constitution en mars 2024 — une première mondiale. Remboursé intégralement.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Qui a fait adopter la loi autorisant l’avortement en 1975 ?",
    "options": [
      "Simone Veil",
      "Marie Curie",
      "Jeanne d’Arc",
      "George Sand"
    ],
    "explanation": "Simone Veil, ministre de la Santé et rescapée d’Auschwitz. Elle est entrée au Panthéon en 2018.",
    "why": "Marie Curie = scientifique, prix Nobel. Ne pas confondre — les deux sont tombées à l’examen !"
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Le divorce en France est :",
    "options": [
      "Possible, à la demande d’un seul ou des deux époux",
      "Interdit",
      "Réservé aux hommes",
      "Décidé par la famille"
    ],
    "explanation": "Depuis 1975, le divorce par consentement mutuel existe. Un seul époux peut aussi divorcer. La loi protège la liberté de chacun.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Jeter une bouteille ou un mégot dans la rue est :",
    "options": [
      "Interdit et passible d’une amende",
      "Autorisé",
      "Autorisé le week-end",
      "Accepté s’il n’y a pas de poubelle"
    ],
    "explanation": "Déposer ses déchets sur la voie publique est une infraction. Respecter l’espace public, c’est le respecter pour tous.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Pourquoi doit-on trier ses déchets ?",
    "options": [
      "Pour protéger l’environnement et recycler",
      "C’est obligatoire pour les étrangers seulement",
      "Pour payer moins d’impôts",
      "Ce n’est pas obligatoire"
    ],
    "explanation": "La Charte de l’environnement (inscrite dans la Constitution) fait de la protection de la planète un devoir d’intérêt général.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Que doit faire une personne témoin d’un accident ?",
    "options": [
      "Alerter les secours et porter assistance dans la mesure de ses moyens",
      "Continuer sa route",
      "Filmer la scène",
      "Attendre que quelqu’un d’autre agisse"
    ],
    "explanation": "La non-assistance à personne en danger est un délit : on appelle le 15 (SAMU), le 18 (pompiers), le 17 (police) ou le 112 (européen).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quel numéro appelle le SAMU (urgence médicale) ?",
    "options": [
      "Le 15",
      "Le 17",
      "Le 18",
      "Le 12"
    ],
    "explanation": "15 = SAMU (médecin). 18 = pompiers. 17 = police. 112 = numéro unique valable dans toute l’Europe. 114 = SMS pour les sourds et malentendants.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quel numéro appelle la police en France ?",
    "options": [
      "Le 17",
      "Le 15",
      "Le 18",
      "Le 119"
    ],
    "explanation": "17 = police/gendarmerie. 119 = enfance en danger. 112 = urgence européenne. À retenir par cœur !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quel numéro appelle les pompiers ?",
    "options": [
      "Le 18",
      "Le 15",
      "Le 17",
      "Le 112 seulement"
    ],
    "explanation": "18 = pompiers (feu, accidents, personne en danger). En Europe entière, le 112 marche aussi partout.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Face aux ordres des policiers ou gendarmes, il faut :",
    "options": [
      "Obéir et présenter ses documents si demandé",
      "S’enfuir",
      "Discuter leurs ordres",
      "Les ignorer"
    ],
    "explanation": "La police et la gendarmerie assurent l’ordre public et notre sécurité. On coopère calmement.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quel est le rôle de la police et de la gendarmerie ?",
    "options": [
      "Protéger les personnes et les biens, faire respecter la loi",
      "Fabriquer les lois",
      "Gérer les écoles",
      "Dresser les impôts"
    ],
    "explanation": "Elles assurent la sécurité et l’ordre public. Ce sont les tribunaux, pas la police, qui punissent.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Que risque une personne qui ne respecte pas la loi ?",
    "options": [
      "Des sanctions : amendes, voire prison, selon la gravité",
      "Rien du tout",
      "Juste un avertissement amical",
      "Une augmentation d’impôts"
    ],
    "explanation": "L’État de droit : la même loi pour tous, et des sanctions proportionnées en cas d’infraction (amende, délit, crime).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Si l’on considère une loi injuste, on peut :",
    "options": [
      "La contester par les voies légales : recours, manifestations, vote",
      "La désobéir tranquillement",
      "Menacer les élus",
      "Ne plus payer d’impôts"
    ],
    "explanation": "On ne choisit pas ses lois : mais la démocratie offre des moyens pacifiques pour les faire changer (vote, pétitions, manifestations, recours).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Qu’a-t-on le droit de faire en France quelle que soit sa nationalité ?",
    "options": [
      "Bénéficier des droits fondamentaux (dignité, justice, sécurité) et respecter les lois",
      "Voter aux présidentielles",
      "Être maire",
      "Devenir policier"
    ],
    "explanation": "Certains droits sont pour tous (vivre dignement, être jugé équitablement…) ; le vote national, lui, est lié à la citoyenneté française.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Payer ses impôts est :",
    "options": [
      "Un devoir qui finance les services publics pour tous",
      "Une option",
      "Réservé aux riches",
      "Interdit aux femmes"
    ],
    "explanation": "Écoles, hôpitaux, routes, sécurité… : l’impôt finance la vie commune. C’est un pilier de la solidarité nationale.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Le droit de grève est :",
    "options": [
      "Un droit inscrit dans la Constitution, pour défendre ses revendications professionnelles",
      "Interdit",
      "Réservé aux syndicats étrangers",
      "Un délit"
    ],
    "explanation": "Droit constitutionnel pour tous les salariés, privés comme publics, dans le cadre prévu par la loi.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Se syndiquer est :",
    "options": [
      "Un droit pour tous les travailleurs, sans condition de nationalité",
      "Interdit aux étrangers",
      "Réservé aux fonctionnaires",
      "Interdit en entreprise"
    ],
    "explanation": "Tout travailleur peut adhérer à un syndicat. Un employeur qui punit un salarié syndiqué commet un délit.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "Quels biens de l’armée et du pays… Les cimetières militaires et monuments aux morts :",
    "options": [
      "Ils honorent les soldats morts pour la France, on les respecte",
      "Ce sont des parcs de jeux",
      "Ils datent de Napoléon seulement",
      "Ils n’ont aucune importance"
    ],
    "explanation": "Respecter la mémoire des morts pour la France fait partie des valeurs de la Nation (ex : l’Arc de triomphe, le 11 novembre).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "La violence physique ou psychologique envers ses enfants est :",
    "options": [
      "Interdite par la loi depuis 2019",
      "Autorisée pour punir",
      "Légale à la maison",
      "Acceptée dans certaines cultures en France"
    ],
    "explanation": "L’article 371-1 du Code civil : l’autorité parentale s’exerce SANS violences physiques ou psychologiques. Le 119 permet de signaler un enfant en danger.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 3,
    "q": "La répudiation de sa femme (décider seul de « répudier » son épouse) est :",
    "options": [
      "Interdite : seule la justice et la loi décident d’un divorce",
      "Encadrée mais possible",
      "Légale le dimanche",
      "Acceptée selon les religions"
    ],
    "explanation": "En France, nul ne peut mettre fin à un mariage par une simple parole : le divorce suit les règles du Code civil, à égalité entre les époux.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "En quelle année a commencé la Révolution française ?",
    "options": [
      "1789",
      "1914",
      "1848",
      "1804"
    ],
    "explanation": "1789 : prise de la Bastille le 14 juillet, Déclaration des droits de l’homme en août. Fin de la monarchie absolue.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel roi de France a été guillotiné pendant la Révolution ?",
    "options": [
      "Louis XVI",
      "Louis XIV",
      "François Ier",
      "Henri IV"
    ],
    "explanation": "Louis XVI, guillotiné le 21 janvier 1793. (Louis XIV = le « Roi-Soleil » de Versailles, 100 ans avant.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Où les rois de France étaient-ils couronnés ?",
    "options": [
      "À Reims",
      "À Paris",
      "À Versailles",
      "À Lyon"
    ],
    "explanation": "À la cathédrale de Reims, la « cité des sacres », du baptême de Clovis (496) à Charles X (1825). Ils étaient enterrés à Saint-Denis.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "En quelle année Napoléon Ier est-il devenu empereur ?",
    "options": [
      "1804",
      "1789",
      "1815",
      "1918"
    ],
    "explanation": "Sacré à Notre-Dame le 2 décembre 1804. Il laisse le Code civil, toujours en vigueur, et l’Arc de triomphe.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel texte célèbre a été adopté sous Napoléon Ier ?",
    "options": [
      "Le Code civil",
      "La Déclaration de 1789",
      "La Constitution de 1958",
      "Le traité de Maastricht"
    ],
    "explanation": "Le Code civil de 1804 (« Code Napoléon ») règle la famille, les biens, les contrats — c’est encore notre référence.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "La Première Guerre mondiale a eu lieu :",
    "options": [
      "De 1914 à 1918",
      "De 1939 à 1945",
      "De 1870 à 1871",
      "De 1804 à 1815"
    ],
    "explanation": "1914-1918 : « la Grande Guerre », 1,4 million de morts français. L’armistice est signé le 11 novembre 1918 — jour férié.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "La Seconde Guerre mondiale a eu lieu :",
    "options": [
      "De 1939 à 1945",
      "De 1914 à 1918",
      "De 1954 à 1962",
      "De 1800 à 1815"
    ],
    "explanation": "1939-1945. La France occupée par l’Allemagne nazie de 1940 à 1944, puis libérée (Débarquement le 6 juin 1944 en Normandie).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Où a eu lieu le Débarquement allié de 1944 ?",
    "options": [
      "En Normandie",
      "En Bretagne",
      "Sur la Côte d’Azur",
      "Dans le Nord"
    ],
    "explanation": "Le 6 juin 1944 (« D-Day »), les Alliés débarquent sur les plages de Normandie (Utah, Omaha…). Début de la Libération.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Que fête-t-on le 8 mai ?",
    "options": [
      "La victoire de 1945, la fin de la Seconde Guerre mondiale en Europe",
      "L’armistice de 1914-1918",
      "La fête du travail",
      "La fête nationale"
    ],
    "explanation": "Le 8 mai 1945 : victoire des Alliés sur l’Allemagne nazie. (Le 11 novembre, lui, célèbre l’armistice de 1918.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Que commémore le 11 novembre ?",
    "options": [
      "L’armistice de la Première Guerre mondiale (1918)",
      "La fête nationale",
      "La victoire de 1945",
      "La journée de l’Europe"
    ],
    "explanation": "Le 11 novembre 1918 : fin de la Grande Guerre. Jour férié de mémoire, avec la flamme ravivée sous l’Arc de triomphe.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "De quand date l’appel à la résistance du général de Gaulle ?",
    "options": [
      "Du 18 juin 1940",
      "Du 14 juillet 1789",
      "Du 8 mai 1945",
      "Du 11 novembre 1918"
    ],
    "explanation": "Le 18 juin 1940, à la BBC de Londres : « Honneur à ceux qui refusent la défaite » — de Gaulle appelle à continuer le combat.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Jean Moulin ?",
    "options": [
      "Un héros de la Résistance pendant la Seconde Guerre mondiale",
      "Un roi de France",
      "Un peintre",
      "Un chanteur"
    ],
    "explanation": "Jean Moulin a uni la Résistance pour de Gaulle ; arrêté et torturé, il meurt en 1943 sans avoir parlé.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qu’est-ce que la Shoah ?",
    "options": [
      "L’extermination de 6 millions de Juifs par les nazis pendant la Seconde Guerre mondiale",
      "Une fête juive",
      "Une région de France",
      "Une bataille de 1914"
    ],
    "explanation": "Le génocide des Juifs d’Europe : 6 millions de victimes, dont 76 000 déportés de France. Un devoir de mémoire.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui a fondé la Ve République en 1958 ?",
    "options": [
      "Le général de Gaulle",
      "Napoléon",
      "François Mitterrand",
      "Georges Pompidou"
    ],
    "explanation": "1958 : de Gaulle fait adopter la Constitution de la Ve République, notre régime actuel, et en devient le premier président.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Depuis quelle année les Français élisent-ils le président au suffrage universel direct ?",
    "options": [
      "1962",
      "1958",
      "1789",
      "2000"
    ],
    "explanation": "Référendum de 1962 voulu par de Gaulle. Avant, le président était choisi par un collège de grands électeurs.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "En quelle année l’esclavage a-t-il été définitivement aboli en France ?",
    "options": [
      "1848",
      "1789",
      "1905",
      "1945"
    ],
    "explanation": "Abolition définitive en 1848 grâce à Victor Schœlcher. (Une première abolition en 1794 avait été annulée par Napoléon en 1802.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel grand port français participait à la traite des êtres humains (esclavage) au XVIIIe siècle ?",
    "options": [
      "Nantes",
      "Marseille",
      "Calais",
      "Bordeaux seulement"
    ],
    "explanation": "Nantes était le principal port négrier français, avant Bordeaux. En 2012, la ville a inauguré un Mémorial d’abolition. Le 10 mai est la journée nationale de commémoration.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui a rendu l’école gratuite, laïque et obligatoire ?",
    "options": [
      "Jules Ferry",
      "Napoléon",
      "Victor Hugo",
      "De Gaulle"
    ],
    "explanation": "Les lois Jules Ferry de 1881 (gratuité) et 1882 (obligation et laïcité). C’est pourquoi tant d’écoles portent son nom.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Le 1er mai, en France, c’est :",
    "options": [
      "La fête du Travail",
      "La fête nationale",
      "L’armistice",
      "La journée de l’Europe"
    ],
    "explanation": "Fête du Travail (journée de 8 heures, conquête ouvrière) ; on offre traditionnellement un brin de muguet.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle organisation internationale fut créée en 1945 après la guerre ?",
    "options": [
      "L’ONU",
      "L’Union européenne",
      "L’OTAN seulement",
      "La francophonie"
    ],
    "explanation": "L’Organisation des Nations unies, pour maintenir la paix. La France est membre permanent de son Conseil de sécurité.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "En quelle année l’euro est-elle devenue la monnaie utilisée en France ?",
    "options": [
      "2002",
      "1992",
      "1999",
      "2020"
    ],
    "explanation": "Pièces et billets en euro depuis janvier 2002, en remplacement du franc. Aujourd’hui, 20 pays de l’UE partagent l’euro.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "La CECA, première étape de la construction européenne (1951), portait sur :",
    "options": [
      "Le charbon et l’acier",
      "Le blé et le vin",
      "Les avions",
      "La défense nucléaire"
    ],
    "explanation": "Mettre en commun charbon et acier entre France et Allemagne pour rendre la guerre impossible : l’idée de Robert Schuman.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel fleuve traverse Paris ?",
    "options": [
      "La Seine",
      "La Loire",
      "Le Rhône",
      "La Garonne"
    ],
    "explanation": "La Seine traverse Paris (775 km, embouchure au Havre). La Loire est le plus long fleuve, le Rhône passe à Lyon.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel océan borde la côte ouest de la France ?",
    "options": [
      "L’océan Atlantique",
      "La mer Méditerranée",
      "La mer du Nord",
      "L’océan Indien"
    ],
    "explanation": "L’Atlantique à l’ouest ; la Méditerranée au sud ; la Manche au nord, entre la France et l’Angleterre.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle mer sépare la France de l’Angleterre ?",
    "options": [
      "La Manche",
      "La Méditerranée",
      "La mer du Nord",
      "L’Adriatique"
    ],
    "explanation": "La Manche — traversée par le tunnel sous la Manche depuis 1994 (Paris-Londres en train !).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle chaîne de montagnes sépare la France de l’Espagne ?",
    "options": [
      "Les Pyrénées",
      "Les Alpes",
      "Le Jura",
      "Les Vosges"
    ],
    "explanation": "Les Pyrénées au sud-ouest. (Les Alpes, elles, séparent la France de l’Italie — avec le Mont-Blanc.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle chaîne de montagnes se trouve entre la France et l’Italie ?",
    "options": [
      "Les Alpes",
      "Les Pyrénées",
      "Le Massif central",
      "Les Vosges"
    ],
    "explanation": "Les Alpes, où culmine le Mont-Blanc (4 808 m), le plus haut sommet d’Europe occidentale.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle est la plus haute montagne de France ?",
    "options": [
      "Le Mont-Blanc",
      "Le Mont Ventoux",
      "Le Puy de Dôme",
      "Le pic du Midi"
    ],
    "explanation": "Le Mont-Blanc, 4 808 mètres, dans les Alpes près de Chamonix. Premiers JO d’hiver là-bas en 1924 !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle grande ville est le chef-lieu de la région Auvergne-Rhône-Alpes ?",
    "options": [
      "Lyon",
      "Grenoble",
      "Clermont-Ferrand",
      "Saint-Étienne"
    ],
    "explanation": "Lyon, troisième ville de France, réputée pour sa gastronomie et sa fête des Lumières.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle est le premier port maritime de France ?",
    "options": [
      "Marseille",
      "Le Havre",
      "Calais",
      "Nantes"
    ],
    "explanation": "Marseille (port Marseille-Fos) : 1er port de France en tonnage, sur la Méditerranée. Fondée par les Grecs sous le nom de Massalia !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "De quelle ville la fusée Ariane décolle-t-elle ?",
    "options": [
      "Kourou, en Guyane française",
      "Toulouse",
      "Paris",
      "Cayenne uniquement"
    ],
    "explanation": "Kourou, en Guyane (Amérique du Sud, près de l’équateur) : le Centre spatial guyanais — un fierté spatiale européenne.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel département français a une frontière terrestre avec le Brésil ?",
    "options": [
      "La Guyane",
      "La Guadeloupe",
      "La Réunion",
      "Mayotte"
    ],
    "explanation": "La Guyane, en Amérique du Sud : 730 km de frontière avec le Brésil. Le plus grand département de France !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle île française se trouve dans l’océan Indien ?",
    "options": [
      "La Réunion",
      "La Guadeloupe",
      "La Corse",
      "La Martinique"
    ],
    "explanation": "La Réunion (974), au large de Madagascar. Mayotte aussi. Corse : Méditerranée. Guadeloupe et Martinique : les Antilles (Caraïbes).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Les Antilles françaises regroupent :",
    "options": [
      "La Guadeloupe et la Martinique",
      "La Réunion et Mayotte",
      "La Corse et la Sicile",
      "La Bretagne et la Normandie"
    ],
    "explanation": "Dans la mer des Caraïbes : Guadeloupe (971) et Martinique (972). Destinations tropicales et départements français.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel est le 101e et plus récent département français ?",
    "options": [
      "Mayotte",
      "La Réunion",
      "La Guadeloupe",
      "La Martinique"
    ],
    "explanation": "Mayotte, dans l’océan Indien, département depuis 2011 après un vote à 95 % en sa faveur.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Combien de régions compte la France métropolitaine ?",
    "options": [
      "13",
      "18",
      "22",
      "8"
    ],
    "explanation": "13 régions en métropole, 18 en tout avec les 5 régions d’outre-mer (depuis la réforme de 2016).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle est la population approximative de la France ?",
    "options": [
      "Environ 68 millions d’habitants",
      "100 millions",
      "30 millions",
      "10 millions"
    ],
    "explanation": "≈ 68 millions (métropole + outre-mer) : le 2e pays le plus peuplé de l’Union européenne, après l’Allemagne.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel monument sur une île en Normandie est célèbre dans le monde ?",
    "options": [
      "Le Mont-Saint-Michel",
      "Le château de Chambord",
      "Le pont du Gard",
      "Le palais Idéal"
    ],
    "explanation": "Le Mont-Saint-Michel et son abbaye médiévale : classé UNESCO, ~3 millions de visiteurs par an.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Dans quel musée parisien peut-on voir la Joconde ?",
    "options": [
      "Le Louvre",
      "Le musée d’Orsay",
      "Le Centre Pompidou",
      "Le Palais de Tokyo"
    ],
    "explanation": "Le Louvre : le plus grand musée d’art du monde. La Joconde de Léonard de Vinci y est la star absolue.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Pour quelle occasion la tour Eiffel a-t-elle été construite ?",
    "options": [
      "L’Exposition universelle de 1889",
      "Le centenaire de la République en 1958",
      "Les Jeux olympiques de 1900 seulement",
      "La visite de la reine d’Angleterre"
    ],
    "explanation": "Elle célébrait les 100 ans de la Révolution ! 330 m, presque démolie après 20 ans, sauvée grâce à la radio. 7 M de visiteurs par an.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel château près de Paris symbolise le pouvoir de Louis XIV ?",
    "options": [
      "Versailles",
      "Chambord",
      "Chenonceau",
      "Fontainebleau seulement"
    ],
    "explanation": "Le château de Versailles : le Roi-Soleil y installa sa cour en 1682, symbole de l’absolutisme et du rayonnement français.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Où peut-on voir des peintures préhistoriques en France ?",
    "options": [
      "À la grotte de Lascaux, en Dordogne",
      "À Versailles",
      "Au Louvre",
      "Au Mont-Saint-Michel"
    ],
    "explanation": "Lascaux : ~17 000 ans d’histoire, découverte en 1940, « chapelle Sixtine de la Préhistoire ». (La grotte Chauvet, en Ardèche, est encore plus vieille.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui a peint « La Liberté guidant le peuple » ?",
    "options": [
      "Eugène Delacroix",
      "Claude Monet",
      "Auguste Renoir",
      "Paul Cézanne"
    ],
    "explanation": "Delacroix, 1830 : la Liberté brandit le drapeau tricolore sur une barricade. Ce tableau a inspiré l’image de Marianne. Visible au Louvre.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel peintre français est le fondateur de l’impressionnisme (les Nymphéas) ?",
    "options": [
      "Claude Monet",
      "Paul Cézanne",
      "Auguste Rodin",
      "Delacroix"
    ],
    "explanation": "Claude Monet. Son « Impression, soleil levant » a donné son nom au mouvement. Ses Nymphéas : au musée de l’Orangerie, à Paris.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Auguste Rodin ?",
    "options": [
      "Un sculpteur célèbre (Le Penseur)",
      "Un écrivain",
      "Un chanteur",
      "Un roi"
    ],
    "explanation": "Rodin, père de la sculpture moderne : Le Penseur, Le Baiser… Son musée est à Paris.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Molière ?",
    "options": [
      "Un dramaturge français, le père de la comédie française",
      "Un peintre",
      "Un roi de France",
      "Un cuisinier"
    ],
    "explanation": "Molière (XVIIe siècle) : L’Avare, Le Malade imaginaire, Tartuffe… On l’appelle le père de la comédie — et même « la langue de Molière » = le français.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Victor Hugo ?",
    "options": [
      "Un très grand écrivain français (Les Misérables, Notre-Dame de Paris)",
      "Un peintre",
      "Un général",
      "Un chanteur"
    ],
    "explanation": "Poète, romancier, combattant politique (contre la peine de mort et la misère). Ses funérailles en 1885 : 2 millions de personnes. Il repose au Panthéon.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Marie Curie ?",
    "options": [
      "Une physicienne et chimiste, double prix Nobel",
      "Une reine",
      "Une chanteuse",
      "Une résistante de 1940"
    ],
    "explanation": "D’origine polonaise, naturalisée française : SEULE personne avec deux Nobel dans deux sciences (physique 1903, chimie 1911). Première femme professeur à la Sorbonne.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Simone de Beauvoir ?",
    "options": [
      "Une écrivaine et philosophe féministe (Le Deuxième Sexe)",
      "Une reine de France",
      "Une scientifique",
      "Une peintre"
    ],
    "explanation": "Le Deuxième Sexe (1949) est un texte fondateur du féminisme moderne. Compagne de Jean-Paul Sartre.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui fut la première femme élue à l’Académie française ?",
    "options": [
      "Marguerite Yourcenar",
      "George Sand",
      "Simone Veil",
      "Édith Piaf"
    ],
    "explanation": "Marguerite Yourcenar, en 1980 (Mémoires d’Hadrien). L’Académie française, gardienne de la langue, date de 1635.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était George Sand ?",
    "options": [
      "Une écrivaine française du XIXe siècle",
      "Une reine",
      "Une chanteuse",
      "Une scientifique"
    ],
    "explanation": "Écrivaine célèbre (son vrai nom : Aurore Dupin) — engagée pour les femmes ; elle écrivit sous un pseudo « masculin » pour être publiée.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Albert Camus ?",
    "options": [
      "Un écrivain et philosophe, prix Nobel de littérature (L’Étranger)",
      "Un roi",
      "Un peintre",
      "Un cuisinier"
    ],
    "explanation": "Nobel de littérature 1957. Né en Algérie, auteur de L’Étranger et La Peste.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Joséphine Baker ?",
    "options": [
      "Une artiste et résistante franco-américaine, entrée au Panthéon",
      "Une reine",
      "Une scientifique",
      "Une nageuse"
    ],
    "explanation": "Star du music-hall, résistante pendant l’Occupation, militante contre le racisme : entrée au Panthéon en 2021.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Combien de personnes parlent français dans le monde ?",
    "options": [
      "Environ 300 millions",
      "3 millions",
      "30 millions",
      "1 milliard"
    ],
    "explanation": "≈ 300 millions de francophones sur 5 continents : une des langues les plus parlées au monde, en forte croissance.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle cathédrale a été en partie détruite par un incendie en 2019 ?",
    "options": [
      "Notre-Dame de Paris",
      "La cathédrale de Reims",
      "La basilique de Saint-Denis",
      "Le Mont-Saint-Michel"
    ],
    "explanation": "Notre-Dame : incendie le 15 avril 2019, rouverte en décembre 2024 après un magnifique chantier national.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel compositeur français du « Clair de lune » est un monument de la musique ?",
    "options": [
      "Claude Debussy",
      "Charles Aznavour",
      "Beethoven",
      "Mozart"
    ],
    "explanation": "Debussy (1862-1918), figure de la « musique impressionniste ». (Aznavour : chanteur ; Beethoven et Mozart : pas français.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Charles Baudelaire ?",
    "options": [
      "Un poète français (Les Fleurs du mal)",
      "Un roi",
      "Un peintre",
      "Un sportif"
    ],
    "explanation": "Poète du XIXe siècle, auteur des Fleurs du mal, l’un des recueils de poésie les plus célèbres du monde.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Qui était Jean de La Fontaine ?",
    "options": [
      "L’auteur des Fables (ex. Le Corbeau et le Renard)",
      "Un général",
      "Un chanteur",
      "Un architecte"
    ],
    "explanation": "Ses Fables (XVIIe siècle), avec leurs animaux et leurs morales, sont apprises par cœur dans toutes les écoles de France.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quand peut-on visiter gratuitement des lieux culturels en France ?",
    "options": [
      "Lors des Journées européennes du patrimoine (septembre)",
      "Jamais",
      "Uniquement le 25 décembre",
      "Le matin du dimanche uniquement"
    ],
    "explanation": "3e week-end de septembre : châteaux, ministères, sites fermés au public ouvrent gratuitement leurs portes. (Et le 1er dimanche du mois dans beaucoup de musées.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quel plat est une spécialité de la cuisine française ?",
    "options": [
      "Le bœuf bourguignon",
      "Les sushis",
      "Le paella",
      "Le kebab"
    ],
    "explanation": "Bœuf bourguignon, ratatouille, coq au vin, bouillabaisse de Marseille… Le repas gastronomique français est inscrit à l’UNESCO depuis 2010 !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 4,
    "q": "Quelle fête est une tradition française ?",
    "options": [
      "La fête de la musique, le 21 juin",
      "Halloween est une fête nationale",
      "Thanksgiving",
      "La Saint-Valentin est une fête nationale"
    ],
    "explanation": "Le 21 juin, des musiciens amateurs jouent partout dans les rues — une fête française devenue mondiale !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Où faut-il déclarer la naissance d’un enfant ?",
    "options": [
      "À la mairie du lieu de naissance, dans les 5 jours",
      "À la préfecture, dans les 3 mois",
      "À l’hôpital seulement",
      "Nulle part, c’est automatique"
    ],
    "explanation": "Le service d’état civil de la mairie enregistre la naissance : obligation de 5 jours (jour de l’accouchement non compris).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quel mariage est reconnu par l’État français ?",
    "options": [
      "Uniquement le mariage civil, célébré à la mairie",
      "Le mariage religieux",
      "Le mariage traditionnel",
      "Toutes les formes de mariage"
    ],
    "explanation": "Seul le mariage civil, célébré par un officier d’état civil à la mairie, a une valeur juridique. Le religieux peut s’ajouter ensuite, librement.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "En cas de divorce, qui exerce l’autorité parentale ?",
    "options": [
      "Les deux parents, ensemble, sauf décision contraire du juge",
      "Le père uniquement",
      "La mère uniquement",
      "Les grands-parents"
    ],
    "explanation": "Le divorce ne change pas les droits des parents : les deux continuent de protéger et d’éduquer l’enfant, dans SON intérêt.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "L’école est obligatoire en France :",
    "options": [
      "De 3 à 16 ans (instruction), avec formation obligatoire jusqu’à 18 ans",
      "De 6 à 14 ans",
      "Pas d’âge limite",
      "Seulement jusqu’à 10 ans"
    ],
    "explanation": "Depuis 2019 : l’instruction démarre à 3 ans (maternelle incluse). De 16 à 18 ans : obligation de formation (lycée, apprentissage…).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Si un enfant est absent de l’école, quel motif est accepté ?",
    "options": [
      "La maladie de l’enfant, un décès familial ou une convocation officielle",
      "Les courses avec ses parents",
      "La fatigue",
      "Un anniversaire"
    ],
    "explanation": "Seuls les motifs légitimes sont acceptés (maladie avec justificatif, deuil, convocation). L’école est un droit de l’enfant !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Où les parents inscrivent-ils leur enfant à l’école publique ?",
    "options": [
      "À la mairie de leur commune",
      "À la préfecture",
      "À l’ambassade",
      "Directement chez le maître seulement"
    ],
    "explanation": "L’inscription se fait à la mairie, qui attribue l’école du secteur (carte scolaire).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Après l’école primaire, les élèves vont :",
    "options": [
      "Au collège",
      "Au lycée",
      "À l’université",
      "Au travail"
    ],
    "explanation": "Collège (11-15 ans) : 6e, 5e, 4e, 3e ; puis lycée jusqu’au baccalauréat, le diplôme de fin de lycée.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quel diplôme obtient-on à la fin du lycée ?",
    "options": [
      "Le baccalauréat",
      "Le brevet",
      "Le permis de conduire",
      "Le BTS"
    ],
    "explanation": "Le « bac », créé en 1808 ! (Le brevet, lui, se passe en fin de collège.)",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Un enfant qui ne parle pas encore français :",
    "options": [
      "Est scolarisé normalement et reçoit un accompagnement pour apprendre le français",
      "Ne peut pas aller à l’école",
      "Doit d’abord apprendre le français seul à la maison",
      "Va dans une école privée uniquement"
    ],
    "explanation": "Le droit à l’éducation est pour TOUS les enfants résidant en France ; des classes spéciales (UPE2A) les aident à apprendre le français.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Un enfant en situation de handicap :",
    "options": [
      "A le droit d’être scolarisé dans l’école de son secteur, avec aménagements",
      "Ne peut pas aller à l’école publique",
      "Doit être éduqué à la maison",
      "Va seulement en institut"
    ],
    "explanation": "L’école inclusive (loi de 2005) : chaque enfant a droit à sa place à l’école, avec un accompagnement adapté si besoin (MDPH, AESH).",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Les parents d’élèves ont le droit de :",
    "options": [
      "Élire des représentants, participer aux conseils et rencontrer les enseignants",
      "Intervenir dans les cours",
      "Refuser le programme scolaire",
      "Critiquer les cours de religion"
    ],
    "explanation": "Les parents font partie de la communauté éducative — élections de représentants en octobre, réunions, conseils d’école.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quels risques des parents qui ne respectent pas l’obligation d’instruction de leurs enfants ?",
    "options": [
      "Jusqu’à 2 ans de prison et 30 000 € d’amende",
      "Aucun risque",
      "Une simple amende de 10 €",
      "La perte des allocations"
    ],
    "explanation": "L’instruction de 3 à 16 ans est une obligation légale sérieuse, qui protège le droit de l’enfant à apprendre.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Auprès de quel organisme demander le remboursement des frais de santé ?",
    "options": [
      "À l’Assurance maladie (Sécurité sociale)",
      "À la mairie",
      "À la police",
      "À la banque"
    ],
    "explanation": "L’Assurance maladie rembourse une partie des soins ; la carte Vitale atteste de vos droits ; la mutuelle complète ce qui reste.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "À quoi sert la carte Vitale ?",
    "options": [
      "À obtenir le remboursement des frais de santé",
      "À payer ses courses",
      "À voter",
      "À prendre le bus"
    ],
    "explanation": "La carte verte Vitale : le praticien l’insère, vos remboursements arrivent automatiquement sur votre compte.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "À quoi sert une mutuelle ?",
    "options": [
      "À compléter les remboursements de l’Assurance maladie",
      "À remplacer la Sécurité sociale",
      "À payer les impôts",
      "À assurer sa voiture"
    ],
    "explanation": "Assurance maladie de base + mutuelle (complémentaire santé) = l’essentiel du reste à charge couvert.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "L’inscription à l’Assurance maladie est :",
    "options": [
      "Obligatoire pour toute personne résidant en France de manière stable",
      "Interdite aux étrangers",
      "Uniquement pour les salariés",
      "Uniquement pour les plus de 18 ans"
    ],
    "explanation": "Protection universelle maladie (PUMa) : toute personne résidant stablement en France a droit à la prise en charge de ses frais de santé.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Le SMIC, c’est :",
    "options": [
      "Le salaire minimum légal horaire",
      "Un impôt",
      "Une banque",
      "Un type de contrat"
    ],
    "explanation": "Salaire Minimum Interprofessionnel de Croissance : en dessous, aucun employeur ne peut payer. Revalorisé chaque année.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quelle est la durée légale du travail par semaine ?",
    "options": [
      "35 heures",
      "40 heures",
      "30 heures",
      "48 heures"
    ],
    "explanation": "35 heures depuis 2000. Au-delà : heures supplémentaires majorées en salaire.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quelle est la première démarche pour chercher un emploi ?",
    "options": [
      "S’inscrire à France Travail (ex-Pôle emploi)",
      "Écrire au président",
      "Appeler le 17",
      "Se rendre à l’ambassade"
    ],
    "explanation": "France Travail accompagne la recherche d’emploi et verse les allocations chômage si vous y avez droit.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Le travail non déclaré (« au noir ») est :",
    "options": [
      "Interdit : c’est un délit qui prive le salarié de protection",
      "Toléré",
      "Légal le soir",
      "Légal entre voisins"
    ],
    "explanation": "Sanctions sévères pour l’employeur et absence de couverture (maladie, retraite, chômage) pour le salarié. Toujours exiger un contrat !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quel organisme juge les conflits entre un salarié et son employeur ?",
    "options": [
      "Le conseil de prud’hommes",
      "La mairie",
      "La police",
      "Le préfet"
    ],
    "explanation": "Le prud’hommes : juges salariés et employeurs à parts égales. Saisine gratuite — utile en cas de licenciement abusif ou de salaires impayés.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Peut-on licencier une femme parce qu’elle est enceinte ?",
    "options": [
      "Non : c’est strictement interdit et puni par la loi",
      "Oui, librement",
      "Oui, après 3 mois de grossesse",
      "Oui, sans indemnités"
    ],
    "explanation": "Protection absolue de la grossesse (Code du travail). Un tel licenciement est nul et l’employeur peut être condamné.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Depuis 2021, la durée du congé paternité est de :",
    "options": [
      "28 jours au total (25 + 3 de congé de naissance)",
      "3 jours",
      "6 mois",
      "1 an"
    ],
    "explanation": "Le congé paternité a été doublé pour accompagner bébé : les deux parents partagent l’éducation de l’enfant — c’est aussi ça, l’égalité !",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Une femme peut-elle créer son entreprise ?",
    "options": [
      "Oui, au même titre qu’un homme",
      "Non",
      "Avec l’accord de son mari",
      "Seulement après 30 ans"
    ],
    "explanation": "Égalité totale en droit : travailler, créer une entreprise, ouvrir un compte bancaire, conduire, voter…",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Une personne étrangère en situation régulière peut-elle créer son entreprise en France ?",
    "options": [
      "Oui, sous conditions liées à son titre de séjour",
      "Non, jamais",
      "Oui, même sans titre",
      "Seulement dans les grandes villes"
    ],
    "explanation": "Selon le titre de séjour, on peut entreprendre — la France encourage l’initiative économique de tous.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quel est l’âge de la majorité en France ?",
    "options": [
      "18 ans",
      "16 ans",
      "21 ans",
      "15 ans"
    ],
    "explanation": "Majorité à 18 ans : on devient pleinement majeur civilement (droit de vote, contrats…). On peut travailler dès 16 ans avec accord des parents.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "À partir de quel âge un mineur peut-il travailler ?",
    "options": [
      "16 ans, avec l’accord de ses représentants légaux",
      "10 ans",
      "25 ans",
      "Ne jamais travailler"
    ],
    "explanation": "Dès 16 ans avec accord parental (14 ans en vacances pour des jobs légers). Protection renforcée des jeunes travailleurs.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Qu’est-ce que l’aide juridictionnelle ?",
    "options": [
      "Une aide de l’État pour payer un avocat aux personnes à faibles revenus",
      "Une taxe d’avocat",
      "Un tribunal spécial",
      "Une école de droit"
    ],
    "explanation": "L’accès à la justice pour tous : selon les revenus, l’État prend en charge tout ou partie des frais d’avocat.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Quelle aide permet d’avoir un avocat quand on a peu d’argent ?",
    "options": [
      "L’aide juridictionnelle",
      "Le RSA",
      "Les bourses d’école",
      "La carte Vitale"
    ],
    "explanation": "On la demande au tribunal ou en ligne : le droit de se défendre ne dépend pas de ses revenus.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Se garer sur une place réservée aux personnes handicapées sans carte :",
    "options": [
      "C’est interdit : amende de 135 €",
      "C’est toléré 5 minutes",
      "C’est autorisé le dimanche",
      "C’est autorisé la nuit"
    ],
    "explanation": "Ces places sont réservées aux titulaires de la Carte Mobilité Inclusion (CMI) : respecter, c’est permettre l’autonomie de chacun.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Une machine à laver cassée et hors d’usage peut être :",
    "options": [
      "Réparée, garantie, ou déposée gratuitement en déchèterie (ou reprise au 1 pour 1)",
      "Jetée dans la rue",
      "Brûlée au jardin",
      "Jetée dans la nature"
    ],
    "explanation": "Jamais dans la rue (jusqu’à 1 500 € d’amende) ! Garantie légale 2 ans ; le vendeur reprend l’ancien appareil lors d’un nouvel achat.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Le locataire d’un logement peut, sans autorisation du propriétaire :",
    "options": [
      "Repeindre les murs, accrocher des cadres, disposer ses meubles",
      "Abattre un mur porter",
      "Sous-louer le logement",
      "Changer la serrure sans rendre les clés"
    ],
    "explanation": "On se sent chez soi ! Mais abattre une cloison, sous-louer ou déménager des murs : autorisation écrite obligatoire.",
    "why": ""
  },
  {
    "kind": "connaissance",
    "theme": 5,
    "q": "Que faire si l’on est témoin de violences dans la rue ou chez un voisin ?",
    "options": [
      "Alerter la police (17) ou les secours : c’est un devoir citoyen",
      "Ne rien dire, c’est « privé »",
      "Intervenir seul physiquement",
      "Filmer et publier en ligne"
    ],
    "explanation": "Signaler protège les victimes. En cas de danger direct : 17 (police) ou 112.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Une collègue vous demande d’adapter les horaires de l’équipe pour qu’il puisse prier pendant ses horaires religieux. Que faites-vous ?",
    "options": [
      "Vous l’écoutez et lui suggérez d’en parler au responsable pour trouver un arrangement possible",
      "Vous refusez : « la religion est interdite au travail »",
      "Vous acceptez sans en parler à personne",
      "Vous en parlez à tous les collègues pour vous moquer"
    ],
    "explanation": "La laïcité garantit la liberté de conscience : dans le privé, un aménagement raisonnable est possible. La bonne démarche : le dialogue avec la hiérarchie.",
    "why": "Réflexe-examen : la bonne réponse passe TOUJOURS par le dialogue et le respect mutuel — jamais par l’humiliation ou l’interdiction totale."
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Lors d’une réunion de parents d’élèves, un père refuse de s’adresser à la directrice parce que c’est une femme. Que faites-vous ?",
    "options": [
      "Vous lui expliquez calmement que l’égalité entre les femmes et les hommes est un principe fondamental en France",
      "Vous respectez son choix culturel",
      "Vous appelez immédiatement la police",
      "Vous quittez la réunion en silence"
    ],
    "explanation": "En France, une femme a exactement la même autorité qu’un homme. Refuser de s’adresser à elle est illégal lui-même discriminatoire.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Sur un réseau social, une personne publie des messages haineux contre une religion. Que faites-vous ?",
    "options": [
      "Vous signalez le contenu à la plateforme (et à la plateforme officielle PHAROS si nécessaire)",
      "Vous partagez pour dénoncer",
      "Vous répondez par des insultes",
      "Vous ignorez : « c’est la liberté d’expression »"
    ],
    "explanation": "La haine en ligne est un délit : on signale via les plateformes et le portail PHAROS (police). JAMAIS répondre par la haine — et « ignorer » laisse la victime seule.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Un parent demande que sa fille soit dispensée du cours de sport (piscine) car c’est mixte, pour des raisons religieuses. Que doit répondre le directeur ?",
    "options": [
      "Il refuse : le programme scolaire est obligatoire pour tous, la laïcité interdit de choisir ses cours selon sa religion",
      "Il accepte par tolérance",
      "Il propose un cours individuel",
      "Il demande au rectorat d’arbitrer"
    ],
    "explanation": "À l’école publique, tous les enseignements sont obligatoires ; seul un certificat médical peut dispenser d’un cours — jamais un motif religieux.",
    "why": "Piège n°1 de l’examen : « tolérance » et « acceptation » sont de FAUSSES bonnes réponses. La bonne réponse est ferme et légale."
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Votre voisin vous confie avoir perdu la foi et vouloir renoncer publiquement à sa religion. Sa famille le menace de l’exclure. Que lui dites-vous ?",
    "options": [
      "La liberté de conscience inclut le droit de changer ou d’abandonner sa religion — elle est protégée par la loi",
      "Il doit rester dans sa religion pour sa famille",
      "Vous lui suggérez de faire semblant",
      "La loi interdit les « apostats »"
    ],
    "explanation": "La loi de 1905 et la Constitution protègent le droit de croire ET de ne plus croire. Personne ne peut forcer quelqu’un à garder une religion.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Un élu municipal porte une grande croix religieuse en célébrant des mariages et refuse de la retirer. C’est :",
    "options": [
      "Illégal : un agent public doit respecter la neutralité religieuse dans l’exercice de ses fonctions",
      "Légal : c’est sa liberté d’expression",
      "Légal si c’est discret",
      "Légal s’il est élu"
    ],
    "explanation": "La neutralité s’impose aux agents publics et aux élus dans leurs fonctions officielles. En dehors, ils sont des citoyens libres.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Dans une mairie, une usagère voilée vient retirer sa carte d’identité. Que peut faire l’agent ?",
    "options": [
      "L’accueillir comme tout usager — la neutralité s’impose à l’agent ; pour la photo et la vérification d’identité, le visage doit simplement être visible",
      "Refuser de la servir",
      "Exiger qu’elle retire son voile pour entrer",
      "Appeler la police"
    ],
    "explanation": "La neutralité s’impose aux AGENTS, jamais aux usagers. On n’exige pas de retirer un foulard ou un voile : seul le VISAGE visible suffit à établir l’identité.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Votre employeur refuse de vous embaucher après avoir vu votre prénom « étranger » sur le CV. C’est :",
    "options": [
      "De la discrimination : un délit sanctionné (Défenseur des droits, prud’hommes)",
      "Un choix d’entreprise normal",
      "Illégal mais sans recours",
      "Acceptable dans le privé"
    ],
    "explanation": "La discrimination liée à l’origine, au sexe, à la religion… est un délit. On peut saisir gratuitement le Défenseur des droits.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Un enseignant organise un débat sur les religions en classe. Des parents écrivent au directeur pour protester. Que dit la laïcité ?",
    "options": [
      "Enseigner l’histoire et le fait religieux est autorisé — c’est apprendre, pas faire du prosélytisme",
      "Il faut interdire ce cours",
      "Seule la religion chrétienne peut être enseignée",
      "L’école ne doit jamais parler de religion"
    ],
    "explanation": "La laïcité n’efface pas l’histoire des religions : enseigner les faits (cultures, histoire) est pédagogique ; faire du prosélytisme (imposer une foi) est interdit.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 1,
    "q": "Un restaurateur refuse de servir une cliente parce qu’elle porte une tenue religieuse. C’est :",
    "options": [
      "De la discrimination, illégale dans un commerce ouvert au public",
      "Son droit commercial",
      "Légal le soir",
      "Toléré par politesse"
    ],
    "explanation": "Refuser l’accès à un bien ou service pour des motifs religieux ou liés à l’origine est un délit, puni par la loi.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu assistes à un accident de la route : une moto est au sol, le conducteur inconscient. Que fais-tu en premier ?",
    "options": [
      "Appeler le 15/18/112, sécuriser la zone si possible sans te mettre en danger, rester sur place",
      "Déplacer le blessé",
      "Partir vite : « appelle quelqu’un d’autre »",
      "Publier une photo en ligne"
    ],
    "explanation": "Non-assistance à personne en danger = délit. Le bon réflexe : protéger (sans se mettre en danger), alerter (15 SAMU, 18 pompiers, 112 Europe), rester jusqu’aux secours.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Une collègue te dit gagner moins que son collègue masculin pour exactement le même poste. Tu lui conseilles :",
    "options": [
      "D’en parler à la DRH puis, si besoin, de saisir l’inspection du travail ou le Défenseur des droits",
      "De démissionner en silence",
      "De se venger en ligne",
      "De ne rien dire pour garder son poste"
    ],
    "explanation": "L’égalité salariale femmes-hommes à poste égal est imposée par la loi. Des recours légaux existent et protègent la salariée.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu perçois des revenus de l’étranger que ton employeur n’a pas déclarés en France. Que dois-tu faire vis-à-vis des impôts français ?",
    "options": [
      "Les déclarer : tout résident fiscal français déclare l’ensemble de ses revenus mondiaux",
      "Les garder secrets",
      "Attendre que le fisc les trouve",
      "Ne déclarer que ce qui dépasse 10 000 €"
    ],
    "explanation": "La règle claire : résident en France = déclaration de TOUS les revenus, d’où qu’ils viennent. L’administration fiscale est aujourd’hui très connectée.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Un jeune te dit : « Je ne paierai pas mes impôts, les politiciens volent tout ». Que lui réponds-tu ?",
    "options": [
      "L’impôt est un devoir qui finance les services publics de tous (écoles, hôpitaux, routes) — le refus est un délit",
      "Tu as raison, boycotte !",
      "Pais-en seulement si tu es riche",
      "Vote d’abord, paie après"
    ],
    "explanation": "Payer l’impôt est un pilier de la solidarité nationale : on bénéficie tous des mêmes services publics grâce à lui.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Ta voisine âgée tombe chez elle ; elle ne peut plus ouvrir sa porte. Tu entends ses appels au secours. Que fais-tu ?",
    "options": [
      "Appeler le 15 ou le 18, rester avec elle en lui parlant, prévenir éventuellement ses proches",
      "Appeler la voisine du dessus seulement",
      "Frapper chez le gardien et partir",
      "Attendre le lendemain matin"
    ],
    "explanation": "Assistance à personne en danger : on alerte les secours, on rassure, on reste disponible — c’est un devoir citoyen ET humain.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Un « ami » te propose un travail au restaurant « payé en liquide, sans déclaration ». Tu acceptes ?",
    "options": [
      "Non : le travail dissimulé est un délit — tu n’aurais ni couverture maladie, ni retraite, ni droits en cas d’accident",
      "Oui, c’est une bonne opportunité",
      "Oui, mais seulement le week-end",
      "Oui, si le salaire est bon"
    ],
    "explanation": "Toujours REFUSER : sans déclaration, tu travailles sans aucune protection (maladie, chômage, accident du travail, retraite) et tu risques des sanctions.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Ton employeur te paie moins que le SMIC « parce que tu n’as pas encore de carte de séjour ». C’est :",
    "options": [
      "Illégal : le SMIC s’applique à tout salarié, quelle que soit sa nationalité",
      "Légal pour les étrangers",
      "Légal la première année",
      "Une pratique normale"
    ],
    "explanation": "Le salaire minimum et les droits du Code du travail valent pour TOUS les salariés en France, sans distinction de nationalité.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu vois dans la rue un enfant seul en pleurs qui dit être perdu. Que fais-tu ?",
    "options": [
      "Tu restes avec lui, tu le rassures et tu appelles la police (17) pour qu’on retrouve ses parents",
      "Tu le laisses : ses parents reviendront",
      "Tu fais détourner le regard par politesse",
      "Tu le photographies et publies en ligne pour retrouver sa famille"
    ],
    "explanation": "On protège l’enfant en restant près de lui (sans l’emmener) et on appelle le 17. Publier sa photo l’expose à des dangers.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Un homme frappe sa femme devant toi dans la rue. Que fais-tu ?",
    "options": [
      "Tu appelles immédiatement la police (17) ou le 112, et tu ne t’interposes pas physiquement seul",
      "Tu restes spectateur : « c’est leur vie privée »",
      "Tu frappes l’homme à ton tour",
      "Tu cries « arrêtez » de loin et tu pars"
    ],
    "explanation": "Les violences conjugales sont un CRIME grave (« la sphère privée » n’existe pas devant la loi). On alerte les forces de l’ordre, en sécurité.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu es témoin d’un contrôle d’identité brutal où un policier insulte un jeune pour sa couleur de peau. Que peux-tu faire ?",
    "options": [
      "Le signaler : on peut saisir l’IGPN (« police des polices ») et le Défenseur des droits — aucun agent n’est au-dessus de la loi",
      "Rien, c’est leur travail",
      "Partager une vidéo identifiante en ligne comme preuve",
      "Insulter le policier"
    ],
    "explanation": "L’État de droit vaut aussi pour les forces de l’ordre : un comportement raciste est signalé (IGPN/IGGN, Défenseur des droits, justice).",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Quelqu’un te demande de transporter un petit paquet « pour un ami » entre deux villes contre 200 €, sans regarder dedans. Tu :",
    "options": [
      "Refuses : c’est potentiellement une infraction (stupéfiants, vols) — et tu signales",
      "Acceptes, 200 € c’est facile",
      "Acceptes mais regardes dedans",
      "Demandes 400 €"
    ],
    "explanation": "On refuse catégoriquement et on signale : les passeurs inconscients commettent un délit grave, même « sans savoir ».",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Dans le bus, un homme harcèle verbalement une jeune femme. Réaction correcte :",
    "options": [
      "Tu alertes le chauffeur/conducteur, tu te rapproches pour soutenir la victime (effet de nombre) et tu appelles le 17 si besoin",
      "Tu regardes ailleurs",
      "Tu filmes pour poster",
      "Tu cries sur l’homme"
    ],
    "explanation": "Le harcèlement dans les transports est un délit. Soutenir la victime en groupe et alerter, sans se mettre en danger, est le bon réflexe citoyen.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Ton enfant de 15 ans veut arrêter l’école pour « travailler et gagner de l’argent ». Que disent les règles ?",
    "options": [
      "L’instruction est obligatoire jusqu’à 16 ans, puis formation jusqu’à 18 ans — il existe des alternatives comme l’apprentissage dès 15 ans",
      "Il est libre : à lui de décider",
      "Il peut travailler dès 14 ans",
      "Il faut qu’il parte travailler à l’étranger"
    ],
    "explanation": "Jusqu’à 16 ans : école ou instruction en famille. De 16 à 18 ans : obligation de formation (lycée, apprentissage, service civique) — il n’est pas laissé sans cadre.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "En déménageant, tu trouves 500 € en liquide dans un meuble de ton nouvel appartement loué. Tu :",
    "options": [
      "Le signales au propriétaire et si tu le gardes malgré tout, c’est du vol de chose trouvée",
      "Le gardes : trouvé = à toi",
      "Le dépenses vite",
      "Ne dis rien"
    ],
    "explanation": "Une chose trouvée doit être signalée au propriétaire / à la mairie / à la police : la garder est une infraction (abus de confiance/vol).",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Ton voisin brûle ses déchets plastiques dans son jardin et la fumée envahit ta maison. Que fais-tu ?",
    "options": [
      "Tu lui parles calmement d’abord, puis tu signales à la mairie si ça continue (brûlage interdit, polluant et dangereux)",
      "Tu lui verses un sceau d’eau",
      "Tu appelles immédiatement le SAMU",
      "Tu brûles tes déchets aussi"
    ],
    "explanation": "Réflexe-examen : DIALOGUE d’abord, recours légal ensuite. Le brûlage de déchets en plein air est strictement interdit (santé, incendie).",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Des jeunes dégradent régulièrement le hall de ton immeuble (graffitis, déjections). Meilleure démarche :",
    "options": [
      "En parler au gardien/syndic, signaler à la police municipale ou au commissariat — la dégradation de bien public est un délit",
      "Casser quelque chose toi aussi pour « rendre justice »",
      "Les insulter",
      "Ne jamais rien dire"
    ],
    "explanation": "La dégradation de bien commun ou public est un délit : on peut signaler à la police municipale (ou nationale) et au propriétaire/syndic.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Un homme te propose à la sortie du métro un iPhone « neuf, à 50 € ». Tu :",
    "options": [
      "Refuses : c’est très probablement un objet volé (recel est un délit)",
      "Achètes : c’est une affaire",
      "Achètes en négociant 30 €",
      "Demandes son origine, et si c’est « trouvé », c’est bon"
    ],
    "explanation": "Acheter un bien dont on sait (ou on devine) qu’il est volé = recel, un délit puni de prison et d’amende.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Une femme voilée intégral (niqab) circule dans l’espace public. Que dit la loi ?",
    "options": [
      "La dissimulation du visage dans l’espace public est interdite (hors cas spécifiques), amende possible",
      "C’est totalement légal partout",
      "Interdit seulement dans les banques",
      "Autorisé avec une carte d’identité"
    ],
    "explanation": "Depuis 2010, la loi interdit la dissimulation du visage dans l’espace public (rue, transports, commerces). À l’intérieur de son domicile : liberté totale.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu te rends compte que ta carte d’identité a expiré le jour où tu dois prendre l’avion. Tu :",
    "options": [
      "Contactes immédiatement la compagnie et la mairie / préfecture pour les démarches possibles (titre provisoire, procurations)",
      "Prends ton ancien passeport étranger",
      "Achètes un faux document en ligne",
      "Annules et oublies"
    ],
    "explanation": "On n’achète JAMAIS de faux documents — c’est un crime grave. On se tourne vers l’administration (mairie, préfecture) : ils ont des solutions.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "En arrivant à un feu rouge avec des enfants pressés dans la voiture, un ami te dit « passe, il n’y a personne ». Tu :",
    "options": [
      "T’arrêtes : le code de la route s’applique toujours — avec des enfants, donner l’exemple est aussi un devoir parental",
      "Passes vite",
      "Passes en klaxonnant",
      "Demande si ton ami est sûr"
    ],
    "explanation": "Le code de la route n’a pas d’exception « urgence personnelle » ; franchir un feu met en danger des vies — et transmet l’exemple aux enfants.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Une association de quartier propose un repas « réservé aux femmes seulement » pour des raisons religieuses. Dans un local public, c’est :",
    "options": [
      "Discriminatoire : un lieu ouvert au public ne peut exclure selon le sexe ou la religion",
      "Parfaitement légal",
      "Acceptable si c’est culturel",
      "Toléré pour 1 fois"
    ],
    "explanation": "Les services publics et lieux recevant du public ne peuvent exclure personne pour son sexe ou sa religion : c’est le principe d’égal accès.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Ton ami musulman diffuse en ligne un texte appelant à ne pas saluer les femmes et à ne pas leur serrer la main « car elles sont impures ». Tu lui rends service en disant :",
    "options": [
      "Le respect de l’égalité entre les femmes et les hommes est un principe fondamental — ces propos relèvent de la provocation à la discrimination, un délit",
      "C’est sa religion, il dit ce qu’il veut",
      "Supprime le message seulement",
      "Ne réponds jamais"
    ],
    "explanation": "La liberté religieuse ne couvre PAS la provocation à la haine ou à la discrimination. Dire la loi calmement est aussi un acte de citoyenneté.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "À la piscine municipale, une femme refuse de se changer devant d’autres personnes car « les hommes pourraient la voir ». Que peut-on faire de raisonnable ?",
    "options": [
      "Proposer un aménagement raisonnable (cabine individuelle) — le droit à la dignité et la pudeur sont respectés, sans séparer les sexes",
      "Exiger qu’elle se change comme tout le monde",
      "L’expulser de la piscine",
      "Ne rien répondre"
    ],
    "explanation": "La règle : les aménagements individuels raisonnables (cabines, casiers) existent dans beaucoup de piscines — la pudeur de chacun peut être respectée sans ségrégation.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Un employeur te demande en entretien « tu comptes avoir un bébé ? sinon je ne prends pas ». Cette question est :",
    "options": [
      "Illégale : c’est de la discrimination liée au sexe — tu peux refuser de répondre et signaler",
      "Normale en entretien",
      "Légale dans un petit commerce",
      "Acceptable à l’oral"
    ],
    "explanation": "Les questions sur la vie privée, la grossesse ou la religion sont INTERDITES en entretien d’embauche. Refuser poliment est un droit.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu apprends qu’un magasin affiche « interdit aux chiens et aux femmes voilées ». Ce panneau est :",
    "options": [
      "Discriminatoire et illégal : un commerce ouvert au public ne peut exclure selon la tenue religieuse",
      "Légal si le patron est d’accord",
      "Légal pendant les fêtes",
      "Acceptable pour « l’image »"
    ],
    "explanation": "Les lieux recevant du public (commerces) ne peuvent pas refuser l’accès pour des motifs liés à l’apparence religieuse. On peut signaler au Défenseur des droits.",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Tu es en France depuis 3 ans et tu veux faire du bénévolat (restos du cœur, associations). C’est :",
    "options": [
      "Possible et encouragé à tout âge — le bénévolat est ouvert à tous, signe de l’engagement citoyen",
      "Interdit aux étrangers",
      "Réservé aux Français",
      "Payant"
    ],
    "explanation": "La fraternité se vit aussi par l’engagement : le bénévolat crée du lien, et les associations accueillent tous les volontaires — une belle preuve d’intégration pour ta lettre de motivation !",
    "why": ""
  },
  {
    "kind": "situation",
    "theme": 3,
    "q": "Ton voisin de palier diffuse sa musique très fort chaque nuit. Que fais-tu ?",
    "options": [
      "Dialogue d’abord, puis tapage nocturne = contravention — la police peut dresser procès, ou tu saisis le conciliateur de justice",
      "Tu réponds avec ta musique plus fort",
      "Tu coupes son compteur électrique",
      "Tu cries depuis ta fenêtre"
    ],
    "explanation": "Trouble anormal de voisinage : dialogue, puis mairie/police (contravention), ou conciliateur de justice pour une solution amiable en justice. Dialogue d’abord !",
    "why": ""
  }
];
const EXAM_SETTINGS = { total: 40, duration: 45, passing: 32 };
