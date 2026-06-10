async function generateWithReplicate(imageData, prompt) {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
            'Authorization': 'Token YOUR_REPLICATE_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            version: "stability-ai/stable-diffusion:VERSION_ID",
            input: {
                image: imageData,
                prompt: prompt,
                prompt_strength: 0.8,
                num_inference_steps: 50
            }
        })
    });
    
    const prediction = await response.json();
    
    // انتظار انتهاء التوليد
    let result;
    while (true) {
        await new Promise(r => setTimeout(r, 1000));
        const status = await fetch(prediction.urls.get, {
            headers: {'Authorization': 'Token YOUR_REPLICATE_API_KEY'}
        });
        result = await status.json();
        if (result.status === 'succeeded') break;
    }
    
    return result.output;
}