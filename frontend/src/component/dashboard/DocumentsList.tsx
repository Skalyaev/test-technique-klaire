import Select from '@/component/Select'

import documentsAPI from '@/api/documents'
import { DocumentStatus } from '@/type/documents'
import type { Document } from '@/type/documents'

import './DocumentsList.css'

type DocumentsListProps = {
    documents: Document[]
    onDocumentUpdated: () => void
    loading: boolean
}
function DocumentsList({
    documents,
    onDocumentUpdated,
    loading
}: DocumentsListProps) {
    // ================================= VARIABLES
    const selectOptions = [
        { value: DocumentStatus.PENDING, label: 'EN ATTENTE' },
        { value: DocumentStatus.PROCESSED, label: 'TRAITÉ' },
        { value: DocumentStatus.ARCHIVED, label: 'ARCHIVÉ' }
    ]

    // ================================= METHODS
    const dateTimeFmt = (date: string) => {
        return new Date(date).toLocaleString()
    }

    const getSelectClass = (status: string) => {
        if (status === DocumentStatus.PENDING) return 'pending'
        if (status === DocumentStatus.PROCESSED) return 'processed'
        if (status === DocumentStatus.ARCHIVED) return 'archived'
        return ''
    }

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await documentsAPI.update(id, status)
            onDocumentUpdated()
        } catch (error) {
            console.error('[DocumentsList:handleStatusChange]', error)
            alert('Failed to update document status')
        }
    }

    // ================================= RENDER
    return (
        <div className="document-list">
            <table>
                <thead>
                    <tr>
                        <th>NOM DU FICHIER</th>
                        <th>NOMBRE DE PAGES</th>
                        <th>DATE D'IMPORTATION</th>
                        <th>STATUT</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map(doc => (
                        <tr key={doc.id}>
                            <td className="text-overflow">
                                <div title={doc.fileName}>{doc.fileName}</div>
                            </td>
                            <td className="text-overflow">
                                <div title={doc.pageCount}>{doc.pageCount}</div>
                            </td>
                            <td>{dateTimeFmt(doc.createdAt)}</td>
                            <td>
                                <Select
                                    id={doc.id}
                                    value={doc.status}
                                    options={selectOptions}
                                    onChange={handleStatusChange}
                                    className={getSelectClass(doc.status)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {documents.length === 0 && (
                <h3 className="no-document">
                    {loading ? 'CHARGEMENT...' : 'AUCUN DOCUMENT'}
                </h3>
            )}
        </div>
    )
}
export default DocumentsList
