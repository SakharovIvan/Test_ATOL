## 1. Synthesize data for the database:

### Clients table

- Account number
- Surname
- Name
- Surname
- Date of Birth
- INN
- Full name of the person responsible
- Status (default "Не в работе")

### User table

- Full name
- Login
- Password

## 2. Create an interface for accessing synthesized data:

_Form for authorization using login/password pair
After showing the table of authorized clients
user via connection Full name from the user table – Full name
responsible
The user should be able to change the status
client to:_

- "Не в работе",
- "В_работе",
- "Отказ",
- "Сделка_закрыта"

<!--Installation-->

## Installation (Linux)

1. Cloning the repository
   `git clone https://github.com/SakharovIvan/Test_ATOL/`

2. Go to the repository
   `cd Test_ATOL`

3. Install dependencies
   `npm init`

4. Install the project
   `npm link`

## Launch of the project

To start the project, you need create your own PostgerSQL Base and write your settings to file
bin/bd.js

### 1-st step - create your own bd or use synth data in **fixtures** directry

`makeBase -d ./__fixtures__/data.txt -u ./__fixtures__/users.txt`

[![asciicast](https://asciinema.org/a/9R6GD0ThViKMylJlzfsiuFjYj.svg)](https://asciinema.org/a/mfW024ldBGVrVl7EMVQjKM7S7)

### 2-nd step - find Clients by Users and change Status by AccountingNumber

Use command for displaying list of Clienst by User

`findClient <login> <password>`

_write correct login and password from users file_

Use command for changing status of AccountingNumber by User

`findClient <login> <password> <AccountingNumber> <Status>`

_write correct login and password from users file_

[![asciicast](https://asciinema.org/a/J4aFJzBpslBfnNYhgjFxK3N9b.svg)](https://asciinema.org/a/jGsnXUqpkGJEoExE9pYIygr1Z)
