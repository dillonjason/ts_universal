import * as React from 'react'
import * as ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import { App } from './app'

const history = createHistory()

const render = App =>
  ReactDOM.hydrate(
    <AppContainer>
      <App history={history} />
    </AppContainer>,
    document.getElementById('root')
  )

// Hot Module Replacement API
declare let module: { hot: any }

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app', () => {
    const { App } = require('./app')
    render(App)
  })
}

render(App)
