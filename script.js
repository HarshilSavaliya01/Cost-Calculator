let pipeCostPerBox = 0; // store for step 2 use

function calculatePipeCost() {
  const ID = parseFloat(document.getElementById('innerDiameter').value);
  const pipeLength = parseFloat(document.getElementById('pipeLength').value);
  const boxLength = parseFloat(document.getElementById('boxLength').value);
  const ratePerKg = parseFloat(document.getElementById('ratePerKg').value);

  const resultDiv = document.getElementById('pipeResult');
  const extraSection = document.getElementById('extraCostSection');

  if (!ID || !pipeLength || !boxLength || !ratePerKg) {
    resultDiv.textContent = "⚠️ Please fill all required fields.";
    return;
  }

  const couplingThickness = 1.5;
  const mainThickness = 1.25;
  const ratePerGram = ratePerKg / 1000;

  const weightCoupling = (ID * couplingThickness * pipeLength) / 375;
  const newID = ID + 3;
  const weightMainPipe = (newID * mainThickness * pipeLength) / 375;
  const totalWeight = weightCoupling + weightMainPipe;

  const numberOfBoxes = Math.floor(pipeLength / boxLength);
  if (numberOfBoxes === 0) {
    resultDiv.textContent = "⚠️ Box length too large for the given pipe length.";
    return;
  }

  pipeCostPerBox = (totalWeight / numberOfBoxes) * ratePerGram;

  resultDiv.innerHTML = `<div class="pipe-cost">📦 Rate of Pipe used per Box: ₹${pipeCostPerBox.toFixed(2)}</div>`;

  // Show extra cost section now
  extraSection.classList.remove('hidden');
}

function calculateFinalCost() {
  const costTopBottom = parseFloat(document.getElementById('costTopBottom').value) || 0;
  const costPrintTopBottom = parseFloat(document.getElementById('costPrintTopBottom').value) || 0;
  const costLabel = parseFloat(document.getElementById('costLabel').value) || 0;
  const labourCharges = parseFloat(document.getElementById('labourCharges').value) || 0;
  const marginPercent = parseFloat(document.getElementById('marginPercent').value) || 0;

  const resultDiv = document.getElementById('finalResult');

  if (!pipeCostPerBox) {
    resultDiv.textContent = "⚠️ First calculate pipe rate per box.";
    return;
  }

  const totalExtraCost = (costTopBottom * 2) + (costPrintTopBottom * 2) + costLabel + labourCharges;
  const totalCosting = pipeCostPerBox + totalExtraCost;
  const sellingPrice = totalCosting + (totalCosting * marginPercent / 100);

  resultDiv.innerHTML = `
    <div>➕ Extra Costs: ₹${totalExtraCost.toFixed(2)}</div>
    <div>💰 Total Costing (Pipe + Extras): ₹${totalCosting.toFixed(2)}</div>
    <div>🚀 Selling Price (with ${marginPercent}% margin): ₹${sellingPrice.toFixed(2)}</div>
  `;
}

function convertInchToMM() {
  const inchValue = parseFloat(document.getElementById('inchInput').value);
  const resultDiv = document.getElementById('inchResult');

  if (isNaN(inchValue) || inchValue <= 0) {
    resultDiv.textContent = "⚠️ Please enter a valid inch value.";
    return;
  }

  const mmValue = inchValue * 25.4;
  resultDiv.textContent = `${inchValue} inch = ${mmValue.toFixed(2)} mm`;
}
