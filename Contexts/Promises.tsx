import axios from 'axios'
import bcrypt from "bcryptjs"
import Redis from 'ioredis'
import passport from "utility/passport"
import { JWTsecretKeyMaker } from 'utility/utilityValues'
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
const allMinersOnStrainsDB = prisma.MinersOnStrains.findMany


// strains redis functions
const strainsRedisCheck = async () => { return redis.get("strains", (error, strains) => { return error ? error : strains }) }
const minersRedisCheck = async () => { return redis.get("miners", (error, miners) => { return miners ? miners : error })}

// MinersOnStrains redis functions
const deleteMinersOnStrainsRedis = async () => { return redis.del("MinersOnStrains") }

const addMinersOnStrainsToRedis = async () => {
  await deleteMinersOnStrainsRedis()
  const allMinersOnStrains = await allMinersOnStrainsDB()
  const stringifyMinersOnStrains = JSON.stringify(allMinersOnStrains)
  await redis.set("MinersOnStrains", stringifyMinersOnStrains)
}


// const strainsRedisCheck = async () => {
//   return redis.get("strains", (error, strains) => {
//     if (error) return error
//     return strains
//   })
// }


export const resolvers = {
    Query: {
    allStrainsGET: async () => { 
      console.log("hey were here in the server")
  // strainRedisCheck is a cb()  ^ ^ that returns error if there is no redis.get("strains") very easy to check in redis-cli. same command: redis.get('strains')
      let checkStrainsRedis = await strainsRedisCheck() 
      // if redis.get('strains') returns string data from the cache then this condition will validate
      if (checkStrainsRedis) {
        // JSON.parse because, like localStorage.setItem(""), the cache needs stringified values. So returning them so they have usable endpoints requires JSON.parse(redisData)
        const redisParseStr = JSON.parse(checkStrainsRedis)
        console.log("we are in the redis cache!", redisParseStr)
  // the condition wrapping these very expressions, again indicates populated redis cache. return the redis cache data which would be identical to prisma.strains.findMany() without query DB x 2
        return redisParseStr
      } else {
  // the else block is run if:  strainsRedisCheck() returns err indicating no cache data from redis.get('strains'). so create cache to satisfy if condition next time & return DB data this time
        console.log("no redis cache!")
        // prisma.strains.findMany() for postgres ----> data.tablestrains
        const allStrains = await allstrainsDB()  
        // stringify the returned DB data so next time the if condition runs, returning cached data, relieving psql & prisma of unneeded work, making the app more performant.
        const redisStringifyObj = JSON.stringify(allStrains)
        //  same statement from redis-cli       set the strains to be equal to the stringified object, again, as would be done for localStorage.setItem('strains', strainString)
        await redis.set("strains", redisStringifyObj)  
        console.log('allStrains server', allStrains)
        // could return the cache data here but returning the DB data since we already used prisma. too late to spare DB & ORM the need to perform. 
        return allStrains
      }
    },    
    allMinersGET: async () => {
      let checkMinersRedis = await minersRedisCheck()
      if (checkMinersRedis) {
        const redisParseStr = JSON.parse(checkMinersRedis)
        // console.log("in the redisParseStr", redisParseStr)
        return redisParseStr
      } else {
        // console.log("we are not in the redis block!!!!")
        const allMiners = await allminersDB()
        const redisStringifyObj = JSON.stringify(allMiners)
        await redis.set("miners", redisStringifyObj)
        return allMiners
      }
    },
    userLogin: async (parent, args) => {
      const { email, password } = args
      let res = {...args}
    // userLogin: async (parent, args, {res}) => {
      try {
        // promise with standard passport.authenticate to hit localDB only. resolve the user or reject with the error
        const user:any = await new Promise((resolve, reject) => {
          passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
              return reject(info ? new Error(info.message) : err);
            }
            console.log('user in the server!!!!', user)
            resolve(user);
          })({ body: { email, password } });
        });

        const SECRET_KEY = await JWTsecretKeyMaker() 
        const token=`weToken${SECRET_KEY}`           
        
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          age: user.age,
          token: token,   
        };
      } catch (error) {
        throw new Error('An error occurred during login. Please try again.');
      }
    },

    getUserWithId: async (parent, args) => {
      const {id} = args
      return prisma.miners.findUnique({
        where: {
            id: id
        }
      }).then( (user) => {
        console.log("getUserWithId", user)
        return user
      }).catch( (err) => {
        throw new Error("An error occurred while retrieving user. Please try again!")
      })
    },

    },  // query bracket end 

    Mutation: {
        addMinersOnStrains: async (parent, args) => {
          const { username,  strain } = args
          // const { minersId, strainsid } = args
          // console.log('minersId server', minersId)
          // console.log('strainsid server', strainsid)

          const allusers = await allminersDB()
          const allstrains = await allstrainsDB()

          const me = allusers.find(user => user.username === username)
          const findStrain = allstrains.find(strains => strains.strain === strain)

          const meID = me.id
          const strainID = findStrain.id

          return prisma.minersOnStrains.create({
              data: {
                minersId: meID,
                strainsid: strainID
                // minersId: 1,
                // strainsid: 1
                
              }
          }).then(async(newUserStrain) => {
            console.log(newUserStrain)
            addMinersOnStrainsToRedis()
            return newUserStrain
          })          
        },
        incrementUserWins: async (parent, args) => {
          const {username} = args;

          const allminers = await allminersDB()
          const me = allminers.find(user => user.username === username)

          console.log('me', me)

          return await prisma.miners.update({
            where: { id: me.id },
            data: { 
              wins: me.wins ? me.wins + 1 : 1              
            }
          }).then( (updatedUser) =>  {
            return updatedUser
          })        
        },


        userSignup: async (parent, args) => {
          const { username, password, email, age } = args;

          const allminers = await allminersDB()
          const length = allminers.length

          const saltRounds = 13
          const tableSalt = bcrypt.genSaltSync(saltRounds)
          const passHasher = bcrypt.hashSync(password, tableSalt)

          return await prisma.miners.create({
            data: {
              id: length + 1,
              username: username,
              password: passHasher,
              email: email,
              age: age,
              wins: 0,
              icon: ''
            }
          }).then(async(u) => {
            return u
          })        
        },
      



    } // mutation bracket end
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
