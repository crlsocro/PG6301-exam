# PG6301 Exam - POKEMON

PG6301 exam 2020, a "gatcha" game (Pokemon collector)

## How to run the app:
### Make sure we have all dependencies before running the app:

    yarn install

### Start the app with:

    yarn dev

    OR

    yarn build
    yarn start

### app is now available on localhost:8080

### No premade user, please use the SignUp button to create user first.

### Test command:

    yarn test

## Test coverage on delievery:

No testing on collection.jsx, index.jsx or server.js

No failed tests

File              |  % Stmts | % Branch |  % Funcs |  % Lines |
------------------|----------|----------|----------|----------|
All files         |    67.53 |    54.72 |    72.73 |    67.15 |

## Braindump
Throughout the exam i struggled to stick to my code. Started over 2 times and ended up using alot of our lecturer's code from a couple of lessons and exercises. (Linked in files and at the bottom of readme).

This 48 hour deadline is really stressful and forced me to learn alot more, i still need to get a better understanding of react and route setups etc.

The structure is as spesified in the assignment text.

I think i use too much time on the different functions, as you can see in most of my code and especially in file: collections.jsx i've hardcoded alot where i probably should have made some pretty functions. I'm sure i have some reduncancy as my focus throughout the exam was to get the functionality down first. Time flies by when you have fun!

I'm pretty satisfied with the testing, but collection.jsx have no tests as of delievery.

I think i've followed the instructions, which are terrifying btw, for the most part. I've added some comment below on each task.

I think i was getting close to getting a working collection page, but that's where i had to stop at this time.

The diffent technologies used are that same as in class.
react, react-dom, react-router-dom, express, passport, enzyme etc.


## Parts/Task
- [X] **R1 - Ok, Logo = home**

- [X] **R2 - Ok, the required RESTful APIs that are not in use have tests. (delete:deletepokemon and put:updatepokemon in file: lootbox-api.js). Other RESTFUL APIs are being used throughout the code.**

- [X] **R3 - Ok**

- [ ] *R4 - Not 100% sure, probably missed alot*

- [ ] R5 - Not started

- [X] **T1 - 9 pokemons.**

- [X] **T2 - The 9 pokemons is listed in file: pokemonlist.jsx**

- [X] **T3 - collection.jsx**

- [ ] *T4 - This is as far as i got, i started making the function to open 3 lootboxes. The function itself works, but nothing is saved to the user. Won't check it of, because it's unclear i need to save collection to a user or a proof of concept is enough.*

- [ ] T5 - Not started

- [ ] T6 - Not started

### Files used and/or extend/modified from:
[arcuri82.github - Les07](https://github.com/arcuri82/web_development_and_api_design/tree/master/les07)

[arcuri82 github - quiz-game part-07](https://github.com/arcuri82/web_development_and_api_design/tree/master/exercise-solutions/quiz-game/part-07)

[arcuri82 github - quiz-game part-10](https://github.com/arcuri82/web_development_and_api_design/tree/master/exercise-solutions/quiz-game/part-10)