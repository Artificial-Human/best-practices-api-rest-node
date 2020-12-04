import 'reflect-metadata';
import 'module-alias/register';

import http from 'http'
import express, { NextFunction, Request, Response } from 'express'
import UserController from '@api/user/controller';
import { register as registerRoutes } from '@shared/registerRoutes';
import './inversify.config.ts'

const PORT = +process.env.PORT || 9000
const app = express()

app.use(express.json())

app.get('/', ( _, res: Response ): void => {
    res.json({ 'greeting' : 'Hi, world!' })
})

registerRoutes(app, Array.from([UserController]))

const server = http.createServer(app)

server.on('listening', (): void =>{
    console.log( `Server run at port ${ PORT } 🤖` )
})

server.listen(PORT)

export default app
