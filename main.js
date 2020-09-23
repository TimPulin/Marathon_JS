


const firstRow = "мама мыла раму";
const secondRow = "собака друг человека";

getRow();

function getRow(){
    let amountOfA, amountFirstrow, amountSecondrow;

    CountA(firstRow);
    amountFirstrow=amountOfA;
    CountA(secondRow)
    amountSecondrow=amountOfA;

    if (amountFirstrow>amountSecondrow){
       return firstRow;
    }
    else {
       return secondRow;
    }

    function CountA(string) {
       amountOfA=0;
        for(let i=0; i<string.length; i++){
            if(string.charAt(i) === "а"){
                ++amountOfA;
            }
      }
    }
}

console.log(getRow(firstRow, secondRow))
