import React, { Component } from "react";
import Navbar from "../../app/layout/nav/Navbar/Navbar";
import format from "date-fns/format";

import { connect } from "react-redux";

// import { firestoreConnect } from "react-redux-firebase";
import Listing from "../listing/Listing/Listing";
import Banner from "../../app/layout/Banner/Banner";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ListingAd from "../listing/Listing/ListingAd";
import { getListingsForSearch } from "../listing/listingActions";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  connectRefinementList,
  connectHits,
  Stats,
  Pagination,
  connectCurrentRefinements
} from "react-instantsearch-dom";

import { Link } from "react-router-dom";
import "./Search.css";

const mapState = state => ({
  listings: state.listings,
  // listings: state.firestore.ordered.listings,
  loading: state.async.loading
});

const actions = {
  getListingsForSearch
};

const Hits = ({ hits }) => (
  <div className="row">
    {hits.map(hit => (
      <Listing key={hit.objectID} listing={hit} />
    ))}
  </div>
);

const CustomHits = connectHits(Hits);

// const Hit = ({ hit }) => (
//   <div className="row">
//     <Link to={`/listing/${hit.id}`} className="col-6">
//       <img
//         src={hit.images[0].imageURL || `/assets/swaptr-listing.jpg`}
//         alt="img"
//         className="listing-img img-thumbnail"
//       />
//       <h6 className="ml-1 listing-title">{hit.title}</h6>
//       {/* <div className="hit-name ml-1 listing-title">
//       <Highlight attribute="title" hit={hit} />
//     </div> */}
//       <div className="ml-1 text-secondary text-uppercase text-location-date">
//         {hit.city}
//         <span
//           className="text-muted mr-1 display-none"
//           style={{ float: "right" }}
//         >
//           {format(hit.created, "MMM DD")}
//         </span>
//       </div>
//     </Link>
//   </div>
// );

const ClearRefinements = ({ items, refine, isMobile, closeNav }) => (
  <button
    onClick={() => {
      refine(items);
      if (isMobile) {
        closeNav();
      }
    }}
    disabled={!items.length}
    className="btn btn-info ml-auto mr-auto rounded-0"
  >
    <span className="">Clear Filters</span>
  </button>
);

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

const Sidebar = () => (
  <div className="mt-2 mt-md-4 col-md-3 swaptr-refinements">
    <h5>Location</h5>
    <CustomRefinementList attribute="filterCity" isMobile={false} />
    <CustomClearRefinements isMobile={false} />
  </div>
);

// const Content = () => (
//   <div className="mt-md-4 col-md-9 col-sm-12 search-content">
//     <Stats />
//     <CustomHits></CustomHits>

//     <div className="mt-2 mb-xs-1">
//       <Pagination
//         showFirst={false}
//         showPrevious
//         showNext
//         totalPages={10}
//       ></Pagination>
//     </div>
//   </div>
// );

const RefinementList = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
  closeNav,
  isMobile
}) => (
  <ul className="refinements-list-ul">
    {/* <li>
      <input
        type="search"
        onChange={event => searchForItems(event.currentTarget.value)}
      />
    </li> */}
    {items.map(item => (
      <li key={item.label} className="">
        <a
          href={createURL(item.value)}
          style={{ fontWeight: item.isRefined ? "bold" : "" }}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
            //close overlay
            //check if screen small then closeNav
            if (isMobile) {
              closeNav();
            }
          }}
          className="ml-auto mr-auto refinements-overlay"
        >
          {isFromSearch ? (
            <Highlight attribute="label" hit={item} />
          ) : (
            item.label
          )}{" "}
          ({item.count})
        </a>
      </li>
    ))}
  </ul>
);

const CustomRefinementList = connectRefinementList(RefinementList);

class SearchResultPage extends Component {
  state = {
    moreListings: false,
    loadingInitial: true,
    loadedListings: [],
    showFilter: false
  };

  openNav = () => {
    this.setState({
      showFilter: true
    });
  };
  closeNav = () => {
    this.setState({
      showFilter: false
    });
  };

  render() {
    const { loading } = this.props;
    const {
      loadingInitial,
      loadedListings,
      moreListings,
      showFilter
    } = this.state;
    const { openNav, closeNav } = this;
    let loadingComponent;
    if (loadingInitial) {
      loadingComponent = (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3">
          <LoadingComponent />
        </div>
      );
    } else {
      loadingComponent = "";
    }
    // const { id } = this.props.match.params;
    let filterOverlay;
    if (showFilter) {
      filterOverlay = (
        // <!-- The overlay -->
        <div className="overlay show-overlay">
          {/* <!-- Button to close the overlay navigation --> */}
          <button
            className="btn text-white closebtn"
            onClick={() => closeNav()}
          >
            &times;
          </button>

          {/* <!-- Overlay content --> */}
          <div className="overlay-content">
            <CustomRefinementList
              attribute="filterCity"
              closeNav={closeNav}
              isMobile={true}
            />
            <CustomClearRefinements closeNav={closeNav} isMobile={true} />
          </div>
        </div>
      );
    } else {
      filterOverlay = (
        // <!-- The overlay -->
        <div className="overlay">
          {/* <!-- Button to close the overlay navigation --> */}
          <button className="closebtn" onClick={() => closeNav()}>
            &times;
          </button>

          {/* <!-- Overlay content --> */}
          <div className="overlay-content">
            {/* <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a> */}
            <CustomRefinementList
              attribute="filterCity"
              closeNav={closeNav}
              isMobile={true}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        {/* <Navbar cityValue={id} /> */}
        {/* <Banner /> */}
        <InstantSearch
          apiKey="7ef488caf95aaa89b58e0f99e6b1d8e8"
          appId="GY8Q3VM3Y9"
          indexName="listings"
        >
          <header className="header margin-top-search">
            {/* <img src='instant_search'></img> */}
            <div className="ml-auto mr-auto border border-secondary search-box-swaptr">
              <SearchBox
                // defaultRefinement={"mum"}
                translations={{ placeholder: "Search For Product" }}
                showLoadingIndicator={true}
                autoFocus={true}
              />
            
            </div>
            {/* <Banner/> */}
          </header>
          <main className="row  ml-auto mr-auto search-main">
            <Sidebar />
            {/* <Content /> */}

            {filterOverlay}
            <div className="mt-md-4 col-md-9 col-sm-12 search-content">
              <button
                className="mt-2 btn btn-primary rounded-0 filter-button"
                onClick={() => openNav()}
              >
                filter location
              </button>
              <Stats />

              <CustomHits></CustomHits>

              <div className="mt-2 mb-xs-1">
                <Pagination
                  showFirst={false}
                  showPrevious
                  showNext
                  totalPages={10}
                ></Pagination>
              </div>
            </div>
          </main>
        </InstantSearch>

        {/* //TODO: Add FB type loading */}
        {loading && (
          <div>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(SearchResultPage);
