import axios from "axios";
// import getGenderByName from "./get-gender-by-name";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";
import { PublicHoliday } from "../../types";
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../../config";

const listOfPublicHolydaysMock: PublicHoliday[] = [
  {
    date: "2024-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "US",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2024-01-15",
    localName: "Martin Luther King, Jr. Day",
    name: "Martin Luther King, Jr. Day",
    countryCode: "US",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
];

const listOfShortenPublicHolidaysMock = [
  { date: "2024-01-01", localName: "New Year's Day", name: "New Year's Day" },
  {
    date: "2024-01-15",
    localName: "Martin Luther King, Jr. Day",
    name: "Martin Luther King, Jr. Day",
  },
];

const currentYear = new Date().getFullYear();

describe("getListOfPublicHolidays", () => {
  test("should call API and return response", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listOfPublicHolydaysMock })
      );

    const response = await getListOfPublicHolidays(
      currentYear,
      SUPPORTED_COUNTRIES[0]
    );

    expect(response).toEqual(listOfShortenPublicHolidaysMock);
  });
  test("should throw error for invalid country", async () => {
    await expect(getListOfPublicHolidays(currentYear, "Japan")).rejects.toThrow(
      new Error("Country provided is not supported, received: Japan")
    );
  });
  test("should throw error for invalid year", async () => {
    await expect(
      getListOfPublicHolidays(2000, SUPPORTED_COUNTRIES[0])
    ).rejects.toThrow(
      new Error("Year provided not the current, received: 2000")
    );
  });

  test("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listOfPublicHolydaysMock })
      );

    await getListOfPublicHolidays(currentYear, SUPPORTED_COUNTRIES[0]);

    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${currentYear}/${SUPPORTED_COUNTRIES[0]}`
    );
  });
  test("should return an empty array if API call fails", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("API call failed")));

    const response = await getListOfPublicHolidays(
      currentYear,
      SUPPORTED_COUNTRIES[0]
    );

    expect(response).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  test("should call API and return response", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 200 }));

    const response = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0]);

    expect(response).toEqual(true);
  });
  test("should throw error for invalid country", async () => {
    await expect(checkIfTodayIsPublicHoliday("Japan")).rejects.toThrow(
      new Error("Country provided is not supported, received: Japan")
    );
  });
  test("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listOfPublicHolydaysMock })
      );

    await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0]);

    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${SUPPORTED_COUNTRIES[0]}`
    );
  });
  test("should return an empty array if API call fails", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("API call failed")));

    const response = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0]);

    expect(response).toEqual(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("getNextPublicHolidays", () => {
  test("should call API and return response", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listOfPublicHolydaysMock })
      );

    const response = await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]);

    expect(response).toEqual(listOfShortenPublicHolidaysMock);
  });
  test("should throw error for invalid country", async () => {
    await expect(getNextPublicHolidays("Japan")).rejects.toThrow(
      new Error("Country provided is not supported, received: Japan")
    );
  });
  test("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listOfPublicHolydaysMock })
      );

    await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]);

    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${SUPPORTED_COUNTRIES[0]}`
    );
  });
  test("should return an empty array if API call fails", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("API call failed")));

    const response = await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]);

    expect(response).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
