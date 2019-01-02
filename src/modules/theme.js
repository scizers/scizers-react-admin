

const initialState = {
  collapsed: false,
  navTheme: 'dark', // theme for nav menu
  // theme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false // sticky siderbar
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_SIDEBAR_COLLAPSED':
      console.log(state)
      return {
        ...state,
        collapsed: !state.collapsed
      }

    default:
      return state
  }
}
