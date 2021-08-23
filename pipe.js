
class Pipe
{
    constructor() 
    {

        //space between pipes
        let spacing = 110;
        //center of spacing
        let centery = random(spacing, height - spacing);

        this.top = centery - spacing / 2;
        this.bottom = height - (centery + spacing / 2);
        
        this.x = width;
        this.W = 50;
        this.speed = 5;
        
    }
    //random is a p5 lib function that can either take min and max parameters or choices (An array to choose from). In our case we use choices.
    

    show()
    {
        fill(255);
        if(this.highlight)
        {
            fill(255, 0, 0);
        }
        //rect is a p5 lib function that draws a rectangle to the screen. (x-coord, y-coord, width, height) -- See game folder for image reference
        rect(this.x, 0, this.W, this.top); 
        rect(this.x, height-this.bottom, this.W, this.bottom); 
    }

    update()
    {
        this.x -= this.speed;
    }

    offscreen()
    {
        if(this.x < -this.W)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    hits(bird)
    {
        if((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom))
        {
            if(bird.x > this.x && bird.x < this.x + this.W)
            {
                return true;
            }
            
        }
        else
        {
            this.highlight = false;
            return false;
        }
        
    }

    


}