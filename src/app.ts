import http from 'http'
import express, { Response } from 'express'

const PORT = +process.env.PORT || 9000
const app = express()

app.get('/', ( _, res: Response ): void => {
    res.json({ 'greeting' : 'Hi, world!' })
})

const server = http.createServer(app)

server.on('listening', (): void =>{
    console.log( `Server run at port ${ PORT }` )
})

server.listen(PORT)

export default app
