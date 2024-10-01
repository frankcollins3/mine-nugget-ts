// just had an idea for a program:        
// given:                schema.ts & resolvers.ts           the AI can make queries.ts (basically make params from args)
// possibly uses puppeteeer to scrape that text and to write to the containers.

import { UsersIDnUsernameINTERFACE } from "Interface/InterfaceTypes"


// journall:
// id, username, icon, email, joinday 
export const allUsersGETquery = `query { allUsersGET { 
   id, username, password, email, birthday, joinday, 
   location_id, last_username_change, full_name, icon, cover_photo, gender, orientation,  
   total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
   ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
   sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
   thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
   timestamp, updatedAtBin
}}`

export const allFollowersGETquery = `query { allFollowersGET { id, user_id, follower_id }}`

export const allStarsGETquery = `query { allStarsGET { id, day_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp, updatedAtBin }}`

export const allNotificationsGETquery = `query { allNotificationsGET { 
         notification_json_string,
         from_user_id, for_user_id, from_app, day_id, day_icon, 
         thought_id, moment_id, field_id, invite_id, listener_id, 
         share_id, like_id, star_id, reaction_id, vibe_id,
         payment_id, prank_id, feedgame_id, message_id, 
         report_id, user_pass_lock_id, user_allowed_to_unlock_id,
         user_allowed_to_unlock_id, ballot_id, custom_notification,
         is_read, is_request, type,
         }
      }`

// export const allUsersGETquery = `query { allUsersGET { id, username, icon, email, joinday, has_flagged, flagged_posts, has_reported, reported_posts, location, gender, orientation, ethnicity }}`



export const signupQueryStringFunc = (username: string, password: string, email: string, birthday: string, locale: string) => {
   // id | username | icon | password| email | birthday | has_flagged | flagged_posts | has_reported | reported_posts | location | gender | orientation | ethnicity 
   const query = `mutation {
            userSignup(username: "${username}", password: "${password}", email: "${email}", birthday: "${birthday}", locale: "${locale}") {
               id, username, password, email, birthday, joinday, 
               location_id, last_username_change, full_name, icon, cover_photo, gender, orientation,  
               total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
               ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
               sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
               thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
               timestamp, updatedAtBin
            }
         }`
   // timestamp                       
   return query;
}

export const loginQueryStringFunc = (email: string, password: string) => {
   const query = `query {
            userLogin(email: "${email}", password: "${password}") {
               id, username, password, email, birthday, joinday, location_id, last_username_change, full_name, icon, cover_photo, gender, orientation,
               ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
               total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
               sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
               thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
               timestamp, updatedAtBin
            }
         }`
   // timestamp                       
   return query
}

export const getUserWithIdQueryStringFunc = (id: number) => {
   const query = `query {
            getUserWithId(id: ${id}) {
               id, username, password, email, birthday, joinday, location_id, last_username_change, full_name, icon, cover_photo, gender, orientation,
               ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
               total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
               sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
               thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
               timestamp, updatedAtBin
            }
         }`
   // timestamp                                       
   return query;
}

export const getUserPrivacySettingsWithUserIdQueryStringFunc = (userId: number) => {
   const query = `query {
            getUserPrivacySettingsWithUserId(userId: ${userId}) {
               id, user_id, private_acct,
               share_data, prankable, opt_in_feedgame, opt_in_thoughtblank, opt_in_allours,
               show_history, show_friends, 
               can_msg, anon_msg, can_mention
            }
         }`
   return query;
}

export const doWeFollowEachOtherQueryStringFunc = (meId: number, youId: number) => {
   const query = `query {
            doWeFollowEachOther(meId: ${meId}, youId: ${youId}) {
               iFollowThem, theyFollowMe
            }
         }`
   return query;
}

export const doWeBlockEachOtherQueryStringFunc = (meId: number, youId: number) => {
   const query = `query {
            doWeBlockEachOther(meId: ${meId}, youId: ${youId}) {
               iBlockThem, theyBlockMe
            }
         }`
   return query;
}

export const dayDataQueryStringFunc = (dayId: number) => {
   const query = `query {
            getDayDataWithId(dayId: ${dayId}) {
               title, caption, non_anonymous, thoughts_ok, shareable, downloadable, 
               id, user_id, username, user_profile_icon, location_id, category_id,
               show_views_ok, show_time_ok, public_likes, 
               rlly_like_ok, rlly_like_group,
               is_promo, is_reported, feedface, 
               is_in_trash, trash_tally, date, lock, unlock, sus_content,
               voice_comments_ok, video_comments_ok, commenter_can_determine,
               timestamp, updatedAtBin,

               day_icon, event_id, user_is_verified, location_text
            }
         }`
   // i_can_unlock
   return query
}

export const ALLdayDATAqueryStringFunc = (dayId: number) => {
   const query = `query {
            ALLdayDataWithID(dayId: ${dayId}) {
               title, caption, non_anonymous, thoughts_ok, shareable, downloadable, 
               id, user_id, username, user_profile_icon, location_id, category_id,
               show_views_ok, show_time_ok, public_likes, 
               rlly_like_ok, rlly_like_group,
               is_promo, is_reported, feedface, 
               is_in_trash, trash_tally, date, lock, unlock, sus_content,
               voice_comments_ok, video_comments_ok, commenter_can_determine,
               timestamp, updatedAtBin, 
               
               day_icon, event_id, user_is_verified, location_text
            }
         }`
   // i_can_unlock 
   return query;
}

// JSON.stringify() to return all tables as a stringified value.
export const ALLdayDataStringQueryStringFunc = (dayId: number) => {
   const query = `query {
            ALLdayDataString(dayId: ${dayId})
         }`
   return query;
}

