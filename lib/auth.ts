import bcrypt from "bcryptjs";

/**
 *  Hash a password ebfore storing in DB
 * @param password - The password to be hashed
 * @ returns A hashed version of the password
 */

export async function hasPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
}

/**
 * Compare pw with stored hash
 * @param hash - The hashed password from the database
 * @returns A boolean indicating whether the password matches the hash
 */


export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}