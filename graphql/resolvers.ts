import axios from 'axios'
import bcrypt from "bcryptjs"
import Redis from 'ioredis'
import passport from "utility/passport"
import { JWTsecretKeyMaker } from 'utility/utilityValues'
import { usernameStrainidINTERFACE, userLoginINTERFACE, updateUserIconINTERFACE } from 'utility/InterfaceTypes'

import fs from 'fs';
import path from 'path';

// import { createClient } from 'redis';


// this has to be NEXT_PUBLIC_REDIS_URL
// password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,

const redis = new Redis({
  host: 'redis-18808.c265.us-east-1-2.ec2.cloud.redislabs.com',
  port: 18808,
  password: 'KYWPyVGWuaAjAFglwtpG2BEx5IiTmFwo',
});

import prisma from "prisma/prismaClient"

// async function connectRedis () {
//   await redis.connect()
// }
// connectRedis()


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
// const myMinersOnStrainsRedisCheck = async (userId:any) => { return redis.get(`myMinersOnStrains${userId}`, (error, myMinersOnStrains) => { return myMinersOnStrains ? myMinersOnStrains : error })}

// MinersOnStrains redis functions

// redis checking functions. if the redis cache is there, don't use prisma to execute DB query, return the cache and spare the need to make prisma/psql perform 

//  npm i redis * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

// const minersRedisCheck = async () => {
//   try {
//     const allUsers:any = await redis.get('miners')
//     return allUsers
//   } 
//   catch(error) {
//     return error
//   } 
// }

// const strainsRedisCheck = async () => {
//   try {
//     const strains:any = await redis.get('strains');
//     return strains
//   }
//   catch(error) {
//     return error
//   }
// }

// const myMinersOnStrainsRedisCheck = async (userId:any) => {
//   try {
//     const myMinersOnStrains:any = await redis.get(`myStrains${userId}`)
//     return myMinersOnStrains
//   }
//   catch(error) {
//     return error
//   }

// }

// const allMinersOnStrainsRedisCheck = async () => {
//   try { 
//     const allMinersOnStrains:any = await redis.get('minersOnStrains')
//     return allMinersOnStrains
//   }
//   catch (error)  {
//     return error
//   }
// }

// const allLikesRedisCheck = async () => {
//   try {
//     const digs:any = await redis.get('digs');
//     return digs;
//   } catch (error) {
//     console.log("error in digs/likes redis check:", error);
//   }
// }

// const myLikesRedisCheck = async (userId:any) => {
//   try  {
//     const myLikes:any = await redis.get(`myDigs${userId}`)
//     return myLikes
//   }
//   catch (error) {
//     return error
//   }
// }

// const allReviewsRedisCheck = async () => {
//   try {
//     const allReviews:any = await redis.get('mines')
//     return allReviews
//   }
//   catch (error) {
//     return error
//   }
// }
// const myMinesRedisCheck = async (userId:any) => {
//   try {
//     const myMines:any = await redis.get(`myMines${userId}`)
//     return myMines
//   }
//   catch (error) {
//     return error
//   }
// }


// ioredis syntax: * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

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

// redis checking functions. if the redis cache is there, don't use prisma to execute DB query, return the cache and spare the need to make prisma/psql perform 


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

const allLikesRedisCheck = async () => {
  return redis.get('digs', (error, digs) => {
    if (error) { 
      console.log("error in digs/likes redis check");
    } else if (digs) {
      return digs
    }
  })
}

const myLikesRedisCheck = async (userId:any) => {
  return redis.get(`myDigs${userId}`, (error, myDigs) => {
    if (error) {
      console.log(`error in redis.get()`, error)
    } else if (myDigs) {
      return myDigs
    }
  })
}

