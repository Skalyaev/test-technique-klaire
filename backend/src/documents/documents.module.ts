import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DocumentsController } from './documents.controller'
import { DocumentsService } from './documents.service'
import { Document } from './documents.entity'

const OrmFeatureModule = TypeOrmModule.forFeature([Document])

@Module({
    imports: [OrmFeatureModule],
    controllers: [DocumentsController],
    providers: [DocumentsService]
})
export class DocumentsModule {}
