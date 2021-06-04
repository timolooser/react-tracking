import React, { createContext, useContext, useRef } from 'react'
import './App.css'
import { 
  useTrackImpressionsReads, 
  useTrackClicks } from 'react-impression-read-click-tracking'

const TrackingContext = createContext({userId: 3})

const App = () => {
  const ids = [1,2,3,4,5,6,7]
  return (
    <div className="App">
      <TrackingContext.Provider value={{userId: 3}}>
        {ids.map(id => <Div key={id} id={id.toString()} />)}
      </TrackingContext.Provider>
    </div>
  )
}

declare global {
  interface Window {
      dataLayer:any;
  }
}

const trackGtmEvent = (event: string, context: Object) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, context })
}

type DivProps = {
  id: string
}

const Div = ({id}: DivProps) => {
  const context = {
    ...useContext(TrackingContext),
    id
  }

  const handleImpression = () => trackGtmEvent('div-impression', context)
  const handleRead = () => trackGtmEvent('div-read', context)
  const handleClick = () => trackGtmEvent('div-click', context)

  const ref = useRef(null)
  useTrackImpressionsReads(ref, handleImpression, handleRead)
  useTrackClicks(ref, handleClick)

  return (
    <div ref={ref}/>
  )
}

export default App
