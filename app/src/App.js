import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from './locales/en/messages'
import { LobbyProvider } from './contexts/LobbyContext'
import FontFace from './components/FontFace'
import theme from '@kalabam/theme'

// Pages
import Home from './pages/Home'
import Join from './pages/Join'
import Joined from './pages/Joined'
import Live from './pages/Live'

// Pusher Config
const config = {
  clientKey: process.env.REACT_APP_PUSHER_CLIENT,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  authEndpoint: process.env.REACT_APP_AUTH_ENDPOINT,
  triggerEndpoint: process.env.REACT_APP_TRIGGER_ENDPOINT
}

i18n.load('en', messages)
i18n.activate('en')

function App () {
  return (
    <>
      <ChakraProvider theme={theme}>
        <I18nProvider i18n={i18n}>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <PusherProvider {...config}>
                <LobbyProvider>
                  <Route path='/join' component={Join} />
                  <Route path='/joined' component={Joined} />
                  <Route path='/live' component={Live} />
                </LobbyProvider>
              </PusherProvider>
            </Switch>
          </Router>
        </I18nProvider>
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
