/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../styles/post.css";
import StyledHashtag from "./StyledHashtag";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
dayjs.extend(relativeTime);

// Post component displays a single post with interactions
function Post({ post }) {
  // State variables for post interactions
  const [liked, setLiked] = useState(false);

  const [likeCount, setLikeCount] = useState(0);

  const [openDetails, setOpenDetails] = useState(false);

  const [detailsProfile, setDetailsProfile] = useState(false);

  // Update state based on post data when component mounts
  useEffect(() => {
    setLiked(post.liked);

    setLikeCount(post.likes.length);
  }, []);

  // Function to handle liking or disliking a post
  const likePost = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/like/${post._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      // Update like count and like status based on the response
      setLikeCount((prevLikeCount) => (liked ? prevLikeCount - 1 : prevLikeCount + 1));

      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/disliking post:", error.response.data);
    }
  };

  // Function to handle deleting a post
  const deletePost = async () => {
    if (post.isOwner) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${post._id}`,
          {
            withCredentials: true,
          }
        );

        // Reload the page after successful deletion
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting post:", error.response.data);
      }
    }
  };

  const svgDots = (
    <svg
      onClick={() => setOpenDetails(!openDetails)}
      viewBox="0 0 24 24"
      fill="none"
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
          d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z"
          fill="#000000"
        ></path>{" "}
        <path
          d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
          fill="#000000"
        ></path>{" "}
        <path
          d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
          fill="#000000"
        ></path>{" "}
      </g>
    </svg>
  );

  const svgHeart = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );

  const svgHeartRed = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
          fill="#ff0000"
        ></path>{" "}
      </g>
    </svg>
  );

  // JSX structure for the Post component
  return (
    <li className="post">
      <div className="profilePostInfo">
        <div
          style={{
            display: detailsProfile ? "flex" : "none",
          }}
          className="profileInfoNav"
        >
          <div className="profileHead">
            <img
              src={post.postOwner?.profilePicture ?? "/resources/profile.svg"}
              width={100}
              height={100}
              alt=""
            />
            <div className="info">
              <h3>{post.postOwner?.name}</h3>
              <p>{post.postOwner?.pronouns}</p>
            </div>
          </div>
          <div className="extra">
            <p className="aboutMeP">Profile created {dayjs(post.postOwner?.createdAt).fromNow()}</p>
            <p className="aboutMeP">About me</p>
            <p>{post.postOwner?.description}</p>
          </div>
        </div>
        <img
          onClick={() => setDetailsProfile(!detailsProfile)}
          src={post.postOwner?.profilePicture ?? "/resources/profile.svg"}
          width={100}
          height={100}
          alt=""
        />
        <div className="postInfo">
          <h3>{post.postOwner.name}</h3>
          <p>{dayjs(post.createdAt).fromNow()}</p>
        </div>

        <ul
          style={{
            display: openDetails ? "flex" : "none",
          }}
          className="details"
        >
          <li>
            <button>Report</button>
          </li>
          <li>
            <button
              onClick={() => deletePost()}
              style={{ color: "red", display: post.isOwner ? "block" : "none" }}
            >
              Delete
            </button>
          </li>
        </ul>
        {svgDots}
      </div>
      <StyledHashtag text={post.content} />
      <div className="interactions">
        <div onClick={() => likePost()} className="heart">
          {liked ? svgHeartRed : svgHeart}
        </div>
        <p>{likeCount}</p>
      </div>
    </li>
  );
}

export default Post;