const allReviewsRedisCheck = async () => {
  return redis.get(`mines`, (error, mines) => {
    if (error) {
      console.log('error when going for the all Reviews redis check')
    } else if (mines) {
      return mines
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


// redis checking functions. if the redis cache is there, don't use prisma to execute DB query, return the cache and spare the need to make prisma/psql perform

const updateAllUsersRedis = async () => {
  await redis.del('miners')
  const allUsers = await allminersDB()
  const stringifyUsers = JSON.stringify(allUsers)
  await redis.set('miners', stringifyUsers)
}

const updateAllMinersOnStrainsRedis = async () => {
  await redis.del(`minersOnStrains`)
  const allUserStrains = await allMinersOnStrainsDB()
  const stringifyUserStrains = JSON.stringify(allUserStrains)
  await redis.set(`minersOnStrains`, stringifyUserStrains)
}

const updateAllLikesRedis = async () => {
  await redis.del(`digs`)
  const allLikes = await alldigsDB()
  const stringifyLikes = JSON.stringify(allLikes)
  await redis.set(`digs`, stringifyLikes)
}

const updateMyLikesRedis = async (userId:any) => {
  await redis.del(`myDigs${userId}`)
  const alldigs = await alldigsDB()
  const myDigs = alldigs.filter(likes => likes.userId === userId)
  const stringifyUserLikesStrain = JSON.stringify(myDigs)
  await redis.set(`myDigs${userId}`, stringifyUserLikesStrain)
}

const updateAllReviewsRedis = async () => {
  await redis.del(`mines`)
  const allReviews = await allminesDB()
  const stringifyAllReviews = JSON.stringify(allReviews)
  await redis.set(`mines`, stringifyAllReviews)
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
      console.log('checkStrainsRedis in the server', checkStrainsRedis)
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
    // allStrainsNoRedisGET: [Strains]!
    allStrainsNoRedisGET: async () => {
        try {
          const filePath = path.join(process.cwd(), 'utility/strainJSON.json'); // Construct the correct absolute path
          const rawData = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(rawData);
          const strains = data.strains
          return strains
        } catch (error) {
          console.error('Error reading JSON file:', error);
          return
        }
    },
    allMinersGET: async () => {
      await updateAllUsersRedis()
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
    userLogin: async (_, args:userLoginINTERFACE) => {
    // userLogin: async (parent, args) => {
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
    getUserWithId: async (_, args) => {
      await updateAllUsersRedis()
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

    allMinersOnStrains: async (_, args) => {
      // const updateAllMinersOnStrainsRedis = async () => {
        await updateAllMinersOnStrainsRedis()
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

      await updateMyStrainsRedis(meID)
      // await updateAllMinersOnStrainsRedis()

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

    getAllLikes: async () => { //getAllLikes: async (_, _) => {
      await updateAllLikesRedis()
      const allRedisLikes = await allLikesRedisCheck()
      if (allRedisLikes) {
        return JSON.parse(allRedisLikes)
      } else {
        const allLikes = await alldigsDB()
        const stringifyLikesForRedis = JSON.stringify(allLikes)
        await redis.set('digs', stringifyLikesForRedis)
        return allLikes
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

      getAllReviews: async () =>{
        await updateAllReviewsRedis()
        const allReviewsFromRedis = await allReviewsRedisCheck()
        if (allReviewsFromRedis) {
          const reviewsFromRedis = JSON.parse(allReviewsFromRedis)
          return reviewsFromRedis
        } else {
          const allReviews = await allminesDB()
          const stringifyReviewsForRedis = await JSON.stringify(allReviews)
          await redis.set(`mines`, stringifyReviewsForRedis)
          return allReviews
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

        removeMinersOnStrains: async (_, args:usernameStrainidINTERFACE) => {
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

        updateUserIcon: async (_, args:updateUserIconINTERFACE) => {
          const { username, icon } = args;
            const allusers = await allminersDB()
            const me = allusers.find(user => user.username === username)

            return await prisma.miners.update({
              where: { id: me.id },
              data: { 
                icon: icon       
              }
            }).then( (updatedUser) =>  {
              return updatedUser
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

        addStrainDig: async (_, args) => {
          const { username, strainid, into_it } = args
          const alldigs = await alldigsDB()

          const largestID = alldigs.reduce((maxId, dig) => Math.max(maxId, dig.id), 0);
          const alldigsLength:number = alldigs.length
          console.log('alldigsLength', alldigsLength)

          const allusers = await allminersDB()
          const me = allusers.find(user => user.username === username)
          console.log('me', me)

          const userId = me.id

          console.log('strainid', strainid)
          console.log('into_it', into_it)

          // find the biggest piece of data in the dataset 

          return prisma.digs.create({
            data: {
              id: largestID + 1,
              // id: alldigsLength + 1,
              userId: userId,
              strainid: strainid,
              into_it: into_it 
            }
          }).then(async(newLike) => {
            console.log('newLike serverside', newLike)
          
            await updateMyLikesRedis(userId)
            return newLike
          }).catch( (error:any) => {
            console.log('error', error)
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

process.on('SIGINT', async () => {
  await redis.quit();
  process.exit(0);
});
