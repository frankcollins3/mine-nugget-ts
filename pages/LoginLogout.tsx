@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,100&display=swap');

.flex {
    display: flex;

}


// * column Flex Classes
.centerYcenterXcolumn {    
    justify-content: center;    // this is the Y-axis for column.
    align-items: center;        // could see this as redundant to type over and over. the alternative could be to have {direcion: row || column} class 
    flex-direction: column;
}
.endYcenterXcolumn {
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
}
// * column Flex Classes


// ? row Flex Classes 
.centerYcenterXrow {
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.centerYbetweenXrow {
    // display: flex;    
    // border: 5px solid hotpink;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
// ? row Flex Classes 


// * element styling (non-layout)
#HelmetCont {
    margin-top: 1.5em;
}
.GoldBar {
    height: 10em;
    width: 10em;
}

.UserText {
    font-family: 'Lemon Milk';
    // font-family: 'Moon Dance';
    font-size: 22px; 
    font-weight: bold;
    color: papayawhip;
}

.MiniGoldBar {    
    height: 50px;
    width: 50px;
    background-image: url('/img/gold.png');    
    background-size: 25%;
    transform: rotate(45deg);
    background-repeat: no-repeat;    
    margin-top: 1.5em;
    cursor: pointer;    
}

#LoginDiv {
    // border: 5px solid hotpink;
    background-image: url('/img/mirror.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 30em;
    width: 30em;
    
}

// #LoginDiv:focus-within {
//     color: orange;
//     border: 5px solid hotpink;
//     .nonpretty()
// }

// .Signup {
//     background: transparent;
//     // border: 5px solid orange;
//     border: 2px solid papayawhip;
//     color: #353935;
//     min-width: 12vw;
// }

// .Signup:focus {
//     color: papayawhip;
//     background-color: papayawhip;
//     outline: ivory;
//     font-family: 'Josefin Sans', sans-serif;
//     font-weight: bold;
//     letter-spacing: 0.125em;
//     border: 3px solid ivory;
// }

// * elements 


// ? components
// * * * * * * * * SignupConstraints
#ConstraintGrid {
    height: 20em;
    width: 20em;
    
    // border: 40px solid solid papayawhip;
    // background-color: ivory;
    // height: 200px;
    // width: 400px;
    
    border: 4px solid #9B111E;
    background-color: #D4E1EC;
    
}

// * * * * * * * *

// ? components
