/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';

import "../styles/home.css";
import handleDownload from "../utils/downloadApp";
import ThanksDownload from "../components/ThanksDownload";

const funnyPrompts = [
  "Even if it's weird",
  "Dare to be goofy",
  "In a world full of seriousness",
  "Celebrate your absurdity",
  "Be proudly bizarre",
  "Why so serious?",
  "Life is short",
  "Opinions are like jokes",
  "Speak your mind",
  "In a world full of voices, be the stand-up",
  "Opinions are the best jokes, so don't keep them to yourself",
  "Dare to be the opinionated",
  "Life's too short for quiet opinions",
  "Express yourself, be funny",
];

const getRandomPrompt = () => {
  const randomIndex = Math.floor(Math.random() * funnyPrompts.length);
  return funnyPrompts[randomIndex];
};

function Home() {
  const [downloaded, setDownloaded] = useState(false);

  const [isApp, setIsApp] = useState(false)

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (downloaded) {
        setTimeout(() => {
            setDownloaded(false);
        }, 3000);
    }
  }, [downloaded])

  useEffect(() => {
    setIsApp(searchParams.get("app") === "true");
  }, [])
  
  

  return (
    <div className="home">
      <ThanksDownload downloaded={downloaded}/>
      <header>
        <h1>SayIt!</h1>
        <div className="header-interact">
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <svg
            fill="#000000"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M0 0h4v4H0V0zm0 6h4v4H0V6zm0 6h4v4H0v-4zM6 0h4v4H6V0zm0 6h4v4H6V6zm0 6h4v4H6v-4zm6-12h4v4h-4V0zm0 6h4v4h-4V6zm0 6h4v4h-4v-4z"
                fill-rule="evenodd"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </header>
      <section className="hero">
        <div className="title">
          <h2>
            {getRandomPrompt()}, <strong>Say It!</strong>
          </h2>
        </div>
        <p>The best app for sharing your thoughts</p>
        <div className="apps">
          <div
            className="app"
            style={{
              display: isApp ? "none" : "flex"
            }}
            onClick={(_) => {
              handleDownload();

              setDownloaded(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            <p>Download Android</p>
          </div>
          <div className="app">
            <p onClick={() => navigate('/signup')}>Get Started</p>
            <img src="/resources/star.svg" alt="" />
          </div>
        </div>
      </section>
      <footer>
        <div className="copy">
          <p className="hover">&copy; Made by MYDAD</p>
          <p className="slogan"> - Where the ideas get fathered!</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