export const dayMomentsQueryStringFunc = (dayId: number) => {
   const query = `query {
            getDayMoments(dayId: ${dayId}) {
               id, day_id, user_id, username, user_profile_icon, 
               media_tags_array, titles_array, captions_array, moment_is_vote_array, part_of_post_icon_array,
               on_profile_array, lock, unlock, timestamp,
            }
         }`
   return query
}

export const dayFieldsQueryStringFunc = (dayId: number) => {
   const query = `query {
            getDayFields(dayId: ${dayId}) {
               id, user_id, day_id, decidedo_id, fields, checkbox, constantsee, users_checkboxes, text,
               decide, do, dream, likeable, thoughts_ok, on_profile, 
               wits_username, wits_ok
            }
         }`
   return query
}

export const dayThoughtsQueryStringFunc = (dayId: number) => {
   // title,
   const query = `query {
            getDayThoughts(dayId: ${dayId}) {
               id, user_id, username, user_profile_icon, day_id, location_id, moment_id,          
               greatfullagain_id, parent_thought_id, sus_content,
               suggestion_id, feedgame_id, meme_id, 
               thought, thoughts, 
               non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
               is_reported, is_in_trash, trash_tally, date, on_profile,
               is_voice, is_video, 
               stars_show_avg, stars_show_users,
               blank_thoughts_ok, blank_thoughts_username,,
               i_can_unlock, u_can_unlock,
               text_comments_ok, voice_comments_ok,

               location_id, location_text, event_id                
            }
         }`
   return query
}

export const dayGreatfullagainQueryStringFunc = (dayId: number) => {
   const query = `query {
            getDayGreatfullagain(dayId: ${dayId}) {
               concern, question, criticism, words, greatfull, zoom_in, zoom_out, lock, unlock      
            }
         }`
   return query
}

export const toggleFieldsCheckboxIndexQuery = (fieldId: number, newCheckboxes: any) => {
   // no :boolean[] because then JSON.stringify doesn't work and graphQL returns a GRAPHQL_PARSE_ERROR // also no :any[]
   newCheckboxes = JSON.stringify(newCheckboxes)
   const query = `query {
            toggleFieldsCheckboxIndex(fieldId: ${fieldId}, newCheckboxes: ${newCheckboxes})
         }`
   return query;
}

export const submitWitsFieldsAfterCopyingFieldsQueryStringFunc = (
   copy_fields_id: number, copy_user_id: number, credit_username: string,
   paste_fields_id: number, paste_user_id: number, field_name_array: string
   // * * * * * * stringify the array like leaderboard and like the other function! not hard now .
) => {
   const query = `mutation {
            submitWitsFieldsAfterCopyingFields(
               copy_fields_id: ${copy_fields_id},
               copy_user_id: ${copy_user_id},
               credit_username: "${credit_username}",
               paste_fields_id: ${paste_fields_id},
               paste_user_id: ${paste_user_id},
               field_name_array: "${field_name_array}",
            )
         }`
   return query;
}


export const userLikesFieldQueryStringFunc = (day_id: number, field_id: number, field_name: string, liked_by_id: number, liked_by_username: string, liked_by_user_profile_icon: string) => {
   const query = `mutation {
            userLikesField(
               day_id: ${day_id},
               field_id: ${field_id},
               field_name: "${field_name}",
               liked_by_id: ${liked_by_id},
               liked_by_username: "${liked_by_username}",
               liked_by_user_profile_icon: "${liked_by_user_profile_icon}",               
            ) {
               day_id, field_id, field_name liked_by_id, liked_by_username, liked_by_user_profile_icon, is_like
            }
         }`
   return query;
}
//    userLikesField(
//       day_id:                                         Int! 
//       field_id:                                       Int! 
//       field_name:                                     String!
//       liked_by_id:                                    Int!
//       liked_by_username:                              String!
//       liked_by_user_profile_icon:                     String!
//   ): [Likes]

export const getAllMyUserDayPostsWithUserIDQueryStringFunc = (userId: number) => {
   const query = `query {
            getAllMyUserDayPostsWithUserID(userId: ${userId}) {
               title, caption, non_anonymous, thoughts_ok, shareable, downloadable, 
               id, user_id, location_id, category_id,
               show_views_ok, show_time_ok, public_likes, 
               rlly_like_ok, rlly_like_group,
               is_reported, feedface, 
               is_in_trash, trash_tally, date, lock, unlock, sus_content          
            }
         }`
   return query;
}

export const getMostRecentDayPostWithUserIdQueryStringFunc = (userId: number) => {
   const query = `query {
            getMostRecentDayPostWithUserId(userId: ${userId})
         }`
   // title, caption, non_anonymous, thoughts_ok, shareable, downloadable, 
   // id, user_id, location_id, category_id,
   // show_views_ok, show_time_ok, public_likes, 
   // rlly_like_ok, rlly_like_group,
   // is_reported, feedface, 
   // is_in_trash, trash_tally, date, lock, unlock, sus_content                   
   return query;
}

