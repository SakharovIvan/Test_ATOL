const createDataTable = `
CREATE TABLE Data ( 
    AccountingNumber bigint,
    Surname TEXT,
    Name TEXT,
    SecondName TEXT,
    DateOfBirth DATE,
    INN BIGINT,
    USERFIO TEXT,
    Status VARCHAR(50)
    );
`;

const createUserTable = `
CREATE TABLE Users ( 
    USERFIO TEXT,
    Login VARCHAR(50),
    Password VARCHAR(50)
    );
`;
const deleteDataTable = `DROP TABLE Data;`;
const deleteUserTable = `DROP TABLE Users;`;

export {createDataTable, createUserTable, deleteDataTable, deleteUserTable}