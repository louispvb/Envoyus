import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { performSearch } from '../actions/userActions';
import { ListingGrid } from '../components/ListingGrid';

const mapStateToProps = state => ({
  listData: state.listings
});

const ListingGridCtn = connect(mapStateToProps)(ListingGrid);

export default ListingGridCtn;
