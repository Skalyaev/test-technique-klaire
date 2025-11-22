import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    ValidationPipe
} from '@nestjs/common'

import { DocumentsService } from './documents.service'
import { CreateDocuments, UpdateDocument } from './documents.dto'

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documents: DocumentsService) {}

    @Post()
    create(@Body(ValidationPipe) payload: CreateDocuments) {
        return this.documents.create(payload.documents)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body(ValidationPipe) payload: UpdateDocument
    ) {
        return this.documents.update(parseInt(id), payload)
    }

    @Get()
    findAll() {
        return this.documents.findAll()
    }

    @Get('stats')
    getStats() {
        return this.documents.getStats()
    }
}
