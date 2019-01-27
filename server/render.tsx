import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { Request, Response } from 'express'
// import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Root } from '../src/root'

export default ({ clientStats }) => (req: Request, res: Response) => {
  // const history = createHistory({ initialEntries: [req.path] })
  const root = ReactDOM.renderToString(<Root />)
  const chunkNames = flushChunkNames()

  const { js, styles, cssHash, scripts, stylesheets } = flushChunks(
    clientStats,
    { chunkNames }
  )

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Testing TS</title>
          ${styles}
        </head>
        <body>
          <div id="root">${root}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
