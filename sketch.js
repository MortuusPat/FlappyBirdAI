const TOTAL = 200;

//variables
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;

function keyPressed() //a p5 lib function
{
    console.log("W");
    if (key === 's')
    {
        console.log("Wha");
        let bird = birds[0];
        //let json = bird.brain.serialize(); //serialize is a function in the nn lib
        
        saveJSON(bird.brain, 'bird.json'); //saveJSON is a p5 lib function that takes an object and serialises it to a string ans saves it in json format
    }
    
}

function setup()
{
    //createCanvas is a p5 lib function that makes it alot easier to create a canvas
    createCanvas(400, 600);
    slider = createSlider(1, 100, 1); // Creates a slider with an interval of 1 to 100, starting on 1. - createSlider is a p5 lib method that allows easy creation of a slider
    for (let i = 0; i < TOTAL; i++)
    {
    birds[i] = new Bird();
    }
    //push is a p5 lib function tha creates and saves the current drawing style settings and transformation. -- In this case we are saving it into an array
    
}

//draw is a p5 lib function that is called every frame capped at 30. It also undoes any previous calls.
function draw()
{

    for (let n = 0; n < slider.value(); n++) //A way to speed up the evolution
    {

        if(counter % 75 == 0)
        {
            pipes.push(new Pipe());
        }
        counter++;

        for (var i = pipes.length - 1; i >= 0; i--)
        {
        
            pipes[i].update();

            // Deletes the bird / while also making a backup to use when reproducing
            for (let j = birds.length - 1; j >= 0; j--)
            {
                if (pipes[i].hits(birds[j]))
                {
                    savedBirds.push(birds.splice(j, 1)[0]); 
                }
            }
        
            //removes the pipes when the leave the screen
            if(pipes[i].offscreen())
            {
                pipes.splice(i, 1); // splice is a p5 lib function that deletes an element from the array
            }
        }

        //Remove the bird if it hits the floor
        for (let i = birds.length - 1; i >= 0; i--)
            {
                if(birds[i].offscreen())
                {
                    savedBirds.push(birds.splice(i, 1)[0]); 
                }
            }


        for (let bird of birds)
        {
            bird.think(pipes);
            bird.update();
        
        }
    
        if (birds.length === 0)
        {
            counter = 0;
            nextGeneration();
            pipes = [];
        
        }
    }   


    //Drawing stuff
    background(0);

    for (let bird of birds)
    {
        bird.show();
    }

    for (let pipe of pipes)
    {
        pipe.show();
    }
    
    
}

