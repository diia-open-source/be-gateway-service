import { randomUUID } from 'node:crypto'

export function generateUuid(): string {
    return randomUUID()
}
