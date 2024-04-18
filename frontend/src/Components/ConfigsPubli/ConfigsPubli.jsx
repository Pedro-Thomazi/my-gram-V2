import { Link } from 'react-router-dom'
import styles from './ConfigsPubli.module.scss'
import {Context} from '../../Context/UserContext'
import { useContext } from 'react'

const ConfigsPubli = ({ openMenu, idPubli, btnCancel }) => {
  const {goTop} = useContext(Context)
  return (
    <div className={`${styles.containerConfigsPubli} ${openMenu ? styles.open : ''}`}>
      <Link onClick={goTop} to={`/denounce/${idPubli}`} className={styles.colorRed}>Denunciar</Link>
      {/* <Link to={"/my-publication"}>Editar</Link>
      <button className={styles.colorRed}>Excluir</button> */}
      <button onClick={btnCancel}>Cancelar</button>
    </div>
  )
}

export default ConfigsPubli
