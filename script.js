let list = document.querySelector("ul")///////////Pour récupérer le 1er élément de la liste

let listElements = list.querySelectorAll("li")////Pour récupérer tous les éléments de la liste

console.log("La liste", list)/////////////////////Pour afficher le 1er élément de la liste
console.log("Les éléments", listElements)/////////Pour afficher tous les éléments de la liste

listElements.forEach(function (element) {///////////Pour changer la couleur de tous les éléments
    console.dir(element)//////////////////////////Pour connaitre les propriétés d'un élément du DOM
    element.style.color = "red"
})

/*////////////////////////////////JEU DES BOITES////////////////////////////////////////*/

//ETAPE 6.1   Isoler l'algorithme de l'Etape 5 dans une fonction On place celle ci en début de code par convention

function shuffleChildren(parent) {
    let children = parent.children
    let i = children.length, k, temp
    while (--i > 0) {

        k = Math.floor(Math.random() * (i + 1))
        temp = children[k]
        children[k] = children[i]
        parent.appendChild(temp)
    }
}

function showReaction(type, validBox) {
    validBox.classList.add(type)
    if (type !== "success") {
        setTimeout(function () {
            validBox.classList.remove(type)
        }, 800)
    }
}

//ETAPE 1

const box = document.createElement("div")/////////Pour que JavaScript génère une balise Html qui comprendra les boites
//////////////////////////////////////////////////En appelant la méthode createElement() de l'objet document, un nouvel objet 
//////////////////////////////////////////////////HTML Element est instancié, qui sera représenté par la balise spécifiée en argument de cette méthode (ici, "div").

//ETAPE 2

box.classList.add("box")//////////////////////////Ensuite, nous modifions sa propriété classList (contenant la liste des classes CSS attribuées 
//////////////////////////////////////////////////à l'élément) pour lui ajouter la classe .box (appel de la méthode add() de classList)

//////////////////////////////////////////////////A ce moment, un élément du DOM nouveau (<div class="box"></div>) est instancié en mémoire mais non-présent sur la page.
//////////////////////////////////////////////////Il faut, pour cela, lui faire une place dans le DOM Tree.
//////////////////////////////////////////////////Nous allons le placer en enfant de la div#board en utilisant la méthode appendChild()2 de l'objet document 

//ETAPE 3

const board = document.querySelector("#board")

let nb = 1

//board.appendChild(box)////////////////////////////appendChild() est une méthode qui place un élément du DOM à la fin du contenu de l'élément visé. 
////////////////////////////////////////////////////Pour ajouter du contenu au début, on utilisera la méthode prepend()
//box.innerText = 1/////////////////////////////////Pour ajouter un chiffre dans la boite

//Nous effectuons une boucle for, de 1 à 10 (vous pouvez changer ce nombre à votre 
//convenance), pour générer autant de boites à l'écran. La particularité ici est qu'il faille créer 
//une nouvelle variable (let newbox) qui aura pour valeur non pas l'élément box mais une 
//copie, un clone de celui-ci grâce à la méthode cloneNode()

//ETAPE 4

for (let i = 1; i <= 9; i++) {
    const newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(newbox)

    newbox.addEventListener("click", function () {//Pour rendre les boites clickables 
        console.log("Boite n°" + i + ", click !")

        if (i == nb) {
            newbox.classList.add("box-valid")///////////Pour changer la couleur des boite au click
            //A
            if (nb == board.children.length) {
                //alert("VICTOIRE !")
                board.querySelectorAll(".box").forEach(function (box) {
                    showReaction("success", box)
                })
            }                                        //A : si nb est égal au nombre de boites du jeu, c'est que le dernier clic était sur la dernière boite
            nb++                                //////////-> Victoire du joueur Il ne faut pas incrémenter nb avant       
        }   //B                                      //B : si le numéro de la boite est supérieur à nb, c'est que le joueur a cliqué une boite trop élevée
        else if (i > nb) {                      ///////////-> Game Over
            //alert("Erreur, recommencez !")
            showReaction("error", newbox)
            nb = 1
            board.querySelectorAll(".box-valid").forEach(function (validBox) {
                validBox.classList.remove("box-valid")
            })
        }   //C                                      //C : dernière possibilité : le joueur a cliqué sur une boite déjà grisée. On l'informe sans redémarrer le jeu
        else {
            // alert("Case déjà cliquée !")
            showReaction("notice", newbox)
        }

    })

}

