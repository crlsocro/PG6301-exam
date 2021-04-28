# PG6301 Exam

PG6301 exam 2021, Messaging system

## How to run the app:

    npm install

### Start the app with:

    npm start

### app is now available on localhost:3000



### Test command:
    npm test or npm test -- --coverage --collectCoverageFrom "src/**/*.{js,jsx,ts,tsx}"



###TESTS

File              |  % Stmts | % Branch |  % Funcs | % Lines  |   
------------------|----------|----------|----------|----------|
All files         |    40.48 |    51.43    |    43.04 |  41.28   |


##Exam
Jeg synes denne eksamenen har vært utrolig lærerik og krevende, 
men jeg er fornøyd med funksjonaliteten til applikasjonen og det endelige produktet.

##Følgende har jeg med i applikasjon:

Jeg har gått utifra at man har en log in side som man bruker for å logge inn med Active Directory.
Når man har logget inn, vil man ha muligheten til å se på profil. Man kan også bruke brukere i applikasjonen, legge til brukere,
lage en melding, hente meldinger og åpne chat-applikasjonen. For å bruke chat-applikasjonen må man åpne en ny fane(gjerne inkognito),
og logge inn der med en annen bruker. Deretter har man muligheten til å chatte med hverandre. Men med en gang man går ut vil data bli tapt og man må skrive på nytt
for å fetche ny data.

##Krav til oppgaven:
1. A logged in use should be able to register more users in the system
   Users should have properties first name, last name and email address
   Optionally, users can have description and picture
   
2. A logged-in user should be able to create messages that are sent to one or more users
   
3. Users should be able to see messages where they are a recipient or sender
   
4. Users should be able to respond to messages

##Ting jeg ikke har fått med...
* Jeg hadde først en funskjonalitet som gjorde at man måtte logge inn for å utføre forksjellige oppgaver, men rett før jeg skulle levere ville ikke react bruke den metoden lenger
      og jeg fant ikke bug'en.
  
* Jeg har en delvis sende meldinger til brukere, men fikk bare sendt den til express og ikke lagt til brukeren.

*Jeg har delvis chat løsning, men meldinger blir ikke lagret

##Bruk av kode:
Jeg har vært inspirert av forelesningene, spesielt Johannes sine og har marker litt hvor jeg har gjort det. Det kan være steder hvor jeg har glemt det...

Kandidat nr: 8041    Spurte meg om hjelp til litt kode. Dette er min kodesnipper som personen har blitt tildelt fra meg:

                      userApi

                      ListUsers.test 

                      UserApi.test 

