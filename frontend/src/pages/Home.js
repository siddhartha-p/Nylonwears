import * as React from 'react'
import { Helmet } from 'react-helmet'
import Card from '../components/card'

const Home = () => {
  return (
    <>  
      <Helmet>
        <title>NylonWears - Homepage</title>
      </Helmet>
      <Card />
    </>
  )
}

export const Head = () => <title>Home Page</title>

export default Home