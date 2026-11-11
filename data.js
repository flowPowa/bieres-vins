/* =====================================================================
   Catalogue et questionnaire de « Mes Bières & Vins »
   ---------------------------------------------------------------------
   Échelles utilisées pour les caractéristiques (1 = peu, 3 = beaucoup) :
   - Bières : amer (amertume), corps (léger → rond), force (1 = 5 % ou
     moins, 2 = 5 à 7 %, 3 = plus de 7 %)
   - Vins   : sucre (1 = sec, 3 = doux), corps (léger → puissant),
     acid (fraîcheur / acidité), tan (tanins, pour les rouges)
   Ces valeurs sont des repères généraux : les recettes et les
   millésimes varient d'un producteur et d'une année à l'autre.
   ===================================================================== */

const BEER_STYLES = {
  lager:      { label: "Blondes légères (lager, pils)", short: "Blonde légère", amer: 1, corps: 1, force: 1,
                help: "Légères, désaltérantes, peu amères. Ex. : Heineken, Kronenbourg, 1664." },
  blanche:    { label: "Bières blanches", short: "Blanche", amer: 1, corps: 1, force: 1,
                help: "Brassées avec du blé : troubles et douces, notes d'agrumes et de coriandre (belges) ou de banane (allemandes). Ex. : Hoegaarden, 1664 Blanc, Paulaner." },
  abbaye:     { label: "Blondes belges et d'abbaye", short: "Blonde d'abbaye", amer: 1, corps: 2, force: 2,
                help: "Plus rondes et un peu plus sucrées qu'une lager, autour de 6 à 7 %. Ex. : Leffe Blonde, Grimbergen, Affligem." },
  triple:     { label: "Triples et belges fortes", short: "Triple / forte", amer: 2, corps: 2, force: 3,
                help: "Blondes puissantes (8 à 10 %), fruitées et épicées. Ex. : Duvel, La Chouffe, Tripel Karmeliet, Delirium." },
  ambree:     { label: "Ambrées", short: "Ambrée", amer: 1, corps: 2, force: 2,
                help: "Couleur cuivrée, notes de caramel et de biscuit. Ex. : Jenlain Ambrée, Pietra, Kwak." },
  brune:      { label: "Brunes", short: "Brune", amer: 1, corps: 3, force: 3,
                help: "Caramel, fruits secs, parfois chocolat ; souvent fortes chez les belges. Ex. : Pelforth Brune, Leffe Brune, Chimay Bleue." },
  stout:      { label: "Stouts et porters", short: "Stout / porter", amer: 2, corps: 2, force: 1,
                help: "Très foncées, goût de café et de chocolat noir, plutôt sèches. Ex. : Guinness, Murphy's." },
  ipa:        { label: "IPA et pale ales", short: "IPA / pale ale", amer: 3, corps: 2, force: 2,
                help: "Très houblonnées : parfumées (agrumes, fruits exotiques, résine) et souvent amères. Ex. : Punk IPA, Goose Island IPA." },
  fruitee:    { label: "Bières fruitées et aromatisées", short: "Fruitée", amer: 1, corps: 1, force: 1,
                help: "Cerise, pêche, fruits rouges ou arôme tequila ; souvent sucrées. Ex. : Kriek Lindemans, Pêcheresse, Desperados." },
  acide:      { label: "Bières acides (gueuze, rouge des Flandres)", short: "Acide", amer: 1, corps: 1, force: 2,
                help: "Acidité marquée, un peu comme un cidre sec ou un vinaigre balsamique doux. Ex. : Rodenbach, Duchesse de Bourgogne." },
  sansalcool: { label: "Bières sans alcool", short: "Sans alcool", amer: 1, corps: 1, force: 1,
                help: "Ex. : Heineken 0.0, Leffe 0.0, Tourtel Twist." }
};

const WINE_PROFILES = {
  rouge_leger:   { color: "rouge", label: "Rouges légers et fruités", short: "Rouge léger", sucre: 1, corps: 1, acid: 2, tan: 1,
                   help: "Peu de tanins (le tanin, c'est la sensation qui assèche la bouche, comme un thé trop infusé). Ex. : Beaujolais, Bourgogne, Saumur-Champigny." },
  rouge_corse:   { color: "rouge", label: "Rouges corsés et tanniques", short: "Rouge corsé", sucre: 1, corps: 3, acid: 2, tan: 3,
                   help: "Puissants et structurés, ils gagnent souvent à vieillir. Ex. : Bordeaux (Médoc), Cahors, Madiran." },
  rouge_sud:     { color: "rouge", label: "Rouges du Rhône et du Sud, épicés", short: "Rouge du Sud", sucre: 1, corps: 2, acid: 1, tan: 2,
                   help: "Fruits mûrs, poivre, herbes de garrigue. Ex. : Côtes-du-Rhône, Languedoc, Châteauneuf-du-Pape." },
  blanc_vif:     { color: "blanc", label: "Blancs secs et vifs", short: "Blanc vif", sucre: 1, corps: 1, acid: 3, tan: 0,
                   help: "Frais, désaltérants, parfois salins. Ex. : Muscadet, Sancerre, Chablis." },
  blanc_rond:    { color: "blanc", label: "Blancs ronds, parfois boisés", short: "Blanc rond", sucre: 1, corps: 3, acid: 2, tan: 0,
                   help: "Amples, notes de beurre, de noisette ou de vanille quand ils sont élevés en fût de chêne. Ex. : Meursault, Bourgogne blanc." },
  blanc_aroma:   { color: "blanc", label: "Blancs aromatiques", short: "Blanc aromatique", sucre: 2, corps: 2, acid: 2, tan: 0,
                   help: "Très parfumés (fleurs, litchi, fruits exotiques), parfois légèrement sucrés. Ex. : Gewurztraminer, Pinot gris, Condrieu." },
  rose_sec:      { color: "rose", label: "Rosés secs et pâles", short: "Rosé sec", sucre: 1, corps: 1, acid: 2, tan: 0,
                   help: "Légers et secs. Ex. : Côtes de Provence, Rosé de Loire." },
  rose_doux:     { color: "rose", label: "Rosés tendres (un peu sucrés)", short: "Rosé tendre", sucre: 2, corps: 1, acid: 2, tan: 0,
                   help: "Fruités et légèrement sucrés. Ex. : Rosé d'Anjou, Cabernet d'Anjou." },
  bulles_brut:   { color: "bulles", label: "Bulles sèches (brut)", short: "Bulles brut", sucre: 1, corps: 2, acid: 3, tan: 0,
                   help: "« Brut » veut dire peu sucré. Ex. : Champagne brut, Crémants, Cava." },
  bulles_douces: { color: "bulles", label: "Bulles fruitées ou douces", short: "Bulles douces", sucre: 2, corps: 1, acid: 2, tan: 0,
                   help: "Plus sucrées et plus légères. Ex. : Prosecco, Moscato d'Asti, Clairette de Die." },
  doux:          { color: "doux", label: "Vins doux et liquoreux", short: "Doux / liquoreux", sucre: 3, corps: 3, acid: 2, tan: 0,
                   help: "Sucrés, servis à l'apéritif ou au dessert. Ex. : Sauternes, Monbazillac, Porto." }
};

const WINE_COLORS = {
  rouge:  { q: "v_rouge",  label: "Vins rouges" },
  blanc:  { q: "v_blanc",  label: "Vins blancs" },
  rose:   { q: "v_rose",   label: "Vins rosés" },
  bulles: { q: "v_bulles", label: "Vins effervescents" },
  doux:   { q: "v_doux",   label: "Vins doux et liquoreux" }
};

const REGIONS = {
  loire:     "Vallée de la Loire (Muscadet, Sancerre, Chinon…)",
  bordeaux:  "Bordeaux",
  bourgogne: "Bourgogne et Beaujolais",
  rhone:     "Vallée du Rhône",
  sud:       "Languedoc, Roussillon, Provence",
  sudouest:  "Sud-Ouest (Cahors, Madiran, Jurançon…)",
  alsace:    "Alsace",
  champagne: "Champagne",
  etranger:  "Vins étrangers (Italie, Espagne, Nouveau Monde…)"
};

