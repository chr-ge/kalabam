import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
import theme from '@kalabam/theme'
import FontFace from './components/FontFace'
import { LobbyProvider } from './contexts/LobbyContext'

// Pages
import Home from './pages/Home'
import Join from './pages/Join'
import Joined from './pages/Joined'

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
        <PusherProvider {...config}>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <LobbyProvider>
                <Route path='/join' component={Join} />
                <Route path='/joined' component={Joined} />
              </LobbyProvider>
            </Switch>
          </Router>
        </PusherProvider>
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
