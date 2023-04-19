import moment from 'moment/moment'
import css from './Layout.module.css'
import { BiSearch } from 'react-icons/bi'
import Sidebar from '../Sidebar/Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FC } from 'react'
import profile from '../../images/profile.png'

const Layout: FC = () => {
  const { pathname } = useLocation()

  return (
    <div className={css.container}>
      <Sidebar />

      {/* making the dashboard as the default route */}
      {pathname === '/' && <Navigate to='/calendar' />}

      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className='gradient-red'></div>
          <div className='gradient-orange'></div>
          <div className='gradient-blue'></div>
        </div>

        <div className={css.header}>
          <span>{moment().format('dddd, Do MMM YYYY')}</span>

          <div className={css.searchBar}>
            <BiSearch size={20} />
            <input type='text' placeholder='Search' />
          </div>

          <div className={css.profile}>
            <img src={profile} alt='person image' />
            <div className={css.details}>
              <span>John Doe</span>
              <span>johndoe@gmail.com</span>
            </div>
          </div>
        </div>

        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
