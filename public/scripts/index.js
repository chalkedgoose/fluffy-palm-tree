const hrefInput = document.querySelector('#href-input');
const linkOutput = document.querySelector('#link-output');

// sends request to shortening endpoint and modifies the DOM.
async function fetchUrl() {
    try {
        console.log({
            href: hrefInput.value
        })
        const data = await fetch('/shorten', {
            method: 'POST',
            headers: {
                "Same-Source": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                href: hrefInput.value
            })
        });
        const parsed = await data.json();
        linkOutput.textContent = parsed.href;
    } catch (error) {
        console.log(error);
        linkOutput.textContent = error.message
    }
}