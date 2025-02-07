// function to get all games from the API
async function getgames() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/games');
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = ''; // Clear existing list

        response.data.games.forEach(game => {
            gamesList.innerHTML += `
                <div class="game-card">
                    <h3>${game.id}</h3>
                    <h3>${game.title}</h3>
                    <p>genre: ${game.genre}</p>
                    <p>price: ${game.price}</p>
                    <p>quantity: ${game.quantity}</p>
                    <p>loan_status: ${game.loan_status}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        alert('Failed to load games');
    }
}

// function to add a new game to the database
async function addgame() {
    const title = document.getElementById('game-title').value;
    const genre = document.getElementById('game-genre').value;
    const price = document.getElementById('game-price').value;
    const quantity = document.getElementById('game-quantity').value;

    try {
        await axios.post('http://127.0.0.1:5000/games', {
            title: title,
            genre: genre,
            price: price,
            quantity: quantity
        });
        
        // Clear form fields
        document.getElementById('game-title').value = '';
        document.getElementById('game-genre').value = '';
        document.getElementById('game-price').value = '';
        document.getElementById('game-quantity').value = '';

        // Refresh the games list
        getgames();
        
        alert('game added successfully!');
    } catch (error) {
        console.error('Error adding game:', error);
        alert('Failed to add game');
    }
} 



async function deleteGame() {
    const id = document.getElementById('game-id')?.value; // Get the game ID safely

    console.log("Game ID entered:", id); // Debugging: Check if ID is being captured

    if (!id) {
        alert('Please enter a game ID.');
        return;
    }

    try {
        const response = await axios.delete(`http://127.0.0.1:5000/games/${id}`);
        console.log("Server Response:", response.data); // Debugging: Check server response

        alert('Game deleted successfully!');
        
        // Clear input field
        document.getElementById('game-id').value = '';

        // Refresh game list
        getgames();
        
    } catch (error) {
        console.error('Error deleting game:', error); // Debugging: Log full error
        alert('Failed to delete game');
    }
}

// Load all games when page loads
document.addEventListener('DOMContentLoaded', getgames);