// Fetch JSON and load content into the panel when the panel is expanded
document.addEventListener('DOMContentLoaded', () => {
    const collapseElement = document.getElementById('collapseOne');
    const contentElement = document.getElementById('content');

    collapseElement.addEventListener('shown.bs.collapse', () => {
        // Fetch the JSON file
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Get the current date
                const today = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD

                // Find the matching entry for today's date
                const content = data.find(entry => entry.date === today);

                // Display the content if there's a match
                if (content) {
                    contentElement.innerHTML = `
                        <p>${content.date}</p>
                        <p>${content.text}</p>
                        ${content.image ? `<img src="${content.image}" alt="${content.text}" style="max-width: 100%; height: auto;">` : ''}
                    `;
                } else {
                    contentElement.innerHTML = `
                        <h1>No Content for Today</h1>
                        <p>Please check back later.</p>
                    `;
                }
            })
            .catch(error => {
                contentElement.innerHTML = '<p>Error loading content.</p>';
                console.error('Error fetching JSON data:', error);
            });
    });
});