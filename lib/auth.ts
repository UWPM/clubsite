import bcrypt from "bcryptjs";

/**
 *  Hash a password ebfore storing in DB
 * @param password - The password to be hashed
 * @ returns A hashed version of the password
 */

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
}
