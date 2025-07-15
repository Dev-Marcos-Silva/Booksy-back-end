import { PhoneUser, Prisma } from "@prisma/client";
import { Phone } from "../@types/phone-type";

export interface PhoneUserRepository {

    creataPhone(data: Prisma.PhoneUserCreateInput): Promise<PhoneUser>

    getPhone(userId: string): Promise<PhoneUser | null>

    updatePhone(newPhone: Phone): Promise<void>

}