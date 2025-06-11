import { Account, Library, Prisma, User } from "@prisma/client";

export interface AccountsRepository{

    createAccount(data: Prisma.AccountCreateInput): Promise<Account>

    findByEmail(email: string): Promise<(Account & { user?: User; library?: Library } ) | null>

    getAccountId(accountId: string): Promise<Account | null >

    updateData(accountId: string, email: string, newPassword: string): Promise<Account>
    
}