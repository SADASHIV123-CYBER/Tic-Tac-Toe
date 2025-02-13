import './App.css'
import DeveloperName from './components/DeveloperName/DeveloperName'
// import Grid from './components/Grid/Grid'
import Grid from './components/Grid/Grid'

function App() {

  return (
    <>
      <Grid numberOfCards={9} />
      <div>
        <DeveloperName />
      </div>
    </>
  )
}

export default App
