let img;
let myText;
let randomLineOfText;
let writer;

function preload() {
  myText = loadStrings('allWords.txt');
}

function setup() {
  background(220);
  createCanvas(420, 420);
  randomLineOfText = round(random(0, myText.length));
  console.log(myText[randomLineOfText]);
  // console.log(myText.join(' '));
  // console.log(myText);
  
  //wait 3 minutes to save. Runway should have loaded the image by then
  //   setTimeout(saveAll, 1000*60*3);
//   saveAll();
  show();
  saveAll();
}

function generate() {
  const model = new rw.HostedModel({
    url: "https://attngan-swift.hosted-models.runwayml.cloud/v1/",
    token: "hvQ16i5t5LM7JrM1AGf8+Q==",
  });
  //// You can use the info() method to see what type of input object the model expects
  // model.info().then(info => console.log(info));


  const inputs = {
    "caption": myText[randomLineOfText],

  };
  model.query(inputs).then(outputs => {
    const {
      result
    } = outputs;
    img = createImg(result, myText[randomLineOfText]);
    img.hide();
  });

}

function draw() {
  if (img) {
    imageMode(CENTER);
    image(img, width / 2, height / 2, width, height);
    stroke(12);
  }
}

function saveAll(){
  saveFrames('art-bot', 'jpg', 1, 1);
  writer = createWriter('art-bot.txt');
  writer.write(myText[randomLineOfText]);
  writer.close();
  
}

function show() {
  generate();
}
