document.addEventListener("DOMContentLoaded", function() {
    const bmiForm = document.getElementById("bmiForm");
    const resultDiv = document.getElementById("result");
    const bmiValueP = document.getElementById("bmiValue");
    const bmiCategoryP = document.getElementById("bmiCategory");

    bmiForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value) / 100; // convert cm to meters

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert("Please enter valid values for weight and height.");
            return;
        }

        const bmi = weight / (height * height);
        const roundedBmi = bmi.toFixed(1);

        bmiValueP.textContent = ` ${roundedBmi}`;

        let category;
        if (bmi < 18.5) {
            category = "Kurus";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal";
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Berat Badan Lebih";
        } else {
            category = "Obesitas";
        }

        bmiCategoryP.textContent = `Kategori: ${category}`;

        resultDiv.style.display = "block";
    });

    bmiForm.addEventListener("reset", function() {
        resultDiv.style.display = "none";
    });
});

function downloadResult() {
    const bmiValue = document.getElementById("bmiValue").textContent;
    const bmiCategory = document.getElementById("bmiCategory").textContent;
    const result = `${bmiValue}\n${bmiCategory}`;

    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BMI_Result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
