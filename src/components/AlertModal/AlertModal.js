import React, { Fragment } from 'react'
import './AlertModal.css'
import ReactDOM from 'react-dom'
import SolidButton from '../SolidButton/SolidButton'

const AlertModal = ({ isAlert, hide, children }) =>
  !isAlert
    ? null
    : ReactDOM.createPortal(
        <Fragment>
          <div className="alert-modal-overlay" />
          <div
            className="alert-modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hide}
          >
            <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
              <div className="alert-modal-content">{children}</div>
              <div className="alert-modal-footer">
                <SolidButton
                  text="thanks"
                  fontSize="1rem"
                  margin="1.5rem auto 0"
                  handleClick={hide}
                />
              </div>
            </div>
          </div>
        </Fragment>,
        document.body
      )

export default AlertModal
