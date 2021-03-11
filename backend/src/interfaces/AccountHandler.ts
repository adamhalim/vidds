interface AccountHandler {
    accountRegistered(token: string): void; // Check if account already is registered
    createAccount(token: string): void;
    removeAccount(token: string): void;
    initDB(): void;
}