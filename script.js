
const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

// VoiceRSS Javascript SDK



// Passing Joke to Voice API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '3305339edee849edbfea33863d9e7937',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;

        } else {
            joke = data.joke;
        } 
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('oops', error);
    }

}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
