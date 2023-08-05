import axios from 'axios'
import bcrypt from "bcryptjs"
import Redis from 'ioredis'
import {strainsINTERFACE} from "utility/InterfaceTypes"
import { jsonSTRINGIFY, jsonPARSE } from 'utility/utilityValues'
// 

// import { hashPasser, SERIALIZESTRING, PARSESERIALIZEDSTRING } from 'utility/UtilityValues';
// import {JWTsecretKeyMaker} from "utility/UtilityValues"
// import puppeteer from "puppeteer"
// import passport from "../utility/passport"; 
// import jwt from "jsonwebtoken"
// import Redis from 'ioredis'
// import { SettingsInterface, HydroDataInterface } from "utility/interfaceNtypes"

const redis = new Redis({
  port: 6379,
  host: '127.0.0.1'
  // password: NEXT_PUBLIC_APP_REDIS_PASSWORD
})

import prisma from "prisma/prismaClient"


const allstrainsDB = prisma.strains.findMany
const allminersDB = prisma.miners.findMany



const strainsRedisCheck = async () => {
  return redis.get("strains", (error, strains) => {
    if (error) return error
    return strains
  })
}


export const resolvers = {
    Query: {
    allStrainsGET: async () => { 
      console.log("hey were here in the server")

      let checkStrainsRedis = await strainsRedisCheck() 
      if (checkStrainsRedis) {
        const redisParseStr = JSON.parse(checkStrainsRedis)
        // const redisParseStr = jsonPARSE(checkStrainsRedis)
        console.log("we are in the redis cache!", redisParseStr)
        return redisParseStr
      } else {
        console.log("no redis cache!")
        const allStrains = await allstrainsDB()  
        const redisStringifyObj = JSON.stringify(allStrains)
        // const redisStringifyObj = jsonSTRINGIFY(allStrains)
        await redis.set("strains", redisStringifyObj)  
        console.log('allStrains server', allStrains)
        return allStrains

      }
    },    
    },  
}

/*
    Mutation: {
//     addUserSettings: async (parent, args) => {
//         const { age, height, weight, start_time, end_time, reminder, activity, users_id } = args;
//         // const { id, age, height, weight, start_time, end_time, reminder, activity, users_id } = args;
//         // check if there are already settings that correspond to user ID
//         let allSettings = await allsettingsDB()
//         let mySettings = allSettings.find(settings => settings.users_id === users_id)
//         // let mySettings = allSettings.filter(settings => settings.users_id === users_id)
        
//         // mySettings = mySettings[0]        
//         if (mySettings) { await deleteSettingsWithId(mySettings.id) } // await prisma.settings.delete({ where: { id: mySettings.id } })
        
//         let allSettingsForLength = await allsettingsDB()
//         let allSettingsLength = allSettingsForLength.length + 1
//         // this works. the above code hasn't been checked yet.
//         return await prisma.settings.create({
//           data: {
//             id: allSettingsLength + 1, 
//             age,
//             height,
//             weight,
//             start_time,
//             end_time,
//             reminder,
//             activity,
//             users_id
//           }
//         }).then(async(addedSettings:SettingsInterface) => {
//           let s = addedSettings

//   return { age: s.age, height: s.height, weight: s.weight, start_time: s.start_time, end_time: s.end_time, reminder: s.reminder, activity: s.activity, users_id: s.users_id }
//         })
//     },
    }
*/
