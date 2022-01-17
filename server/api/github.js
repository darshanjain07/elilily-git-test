var express = require("express");
const router = express.Router();
const axios = require("axios");

// Github configuration
const client_id = "0d04e545553dc9b7d0e0";
const client_secret = "e4d9756ae3cec3bff4c11f74b08ac7eaa96d8466";
// const redirect_uri = "http://localhost:3000/users"

router.get("/generate/access_token", function (req, res) {
  const { query } = req;
  const { code } = query;

  console.log(code);

  if (!code) {
    res.status(400)({
      success: false,
      message: "Error, No code found.",
    });
    return;
  }

  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id,
        client_secret,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      console.log(response);
      if (response) {
        if (response.data.access_token) {
          let data = {
            access_token: response.data.access_token,
          };

          res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: data,
          });
        } else {
          res.status(200).json({
            success: false,
            message: "Error",
            data: response.data.error_description,
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Failed",
        data: error.error_description,
      });
    });
});

module.exports = router;
