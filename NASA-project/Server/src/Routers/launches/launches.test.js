const request = require("supertest");
const app = require("../../app");
describe("Test GET /launches", () => {
  test("It should response with 200 success", async () => {
    const response = await request(app)
      .get("/v1/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "USS Enterprice",
    rocket: "Roshan Rocket",
    target: "Kepler-62 f",
    launchDate: "July 30, 2030",
  };
  const launchDataWithoutDate = {
    mission: "USS Enterprice",
    rocket: "Roshan Rocket",
    target: "Kepler-62 f",
  };
  const launchDataWithInvalidDate = {
    mission: "USS Enterprice",
    rocket: "Roshan Rocket",
    target: "Kepler-62 f",
    launchDate: "Invalid Date Test",
  };

  test("It should response with 200 success", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing require launch property",
    });
  });
  test("It should catch invalid date", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid Launch Date",
    });
  });
});
