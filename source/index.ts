import { HigherOrLower } from "./HigherOrLower";

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