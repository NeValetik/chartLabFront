'use client'
 
import { useState, ReactNode } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { NotificationProvider } from '@/contexts/NotificationContext'
import GlobalNotificationContainer from '@/components/GlobalNotificationContainer'
 
const Providers = ({
  children,
}: {
  children: ReactNode
}) => {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  if (typeof window !== 'undefined') {
    return (
      <NotificationProvider>
        {children}
        <GlobalNotificationContainer />
      </NotificationProvider>
    )
  }
 
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <NotificationProvider>
        {children}
        <GlobalNotificationContainer />
      </NotificationProvider>
    </StyleSheetManager>
  )
}

export default Providers;