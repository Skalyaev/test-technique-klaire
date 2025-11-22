import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Document, DocumentStatus } from './documents.entity'
import { CreateDocument, UpdateDocument } from './documents.dto'

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documents: Repository<Document>
    ) {}

    create(payload: CreateDocument[]) {
        const newDocuments = payload.map(dto => {
            const document = new Document()

            document.fileName = dto.fileName
            document.pageCount = dto.pageCount
            document.metadata = dto.metadata
            document.status = DocumentStatus.PENDING
            return document
        })
        return this.documents.save(newDocuments)
    }

    async update(id: number, payload: UpdateDocument) {
        await this.documents.update(id, payload)
        return this.documents.findOne({ where: { id } })
    }

    findAll() {
        const order = { createdAt: 'DESC' } as const
        return this.documents.find({ order })
    }

    async getStats() {
        const result = await this.documents
            .createQueryBuilder('document')
            .select('document.status', 'status')
            .addSelect('SUM(document.pageCount)', 'totalPages')
            .groupBy('document.status')
            .getRawMany()

        const stats = result.map(item => ({
            status: item.status,
            totalPages: parseInt(item.totalPages)
        }))
        return stats
    }
}
