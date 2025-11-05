import React from "react";

function Leaderboard() {
  // Sample data for the leaderboard with profile images
  const topPlayers = [
    {
      position: 1,
      name: "Nickname",
      points: 78,
      image: "/assets/image1.jpeg",
    },
    {
      position: 2,
      name: "Nickname",
      points: 78,
      image: "/assets/image1.jpeg",
    },
    {
      position: 3,
      name: "Nickname",
      points: 78,
      image: "/assets/image1.jpeg",
    },
  ];

  const otherPlayers = [
    { position: 4, name: "Nickname", points: 78 },
    { position: 5, name: "Nickname", points: 78 },
    { position: 6, name: "Nickname", points: 78 },
  ];

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
                      src={topPlayers[2].image}
                      alt={`${topPlayers[2].name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white w-8 h-8 rounded-md flex items-center justify-center rotate-45">
                    <span className="transform -rotate-45">3</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white pt-32 pb-2">
                <h2 className="text-2xl font-bold">{topPlayers[2].name}</h2>
                <p className="text-xl">{topPlayers[2].points}pt</p>
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
                      src={topPlayers[0].image}
                      alt={`${topPlayers[0].name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white w-8 h-8 rounded-md flex items-center justify-center rotate-45">
                    <span className="transform -rotate-45">1</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white pt-32 pb-2">
                <h2 className="text-2xl font-bold">{topPlayers[0].name}</h2>
                <p className="text-xl">{topPlayers[0].points}pt</p>
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
                      src={topPlayers[1].image}
                      alt={`${topPlayers[1].name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white w-8 h-8 rounded-md flex items-center justify-center rotate-45">
                    <span className="transform -rotate-45">2</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white pt-32 pb-2">
                <h2 className="text-2xl font-bold">{topPlayers[1].name}</h2>
                <p className="text-xl">{topPlayers[1].points}pt</p>
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
              <div className="text-white text-2xl font-bold">{player.name}</div>
              <div className="text-white text-xl">{player.points}pt</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