// {copyFieldsRewrite} -> scrolling-user posting-users'-post,  copies/updates the scrolling-users's most recent post with the CURRENT_DAY post 
export const copyFieldsOntoNewFieldsQueryStringFunc = async (
   fields: any,
   duplicateFields: any,
   duplicateText: any,
   duplicateConstantsee: any,
   duplicateCheckbox: any,
   duplicateUsersCheckboxes: any,
   currDay: any,
   deletingFieldsId: number,
   currUserRecentPostId: number,
   eventId: number | null,
   scrollingUserId: number,
   postingUserId: number,
   postingUsername: string
) => {
   console.log('fields', fields)
   console.log('duplicateFields', duplicateFields)
   console.log('currDay', currDay)
   console.log('deletingFieldsId', deletingFieldsId)
   console.log('currUserRecentPostId', currUserRecentPostId)
   console.log('eventId', eventId)
   console.log('scrollingUserId', scrollingUserId)
   console.log('postingUserId', postingUserId)


   // Split strings into arrays if they are received as single strings within arrays
   const processedDuplicateFields = Array.isArray(duplicateFields) && typeof duplicateFields[0] === 'string'
      ? duplicateFields[0].split(',').join(" ")
      : duplicateFields;

   console.log('processedDuplicateFields', processedDuplicateFields)

   const processedDuplicateText = Array.isArray(duplicateText) && typeof duplicateText[0] === 'string'
      ? duplicateText[0].split(',')
      : duplicateText;

   const processedDuplicateConstantsee = Array.isArray(duplicateConstantsee) && typeof duplicateConstantsee[0] === 'string'
      ? duplicateConstantsee[0].split(',')
      : duplicateConstantsee;

   const processedDuplicateCheckbox = Array.isArray(duplicateCheckbox) && typeof duplicateCheckbox[0] === 'boolean'
      ? duplicateCheckbox
      : [];

   const processedDuplicateUsersCheckboxes = Array.isArray(duplicateUsersCheckboxes) && typeof duplicateUsersCheckboxes[0] === 'boolean'
      ? duplicateUsersCheckboxes
      : [];


   // checkbox: ${JSON.stringify(fields?.checkbox || [])},
   // users_checkboxes: ${JSON.stringify(fields?.users_checkboxes || [])}
   // { 
   //    id: ${fields.id}, 
   //    user_id: ${fields.user_id}, 
   //    day_id: ${currUserRecentPostId},    
   //    fields: "${fields.fields}", 
   //    constantsee: "${fields.constantsee}", 
   //    event_id: ${eventId || null},
   //    text: "${fields.text || ['no', 'text']}", 
   //    dream: "${fields.dream || 'no dream'}", 
   //    likeable: "${fields.likeable || 'yes'}",
   //    thoughts_ok: "${fields.thoughts_ok || 'yes'}", 
   //    on_profile: "${fields.on_profile || ''}", 
   //    wits_ok: ${fields.wits_ok || true},            
   //    wits_username: "${currDay?.username}",
   //    checkbox: ${JSON.stringify(fields?.checkbox || [])},
   //    users_checkboxes: ${JSON.stringify(fields?.users_checkboxes || [])}
   // },                
   const query = `mutation {   
            copyFieldsOntoNewFields(
                  deletingFieldsId: ${deletingFieldsId},
                  duplicateFields: "${processedDuplicateFields}",
                  duplicateText: "${processedDuplicateText}",
                  duplicateConstantsee: "${processedDuplicateConstantsee}",
                  duplicateCheckbox: [${processedDuplicateCheckbox}],   
                  duplicateUsersCheckboxes: [${processedDuplicateUsersCheckboxes}], 
                  currUserRecentPostId: ${currUserRecentPostId},
                  scrollingUserId: ${scrollingUserId},
                  postingUserId: ${postingUserId},
                  postingUsername: "${postingUsername}"
               )
            }`
   return query;
}
// id, user_id, day_id, decidedo_id, fields, checkbox, constantsee, users_checkboxes, text,
// decide, do, dream, likeable, thoughts_ok, on_profile, 
// wits_username, wits_ok,
// event_id,

export const copyFieldsSaveDraftDayQueryStringFunc = async (userId: number, username: string, fields: any, currDay: any) => {
   // day_id: not shown below because: day_id gets found serverside because it makes the new day as draft post and attaches these fields.
   const { id, user_id, constantsee, text, dream, likeable, thoughts_ok, on_profile, wits_ok, wits_username, checkbox, users_checkboxes } = fields;
   const query = `mutation {
            copyFieldsSaveDraftDay(
               fields: {
                  id: ${id}, 
                  day_id: ${currDay?.id}
                  user_id: ${user_id},
                  fields: "${fields.fields}", 
                  constantsee: "${constantsee}", 
                  text: "${text || ['no', 'text']}", 
                  dream: "${dream || 'no dream'}", 
                  likeable: "${likeable || 'yes'}",
                  thoughts_ok: "${thoughts_ok || 'yes'}", 
                  on_profile: "${on_profile || ''}", 
                  wits_ok: ${wits_ok || true},            
                  wits_username: "${currDay?.username || ''}",
                  checkbox: ${checkbox},
                  users_checkboxes: ${users_checkboxes},
               },
               userId: ${userId}
               username: "${username}"
               )
            }`
   // id, user_id, day_id, decidedo_id, fields, checkbox, constantsee, users_checkboxes, text,
   // decide, do, dream, likeable, thoughts_ok, on_profile, 
   // wits_username, wits_ok, constantsee_starrable, constantsee_show_stars_avg, constantsee_show_stars_users
   return query;
}

export const getDecideDoForFieldsQueryStringFunc = (fieldId: number) => {
   const query = `query {
            getDecideDoForFields(fieldId: ${fieldId}) {
               id, fields_id, decide, doings, did_do_status, did_do_summary, do_different, do_over, timestamp
            }
         }`
   console.log('query', query)
   return query;
}

