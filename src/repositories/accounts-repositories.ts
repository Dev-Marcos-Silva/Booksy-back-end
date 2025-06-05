import { Account, Library, Prisma, User } from "@prisma/client";

export interface AccountsRepository{

    findByEmail(email: string): Promise<(Account & { user?: User; library?: Library } ) | null>

    createAccount(data: Prisma.AccountCreateInput): Promise<Account>

    getAccountId(accountId: string): Promise<Account>

    updateData(accountId: string, email: string, newPassword: string): Promise<Account>
    
}