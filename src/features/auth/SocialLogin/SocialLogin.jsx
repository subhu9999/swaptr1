import React from "react";
//kstwlkfgha_1558592756@tfbnw.net
const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <button
        type="button"
        style={{ marginBottom: "10px", backgroundColor: "#4267B2" }}
        className="btn btn-block text-light rounded-0 "
        onClick={() => socialLogin("facebook")}
      >
        <i className="fab fa-facebook-square fa-lg mr-2 " />{" "}
        <span className="text-uppercase  font-weight-bold">
          Continue with Facebook
        </span>
      </button>

      <button
        type="button"
        style={{ backgroundColor: "#D74937" }}
        className="btn btn-block text-light rounded-0 "
        onClick={() => socialLogin("google")}
      >
        <i className="fab fa-google fa-lg mr-2" />
        <span className="text-uppercase  font-weight-bold">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
