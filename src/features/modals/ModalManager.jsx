import React from "react";
import { connect } from "react-redux";
import TestModal from "./TestModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetLinkSuccessModal from "./ResetLinkSuccessModal";
import EmailModal from "./EmailModal";
import PhoneNumberModal from "./PhoneNumberModal";
import CancelListingModal from "./CancelListingModal";
import UnauthModal from "../modals/UnauthModal";
import SwapModal from "./SwapModal";
import ShareModal from './ShareModal';

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal,
  ForgotPasswordModal,
  ResetLinkSuccessModal,
  EmailModal,
  PhoneNumberModal,
  CancelListingModal,
  UnauthModal,
  SwapModal,
  ShareModal
};
const mapState = state => ({
  currentModal: state.modals
});
const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapState)(ModalManager);
