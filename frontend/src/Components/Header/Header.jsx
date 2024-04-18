import { useContext } from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/UserContext'

const Header = () => {
  const { authentication } = useContext(Context)

  return (
    <header id='top' className={styles.headerContainer}>
      {/* <h1 className={styles.title}>MyGram</h1> */}
      {!authentication && (
        <Link className={styles.linkLogin} to={'/login'}>Login</Link>
      )}
    </header>
  )
}

export default Header
