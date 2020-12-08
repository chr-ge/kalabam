import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@kalabam/theme'

import Home from './pages/Home'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
