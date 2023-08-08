import React, { createContext, useContext, ReactNode, useState } from "react";

// type the state which will be read-only 'string'
type imgContextType = {
    // background: string;
    barrel: string;
    barrels: string;
    barrier: string;
    cactus: string;
    cart: string;
    coin: string;
    coneHat: string;
    desert: string;
    dynamite: string;
    edit: string;
    eraser: string;
    firetag: string;
    glasses: string;
    goldBars: string;
    gold: string;
    goldenTriangle: string;
    helmet: string;
    litPaper: string;
    magnify: string;
    magnify2: string;
    mine: string;
    mineCart: string;
    mirror: string;
    pick: string;
    pickaxe: string;
    ring: string;
    shovel: string;
    signUpSigns: string;
    trophy: string;
    unLitPaper: string;
    watch: string;
    goldcursor1: string;
    goldcursor2: string;
    kiss: string;
    luckypull: string;
};

// define values which will remain static
const imgDefaults: imgContextType = {
    // background: 'img/background.png',
    barrel: 'img/barrel.png',
    barrels: 'img/barrels.png',
    barrier: 'img/barrier.png',
    cactus: 'img/cactus.png',
    cart: 'img/cart.png',
    coin: 'img/coin.png',
    coneHat: 'img/cone_hat.png',
    desert: 'img/desert.png',
    dynamite: 'img/dynamite.png',
    edit: 'img/edit.png',
    eraser: 'img/eraser.png',
    firetag: 'img/firetag.png',
    glasses: 'img/glasses.png',
    goldBars: 'img/gold-bars.png',
    gold: 'img/gold.png',
    goldenTriangle: 'img/goldentriangle.png',
    helmet: 'img/helmet.png',
    litPaper: 'img/litPaper.png',
    magnify: 'img/magnify.png',
    magnify2: 'img/magnify2.png',
    mine: 'img/mine.png',
    mineCart: 'img/mineart.png',
    mirror: 'img/mirror.png',
    pick: 'img/pick.png',
    pickaxe: 'img/pickaxe.png',
    ring: 'img/ring.png',
    shovel: 'img/shovel.png',
    signUpSigns: 'img/signupsigns.png',
    trophy: 'img/trophy.png',
    unLitPaper: 'img/unLitPaper.png',
    watch: 'img/watch.png',
    goldcursor1: 'img/goldcursor1.png',
    goldcursor2: 'img/goldcursor2.png',
    kiss: `img/kiss.png`    
    luckypull: `img/luckypull.png`
};

// createContext
const ImgContext = createContext<imgContextType>(imgDefaults);


export function useImage() {
    return useContext(ImgContext);
}

type Props = {
    children: ReactNode;
};

export function ImgProvider({ children }: Props) {    
    const [barrel, setbarrel] = useState<string>(`img/barrel.png`);
    const [barrels, setbarrels] = useState<string>(`img/barrels.png`);
    const [barrier, setbarrier] = useState<string>(`img/barrier.png`);
    const [cactus, setcactus] = useState<string>(`img/cactus.png`);
    const [cart, setcart] = useState<string>(`img/cart.png`);
    const [coin, setcoin] = useState<string>(`img/coin.png`);
    const [coneHat, setconeHat] = useState<string>(`img/cone_hat.png`);
    const [desert, setdesert] = useState<string>(`img/desert.png`);
    const [dynamite, setdynamite] = useState<string>(`img/dynamite.png`);
    const [edit, setedit] = useState<string>(`img/edit.png`);
    const [eraser, seteraser] = useState<string>(`img/eraser.png`);
    const [firetag, setfiretag] = useState<string>(`img/firetag.png`);
    const [glasses, setglasses] = useState<string>(`img/glasses.png`);
    const [goldBars, setgoldBars] = useState<string>(`img/goldBars.png`);
    const [gold, setgold] = useState<string>(`img/gold.png`);
    const [goldenTriangle, setgoldenTriangle] = useState<string>(`img/goldentriangle.png`);
    const [helmet, sethelmet] = useState<string>(`img/helmet.png`);
    const [litPaper, setlitPaper] = useState<string>(`img/litpaper.png`);
    const [magnify, setmagnify] = useState<string>(`img/magnify.png`);
    const [magnify2, setmagnify2] = useState<string>(`img/magnify2.png`);
    const [mine, setmine] = useState<string>(`img/mine.png`);
    const [mineCart, setmineCart] = useState<string>(`img/mineCart.png`);
    const [mirror, setmirror] = useState<string>(`img/mirror.png`);
    const [pick, setpick] = useState<string>(`img/pick.png`);
    const [pickaxe, setpickaxe] = useState<string>(`img/pickaxe.png`);
    const [ring, setring] = useState<string>(`img/ring.png`);
    const [shovel, setshovel] = useState<string>(`img/shovel.png`);
    const [signUpSigns, setsignUpSigns] = useState<string>(`img/signupsigns.png`);
    const [trophy, settrophy] = useState<string>(`img/trophy.png`);
    const [unLitPaper, setunLitPaper] = useState<string>(`img/unLitPaper.png`);
    const [watch, setwatch] = useState<string>(`img/watch.png`);
    const [goldcursor1, setgoldcursor1] = useState<string>(`img/goldcursor1.png`);
    const [goldcursor2, setgoldcursor2] = useState<string>(`img/goldcursor2.png`);
    const [kiss, setKiss] = useState<string>(`img/kiss.png`);
    const [luckypull, setLuckypull] = useState<string>(`img/luckypull.png`);
    
    
        // * user functionality ends above
        
    const value = {
        barrel, 
        barrels,
        barrier,
        cactus,
        cart,
        coin,
        coneHat,
        desert,
        dynamite,
        edit,
        eraser,
        firetag,
        glasses,
        goldBars,
        gold,
        goldenTriangle,
        helmet,
        litPaper,
        magnify,
        magnify2,
        mine,
        mineCart,
        mirror,
        pick,
        pickaxe,
        ring,
        shovel,
        signUpSigns,
        trophy,
        unLitPaper,
        watch,
        goldcursor1,
        goldcursor2,
        kiss,
        luckypull
    };

    return (
        <>
            <ImgContext.Provider value={value}>
                {children}
            </ImgContext.Provider>
        </>
    );
}
