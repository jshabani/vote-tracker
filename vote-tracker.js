var images = ["bag.jpg", "banana.jpg", "boots.jpg","chair.jpg", "cthulhu.jpg", "dragon.jpg", "pen.jpg", "scissors.jpg", "shark.jpg", "sweep.jpg", "unicorn.jpg", "usb.jpg", "water_can.jpg", "wine_glass.jpg"]

function Product(name, source) {
  this.label = name;
  this.src = source;
  this.y = 0; // votes
}

var products = [];

products.push(new Product("Bag", "bag.jpg"));
products.push(new Product("Banana", "banana.jpg"));
products.push(new Product("Boots", "boots.jpg"));
products.push(new Product("Chair", "chair.jpg"));
products.push(new Product("Cthulhu", "cthulhu.jpg"));
products.push(new Product("Dragon", "dragon.jpg"));
products.push(new Product("Scissors", "scissors.jpg"));
products.push(new Product("Shark", "shark.jpg"));
products.push(new Product("Sweep", "sweep.jpg"));
products.push(new Product("Unicorn", "unicorn.jpg"));
products.push(new Product("Usb", "usb.jpg"));
products.push(new Product("Water Can", "water_can.jpg"));
products.push(new Product("Wine Glass", "wine_glass.jpg"));


var count = 0;

function showImages() {
  if (count === 15) {
    myButton();
  } else {
    var container = document.getElementById("images-container");
    // TODO: remove old images
    // var oldImages = document.getElementsByTagName("img");
    // console.log(oldImages);
    // for (var i = 0; i < 3; i++) {
    //   container.removeChild(oldImages[i]);
    // }
    // get new images
    for (var count = 1; count <= 3; count++) {
      var randomIndex = Math.floor(Math.random() * images.length);
      var image = document.createElement("img");
      image.src = "img/" +images[randomIndex];
      container.appendChild(image);
    }
  }
  makeImagesClickable();
}

function makeImagesClickable() {
  var images = document.getElementsByTagName("img");
  for (var index = 0; index < images.length; index++) {
    images[index].addEventListener("click", recordClick);
  }
}

function recordClick(event) {
  var clickedItem = event.target;
  var itemSource = clickedItem.src;
  var lastSlash = itemSource.lastIndexOf("/") + 1;
  itemSource = itemSource.substring(lastSlash);
  // find matching object
  var foundProduct = products.find(function(product){
    return (product.src == itemSource)
  });
  foundProduct.y++; // add to votes
  console.log(itemSource + " was clicked.");
  console.log("votes: " + foundProduct.y);

  // get new images
  showImages();
}

window.addEventListener("load", showImages);
window.addEventListener("load", showChart);
// window.addEventListener("load", makeImagesClickable);

function myButton() {
    var btn = document.createElement("BUTTON");
    document.body.appendChild(btn);
  }

function showChart() {
  var chart = new CanvasJS.Chart("chartContainer", {
		theme: "theme2",//theme1
		title:{
			text: "Basic Column Chart - CanvasJS"
		},
		animationEnabled: false,   // change to true
		data: [
		{
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "column",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		}
		]
	});
	chart.render();
}
