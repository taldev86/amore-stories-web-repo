import React, { useEffect, useState } from 'react';
import styles from './DashboardStats.module.css';
import UserInfo from '../FirebaseStore/UserInfo';
import LogoutModal from '../Modals/LogOutModal';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigation = useNavigate()
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    const userData = await UserInfo()
    setUser(userData)
    // console.log(userData.favorites)
  }
  useEffect(() => {
    getData()
  }, [])

  console.log(user)

  const handleLogout = () => {
    // Show custom alert modal
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Perform logout actions
    console.log('Logout confirmed');
    localStorage.clear()
    setIsModalOpen(false);
    navigation('/')
  };

  const handleCloseModal = () => {
    // Close custom alert modal
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>

      <div className={`row ${styles.row} CardsParent`}>
        <div className={`col ${styles.col}`}>
          <div className={`card ${styles.card} ${styles.radius10} ${styles.borderStart} ${styles.borderInfo}`}>
            <div className={`card-body ${styles.cardBody}`}>
              <div className={`d-flex align-items-center ${styles.alignItemsCenter}`}>
                <div>
                  <i className="fa fa-user"></i>

                  <p className={`mb-0 text-secondary ${styles.textSecondary}`}>User Info</p>
                  <h4 className={`my-1 text-info ${styles.textInfo}`}>Email</h4>
                  <p className={`mb-0 font-13 ${styles.font13}`}>{user != null ? user.email : "No email found yet"}</p>
                </div>
                <div className={`widgets-icons-2 rounded-circle ${styles.widgetsIcons2} ${styles.bgGradientScooter} ${styles.textWhite} ms-auto`}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col ${styles.col}`}>
          <div className={`card ${styles.card} ${styles.radius10} ${styles.borderStart} ${styles.borderInfo}`}>
            <div className={`card-body ${styles.cardBody}`}>
              <div className={`d-flex align-items-center ${styles.alignItemsCenter}`}>
                <div>
                  <i className="fa fa-money"></i>

                  <p className={`mb-0 text-secondary ${styles.textSecondary}`}>Total Coin</p>
                  <h4 className={`my-1 text-info ${styles.textInfo}`}>{user != null ? user.points : "00"}</h4>
                  <p className={`mb-0 font-13 ${styles.font13}`}>Purchase</p>
                </div>
                <div className={`widgets-icons-2 rounded-circle ${styles.widgetsIcons2} ${styles.bgGradientScooter} ${styles.textWhite} ms-auto`}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col ${styles.col}`}>
          <div className={`card ${styles.card} ${styles.radius10} ${styles.borderStart} ${styles.borderInfo}`}>
            <div className={`card-body ${styles.cardBody}`}>
              <div className={`d-flex align-items-center ${styles.alignItemsCenter}`}>
                <div>
                  <i className="fa fa-shopping-cart"></i>

                  <p className={`mb-0 text-secondary ${styles.textSecondary}`}>Favourites</p>
                  <h4 className={`my-1 text-info ${styles.textInfo}`}>{user != null ? user.favorites.length : "00"}</h4>
                  <p className={`mb-0 font-13 ${styles.font13}`}>Read</p>
                </div>
                <div className={`widgets-icons-2 rounded-circle ${styles.widgetsIcons2} ${styles.bgGradientScooter} ${styles.textWhite} ms-auto`}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col ${styles.col}`}>
          <div className={`card ${styles.card} ${styles.radius10} ${styles.borderStart} ${styles.borderInfo}`}>
            <div className={`card-body ${styles.cardBody}`}>
              <div className={`d-flex align-items-center ${styles.alignItemsCenter}`}>
                <div>
                  <i className="fa fa-phone"></i>

                  <p className={`mb-0 text-secondary ${styles.textSecondary}`}>You can</p>
                  <h4 className={`my-1 text-info ${styles.textInfo}`}>Contact</h4>
                  <p className={`mb-0 font-13 ${styles.font13}`}>us here</p>
                </div>
                <div className={`widgets-icons-2 rounded-circle ${styles.widgetsIcons2} ${styles.bgGradientScooter} ${styles.textWhite} ms-auto`}>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`col ${styles.col}`}>
          <div className={`card ${styles.card} ${styles.radius10} ${styles.borderStart} ${styles.borderInfo}`}>
            <div className={`card-body ${styles.cardBody}`}>
              <div className={`d-flex align-items-center ${styles.alignItemsCenter}`}>
                <div>
                  <i className="fa fa-book"></i>

                  <p className={`mb-0 text-secondary ${styles.textSecondary}`}>You Can</p>
                  <h4 className={`my-1 text-info ${styles.textInfo}`}>Read</h4>
                  <p className={`mb-0 font-13 ${styles.font13}`}>Book Here</p>
                </div>
                <div className={`widgets-icons-2 rounded-circle ${styles.widgetsIcons2} ${styles.bgGradientScooter} ${styles.textWhite} ms-auto`}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col ${styles.col}`}>
          <div className={`card ${styles.card} ${styles.radius10} ${styles.borderStart} ${styles.borderInfo}`}>
            <div className={`card-body ${styles.cardBody}`}>
              <div className={`d-flex align-items-center ${styles.alignItemsCenter}`}>
                <div onClick={() => handleLogout()}>
                  <i className="fa fa-user"></i>

                  <p className={`mb-0 text-secondary ${styles.textSecondary}`}>To</p>
                  <h4 className={`my-1 text-danger ${styles.textInfo}`}>Log Out</h4>
                  <p className={`mb-0 font-13 ${styles.font13}`}>Click here</p>
                </div>
                <div className={`widgets-icons-2 rounded-circle ${styles.widgetsIcons2} ${styles.bgGradientScooter} ${styles.textWhite} ms-auto`}>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add other columns */}
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default UserDashboard;
