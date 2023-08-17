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

const allminesDB = prisma.mines.findMany
const alldigsDB = prisma.digs.findMany

const getUserIdWithUsername = async (username:string) => {
  const allusers = await allminersDB()
  const me = allusers.find(user => user.username === username)
  return me.id
}

const getMyReviews = async(userId:any) => {
  const allReviews = await allminesDB()
  const myReviews = allReviews.filter(reviews => reviews.userId === userId)
  return myReviews
}


// strains redis functions
const strainsRedisCheck = async () => { return redis.get("strains", (error, strains) => { return error ? error : strains }) }
const minersRedisCheck = async () => { return redis.get("miners", (error, miners) => { return miners ? miners : error })}
// const myMinersOnStrainsRedisCheck = async (userId:any) => { return redis.get(`myMinersOnStrains${userId}`, (error, myMinersOnStrains) => { return myMinersOnStrains ? myMinersOnStrains : error })}

// MinersOnStrains redis functions
const deleteMinersOnStrainsRedis = async () => { return redis.del("MinersOnStrains") }

const addMinersOnStrainsToRedis = async () => {
  await deleteMinersOnStrainsRedis()
  const allMinersOnStrains = await allMinersOnStrainsDB()
  const stringifyMinersOnStrains = JSON.stringify(allMinersOnStrains)
  await redis.set("MinersOnStrains", stringifyMinersOnStrains)
}

const myMinersOnStrainsRedisCheck = async (userId:any) => {
  return redis.get(`myStrains${userId}`, (error, myMinersOnStrains) => {
  // const redisCheck = redis.get(`myMinersOnStrains${meID}`, (myMinersOnStrains, error) => {
    if (error) { 
      console.log('error in redis.get()', error)
    } else if (myMinersOnStrains) {
      console.log("myMinersOnStrains in the redis cache!!", myMinersOnStrains)
      return myMinersOnStrains
    }
  })
}

const allMinersOnStrainsRedisCheck = async () => { return redis.get('minersOnStrains', (error, minersOnStrains) => { return error ? error : minersOnStrains} ) }

const myLikesRedisCheck = async (userId:any) => {
  return redis.get(`myDigs${userId}`, (error, myDigs) => {
    if (error) {
      console.log(`error in redis.get()`, error)
    } else if (myDigs) {
      return myDigs
    }
  })
}

const myMinesRedisCheck = async (userId:any) => {
  return redis.get(`myMines${userId}`, (error, myMineReviews) => {
    if (error) {
      console.log('error in myMinesRedis Check')
    } else if (myMineReviews) {
      return myMineReviews
    }
  })
}

const updateAllMinersOnStrainsRedis = async () => {
  await redis.del(`minersOnStrains`)
  const allUserStrains = await allMinersOnStrainsDB()
  const stringifyUserStrains = JSON.stringify(allUserStrains)
  await redis.set(`minersOnStrains`, stringifyUserStrains)
}

const updateMyLikesRedis = async (userId:any) => {
  await redis.del(`myDigs${userId}`)
  const alldigs = await alldigsDB()
  const myDigs = alldigs.filter(likes => likes.userId === userId)
  const stringifyUserLikesStrain = JSON.stringify(myDigs)
  await redis.set(`myDigs${userId}`, stringifyUserLikesStrain)
}

const updateMyReviewsRedis = async (userId:any) => {
  console.log("userId in the redis update!")
  await redis.del(`myMines${userId}`)
  const allmines = await allminesDB()
  const myReviews = allmines.filter(reviews => reviews.userId === userId)
  const stringifyUserMines = JSON.stringify(myReviews)
  await redis.set(`myMines${userId}`, stringifyUserMines)
}

