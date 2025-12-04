import React, { useState, useEffect } from "react";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://api.yildizskylab.com/api/competitors/leaderboard?eventTypeName=AGC"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          // Map API data to component format
          const formattedData = result.data.map((item) => ({
            position: item.rank,
            name: `${item.user.firstName} ${item.user.lastName}`,
            points: item.totalScore || 0, // Default to 0 if null
            image: item.user.profilePictureUrl || "/assets/default-avatar.png", // Fallback image
          }));
          setLeaderboardData(formattedData);
        } else {
          setError(result.message || "Failed to fetch leaderboard data");
        }
      } catch (e) {
        setError(e.message);
        console.error("Error fetching leaderboard:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center py-24 text-white">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="text-center py-24 text-red-500">Error: {error}</div>;
  }

  // Split into top 3 and others
  const topPlayers = leaderboardData.slice(0, 3);
  const otherPlayers = leaderboardData.slice(3);

  // Helper to safely get player data or return placeholder
  const getTopPlayer = (index) => {
    if (topPlayers[index]) {
      return topPlayers[index];
    }
    return { name: "-", points: "-", image: "/assets/default-avatar.png" };
  };

  return (
    <div id="puanlar" className="p-24 w-full mx-auto">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/assets/leaderboard/leaderboard_sticker.png"
          alt="Puan Tablosu"
          className="w-auto h-48"
        />
      </div>

      <div className="mx-24">
        {/* Podium Section */}
        <div className="flex justify-center items-end relative h-100 ">
          {/* 3rd Place */}
          <div className="w-1/3 h-full flex flex-col justify-end">
            <div className="bg-gradient-to-t from-[#0E2A44] to-[#ED5035] rounded-t-lg pb-2 relative h-48">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center overflow-hidden border-4 border-white">
                    <img
                      src={getTopPlayer(2).image}
                      alt={`${getTopPlayer(2).name}'s profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/assets/default-avatar.png"; }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white w-8 h-8 rounded-md flex items-center justify-center rotate-45">
                    <span className="transform -rotate-45">3</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white pt-32 pb-2">
                <h2 className="text-2xl font-bold">{getTopPlayer(2).name}</h2>
                <p className="text-xl">{getTopPlayer(2).points}pt</p>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="w-1/3 h-full flex flex-col justify-end z-10">
            <div className="bg-gradient-to-t from-[#0E2A44] to-[#F5F626] rounded-t-lg pb-2 relative h-100">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={getTopPlayer(0).image}
                      alt={`${getTopPlayer(0).name}'s profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/assets/default-avatar.png"; }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white w-8 h-8 rounded-md flex items-center justify-center rotate-45">
                    <span className="transform -rotate-45">1</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white pt-32 pb-2">
                <h2 className="text-2xl font-bold">{getTopPlayer(0).name}</h2>
                <p className="text-xl">{getTopPlayer(0).points}pt</p>
              </div>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="w-1/3 h-full flex flex-col justify-end">
            <div className="bg-gradient-to-t from-[#0E2A44] to-[#2FA631] rounded-t-lg pb-2 relative h-72">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center overflow-hidden border-4 border-white">
                    <img
                      src={getTopPlayer(1).image}
                      alt={`${getTopPlayer(1).name}'s profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/assets/default-avatar.png"; }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white w-8 h-8 rounded-md flex items-center justify-center rotate-45">
                    <span className="transform -rotate-45">2</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white pt-32 pb-2">
                <h2 className="text-2xl font-bold">{getTopPlayer(1).name}</h2>
                <p className="text-xl">{getTopPlayer(1).points}pt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Players List */}
        <div className="">
          {otherPlayers.map((player, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#4EC1EE] to-[#122EE5] rounded-lg mb-2 px-4 py-10 flex justify-between items-center"
            >
              <div className="flex items-center">
                <span className="text-white text-xl font-bold mr-4 w-8">{player.position}</span>
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white">
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "/assets/default-avatar.png"; }} />
                </div>
                <div className="text-white text-2xl font-bold">{player.name}</div>
              </div>
              <div className="text-white text-xl">{player.points}pt</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
