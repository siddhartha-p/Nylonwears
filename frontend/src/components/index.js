import * as React from 'react'
import Layout from '../components/layout'
import Card from '../components/card'

const IndexPage = () => {
  return (
    <Layout>
        <Card />   
    </Layout>
  )
}

export const Head = () => <title>Home Page</title>

export default IndexPage