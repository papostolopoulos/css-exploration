# CSS-exploration
The goal of this project is to create a tutorial that will teach the readers some basic and more advanced aspects of CSS.

1. We begin with an index page that is completely stripped out of css. Just the basic html
2. We prompt the user to click on the first link from the menu bar and start reading about css.
3. Every chapter has new elements that we try to teach ourselves (and others)
4. As we teach these things through the tutorial, the same page that we have that was fully stripped out starts getting shape because we start implementing the css that we have learned.
5. By the end of this, we could have different aspects that we will have covered, have a good understanding of what we are doing and create a good experience for the user.
6. then we can start exploring more complicated fields like animation, SASS, mobile page interactivity etc

Quote from article: a great tutorial is one that is topical and incremental, teaching in a way that starts with fundamental basics before building up to more advanced topics that require prior knowledge to truly understand.

document.getElementById("testiFrame").contentDocument.body.innerHTML = "<style>h1{color: yellow;font-family: arial;}</style><h1>Look!</h1>";

function getId(id){
  return document.getElementById(id);
}
