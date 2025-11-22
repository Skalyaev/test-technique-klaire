import { DocumentStatus } from '@/type/documents'
import type { DocumentStats } from '@/type/documents'

import './DocumentsStats.css'

type DocumentsStatsProps = {
    stats: DocumentStats[]
}
function DocumentsStats({ stats }: DocumentsStatsProps) {
    // ================================= METHODS
    const getTotalPages = (status: DocumentStatus): number => {
        const stat = stats.find(s => s.status === status)
        return stat?.totalPages ?? 0
    }

    // ================================= RENDER
    return (
        <div className="documents-stats">
            <img src="/img/klaire.svg" className="klaire-logo" />
            <div className="pending">
                <h4>{getTotalPages(DocumentStatus.PENDING)}</h4>
                <h5>EN ATTENTE</h5>
            </div>
            <div className="processed">
                <h4>{getTotalPages(DocumentStatus.PROCESSED)}</h4>
                <h5>TRAITÉ</h5>
            </div>
            <div className="archived">
                <h4>{getTotalPages(DocumentStatus.ARCHIVED)}</h4>
                <h5>ARCHIVÉ</h5>
            </div>
        </div>
    )
}
export default DocumentsStats
