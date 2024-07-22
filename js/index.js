function createChart(data) {
  const mappedData = data.map((d) => ({
    odds: +d.R_odds,
    winStreak: +d.R_current_win_streak,
  }));

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  const width = window.innerWidth - margin.left - margin.right;
  const height = window.innerHeight - margin.top - margin.bottom;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(mappedData, (d) => d.odds))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(mappedData, (d) => d.winStreak))
    .range([height, 0]);

  const maxWinStreakData = d3.max(mappedData, (d) => d.winStreak);
  const maxDataPoint = mappedData.find((d) => d.winStreak === maxWinStreakData);

  const maxOddsData = d3.min(mappedData, (d) => d.odds);
  const maxOddsDataPoint = mappedData.find((d) => d.odds === maxOddsData);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", "translate(0," + yScale(0) + ")") 
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width) 
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Odds");

  svg
    .append("g")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Win Streak");

  svg
    .selectAll("circle")
    .data(mappedData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.odds))
    .attr("cy", (d) => yScale(d.winStreak))
    .attr("r", 5);

  svg
    .append("ellipse")
    .attr("cx", xScale(maxDataPoint.odds))
    .attr("cy", yScale(maxDataPoint.winStreak) - 30)
    .attr("rx", 210) 
    .attr("ry", 30) 
    .style("fill", "none") 
    .style("stroke", "red"); 

  svg
    .append("text")
    .attr("x", xScale(maxDataPoint.odds))
    .attr("y", yScale(maxDataPoint.winStreak) - 30)
    .attr("class", "annotation")
    .style("text-anchor", "middle")
    .text(`Highest win streak: 16, with odds of beating opponent: -480`)
    .style("opacity", 1);
  let xOffset = 200; 

  let yPosEllipse = yScale(maxOddsDataPoint.winStreak) - 5;
  if (yPosEllipse < 30) yPosEllipse = 30;

  svg
    .append("ellipse")
    .attr("cx", xScale(maxOddsDataPoint.odds) + xOffset + 10) 
    .attr("cy", yPosEllipse)
    .attr("rx", 220) 
    .attr("ry", 30) 
    .style("fill", "none")
    .style("stroke", "red");

  let yPosText = yScale(maxOddsDataPoint.winStreak) - 5;
  if (yPosText < 30) yPosText = 30; 

  console.log(maxOddsDataPoint);
  svg
    .append("text")
    .attr("x", xScale(maxOddsDataPoint.odds) + xOffset) 
    .attr("y", yPosText)
    .attr("class", "annotation")
    .style("text-anchor", "middle")
    .text(
      `Highest odds of beating opponent: ${maxOddsDataPoint.odds}, with win streak: ${maxOddsDataPoint.winStreak}`
    )
    .style("opacity", 1);
}

function createChartWeightClass(data, weightClass) {
  const filteredData = data.filter((d) => d.weight_class === weightClass);

  const mappedData = filteredData.map((d) => ({
    odds: +d.R_odds,
    winStreak: Math.floor(+d.R_current_win_streak),
  }));


  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  const width = window.innerWidth - margin.left - margin.right;
  const height = window.innerHeight - margin.top - margin.bottom;

  d3.select("svg").remove();

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(mappedData, (d) => d.odds))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(mappedData, (d) => d.winStreak))
    .range([height, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format("d"));

  svg
    .append("g")
    .attr("transform", "translate(0," + yScale(0) + ")") 
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Odds");

  svg
    .append("g")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Win Streak");

  svg
    .selectAll("circle")
    .data(mappedData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.odds))
    .attr("cy", (d) => yScale(d.winStreak))
    .attr("r", 5);

    const maxWinStreakData = d3.max(mappedData, (d) => d.winStreak);
    const maxDataPoint = mappedData.find(
      (d) => d.winStreak === maxWinStreakData
    );

    svg
      .append("text")
      .attr("x", xScale(maxDataPoint.odds))
      .attr("y", yScale(maxDataPoint.winStreak) - 30)
      .attr("class", "annotation")
      .style("text-anchor", "middle")
      .text(`Highest win streak: ${maxDataPoint.winStreak}, with odds of beating opponent: ${maxDataPoint.odds}`)
      .style("opacity", 1);

    svg
    .append("ellipse")
    .attr("cx", xScale(maxDataPoint.odds))
    .attr("cy", yScale(maxDataPoint.winStreak) - 30)
    .attr("rx", 210) 
    .attr("ry", 30) 
    .style("fill", "none")
    .style("stroke", "red"); 
}

function createChartDropDown(data) {
  const dropdown = d3
    .select("body")
    .append("select")
    .on("change", function () {
      createChartWeightClass(data, this.value);
    });

  const weightClasses = [...new Set(data.map((d) => d.weight_class))];
  dropdown
    .selectAll("option")
    .data(weightClasses)
    .enter()
    .append("option")
    .text((d) => d);

  createChartWeightClass(data, weightClasses[0]);
}

d3.select("svg").remove();
document.getElementById("description").innerHTML =
  "Mixed Martial Arts (MMA) is a full-contact combat sport involving both striking and grappling. MMA was concepted in the 1990s with the introduction of Brazilian Jiu-Jitsu in the United States by the Gracie Family. Today, the Ultimate Fighting Championship (UFC) is the premier MMA organization, and we will be investigating the odds and win streaks of fighters in the UFC. Does a higher win streak correlate with better odds, and likelihood of winning? And does this change across weight classes?";
let currentPage = 1;

document.getElementById("next").addEventListener("click", function () {
  document.getElementById("description").innerHTML = "";
  d3.select("svg").remove();
  d3.select("select").remove();
  currentPage++;

  if (currentPage === 2) {
    d3.csv("data/ufc-master.csv").then((data) => {
      createChart(data);
    });
    document.getElementById("description").innerHTML =
      "We have mapped out the odds and win streaks of UFC fighters, across all weight classes. Note that negative odds indicate that the fighter is favored to win. i.e. -1600 would represent a 94.1% chance of the fighter winning the bout.";
  } else if (currentPage === 3) {
    d3.csv("data/ufc-master.csv").then((data) => {
      createChartWeightClass(data, "Lightweight");
    });
    document.getElementById("description").innerHTML =
      "We have mapped out the odds and win streaks of UFC fighters across the most populous UFC weight class, Lightweight. Although the highest win streak in the weight class was at 13, the odds are not as stark in comparison to some of the odds when fighters have a 1 or 2 fight win streak.";
  } else if (currentPage === 4) {
    d3.csv("data/ufc-master.csv").then((data) => {
      createChartDropDown(data);
    });
    document.getElementById("description").innerHTML = 'Here we have a dropdown menu that allows you to select a specific weight class to investigate. The chart will update to show the odds and win streaks of fighters in the selected weight class. The chart will also highlight the fighter with the highest win streak and the fighter with the highest odds of winning.';
  } else {
    currentPage = 1;
    d3.select("svg").remove();
    document.getElementById("description").innerHTML =
      "Mixed Martial Arts (MMA) is a full-contact combat sport involving both striking and grappling. MMA was concepted in the 1990s with the introduction of Brazilian Jiu-Jitsu in the United States by the Gracie Family. Today, the Ultimate Fighting Championship (UFC) is the premier MMA organization, and we will be investigating the odds and win streaks of fighters in the UFC. Does a higher win streak correlate with better odds, and likelihood of winning? And does this change across weight classes?";
  }
});
