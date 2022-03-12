let counterThingy = 0;

function init() {
    counterThingy = localStorage.getItem("Shunger_Counter")
    if(counterThingy==null){
        document.getElementById("counterThingyDisplay").innerHTML = "null";
    }
    else{
    document.getElementById("counterThingyDisplay").innerHTML = counterThingy;
    }
}

function clickyFunction() {
    counterThingy++;
    localStorage.setItem("Shunger_Counter", counterThingy)
    document.getElementById("counterThingyDisplay").innerHTML = counterThingy;
}