//  allUserPassDayLocksGETQueryDayLocks queries. when a post has a lock and a user passes it they make it to this table which corresponds to the days.id 
export const allUserPassLocksGETQuery = `query { allUserPassLocksGET { id, unlock_type, day_id, thought_id, user_id, pass_post, pass_thoughts,  pass_moments, pass_fields, pass_greafull, pass_comment_thoughts, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all } }`

export const getAllUserPassLocksForDayIdQueryStringFunc = async (dayId: number) => {
   const query = `query {
               getAllUserPassLocksForDayId(dayId: ${dayId}) {
                  id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
               }
            }`
   return query;
}

export const submitCommentThoughtALLpassCommentThoughtsTrueQueryStringFunc = (day_id: number, thought_id: number) => {
   const query = `mutation {
            submitCommentThoughtALLpassCommentThoughtsTrue(
               day_id: ${day_id},
               thought_id: ${thought_id},
            ) {
               id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
            }
         }`
   return query;
}

export const updateCommentThoughtALLpassCommentThoughtsFalseQueryStringFunc = (day_id: number, thought_id: number) => {
   const query = `mutation {
            updateCommentThoughtALLpassCommentThoughtsFalse(
               day_id: ${day_id},
               thought_id: ${thought_id},
            ) {
               id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
            }
         }`
   return query;
}

export const submitUserPassCustomLocksByTableQueryStringFunc = (day_id:number, userGettingUnlocked:number, userGivingUnlocked:number, tables, unlockType:string) => {
   const query = `mutation {
      submitUserPassCustomLocksByTable(
         day_id: ${day_id},
         userGettingUnlocked: ${userGettingUnlocked},
         userGivingUnlocked: ${userGivingUnlocked},
         tables: "${tables}",
         unlockType: "${unlockType}",
      ) {
         id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
      }
   }`
   console.log('query', query)
   return query;
}

export const submitUserPassLocksByTableAllTrueQueryStringFunc = (day_id, tables, unlockType) => {
   const query = `mutation {
      submitUserPassLocksByTableAllTrue(
         day_id: ${day_id},
         tables: "${tables}",
         unlockType: "${unlockType}",
      ) {
         id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
      }
   }`
   console.log('query', query)
   return query;
}

export const submitUserPassLocksByTableAllFalseQueryStringFunc = (day_id, tables, unlockType) => {
   const query = `mutation {
      submitUserPassLocksByTableAllFalse(
         day_id: ${day_id},
         tables: "${tables}",
         unlockType: "${unlockType}",
      ) {
         id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
      }
   }`
   console.log('query', query)
   return query;
}

export const submitAnyPassLockForPostQueryStringFunc = (
   day_id: number,
   user_id: number | null | undefined,
   unlock_type: string,
   pass_post: boolean | null | undefined,
   pass_post_all: boolean | null | undefined,
   pass_thoughts: boolean | null | undefined,
   pass_thoughts_all: boolean | null | undefined,
   pass_moments: boolean | null | undefined,
   pass_moments_all: boolean | null | undefined,
   pass_fields: boolean | null | undefined,
   pass_fields_all: boolean | null | undefined,
   pass_greatfull: boolean | null | undefined,
   pass_greatfull_all: boolean | null | undefined,
   pass_ballot: boolean | null | undefined,
   pass_ballot_all: boolean | null | undefined,
   // thought_id: number | null | undefined,
   // moment_id: number | null | undefined,
   // field_id: number | null | undefined,
   // greatfull_id: number | null | undefined,
   // ballot_id: number | null | undefined,
) => {
   const query = `mutation {
            submitAnyPassLockForPost(
               day_id: ${day_id},
               user_id: ${user_id},
               unlock_type: "${unlock_type}",
               pass_post: ${pass_post},
               pass_post_all: ${pass_post_all},
               pass_thoughts: ${pass_thoughts},
               pass_thoughts_all: ${pass_thoughts_all},               
               pass_moments: ${pass_moments},
               pass_moments_all: ${pass_moments_all},
               pass_fields: ${pass_fields},
               pass_fields_all: ${pass_fields_all},
               pass_greatfull: ${pass_greatfull},
               pass_greatfull_all: ${pass_greatfull_all},
               pass_ballot: ${pass_ballot},
               pass_ballot_all: ${pass_ballot_all},
               ) {
                  id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
               }
            }`
   // thought_id: ${thought_id},
   // moment_id: ${moment_id},
   // field_id: ${field_id},
   // greatfull_id: ${greatfull_id},
   // ballot_id: ${ballot_id},               
   console.log('query', query)
   return query;
}

export const submitOneThruFiveStarsQueryStringFunc = (day_id: number, posting_user_id: number, scrolling_user_id: number, username: string | null, user_profile_icon: string | null, thought_id: number | null, message_id: number | null, suggestion_id: number | null, stars: number) => {
   const query = `mutation {
            submitOneThruFiveStars(day_id: ${day_id}, scrolling_user_id: ${scrolling_user_id}, posting_user_id: ${posting_user_id}, username: "${username}", user_profile_icon: "${user_profile_icon}", thought_id: ${thought_id}, message_id: ${message_id}, suggestion_id: ${suggestion_id}, stars: ${stars}) {
               id, day_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp, field_id, field_constantsee
            }
         }`
   return query;
}

export const submitFieldConstantseeStarsQueryStringFunc = (
   day_id: number, posting_user_id: number, scrolling_user_id: number, username: string | null, user_profile_icon: string | null,
   field_id: number, field_constantsee: string, stars: number
) => {
   console.log('field_id', field_id)
   const query = `mutation {
            submitOneThruFiveStars(
               day_id: ${day_id}, scrolling_user_id: ${scrolling_user_id}, posting_user_id: ${posting_user_id}, username: "${username}", user_profile_icon: "${user_profile_icon}", 
               field_id: ${field_id}, field_constantsee: "${field_constantsee}" stars: ${stars}
               ) {
               id, day_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp, field_id, field_constantsee
            }
         }`
   return query;
}



