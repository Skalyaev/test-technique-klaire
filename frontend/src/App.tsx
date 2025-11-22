import { useState, useEffect } from 'react'

import DocumentsStats from './component/dashboard/DocumentsStats'
import DocumentsForm from './component/dashboard/DocumentsForm'
import DocumentsList from './component/dashboard/DocumentsList'

import documentsAPI from './api/documents'
import type { Document, DocumentStats } from './type/documents'

function App() {
    // ================================= STATE
    const [documents, setDocuments] = useState<Document[]>([])
    const [stats, setStats] = useState<DocumentStats[]>([])
    const [loading, setLoading] = useState(false)

    // ================================= METHODS
    const loadData = async () => {
        setLoading(true)
        try {
            const [newDocuments, newStats] = await Promise.all([
                documentsAPI.findAll(),
                documentsAPI.getStats()
            ])
            setDocuments(newDocuments)
            setStats(newStats)
        } catch (error) {
            console.error('[App:loadData]', error)
        }
        setLoading(false)
    }

    // ================================= EFFECTS
    useEffect(() => {
        loadData()
    }, [])

    // ================================= RENDER
    return (
        <>
            <DocumentsStats stats={stats} />
            <DocumentsForm onDocumentsCreated={loadData} />
            <DocumentsList
                documents={documents}
                onDocumentUpdated={loadData}
                loading={loading}
            />
        </>
    )
}
export default App
