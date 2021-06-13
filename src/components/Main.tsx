import React, { useEffect, useRef } from 'react'
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Menu from './Menu'
import DishDetail from './DishDetail'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Contact from './Contact'
import About from './About'
// import Favorites from './Favorite'
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
  loginUser, logoutUser, signupUser,
  // fetchFavorites, postFavorite, deleteFavorite,
} from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
  // favorites: state.favorites,
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => (
  {
    postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
    fetchDishes: () => {
      dispatch(fetchDishes())
    },
    resetFeedbackForm: () => {
      dispatch(actions.reset('feedback'))
    },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    signupUser: (cred) => dispatch(signupUser(cred)),
    loginUser: (cred) => dispatch(loginUser(cred)),
    logoutUser: () => dispatch(logoutUser()),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(
      postFeedback(firstname, lastname, telnum, email, agree, contactType, message),
    ),
    // 	fetchFavorites: () => dispatch(fetchFavorites()),
    // 	postFavorites: (dishId) => dispatch(postFavorite(dishId)),
    // 	deleteFavorites: (dishId) => dispatch(deleteFavorite(dishId)),
  }
)

function Main({ props }) {
  useEffect(() => {
    props.fetchDishes()
    props.fetchComments()
    props.fetchPromos()
    props.fetchLeaders()
    // props.fetchFavorites()
  }, [props])
  const HomePage = () => (
    <Home
      dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={props.dishes.isLoading}
      dishesErrMess={props.dishes.errMess}
      promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
      promoLoading={props.promotions.isLoading}
      promoErrMess={props.promotions.errMess}
      leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
      leadersLoading={props.leaders.isLoading}
      leadersErrMess={props.leaders.errMess}
    />
  )

  const DishWithId = ({ match }) => (
    // props.auth.isAuthenticated
    // 	?
    <DishDetail
      dish={props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
      isLoading={props.dishes.isLoading}
      errMess={props.dishes.errMess}
      comments={props.comments.comments.filter((comment) => comment._id)}
      commentsErrMess={props.comments.errMess}
      postComment={props.postComment}
      // favorite={props.favorites.favorites.dishes.filter(
      // 	(dish) => dish._id === match.params.dishId)
      // }
      // favorite={false}
      // postFavorite={props.postFavorites}
    />

    // :
    // 	<DishDetail
    // 		dish={props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
    // 		isLoading={props.dishes.isLoading}
    // 		errMess={props.dishes.errMess}
    // 		comments={props.comments.comments.filter((comment) => comment._id)}
    // 		commentsErrMess={props.comments.errMess}
    // 		postComment={props.postComment}
    // 		// favorite={false}
    // 		// postFavorite={props.postFavorites}
    // 	/>

  )

  // const PrivateRoute = ({ component: Component, ...rest }) => (
  // 	<Route
  // 		{...rest}
  // 		render={(props) => (
  // 			props.auth.isAuthenticated
  // 				? <Component {...props} />
  // 				: (
  // 					<Redirect to={{
  // 						pathname: '/home',
  // 						state: { from: props.location },
  // 					}}
  // 					/>
  // 				)
  // 		)}
  // 	/>
  // )

  const MainRoutes = () => {
    const nodeRef = useRef(null)
    return (
      <TransitionGroup>
        <CSSTransition
          nodeRef={nodeRef}
          key={props.location.key}
          classNames="page"
          timeout={300}
        >
          <Switch location={props.location}>
            <Route path="/home" component={HomePage} />
            <Route exact path="/aboutus" component={() => <About leaders={props.leaders} />} />
            <Route
              exact
              path="/menu"
              component={() => (
                <Menu
                  dishes={props.dishes}
                />
              )}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            {/* <PrivateRoute */}
            {/*	exact */}
            {/*	path="/favorites" */}
            {/*	component={() => ( */}
            {/*		<Favorites */}
            {/*			favorites={props.favorites} */}
            {/*			deleteFavorite={props.deleteFavorites} */}
            {/*		/> */}
            {/*	)} */}
            {/* /> */}
            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact
                  resetFeedbackForm={props.resetFeedbackForm}
                  postFeedback={props.postFeedback}
                />
              )}
            />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }

  return (
    <div>
      <Header
        auth={props.auth}
        signupUser={props.signupUser}
        loginUser={props.loginUser}
        logoutUser={props.logoutUser}
      />
      <MainRoutes />
      <Footer />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
