import { createInterface } from "readline"

export default async (question: string = ''): Promise<string> => {
    return new Promise((resolve, reject) => {
        const readline = createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question(question, ipt => {
            resolve(ipt)
            readline.close()
        })
    })
}