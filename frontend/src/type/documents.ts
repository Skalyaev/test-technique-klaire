export enum DocumentStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
    ARCHIVED = 'archived'
}
export type DocumentMetadata = Record<string, unknown>

export type Document = {
    id: number
    fileName: string
    pageCount: number
    status: DocumentStatus
    metadata: DocumentMetadata
    createdAt: string
}

export type DocumentDTO = {
    fileName: string
    pageCount: number
    metadata: DocumentMetadata
}

export type DocumentStats = {
    status: DocumentStatus
    totalPages: number
}
