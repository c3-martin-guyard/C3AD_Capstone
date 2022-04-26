# Captsone C3AD
Martin Guyard



Metric assignment: `IsOutage, NumberOfOutages` compound metrics

### Part 1
- Create a method to calculate the average lifespan of SmartBulbs and add it to your remixed SmartBulb Type and SmartBulb.js
- Declare and implement a method on the WeeklyEnergyUsage Type that gives the energy used (kWh) in the last week for SmartBulbs, as well as all the SmartBulbs in an Apartment, Building, and City. 
- Build an Analytics Container Engine data flow to create high daily electrical energy usage (kWh) alerts for SmartMeterElectric. 
    - Have the output of this analytic go to a new SmartMeterEvent Type that records events for all categories of SmartMeter - ELECTRIC, GAS, and WATER. 
        - This builds in future capacity to have other Smart Meter categories in your application
    - Add a field to the SmartMeter Type to collect SmartMeterEvents