let div = document.createElement("div");
let h1 = document.createElement("h1");
let text = document.createTextNode("IT'S WORKING, IT'S WORKING, IT'S WORKING!!!");

h1.prepend(text);
div.prepend(h1);
document.body.prepend(div);




console.log(`Hopefully everything else worked.`)