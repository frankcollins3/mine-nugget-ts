import styles from 'styles/LoginLogout/LogInOut.module.scss'
// possible dictionary API to check for simple syllable words or too easily guessed words?
// email API to check if its a valid email?
// possible to make an API and to basically hash that API so that you can't read it but can consist of vulgar words that aren't accepted?

export default async function SignupConstraints() {
    return (
        <div>
            <div> 
                {/* username constraints: 6-30 characters long */}
                {/* password constraints: 1 special character, 1 uppercase letter, 7-14 characters */}
                {/* age constraints: must be atleast 16 years old!  */}
                {/* valid email constraints: must have an @ in the list. or end in .edu .com etc  */}
            </div>
        </div>
    )
}