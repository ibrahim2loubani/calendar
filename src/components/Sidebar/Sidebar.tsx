import css from './Sidebar.module.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiFillCalendar, AiOutlineTable, AiOutlineLogout } from 'react-icons/ai'
import { FaTasks } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.png'

const Sidebar = () => {
  return (
    <div className={css.container}>
      <img src={logo} alt='logo' className={css.logo} />

      <div className={css.menu}>
        <NavLink to='calendar' className={css.item} title='Calendar'>
          <AiFillCalendar size={30} />
        </NavLink>

        <NavLink to='#' className={css.item} title='Logout'>
          <AiOutlineLogout size={30} />
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
