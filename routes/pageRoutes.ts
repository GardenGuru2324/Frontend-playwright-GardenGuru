import "dotenv/config";

export const pageRoutes = {
  loginPage: process.env.BASE_URL,
  regsiterPage: `${process.env.BASE_URL}register`,
  homePage: `${process.env.BASE_URL}`,
  myPlantsPage: `${process.env.BASE_URL}myPlants`,
  profilePage: `${process.env.BASE_URL}profile`,
};
