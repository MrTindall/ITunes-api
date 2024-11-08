$(document).ready(function() {
    console.log('Connected');

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();

        let searchQuery = $('#searchQuery').val().trim();

        if (searchQuery !== '') {
            const params = {
                term: searchQuery,
                media: 'music',
                limit: 20
            };

            $.get('https://itunes.apple.com/search', params, function(data) {

                $('#results').empty();

                if (data.results.length > 0) {
                    data.results.forEach(function(item) {
                        const resultHTML = `
                            <div class="col-md-3 col-sm-4 col-6 mb-4">
                                <div class="card">
                                    <img src="${item.artworkUrl60}" class="card-img-top" alt="${item.trackName}">
                                    <div class="card-body">
                                        <h5 class="card-title"><a href="${item.trackViewUrl}">${item.trackName}</a></h5>
                                        <p class="card-text"><strong>Artist:</strong> ${item.artistName}</p>
                                        <p class="card-text"><strong>Collection:</strong> ${item.collectionName}</p>
                                        <p class="card-text"><strong>Price:</strong> $${item.collectionPrice}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        $('#results').append(resultHTML);
                    });
                } 
                else {
                    $('#results').empty().append('<div class="col-12"><p>No results found.</p></div>')
                }
            }, 'json');
        } else {
            $('#results').empty().append('<div class="col-12"><p>Enter search term.</p></div>');
        }
    });
});
