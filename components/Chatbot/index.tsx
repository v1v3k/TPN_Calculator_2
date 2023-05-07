import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../Chat'
import clsx from 'clsx'

import styles from './index.module.css';;
 
function Chatbot() {
  return (

        <div className={styles.center}>
      
    
          <Text variant="h2"> Pediatric ER Chat Bot:</Text>
        
          <div className="lg:w-2/3">
          <Chat />
        </div>
        </div>
    
    )
}


export default Chatbot
