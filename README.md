# Mes Bières & Vins

Application web installable (PWA) pour :

- répondre à un **questionnaire de goûts** qui s'adapte aux réponses ;
- **noter** des bières et des vins connus (👎 je n'aime pas, 😐 neutre, 👍 j'aime bien, 🔖 jamais goûté) ;
- tenir une **bibliothèque** de dégustation, avec ses propres ajouts (nom, brasserie ou domaine, style, prix, lieu, commentaire) ;
- recevoir des **suggestions** classées selon ses goûts, avec les raisons affichées.

Les données restent sur l'appareil de chaque personne. Le bouton « Exporter ma sauvegarde » permet de les conserver ou de les transférer.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application |
| `data.js` | Le catalogue (bières, vins) et les questions : c'est ce fichier qu'on modifie pour ajouter des produits |
| `manifest.webmanifest` | Nom, icône et couleurs de l'application installée |
| `sw.js` | Fonctionnement sans connexion |
| `icons/` | Icônes |

## Mettre à jour

1. Remplacer le ou les fichiers modifiés dans le dépôt GitHub.
2. Dans `sw.js`, augmenter le numéro de version (`bieres-vins-v1` → `bieres-vins-v2`) pour que les téléphones récupèrent la nouvelle version.

Les caractéristiques des produits sont des repères généraux : elles varient selon les producteurs et les années.

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
