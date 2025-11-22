import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm'

export enum DocumentStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
    ARCHIVED = 'archived'
}
export type DocumentMetadata = Record<string, unknown>

const metadataTransformer = {
    to: (value: DocumentMetadata) => JSON.stringify(value),
    from: (value: string) => JSON.parse(value)
}

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @Column()
    pageCount: number

    @Column({
        type: 'text',
        default: DocumentStatus.PENDING
    })
    status: DocumentStatus

    @Column({
        type: 'text',
        transformer: metadataTransformer
    })
    metadata: DocumentMetadata

    @CreateDateColumn()
    createdAt: Date
}
