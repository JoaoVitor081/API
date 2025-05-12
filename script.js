document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const playerIdInput = document.getElementById('playerId');
    const loadingElement = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const rankDisplay = document.getElementById('rankDisplay');

    const rankIcons = {
        'Grand Champion': 'https://rocket-league.com/content/media/items/avatar/220px/6e45b487d21591939628.png',
        'Champion': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png',
        'Diamond': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png',
        'Platinum': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png',
        'Gold': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png',
        'Silver': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png',
        'Bronze': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png',
        'Unranked': 'https://rocket-league.com/content/media/items/avatar/220px/a337dd99e21591939627.png'
    };

    searchBtn.addEventListener('click', async function() {
        const playerId = playerIdInput.value.trim();
        
        if (!playerId) {
            alert('Por favor, insira um Player ID');
            return;
        }
        loadingElement.style.display = 'block';
        errorMessage.style.display = 'none';
        rankDisplay.style.display = 'none';

        try {

            const url = `https://rocket-league1.p.rapidapi.com/ranks/${playerId}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'rocket-league1.p.rapidapi.com',
                    'User-Agent': 'RapidAPI Playground',
                    'Accept-Encoding': 'identity'
                }
            };

            const response = await fetch(url, options);

            const result = await response.json();
            
            loadingElement.style.display = 'none';
            
            updateRankDisplay(result);
            rankDisplay.style.display = 'block';
            
        } catch (error) {
            console.error('Error:', error);
            loadingElement.style.display = 'none';
            errorMessage.style.display = 'block';
        }
    });

    function updateRankDisplay(data) {
        console.log(data);
        document.getElementById('rankName').textContent = data.rank || 'Grand Champion';
        document.getElementById('playlistName').textContent = data.playlist || 'Ranked 3v3 Standard';
        document.getElementById('division').textContent = data.division || 'IV';
        document.getElementById('mmr').textContent = data.mmr || '1520';
        document.getElementById('matchesPlayed').textContent = data.matches_played || '245';
        document.getElementById('winStreak').textContent = data.win_streak || '3';

        const rankName = data.rank || 'Grand Champion';
        const rankIconUrl = rankIcons[rankName.split(' ')[0]] || rankIcons['Grand Champion'];
        document.getElementById('rankIcon').src = rankIconUrl;
    }
    const sampleData = {
        rank: "Grand Champion III",
        playlist: "Ranked 2v2",
        division: "III",
        mmr: "1785",
        matches_played: "320",
        win_streak: "5"
    };
});