const fs = require("fs");

fs.readFile("./data.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);
    const benefitObjects = data.employeeContext.options.benefitConfig;
    const onceOfftypes = [
      "FIRST_PAY_PERIOD",
      "LAST_PAY_PERIOD",
      "ONCE_OFF_FROM_ACTIVATION",
    ];

    const benefitArray = Object.entries(benefitObjects).map(([id, data]) => {
      return {
        id,
        activationDate: data?.activationDate ?? false,
        terminationDate: data?.terminationDate ?? false,
        employerContributionOverride: data?.employerOverride ?? false,
      };
    });

    benefitArray.forEach((benefit) => {
      data.employerContributions.forEach((contribution) => {
        if (
          benefit.id === contribution.config?.benefitConfiguration?.benefitId
        ) {
          benefit.name = contribution?.config?.subtype;
          benefit.localCurrency = data.exchangeRatesContext.localCurrencyCode
          benefit.invoiceAmount = contribution?.amount; // this is NOT equivilent to monthlyContributionAmount 
          benefit.markupPercent =
            contribution.config.benefitConfiguration.benefitAdminExpense;

          if (contribution.config?.annual) {
            benefit.cadence = "annual";
          } else if (
            onceOfftypes.includes(contribution.config?.conditions[0]?.type)
          ) {
            benefit.cadence = "onceOff";
          } else {
            benefit.cadence = "monthly";
          }
        }
      });
    });
    console.log(benefitArray);


  } catch (err) {
    console.log("Error parsing JSON:", err);
  }
});
