# User Password Reset Flow FE

This document outlines the password reset flow for the front end of the application.

## **URLs**

## [Netlify Deployed URL 👈 ](https://password-reset-flow-nodejs.netlify.app/)

```
https://password-reset-flow-nodejs.netlify.app/
```

## [Github repository URL 👈](https://github.com/LoordhuJeyakumar/password-reset-fe.git)

```
https://github.com/LoordhuJeyakumar/password-reset-fe.git
```

## Steps:

1.  User Initiates Reset:

    - User navigates to the "Forgot Password" page.
    - User enters their registered email address and clicks the "Submit" button.
    - Front end sends a POST request to the /passwordResetToken
    - API endpoint with the email address.
    - API Generates Token:

    ![Alt text](/src/assets/image.png)
    ![Alt text](/src/assets/image-1.png)

2.  API verifies the user's email address.

    - If the email is valid, API generates a unique password reset token.
    - API sends a password reset email to the user containing the token and a link to the password reset page.
      ![Alt text](/src/assets/image-3.png)

3.  User Accesses Reset Page:

    - User clicks the link in the password reset email.
    - User is redirected to the password reset page.
      ![Alt text](/src/assets/image-2.png)

4.  User Enters New Password:

    - User enters their new password and confirms it.
    - User enters the password reset token from the email.
    - User clicks the "Reset Password" button.

5.  Front End Validates and Submits:

        -   Front end validates the password fields (e.g., length, complexity).
        -   Front end sends a POST request to the /resetPassword API endpoint with the token and new password.

    ![Alt text](/src/assets/image-4.png)

6.  API Resets Password:

    - API verifies the token.
    - If the token is valid, API updates the user's password.
    - API sends a success response to the front end.

7.  Front End Handles Success:

    - Front end displays a success message to the user.
    - Front end redirects the user to the login page or appropriate landing page.
      ![Alt text](/src/assets/image-5.png)

## Error Handling:

- **Invalid email:** Display an error message to the user.
- **Token expired:** Display an error message and prompt the user to request a new token.
- **Invalid token:** Display an error message and prompt the user to check the link or try again.
- **Password reset failed:** Display an error message and encourage the user to contact support.

## Additional Considerations:

Token expiration: Implement a token expiration time for security.
Token security: Store tokens securely and avoid exposing them in URLs.
Password strength: Enforce password strength requirements.
User experience: Provide clear instructions and feedback throughout the process.
