
//David Schrver (2024)

export class HigherOrLower
{
    private myNumber:number = 0; //Number shown vs other number
    private hiddenNumber: number = 0;
    private maxNumber:number = 9; //highest and lowest ramdom number
    private minNumber:number = 1;
    private score:number = 0; 
    private cpuscore:number = 0;
    private maxScore:number = 5; //Best 3 out 5 wins
    private guessMade:boolean = false;
    private gameOn:boolean = true;

    constructor()
    {
        this.reset();
    }

    public reset():void
    {
        this.score = this.cpuscore = 0;
        this.guessMade = false;
        this.gameOn = true;
        this.newNumbers();
    }

    //Returns true if made successfully
    public newNumbers():boolean
    {
        //Game over
        if (this.gameOn == true)
        {
            this.myNumber = this.randNo(this.maxNumber,this.minNumber);
            this.hiddenNumber = this.randNo(this.maxNumber,this.minNumber);
            
            //Make sure the numbers don't match
            while (this.hiddenNumber == this.myNumber)
            {
                this.hiddenNumber = this.randNo(this.maxNumber,this.minNumber);
            }

            //No sense contiuning if somebody already has the majority of points to be had
            if (this.score > this.maxScore/2 || this.cpuscore > this.maxScore/2)
            {
                this.gameOn = false;
            }

            return true;
        }

        return false;
    }

    public guess(higher:boolean):boolean
    {
        //Game over?
         if (this.gameOn == false){return false;}

        //they guessed it was higher.
        if (higher == true)
        {
            //Correct guess
            if (this.hiddenNumber > this.myNumber)
            {
                this.score++;
                this.newNumbers();
                return true;
            }//Incorrect guess
            else
            {
                this.cpuscore++
                this.newNumbers();
                return false;
            }
        
        }

        //they guessed it was lower

        //Correct guess
        if (this.hiddenNumber < this.myNumber)
            {
                this.score++;
                this.newNumbers();
                return true;
            }//Incorrect guess
        
            this.cpuscore++
            this.newNumbers();
            return false;


    }

    public randNo (max:number, min:number):number
    {
        return Math.round((Math.random()*(max - min)))+ min;
    }


    public GetMyNumber():number
    {
        return this.myNumber;
    }

    public GetHiddenNumber():number
    {
        return this.hiddenNumber;
    }

    public GetScore():number
    {
        return this.score;
    }

    public GetCPUScore():number
    {
        return this.cpuscore;
    }

    public GetGameOn():boolean
    {
        return this.gameOn;
    }

    //Returns true if they won
    public won():boolean
    {
        if (this.gameOn == true) {return false;}

        return this.score > this.cpuscore
    }

}