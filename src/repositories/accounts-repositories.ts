import { Account, Prisma, } from "@prisma/client";

export interface AccountsRepository{

    createAccount(data: Prisma.AccountCreateInput): Promise<Account>

    findByEmail(email: string | undefined): Promise<Account | null>

    getAccountId(accountId: string): Promise<Account | null >

    updateData(newAccount: Prisma.AccountCreateInput): Promise<Account>

    deleteAccount(accountId: string): Promise<void>
    
}