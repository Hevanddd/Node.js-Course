import { validateInput, shortenPublicHoliday } from "../helpers";
import { PublicHoliday, PublicHolidayShort } from "../types";

describe("validateInput function", () => {
  test("should return true for valid input", () => {
    const currentYear = new Date().getFullYear();
    expect(validateInput({ year: currentYear, country: "GB" })).toEqual(true);
  });

  test("should throw error for invalid country", () => {
    expect(() => validateInput({ country: "Japan" })).toThrow(
      "Country provided is not supported, received: Japan"
    );
  });

  test("should throw error for invalid year", () => {
    expect(() => validateInput({ year: 2022 })).toThrow(
      "Year provided not the current, received: 2022"
    );
  });
});

describe("shortenPublicHoliday function", () => {
  test("should return a shortened PublicHoliday object", () => {
    const holiday: PublicHoliday = {
      date: "2024-12-25",
      localName: "Christmas Day",
      name: "Christmas Day",
      countryCode: "US",
      fixed: true,
      global: true,
      counties: null,
      launchYear: null,
      types: ["Public"],
    };

    const expectedShortenedHoliday: PublicHolidayShort = {
      date: "2024-12-25",
      localName: "Christmas Day",
      name: "Christmas Day",
    };

    expect(shortenPublicHoliday(holiday)).toEqual(expectedShortenedHoliday);
  });
});
