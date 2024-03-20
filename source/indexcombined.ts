
//David Schrver (2024)

class HigherOrLower
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
let h1numbers:HTMLElement | null;
let h3score:HTMLElement | null;
let btnhigher:HTMLElement | null;
let btnlower:HTMLElement | null;
let btnreset:HTMLElement | null;
let countdown:number = 0; //When this hits 0 the code within crank fires off.
const countdownMax:number = 12;
let coreGame: HigherOrLower;

function start():void
{
    coreGame = new HigherOrLower();
    h1numbers = document.getElementById("h1numbers");
    btnreset = document.getElementById("btnreset");
    btnhigher = document.getElementById("btnhigher");
    btnlower = document.getElementById("btnlower");
    h3score = document.getElementById("h3score");

    btnhigher?.addEventListener('click', hlbuttonEvents);
    btnlower?.addEventListener('click', hlbuttonEvents);
    btnreset?.addEventListener('click', reset);

    //Start the updater.
    setInterval(crank,100);

    reset();
}

function reset():void
{
    coreGame.reset();
    updateDisplay();
    btnhigher?.removeAttribute("disabled");
    btnlower?.removeAttribute("disabled");
}


//Updates the display for the numbers and the score
function updateDisplay(justscore:boolean = false):void
{
    if (justscore == false)
    {
        //Number and hidden number
        let myNumberstring:string = ((coreGame.GetMyNumber() as unknown) as string);
        setIfNotNull(h1numbers,myNumberstring + "&nbsp;?");
    }

    //The score
    let scorestring:string = ((coreGame.GetScore() as unknown) as string);
    let cpuscorestring:string = ((coreGame.GetCPUScore() as unknown) as string);
    setIfNotNull(h3score,"✔:&nbsp" + scorestring + "&nbsp;✖:&nbsp;" + cpuscorestring);
    
    
}

function hlbuttonEvents(event:MouseEvent):void
{
    
    let hiddenNo:string = ((coreGame.GetHiddenNumber() as unknown) as string);
    let myNo: string = ((coreGame.GetMyNumber() as unknown) as string);
   
    //If it wasn't the "higher" buttin then it must have been the other one 
    let won:boolean = coreGame.guess(event.target === btnhigher);
    setIfNotNull (h3score,won ? "RIGHT":"WRONG")



    setIfNotNull(h1numbers,myNo + "&nbsp;" + hiddenNo);
    //Disable the buttons
    btnhigher?.setAttribute("disabled",'');
    btnlower?.setAttribute("disabled","");
    
    countdown = countdownMax;
}

//Fires about 10 times a second
function crank():void
{
    if (countdown > 0)
    {
        countdown--;

        if (countdown == 0)
        {
            if (coreGame.GetGameOn() == false)
            {
                setIfNotNull(h1numbers,coreGame.won() ? "YOU WIN!":"YOU LOSE!");
                updateDisplay(true);
            }
            else//Game continues
            {
                btnhigher?.removeAttribute("disabled");
                btnlower?.removeAttribute("disabled");
                updateDisplay();
            }
        }
    }
}



//Sets the text of an html ellement
function setIfNotNull (toset:HTMLElement | null,text:string):boolean
{
    if (toset != null)
    {
        toset.innerHTML = text;
        return true;
    }
    return false;
}