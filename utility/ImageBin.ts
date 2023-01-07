export default async function Images (img:string|string[]) {
    let barrel = '/img/barrel.png' 
    let barrels = '/img/barrels.png' 
    let barrier = '/img/barrier.png'
    let cactus = '/img/cactus.png'
    let cart = '/img/cart.png'
    let coin = '/img/coin.png'
    let cone_hat = '/img/cone_hat.png'
    let desert = '/img/desert.png'
    let dynamite = '/img/dynamite.png'
    let firetag = '/img/firetag.png'
    let goldbars = '/img/gold-bars.png'
    let gold = '/img/gold.png'
    let helmet = '/img/helmet.png'
    let mine = '/img/mine.png'
    let goldpick = '/img/pick.png'
    let pickaxe = '/img/pickaxe.png'
    let ring = '/img/ring.png'
    let shovel = '/img/shovel.png'
    let trophy = '/img/trophy.png'
    let watch = '/img/watch.png'

    let castmembers:string[] = [
        barrel, barrels, barrier, cactus, cart, coin, cone_hat, desert, dynamite, firetag,
        goldbars, gold, helmet, mine, goldpick, pickaxe, ring, shovel, trophy, watch
    ]

    if (img === 'barrel') return barrel
    if (img === 'barrels') return barrels
    if (img === 'barrier') return barrier
    if (img === 'cactus') return cactus
    if (img === 'cart') return cart
    if (img === 'coin') return coin
    if (img === 'cone_hat') return cone_hat
    if (img === 'desert') return desert
    if (img === 'dynamite') return dynamite
    if (img === 'firetag') return firetag
    if (img === 'gold-bars') return goldbars
    if (img === 'gold') return gold
    if (img === 'helmet') return helmet
    if (img === 'mine') return mine
    if (img === 'goldpick') return goldpick
    if (img === 'pickaxe') return pickaxe
    if (img === 'ring') return ring
    if (img === 'shovel') return shovel
    if (img === 'trophy') return trophy
    if (img === 'watch') return watch

    if (img === 'all') return castmembers
    
    

    

    
    

}
