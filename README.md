// redesign & redeploy:
possibly strains get initialized in the beginning by the mine cart driving into the coins. 
// edge case for <FamilyTree>: pre-established guessing game conditions for when data doesn't load. 
* * * * * * * * * * * * * * * * * * *

# Mine Nugget 🔑
## A fullstack cannabis strain API app themed as a Gold Mine.
Dig through the app with this link 👉 mine-nugget-ts.vercel.app
Mine Nugget is a Single Page Application with: NextJS, TS, GraphQL, @redux/toolkit, Oauth2.0, JWT, and redis-console-cloud caching.

# User Stories with Visuals
// retake signupcapptcha...

// retake logincapptcha...

#### Remember Me() -> an effect that checks for JWT/cookie-userID autofills <MirrorForm> & allows easy login without manually entered credentials
https://github.com/frankcollins3/mine-nugget-ts/assets/73137934/a3bacdec-f381-4fbe-8822-e8c7fbb40fbe

#### /strain.tsx -> Consumes array of straindata.JSON and iterates through obj. endpoints with redux state. Allows user to save associative strain data
https://github.com/frankcollins3/mine-nugget-ts/assets/73137934/d1baa30e-6c41-45ae-b94d-f71fc5871c92

#### Pairents / Luckypull -> Data based guessing game. Data that is kept from /strain.tsx is provided on /familyTree.tsx)
`//  /strain.tsx allows user to see all endpoints besides strain.parents; game is created by providing strain.parents & allowing guess at strain.name`
https://github.com/frankcollins3/mine-nugget-ts/assets/73137934/6f536834-fdbd-4dc8-ab4f-16acfe1b8f98

#### userProfile & simple social media "feed" where user can see other users' data, liked the strains they saved, whether they liked strain or not, and reviews.
https://github.com/frankcollins3/mine-nugget-ts/assets/73137934/6cf03214-54f7-4832-9edf-af7d7642ddd5
`this video also shows the bonus /trophyRoom component that is earned after winning the /familyTree.tsx "Pairents" card game 3x`

#### User Profile Icon Selection: earned by beating the guessing game "Pairents" 1x. User can search or iterate by click through image array served by context
https://github.com/frankcollins3/mine-nugget-ts/assets/73137934/2c2f5807-d3ee-45a0-9ea0-e88603b57999

#### See all app images: at the /Trophyroom.tsx page, earned by beating "Pairents" guess game 3x 
// retake all app images

//

#### Technologies & Frameworks

## Code Snippets


#### updates from the original app:
denormalized strains & effects tables:
1: by using the effects columns in the strains table. 
2: This removes the effects table from existence and makes the effects columns easier to access with simpler queries.








