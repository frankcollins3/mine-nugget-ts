import axios from 'axios'
import bcrypt from "bcryptjs"

import {strainsINTERFACE} from "utility/InterfaceTypes"

// 

// import { hashPasser, SERIALIZESTRING, PARSESERIALIZEDSTRING } from 'utility/UtilityValues';
// import {JWTsecretKeyMaker} from "utility/UtilityValues"
// import puppeteer from "puppeteer"
// import passport from "../utility/passport"; 
// import jwt from "jsonwebtoken"
// import Redis from 'ioredis'
// import { SettingsInterface, HydroDataInterface } from "utility/interfaceNtypes"

// const redis = new Redis({
//   port: 6379,
//   host: '127.0.0.1'
  // password: NEXT_PUBLIC_APP_REDIS_PASSWORD
// })

import prisma from "prisma/prismaClient"


const allstrainsDB = prisma.strains.findMany
const allminersDB = prisma.miners.findMany
const allMinersOnStrainsDB = prisma.MinersOnStrains.findMany
const alldigsDB = prisma.digs.findMany

export const resolvers = {
    Query: {
    allStrainsGET: async () => { 
      console.log("hey were here in the server")
      const allStrains = await allstrainsDB()
      console.log('allStrains server', allStrains)
      return allStrains
    },    
    allMinersGET: async () => {
        const allMiners = await allminersDB()
        console.log('allMiners', allMiners)
        return allMiners
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
    allMinersOnStrains: async (parent, args) => {      
        const allUserStrains = await allMinersOnStrainsDB()        
        return allUserStrains          
    },

    getMyMinersOnStrains: async (parent, args) => {
      const {username} = args;
      const allminers = await allminersDB()
      const me = allminers.find(user => user.username === username)
      console.log('me in getMyMinersOnStrains', me)
      const meID = me.id

      const allMinersOnStrains = await allMinersOnStrainsDB()
      const myMinersOnStrains = allMinersOnStrains.filter(userStrains => userStrains.minersId === meID)
      console.log('myMinersStrains', myMinersOnStrains)
      if (myMinersOnStrains.length > 0) {
        if (myMinersOnStrains.length === 1) {
          await myMinersOnStrains.push({minersId: 0, strainsid: 0})
          return myMinersOnStrains
        }
        return myMinersOnStrains
      } else {
        return {minersId: 0, strainsid: 0}
      }
    }

    },    // Query:

    Mutation: {
      addMinersOnStrains: async (parent, args) => {
        const { username,  strain } = args        

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
            }
        }).then(async(newUserStrain) => {
          console.log(newUserStrain)
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

      addStrainDig: async (parent, args) => {
        const { userId, strainid, into_it } = args
        const alldigs = await alldigsDB()
        const alldigsLength:number = alldigs.length

        return prisma.digs.create({
          data: {
            id: alldigsLength + 1,
            userId: userId,
            strainid: strainid,
            into_it: into_it 
          }
        }).then(async(newLike) => {
          console.log('newLike serverside', newLike)
        
          return newLike
        }).catch( (error:any) => {
          return error
          // return { userId: 0, strainid: 0, into_it: 0}
        })
      }

  } // end of mutation{} 
}
