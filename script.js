document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const translatedQuoteElement = document.getElementById('translated-quote');
    const newQuoteButton = document.getElementById('new-quote');

    function fetchRandomQuote() {
        fetch('https://dummyjson.com/quotes/random')
            .then(res => res.json())
            .then(data => {
                quoteElement.innerText = data.quote;
                translateToFarsi(data.quote);
            })
            .catch(error => {
                quoteElement.innerText = 'خطایی رخ داده است. لطفا دوباره امتحان کنید.';
                console.error('Error fetching the quote:', error);
            });
    }

    function translateToFarsi(text) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&dt=t&q=${encodeURIComponent(text)}`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                translatedQuoteElement.innerText = data[0][0][0];
            })
            .catch(error => {
                translatedQuoteElement.innerText = 'خطایی در ترجمه رخ داده است.';
                console.error('Error translating the quote:', error);
            });
    }

    newQuoteButton.addEventListener('click', fetchRandomQuote);

    // Fetch the first quote on initial load
    fetchRandomQuote();
});
