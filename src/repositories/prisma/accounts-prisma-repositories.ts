import { Account, Prisma } from "@prisma/client";
import { AccountsRepository } from "../accounts-repositories";
import { prisma } from "../../lib";

export class PrismaAccountsRepository implements AccountsRepository {

    async createAccount(data: Prisma.AccountCreateInput){

        const account = await prisma.account.create({data})

        return account
    }

    async findByEmail(email: string) {

        const account = await prisma.account.findUnique({
            where:{
                email
            }
        })

        return account 
    }

    async getAccountId(accountId: string) {

        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        })

        return account
    }

    async updateData(accountId: string, email: string, newPasswordHash: string) {

        const account = await prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                email,
                password: newPasswordHash
            }
        })

        return account
    }

    async deleteAccount(accountId: string){

        await prisma.account.delete({
            where:{
                id: accountId
            }
        })
    }
}