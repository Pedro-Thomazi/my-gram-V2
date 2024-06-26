import { useContext, useState } from 'react';
import styles from './UserPublications.module.scss'
import { FaHeart, FaRegComment, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/UserContext';

const UserPublications = ({ myPubli, configs }) => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { deletePublication } = useContext(Context)


  function funcDeletePublication(id, token) {
    deletePublication(id, token)
  }

  return (
    <div className={styles.myPublicationsContainer}>
      {configs.map((publi, index) => (
        <div key={index} className={styles.publication}>
          <Link to={`/publication/${publi._id}`} className={styles.containerImgs}>
            <img src={`http://localhost:5050/images/publications/${publi.images[0]}`} alt={`Publicação de ${publi.user.name}`} />
            <div className={styles.details}>
              {publi.images.length !== 1 && (
                <p>
                  <span>{publi.images.length}</span>
                  <FaPlus className={styles.moreImages} size={25} color='white' />
                </p>
              )}
              <div>
                <p><span>{publi.likes.length}</span> <FaHeart size={25} /></p>
                <p><span>{publi.comments.length}</span> <FaRegComment size={25} /></p>
              </div>
            </div>
          </Link>
          {myPubli === true && <button className={styles.redBtn} onClick={() => funcDeletePublication(publi._id, token)}>Excluir</button>}
        </div>
      ))}
    </div>
  )
}

export default UserPublications