const updateMyStrainsRedis = async (userId:any) => {
  await redis.del(`myStrains${userId}`)
  const allUserStrains = await allMinersOnStrainsDB()
  const myStrains = allUserStrains.filter(userStrains => userStrains.minersId === userId)
  console.log('myStrains in updateMyStrainsRedis', myStrains)
  const stringifyMyStrains = JSON.stringify(myStrains)
  await redis.set(`myStrains${userId}`, stringifyMyStrains)
}


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

    allMinersOnStrains: async (parent, args) => {
        const userStrainsRedisCheck = await allMinersOnStrainsRedisCheck()
        if (userStrainsRedisCheck) {
          let userStrainsFromCache = await JSON.parse(userStrainsRedisCheck)
          console.log("guys were in the redis cache for userstrains", userStrainsFromCache)
          return userStrainsFromCache
        } else {
          console.log("were not in the user cache!")
          const allUserStrains = await allMinersOnStrainsDB()
          const stringifyUserStrainsForRedis = JSON.stringify(allUserStrains)
          await redis.del("minersOnStrains")
          await redis.set("minersOnStrains", stringifyUserStrainsForRedis)
          return allUserStrains          
        }
    },

    getMyMinersOnStrains: async (parent, args) => {
      const {username} = args;
      const allminers = await allminersDB()
      const me = allminers.find(user => user.username === username)
      console.log('me in getMyMinersOnStrains', me)
      const meID = me.id

      // await updateMyStrainsRedis(meID)
      await updateAllMinersOnStrainsRedis()

      let redisCheck = await myMinersOnStrainsRedisCheck(meID)
      if (redisCheck) {
        const myMinersOnStrainsCache = await JSON.parse(redisCheck)
        console.log("we are in the redis cache!", myMinersOnStrainsCache)
        return myMinersOnStrainsCache
      } else {

        const allMinersOnStrains = await allMinersOnStrainsDB()
        const myMinersOnStrains = allMinersOnStrains.filter(userStrains => userStrains.minersId === meID)
        console.log('myMinersStrains we are NOT NOT NOT in the redis cache!!!', myMinersOnStrains)
        if (myMinersOnStrains.length > 0) {
  
          if (myMinersOnStrains.length === 1) {          
            await redis.del(`myMinersOnStrains${meID}`)
            await redis.set(`myMinersOnStrains${meID}`, JSON.stringify(myMinersOnStrains))
            await myMinersOnStrains.push({minersId: 0, strainsid: 0})
            return myMinersOnStrains
          }
          await redis.del(`myMinersOnStrains${meID}`)
          await redis.set(`myMinersOnStrains${meID}`, JSON.stringify(myMinersOnStrains))
  
          return myMinersOnStrains
        } else {
          return {minersId: 0, strainsid: 0}
        }
      }      
    },

    getMyLikes: async (parent, args) => {
      const { username } = args;
      // const myLikesRedisCheck = async (userId:any) => {        
        const allusers = await allminersDB()
        const me = allusers.find(users => users.username === username)
        const meID = me.id
        const myRedisLikes = await myLikesRedisCheck(meID)

        if (myRedisLikes) {
          const likesFromRedis = JSON.parse(myRedisLikes)
          console.log('redis caching likes!', likesFromRedis)
          return likesFromRedis
        } else {
          const allDigs = await alldigsDB()
          const myLikes = allDigs.filter(likes => likes.userId === meID)
          updateMyLikesRedis(meID)
          console.log('NOT DOING THE CACHING!!! myLikes in the server', myLikes)
          return myLikes
        }
      },

      getMyMines: async (_, args) => {
        const { username } = args;
        const allusers = await allminersDB()
        const myid = await getUserIdWithUsername(username)
        const myReviewsFromCache = await myMinesRedisCheck(myid)
        if (myReviewsFromCache) {
          updateMyReviewsRedis(myid)
          const myReviewsFromRedis = JSON.parse(myReviewsFromCache)
          console.log("redis cache for mineReviews", myReviewsFromRedis)
          return myReviewsFromRedis
        } else {
          const allMineReviews =  await allminesDB()
          const myMineReviews = allMineReviews.filter(reviews => reviews.userId === myid)
          console.log("not in cache for reviews", myMineReviews)
          await updateMyReviewsRedis(myid)
          return myMineReviews
        }
      }

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

        removeMinersOnStrains: async (parent, args) => {
          const { username, strainid } = args
          const myid = await getUserIdWithUsername(username)
                                
          await prisma.MinersOnStrains.deleteMany({
            where: { minersId: myid, strainsid: strainid }
          }).then(async(strain) => {
            await updateMyStrainsRedis(myid)
            return { minersId: 777, strainid: 777 }
          }).catch( (error) => {
            return error
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
          const { username, strainid, into_it } = args
          const alldigs = await alldigsDB()
          const alldigsLength:number = alldigs.length

          const allusers = await allminersDB()
          const me = allusers.find(user => user.username === username)
          const userId = me.id

          return prisma.digs.create({
            data: {
              id: alldigsLength + 1,
              userId: userId,
              strainid: strainid,
              into_it: into_it 
            }
          }).then(async(newLike) => {
            console.log('newLike serverside', newLike)
          
            await updateMyLikesRedis(userId)
            return newLike
          }).catch( (error:any) => {
            return error
            // return { userId: 0, strainid: 0, into_it: 0}
          })
        },

        removeStrainDig: async (parent, args) => {
          const { username, strainid } = args;
          const alldigs = await alldigsDB()
          const allusers = await allminersDB()
          const me = allusers.find(user => user.username === username)
          const userId = me.id
          const findLike = alldigs.find(likes => likes.userId === userId && likes.strainid === strainid)
          console.log('findLike in the server', findLike)

          const likeID = findLike.id

          await prisma.digs.delete({
            where: { id: likeID }
          }).then(async(noLike) => {
            await updateMyLikesRedis(userId)
            return { userId: 0, strainid: 0, into_it: false}
          }).catch( (error) => {
            return error
          })
        },

        addMineReview: async (parent, args) => {
          const {username, strainid, title, review} = args      
          const allusers = await allminersDB()
          const allmines = await allminesDB();
          let minesLength = allmines.length
          const myid = await getUserIdWithUsername(username)
          console.log('myid in server', myid)
          
          const checkstrain = allmines.find(reviews => reviews.strainid === strainid && reviews.userId === myid)
          if (checkstrain) {
            console.log("checkstrain from server", checkstrain)
            return prisma.mines.update({
              where: {               
                id: checkstrain.id
              },
              data: {
                title: title,
                review: review,                
              },
            }).then(async(updatedReview) => {
              console.log("were in the update")
              // const updateMyReviewsRedis = async (userId:any) => {
              await updateMyReviewsRedis(myid)               
              return updatedReview
            }).catch( (err) => {
              console.log('err', err)
              return { userId: 0, strainid: 0, title: "update", review: "update"}              
            })
          }

          return prisma.mines.create({
            data: {
              id: minesLength + 1,
              userId: myid,
              strainid: strainid,
              title: `${title}`,
              review: review
            }
          }).then(async(addedReview:any) => {
            await updateMyReviewsRedis(myid)
            let m = addedReview
            return { userId: m.userId, strainid: m.strainid, title: m.title, review: m.review}
            // return addedReview
          }).catch( (err) => {
            console.log('err', err)
            return { userId: 0, strainid: 0, title: "yeah", review: "yeah"}
          })
          // const getUserIdWithUsername = async (username:string) => {
        },

        removeMineReview: async (parent, args) => {
          const { username, strainid } = args
          const myid = await getUserIdWithUsername(username)
          const myReviews = await getMyReviews(myid)
          console.log('myReviews serverside', myReviews)
          const findReview = myReviews.find(mines => mines.strainid === strainid && mines.userId === myid)
          console.log('findReview', findReview)
          await prisma.mines.delete({
            where: { id: findReview.id }
          }).then(async(deleted:any) => {
            await updateMyReviewsRedis(myid)
            return deleted
          })
        }

      



    } // mutation bracket end
}
