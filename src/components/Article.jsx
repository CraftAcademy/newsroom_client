import React from 'react'
import { Placeholder, Grid } from "semantic-ui-react";

const Article = ({ article }) => {
  return (
    <>
    <Grid.Row width={3} centered>
        <Placeholder
          style={{ height: 250, width: 400 }}
         
        >
          <Placeholder.Image />
         <h5 style={{ textAlign: "center" }}>{article.title}</h5>
        </Placeholder>
      </Grid.Row>
      <Grid.Row width={3} centered>
      <Placeholder>
         <p>{article.body}</p>
        </Placeholder>
      </Grid.Row>
      </>
  )
}

export default Article
