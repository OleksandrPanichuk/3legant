"use client"
import { useCallback, useState } from "react"


// export type UseDataUrlResult = [string | undefined, (files:File) => void]

export const useDataUrl = () => {
    const [dataUrl, setDataUrl] = useState<string>()

    
    const getDataUrl = useCallback((file: File) => {
        const reader = new FileReader()

        reader.onload = function (event) {
            const result = event.target?.result

            if(result) {
                setDataUrl(typeof result === 'string' ? result : Buffer.from(result).toString())
            }
        }

        reader.readAsDataURL(file)
    },[])

    const reset = useCallback(() => setDataUrl(undefined),[])

    return [dataUrl, getDataUrl, reset] as const
}