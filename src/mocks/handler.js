// /* eslint-disable import/no-extraneous-dependencies */
// // src/mocks/server.js

// import {rest} from 'msw'
// import {setupServer} from 'msw/node'
// import {API_BASE_URL} from '../utils/constants'

// const handlers = [
//   rest.get(
//     'https://wizeline-academy.cdn.prismic.io/api/v2',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json([{id: 1, body: 'first todo'}]))
//     },
//   ),
// ]

// // This configures a request mocking server with the given request handlers.
// const server = setupServer(...handlers)

// export {server, rest}