//  ETAPE   3.1   Créer un bouton Reset

const box8 = document.createElement("div")

box8.classList.add("button")

const board3 = document.querySelector("#reset")

board3.appendChild(box8)

box8.innerText = "RECOMMANCER"// Pour inscrire du texte dans un noeud

box8.addEventListener("click", function () {
    console.log("Bouton" + "click!")

    location.reload()//Pour reset le jeu

})

//ETAPE 6.2 Matérialiser les fonctions

shuffleChildren(board)


//ETAPE 5

// ///////////////////////////////////////////////////Pour mélanger les boites aléatoirement

// let i = board.children.length, k , temp
// while (--i > 0) {// on boucle tant que 1 oté de i est toujours positif

//     // k stocke un nombre aléatoire basé sur i
//     k = Math.floor(Math.random() * (i+1))

//     // temp pointe temporairement l'élément à la position k dans board
//     temp = board.children[k]

//     // remplace l'élément à la position k par l'élément à la position i
//     board.children[k] = board.children[i]

//     // place l'élément k pointé temporairement à la fin du contenu de board
//     board.appendChild(temp)

// }

//ETAPE 7   Ajouter un écouteur d'évènement pour rendre le jeu jouable dans la boucle avec la méthode "addEventListener"

//ETAPE 8   Prendre en charge les phases du jeu
////////////Déterminer si la boite cliquée comporte le numéro attendu selon que

////////////Le tout premier clic doit se faire sur la boite 1 puis 2, 3,...

//-> Ecrire let nb = 1 en dessous de const board
//-> Ecrire la condition if (i == nb) au dessus de newbox.classList.add("box-valid")
//-> Ecrire nb++ en dessous de newbox.classList.add("box-valid")

//ETAPE 9 Emettre les messages d'erreur, celui de la victoire et le reset du jeu en cas d'erreur

////////////Le prochain sur la boite 2, si le joueur clique de nouveau sur la boite 1, un message apparait.
////////////A contrario, si le joueur clique sur les boites 3, 4 ou 5, le jeu redémarre et un message apparait.

//  ATTENTION si le joueur se trompe et que le jeu redémarre, les boites grisées précédemment restent grisées

// Pour régler le problème ajouter :

// board.querySelectorAll(".box-valid").forEach(function (validBox) {
//    validBox.classList.remove("box-valid")
//}) à la ligne 80

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//AMELIORER LE JEU

//  1   Ajouter des animations dans le CSS

//  2   Utiliser la fonction showReaction dans le JS pour supprimer les boites de dialogue

// Lorsque l'utilisateur provoquera un clic sur une boite, la fonction showReaction() sera
// appelée pour provoquer une réaction visuelle sur cette même boite. Les réactions sont les
// suivantes :

// error : la boite cliquée est invalide (affichage en rouge)
// notice : la boite cliquée l'avait déjà été auparavant (affichage en bleu)
// success : la boite cliquée est valide et était la dernière, la partie est gagnée (affichage en vert)

// La fonction attend deux arguments :
// type (une chaine de caractères) correspondant au type de réaction souhaité
// validBox (HTMLElement) étant la boite sur laquelle l'effet sera appliqué

// La fonction applique donc la classe CSS "type" (error, success ou notice) à la boite passée
// en argument (ligne 30).

//  ->Ecrire la fonction en dessous de la fonction shuffleChildren
//  ->Placer les appels à la fonction dans chaque conditions remplacer alert par showReaction
//  ->Dans le CSS créer les améliorations correspondantes .box.error - .box.success  et .box.notice


////////////////////////////////////////////////A FAIRE/////////////////////////////////////////////////////

//Demander le nombre de boites de départ au joueur (en utilisant prompt())

//Remélanger les boites en cas d'erreur, ainsi le joueur ne pourra plus compter sur sa mémoire visuelle.

//On peut aussi penser à remélanger les boites à chaque clic valide, rendant le jeu plus difficile.

//Incorporer un timer qui prendrait fin à la validation de toutes les boites.
//En imaginant conserver d'une partie à l'autre les meilleurs temps, cela apporterait au jeu un petit côté "high score" intéressant









