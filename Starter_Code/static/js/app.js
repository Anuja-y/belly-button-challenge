// URL with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Display the default plots
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Fetch the JSON data
  d3.json(url).then((data) => {
    console.log("Data:", data);

    let names = data.names;

    // Iterate through the names array
    names.forEach((name) => {
      // Append each name as an option to the dropdown menu
      dropdownMenu
        .append("option")
        .text(name)
        .property("value", name);
    });

    // Assign the first name to the name variable
    let name = names[0];

    // Call the functions to make the demographic panel, bar chart, bubble chart, and gauge chart
    demo(name);
    bar(name);
    bubble(name);
    gauge(name);
  });
}

// Demographics panel
function demo(selectedValue) {
  // Fetch the JSON data
  d3.json(url).then((data) => {
    console.log("Data:", data);

    // An array of metadata objects
    let metadata = data.metadata;

    // Filter data where id matches the selected value
    let filteredData = metadata.filter((meta) => meta.id == selectedValue);

    // Assign the first object to the obj variable
    let obj = filteredData[0];

    // Clear the child elements in the div with id "sample-metadata"
    let panel = d3.select("#sample-metadata");
    panel.html("");

    // Convert the object to an array of [key, value] pairs
    let entries = Object.entries(obj);

    // Iterate through the entries array
    // Add an h5 child element for each key-value pair to the div with id "sample-metadata"
    entries.forEach(([key, value]) => {
      panel
        .append("h5")
        .classed("panel-text", true)
        .text(`${key}: ${value}`);
    });

    // Log the entries array
    console.log("Entries:", entries);
  });
}

// Bar chart
function bar(selectedValue) {
  // Fetch the JSON data
  d3.json(url).then((data) => {
    console.log("Data:", data);

    // An array of sample objects
    let samples = data.samples;

    // Filter data to selected value
    let filteredData = samples.filter((sample) => sample.id === selectedValue);

    // Assign the first object to the obj variable
    let obj = filteredData[0];

    // Horizontal bar chart trace
    let trace = [
      {
        x: obj.sample_values.slice(0, 10).reverse(),
        y: obj.otu_ids
          .slice(0, 10)
          .map((otu_id) => `OTU ${otu_id}`)
          .reverse(),
        text: obj.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        marker: {
          color: "rgb(68, 166, 198)",
        },
        orientation: "h",
      },
    ];

    // Bar chart layout
    let layout = {
      margin: { t: 30, l: 150 },
      xaxis: {
        title: "Sample Values",
      },
      yaxis: {
        title: "OTU IDs",
        tickfont: {
          size: 10,
        },
      },
    };

    // Use Plotly to plot bar chart
    Plotly.newPlot("bar", trace, layout);
  });
}

// Bubble chart
function bubble(selectedValue) {
  // Fetch the JSON data
  d3.json(url).then((data) => {
    console.log("Data:", data);

    // An array of sample objects
    let samples = data.samples;

    // Filter data to the selected value
    let filteredData = samples.filter((sample) => sample.id === selectedValue);

    // Assign the first object to the obj variable
    let obj = filteredData[0];

    // Trace for the data for the bubble chart
    let trace = [
      {
        x: obj.otu_ids,
        y: obj.sample_values,
        text: obj.otu_labels,
        mode: "markers",
        marker: {
          size: obj.sample_values,
          color: obj.otu_ids,
          colorscale: "Viridis",
        },
      },
    ];

    // Set the layout for the bubble chart
    let layout = {
      margin: { t: 30 },
      xaxis: {
        title: "OTU ID",
      },
      yaxis: {
        title: "Sample Values",
      },
    };

    // Use Plotly to plot bubble chart
    Plotly.newPlot("bubble", trace, layout);
  });
}

// Gauge chart
function gauge(selectedValue) {
  // Fetch the JSON data
  d3.json(url).then((data) => {
    console.log("Data:", data);

    // An array of metadata objects
    let metadata = data.metadata;

    // Filter data to the selected value
    let filteredData = metadata.filter((meta) => meta.id == selectedValue);

    // Assign the first object to the obj variable
    let obj = filteredData[0];

    // Gauge chart trace
    let trace = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: obj.wfreq,
        title: {
          text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
          font: { size: 24 },
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "rgb(68, 166, 198)" },
          steps: [
            { range: [0, 1], color: "rgb(233, 245, 248)" },
            { range: [1, 2], color: "rgb(218, 237, 244)" },
            { range: [2, 3], color: "rgb(203, 230, 239)" },
            { range: [3, 4], color: "rgb(188, 223, 235)" },
            { range: [4, 5], color: "rgb(173, 216, 230)" },
            { range: [5, 6], color: "rgb(158, 209, 225)" },
            { range: [6, 7], color: "rgb(143, 202, 221)" },
            { range: [7, 8], color: "rgb(128, 195, 216)" },
            { range: [8, 9], color: "rgb(113, 187, 212)" },
            { range: [9, 10], color: "rgb(98, 180, 207)" },
          ],
        },
      },
    ];

    // Layout for the gauge chart
    let layout = {
      margin: { t: 30, r: 30, l: 30, b: 30 },
    };

    // Use Plotly to plot guage chart
    Plotly.newPlot("gauge", trace, layout);
  });
}

// Toggle to selected plot when option changed
function optionChanged(selectedValue) {
  demo(selectedValue);
  bar(selectedValue);
  bubble(selectedValue);
  gauge(selectedValue);
}

init();
