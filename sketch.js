let canvas;
let easyCam;
let waifus = [];
let waifucount = 0;
let rendered = false;
let bg;
let groundtexture;



function preload(){
    var fetchInterval = 250; // 5 seconds.
    // Invoke the request every 5 seconds.
    bg = loadImage("original.jpg");
    groundtexture = loadImage("dirt.jpg");
    setInterval(() => fetchStatus(updatearray), fetchInterval);
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // document.oncontextmenu = ()=>false;//uncomment to disable right click menu

    easyCam = createEasyCam();

    //params: gridSize, gridDivisions, gridXOffset, gridYOffset,gridZOffset, axisSize, axesXOff, axesYOff, axesZOff 
    //debugMode(2000, 20, 0, 0, 0, 200, 0, 0, 0);

    let state = {
        distance: 2000,
        center  : [0, 0, 0],
        rotation: [0.9279116079642078, -0.2760465000923418, -0.2415840653641595, 0.06644935631122713]
      };
    easyCam.setState(state, 0); //you can use the second parameter to animate


}

function draw() {
    clear();
    angleMode(DEGREES);


    //set material
    //lights();
    //ambientMaterial();
    //ambientLight(100, 100, 100)
    lights()
    pointLight(255, 255, 255, 0, -100, 0);    
    push();
    rotateX(90);
    specularMaterial(250);
    texture(groundtexture);
    plane(2000, 2000); 
    pop();
    if(waifucount == 100){
        for(let i = 0; i < 10; i++){
            //normalMaterial();
            //blinn_phong_material();
            emissiveMaterial(50, 50, 50, 0.15);
            //ambientMaterial(100);
            //stroke(0);
            //strokeWeight(2);
            translate(0, -50, 0);
            makeLayer(-75, 75, 50, 50, i, waifus);
        }
    }

    //create patter
}


function makeLayer(start, finish, step, height, level, textures){
    let index = 0;
    if(level != 3){
        for (let x = start; x <= finish; x += step) {
            for (let z = start; z <= finish; z += step) {
                    if(!((x > start && z < finish) && (x < finish && z > start))){
                        push();
        
                        let length = 50;//try add frameCount * 5 for animation inside sine
                        
                        translate(x, height/2, z);
                        if(!(textures[level*8+index]===undefined)){
                           texture(textures[level*8+index]);
                           box(length, height, length);
                           index++;
                        }else{
                           console.log(textures.length); 
                           console.log(level*8+index)
                           box(length, height, length);
                           index++;
                        }
                        pop();
        
                    }
                }
            }
        }else{
            for (let x = start; x <= finish; x += step) {
                for (let z = start; z <= finish; z += step) {
                    push();

                    let length = 50;//try add frameCount * 5 for animation inside sine
                    
                    translate(x, height/2, z);
                    if(!(textures[level*8+index]===undefined)){
                        texture(textures[level*8+index]);
                        box(length, height, length);
                        index++;
                    }else{
                        console.log(textures.length); 
                        console.log(level*8+index)
                        box(length, height, length);
                        index++;
                    }
                    index++;
                    pop();
                    rendered = true;
                }
            }
        }
}




function updatearray(url){
    waifus.push(loadImage(url));
}
function fetchStatus(updatearray) {
    const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL
    const params = {
      included_tags: 'maid',
      gif: false,
    };

    const queryParams = new URLSearchParams(params);
    const requestUrl = `${apiUrl}?${queryParams}`;

    if(waifucount < 100){
        fetch(requestUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed with status code: ' + response.status);
          }
        })
        .then(data => {
          // Process the response data as needed
          //console.log(data.images[0].url);
          updatearray(data.images[0].url)
          waifucount++;
        })
        .catch(error => {
          console.error('An error occurred:', error.message);
        });
    }
  }
  
// window.addEventListener('load', function () {
//     // Your document is loaded.
//     var fetchInterval = 250; // 5 seconds.
//     // Invoke the request every 5 seconds.
//     setInterval(() => fetchStatus(updatearray), fetchInterval);
// });

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

