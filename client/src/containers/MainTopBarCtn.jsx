import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import identity from 'lodash/fp/identity';
import { performSearch } from '../actions/userActions';
import { MainTopBar } from '../components/MainTopBar';

const mapDispatchToProps = dispatch => ({
  onSubmit: compose(dispatch, performSearch)
})

const MainTopBarCtn = connect(identity, mapDispatchToProps)(MainTopBar);

export default MainTopBarCtn;
