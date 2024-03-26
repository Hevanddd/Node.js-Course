import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../../../config";

describe("Date.nager API", () => {
  describe("/AvailableCountries", () => {
    test("should return 200 and all available countries", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        "/AvailableCountries"
      );

      expect(status).toEqual(200);
      body.forEach((element: any) => {
        expect(element).toEqual({
          countryCode: expect.any(String),
          name: expect.any(String),
        });
      });
    });
  });
  describe("/LongWeekend", () => {
    test("should return 200 and long weekend for a given country", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        "/LongWeekend/2024/UA"
      );

      expect(status).toEqual(200);
      body.forEach((element: any) => {
        expect(element).toEqual({
          startDate: expect.any(String),
          endDate: expect.any(String),
          dayCount: expect.any(Number),
          needBridgeDay: expect.any(Boolean),
        });
      });
    });
  });
});
