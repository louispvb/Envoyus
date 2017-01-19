import { connect } from 'react-redux';
import { performSearch } from '../actions/userActions';
import { MainTopBar } from '../components/MainTopBar';
import compose from 'lodash/fp/compose';
import identity from 'lodash/fp/identity';

const mapDispatchToProps = dispatch => ({
  onSubmit: compose(dispatch, performSearch)
})

const MainTopBarCtn = connect(identity, mapDispatchToProps) (MainTopBar);

export default MainTopBarCtn;