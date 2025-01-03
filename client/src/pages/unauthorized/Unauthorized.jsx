import { Link } from 'react-router-dom'
import styles from './Unauthorized.module.css'
import { Button } from '@mui/material'

function Unauthorized() {
    return (
        <section className={styles.mainContainer}>
          <div className={styles.unauthorizedCard}>
            <div className={styles.unauthorizedCardTop}>
              <ion-icon name="close-circle-outline"></ion-icon>
              <h1>Authorization Error</h1>
            </div>
            <div className={styles.unauthorizedCardBody}>
              <p>
                {`We're sorry, but you don't have permission to access this page!`}
              </p>
            </div>
            <div className={styles.unauthorizedCardBottom}>
              <Link to={"/"}>
                <Button>Go to home</Button>
              </Link>
            </div>
          </div>
        </section>
    )
}

export default Unauthorized
