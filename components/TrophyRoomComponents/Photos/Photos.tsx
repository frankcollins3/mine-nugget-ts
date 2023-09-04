#frameCont {
    min-height: 50vh !important;
    min-width: 50vw !important;
    display: grid;
    grid-area: main; 
    justify-content: center;
    align-items: center;
    // background: url('/img/frame.png') no-repeat center/cover;
    // background-size: cover;
}

#photoFrame {
    height: 600px;
    width: 600px;
    background: url('/img/frame.png') no-repeat center/cover;
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row; 
}

#photoImg {
    height: 200px;
    width: 200px;
}

@media only screen and (max-width: 600px) {
    #photoFrame {
        height: 400px;
        width: 400px;
    }

    // #photoImg { 
    //     height: 
    // }

    #img { height: 100px; width: 100px; }
}

@media only screen and (max-width: 400px) {
    #photoFrame {
        height: 300px;
        width: 300px;
    }
    #img { height: 75px; width: 75px; }
}

@media only screen and (max-width: 400px) {
    #photoFrame {
        height: 200px;
        width: 200px;
    }

    #photoImg {
        height: 125px;
        width: 125px;
    }

    #img { height: 50px; width: 50px; }
}
