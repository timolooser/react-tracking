# React Tracking

Easily track **Impressions, Reads** and **Clicks** in React.

## Installation

### NPM

```
npm install react-impression-read-click-tracking
```

### Yarn

```
yarn add react-impression-read-click-tracking
```

## Usage

```tsx
import { 
  useTrackImpressionsReads, 
  useTrackClicks } from 'react-impression-read-click-tracking'

...

const trackGtmEvent = (event: string, context: Object) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, context })
}

...

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
```
