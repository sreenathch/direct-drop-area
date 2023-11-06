import React from 'react'
import ReactDOM from 'react-dom'
import DirectDropArea from '../../src'

import styles from './styles.css'


const acceptedFilesType = 'image/*'

class App extends React.Component {

    render() {
    return (
      <div className={styles.app}>
        <DirectDropArea
            dontRead
            accept={acceptedFilesType}
            onDrop={(file) => {
                console.log(file)
            }}
            handleClick={false}>
            {({ over, overDocument }) => (
                <div
                    style={{
                        ...(over
                            ? { opacity: '50%', border: '5px dashed green' }
                            : {}),
                        width: '600px',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '5px solid black',
                        margin: '50px'
                    }}
                >this is a drop zone </div>)}
        </DirectDropArea>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