export const getDayStarsQueryStringFunc = (dayId: number) => {
   const query = `query {
            getDayStars(dayId: ${dayId}) {
               id, day_id, stars,
               user_id, username, user_profile_icon,
               thought_id, message_id, suggestion_id,
               timestamp, updatedAtBin
            }
         }`
   return query;
}

//          no {thought.thoughts} because those are posting-user's thoughts as content. This query is for thoughts as replies (to content)
export const submitCommentThoughtQueryStringFunc = (
   dayId: number,
   user_id: number,
   username: string,
   event_id: number | null,
   location_text: string | null,
   user_profile_icon: string | null,
   thought: string | null,
   parent_thought_id: number | null,
   comment_icon: string | null,
   greatfullagain_id: number | null,
   moment_id: number | null,
   location_id: number | null,
   thoughts_ok: string | null,
   starrable: string | null,
   stars_show_avg: boolean | null,
   stars_show_users: boolean | null,
   is_voice: boolean | null,
   is_video: boolean | null,
   // 
   voice_comments_path: string | null,
   non_anonymous: string | null,
   commenter_can_determine: boolean,
   voice_comments_ok: boolean,
   text_comments_ok: boolean,
   anonymous_comments_ok: boolean,
   i_can_unlock: boolean | null,
   u_can_unlock: boolean | null,
   lock: string | null,
   unlock: string | null,
   // downloadable: string|null, non_anonymous: 
) => {
   // downloadable: ${downloadable}, 
   // non_anonymous: "${newCommentNonAnonymous}",
   const query = `mutation { submitComment (
               day_id: ${dayId}, 
               user_id: ${user_id}, username: "${username}", 
               user_profile_icon: "${user_profile_icon || ''}",
               thought: "${thought || null}", 
               thoughts_ok: "${thoughts_ok || ''}", 
               starrable: "${starrable || ""}", 
               location_id: ${location_id || null}, 
               location_text: ${location_text || null}, 
               moment_id: ${moment_id || null}, 
               event_id: ${event_id || null},
               greatfullagain_id: ${greatfullagain_id || null}, 
               stars_show_avg: ${stars_show_avg || null}, 
               stars_show_users: ${stars_show_users || null},
               parent_thought_id: ${parent_thought_id}, 
               comment_icon: "${comment_icon || ''}" ,
               is_video: ${is_video || null},
               is_voice: ${is_voice || null},
               
               voice_comments_path: "${voice_comments_path}",
               non_anonymous: "${non_anonymous || 'yes'}",
               commenter_can_determine: ${commenter_can_determine || null},
               voice_comments_ok: ${voice_comments_ok || null},
               text_comments_ok: ${text_comments_ok || null},
               anonymous_comments_ok: ${anonymous_comments_ok || false},
               i_can_unlock: ${i_can_unlock || null},
               u_can_unlock: ${u_can_unlock || null}, 
               lock: "${lock || ''}",
               unlock: "${unlock || ''}" 

               ) { 
                  id, user_id, username, user_profile_icon, user_is_verified, day_id, location_id, moment_id, greatfullagain_id, parent_thought_id, sus_content,
                  suggestion_id, feedgame_id, meme_id, title, thought, thoughts, non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
                  is_reported, is_in_trash, trash_tally, date, on_profile, is_voice, is_video, stars_show_avg, stars_show_users, blank_thoughts_ok, blank_thoughts_username,
                  
                  commenter_can_determine, voice_comment_path, voice_comments_ok, text_comments_ok, i_can_unlock, u_can_unlock,
                  lock, unlock
               } }`

   // no voice com
   // voice_comment_path: ${voice_comment_path || null},
   return query;
}

export const deleteCommentQueryStringFunc = (
   day_id: number, thought_id: number, is_voice: boolean | null, voice_comment_path: string | null
) => {
   const customVoiceCommentPathVal = voice_comment_path === null ? 'null' : `"${voice_comment_path}"`;

   console.log('thought_id construction', thought_id)

   const query = `mutation {
            deleteComment(
               day_id: ${day_id},
               thought_id: ${thought_id},
               is_voice: ${is_voice},
               voice_comment_path: ${customVoiceCommentPathVal}
            )
         }`
   return query;
   // stringified to send BLOB status back as an object!:
   // id, user_id, username, user_profile_icon, user_is_verified, day_id, location_id, moment_id, greatfullagain_id, parent_thought_id, sus_content,
   //    suggestion_id, feedgame_id, meme_id, title, thought, thoughts, non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
   //    is_reported, is_in_trash, trash_tally, date, on_profile, is_voice, is_video, stars_show_avg, stars_show_users, blank_thoughts_ok, blank_thoughts_username,

   //    commenter_can_determine, voice_comment_path, voice_comments_ok, text_comments_ok, i_can_unlock, u_can_unlock,
   //    lock, unlock
}

export const submitUserPassCommentLockQueryStringFunc = (user_id: number, day_id: number, thought_id: number) => {
   // * * * * * reminder   user_is_verified (denormalization measure) 
   const query = `mutation { submitUserPassCommentLock (
            user_id: ${user_id},
            day_id: ${day_id}, 
            thought_id: ${thought_id},             
         ) {
            user_id, day_id, thought_id, pass_comment_thoughts
         }
      }`
   return query;
}

