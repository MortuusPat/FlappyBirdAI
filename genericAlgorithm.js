

function nextGeneration()
{


    calculateFitness();


    for (let i = 0; i < TOTAL; i++)
    {
    birds[i] = pickOne()
    }

    savedBirds = [];
}

//This method picks one of the "smart" birds from the savedBirds array and creates a child with that brain.
//this is an algorithm for choosing a random number and
function pickOne() // Skal se en video på dette alg
{
    var index = 0;
    var r = random(1);

    while (r > 0)
    {
        
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;

    let bird = savedBirds[index];
    let child = bird.copy();
    //let child = new Bird(bird.brain);
    //child.brain.mutate(0.1); //calls a function in bird.js called mutate. Mutate is a nn lib function that maps (Map is a matrix lib function) the weight data.
    return child;

    
}




function calculateFitness()
{
    let sum = 0;
    for (let bird of savedBirds)
    {
        sum += bird.score;
    }

    for (let bird of savedBirds)
    {
        bird.fitness = bird.score / sum; //normalizing all the fitness values
    }
}