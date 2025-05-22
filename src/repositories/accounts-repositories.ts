import { Account, Prisma } from "@prisma/client";

export interface AccountsRepository{

    findByEmail(email: string): Promise<Account | null>

    createAccount(data: Prisma.AccountCreateInput): Promise<Account>

}