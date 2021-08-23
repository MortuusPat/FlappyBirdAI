function mutate(x)
{
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
      } else {
        return x;
      }

}


class Bird
{
    constructor(brain)
    {
    this.y = height/2;
    this.x = 64;
    this.r = 12;

    this.gravity = 0.6;
    this.jumpFoce = -15;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    if(brain instanceof NeuralNetwork)
    {
        this.brain = brain.copy(); //copy function is from the matrix libary - It allows us to transfer the brain data (recieved from the constructor) to a new bird generation
        this.brain.mutate(mutate);
    }
    else
    {
        this.brain = new NeuralNetwork(5,8,1); //see paint image called FlabbyBirdNeuralNetwork //NeuralNetwork is nn.js lib class that allows us to easily create a NeuralNetwork.
    }
    
    }

      // Create a copy of this bird
    copy() 
    {
        return new Bird(this.brain);
    }

    offscreen()
    {
        return (this.y > height);
    }

    //Draws the bird
    show()
    {
        stroke(255); // Sets the color used to draw lines and borders around shapes. (p5.js lib)
        fill(255, 100) //Sets the color used to fill shapes (p5.js lib)
        ellipse(this.x, this.y, this.r * 2, this.r * 2); //Draws an oval circle to the screen (x-coord, y-coord, width, height)
    }

    think(pipes)
    {

        //find closet pipe
        let closest = null;
        let closestDistance = Infinity;
        for (let i = 0; i < pipes.length; i++)
        {
            let d = (pipes[i].x + pipes[i].W) - this.x;
            if(d < closestDistance && d > 0) // 0 so that we dont target the pipes behind us
            {
                closest = pipes[i];
                closestDistance = d;
            }
        }


        let inputs = [];
        //We divide the data with height and width to normalize the data ( -1 to 1) 
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.velocity / 10; 

        let output = this.brain.predict(inputs); // the predict method is part of the nn.js lib that allows us use the "brain";
        if (output[0] > 0.5)
        {
            this.up();
        }

        
    }

    update()
    {

        this.score++;

        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;



    

        //if the bird reaches the top
        if(this.y < 0)
        {
            this.y = 0;
            this.velocity = 0;
        }




    }

    

    up()
    {
        this.velocity += this.jumpFoce;
    }

    
}

