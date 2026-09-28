# Sweet Vanilla Heritage — Site vitrine

Site vitrine statique (HTML / CSS / JS, sans framework ni backend) pour **Sweet Vanilla Heritage**, import-export de vanille Bourbon de Madagascar (David Lastouillat).

Charte reprise de la plaquette commerciale : noir profond + or, typographies *Playfair Display* / *Alex Brush* (Google Fonts), intro cinématique logo + vanille, effets Ken Burns et animations au scroll.

## Structure

```
.
├── index.html          Accueil
├── histoire.html        Notre Histoire
├── vanilles.html         Nos Vanilles (4 sélections : Fitiavana, Misiaraka, Soahary, Rabezezika)
├── tarifs.html            Grille tarifaire 2025/2026
├── confiance.html          Ils nous font confiance (clients + réseau import-export)
├── contact.html             Contact & demande de devis
├── cgv.html                  Conditions Générales de Vente
├── 404.html                   Page d'erreur personnalisée
├── CNAME                       Domaine personnalisé pour GitHub Pages
├── assets/
│   ├── css/style.css            Design system (couleurs, typo, composants, animations)
│   ├── js/main.js                Menu mobile, header au scroll, intro, reveal au scroll
│   └── img/                       Visuels extraits de la plaquette + logo recadré
└── README.md
```

Aucune dépendance à installer : ce sont des fichiers statiques. Les seules ressources externes sont les polices Google Fonts (chargées en CDN).

## Prévisualiser en local

Ouvrir simplement `index.html` dans un navigateur, ou lancer un petit serveur local (recommandé pour que les chemins relatifs et l'intro fonctionnent correctement) :

```bash
cd sweet-vanilla-heritage
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Mettre le site sur GitHub

Le dossier est déjà initialisé en dépôt Git local (`git init` + premier commit). Il ne reste qu'à le connecter à un dépôt distant sur ton compte GitHub :

1. Sur [github.com](https://github.com/new), crée un nouveau dépôt vide nommé par exemple `sweet-vanilla-heritage` (ne coche **aucune** case d'initialisation — pas de README, pas de licence — puisque le dépôt local en a déjà).
2. Dans le dossier du projet, relie-le au dépôt distant et pousse le code :

```bash
git remote add origin https://github.com/<ton-compte>/sweet-vanilla-heritage.git
git branch -M main
git push -u origin main
```

(remplace `<ton-compte>` par ton nom d'utilisateur GitHub — connexion demandée au premier push).

## Publier avec GitHub Pages

1. Dans le dépôt GitHub → **Settings → Pages**.
2. Source : **Deploy from a branch** → branche `main`, dossier `/ (root)`.
3. Enregistrer : le site sera en ligne quelques minutes après sur `https://<ton-compte>.github.io/sweet-vanilla-heritage/`.

### Domaine personnalisé (sweet-vanilla-heritage.com)

Le fichier `CNAME` à la racine pointe déjà vers `sweet-vanilla-heritage.com` (ce domaine est cité dans les CGV de SVH — **à vérifier qu'il est bien réservé/disponible** avant de le brancher). Pour l'activer :

1. Chez le registrar du domaine, ajouter un enregistrement `A` vers les IP GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) pour le domaine nu, et un `CNAME` vers `<ton-compte>.github.io` pour le sous-domaine `www`.
2. Dans **Settings → Pages** du dépôt, renseigner le domaine personnalisé et cocher *Enforce HTTPS* une fois le certificat généré.

Si le domaine n'est pas encore prêt, tu peux simplement supprimer le fichier `CNAME` et garder l'URL `github.io` en attendant.

## Points à vérifier avec le client (SVH)

- **CGV — adresse e-mail** : la plaquette utilise `sweetvanillafrance@gmail.com` partout, mais le texte des CGV mentionne une fois `sweetvanillaheritage@gmail.com`. J'ai repris le texte des CGV tel quel (fidélité au document officiel) — à faire confirmer par David avant mise en ligne, et corriger dans `cgv.html` si besoin.
- **Logo** : recadré directement depuis la plaquette PDF (pas de fichier vectoriel source) — sur fond noir uniquement. Si SVH a un fichier logo vectoriel (.ai/.svg/.png transparent), le remplacer dans `assets/img/logo.png` pour une netteté parfaite à toutes les tailles.
- **Réseaux sociaux** : le lien Facebook pointe vers `facebook.com` par défaut (URL de la page non fournie dans les documents) — à corriger avec l'URL exacte.
- **Formulaire de contact** : fonctionne en `mailto:` (ouvre le client mail du visiteur, pas d'envoi silencieux car le site est 100% statique). Pour un vrai formulaire qui envoie l'e-mail sans ouvrir Outlook/Gmail, on peut brancher un service gratuit comme [Formspree](https://formspree.io/) en quelques minutes le moment venu.
- **Vanille Pompona** : absente de la grille tarifaire fournie → présentée en page Tarifs comme « uniquement sur devis ». À ajuster si un tarif existe.

## Crédits

Textes et tarifs repris de la plaquette commerciale et de la grille tarifaire SVH 2025/2026. Photos extraites de ces mêmes documents (© Sweet Vanilla Heritage).

Site conçu par Coin Coin Publicité & Communication.
