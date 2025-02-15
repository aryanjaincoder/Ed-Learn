import React, { useState, useEffect } from "react";
import "./Blog.css";

const API_KEY = "AIzaSyBkCPaEM652q0jo7oK9rY6TX0QYn20yAi0";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEO_DETAILS_URL = "https://www.googleapis.com/youtube/v3/videos";
const PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const PLAYLIST_DETAILS_URL = "https://www.googleapis.com/youtube/v3/playlists"; // Used to get playlist details
const CHANNEL_DETAILS_URL = "https://www.googleapis.com/youtube/v3/channels"; // Used to get channel details

export default function Blog() {
  const [activeSection, setActiveSection] = useState("video");
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLectureComplete, setIsLectureComplete] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  // Sample Notes Data
  const notes = [
    { title: "Introduction to C Programming", downloadLink: "/notes/c_programming.pdf" },
    { title: "Data Structures & Algorithms", downloadLink: "/notes/dsa_notes.pdf" },
    { title: "Operating System Basics", downloadLink: "/notes/os_notes.pdf" },
  ];

  const fetchResults = async (type, pageToken = "") => {
    if (!query) return;
    setLoading(true);
    setContentType(type);
    setSelectedVideo(null);
    setPlaylistVideos([]);
    setVideos([]);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `${BASE_URL}?part=snippet&maxResults=9&q=${query} IT Computer Science&type=${type}&pageToken=${pageToken}&key=${API_KEY}`
      );
      const data = await response.json();
      let results = [];

      if (type === "video") {
        const videoIds = data.items.map((video) => video.id.videoId).join(",");
        const detailsResponse = await fetch(
          `${VIDEO_DETAILS_URL}?part=statistics&id=${videoIds}&key=${API_KEY}`
        );
        const detailsData = await detailsResponse.json();
        const videoDetails = detailsData.items;

        results = data.items.map((video, index) => ({
          id: video.id.videoId,
          thumbnail: video.snippet.thumbnails.medium.url,
          views: videoDetails[index]?.statistics.viewCount || "N/A",
        }));
      } else if (type === "playlist") {
        results = data.items.map((item) => ({
          id: item.id.playlistId,
          thumbnail: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          playlistId: item.id.playlistId, // store playlist ID for fetching its videos
          channelId: item.snippet.channelId, // Store channelId to fetch subscriber count
        }));
      }

      setVideos(results);
      setNextPageToken(data.nextPageToken || null);
      setPrevPageToken(data.prevPageToken || null);
    } catch (error) {
      console.error("Error fetching results:", error);
    }

    setLoading(false);
  };

  const fetchPlaylistDetails = async (playlistId) => {
    try {
      const response = await fetch(
        `${PLAYLIST_DETAILS_URL}?part=snippet,contentDetails&id=${playlistId}&key=${API_KEY}`
      );
      const data = await response.json();
      const totalVideos = data.items[0]?.contentDetails.itemCount || 0;
      return totalVideos;
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      return 0;
    }
  };

  const fetchChannelSubscribers = async (channelId) => {
    try {
      const response = await fetch(
        `${CHANNEL_DETAILS_URL}?part=statistics&id=${channelId}&key=${API_KEY}`
      );
      const data = await response.json();
      const subscriberCount = data.items[0]?.statistics.subscriberCount || "N/A";
      return subscriberCount;
    } catch (error) {
      console.error("Error fetching channel details:", error);
      return "N/A";
    }
  };

  const fetchPlaylistVideos = async (playlistId, channelId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${PLAYLIST_ITEMS_URL}?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items.length > 0) {
        setPlaylistVideos(data.items);
        setCurrentVideoIndex(0);
        playVideo(data.items[0].snippet.resourceId.videoId);
      }

      const subscriberCount = await fetchChannelSubscribers(channelId); // Fetch subscribers when playlist is clicked
      return subscriberCount;

    } catch (error) {
      console.error("Error fetching playlist videos:", error);
    }
    setLoading(false);
  };

  const playVideo = (videoId) => {
    setSelectedVideo(videoId);
    setIsLectureComplete(false);
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < playlistVideos.length - 1) {
      const nextIndex = currentVideoIndex + 1;
      setCurrentVideoIndex(nextIndex);
      playVideo(playlistVideos[nextIndex].snippet.resourceId.videoId);
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      const prevIndex = currentVideoIndex - 1;
      setCurrentVideoIndex(prevIndex);
      playVideo(playlistVideos[prevIndex].snippet.resourceId.videoId);
    }
  };

  const handleVideoEnd = () => {
    setIsLectureComplete(true); // Marks the lecture as complete when the video ends
  };

  return (
    <div className="blog-container">
      <h1 className="title">Explore IT & Computer Science Lectures</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for lectures..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => fetchResults("video")} className="search-button">
          Search
        </button>
      </div>

      {searchPerformed && (
        <div className="tabs">
          <button className={contentType === "video" ? "active-tab" : ""} onClick={() => fetchResults("video")}>
            Videos
          </button>
          <button className={contentType === "playlist" ? "active-tab" : ""} onClick={() => fetchResults("playlist")}>
            Playlists
          </button>
          <button className={activeSection === "notes" ? "active-tab" : ""} onClick={() => setActiveSection("notes")}>
            Notes
          </button>
          <button className={activeSection === "news" ? "active-tab" : ""} onClick={() => setActiveSection("news")}>
            News
          </button>
        </div>
      )}

      {/* Notes Section */}
      {activeSection === "notes" && (
        <div className="notes-section">
          <h2>Download Lecture Notes 📚</h2>
          <div className="notes-grid">
            {notes.map((note, index) => (
              <div key={index} className="note-card">
                <h3>{note.title}</h3>
                <a href={note.downloadLink} download className="download-button">
                  Download ⬇
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Player */}
      {selectedVideo && (
        <div className="video-player">
          <button className="close-button" onClick={() => setSelectedVideo(null)}>✖</button>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo}?enablejsapi=1`}
            title="YouTube Video Player"
            frameBorder="0"
            allowFullScreen
            id="youtube-player"
            onEnded={handleVideoEnd} // This triggers when the video ends
          ></iframe>

          <div className="video-navigation">
            {playlistVideos.length > 0 && (
              <>
                <button className="prev-video" onClick={handlePrevVideo} disabled={currentVideoIndex === 0}>
                  Previous Video
                </button>
                <button className="next-video" onClick={handleNextVideo} disabled={currentVideoIndex === playlistVideos.length - 1}>
                  Next Video
                </button>
              </>
            )}
          </div>

          <button className="complete-lecture-button" disabled={!isLectureComplete}>
            PRACTICE QUESTIONS
          </button>
        </div>
      )}

      {/* Video Grid */}
      <div className="video-grid">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          videos.map((item) => (
            <div key={item.id} className="video-card" onClick={() =>
              contentType === "video" ? playVideo(item.id) : fetchPlaylistVideos(item.id, item.channelId)
            }>
              <img src={item.thumbnail} alt="Thumbnail" className="video-thumbnail" />
              <p className="video-info">
                {contentType === "playlist"
                  ? `Subscribers: ${item.subscriberCount}`
                  : `Views: ${item.views}`}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {prevPageToken && (
          <button className="prev-results" onClick={() => fetchResults(contentType, prevPageToken)}>
            ⬅ Previous Results
          </button>
        )}
        {nextPageToken && (
          <button className="next-results" onClick={() => fetchResults(contentType, nextPageToken)}>
            Next Results ➡
          </button>
        )}
      </div>
    </div>
  );
}