export const submitNotificationQueryStringFunc = (
   notification_json_string: string | null,
   //   from_user_id:number|null,
   //   from_username:string|null,
   //   for_user_id:number|null, // could be everyone in the app?
   //   from_app:boolean|null,
   //   day_id:number|null,
   //   day_icon: string|null, 
   //   thought_id:number|null,
   //   moment_id:number|null,
   //   field_id:number|null,
   //   invite_id:number|null,
   //   listener_id:number|null,
   //   share_id:number|null, 
   //   like_id:number|null,
   //   star_id:number|null,
   //   reaction_id:number|null, 
   //   vibe_id:number|null,
   //   payment_id:number|null,
   //   prank_id:number|null,
   //   feedgame_id:number|null,
   //   message_id:number|null,
   //   report_id:number|null,
   //   user_pass_lock_id:number|null,
   //   user_allowed_to_unlock_id:number|null,
   //   ballot_id:number|null,
   //   custom_notification:string|null,
   //   is_read:boolean|null,
   //   is_request:boolean|null, // for things like votes.
   //   type:string     // comments, thoughts. this determines the notification message if a custom notification wasn't sent.

   //         from_user_id: 4,   
   //         from_username: "trollboa69",
   //         for_user_id: 2,
   //         from_app: false,
   //         day_id: 2,
   //         day_icon: null,
   //         thought_id: null,
   //         moment_id: null,
   //         field_id: null,
   //         invite_id: null,
   //         listener_id: null,
   //         share_id: null,
   //         like_id: null,
   //         star_id: null,
   //         reaction_id: null,
   //         vibe_id: null,
   //         payment_id: null,
   //         prank_id: null,
   //         feedgame_id: null,
   //         message_id: null,
   //         report_id: null,
   //         user_pass_lock_id: null,
   //         user_allowed_to_unlock_id: null,
   //         ballot_id: null,
   //         custom_notification: null,
   //         is_read: false,
   //         is_request: false,
   //         type: "comment"
) => {

   const query = `mutation {
            submitNotification (
              notification_json_string: "${notification_json_string}"            
            ) {              
              from_user_id, for_user_id, from_app, day_id, day_icon, 
              thought_id, moment_id, field_id, invite_id, listener_id, 
              share_id, like_id, star_id, reaction_id, vibe_id,
              payment_id, prank_id, feedgame_id, message_id, 
              report_id, user_pass_lock_id, user_allowed_to_unlock_id,
              user_allowed_to_unlock_id, ballot_id, custom_notification,
              is_read, is_request, type
            }      
          }
          `
   // from_user_id,
   return query;
}

export const getCurrentUserNotificationsQueryStringFunc = (userId: number) => {
   const query = `query {
            getCurrentUserNotifications (
              userId: ${userId}           
            ) {              
              from_user_id, for_user_id, from_app, day_id, day_icon, 
              thought_id, moment_id, field_id, invite_id, listener_id, 
              share_id, like_id, star_id, reaction_id, vibe_id,
              payment_id, prank_id, feedgame_id, message_id, 
              report_id, user_pass_lock_id, user_allowed_to_unlock_id,
              user_allowed_to_unlock_id, ballot_id, custom_notification,
              is_read, is_request, type
            }      
          }
          `
   return query;
}

// (user_id:number|null, blocked_id:number, is_shadow_ban: boolean|null, feedback:string|null, notes: string|null) 

export const userBlocksUserQueryStringFunc = (user_id: number | null, blocked_id: number, is_shadow_ban: boolean | null, feedback: string | null, notes: string | null) => {
   const query = `mutation {
            blockUser (
               user_id: ${user_id || null},
               blocked_id: ${blocked_id || null},
               is_shadow_ban: ${is_shadow_ban || null},
               feedback: ${feedback || null},
               notes: ${notes || null},
            ) {
               user_id, blocked_id, is_shadow_ban, feedback, notes
            }
         }`
   return query;
}

export const submitCommentVoteQueryStringFunc = (user_id: number, username: string, user_profile_icon: string, day_id: number, ballot_id: number, vote_int: number, vote_type: string, vote_string: string) => {
   const query = `mutation {
            submitCommentVote (
               user_id: ${user_id},
               username: "${username}",
               user_profile_icon: "${user_profile_icon}",
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               vote_int: ${vote_int},
               vote_type: "${vote_type}",
               vote_string: "${vote_string}",
            ) {
               id, user_id, username, user_profile_icon, day_id, ballot_id, vote_int, vote_type, vote_string
            }
         }`
   return query;
}

// vote_id, vote_int, vote_type, day_id, ballot_id, user_id
export const deleteCommentVoteQueryStringFunc = (vote_id: number, vote_int: number, vote_type: string, day_id: number, ballot_id: number, user_id: number) => {
   const query = `mutation {
            deleteCommentVote (
               vote_id: ${vote_id},
               vote_int: ${vote_int},
               vote_type: "${vote_type}",            
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_id: ${user_id},
            ) {
               id, user_id, username, user_profile_icon, day_id, ballot_id, vote_int, vote_type, vote_string
            }
         }`
   return query;
}

export const updateBestCommentDecisionQueryStringFunc = (day_id: number, ballot_id: number, decision: string, custom_decision: string | null, leaderboard_int: any) => {
   const customDecisionValue = custom_decision === null ? 'null' : `"${custom_decision}"`;
   const query = `mutation {
            updateBestCommentDecision(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               decision: "${decision}",
               custom_decision: ${customDecisionValue},
               leaderboard_int: [${leaderboard_int}],
            ) 
         }`;
   // {
   //    id, day_id, started_by_id, title, description, decision, notes, option, 
   //    restriction, options, start_datetime, end_datetime
   // }
   return query;
}

