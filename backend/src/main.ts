import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'

import { AppModule } from './app.module'

const port = 5000
const logger = new Logger('Main')

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const validationPipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    })
    app.useGlobalPipes(validationPipe)
    app.enableCors()

    await app.listen(port)
    logger.log(`Listening on port ${port}`)
}
bootstrap()
