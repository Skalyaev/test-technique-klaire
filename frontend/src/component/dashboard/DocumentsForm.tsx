import { useState } from 'react'
import type { FormEvent } from 'react'

import documentsAPI from '@/api/documents'
import type { DocumentDTO } from '@/type/documents'

import './DocumentsForm.css'

type DocumentsFormProps = {
    onDocumentsCreated: () => void
}
function DocumentsForm({ onDocumentsCreated }: DocumentsFormProps) {
    // ================================= STATE
    const [lines, setLines] = useState('')
    const [loading, setLoading] = useState(false)

    // ================================= VARIABLES
    const textareaPlaceholder =
        'Format: nom, pages (1 par ligne) (ex: document1.pdf, 10)'

    // ================================= METHODS
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const cleanLines = lines.split('\n').map(line => line.trim())
            const filteredLines = cleanLines.filter(line => line.length > 0)

            const documents: DocumentDTO[] = filteredLines.map(line => {
                const splitedLine = line.split(',')

                const [fileName, pageCountStr] = splitedLine.map(l => l.trim())
                const pageCount = parseInt(pageCountStr)

                if (isNaN(pageCount) || pageCount < 0) {
                    throw new Error(`${line}: Invalid page count`)
                }
                return { fileName, pageCount, metadata: {} }
            })
            await documentsAPI.create(documents)

            setLines('')
            onDocumentsCreated()
        } catch (error) {
            console.error('[DocumentsForm:handleSubmit]', error)
            alert('Failed to create documents')
        }
        setLoading(false)
    }

    // ================================= RENDER
    return (
        <div className="documents-form">
            <h5>NOUVEAUX DOCUMENTS</h5>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={lines}
                    onChange={e => setLines(e.target.value)}
                    placeholder={textareaPlaceholder}
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !lines.trim()}>
                    {loading ? 'ENVOIE...' : 'AJOUTER'}
                </button>
            </form>
        </div>
    )
}
export default DocumentsForm
