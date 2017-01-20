import { connect } from 'react-redux';
import { performSearch } from '../actions/userActions';
import { ListingGrid } from '../components/ListingGrid';
import compose from 'lodash/fp/compose';

const mapStateToProps = state => {
  return {
    listData: state.listings
  };
};

const ListingGridCtn = connect(mapStateToProps) (ListingGrid);

export default ListingGridCtn;