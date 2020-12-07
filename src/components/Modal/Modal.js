import React, { Fragment } from 'react'
import './Modal.css'
import ReactDOM from 'react-dom'

const Modal = ({ isVisible, hide, children }) =>
  !isVisible
    ? null
    : ReactDOM.createPortal(
        <Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hide}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-content">{children}</div>
            </div>
          </div>
        </Fragment>,
        document.body
      )

export default Modal
