import type { DocumentDTO } from '@/type/documents'

const API_URL = 'http://localhost:5000'
const ENDPOINT = 'documents'

const documentsAPI = {
    async create(documents: DocumentDTO[]) {
        const res = await fetch(`${API_URL}/${ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ documents })
        })
        if (!res.ok) throw new Error('Failed to create documents')
        return res.json()
    },

    async update(id: number, status: string) {
        const res = await fetch(`${API_URL}/${ENDPOINT}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        if (!res.ok) throw new Error('Failed to update document')
        return res.json()
    },

    async findAll() {
        const res = await fetch(`${API_URL}/${ENDPOINT}`)

        if (!res.ok) throw new Error('Failed to get documents')
        return res.json()
    },

    async getStats() {
        const res = await fetch(`${API_URL}/${ENDPOINT}/stats`)

        if (!res.ok) throw new Error('Failed to get stats')
        return res.json()
    }
}
export default documentsAPI
