# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

## connectionRequestRouter

<!-- - POST /request/send/interested/:userId -->
<!-- - POST /request/send/ignored/:userId -->

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

<!-- - POST /request/review/accepted/:requestId -->
<!-- - POST /request/review/rejected/:requestId -->

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on the platform

status: ignored, interested, accepted, rejected
