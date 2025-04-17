import { StorageService } from "@/services/storage-service";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, "getItem");
    jest.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("getItem should retrieve item from localStorage", () => {
    localStorage.setItem("testKey", "testValue");

    const result = StorageService.getItem("testKey");

    expect(localStorage.getItem).toHaveBeenCalledWith("testKey");
    expect(result).toBe("testValue");
  });

  it("setItem should set item in localStorage", () => {
    StorageService.setItem("testKey", "testValue");

    expect(localStorage.setItem).toHaveBeenCalledWith("testKey", "testValue");
    expect(localStorage.getItem("testKey")).toBe("testValue");
  });
});
