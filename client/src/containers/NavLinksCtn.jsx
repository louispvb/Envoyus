import { connect } from 'react-redux';
import { NavLinks } from '../components';

const NavLinksCtn = connect(state => state.token) (NavLinks);
export default NavLinksCtn;