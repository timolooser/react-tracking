import { RefObject, useEffect } from "react"

export const useTrackImpressionsReads = (ref: RefObject<HTMLElement>, 
    handleImpression: Function, handleRead: Function) => {
    
    useEffect(() => {
        const currentRef = ref.current           
        if (currentRef) {   
            let readObserver = createReadObserver(
                /* trigger below expected read time (0.3)*/
                expectedReadTimeFromText(currentRef.innerText)*0.3, 
                handleImpression,
                handleRead
            )         
            readObserver.observe(currentRef)
            return readObserver.disconnect
        }
    }, [ref, handleImpression, handleRead]) 
}


const createReadObserver = (readTriggerTime: number, 
    handleImpression: any, handleRead: any) => {

    let timeoutHandle = 0

    const handleIntersection: IntersectionObserverCallback = (items) => {
        if (items.length !== 1) {
            return null
        }

        const onEntry = () => {
            handleImpression()

            timeoutHandle = window.setTimeout(() => {
                if (items[0].isIntersecting) {
                    handleRead()
                }
            }, readTriggerTime)
        }

        const onExit = () => {
            window.clearTimeout(timeoutHandle)
        }

        if (items[0].isIntersecting) {
            onEntry()
        } else {
            onExit()
        }
    }

    return new IntersectionObserver(handleIntersection, {
        root: null, 
        rootMargin: "0px 0px -40% 0px",
        threshold: 1
    }) 
}

const expectedReadTimeFromText = (text: string): number => {
    const numberOfWords = text.split(' ').length
    const averageReadingTimeSec = numberOfWords * 0.25
    return averageReadingTimeSec * 1000
}