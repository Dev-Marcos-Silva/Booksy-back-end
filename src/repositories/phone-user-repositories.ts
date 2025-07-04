import { PhoneUser, Prisma } from "@prisma/client";

export interface PhoneUserRepository {

    creataPhone(data: Prisma.PhoneUserCreateInput): Promise<PhoneUser>

    getPhone(userId: string): Promise<PhoneUser | null>

}