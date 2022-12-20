
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Home } from "."

/* 
  To intercept the requisition (fetch()) and mok a response.
*/
//request, response, context
const handlers = [//the teacher put both responses in one get(). I chose to do this way instead.
  rest.get('https://jsonplaceholder.typicode.com/posts',
  async (req, res, ctx) => {
    return res(ctx.json([
      {
        "userId": 1,
        "id": 1,
        "title": "Title 1",
        "body": "Body number 1. You know."
      },
      {
        "userId": 2,
        "id": 2,
        "title": "Title 2",
        "body": "Body number 2. You know."
      },
      {
        "userId": 3,
        "id": 3,
        "title": "Title 3",
        "body": "Body number 3. You know."
      },
    ]));
  }),

  rest.get('https://jsonplaceholder.typicode.com/photos', 
  async (req, res, ctx) => {
    return res(ctx.json([
      {
        "url": "img/img1.png"
      },
      {
        "url": "img/img2.png"
      },
      {
        "url": "img/img3.png"
      },
    ]))
  })
];

const server = setupServer(...handlers);


describe('<Home />', ()=>{
  beforeAll(()=>{
    server.listen()
  });

  afterEach(()=> server.restoreHandlers());

  afterAll(()=>{
    server.close();
  })

  it('should render searchInput, posts and button', async ()=>{
    render(<Home />);

     
    //Need to do this because the posts are fetching from other website. It's asynchronous.
    const noMorePosts = screen.getByText(/no post matching the search/i);
    await waitForElementToBeRemoved(noMorePosts);

    //this print the html of the screen in the terminal.
    screen.debug();
  })
})