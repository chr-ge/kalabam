import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@kalabam/theme'
import FontFace from './components/FontFace'

import Home from './pages/Home'
import Join from './pages/Join'

function App () {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/join'>
              <Join />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
