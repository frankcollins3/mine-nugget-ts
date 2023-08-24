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
    caution: string;
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
    magnify3: string;
    mine: string;
    mineCart: string;
    mirror: string;
    pick: string;
    pickaxe: string;
    ring: string;
    shovel: string;
    signUpSigns: string;
    vest: string;
    trophy: string;
    unLitPaper: string;
    watch: string;
    goldcursor1: string;
    goldcursor2: string;
    kiss: string;
    luckypull: string;
    yesCursor: string;
    noCursor: string;
        
    // findmine playing gcard game
    king: string;
    queen: string;
    joker: string;
    kingspades: string;
    queenspades: string;
    cards: string;
    blackjack: string;
    navbardice: string;

    wincards: string;
    upsidedowncard: string;
    deckcards: string;
    goldenticket: string;
    winoneheart: string;
    winthreecards: string;
    howmanywinsprofile: string;
    kingqueensplit: string;

    // findmine 
    ilink: string;
    welink: string;

    // trophy room
    trophyroom6333icons: string; // /pages/trophyroom.tsx -> 6333 icons easter egg from flaticon. this img src accompanies that easter egg display to theme it up.
    moviesPopcorn: string;
    redCarpet: string;
    cinemaRopes: string;
    photos: string;
    film: string;
    curtain: string;
    redCarpetHome: string;
    winsCeremony: string;

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
    caution: 'img/caution.png',
    coneHat: 'img/cone_hat.png',
    vest: 'img/vest.png',
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
    magnify3: 'img/magnify3.png',
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
    kiss: `img/kiss.png`,
    luckypull: `img/luckypull.png`,
    yesCursor: `img/yesCursor.png`,
    noCursor: `img/noCursor.png`,

    // findmine playing gcard game
    king: `img/king.png`,
    queen: `img/queen.png`,
    joker: `img/joker.png`,
    kingspades: `img/kingspades.png`,
    queenspades: `img/queenspades.png`,
    cards: `img/cards.png`,
    blackjack: `img/blackjack.png`,
    navbardice: `img/navbardice.png`,
    wincards: `img/wincards.png`,
    upsidedowncard: `img/upsidedowncard.png`,
    deckcards: `img/deckcards.png`,
    goldenticket: `img/goldenticket.png`,
    winoneheart: `img/winoneheart.png`,
    winthreecards: `img/winthreecards.png`,
    howmanywinsprofile: `img/howmanywinsprofile.png`,
    kingqueensplit: `img/kingqueensplit.png`,        

    // findmine 
    ilink: `img/ilink.png`,
    welink: `img/welink.png`,
    
    // trophy room
    trophyroom6333icons: `img/trophyroom6333icons.png`,
    moviesPopcorn: `img/moviesPopcorn.png`,
    redCarpet: `img/red-carpet.png`,
    cinemaRopes: `img/cinemaRopes.png`,
    photos: `img/photos.png`,
    film: `img/film.png`,
    curtain: `img/curtain.png`,
    redCarpetHome: `img/redCarpetHome.png`,
    winsCeremony: `img/winsCeremony.png`,
    
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
    const [caution, setCaution] = useState<string>(`img/caution.png`);
    const [coneHat, setconeHat] = useState<string>(`img/cone_hat.png`);
    const [vest, setVest] = useState<string>(`img/vest.png`);
    const [desert, setdesert] = useState<string>(`img/desert.png`);
    const [dynamite, setdynamite] = useState<string>(`img/dynamite.png`);
    const [edit, setedit] = useState<string>(`img/edit.png`);
    const [eraser, seteraser] = useState<string>(`img/eraser.png`);
    const [firetag, setfiretag] = useState<string>(`img/firetag.png`);
    const [glasses, setglasses] = useState<string>(`img/glasses.png`);
    const [goldBars, setgoldBars] = useState<string>(`img/gold-bars.png`);
    const [gold, setgold] = useState<string>(`img/gold.png`);
    const [goldenTriangle, setgoldenTriangle] = useState<string>(`img/goldentriangle.png`);
    const [helmet, sethelmet] = useState<string>(`img/helmet.png`);
    const [litPaper, setlitPaper] = useState<string>(`img/litpaper.png`);
    const [magnify, setmagnify] = useState<string>(`img/magnify.png`);
    const [magnify2, setmagnify2] = useState<string>(`img/magnify2.png`);
    const [magnify3, setmagnify3] = useState<string>(`img/magnify3.png`);
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
    const [yesCursor, setyesCursor] = useState<string>(`img/yesCursor.png`);
    const [noCursor, setnoCursor] = useState<string>(`img/noCursor.png`);

    // findmine playing card game 
    const [king, setking] = useState<string>(`img/king.png`);
    const [queen, setqueen] = useState<string>(`img/queen.png`);
    const [joker, setjoker] = useState<string>(`img/joker.png`);
    const [kingspades, setkingspades] = useState<string>(`img/kingspades.png`);
    const [queenspades, setqueenspades] = useState<string>(`img/queenspades.png`);
    const [cards, setcards] = useState<string>(`img/cards.png`);
    const [blackjack, setblackjack] = useState<string>(`img/blackjack.png`);
    const [navbardice, setnavbardice] = useState<string>(`img/navbardice.png`);
    const [wincards, setwincards] = useState<string>(`img/wincards.png`);
    const [upsidedowncard, setupsidedowncard] = useState<string>(`img/upsidedowncard.png`);
    const [deckcards, setdeckcards] = useState<string>(`img/deckcards.png`);
    const [goldenticket, setgoldenticket] = useState<string>(`img/goldenticket.png`);
    const [winoneheart, setwinoneheart] = useState<string>(`img/winoneheart.png`);
    const [winthreecards, setwinthreecards] = useState<string>(`img/winthreecards.png`);
    const [kingqueensplit, setkingqueensplit] = useState<string>(`img/kingqueensplit.png`);

    const [howmanywinsprofile, sethowmanywinsprofile] = useState<string>(`img/howmanywinsprofile.png`);
    
    const [ilink, setilink] = useState<string>(`img/ilink.png`);
    const [welink, setwelink] = useState<string>(`img/welink.png`);

    // trophy room extra page 
    const [trophyroom6333icons, settrophyroom6333icons] = useState<string>(`img/trophyroom6333icons.png`);    
    const [moviesPopcorn, setmoviesPopcorn] = useState<string>(`img/moviesPopcorn.png`);    
    const [redCarpet, setredCarpet] = useState<string>(`img/red-carpet.png`);    
    const [cinemaRopes, setcinemaRopes] = useState<string>(`img/cinemaRopes.png`);    
    const [photos, setPhotos] = useState<string>(`img/photos.png`);    
    const [film, setfilm] = useState<string>(`img/film.png`);    
    const [curtain, setcurtain] = useState<string>(`img/curtain.png`);    
    const [redCarpetHome, setredCarpetHome] = useState<string>(`img/redCarpetHome.png`);    
    const [winsCeremony, setwinsCeremony] = useState<string>(`img/winsCeremony.png`);    
        
    const value = {
        barrel, 
        barrels,
        barrier,
        cactus,
        cart,
        coin,
        caution,
        coneHat,
        vest,
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
        magnify3,
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
        luckypull,
        yesCursor,
        noCursor,

        // familytree playing card game
        king,
        queen,
        joker,
        kingspades,
        queenspades,
        cards,
        blackjack,
        navbardice,
        wincards,
        upsidedowncard,
        deckcards,
        goldenticket,
        winoneheart,
        winthreecards,
        howmanywinsprofile,
        kingqueensplit,

        // findmine        
        ilink,
        welink,

        // trophy room
        trophyroom6333icons,
        moviesPopcorn,
        redCarpet,
        cinemaRopes,
        photos,
        film,
        curtain,
        redCarpetHome,
        winsCeremony
    };

    return (
        <>
            <ImgContext.Provider value={value}>
                {children}
            </ImgContext.Provider>
        </>
    );
}
