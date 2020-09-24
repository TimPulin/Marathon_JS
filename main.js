const firstRow = "мама мыла раму";
const secondRow = "собака друг человека";

function getRow(){
    let amountOfA;

    return (CountA(firstRow) > CountA(secondRow)) ? firstRow : secondRow ;

    function CountA(string) {
        amountOfA = 0;
        for(let i = 0; i<string.length; i++){
            if(string.charAt(i) === "а"){
                ++amountOfA;
            }
        } return amountOfA;
    }
}

console.log(getRow(firstRow, secondRow));
