function Product(name, source) {
  this.label = name;
  this.src = source;
  this.y = 0; // votes
}


var products = new Array();
products.push(new Product("Bag", "bag.jpg"));
products.push(new Product("Banana", "banana.jpg"));
products.push(new Product("Boots", "boots.jpg"));
products.push(new Product("Chair", "chair.jpg"));
products.push(new Product("Cthulhu", "cthulhu.jpg"));
products.push(new Product("Dragon", "dragon.jpg"));
products.push(new Product("Pen", "pen.jpg"));
products.push(new Product("Scissors", "scissors.jpg"));
products.push(new Product("Shark", "shark.jpg"));
products.push(new Product("Sweep", "sweep.jpg"));
products.push(new Product("Unicorn", "unicorn.jpg"));
products.push(new Product("Usb", "usb.jpg"));
products.push(new Product("Water Can", "water_can.jpg"));
products.push(new Product("Wine Glass", "wine_glass.jpg"));


var score = 0;


function showImages() {


    var container = document.getElementById("images-container");
    // TODO: remove old images
    // var oldImages = document.getElementsByTagName("img");
    // console.log(oldImages);
    // for (var i = 0; i < 3; i++) {
    //   container.removeChild(oldImages[i]);
    // }
    // get new images
      container.innerHTML="";
    for (var count = 1; count <= 3; count++) {
      var randomIndex = Math.floor(Math.random() * products.length);
      var image = document.createElement("img");
      image.src = "img/" +products[randomIndex].src;
      container.appendChild(image);


  }
  makeImagesClickable();
}

function makeImagesClickable() {
  var images = document.getElementsByTagName("img");
  for (var index = 0; index < images.length; index++) {
    images[index].addEventListener("click", recordClick);
    if (score === 15) {
      var table = document.getElementById("pictureTable");
      table.innerHTML = "";
      myButton();
      showTable();
      removeImagesClickable();
      showChart();
    }
  }
}

function removeImagesClickable() {
  var images = document.getElementsByTagName("img");
  for (var index = 0; index < images.length; index++) {
    images[index].removeEventListener("click", recordClick, false);

  }
}

function recordClick(event) {
  score++;

  var clickedItem = event.target;
  var itemSource = clickedItem.src;
  var lastSlash = itemSource.lastIndexOf("/") + 1;
  itemSource = itemSource.substring(lastSlash);
  // find matching object
  var foundProduct = products.find(function(product){
    return (product.src == itemSource)

  });

  console.log(itemSource + " was clicked.");
  foundProduct.y++; // add to votes
  console.log("votes: " + foundProduct.y);
  localStorage.setItem(score, JSON.stringify(foundProduct));
  // get new images
  showImages();
}


// window.addEventListener("load", makeImagesClickable);

function myButton() {
  console.log("showing the button");
    if (score <= 15) {
    var button = document.getElementById("buttonpage");
    button.setAttribute("style", "display:inline");
  } else{

  }
    //document.body.appendChild(btn);

  }
  function showTable() {
   var table = document.getElementById("pictureTable");
   var headerRow = document.createElement("tr");
   var headerCell1 = document.createElement("td");
   headerCell1.textContent = "Photos";
   headerRow.appendChild(headerCell1);
   var headerCell2 = document.createElement("td");
   headerCell2.textContent = "Results";
   headerRow.appendChild(headerCell2);
   table.appendChild(headerRow);
   for (i = 0; i < products.length; i++) {
     if (products[i].y >0){
     var row = document.createElement("tr");
     var cell1 = document.createElement("td");
     cell1.textContent = products[i].label;
     row.appendChild(cell1);
     var cell2 = document.createElement("td");
     cell2.textContent = products[i].y;
     row.appendChild(cell2);
     table.appendChild(row);
     table.setAttribute("border", "1");
   }
 }
 }


function showChart() {
  var chart = new CanvasJS.Chart("chartContainer", {
		//theme: "theme2",//theme1
		title:{
			text: "Basic Column Chart - CanvasJS"
		},
		animationEnabled: false,   // change to true
		data: [
		{
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "column",
			dataPoints: products
		}
		]
	});
	chart.render();
}
window.addEventListener("load", showImages);
window.addEventListener("load", showChart);
