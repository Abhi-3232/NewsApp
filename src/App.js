import React, { useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  let pageSize = 6
  let apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

  const useProgress = (progress) => {
    setProgress(progress)
  }

    return (
      <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress} 
      />
        <Routes>
          <Route path='/' element={<News useProgress={useProgress} apiKey={apiKey} key={"general"} pageSize={pageSize} country="in"/>}/>
          <Route path='/business' element={<News useProgress={useProgress} apiKey={apiKey} key={"business"} pageSize={pageSize} country="in" category={"business"}/>}/>
          <Route path='/entertainment' element={<News useProgress={useProgress} apiKey={apiKey} key={"entertainment"} pageSize={pageSize} country="in" category={"entertainment"}/>}/>
          <Route path='/health' element={<News useProgress={useProgress} apiKey={apiKey} key={"health"} pageSize={pageSize} country="in" category={"health"}/>}/>
          <Route path='/science' element={<News useProgress={useProgress} apiKey={apiKey} key={"science"} pageSize={pageSize} country="in" category={"science"}/>}/>
          <Route path='/sports' element={<News useProgress={useProgress} apiKey={apiKey} key={"sports"} pageSize={pageSize} country="in" category={"sports"}/>}/>
          <Route path='/technology' element={<News useProgress={useProgress} apiKey={apiKey} key={"technology"} pageSize={pageSize} country="in" category={"technology"}/>}/>
        </Routes>
      </Router>
    )
  }

export default App