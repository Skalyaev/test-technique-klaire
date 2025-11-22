import {
    IsString,
    IsNotEmpty,
    IsInt,
    Min,
    IsObject,
    IsArray,
    ArrayMinSize,
    ValidateNested,
    IsEnum
} from 'class-validator'
import { Type } from 'class-transformer'

import { DocumentStatus } from './documents.entity'
import type { DocumentMetadata } from './documents.entity'

export class CreateDocument {
    @IsString()
    @IsNotEmpty()
    fileName: string

    @IsInt()
    @Min(1)
    pageCount: number

    @IsObject()
    metadata: DocumentMetadata
}

export class CreateDocuments {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => CreateDocument)
    documents: CreateDocument[]
}

export class UpdateDocument {
    @IsEnum(DocumentStatus)
    status: DocumentStatus
}
