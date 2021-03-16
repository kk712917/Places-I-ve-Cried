const key = 'pk.eyJ1Ijoia2F0bWtlbGx5IiwiYSI6ImNrbTJkNG56djFhencydnA0N3RicWRkZHkifQ.SdFPPUkTxjhzA87mxqmeUg';

const options = {
  lat: 39.710910,
  lng: -83.928925,
  zoom: 12,
  style: 'mapbox://styles/katmkelly/ckmb9t1nr2jwb17najfjvvnp9',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  meteorites = loadTable('Meteorite_Landings.csv','csv','header');
  

  img = createImg('https://www.usnews.com/dims4/USNEWS/bb996bf/17177859217/thumbnail/256x256/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F8d%2F8f3c53319d560b2f4139af68c9a77c%2Fcollege-photo_28775.jpg');
  img.hide(); 

  
}


function draw() {
  clear();
  stroke('blue');
  //noFill();
  const zoom = myMap.zoom();
  const xenia = myMap.latLngToPixel(39.710910, -83.928925);
   const yellowSprings = myMap.latLngToPixel(39.8064486,  -83.886874);
  const athens = myMap.latLngToPixel(39.3292,-82.1013);
  
  
  ellipse(xenia.x, xenia.y, 10 * zoom, 10 * zoom);
  ellipse(yellowSprings.x, yellowSprings.y,10 * zoom, 10 * zoom);
    ellipse(athens.x, athens.y, 10 * zoom, 10 * zoom);
  if (dist(xenia.x, xenia.y, mouseX, mouseY) < 100)
  {
 
 textSize(32);
    noFill();
      strokeWeight(2);

    text("this is athens",athens.x,athens.y);
    image(img,athens.x,athens.y,200,200);
     
     fill(0, 100);
  } else {
    fill(255, 100);
  }


  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));
    const pos = myMap.latLngToPixel(latitude, longitude);

    const place = meteorites.getString(i,'name');
    
    let size = meteorites.getString(i, 'mass (g)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    stroke(0);
    ellipse(pos.x, pos.y, size, size);
    
    if(dist(pos.x,pos.y,mouseX,mouseY) < size){
      textSize(32);
      text(place,pos.x,pos.y);
    }
  
  }

}


//resize canvas when the window is resized...
$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});