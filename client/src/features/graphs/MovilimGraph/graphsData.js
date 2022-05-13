export const sderotGraphData = [
  {
    name: "שדרות",
    colorByPoint: true,
    data: [
      {
        name: "שדרה 1",
        y: 50,
        color: "red",
      },
      {
        name: "שדרה 2",
        y: 30,
        color: "orange",
      },
      {
        name: "שדרה 3",
        y: 10,
        color: "yellow",
      },
      {
        name: "שדרה 4",
        y: 5,
        color: "white",
      },
      {
        name: "שדרה 5",
        y: 5,
        color: "green",
      },
    ],
  },
];

// function getOrhaStatus(name, orhot) {
//   let orhaStatus = "";
//   let maxMovilim = 0;

//   for (const orha of orhot) {
//     if (name === orha.name) {
//       for (let i = 0 ; i < orha.data.length ; i++) {

//         if(orha.data[i].y > maxMovilim) {
//           orhaStatus = orha.data[i].name;
          
//         }
//       }
//     }
//   }
// console.log(orhaStatus);
//   return orhaStatus;
// }

// function for when real data will be brought and their devation time will be option
// function deviationColor(time) {
//   if (time >= 0 && time < 30) {
//     return "white";
//   } else if (time >= 30 && time < 60) {
//     return "orange";
//   } else if (time >= 60) {
//     return "red";
//   }
// }

export const movilimGraphDrilldownData = [
  {
    name: "אורחה 1",
    id: "אורחה 1",
    data: [
      { name: "בהעמסה", y: 1, color: "white", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "יצא לדרך", y: 2, color: "orange", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "בפריקה", y: 3, color: "red", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "הגיע ליעד", y: 4, color: "white", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "בתדלוק", y: 5, color: "red", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
    ],
  },
  {
    name: "אורחה 2",
    id: "אורחה 2",
    data: [
      { name: "בהעמסה", y: 2, color: "white", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "בפריקה", y: 2, color: "orange", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "יצא לדרך", y: 4, color: "white", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "בתדלוק", y: 3, color: "red", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
    ],
  },
  {
    name: "אורחה 3",
    id: "אורחה 3",
    data: [
      { name: "בהעמסה", y: 1, color: "white", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "בפריקה", y: 3, color: "orange", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
      { name: "יצא לדרך", y: 2, color: "red", dataLabels: {
      format: "<p><b>{point.name}</b>: {point.percentage:.1f}%</p>",
    } },
    ],
  },
];

export const movilimGraphData = [
  {
    name: "אורחות",
    colorByPoint: true,
    data: [
      {
        name: "אורחה 1",
        y: movilimGraphDrilldownData[0].data.length,
        drilldown: "אורחה 1",
        color: "red",
        dataLabels: {
      format: "<p><b>33.3% :בתדלוק</p>",
    }
      },
      {
        name: "אורחה 2",
        y: movilimGraphDrilldownData[1].data.length,
        drilldown: "אורחה 2",
        color: "white",
         dataLabels: {
      format: "<p><b>יצאו לדרך: 36.4% </p>",
    }
      },
      {
        name: "אורחה 3",
        y: movilimGraphDrilldownData[2].data.length,
        drilldown: "אורחה 3",
        color: "orange",
         dataLabels: {
      format: "<p><b>בפריקה: 50%</p>",
    }
      },
    ],
  },
];
