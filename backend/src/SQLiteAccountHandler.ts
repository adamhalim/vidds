import sqlite3 from 'sqlite3';
sqlite3.verbose();

var db = new sqlite3.Database('./src/data/users.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQlite DB.');
    }
});


// TODO: Token is set as string, but actually is a 
// JSON right now. Can't access fields. (TS cries)
class SQLiteAccountHandler implements AccountHandler {

    /**
     * This function checks in our SQLite DB to see if the user
     * already is in the DB.
     * @param token User's decoded token.
     */
    accountRegistered(token: any) {
        let accCreated = false;
        db.serialize(async () => {
            db.each(`SELECT COUNT(*) as count FROM account WHERE token = ?`, [token.sub], (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row.count) {
                    accCreated = true;
                }
            }, () => {
                if (accCreated) {
                    console.log(`${token.email} is already registered.`);
                    // If the account is registered, I want to 
                    // return an array of all URLS for the user.
                } else {
                    console.log(`${token.email} is not registered.`);
                    // If the account is not registered, we want
                    // to create a new account for the user (unless)
                    // we don't want to allow new users.
                }
            });
        })
    }

    /**
     * Creates a user in SQLite DB for a user.
     * @param token User's decoded token.
     */
    createAccount(token: string): void {
        db.serialize(() => {
            db.run(`INSERT INTO account(token) VALUES (?)`, [`${token.sub}`], (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`Added new account to DB.`)
                }
            });
        })
    }

    /** TODO: Implement this.
     * Removes user from SQLite DB.
     * @param token User's decoded token.
     */
    removeAccount(token: string): void {
        throw new Error('Method not implemented.');
    }

    /**
     * Initializes our SQLite DB.
     */
    initDB() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS account (
                token TEXT NOT NULL,
                CONSTRAINT pk_account PRIMARY KEY (token))`);

            // Used for debugging/development.
            // Prints all registered users.
            db.all(`SELECT token FROM account`, [], (err, rows) => {
                if (err) {
                    console.error(err);
                } else {
                    rows.forEach((row) => {
                        console.log(row);
                    })
                }
            });
        })
    }
}

export default SQLiteAccountHandler