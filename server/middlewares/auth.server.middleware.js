const express = require("express");
const jwt = require("jsonwebtoken");

// Takes the token and verifies if the user is authenticated
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.t;

  if (!token) {
    req.isAuthenticated = false;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.isAuthenticated = false;
      return next();
    }
    req.isAuthenticated = true;
    req.user = { _id: decoded._id };
    next();
  });
};
