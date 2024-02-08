const express = require("express");
const React = require("react");
const bodyParser = require("body-parser");
const cors = require("cors");
const ReactPDF = require("@react-pdf/renderer");
const Report = require("./template.js");
// const PDFViewer = require("@react-pdf/renderer").PDFViewer;
const fs = require("fs");


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const dynamicData = {
    "title": "CO2 emissions table: Corporate Carbon Footprint 2021",
    "period": "January 2021 - December 2021",
    "emissions": {
      "scope1": {
        "title": "Scope 1",
        "totalCO2": "2.93",
        "percentage": "1.5",
        "sources": [
          {
            "description": "Direct emissions from company facilities.",
            "co2": "2.93",
            "percentage": "1.5"
          },
          {
            "description": "Refrigerant Leakage",
            "co2": "2.93",
            "percentage": "1.5"
          }
        ]
      },
      "scope2": {
        "title": "Scope 2",
        "totalCO2": "142.71",
        "percentage": "73.5",
        "sources": [
          {
            "description": "Purchased heating, steam and cooling for own use",
            "co2": "114.43",
            "percentage": "58.9"
          },
          {
            "description": "Heat(Purchased)",
            "co2": "114.43",
            "percentage": "58.9"
          },
          {
            "description": "Purchased electricity for own use",
            "co2": "28.92",
            "percentage": "14.6"
          },
          {
            "description": "Electricity(Stationary)",
            "co2": "28.92",
            "percentage": "14.6"
          }
        ]
      },
      "scope3": {
        "title": "Scope 3",
        "totalCO2": "48.62",
        "percentage": "25.0",
        "sources": [
          {
            "description": "Fuel and energy-related activities",
            "co2": "27.80",
            "percentage": "14.3"
          },
          {
            "description": "UpStream emissions heat",
            "co2": "19.58",
            "percentage": "10.1"
          },
          {
            "description": "UpStream emissions electricity",
            "co2": "8.22",
            "percentage": "4.2"
          },
          {
            "description": "Employee commuting",
            "co2": "15.98",
            "percentage": "8.2"
          },
          {
            "description": "Rental and private vehicles",
            "co2": "4.84",
            "percentage": "2.5"
          },
          {
            "description": "Business travel",
            "co2": "4.84",
            "percentage": "2.5"
          }
        ]
      }
    },
    "overall": {
      "totalCO2": "194.27",
      "percentage": "100.0"
    }
  }
  
 
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get('/report', async (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

  const pdfStream = await ReactPDF.renderToStream(<Report data={dynamicData} />);
  // res.pipe(pdfStream);
  pdfStream.pipe(res);
  });
  

app.listen(port, () => console.log(`Listening on port ${port}`));