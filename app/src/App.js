import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
import theme from '@kalabam/theme'
import FontFace from './components/FontFace'

// Pages
import Home from './pages/Home'
import Join from './pages/Join'
import Joined from './pages/Joined'

// Pusher Config
const config = {
  clientKey: '179761146c8708fdb1bb',
  cluster: 'mt1',
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
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/join'>
                <Join />
              </Route>
              <Route exact path='/joined'>
                <Joined />
              </Route>
            </Switch>
          </Router>
        </PusherProvider>
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
