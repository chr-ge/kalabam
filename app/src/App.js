import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
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

function App () {
  return (
    <>
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
