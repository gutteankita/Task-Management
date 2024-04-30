import React from 'react'

const ActiveMenuContext = React.createContext({
  isActive: 'INITIAL',
  changeActiveMenu: () => {},
})

export default ActiveMenuContext