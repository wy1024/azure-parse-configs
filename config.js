module.exports = {
  server: {
    // Enable email verification
    verifyUserEmails: true,
  
    // if `verifyUserEmails` is `true` and
    //     if `emailVerifyTokenValidityDuration` is `undefined` then
    //        email verify token never expires
    //     else
    //        email verify token expires after `emailVerifyTokenValidityDuration`
    //
    // `emailVerifyTokenValidityDuration` defaults to `undefined`
    //
    // email verify token below expires in 2 hours (= 2 * 60 * 60 == 7200 seconds)
    emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)
  
    // set preventLoginWithUnverifiedEmail to false to allow user to login without verifying their email
    // set preventLoginWithUnverifiedEmail to true to prevent user from login if their email is not verified
    preventLoginWithUnverifiedEmail: false, // defaults to false
  
    // The public URL of your app.
    // This will appear in the link that is used to verify email addresses and reset passwords.
    // Set the mount path as it is in serverURL
    publicServerURL: 'https://starryparse.azurewebsites.net/parse',
    // Your apps name. This will appear in the subject and body of the emails that are sent.
    appName: 'Starry App',
    // The email adapter
    emailAdapter: {
      module: 'parse-server-simple-mailgun-adapter',
      options: {
        // The address that your emails come from
        fromAddress: 'mailgun@mail.dotadrafts.com',
        // Your domain from mailgun.com
        domain: 'mail.dotadrafts.com',
        // Your API key from mailgun.com
        apiKey: 'key-ec30ea6e045304dd1a798b0390b460ac',
      }
    },
  
    // account lockout policy setting (OPTIONAL) - defaults to undefined
    // if the account lockout policy is set and there are more than `threshold` number of failed login attempts then the `login` api call returns error code `Parse.Error.OBJECT_NOT_FOUND` with error message `Your account is locked due to multiple failed login attempts. Please try again after <duration> minute(s)`. After `duration` minutes of no login attempts, the application will allow the user to try login again.
    accountLockout: {
      duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
      threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
    },
    // optional settings to enforce password policies
    passwordPolicy: {
      validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
      doNotAllowUsername: true, // optional setting to disallow username in passwords
      resetTokenValidityDuration: 24*60*60, // expire after 24 hours
    }
  },
  dashboard: {},
  storage: {},
  push: {}
}