const AROMAS = {
  cereales:     "Céréales, pain, biscuit",
  agrumes:      "Agrumes et fruits exotiques (houblon)",
  fruits_rouges:"Fruits rouges (cerise, framboise)",
  fruits_doux:  "Fruits doux (banane, pêche, poire)",
  caramel:      "Caramel, miel, fruits secs",
  torrefie:     "Café, chocolat, grillé",
  epices:       "Épices (coriandre, clou de girofle, poivre)",
  acidite:      "Acidité, côté acidulé"
};

/* ---------------------------------------------------------------------
   Catalogue des bières
   --------------------------------------------------------------------- */
const BIERES = [
  // Blondes légères
  { id: "heineken", n: "Heineken", prod: "Heineken", pays: "Pays-Bas", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager blonde internationale, légère et désaltérante." },
  { id: "kronenbourg", n: "Kronenbourg", prod: "Kronenbourg", pays: "France (Alsace)", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "La blonde française classique, légère et peu amère." },
  { id: "1664", n: "1664", prod: "Kronenbourg", pays: "France (Alsace)", style: "lager", amer: 1, corps: 1, force: 2, ar: ["cereales"], d: "Blonde française un peu plus ronde que la Kronenbourg classique." },
  { id: "carlsberg", n: "Carlsberg", prod: "Carlsberg", pays: "Danemark", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Pils danoise légère et sèche." },
  { id: "stella", n: "Stella Artois", prod: "AB InBev", pays: "Belgique", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Pils belge légère, petite pointe d'amertume." },
  { id: "jupiler", n: "Jupiler", prod: "AB InBev", pays: "Belgique", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Pils belge très répandue, légère et simple." },
  { id: "pilsner_urquell", n: "Pilsner Urquell", prod: "Plzeňský Prazdroj", pays: "République tchèque", style: "lager", amer: 2, corps: 2, force: 1, ar: ["cereales"], d: "La pils d'origine (Plzeň, 1842) : plus amère et maltée que les lagers industrielles." },
  { id: "grolsch", n: "Grolsch Premium Lager", prod: "Grolsch", pays: "Pays-Bas", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager néerlandaise connue pour sa bouteille à bouchon mécanique." },
  { id: "becks", n: "Beck's", prod: "Beck's", pays: "Allemagne", style: "lager", amer: 2, corps: 1, force: 1, ar: ["cereales"], d: "Pils allemande nette, amertume bien présente." },
  { id: "peroni", n: "Peroni Nastro Azzurro", prod: "Peroni", pays: "Italie", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager italienne légère et fraîche." },
  { id: "estrella", n: "Estrella Damm", prod: "Damm", pays: "Espagne", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager méditerranéenne de Barcelone, légère." },
  { id: "corona", n: "Corona Extra", prod: "Grupo Modelo", pays: "Mexique", style: "lager", amer: 1, corps: 1, force: 1, ar: [], d: "Très légère, souvent servie avec un quartier de citron vert." },
  { id: "asahi", n: "Asahi Super Dry", prod: "Asahi", pays: "Japon", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager japonaise très sèche et vive." },
  { id: "kirin", n: "Kirin Ichiban", prod: "Kirin", pays: "Japon", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager japonaise douce, brassée avec le premier jus de malt uniquement." },
  { id: "sapporo", n: "Sapporo Premium", prod: "Sapporo", pays: "Japon", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager japonaise légère et nette." },
  { id: "tsingtao", n: "Tsingtao", prod: "Tsingtao", pays: "Chine", style: "lager", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Lager chinoise légère, fréquente dans les restaurants asiatiques." },
  { id: "singha", n: "Singha", prod: "Boon Rawd", pays: "Thaïlande", style: "lager", amer: 1, corps: 2, force: 1, ar: ["cereales"], d: "Lager thaïlandaise un peu plus maltée." },
  // Blanches
  { id: "hoegaarden", n: "Hoegaarden", prod: "AB InBev", pays: "Belgique", style: "blanche", amer: 1, corps: 1, force: 1, ar: ["agrumes", "epices"], d: "Blanche belge à la coriandre et à l'écorce d'orange." },
  { id: "1664_blanc", n: "1664 Blanc", prod: "Kronenbourg", pays: "France (Alsace)", style: "blanche", amer: 1, corps: 1, force: 1, ar: ["agrumes"], d: "Blanche très douce, notes d'agrumes." },
  { id: "blanche_bxl", n: "Blanche de Bruxelles", prod: "Brasserie Lefebvre", pays: "Belgique", style: "blanche", amer: 1, corps: 1, force: 1, ar: ["agrumes", "epices"], d: "Blanche belge légère, agrumes et coriandre." },
  { id: "paulaner", n: "Paulaner Hefe-Weissbier", prod: "Paulaner", pays: "Allemagne (Bavière)", style: "blanche", amer: 1, corps: 2, force: 2, ar: ["fruits_doux", "epices"], d: "Bière de blé bavaroise : banane et clou de girofle." },
  { id: "erdinger", n: "Erdinger Weissbier", prod: "Erdinger", pays: "Allemagne (Bavière)", style: "blanche", amer: 1, corps: 2, force: 2, ar: ["fruits_doux", "epices"], d: "Bière de blé bavaroise, ronde, notes de banane." },
  { id: "franziskaner", n: "Franziskaner Hefe-Weissbier", prod: "Spaten-Franziskaner", pays: "Allemagne (Bavière)", style: "blanche", amer: 1, corps: 2, force: 1, ar: ["fruits_doux", "epices"], d: "Bière de blé bavaroise fruitée et légèrement épicée." },
  // Blondes belges / abbaye
  { id: "leffe_blonde", n: "Leffe Blonde", prod: "AB InBev", pays: "Belgique", style: "abbaye", amer: 1, corps: 2, force: 2, ar: ["fruits_doux", "epices"], d: "Blonde d'abbaye ronde, légèrement sucrée, notes de vanille et de clou de girofle." },
  { id: "grimbergen_blonde", n: "Grimbergen Blonde", prod: "Grimbergen (Carlsberg)", pays: "Belgique", style: "abbaye", amer: 1, corps: 2, force: 2, ar: ["fruits_doux", "caramel"], d: "Blonde d'abbaye douce et fruitée." },
  { id: "affligem_blonde", n: "Affligem Blonde", prod: "Affligem (Heineken)", pays: "Belgique", style: "abbaye", amer: 1, corps: 2, force: 2, ar: ["fruits_doux", "epices"], d: "Blonde d'abbaye fruitée et légèrement épicée." },
  { id: "maredsous_blonde", n: "Maredsous Blonde", prod: "Duvel Moortgat", pays: "Belgique", style: "abbaye", amer: 2, corps: 2, force: 2, ar: ["cereales", "fruits_doux"], d: "Blonde d'abbaye fine, légère amertume." },
  { id: "trolls", n: "Cuvée des Trolls", prod: "Brasserie Dubuisson", pays: "Belgique", style: "abbaye", amer: 1, corps: 2, force: 2, ar: ["agrumes", "fruits_doux"], d: "Blonde belge fruitée, notes d'écorce d'orange." },
  // Triples et belges fortes
  { id: "duvel", n: "Duvel", prod: "Duvel Moortgat", pays: "Belgique", style: "triple", amer: 2, corps: 2, force: 3, ar: ["fruits_doux", "epices"], d: "Blonde forte belge très pétillante, sèche et fine." },
  { id: "delirium", n: "Delirium Tremens", prod: "Brouwerij Huyghe", pays: "Belgique", style: "triple", amer: 1, corps: 2, force: 3, ar: ["fruits_doux", "epices"], d: "Blonde forte à l'éléphant rose, fruitée et épicée." },
  { id: "chouffe", n: "La Chouffe", prod: "Brasserie d'Achouffe", pays: "Belgique", style: "triple", amer: 1, corps: 2, force: 3, ar: ["fruits_doux", "epices"], d: "Blonde forte au lutin, fruitée, légèrement épicée (coriandre)." },
  { id: "karmeliet", n: "Tripel Karmeliet", prod: "Brouwerij Bosteels", pays: "Belgique", style: "triple", amer: 1, corps: 3, force: 3, ar: ["cereales", "fruits_doux", "epices"], d: "Triple à trois céréales (orge, blé, avoine), ronde et onctueuse." },
  { id: "westmalle_tripel", n: "Westmalle Tripel", prod: "Abbaye trappiste de Westmalle", pays: "Belgique", style: "triple", amer: 2, corps: 2, force: 3, ar: ["fruits_doux", "epices"], d: "Triple trappiste de référence : sèche, fruitée, puissante." },
  { id: "chimay_blanche", n: "Chimay Blanche (Triple)", prod: "Abbaye trappiste de Scourmont", pays: "Belgique", style: "triple", amer: 2, corps: 2, force: 3, ar: ["fruits_doux", "epices"], d: "Triple trappiste plus sèche et houblonnée que les autres Chimay." },
  // Ambrées
  { id: "jenlain", n: "Jenlain Ambrée", prod: "Brasserie Duyck", pays: "France (Nord)", style: "ambree", amer: 1, corps: 2, force: 3, ar: ["caramel", "cereales"], d: "Bière de garde du Nord, maltée et caramélisée." },
  { id: "pietra", n: "Pietra", prod: "Brasserie Pietra", pays: "France (Corse)", style: "ambree", amer: 1, corps: 2, force: 2, ar: ["caramel", "cereales"], d: "Ambrée corse brassée avec de la farine de châtaigne." },
  { id: "kwak", n: "Pauwel Kwak", prod: "Brouwerij Bosteels", pays: "Belgique", style: "ambree", amer: 1, corps: 3, force: 3, ar: ["caramel", "fruits_doux"], d: "Ambrée forte et sucrée, servie dans un verre à fond rond tenu par un support en bois." },
  { id: "orval", n: "Orval", prod: "Abbaye trappiste d'Orval", pays: "Belgique", style: "ambree", amer: 3, corps: 1, force: 2, ar: ["cereales"], d: "Trappiste unique : sèche, amère, notes rustiques qui évoluent avec le temps." },
  { id: "brooklyn", n: "Brooklyn Lager", prod: "Brooklyn Brewery", pays: "États-Unis", style: "ambree", amer: 2, corps: 2, force: 2, ar: ["caramel", "cereales"], d: "Lager ambrée de New York, maltée et bien houblonnée." },
  // Brunes
  { id: "pelforth_brune", n: "Pelforth Brune", prod: "Pelforth (Heineken)", pays: "France (Nord)", style: "brune", amer: 1, corps: 2, force: 2, ar: ["caramel", "torrefie"], d: "Brune française classique : caramel et notes grillées." },
  { id: "leffe_brune", n: "Leffe Brune", prod: "AB InBev", pays: "Belgique", style: "brune", amer: 1, corps: 2, force: 2, ar: ["caramel", "epices"], d: "Brune d'abbaye douce : caramel, fruits secs." },
  { id: "westmalle_dubbel", n: "Westmalle Dubbel", prod: "Abbaye trappiste de Westmalle", pays: "Belgique", style: "brune", amer: 1, corps: 2, force: 2, ar: ["caramel", "fruits_doux"], d: "Brune trappiste : caramel, fruits secs, finale sèche." },
  { id: "chimay_bleue", n: "Chimay Bleue (Grande Réserve)", prod: "Abbaye trappiste de Scourmont", pays: "Belgique", style: "brune", amer: 1, corps: 3, force: 3, ar: ["caramel", "fruits_doux"], d: "Brune trappiste puissante : fruits secs, caramel ; s'améliore en vieillissant." },
  { id: "rochefort10", n: "Rochefort 10", prod: "Abbaye trappiste de Rochefort", pays: "Belgique", style: "brune", amer: 1, corps: 3, force: 3, ar: ["caramel", "torrefie", "fruits_doux"], d: "Brune trappiste très forte et riche : figue, prune, chocolat." },
  { id: "st_bernardus12", n: "St. Bernardus Abt 12", prod: "Brouwerij St. Bernardus", pays: "Belgique", style: "brune", amer: 1, corps: 3, force: 3, ar: ["caramel", "fruits_doux", "epices"], d: "Brune belge très forte, ronde et épicée." },
  { id: "gulden_draak", n: "Gulden Draak", prod: "Brouwerij Van Steenberge", pays: "Belgique", style: "brune", amer: 1, corps: 3, force: 3, ar: ["caramel"], d: "Brune forte et sucrée, caramel et fruits secs." },
  // Stouts et porters
  { id: "guinness", n: "Guinness Draught", prod: "Guinness", pays: "Irlande", style: "stout", amer: 2, corps: 1, force: 1, ar: ["torrefie"], d: "Stout irlandais : café, chocolat noir, mousse crémeuse ; plus léger qu'il n'en a l'air." },
  { id: "murphys", n: "Murphy's Irish Stout", prod: "Murphy's", pays: "Irlande", style: "stout", amer: 1, corps: 1, force: 1, ar: ["torrefie"], d: "Stout irlandais plus doux et moins amer que la Guinness." },
  { id: "fullers_porter", n: "Fuller's London Porter", prod: "Fuller's", pays: "Royaume-Uni", style: "stout", amer: 2, corps: 2, force: 2, ar: ["torrefie", "caramel"], d: "Porter londonien : chocolat, café, caramel." },
  // IPA et pale ales
  { id: "punk_ipa", n: "BrewDog Punk IPA", prod: "BrewDog", pays: "Écosse", style: "ipa", amer: 3, corps: 1, force: 2, ar: ["agrumes"], west: true, d: "IPA moderne : fruits tropicaux, pamplemousse, amertume franche." },
  { id: "elvis_juice", n: "BrewDog Elvis Juice", prod: "BrewDog", pays: "Écosse", style: "ipa", amer: 3, corps: 2, force: 2, ar: ["agrumes"], west: true, d: "IPA au pamplemousse, très agrumes, bien amère." },
  { id: "hazy_jane", n: "BrewDog Hazy Jane", prod: "BrewDog", pays: "Écosse", style: "ipa", amer: 2, corps: 2, force: 1, ar: ["agrumes", "fruits_doux"], hazy: true, d: "IPA trouble (« hazy ») : jus de fruits exotiques, peu amère." },
  { id: "goose_ipa", n: "Goose Island IPA", prod: "Goose Island", pays: "États-Unis (Chicago)", style: "ipa", amer: 3, corps: 2, force: 2, ar: ["agrumes"], d: "IPA américaine : agrumes, résine, amertume marquée." },
  { id: "lagunitas", n: "Lagunitas IPA", prod: "Lagunitas", pays: "États-Unis (Californie)", style: "ipa", amer: 3, corps: 2, force: 2, ar: ["agrumes"], west: true, d: "IPA de la côte Ouest, résineuse et amère." },
  { id: "sierra_pale", n: "Sierra Nevada Pale Ale", prod: "Sierra Nevada", pays: "États-Unis (Californie)", style: "ipa", amer: 2, corps: 2, force: 2, ar: ["agrumes"], d: "Pale ale américaine pionnière : pin, agrumes, équilibrée." },
  // Fruitées et aromatisées
  { id: "lindemans_kriek", n: "Lindemans Kriek", prod: "Lindemans", pays: "Belgique", style: "fruitee", amer: 1, corps: 1, force: 1, ar: ["fruits_rouges"], d: "Bière à la cerise, sucrée, très peu alcoolisée." },
  { id: "pecheresse", n: "Lindemans Pêcheresse", prod: "Lindemans", pays: "Belgique", style: "fruitee", amer: 1, corps: 1, force: 1, ar: ["fruits_doux"], d: "À la pêche, très sucrée, presque un jus." },
  { id: "mort_subite_kriek", n: "Mort Subite Kriek", prod: "Mort Subite", pays: "Belgique", style: "fruitee", amer: 1, corps: 1, force: 1, ar: ["fruits_rouges", "acidite"], d: "Kriek à base de lambic : cerise acidulée." },
  { id: "liefmans", n: "Liefmans Fruitesse", prod: "Liefmans", pays: "Belgique", style: "fruitee", amer: 1, corps: 1, force: 1, ar: ["fruits_rouges"], d: "Bière aux fruits rouges très sucrée, souvent servie sur glace." },
  { id: "leffe_ruby", n: "Leffe Ruby", prod: "AB InBev", pays: "Belgique", style: "fruitee", amer: 1, corps: 1, force: 1, ar: ["fruits_rouges"], d: "Leffe aux fruits rouges, légère et sucrée." },
  { id: "kasteel_rouge", n: "Kasteel Rouge", prod: "Brouwerij Van Honsebrouck", pays: "Belgique", style: "fruitee", amer: 1, corps: 3, force: 3, ar: ["fruits_rouges", "caramel"], d: "Brune forte à la cerise, sucrée et puissante." },
  { id: "desperados", n: "Desperados", prod: "Heineken", pays: "France", style: "fruitee", amer: 1, corps: 1, force: 2, ar: [], d: "Lager aromatisée à la tequila, sucrée." },
  // Acides
  { id: "mort_subite_gueuze", n: "Mort Subite Gueuze", prod: "Mort Subite", pays: "Belgique", style: "acide", amer: 1, corps: 1, force: 1, ar: ["acidite"], d: "Assemblage de lambics : acide et sec, rappelle un cidre brut." },
  { id: "rodenbach", n: "Rodenbach Classic", prod: "Rodenbach", pays: "Belgique", style: "acide", amer: 1, corps: 1, force: 2, ar: ["acidite", "fruits_rouges"], d: "Rouge des Flandres vieillie en foudre de chêne : aigre-douce." },
  { id: "duchesse", n: "Duchesse de Bourgogne", prod: "Brouwerij Verhaeghe", pays: "Belgique", style: "acide", amer: 1, corps: 2, force: 2, ar: ["acidite", "fruits_rouges", "caramel"], d: "Rouge des Flandres aigre-douce : cerise, notes de vinaigre balsamique." },
  // Sans alcool
  { id: "heineken00", n: "Heineken 0.0", prod: "Heineken", pays: "Pays-Bas", style: "sansalcool", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Version sans alcool de la Heineken." },
  { id: "leffe00", n: "Leffe Blonde 0.0", prod: "AB InBev", pays: "Belgique", style: "sansalcool", amer: 1, corps: 2, force: 1, ar: ["fruits_doux"], d: "Version sans alcool de la Leffe Blonde." },
  { id: "tourtel_twist", n: "Tourtel Twist", prod: "Kronenbourg", pays: "France", style: "sansalcool", amer: 1, corps: 1, force: 1, ar: ["fruits_doux", "agrumes"], d: "Bière sans alcool aromatisée aux fruits." },
  { id: "punk_af", n: "BrewDog Punk AF", prod: "BrewDog", pays: "Écosse", style: "sansalcool", amer: 2, corps: 1, force: 1, ar: ["agrumes"], d: "IPA sans alcool, houblonnée." },
  { id: "erdinger_af", n: "Erdinger Alkoholfrei", prod: "Erdinger", pays: "Allemagne", style: "sansalcool", amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Bière de blé sans alcool." }
];

/* ---------------------------------------------------------------------
   Bières de l'Ouest (Bretagne, Loire-Atlantique, Vendée)
   deg   : degré d'alcool relevé sur une source (fiche brasserie, caviste,
           base de dégustation) en novembre 2026 ; les recettes évoluent.
   estim : true quand le degré n'a pas été trouvé (valeurs estimées
           d'après le style).
   Sources principales :
   - La Titan : brasserie-du-bouffay.com/bieres/la-titan/
   - AERoFAB : biere-art.com (Noroît), lacompagniedesbonnesbouteilles.fr
     (Ouragan), drinks-explorer.com (gamme)
   - Lancelot : auchan.fr (Morgane), comptoir-irlandais.com (Telenn Du,
     Duchesse Anne), worldbeerawards.com (Blanche Hermine)
   - Coreff : beertasting.com (Blonde, Ambrée, Dramm Hud, Bio Blanche)
   - Mélusine : birrapedia.com, pintplease.com (Hellfest IPA)
   - Brasserie de Bretagne : birrapedia.com, beermenus.com
   - Little Atlantique Brewery : coursesu.com (Ouest Coast IPA)
   - NAO : gaultmillau.com (West Coast IPA)
   --------------------------------------------------------------------- */
const BIERES_OUEST = [
  // Loire-Atlantique
  { id: "bouffay_titan", n: "La Titan", prod: "Brasserie du Bouffay", pays: "Carquefou (44)", style: "ipa", deg: 6, amer: 2, corps: 2, force: 2, ar: ["agrumes", "fruits_doux"], d: "IPA « à la française » : agrumes, orange, fruits exotiques, amertume franche mais équilibrée. Son nom rend hommage aux grues Titan de l'île de Nantes." },
  { id: "aerofab_noroit", n: "AERoFAB Noroît", prod: "AERoFAB", pays: "Nantes (44)", style: "ipa", deg: 8, amer: 3, corps: 3, force: 3, ar: ["agrumes", "cereales"], west: true, d: "Double IPA en canette : amertume très marquée, adoucie en fin de bouche ; blé et avoine dans la recette." },
  { id: "aerofab_ouragan", n: "AERoFAB Ouragan", prod: "AERoFAB", pays: "Nantes (44)", style: "ipa", deg: 8, amer: 3, corps: 3, force: 3, ar: ["agrumes", "caramel"], d: "Double IPA à la levure kveik : agrumes, fruits exotiques, orange confite, caramel. La recette évolue d'une version à l'autre." },
  { id: "aerofab_noreaster", n: "AERoFAB Nor'Easter", prod: "AERoFAB", pays: "Nantes (44)", style: "ipa", amer: 2, corps: 2, force: 2, estim: true, ar: ["agrumes", "fruits_doux"], hazy: true, d: "NEIPA : IPA trouble et juteuse, en canette." },
  { id: "aerofab_elephanta", n: "AERoFAB Elephanta", prod: "AERoFAB", pays: "Nantes (44)", style: "acide", amer: 1, corps: 1, force: 1, estim: true, ar: ["acidite", "fruits_rouges"], d: "Sour (bière acidulée) aux fruits rouges, en canette." },
  { id: "lab_ouest_coast", n: "LAB Ouest Coast IPA", prod: "Little Atlantique Brewery", pays: "Nantes (44)", style: "ipa", deg: 6.5, amer: 3, corps: 2, force: 2, ar: ["agrumes"], west: true, d: "IPA façon côte Ouest américaine, brassée au bord de la Loire à Chantenay." },
  { id: "nao_west_coast", n: "NAO West Coast IPA (bio)", prod: "Brasserie NAO", pays: "Loire-Atlantique", style: "ipa", amer: 3, corps: 2, force: 2, estim: true, ar: ["agrumes"], west: true, d: "IPA bio : fruits tropicaux, orange, mandarine et notes de pin." },
  // Vendée
  { id: "melusine_hellfest", n: "Hellfest IPA", prod: "Brasserie Mélusine", pays: "Chanverrie (85)", style: "ipa", deg: 6.6, amer: 3, corps: 3, force: 2, ar: ["agrumes", "fruits_doux"], west: true, d: "L'IPA officielle du festival Hellfest (Clisson) : houblon Mosaic, fruits exotiques, sèche, dominée par l'amertume." },
  { id: "melusine_bio", n: "Mélusine Bio (blonde)", prod: "Brasserie Mélusine", pays: "Chanverrie (85)", style: "lager", deg: 5, amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Blonde bio de fermentation haute, simple et désaltérante." },
  { id: "melusine_dame_blanche", n: "La Dame Blanche", prod: "Brasserie Mélusine", pays: "Chanverrie (85)", style: "blanche", deg: 4.2, amer: 1, corps: 1, force: 1, ar: ["agrumes", "epices"], d: "Bière blanche de style belge, légère." },
  { id: "melusine_cervoise", n: "La Cervoise (Mélusine)", prod: "Brasserie Mélusine", pays: "Chanverrie (85)", style: "ambree", deg: 6.5, amer: 1, corps: 2, force: 2, ar: ["caramel", "cereales"], d: "Ambrée (red ale) maltée." },
  { id: "melusine_nonnette", n: "Nonnette", prod: "Brasserie Mélusine", pays: "Chanverrie (85)", style: "stout", deg: 5.6, amer: 1, corps: 2, force: 2, ar: ["torrefie", "caramel"], d: "Porter : notes torréfiées, café et caramel." },
  { id: "melusine_barbe_bleue", n: "Barbe Bleue", prod: "Brasserie Mélusine", pays: "Chanverrie (85)", style: "stout", deg: 7, amer: 2, corps: 3, force: 2, ar: ["torrefie"], d: "Stout impérial : noire, puissante, café et chocolat." },
  // Bretagne
  { id: "lancelot_morgane", n: "Morgane (bio)", prod: "Brasserie Lancelot", pays: "Le Roc-Saint-André (56)", style: "abbaye", deg: 5.5, amer: 1, corps: 2, force: 2, ar: ["cereales", "fruits_doux"], d: "Blonde bio de style belge, amertume fine." },
  { id: "lancelot_telenn_du", n: "Telenn Du (bio)", prod: "Brasserie Lancelot", pays: "Le Roc-Saint-André (56)", style: "brune", deg: 4.5, amer: 1, corps: 1, force: 1, ar: ["cereales", "torrefie"], d: "Brune au blé noir (sarrasin). « Telenn du » signifie « harpe noire » en breton." },
  { id: "lancelot_duchesse_anne", n: "Duchesse Anne", prod: "Brasserie Lancelot", pays: "Le Roc-Saint-André (56)", style: "triple", deg: 7.5, amer: 1, corps: 2, force: 3, ar: ["fruits_doux"], d: "Blonde forte créée en 1996 en hommage à Anne de Bretagne." },
  { id: "lancelot_blanche_hermine", n: "Blanche Hermine", prod: "Brasserie Lancelot", pays: "Le Roc-Saint-André (56)", style: "blanche", deg: 5, amer: 1, corps: 1, force: 1, ar: ["agrumes", "epices"], d: "Bière blanche de style belge, au blé." },
  { id: "coreff_blonde", n: "Coreff Blonde", prod: "Brasserie Coreff", pays: "Carhaix (29)", style: "lager", deg: 4.2, amer: 1, corps: 1, force: 1, ar: ["cereales"], d: "Blonde bretonne légère, de fermentation haute. Coreff (1985) est la plus ancienne brasserie indépendante bretonne." },
  { id: "coreff_ambree", n: "Coreff Ambrée", prod: "Brasserie Coreff", pays: "Carhaix (29)", style: "ambree", deg: 5, amer: 1, corps: 2, force: 1, ar: ["caramel", "fruits_rouges"], d: "Ambrée maltée, notes de caramel et de fruits rouges." },
  { id: "coreff_dramm_hud", n: "Coreff Dramm Hud", prod: "Brasserie Coreff", pays: "Carhaix (29)", style: "ambree", deg: 7.5, amer: 1, corps: 3, force: 3, ar: ["caramel"], d: "Blonde cuivrée forte, de fermentation haute." },
  { id: "coreff_blanche", n: "Coreff Bio Blanche", prod: "Brasserie Coreff", pays: "Carhaix (29)", style: "blanche", deg: 4.5, amer: 1, corps: 1, force: 1, ar: ["agrumes"], d: "Bière blanche bio, légère." },
  { id: "britt_blanche", n: "Britt Blanche", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "blanche", deg: 4.8, amer: 1, corps: 1, force: 1, ar: ["agrumes", "epices"], d: "Blanche bretonne au malt de froment et aux épices." },
  { id: "britt_blonde", n: "Britt Blonde (Melen)", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "lager", deg: 5.5, amer: 1, corps: 1, force: 2, ar: ["cereales"], d: "La blonde qui a fait connaître la brasserie (« melen » veut dire blonde en breton)." },
  { id: "sant_erwann_ipa", n: "Sant Erwann IPA", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "ipa", deg: 7, amer: 3, corps: 2, force: 2, ar: ["agrumes", "epices"], d: "IPA de style belge, bien amère." },
  { id: "sant_erwann_dipa", n: "Sant Erwann Double IPA", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "ipa", deg: 8, amer: 3, corps: 3, force: 3, ar: ["agrumes"], west: true, d: "Double IPA puissante et très amère." },
  { id: "sant_erwann_triple", n: "Sant Erwann Triple", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "triple", deg: 9, amer: 2, corps: 3, force: 3, ar: ["fruits_doux", "epices"], d: "Triple bretonne puissante." },
  { id: "dremmwel_doree", n: "Dremmwel Dorée (bio)", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "triple", deg: 7.7, amer: 1, corps: 2, force: 3, ar: ["fruits_doux"], d: "Blonde forte bio de style belge." },
  { id: "dremmwel_rousse", n: "Dremmwel Rousse (bio)", prod: "Brasserie de Bretagne", pays: "Trégunc (29)", style: "ambree", deg: 6, amer: 1, corps: 2, force: 2, ar: ["caramel", "cereales"], d: "Rousse bio de type bière de garde." }
];
BIERES.push(...BIERES_OUEST.map(b => ({ ...b, ouest: true })));

/* ---------------------------------------------------------------------
   Catalogue des vins (par appellation ou par type : il existe des
   milliers de marques, on note donc des familles de vins)
   --------------------------------------------------------------------- */
const VINS = [
  // Rouges légers
  { id: "beaujolais", n: "Beaujolais", region: "bourgogne", pays: "France", cep: "Gamay", profil: "rouge_leger", sucre: 1, corps: 1, acid: 2, tan: 1, d: "Rouge léger aux fruits rouges croquants (fraise, framboise), se boit un peu frais." },
  { id: "morgon", n: "Morgon (cru du Beaujolais)", region: "bourgogne", pays: "France", cep: "Gamay", profil: "rouge_leger", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Cru du Beaujolais plus charpenté : cerise, kirsch." },
  { id: "bourgogne_pn", n: "Bourgogne rouge (Pinot noir)", region: "bourgogne", pays: "France", cep: "Pinot noir", profil: "rouge_leger", sucre: 1, corps: 1, acid: 2, tan: 1, d: "Pinot noir fin et délicat : cerise, framboise, sous-bois." },
  { id: "saumur_champigny", n: "Saumur-Champigny", region: "loire", pays: "France", cep: "Cabernet franc", profil: "rouge_leger", sucre: 1, corps: 1, acid: 2, tan: 1, d: "Rouge de Loire souple et très fruité." },
  { id: "chinon", n: "Chinon", region: "loire", pays: "France", cep: "Cabernet franc", profil: "rouge_leger", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Rouge de Loire : fruits rouges, notes de violette et de poivron." },
  { id: "bourgueil", n: "Bourgueil", region: "loire", pays: "France", cep: "Cabernet franc", profil: "rouge_leger", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Rouge de Loire aux fruits rouges et noirs, un peu tannique quand il est jeune." },
  { id: "alsace_pn", n: "Pinot noir d'Alsace", region: "alsace", pays: "France", cep: "Pinot noir", profil: "rouge_leger", sucre: 1, corps: 1, acid: 2, tan: 1, d: "Rouge alsacien léger et fruité." },
  { id: "valpolicella", n: "Valpolicella", region: "etranger", pays: "Italie (Vénétie)", cep: "Corvina", profil: "rouge_leger", sucre: 1, corps: 1, acid: 2, tan: 1, d: "Rouge italien léger, notes de cerise." },
  // Rouges corsés
  { id: "medoc", n: "Médoc / Haut-Médoc", region: "bordeaux", pays: "France", cep: "Cabernet sauvignon, merlot", profil: "rouge_corse", sucre: 1, corps: 3, acid: 2, tan: 3, d: "Bordeaux de la rive gauche : cassis, cèdre, tanins fermes ; gagne à vieillir." },
  { id: "saint_emilion", n: "Saint-Émilion", region: "bordeaux", pays: "France", cep: "Merlot surtout", profil: "rouge_corse", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Bordeaux de la rive droite, plus rond : prune, fruits mûrs." },
  { id: "bordeaux_rouge", n: "Bordeaux rouge", region: "bordeaux", pays: "France", cep: "Merlot, cabernets", profil: "rouge_corse", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Rouge du quotidien : fruits noirs, tanins souples à moyens." },
  { id: "cahors", n: "Cahors", region: "sudouest", pays: "France", cep: "Malbec", profil: "rouge_corse", sucre: 1, corps: 3, acid: 2, tan: 3, d: "Le « vin noir » : très foncé, fruits noirs, tanins puissants." },
  { id: "madiran", n: "Madiran", region: "sudouest", pays: "France", cep: "Tannat", profil: "rouge_corse", sucre: 1, corps: 3, acid: 2, tan: 3, d: "Parmi les rouges les plus tanniques de France ; idéal avec une viande grillée." },
  { id: "bandol", n: "Bandol rouge", region: "sud", pays: "France", cep: "Mourvèdre", profil: "rouge_corse", sucre: 1, corps: 3, acid: 2, tan: 3, d: "Rouge provençal puissant : garrigue et fruits noirs." },
  { id: "malbec_arg", n: "Malbec d'Argentine (Mendoza)", region: "etranger", pays: "Argentine", cep: "Malbec", profil: "rouge_corse", sucre: 1, corps: 3, acid: 2, tan: 2, d: "Rouge généreux et velouté, fruits noirs mûrs." },
  { id: "chianti", n: "Chianti", region: "etranger", pays: "Italie (Toscane)", cep: "Sangiovese", profil: "rouge_corse", sucre: 1, corps: 2, acid: 3, tan: 2, d: "Rouge toscan vif : cerise, herbes séchées ; fait pour la cuisine italienne." },
  { id: "rioja", n: "Rioja", region: "etranger", pays: "Espagne", cep: "Tempranillo", profil: "rouge_corse", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Rouge espagnol, souvent élevé en fût : fruits rouges, vanille." },
  { id: "barolo", n: "Barolo", region: "etranger", pays: "Italie (Piémont)", cep: "Nebbiolo", profil: "rouge_corse", sucre: 1, corps: 3, acid: 3, tan: 3, d: "Grand rouge piémontais très tannique, notes de rose et de goudron ; à garder." },
  // Rouges du Rhône et du Sud
  { id: "cdr", n: "Côtes-du-Rhône", region: "rhone", pays: "France", cep: "Grenache, syrah", profil: "rouge_sud", sucre: 1, corps: 2, acid: 1, tan: 2, d: "Rouge chaleureux et fruité : fruits rouges mûrs, épices." },
  { id: "chateauneuf", n: "Châteauneuf-du-Pape", region: "rhone", pays: "France", cep: "Grenache surtout", profil: "rouge_sud", sucre: 1, corps: 3, acid: 1, tan: 2, d: "Grand rouge du Rhône sud : puissant, fruits confits, garrigue." },
  { id: "gigondas", n: "Gigondas", region: "rhone", pays: "France", cep: "Grenache", profil: "rouge_sud", sucre: 1, corps: 3, acid: 1, tan: 3, d: "Rouge du Rhône sud dense et épicé." },
  { id: "crozes", n: "Crozes-Hermitage", region: "rhone", pays: "France", cep: "Syrah", profil: "rouge_sud", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Syrah du Rhône nord : fruits noirs, poivre, violette." },
  { id: "corbieres", n: "Corbières", region: "sud", pays: "France", cep: "Carignan, grenache, syrah", profil: "rouge_sud", sucre: 1, corps: 3, acid: 1, tan: 2, d: "Rouge du Languedoc généreux, garrigue." },
  { id: "pic_saint_loup", n: "Pic Saint-Loup", region: "sud", pays: "France", cep: "Syrah, grenache, mourvèdre", profil: "rouge_sud", sucre: 1, corps: 2, acid: 2, tan: 2, d: "Languedoc plus frais et élégant : fruits noirs, garrigue." },
  { id: "primitivo", n: "Primitivo (Pouilles)", region: "etranger", pays: "Italie (Pouilles)", cep: "Primitivo", profil: "rouge_sud", sucre: 1, corps: 3, acid: 1, tan: 2, d: "Rouge italien très mûr, presque confituré." },
  // Blancs secs et vifs
  { id: "muscadet", n: "Muscadet Sèvre-et-Maine", region: "loire", pays: "France", cep: "Melon de Bourgogne", profil: "blanc_vif", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Le blanc nantais : sec, vif, salin ; le classique avec les fruits de mer." },
  { id: "gros_plant", n: "Gros-Plant du Pays nantais", region: "loire", pays: "France", cep: "Folle blanche", profil: "blanc_vif", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Blanc nantais très sec et acidulé." },
  { id: "sancerre", n: "Sancerre blanc", region: "loire", pays: "France", cep: "Sauvignon blanc", profil: "blanc_vif", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Sauvignon vif : agrumes, notes végétales et minérales." },
  { id: "pouilly_fume", n: "Pouilly-Fumé", region: "loire", pays: "France", cep: "Sauvignon blanc", profil: "blanc_vif", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Voisin du Sancerre, souvent décrit avec une note « fumée » de pierre à fusil." },
  { id: "chablis", n: "Chablis", region: "bourgogne", pays: "France", cep: "Chardonnay", profil: "blanc_vif", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Chardonnay du nord de la Bourgogne, tendu et minéral, souvent sans bois." },
  { id: "picpoul", n: "Picpoul de Pinet", region: "sud", pays: "France", cep: "Picpoul", profil: "blanc_vif", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Blanc du Languedoc vif et iodé, cultivé près de l'étang de Thau." },
  { id: "entre_deux_mers", n: "Entre-deux-Mers", region: "bordeaux", pays: "France", cep: "Sauvignon, sémillon", profil: "blanc_vif", sucre: 1, corps: 1, acid: 2, tan: 0, d: "Blanc bordelais sec, frais et fruité." },
  { id: "gascogne", n: "Côtes de Gascogne blanc", region: "sudouest", pays: "France", cep: "Colombard, ugni blanc, gros manseng", profil: "blanc_vif", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Blanc frais et très fruité (agrumes, fruits exotiques), souvent petit prix." },
  { id: "riesling", n: "Riesling d'Alsace", region: "alsace", pays: "France", cep: "Riesling", profil: "blanc_vif", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Blanc sec et tranchant : citron, notes minérales." },
  { id: "sauvignon_nz", n: "Sauvignon blanc de Nouvelle-Zélande", region: "etranger", pays: "Nouvelle-Zélande", cep: "Sauvignon blanc", profil: "blanc_vif", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Sauvignon très expressif : fruit de la passion, pamplemousse." },
  { id: "albarino", n: "Albariño (Rías Baixas)", region: "etranger", pays: "Espagne (Galice)", cep: "Albariño", profil: "blanc_vif", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Blanc espagnol frais : pêche, agrumes." },
  // Blancs ronds
  { id: "meursault", n: "Meursault", region: "bourgogne", pays: "France", cep: "Chardonnay", profil: "blanc_rond", sucre: 1, corps: 3, acid: 2, tan: 0, d: "Grand blanc de Bourgogne, riche et beurré, souvent élevé en fût." },
  { id: "bourgogne_blanc", n: "Bourgogne blanc (Chardonnay)", region: "bourgogne", pays: "France", cep: "Chardonnay", profil: "blanc_rond", sucre: 1, corps: 2, acid: 2, tan: 0, d: "Chardonnay bourguignon équilibré : fruits blancs, parfois noisette." },
  { id: "macon", n: "Mâcon-Villages", region: "bourgogne", pays: "France", cep: "Chardonnay", profil: "blanc_rond", sucre: 1, corps: 2, acid: 2, tan: 0, d: "Chardonnay du sud de la Bourgogne, rond, fruité et abordable." },
  { id: "pessac_blanc", n: "Pessac-Léognan blanc", region: "bordeaux", pays: "France", cep: "Sauvignon, sémillon", profil: "blanc_rond", sucre: 1, corps: 3, acid: 2, tan: 0, d: "Grand blanc bordelais, souvent élevé en fût : riche et frais à la fois." },
  { id: "cdr_blanc", n: "Côtes-du-Rhône blanc", region: "rhone", pays: "France", cep: "Grenache blanc, viognier…", profil: "blanc_rond", sucre: 1, corps: 2, acid: 1, tan: 0, d: "Blanc du Sud rond et peu acide : fruits jaunes." },
  { id: "chardonnay_cal", n: "Chardonnay de Californie", region: "etranger", pays: "États-Unis", cep: "Chardonnay", profil: "blanc_rond", sucre: 1, corps: 3, acid: 1, tan: 0, d: "Souvent très boisé : vanille, beurre, fruits mûrs." },
  // Blancs aromatiques
  { id: "gewurz", n: "Gewurztraminer", region: "alsace", pays: "France", cep: "Gewurztraminer", profil: "blanc_aroma", sucre: 2, corps: 3, acid: 1, tan: 0, d: "Très parfumé : rose, litchi, épices ; souvent légèrement sucré." },
  { id: "pinot_gris", n: "Pinot gris d'Alsace", region: "alsace", pays: "France", cep: "Pinot gris", profil: "blanc_aroma", sucre: 2, corps: 3, acid: 2, tan: 0, d: "Blanc ample : fruits jaunes, notes fumées, parfois moelleux." },
  { id: "muscat_alsace", n: "Muscat d'Alsace", region: "alsace", pays: "France", cep: "Muscat", profil: "blanc_aroma", sucre: 1, corps: 1, acid: 2, tan: 0, d: "Sec mais très aromatique : on croit croquer du raisin frais." },
  { id: "condrieu", n: "Condrieu", region: "rhone", pays: "France", cep: "Viognier", profil: "blanc_aroma", sucre: 1, corps: 3, acid: 1, tan: 0, d: "Blanc opulent : abricot, pêche, fleurs blanches." },
  { id: "vouvray", n: "Vouvray", region: "loire", pays: "France", cep: "Chenin blanc", profil: "blanc_aroma", sucre: 2, corps: 2, acid: 3, tan: 0, d: "Chenin de Touraine. Existe en sec, demi-sec, moelleux ou pétillant : regardez l'étiquette." },
  // Rosés secs
  { id: "provence", n: "Côtes de Provence rosé", region: "sud", pays: "France", cep: "Grenache, cinsault…", profil: "rose_sec", sucre: 1, corps: 1, acid: 2, tan: 0, d: "Rosé très pâle, sec et léger : l'apéritif d'été." },
  { id: "tavel", n: "Tavel", region: "rhone", pays: "France", cep: "Grenache…", profil: "rose_sec", sucre: 1, corps: 2, acid: 2, tan: 0, d: "Rosé foncé et vineux, qui tient tête à un repas." },
  { id: "rose_loire", n: "Rosé de Loire", region: "loire", pays: "France", cep: "Cabernet franc, gamay…", profil: "rose_sec", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Rosé sec et vif (à ne pas confondre avec le Rosé d'Anjou, plus sucré)." },
  // Rosés tendres
  { id: "rose_anjou", n: "Rosé d'Anjou", region: "loire", pays: "France", cep: "Grolleau…", profil: "rose_doux", sucre: 2, corps: 1, acid: 2, tan: 0, d: "Rosé tendre, légèrement sucré et fruité." },
  { id: "cabernet_anjou", n: "Cabernet d'Anjou", region: "loire", pays: "France", cep: "Cabernet franc, cabernet sauvignon", profil: "rose_doux", sucre: 2, corps: 2, acid: 2, tan: 0, d: "Rosé demi-sec à moelleux, fruits rouges." },
  { id: "white_zin", n: "White Zinfandel", region: "etranger", pays: "États-Unis (Californie)", cep: "Zinfandel", profil: "rose_doux", sucre: 2, corps: 1, acid: 1, tan: 0, d: "Rosé américain sucré et fruité (fraise, bonbon)." },
  // Bulles sèches
  { id: "champagne", n: "Champagne brut", region: "champagne", pays: "France", cep: "Chardonnay, pinot noir, pinot meunier", profil: "bulles_brut", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Bulles fines, notes de brioche et de pomme." },
  { id: "cremant_loire", n: "Crémant de Loire", region: "loire", pays: "France", cep: "Chenin, chardonnay, cabernet franc…", profil: "bulles_brut", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Même méthode de fabrication que le champagne, pour un prix bien plus doux." },
  { id: "cremant_alsace", n: "Crémant d'Alsace", region: "alsace", pays: "France", cep: "Pinot blanc, auxerrois, riesling…", profil: "bulles_brut", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Bulles fraîches et florales, méthode traditionnelle." },
  { id: "cremant_bourgogne", n: "Crémant de Bourgogne", region: "bourgogne", pays: "France", cep: "Chardonnay, pinot noir", profil: "bulles_brut", sucre: 1, corps: 2, acid: 3, tan: 0, d: "Bulles fines, mêmes cépages principaux qu'en Champagne." },
  { id: "cava", n: "Cava", region: "etranger", pays: "Espagne", cep: "Macabeo, xarel·lo, parellada", profil: "bulles_brut", sucre: 1, corps: 1, acid: 3, tan: 0, d: "Bulles espagnoles en méthode traditionnelle, sèches et fraîches." },
  // Bulles douces
  { id: "prosecco", n: "Prosecco", region: "etranger", pays: "Italie (Vénétie)", cep: "Glera", profil: "bulles_douces", sucre: 2, corps: 1, acid: 2, tan: 0, d: "Bulles légères et fruitées (poire, pomme) ; souvent un peu plus sucré qu'un champagne brut." },
  { id: "moscato_asti", n: "Moscato d'Asti", region: "etranger", pays: "Italie (Piémont)", cep: "Muscat blanc", profil: "bulles_douces", sucre: 3, corps: 1, acid: 2, tan: 0, d: "Légèrement pétillant, sucré et peu alcoolisé." },
  { id: "clairette_die", n: "Clairette de Die (Tradition)", region: "rhone", pays: "France", cep: "Muscat, clairette", profil: "bulles_douces", sucre: 3, corps: 1, acid: 2, tan: 0, d: "Bulles sucrées et très fruitées au muscat, peu alcoolisées." },
  { id: "lambrusco", n: "Lambrusco", region: "etranger", pays: "Italie (Émilie-Romagne)", cep: "Lambrusco", profil: "bulles_douces", sucre: 2, corps: 1, acid: 2, tan: 1, d: "Rouge pétillant servi frais ; existe en sec ou en doux (« amabile »)." },
  { id: "champagne_demisec", n: "Champagne demi-sec", region: "champagne", pays: "France", cep: "Chardonnay, pinot noir, pinot meunier", profil: "bulles_douces", sucre: 2, corps: 2, acid: 2, tan: 0, d: "Champagne plus sucré, pensé pour le dessert." },
  // Doux et liquoreux
  { id: "sauternes", n: "Sauternes", region: "bordeaux", pays: "France", cep: "Sémillon, sauvignon", profil: "doux", sucre: 3, corps: 3, acid: 2, tan: 0, d: "Liquoreux célèbre : miel, abricot ; obtenu grâce à la « pourriture noble » du raisin." },
  { id: "monbazillac", n: "Monbazillac", region: "sudouest", pays: "France", cep: "Sémillon, muscadelle, sauvignon", profil: "doux", sucre: 3, corps: 3, acid: 2, tan: 0, d: "Liquoreux de Dordogne, souvent plus abordable que le Sauternes." },
  { id: "jurancon", n: "Jurançon (moelleux)", region: "sudouest", pays: "France", cep: "Petit et gros manseng", profil: "doux", sucre: 3, corps: 2, acid: 3, tan: 0, d: "Moelleux béarnais : fruits exotiques et belle fraîcheur." },
  { id: "layon", n: "Coteaux du Layon", region: "loire", pays: "France", cep: "Chenin blanc", profil: "doux", sucre: 3, corps: 2, acid: 3, tan: 0, d: "Moelleux d'Anjou : coing, miel, fraîcheur du chenin." },
  { id: "muscat_bdv", n: "Muscat de Beaumes-de-Venise", region: "rhone", pays: "France", cep: "Muscat", profil: "doux", sucre: 3, corps: 2, acid: 2, tan: 0, d: "Vin doux naturel au parfum de raisin et de fleurs." },
  { id: "banyuls", n: "Banyuls", region: "sud", pays: "France", cep: "Grenache", profil: "doux", sucre: 3, corps: 3, acid: 1, tan: 1, d: "Vin doux naturel du Roussillon : fruits cuits, cacao ; classique avec le chocolat." },
  { id: "porto", n: "Porto", region: "etranger", pays: "Portugal", cep: "Touriga nacional…", profil: "doux", sucre: 3, corps: 3, acid: 1, tan: 2, d: "Vin muté (on y ajoute de l'eau-de-vie), autour de 20 % : fruits secs, chocolat." },
  { id: "tokaji", n: "Tokaji Aszú", region: "etranger", pays: "Hongrie", cep: "Furmint", profil: "doux", sucre: 3, corps: 3, acid: 3, tan: 0, d: "Liquoreux hongrois historique : miel, abricot, grande fraîcheur." }
];

/* ---------------------------------------------------------------------
   Questionnaire dynamique
   type : "choice" (un choix), "rate" (note 1-3 ou jamais goûté),
          "ratelist" (plusieurs éléments à noter)
   when : condition d'affichage selon les réponses déjà données
   --------------------------------------------------------------------- */
const drinksBeer = a => a.boit === "biere" || a.boit === "both";
const drinksWine = a => a.boit === "vin" || a.boit === "both";
const atLeast = (v, n) => typeof v === "number" && v >= n;

const QUESTIONS = [
  { id: "boit", section: "Pour commencer", type: "choice",
    title: "Qu'est-ce que vous aimez boire ?",
    help: "Le questionnaire s'adapte à votre réponse.",
    options: [ { v: "biere", l: "🍺 De la bière" }, { v: "vin", l: "🍷 Du vin" }, { v: "both", l: "🍺🍷 Les deux" } ] },

  // ---- Bières : les styles
  ...Object.entries(BEER_STYLES).map(([k, s]) => ({
    id: "b_style_" + k, section: "Bières · les styles", type: "rate", when: drinksBeer,
    title: s.label, help: s.help })),

  { id: "b_ipa_type", section: "Bières · les styles", type: "choice",
    when: a => drinksBeer(a) && atLeast(a.b_style_ipa, 2),
    title: "Dans les IPA, vous préférez plutôt…",
    help: "Il existe deux grandes familles d'IPA.",
    options: [
      { v: "west", l: "Très amères et sèches (style « West Coast »)" },
      { v: "hazy", l: "Troubles, juteuses, peu amères (« hazy » ou NEIPA)" },
      { v: "both", l: "Les deux" }, { v: "nsp", l: "Je ne sais pas" } ] },

  { id: "b_fonce", section: "Bières · les styles", type: "choice",
    when: a => drinksBeer(a) && (atLeast(a.b_style_brune, 2) || atLeast(a.b_style_stout, 2)),
    title: "Dans les bières foncées, vous préférez…",
    options: [
      { v: "caramel", l: "Le côté caramel et fruits secs, plutôt doux" },
      { v: "torrefie", l: "Le côté café et chocolat noir, plutôt sec" },
      { v: "both", l: "Les deux" } ] },

  // ---- Bières : les sensations
  { id: "b_amer", section: "Bières · les sensations", type: "choice", when: drinksBeer,
    title: "Quelle amertume aimez-vous ?",
    help: "L'amertume vient du houblon. Une lager est peu amère, une IPA l'est beaucoup.",
    options: [ { v: 1, l: "Faible" }, { v: 2, l: "Moyenne" }, { v: 3, l: "Forte" }, { v: 0, l: "Peu importe" } ] },
  { id: "b_force", section: "Bières · les sensations", type: "choice", when: drinksBeer,
    title: "Quel degré d'alcool préférez-vous ?",
    options: [ { v: 1, l: "Léger (5 % ou moins)" }, { v: 2, l: "Moyen (5 à 7 %)" }, { v: 3, l: "Fort (plus de 7 %)" }, { v: 0, l: "Peu importe" } ] },
  { id: "b_corps", section: "Bières · les sensations", type: "choice", when: drinksBeer,
    title: "Quelle sensation en bouche ?",
    help: "On parle de « corps » : une bière légère est fluide comme de l'eau pétillante, une bière ronde est plus épaisse et nourrissante.",
    options: [ { v: 1, l: "Légère et rafraîchissante" }, { v: 2, l: "Équilibrée" }, { v: 3, l: "Ronde et épaisse" }, { v: 0, l: "Peu importe" } ] },
  { id: "b_aromes", section: "Bières · les arômes", type: "ratelist", when: drinksBeer,
    title: "Notez ces familles d'arômes",
    help: "Touchez « ? » si vous ne savez pas.", items: AROMAS },

  // ---- Vins : les couleurs et familles
  { id: "v_rouge", section: "Vins · les familles", type: "rate", when: drinksWine,
    title: "Le vin rouge", help: "Votre avis général sur les rouges." },
  { id: "v_rouge_leger", section: "Vins · les rouges", type: "rate", when: a => drinksWine(a) && atLeast(a.v_rouge, 2),
    title: WINE_PROFILES.rouge_leger.label, help: WINE_PROFILES.rouge_leger.help },
  { id: "v_rouge_corse", section: "Vins · les rouges", type: "rate", when: a => drinksWine(a) && atLeast(a.v_rouge, 2),
    title: WINE_PROFILES.rouge_corse.label, help: WINE_PROFILES.rouge_corse.help },
  { id: "v_rouge_sud", section: "Vins · les rouges", type: "rate", when: a => drinksWine(a) && atLeast(a.v_rouge, 2),
    title: WINE_PROFILES.rouge_sud.label, help: WINE_PROFILES.rouge_sud.help },

  { id: "v_blanc", section: "Vins · les familles", type: "rate", when: drinksWine,
    title: "Le vin blanc", help: "Votre avis général sur les blancs." },
  { id: "v_blanc_vif", section: "Vins · les blancs", type: "rate", when: a => drinksWine(a) && atLeast(a.v_blanc, 2),
    title: WINE_PROFILES.blanc_vif.label, help: WINE_PROFILES.blanc_vif.help },
  { id: "v_blanc_rond", section: "Vins · les blancs", type: "rate", when: a => drinksWine(a) && atLeast(a.v_blanc, 2),
    title: WINE_PROFILES.blanc_rond.label, help: WINE_PROFILES.blanc_rond.help },
  { id: "v_blanc_aroma", section: "Vins · les blancs", type: "rate", when: a => drinksWine(a) && atLeast(a.v_blanc, 2),
    title: WINE_PROFILES.blanc_aroma.label, help: WINE_PROFILES.blanc_aroma.help },

  { id: "v_rose", section: "Vins · les familles", type: "rate", when: drinksWine,
    title: "Le rosé" },
  { id: "v_rose_type", section: "Vins · les rosés", type: "choice", when: a => drinksWine(a) && atLeast(a.v_rose, 2),
    title: "Votre rosé idéal ?",
    options: [ { v: "rose_sec", l: "Sec et pâle (type Provence)" }, { v: "rose_doux", l: "Tendre, un peu sucré (type Rosé d'Anjou)" }, { v: "both", l: "Les deux" } ] },

  { id: "v_bulles", section: "Vins · les familles", type: "rate", when: drinksWine,
    title: "Les vins à bulles", help: "Champagne, crémant, prosecco…" },
  { id: "v_bulles_type", section: "Vins · les bulles", type: "choice", when: a => drinksWine(a) && atLeast(a.v_bulles, 2),
    title: "Vos bulles, plutôt…",
    options: [ { v: "bulles_brut", l: "Sèches (brut : champagne, crémant)" }, { v: "bulles_douces", l: "Fruitées ou douces (prosecco, moscato)" }, { v: "both", l: "Les deux" } ] },

  { id: "v_doux", section: "Vins · les familles", type: "rate", when: drinksWine,
    title: WINE_PROFILES.doux.label, help: WINE_PROFILES.doux.help },

  // ---- Vins : les sensations
  { id: "v_sucre", section: "Vins · les sensations", type: "choice", when: drinksWine,
    title: "En général, vous préférez les vins…",
    options: [ { v: 1, l: "Secs (pas de sucre perceptible)" }, { v: 2, l: "Légèrement sucrés" }, { v: 3, l: "Doux" }, { v: 0, l: "Peu importe" } ] },
  { id: "v_corps", section: "Vins · les sensations", type: "choice", when: drinksWine,
    title: "Plutôt légers ou puissants ?",
    help: "Un vin léger se boit facilement ; un vin puissant remplit la bouche et réchauffe.",
    options: [ { v: 1, l: "Légers" }, { v: 2, l: "Équilibrés" }, { v: 3, l: "Puissants" }, { v: 0, l: "Peu importe" } ] },
  { id: "v_acid", section: "Vins · les sensations", type: "choice", when: drinksWine,
    title: "Et la fraîcheur (l'acidité) ?",
    help: "Un vin vif fait saliver, un peu comme un citron. Un vin souple est plus doux en bouche.",
    options: [ { v: 3, l: "Vifs, qui font saliver" }, { v: 2, l: "Équilibrés" }, { v: 1, l: "Souples, peu acides" }, { v: 0, l: "Peu importe" } ] },
  { id: "v_regions", section: "Vins · les régions", type: "ratelist", when: drinksWine,
    title: "Notez les régions que vous connaissez",
    help: "Touchez « ? » si vous ne savez pas.", items: REGIONS }
];
