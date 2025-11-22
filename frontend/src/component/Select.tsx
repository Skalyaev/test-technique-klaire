import { useState } from 'react'
import './Select.css'

type SelectProps = {
    id: number
    value: string
    options: Record<string, string>[]
    onChange: (id: number, value: string) => void
    className?: string
}
function Select({ id, value, options, onChange, className }: SelectProps) {
    // ================================= STATE
    const [open, setOpen] = useState(false)

    // ================================= METHODS
    const handleSelect = async (val: string) => {
        await onChange(id, val)
        setOpen(false)
    }

    // ================================= RENDER
    return (
        <div
            className={`select ${className || ''}`}
            onClick={() => setOpen(prev => !prev)}>
            <h5>▼</h5>
            <h5>
                {options.find(opt => opt.value === value)?.label ||
                    'Sélection...'}
            </h5>
            {open && (
                <div className="select-options">
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            className="select-option"
                            onClick={() => handleSelect(opt.value)}>
                            <h5>{opt.label}</h5>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Select
