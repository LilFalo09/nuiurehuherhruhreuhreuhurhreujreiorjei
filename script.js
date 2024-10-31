document.getElementById("generate-btn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt-input").value;

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    // Disable the button to prevent multiple requests
    const button = document.getElementById("generate-btn");
    button.disabled = true;
    button.innerText = "Generating...";

    try {
        // Call the image generation API
        const response = await fetch("https://api.replicate.com/v1/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer r8_2oAf7K6l19RNLaR5Fd9MibqlIVcVb3s2D41vd`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: "512x512"
            })
        });

        const data = await response.json();

        if (data.data && data.data[0].url) {
            const imageUrl = data.data[0].url;
            document.getElementById("generated-image").src = imageUrl;
            document.getElementById("generated-image").style.display = "block";
        } else {
            alert("Failed to generate image.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        alert("Error generating image. Check the console for details.");
    }

    // Re-enable the button
    button.disabled = false;
    button.innerText = "Generate Image";
});