export const setBestCommentCustomDecisionUserQueryStringFunc = (
   day_id: number, ballot_id: number,
   // custom_decision_user_chosen_by:string|null,
   custom_decision_user_id: number,
   custom_decision_username: string, custom_decision_usericon: string
) => {
   // custom_decision_user_chosen_by: "${custom_decision_user_chosen_by}",
   const query = `mutation {
               setBestCommentCustomDecisionUser(
                  day_id: ${day_id},
                  ballot_id: ${ballot_id},
                  custom_decision_user_id: ${custom_decision_user_id},
                  custom_decision_username: "${custom_decision_username}",
                  custom_decision_usericon: "${custom_decision_usericon}",
               )
            }`
   return query;
}



export const submitJoinDayVoteQueryStringFunc = (
   day_id: number, ballot_id: number, user_id: number, username: string, user_profile_icon: string, vote_string: string | null, vote_type: string
) => {
   const query = `mutation {
            submitJoinDayVote(
               day_id: ${day_id}
               ballot_id: ${ballot_id}
               user_id: ${user_id}
               username: "${username}"
               user_profile_icon: "${user_profile_icon}"
               vote_string: "${vote_string}"
               vote_type: "${vote_type}"               
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, vote_string, vote_int, vote_type
            }
         }`
   return query;
}

export const submitVoteQueryStringFunc = (
   day_id: number, ballot_id: number, user_id: number, username: string, user_profile_icon: string, vote_string: string | null, vote_type: string,
   non_anonymous: boolean | null, is_option: boolean | null
) => {
   const query = `mutation {
            submitVote(
               day_id: ${day_id}
               ballot_id: ${ballot_id}
               user_id: ${user_id}
               username: "${username}"
               user_profile_icon: "${user_profile_icon}"
               vote_string: "${vote_string}"
               vote_type: "${vote_type}"               
               non_anonymous: ${non_anonymous}              
               is_option: ${is_option}               
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, vote_string, vote_int, vote_type,
               non_anonymous, is_option
            }
         }`
   return query;
}

export const submitJoinDayWriteContentAndUpdateBallotStringFunc = (
   day_id: number, posting_user_id: number, ballot_id: number, decision: string, custom_decision: string | null, writeContentType: string, leaderboard_str: string,
) => {

   const query = `mutation {
            submitJoinDayWriteContentAndUpdateBallot(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               posting_user_id: ${posting_user_id},
               decision: "${decision}",
               custom_decision: "${custom_decision}",
               leaderboard_str: "${leaderboard_str}"
               writeContentType: "${writeContentType}",
            )
         }`
   return query;
}

export const finishVoteAndUpdateBallotQueryStringFunc = (day_id: number, ballot_id: number, decision: string, custom_decision: string | null, leaderboard: string[] | number[] | null) => {
   const query = `mutation {
            finishVoteAndUpdateBallot(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               decision: "${decision}",
               custom_decision: "${custom_decision}",
               leaderboard_str: "${leaderboard}"
            )
         }`
   return query;
}

export const thirtyMinTimerFinishVoteAndUpdateBallotQueryStringFunc = (
   day_id: number, ballot_id: number, leaderboard_str: string[] | number[] | null, decision: string, custom_decision: string | null
) => {
   const query = `mutation {
            thirtyMinTimerFinishVoteAndUpdateBallot(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               leaderboard_str: "${leaderboard_str}",
               decision: "${decision}",
               custom_decision: "${custom_decision}",
            )
         }`
   return query;
}

// export const updateCustomBallotQueryStringFunc = (
//    day_id:number, ballot_id:number, decision:string, custom_decision:string|null, leaderboard_int:any         
// ) => {
//    const customDecisionValue = custom_decision === null ? 'null' : `"${custom_decision}"`;         
//    const query =  `mutation {
//       finishCustomBallotUpdateDecision(
//          day_id: ${day_id},
//          ballot_id: ${ballot_id},
//          decision: "${decision}",
//          custom_decision: ${customDecisionValue},
//          leaderboard_int: [${leaderboard_int}],               
//       ) 
//    }`;         
//    return query;
// }

export const updateSubmittedBallotOptionsAndUserArrayQueryStringFunc = (
   day_id: number, ballot_id: number, options: string, user_submitted_options_user_array: string, user_submitted_options_is_approved_array: string | null
) => {
   const query = `mutation {
            updateUserSubmittedBallotOptionsAndUserArray(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               options: "${options}",
               user_submitted_options_user_array: "${user_submitted_options_user_array}",
               user_submitted_options_is_approved_array: "${user_submitted_options_is_approved_array}"
            )
         }`
   console.log('query', query)
   return query;
}

export const deleteUserSubmittedVoteButLeaveRecordOfSubmissionQueryStringFunc = (
   day_id: number, ballot_id: number, udatedOptionsAfterDeletingUserSubmittedVote: string, user_submitted_options_user_array: string
) => {
   const query = `mutation {
            deleteUserSubmittedVoteButLeaveRecordOfSubmission(                
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               udatedOptionsAfterDeletingUserSubmittedVote: "${udatedOptionsAfterDeletingUserSubmittedVote}",
               userSubmittedOptionsUserArray: "${user_submitted_options_user_array}",
           )
         }`
   console.log('query', query)
   return query;
}

export const postingUserApprovesProposedVoteQueryStringFunc = (
   day_id: number, ballot_id: number, user_submitted_options_is_approved_array: string
) => {
   console.log('user_submitted_options_is_approved_array', user_submitted_options_is_approved_array)
   const query = `mutation {
            postingUserApprovesProposedVote(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_submitted_options_is_approved_array: "${user_submitted_options_is_approved_array}",
            )
         }`
   console.log("query", query)
   return query;
}

