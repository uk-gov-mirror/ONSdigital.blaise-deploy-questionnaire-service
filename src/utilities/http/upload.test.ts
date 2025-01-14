import {cleanup} from "@testing-library/react";
import {validateUploadIsComplete} from "./upload";
import {mock_server_request_function, mock_server_request_Return_JSON} from "../../tests/utils";


describe("Function validateUploadIsComplete(filename: string) ", () => {

    it("It should return true if object with the correct filename returned", async () => {
        mock_server_request_Return_JSON(200, {name: "OPN2004A.bpkg"});
        const fileFound = await validateUploadIsComplete("OPN2004A.bpkg");
        expect(fileFound).toBeTruthy();
    });

    it("It should return false if object is returned with different filename", async () => {
        mock_server_request_Return_JSON(200, {name: "RandonName.bpkg"});
        const fileFound = await validateUploadIsComplete("OPN2004A.bpkg");
        expect(fileFound).toBeFalsy();
    });

    it("It should return false if request returns an error code", async () => {
        mock_server_request_Return_JSON(500, {name: "OPN2004A.bpkg"});
        const fileFound = await validateUploadIsComplete("OPN2004A.bpkg");
        expect(fileFound).toBeFalsy();
    });

    it("It should return false if request JSON is invalid", async () => {
        mock_server_request_function(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.reject("Failed"),
            })
        );

        const fileFound = await validateUploadIsComplete("OPN2004A.bpkg");
        expect(fileFound).toBeFalsy();
    });

    it("It should return false if request call fails", async () => {
        mock_server_request_function(() =>
            Promise.resolve(() => {
                throw "error";
            })
        );
        const fileFound = await validateUploadIsComplete("OPN2004A.bpkg");
        expect(fileFound).toBeFalsy();
    });

    afterAll(() => {
        jest.clearAllMocks();
        cleanup();
    });
});
