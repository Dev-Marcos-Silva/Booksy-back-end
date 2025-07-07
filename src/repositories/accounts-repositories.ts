import { Account, Prisma, } from "@prisma/client";

export interface AccountsRepository{

    createAccount(data: Prisma.AccountCreateInput): Promise<Account>

    findByEmail(email: string): Promise<Account | null>

    getAccountId(accountId: string): Promise<Account | null >

    updateData(accountId: string, email: string, newPassword: string): Promise<Account>

    deleteAccount(accountId: string): Promise<void>
    
}