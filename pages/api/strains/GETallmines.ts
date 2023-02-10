import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function GETallmines (req, res) {
        console.log('req.body in the GETallmines route!')
        console.log(req.body)

        let allmines = await prisma.mines.findMany() || 'no mines yet';

        res.json( { body: req.body, msg: 'get ALL Mines!', allmines: allmines })
}