Gold to be Mine. Mine to Be Gold.
( GOING DOWN THE MOUNTAIN TO REDO THIS APP LIKE FILL_CONT with <header> {RenderApp()} </footer> design and GraphQL, redux toolkit instead of just redux, new table format seen at bottom:  }

// coming back to restructure the format: <header> {renderApp()} </footer> as is shown in WAPP/water/app/fill_cont (https://github.com/frankcollins3/fill_container)
// add GraphQL schema && redux and Promises 
// add componenent structure. mine is: /components && /styles -----------> WAPP: /component:  /Component.tsx /component.css|scss  index.js (import Component.tsx) auto loads index.js when imported 

// npm i puppeteer:
1) want this app to dig for data through the web and save strain data from such sites as (leafly.com and friends) Reach out via email or text (possibly Twilio) and ask admin if they want to add to db
2) if data submitted isn't acceptable to submit to postgres DB & puppeteer is found faulty, possible edge case: admin will be able to SMS/email back (through i.e. Twilio) acceptable object data for psql


// nitpickaxe
the reminder page that allows user specification for the application to dig at that user to confirm messages. 

this app can probably use Context instead of grabbing data from github or having fs.json() as a backup to that github data. Every defaultType value would be an object
and instead of a parent container with data spit out from postgres Db there can be a reusable dynamic component that renders its text state (object endpoint from above ^)
Every single component would do the exact same thing separated only by the variable name that governs a specific strains corresponding object endpoint data.  
// used context 2nd time now and start to feel natural I could be wrong that this could replace need for data base.

^ ^ it makes sense too with associative data:
dynamic components will loop over every UserId table and spit out a component with corresponding text state to the `<ObjectContext>` userId === userStrains.Id


wouldn't replace 100% of psql
but Context could replace need for a strains table.
Context: string specified objects exported w/ defined JSON

if (!data) {
<loading/>
}

if data Context.loop

Composition Components could alleviate:
relationship to strains.ID

just be a userStrains table with userId
match userId -> userStrainsId

old way with postgres tables: user, strains, UsersOnStrains
connected to API data from github with fs.json as a backup


new way tables: users userStrains no need for strains
with source of truth as context and composition components doing all of the reusability handling easy as pie

<StrainContext>
  {...previousValues}
  + users: [] // user.id stored for comparison against users table which context wont eliminate unlike table.strains 
  
