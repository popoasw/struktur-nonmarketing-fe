import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="ml-1">PT. Pharos Indonesia &copy; {new Date().getFullYear()}</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
