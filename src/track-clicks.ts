import { RefObject, useEffect } from "react"


export const useTrackClicks = (ref: RefObject<HTMLElement>, 
    handleClick: EventListener) => {
    
    useEffect(() => {
        const currentRef = ref.current   

        if (currentRef) {            
            currentRef.addEventListener('click', handleClick)
            
            return () => currentRef
                .removeEventListener('click', handleClick)
        }
    }, [ref, handleClick]) 
}