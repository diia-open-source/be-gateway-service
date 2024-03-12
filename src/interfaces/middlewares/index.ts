import { Request, Response } from '@interfaces/index'

export type MiddlewareNext = (err?: Error) => void

export type Middleware = (req: Request, res: Response, next: MiddlewareNext) => Promise<void> | void

export type FileUploadHandler = (req: Request, res: Response, next: (err?: Error | unknown) => void) => Promise<void>

export type FilesUploadHandler = (req: Request, res: Response, next: (err?: Error | unknown) => void) => void