export const userLikesActualBallotOptionQueryStringFunc = (
   day_id: number, ballot_id: number, liked_by_id: number, liked_by_username: string, liked_by_user_profile_icon: string | null, ballot_options_text: number
) => {
   const query = `mutation {
            userLikesActualBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               liked_by_id: ${liked_by_id},
               liked_by_username: "${liked_by_username}",
               liked_by_user_profile_icon: "${liked_by_user_profile_icon}",
               ballot_options_text: "${ballot_options_text}",               
            ) {
               day_id, ballot_id, liked_by_id, liked_by_username, liked_by_user_profile_icon, ballot_options_text, ballot_user_submitted_options_users_array_idx, is_like
            }
         }`
   console.log('query', query)
   return query;
}
export const userLikesProposedBallotOptionQueryStringFunc = (
   day_id: number, ballot_id: number, liked_by_id: number, liked_by_username: string, liked_by_user_profile_icon: string | null, ballot_user_submitted_options_users_array_idx: number
) => {
   console.log('ballot_user_submitted_options_user_array_idx', ballot_user_submitted_options_users_array_idx)
   console.log('typeof ', typeof ballot_user_submitted_options_users_array_idx)
   const query = `mutation {
            userLikesProposedBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               liked_by_id: ${liked_by_id},
               liked_by_username: "${liked_by_username}",
               liked_by_user_profile_icon: "${liked_by_user_profile_icon}",
               ballot_user_submitted_options_users_array_idx: ${ballot_user_submitted_options_users_array_idx}
            ) {
               day_id, ballot_id, liked_by_id, liked_by_username, liked_by_user_profile_icon,  ballot_options_text, ballot_user_submitted_options_users_array_idx, is_like
            }
         }`
   console.log('query', query)
   return query;
}

export const userRatesBallotOptionQueryStringFunc = (
   day_id: number, ballot_id: number, ballot_options_text: string, user_id: number, username: string, icon: string | null, stars: number
) => {
   const query = `mutation {
            userRatesBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_id: ${user_id},                              
               username: "${username}",
               icon: "${icon}",
               ballot_options_text: "${ballot_options_text}",
               stars: ${stars},                              
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp, updatedAtBin,
               ballot_options_text, ballot_user_submitted_options_users_array_idx
            }
         }`
   console.log('query', query)
   return query;
}

export const userRatesProposedBallotOptionQueryStringFunc = (
   day_id: number, ballot_id: number, ballot_user_submitted_options_users_array_idx: number,
   user_id: number, username: string, icon: string | null, stars: number
) => {
   const query = `mutation {
            userRatesProposedBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_id: ${user_id},                              
               username: "${username}",
               icon: "${icon}",
               ballot_user_submitted_options_users_array_idx: ${ballot_user_submitted_options_users_array_idx},
               stars: ${stars},                              
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp, updatedAtBin,
               ballot_options_text, ballot_user_submitted_options_users_array_idx
            }
         }`
   console.log('query', query)
   return query;
}

export const createVoteCommentBucketQueryStringFunc = (
   day_id: number, user_id: number, username: string, user_profile_icon: string,
   thought: string, thoughts_ok: string, downloadable: string,
   starrable: string, non_anonymous: string,
   location_id: number | null, location_text: string | null,
   moment_id: number | null, greatfullagain_id: number | null,
   event_id: number | null, stars_show_avg: boolean, stars_show_users: boolean,
   parent_thought_id: number | null, comment_icon: string | null,
   is_video: boolean | null, is_voice: boolean | null,
   commenter_can_determine: boolean | null,
   voice_comments_ok: boolean | null, text_comments_ok: boolean | null,
   // nope
   anonymous_comments_ok: boolean | null,
   lock: string | null, unlock: string | null,
) => {
   const query = `mutation {
         createVoteCommentBucket(
            day_id: ${day_id},
            user_id: ${user_id},
            username: "${username}",
            user_profile_icon: "${user_profile_icon}",
            thought: "${thought}",
            thoughts_ok: "${thoughts_ok}",
            downloadable: "${downloadable}",
            starrable: "${starrable}",
            non_anonymous: "${non_anonymous}",
            location_id: ${location_id},
            location_text: "${location_text}",
            moment_id: ${moment_id},
            greatfullagain_id: ${greatfullagain_id},
            event_id: ${event_id},
            stars_show_avg: ${stars_show_avg},
            stars_show_users: ${stars_show_users},
            parent_thought_id: ${parent_thought_id},
            comment_icon: "${comment_icon}",
            commenter_can_determine: ${commenter_can_determine},
            voice_comments_ok: ${voice_comments_ok},
            text_comments_ok: ${text_comments_ok},
            anonymous_comments_ok: ${anonymous_comments_ok},
            lock: "${lock}",
            unlock: "${unlock}"
            ) {
               id, user_id, username, user_profile_icon, user_is_verified, day_id, location_id, moment_id, greatfullagain_id, parent_thought_id, sus_content,
                  suggestion_id, feedgame_id, meme_id, title, thought, thoughts, non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
                  is_reported, is_in_trash, trash_tally, date, on_profile, is_voice, is_video, stars_show_avg, stars_show_users, blank_thoughts_ok, blank_thoughts_username,
                  
                  commenter_can_determine, voice_comment_path, voice_comments_ok, text_comments_ok, i_can_unlock, u_can_unlock,
                  lock, unlock
            }
         }`
   return query;
}
