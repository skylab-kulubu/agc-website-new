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
            image: item.user.profilePictureUrl || "/agc.png", // Fallback image
            isPlaceholder: !item.user.profilePictureUrl,
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
    return { name: "-", points: "-", image: "/agc.png", isPlaceholder: true };
  };

  return (
    <div id="puanlar" className="py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="mb-16 flex justify-center">
        <img
          src="/assets/leaderboard/leaderboard_sticker.png"
          alt="Puan Tablosu"
          className="w-auto h-32 md:h-48 drop-shadow-2xl"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Podium Section */}
        <div className="flex justify-center items-end relative h-96 mb-12 gap-4">
          {/* 3rd Place */}
          <div className="w-1/3 flex flex-col justify-end items-center">
            <div className="relative z-10 mb-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-orange-500 to-red-500 shadow-lg shadow-orange-500/20">
                <img
                  src={getTopPlayer(2).image}
                  alt={`${getTopPlayer(2).name}'s profile`}
                  className={`w-full h-full rounded-full border-4 border-[#0f172a] ${getTopPlayer(2).isPlaceholder ? "object-contain p-2 bg-slate-800" : "object-cover"}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = "/agc.png"; }}
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-orange-500">
                3
              </div>
            </div>
            <div className="w-full glass rounded-t-2xl p-4 flex flex-col items-center justify-end h-48 border-t-4 border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent">
              <h2 className="text-lg md:text-xl font-bold text-center text-white line-clamp-1">{getTopPlayer(2).name}</h2>
              <p className="text-orange-400 font-semibold">{getTopPlayer(2).points}pt</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="w-1/3 flex flex-col justify-end items-center z-20 -mb-4">
            <div className="relative z-10 mb-4">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-4xl">👑</div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-300 to-yellow-600 shadow-xl shadow-yellow-500/30">
                <img
                  src={getTopPlayer(0).image}
                  alt={`${getTopPlayer(0).name}'s profile`}
                  className={`w-full h-full rounded-full border-4 border-[#0f172a] ${getTopPlayer(0).isPlaceholder ? "object-contain p-2 bg-slate-800" : "object-cover"}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = "/agc.png"; }}
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-yellow-300 text-lg">
                1
              </div>
            </div>
            <div className="w-full glass rounded-t-2xl p-4 flex flex-col items-center justify-end h-64 border-t-4 border-yellow-500 bg-gradient-to-b from-yellow-500/10 to-transparent">
              <h2 className="text-xl md:text-2xl font-bold text-center text-white line-clamp-1">{getTopPlayer(0).name}</h2>
              <p className="text-yellow-400 font-bold text-xl">{getTopPlayer(0).points}pt</p>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="w-1/3 flex flex-col justify-end items-center">
            <div className="relative z-10 mb-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-gray-300 to-gray-500 shadow-lg shadow-gray-500/20">
                <img
                  src={getTopPlayer(1).image}
                  alt={`${getTopPlayer(1).name}'s profile`}
                  className={`w-full h-full rounded-full border-4 border-[#0f172a] ${getTopPlayer(1).isPlaceholder ? "object-contain p-2 bg-slate-800" : "object-cover"}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = "/agc.png"; }}
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-gray-400">
                2
              </div>
            </div>
            <div className="w-full glass rounded-t-2xl p-4 flex flex-col items-center justify-end h-56 border-t-4 border-gray-400 bg-gradient-to-b from-gray-500/10 to-transparent">
              <h2 className="text-lg md:text-xl font-bold text-center text-white line-clamp-1">{getTopPlayer(1).name}</h2>
              <p className="text-gray-300 font-semibold">{getTopPlayer(1).points}pt</p>
            </div>
          </div>
        </div>

        {/* Other Players List */}
        <div className="space-y-3">
          {otherPlayers.map((player, index) => (
            <div
              key={index}
              className="glass rounded-xl px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-lg font-bold w-8 text-center">{player.position}</span>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <img src={player.image} alt={player.name} className={`w-full h-full ${player.isPlaceholder ? "object-contain p-1 bg-slate-800" : "object-cover"}`} onError={(e) => { e.target.onerror = null; e.target.src = "/agc.png"; }} />
                </div>
                <div className="text-white text-lg font-medium">{player.name}</div>
              </div>
              <div className="text-blue-400 font-bold text-lg">{player.points}pt</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
