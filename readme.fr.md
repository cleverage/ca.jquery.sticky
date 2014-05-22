jQuery Sticky Plug-in
=====================

Ce plug-in permet de transformer n'importe quel element HTML en un élément fixe.
Un élément fixe est un élément qui va défiler avec le reste de la page
et va rester coller en haut de la fenètre dès qu'il l'atteint.


API
---

La methode d'initialisation du plugin est `sticky()`

```javascript
$('.stick_me').sticky(options)
```

Cette methode accept un objet de configuration ayant 1 propriété : `offset`.

### `offset`

Cette propriété est un nombre qui indique le décalage (en pixel) de la position
à laquelle l'élément devient fixe. Une valeur positive indique que l'élément
deviendra fixe avant d'atteindre le haut de la page ; une valeur négative
indique que l'élément deviendra fixe après avoir atteind le haut de la page.

La valeur par défaut est `0`.


### Surcharger les paramètre par défaut.

Il est possible de lire et surcharger les valeurs par défaut de chaque paramètre
en modifiant l'objet `$.fn.sticky.defaults`.

### Impact sur le DOM et CSS

Ce plugin va avoir deux impact sur le DOM d'un document:

1. Il va rajouter la class `sticky` à l'élément quand il devient fixe.
2. Il va rajouter un élément `div` avec la class `sticky-placeholder` dans le
   DOM imédiatement après l'élément quand celui-ci devient fixe. Cet élément est
   supprimé dès que l'élément n'est plus fixe.

Il a également des impact au niveau CSS:

1. Lorsque l'élément devient fixe sont positionnement est définie par le plugin
   (`position` et `top`) et son model de boite est altéré: la largeur est
   figé et les `margin` sont mis à 0.
2. L'élément `sticky-placeholder` à sont model de boite figé. _Il est très
   vivement déconseillé d'appliquer le moindre style à cet élément._

Les classes rajoutées dans le DOM peuvent être personalisées en modifiant
l'objet `$.fn.sticky.className`. Cet objet dispose de deux propriétés:

* `placeholder` qui définie le nom de la classe à donner à l'élément `div`
  inséré après l'élément fixe.
* `sticky` qui définie le nom de la classe à appliquer un élément qui devient
  fixe.
