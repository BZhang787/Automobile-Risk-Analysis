document.addEventListener('DOMContentLoaded', function () {
    // Initialize form input variables
    const carMake = document.getElementById('make');
    const carModel = document.getElementById('model');
    const carYear = document.getElementById('year');
    const carMileage = document.getElementById('mileage');
    const imageCount = document.getElementById('imageCount');
    const listingPrice = document.getElementById('listingPrice');
    const analysisResult = document.getElementById('analysisResult');
    const analysisContent = document.getElementById('analysisContent');

    // Function to construct the ChatGPT prompt
    function constructPrompt() {
        return `Analyze the legitimacy of this car listing based on the following details: Make: ${carMake.value}, Model: ${carModel.value}, Year: ${carYear.value}, Mileage: ${carMileage.value}, Number of Images: ${imageCount.value}, Listing Price: ${listingPrice.value}. Provide a detailed explanation and a legitimacy score from 0 to 10.`;
    }

    function showLoadingSpinner() {
        document.getElementById('loadingSpinner').style.display = 'block';
    }

    // Function to hide the loading spinner
    function hideLoadingSpinner() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    // Function to handle the analyze button click
    document.getElementById('analyzeButton').addEventListener('click', async function () {
        showLoadingSpinner();
        let prompt = constructPrompt();
        let response = await fetch('/chatGPT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: "system", content: "The following task requires an analysis of automotive listings. The user will input details about a car's make, model, year, mileage, number of images from the posting, and the current listing price as shown on a social media marketplace. Your job is to use this information to assess whether the listing seems reasonable, overpriced, or potentially a scam. Consider factors such as the car's market value, average pricing for the model given its year and mileage, and common indicators of scams. Provide a detailed explanation of your assessment, including any red flags or positive indicators you identify. Finally, assign a legitimacy score from 0 to 10, with decimals allowed, where 10 signifies a highly legitimate listing and 0 indicates a high probability of being a scam. Your analysis will help the user make an informed decision about the listing." }, { role: "user", content: prompt }] })
        });
        let data = await response.json();
        hideLoadingSpinner();
        displayAnalysisResult(data);
    });

    // Function to display the analysis result
    function displayAnalysisResult(data) {
        analysisContent.innerHTML = data.choices[0].message.content;
        analysisResult.style.display = 'block';
    }
});