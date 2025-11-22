import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DocumentsModule } from './documents/documents.module'
import { Document } from './documents/documents.entity'

const OrmRootModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database/app.sqlite',
    entities: [Document],
    synchronize: true
})

@Module({
    imports: [OrmRootModule, DocumentsModule]
})
export class AppModule {}
